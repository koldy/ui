import Color from './ThemeColor';
import ThemeError from './ThemeError';
import {getPixelsOrString, isObject} from '../util/helpers';

const DEBUG = 'debug';
const STRICT = 'strict';
const PRODUCTION = 'production';

const ThemeManager = function ({json, mode, onDebug, onInfo, onWarning, onError}) {
	this._mode = [DEBUG, STRICT, PRODUCTION].indexOf(mode) >= 0 ? mode : null;
	this.on = {onDebug, onInfo, onWarning, onError};

	this._json = json; // remember the original theme

	/****************************************
	 * Debug options and methods
	 ***************************************/

	this.error = function (...args) {
		if (this.inDebug() && window && window.console && window.console.error) {
			// error is always visible, even in production
			window.console.error(...args);
		}

		if (this.isStrict()) {
			throw new ThemeError(args.join('; '));
		}

		const {onError: onErrorFn} = this.on;
		if (typeof onErrorFn === 'function') {
			onErrorFn(...args);
		}
	};

	this.info = function (...args) {
		if (this.inDebug() && window && window.console && window.console.info) {
			window.console.info(...args);
		}

		const {onInfo: onInfoFn} = this.on;
		if (typeof onInfoFn === 'function') {
			onInfoFn(...args);
		}
	};

	this.warning = function (...args) {
		if (this.inDebug() && window && window.console && window.console.warn) {
			window.console.warn(...args);
		}

		if (this.isStrict()) {
			throw new ThemeError(args.join('; '));
		}

		const {onWarning: onWarningFn} = this.on;
		if (typeof onWarningFn === 'function') {
			onWarningFn(...args);
		}
	};

	this.debug = function (...args) {
		if (this.inDebug() && window && window.console && window.console.debug) {
			window.console.debug(...args);
		}

		const {onDebug: onDebugFn} = this.on;
		if (typeof onDebugFn === 'function') {
			onDebugFn(...args);
		}
	};

	this.inDebug = function () {
		return this._mode === DEBUG;
	};

	this.isStrict = function () {
		return this._mode === STRICT;
	};

	/**
	 * Get the part from original JSON theme or return empty object
	 * @param {string} what - it can be delimited with a dot
	 * @return {{*}}
	 */
	this.json = function (what) {
		if (typeof what !== 'string') {
			return this._json;
		}

		const parts = what.split('.');

		let data = this._json;
		for (const part of parts) {
			data = data[part] || {};
		}

		return data;
	};

	// process theme colors
	this._colors = {};
	this._firstColor = null;
	this._availableColors = Object.keys(json.color || {});

	for (const [i, key] of this._availableColors.entries()) {
		this._colors[key] = new Color({
			colors: json.color[key],
			theme: this
		});

		if (i === 0) {
			this._firstColor = key;
		}
	}

	/**
	 * Get all color instances
	 *
	 * @return {Color[]}
	 */
	this.colors = function () {
		return Object.values(this._colors);
	};

	/**
	 * @param {string} colorName
	 * @return {Color|null}
	 */
	this.color = function (colorName) {
		return typeof colorName === 'string' && this._colors[colorName] instanceof Color ? this._colors[colorName] : null;
	};

	/**
	 * @return {Color|null}
	 */
	this.firstColor = function () {
		return this.color(this._firstColor);
	};

	/**
	 * Process CSS object and replace colors with our color/tone pairs
	 * @param {object} obj
	 * @return object
	 */
	this.processColors = function (obj) {
		if (!isObject(obj)) {
			throw new ThemeError(`Invalid parameter, expected object, got: ${typeof obj}`);
		}

		const data = {};

		for (const property of Object.keys(obj)) {
			const value = obj[property];

			if (isObject(value)) {
				data[property] = this.processColors(value);
			} else if (typeof value === 'string') {
				data[property] = this.processColor(value);
			} else {
				// otherwise, leave it as is
				data[property] = obj[property];
			}
		}

		return data;
	};

	this.processColor = function (colorValue) {
		if (typeof colorValue === 'string') {
			// we got the string for the color, so there's two possibilities: it contains "|" or it doesn't
			// if it does, then the color includes the tone
			if (colorValue.indexOf('|') === -1) {
				// there's no "|"

				const color = this.color(colorValue);
				if (color instanceof Color) {
					return color.tone(0);
				}

				// otherwise, return color value as is
				return colorValue;
			} else {
				// there's "|" in the value, but if there are spaces as well, then it's a complex css definition
				if (colorValue.indexOf(' ') === -1) {
					const [clsName, clsTone] = colorValue.split('|');

					const color = this.color(clsName);
					if (color instanceof Color) {
						// good, we found it, so let's validate the tone
						const tone = parseInt(clsTone, 10);

						if (Number.isNaN(tone)) {
							this.error(
								`Can not parse color tone from color ${colorValue}; parsing tone into integer resulted in NaN`
							);
						} else {
							// we got the valid tone as integer, so let's return the color with a tone
							return color.tone(tone);
						}
					}

					// otherwise, this is invalid value, so let's just warn about it
					this.warning(`Trying to process invalid color value: ${colorValue}`);
				} else {
					// here, colorValue has "|" and " ", so processing is more complex
					// let's split spaces and process each item
					const segments = colorValue.split(' ');
					const parsedValue = [];

					for (const segment of segments) {
						if (segment.indexOf('|') > 0) {
							const [clsName, clsTone] = segment.split('|');

							const color = this.color(clsName);
							if (color instanceof Color) {
								// good, we found it, so let's validate the tone
								const tone = parseInt(clsTone, 10);

								if (Number.isNaN(tone)) {
									this.error(
										`Can not parse color tone from color ${colorValue}; parsing tone into integer resulted in NaN`
									);
									parsedValue.push(segment);
								} else {
									// we got the valid tone as integer, so let's return the color with a tone
									parsedValue.push(color.tone(tone));
								}
							} else {
								parsedValue.push(segment);
							}
						} else {
							parsedValue.push(segment);
						}
					}

					return parsedValue.join(' ');
				}
			}

			// didn't do anything, let's just return what we got
			return colorValue;
		}

		return null;
	};

	/**
	 * Gets the list of color properties to parse
	 * @return {string[]}
	 */
	this.colorProperties = function () {
		return [
			'background',
			'backgroundAttachment',
			'backgroundBlendMode',
			'backgroundClip',
			'backgroundColor',
			'backgroundImage',
			'backgroundOrigin',
			'backgroundPosition',
			'backgroundPositionX',
			'backgroundPositionY',
			'backgroundRepeat',
			'backgroundRepeatX',
			'backgroundRepeatY',
			'backgroundSize',
			'borderBlockEndColor',
			'borderBlockStartColor',
			'borderColor',
			'borderImage',
			'borderTopColor',
			'borderRightColor',
			'borderBottomColor',
			'borderLeftColor',
			'boxShadow',
			'caretColor',
			'color',
			'columnRuleColor',
			'outlineColor',
			'textDecorationColor',
			'textShadow',
			'textDecorationColor'
		];
	};

	/**
	 * Get the common variant CSS properties
	 * @return {*[]}
	 */
	this.variantProperties = function () {
		return [
			'animation',
			'animationDelay',
			'animationDirection',
			'animationDuration',
			'animationFillMode',
			'animationIterationCount',
			'animationName',
			'animationPlayState',
			'animationTimingFunction',
			'backfaceVisibility',
			'backgroundImageRepeat',
			'border',
			'borderCollapse',
			'borderRadius',
			'borderStyle',
			'borderBottomStyle',
			'borderRightStyle',
			'borderTopStyle',
			'borderLeftStyle',
			'borderBlockEndStyle',
			'borderBlockStartStyle',
			'bottom',
			'clear',
			'clip',
			'captionSide',
			'font',
			'fontFamily',
			'fontVariant',
			'fontWeight',
			'left',
			'lineHeight',
			'transition',
			'verticalAlign',
			'opacity',
			'outline',
			'outlineStyle',
			'overflow',
			'overflowX',
			'overflowY',
			'perspective',
			'position',
			'right',
			'tableLayout',
			'textAlign',
			'textAlignLast',
			'textDecoration',
			'textDecorationLine',
			'textDecorationStyle',
			'textIndent',
			'textTransform',
			'top',
			'whiteSpace'
		];
	};

	/**
	 * Get the common size CSS properties
	 * @return {[string, string, string, string]}
	 */
	this.sizeProperties = function () {
		return [
			'borderWidth',
			'borderBlockEndWidth',
			'borderBlockStartWidth',
			'borderTopWidth',
			'borderRightWidth',
			'borderBottomWidth',
			'borderLeftWidth',
			'fontSize',
			'fontVariant',
			'fontWeight',
			'lineHeight',
			'margin',
			'marginTop',
			'marginRight',
			'marginBottom',
			'marginLeft',
			'maxHeight',
			'minHeight',
			'maxWidth',
			'minWidth',
			'padding',
			'paddingTop',
			'paddingRight',
			'paddingBottom',
			'paddingLeft',
			'outlineWidth',
			'tabSize',
			'textDecorationStyle'
		];
	};

	/**
	 * Process given object or single value with given property
	 * @param {string|{}} value
	 * @param {string} property
	 * @return {null|{}}
	 */
	this.processObjectOrString = function (value, property) {
		if (!value) {
			return null;
		}

		if (isObject(value)) {
			return value;
		}

		const o = {};
		o[property] = getPixelsOrString(value);
		return o;
	};
};

export default ThemeManager;
