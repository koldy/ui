/**
 * Returns object without the props passed to 2nd argument
 *
 * @param {object} obj
 * @param {Array} omitKeys
 */
export const omit = function(obj, omitKeys) {
	const result = {};
	Object.keys(obj).forEach((key) => {
		if (omitKeys.indexOf(key) === -1) {
			result[key] = obj[key];
		}
	});
	return result;
};

/**
 * Returns object without the props passed to 2nd argument
 *
 * @param {object} obj
 * @param {Array} keys
 */
export const pick = function(obj, keys) {
	const result = {};
	Object.keys(obj).forEach((key) => {
		if (keys.indexOf(key) >= 0) {
			result[key] = obj[key];
		}
	});
	return result;
};

/**
 *
 * @param {*} obj
 * @returns {boolean} true if object is object, and not array
 */
export const isObject = function(obj) {
	if (typeof obj !== 'object') {
		return false;
	}

	return !isArray(obj);
};

/**
 * Is object (including array) empty?
 *
 * @param {object} object
 * @returns {boolean}
 */
export const isEmpty = function(object) {
	if (isArray(object)) {
		return object.length === 0;
	}

	return Object.getOwnPropertyNames(object).length === 0;
};

/**
 * Checks if given variable is array
 *
 * @param {*} object
 * @return {boolean}
 */
export const isArray = function(object) {
	return typeof object === 'object' && object !== null && object.constructor === Array;
};

/**
 * @param {*} val
 * @return {boolean}
 */
export const isFunction = function(val) {
	return typeof val === 'function';
};

/**
 * Get the style object for passed margins (m, mt, mr, mb, ml)
 *
 * @param props
 * @return {{margin: string}|{margin: *}}
 */
export const getStyleForMargins = function(props) {
	const {m = null, mt = null, mr = null, mb = null, ml = null} = props;

	if (m !== null) {
		return {margin: getPixelsOrString(m)};
	}

	return {
		marginTop: getPixelsOrString(mt),
		marginRight: getPixelsOrString(mr),
		marginBottom: getPixelsOrString(mb),
		marginLeft: getPixelsOrString(ml)
	};
};

/**
 * Get the style object for passed paddings (p, pt, pr, pb, pl)
 *
 * @param props
 * @return {{padding: *}|{padding: string}}
 */
export const getStyleForPaddings = function(props) {
	const {p = null, pt = null, pr = null, pb = null, pl = null} = props;

	if (p !== null) {
		return {padding: getPixelsOrString(p)};
	}

	return {
		paddingTop: getPixelsOrString(pt),
		paddingRight: getPixelsOrString(pr),
		paddingBottom: getPixelsOrString(pb),
		paddingLeft: getPixelsOrString(pl)
	};
};

/**
 * Get the values in pixels or anything else otherwise. If value is number,
 * pixels "Xpx" will be returned. If given value is for e.g. "1rem", the "1rem"
 * will be returned as is.
 *
 * @param value
 * @return {string}
 */
export const getPixelsOrString = function(value) {
	return typeof value === 'number' ? `${value}px` : value;
};

/**
 * @param {string} name
 * @param {string|number|null} value
 * @return {{}}
 */
export const getStyleForStringOrNumber = function(name, value) {
	if (value === null) {
		return {};
	}

	const style = {};
	style[name] = getPixelsOrString(value);
	return style;
};

/**
 * @param {string} name
 * @param {string|number|null} value
 * @return {{}}
 */
export const getStyleForValue = function(name, value) {
	if (value === null) {
		return {};
	}

	const style = {};
	style[name] = value;
	return style;
};

/**
 * @param props
 */
export const getStyleForPositions = function(props) {
	const style = {};

	for (const position of ['top', 'right', 'bottom', 'left']) {
		const value = typeof props[position] === 'undefined' ? null : props[position];

		if (typeof value === 'number' || typeof value === 'string') {
			style[position] = typeof value === 'number' ? `${value}px` : value;
		}
	}

	return style;
};

/**
 * Get the width style by determining native width, pixels or predefined width
 * @param {string|number|null} userWidth
 * @param {object} widths
 * @returns {null|{width: *}|{width: string}|{width: (*|null)}}
 */
export const getStyleForWidth = function(userWidth, widths) {
	if (userWidth === undefined || userWidth === null) {
		return null;
	}

	if (typeof userWidth === 'number') {
		return {width: `${userWidth}px`};
	}

	if (hasUnit(userWidth)) {
		return {width: userWidth};
	}

	const predefinedWidth = widths[userWidth] || null;

	if (typeof predefinedWidth === 'number') {
		return {width: `${predefinedWidth}px`};
	}

	if (hasUnit(predefinedWidth)) {
		return {width: predefinedWidth};
	}

	return null;
};

/**
 * Returns true if given color is set as hexadecimal, rgb or rgba
 *
 * @param {string|*} color
 * @returns {boolean}
 */
export const isNativeColor = function(color) {
	if (typeof color === 'string') {
		const hasHex = color.substr(0, 1) === '#';
		const hasRgb = color.substr(0, 4).toLowerCase() === 'rgb(';
		const hasRgba = color.substr(0, 5).toLowerCase() === 'rgba(';
		const hasHsl = color.substr(0, 4).toLowerCase() === 'hsl(';
		const hasHsla = color.substr(0, 5).toLowerCase() === 'hsla(';

		if (hasHex || hasRgb || hasRgba || hasHsl || hasHsla) {
			return true;
		}
	}

	return false;
};

/**
 * @param {string|*} str
 * @returns {boolean}
 */
export const hasUnit = function(str) {
	if (!str || typeof str !== 'string') {
		return false;
	}

	const x = str.toLowerCase();
	const l = x.length;

	const last1 = x.substr(l - 1, 1);
	const last2 = x.substr(l - 2, 2);
	// const last3 = x.substr(l - 3, 3);

	if (last1 === '%') {
		return true;
	}

	if (['px', 'cm', 'mm', 'em', 'ex', 'in', 'pc', 'pt'].indexOf(last2) >= 0) {
		// we need to ensure that if we ignore unit, we get the number
		const number = parseFloat(x.substr(0, l - 2));
		return !Number.isNaN(number);
	}

	// for last 3, we need to ensure that the rest of chars is number
	const number = parseFloat(x.substr(0, l - 3));
	return !Number.isNaN(number);
};

/**
 * @param e
 */
export const stopPropagation = function(e) {
	if (e && typeof e.stopPropagation === 'function') {
		e.stopPropagation();
	}
};

/**
 * @param e
 */
export const preventDefault = function(e) {
	if (e && typeof e.preventDefault === 'function') {
		e.preventDefault();
	}
};

/**
 * @param e
 */
export const preventDefaultAndStopPropagation = function(e) {
	if (e) {
		if (typeof e.preventDefault === 'function') {
			e.preventDefault();
		}
		if (typeof e.stopPropagation === 'function') {
			e.stopPropagation();
		}
	}
};

/**
 *
 */
export const emptyFn = function() {};

/**
 * Bind event listener on window object
 *
 * @param {string} evt for example "scroll" or "keydown"
 * @param {function} fn
 */
export const addDocumentEvent = function(evt, fn) {
	if (document.attachEvent) {
		document.attachEvent(evt, fn);
	} else if (document.addEventListener) {
		document.addEventListener(evt, fn, true);
	}
};

/**
 * Removes event listener from window object. Pass reference to the same function as for addDocumentEvent
 *
 * @param {string} evt for example "scroll" or "keydown"
 * @param {function} fn
 */
export const removeDocumentEvent = function(evt, fn) {
	if (document.detachEvent) {
		document.detachEvent(evt, fn);
	} else if (document.removeEventListener) {
		document.removeEventListener(evt, fn, true);
	}
};

/**
 * Get the value suitable for printing inside HTML value tags
 * @param {*} value
 * @return {string}
 */
export const getHtmlValue = function(value) {
	switch (typeof value) {
		case 'number':
			return value.toString();
		case 'string':
			return value;
		case 'boolean':
			return value ? 'true' : 'false';
		default:
			return '';
	}
};

/**
 * Get the duration in milliseconds from a value that contains "s" or "ms"
 * @param {string} value
 * @return {null|number|*}
 */
export const getAnimationDuration = function(value) {
	if (!value) {
		return null;
	}

	if (typeof value === 'number') {
		return value;
	}

	if (typeof value === 'string') {
		const {length} = value;

		if (length <= 1) {
			throw new TypeError(`Invalid value passed for getAnimationDuration, expected string longer than 1`);
		}

		if (value.substr(length - 2, 2).toLowerCase() === 'ms') {
			const r = parseInt(value.substr(0, length - 2), 10);
			return Number.isNaN(r) ? null : r;
		}

		if (value.substr(length - 1, 1).toLowerCase() === 's') {
			const r = parseFloat(value.substr(0, length - 1)) * 1000;
			return Number.isNaN(r) ? null : r;
		}

		throw new TypeError(`Invalid value passed for getAnimationDuration, expected string that ends with "ms" or "s"`);
	}

	throw new TypeError(`Can not getAnimationDuration, expected string, got ${typeof value}`);
};

/**
 * Get the currently selected text in the window
 * @return {string|null}
 */
export const getSelectedText = function() {
	let selection = null;

	if (typeof window.getSelection === 'function') {
		selection = window.getSelection();
	}

	if (typeof document.getSelection === 'function') {
		selection = document.getSelection();
	}

	if (window.Selection !== undefined && selection instanceof Selection) {
		const text = selection.toString();
		return text === '' ? null : text;
	}

	return null;
};

/**
 * Select text inside of given HTMLElement
 * @param {HTMLElement} input
 */
export const selectText = function(input) {
	if (input instanceof HTMLElement) {
		if (typeof input.select === 'function') {
			input.select();
		} else if (
			typeof input.setSelectionRange === 'function' &&
			typeof input.value === 'string' &&
			input.value.length > 0
		) {
			input.setSelectionRange(0, input.value.length);
		}
	}
};

/**
 * Returns true if given date is really instance of Date and that instance is not "Invalid Date". Simple check with "instanceof" is not enough in
 * this case.
 *
 * @param {Date|*} date
 * @returns {boolean}
 * @link https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
 */
export const isValidDate = function(date) {
	return date instanceof Date && !Number.isNaN(date);
};

/**
 * Returns if given value is number or string
 * @param {*} value
 * @return {boolean}
 */
export const isNumberOrString = function(value) {
	return typeof value === 'number' || typeof value === 'string';
};

/**
 * @param {Date|*} date
 * @return {string|null}
 */
export const dateToDateString = function(date) {
	if (!isValidDate(date)) {
		return null;
	}

	return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
		.getDate()
		.toString()
		.padStart(2, '0')}`;
};

/**
 * @param {Date|*} date
 * @return {string|null}
 */
export const dateToYearMonthString = function(date) {
	if (!isValidDate(date)) {
		return null;
	}

	return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
};

/**
 * @param {Date|*} date
 * @return {string|null}
 */
export const dateToISOString = function(date) {
	if (!isValidDate(date)) {
		return null;
	}

	return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
		.getDate()
		.toString()
		.padStart(2, '0')} ${date
		.getHours()
		.toString()
		.padStart(2, '0')}:${date
		.getMinutes()
		.toString()
		.padStart(2, '0')}:${date
		.getSeconds()
		.toString()
		.padStart(2, '0')}`;
};

/**
 * @param {Date|*} date
 * @return {string|null}
 */
export const dateToISOStringWithMilliseconds = function(date) {
	if (!isValidDate(date)) {
		return null;
	}

	return `${dateToISOString(date)}.${date
		.getMilliseconds()
		.toString()
		.padStart(3, '0')}`;
};

/**
 * Get number of days in a month.
 * @param {number} year
 * @param {number} month where Jan is 1
 * @return {number}
 *
 * @link https://stackoverflow.com/a/27947860
 */
export const getDaysInMonth = function(year, month) {
	return month === 2 ? (year & 3 || (!(year % 25) && year & 15) ? 28 : 29) : 30 + ((month + (month >> 3)) & 1);
};

/**
 * @param {Date|*} date
 * @return {null|number}
 */
export const getDateAsInteger = function(date) {
	if (!isValidDate(date)) {
		return null;
	}

	return Number.parseInt(
		`${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date
			.getDate()
			.toString()
			.padStart(2, '0')}`,
		10
	);
};

/**
 * @param {*} value
 * @param {*} defaultValue
 * @return {boolean}
 */
export const isControlledComponent = function(value, defaultValue) {
	// controlled component is when value is other than undefined and default value is undefined
	return value !== undefined && defaultValue === undefined;
	// in every other case, it's uncontrolled component
};
