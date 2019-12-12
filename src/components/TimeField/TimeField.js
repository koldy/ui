import React, {useContext, useCallback, useRef, useMemo, useImperativeHandle, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

import ThemeContext from '../../theme/ThemeContext';
import {
	dateToISOString,
	getSelectedText,
	getStyleForMargins,
	isControlledComponent,
	isFunction,
	isObject,
	isValidDate,
	selectText
} from '../../util/helpers';
import ThemeError from '../../theme/ThemeError';
import InputFieldContext from '../InputField/InputFieldContext';
import Box from '../InputField/Box';
import Text from '../InputField/Text';

/**
 * Local context for sharing crucial pieces of data between the TimeField and the components down the line
 * @type {string[]}
 */
const PARTIALS = ['hours', 'minutes', 'seconds', 'milliseconds'];

/**
 * Local helper for parsing integers
 * @param {*} val
 * @returns {null|number}
 */
const valueParser = function(val) {
	if (val === null) {
		return 0;
	}

	const value = parseInt(val, 10);

	if (Number.isNaN(value)) {
		return 0;
	}

	return value;
};

/**
 * Local state initializer
 * @param value
 * @param defaultValue
 * @returns {{milliseconds: *, hours: *, seconds: *, minutes: *, date: *}}
 */
const init = function({value, defaultValue}) {
	let date = null;
	let hours = null;
	let minutes = null;
	let seconds = null;
	let milliseconds = null;
	const controlledComponent = isControlledComponent(value, defaultValue);

	if (controlledComponent) {
		// it's controlled component, but it still can be null

		if (isValidDate(value)) {
			date = value;
			hours = value
				.getHours()
				.toString()
				.padStart(2, '0');
			minutes = value
				.getMinutes()
				.toString()
				.padStart(2, '0');
			seconds = value
				.getSeconds()
				.toString()
				.padStart(2, '0');
			milliseconds = value
				.getMilliseconds()
				.toString()
				.padStart(3, '0');
		}
	} else if (value === undefined) {
		// if default value is not undefined, then there could be initial value

		if (defaultValue !== undefined && isValidDate(defaultValue)) {
			// we have to clone the date we got
			date = new Date(defaultValue.getTime());
			hours = defaultValue
				.getHours()
				.toString()
				.padStart(2, '0');
			minutes = defaultValue
				.getMinutes()
				.toString()
				.padStart(2, '0');
			seconds = defaultValue
				.getSeconds()
				.toString()
				.padStart(2, '0');
			milliseconds = defaultValue
				.getMilliseconds()
				.toString()
				.padStart(3, '0');
		}
	}

	return {
		date,
		hours,
		minutes,
		seconds,
		milliseconds
	};
};

const reducer = function(state, action) {
	switch (action.type) {
		/**
		 * Since TimeField consists of 4 different input fields which are controlled from the local state, we may set the
		 * "partial" value using this action. It'll update local's date value as well.
		 */
		case 'set-partial-value': {
			const {name, value} = action;

			if (value === null || value === '') {
				let allIsAlreadyNull = true;
				PARTIALS.forEach((partial) => {
					if (partial !== name && state[partial] !== null && state[partial] !== '') {
						allIsAlreadyNull = false;
					}
				});

				if (allIsAlreadyNull) {
					// since new value is falsy and all others are falsy, we're resetting everything and that's it
					return {
						...state,
						hours: '',
						minutes: '',
						seconds: '',
						milliseconds: '',
						date: null
					};
				}
			}

			// if we're here, then new value might be falsy, but others aren't
			const newDate = new Date();

			const newValues = {
				hours: state.hours,
				minutes: state.minutes,
				seconds: state.seconds,
				milliseconds: state.milliseconds,
				[name]: value
			};

			newDate.setHours(valueParser(newValues.hours));
			newDate.setMinutes(valueParser(newValues.minutes));
			newDate.setSeconds(valueParser(newValues.seconds));
			newDate.setMilliseconds(valueParser(newValues.milliseconds));

			return {
				...state,
				...newValues,
				date: newDate
			};
		}

		case 'set-value': {
			const {value} = action;

			if (!isValidDate(value)) {
				return {
					...state,
					hours: '',
					minutes: '',
					seconds: '',
					milliseconds: '',
					date: null
				};
			}

			return {
				...state,
				hours: value.getHours(),
				minutes: value.getMinutes(),
				seconds: value.getSeconds(),
				milliseconds: value.getMilliseconds(),
				date: value
			};
		}

		default:
			return state;
	}
};

/**
 * ******************************** TimeField **************************************
 */
const TimeField = function(props) {
	const {theme} = useContext(ThemeContext);

	const {size: defaultSize = null, variant: defaultVariant, color: defaultColor} = theme.json('inputField.defaults');

	const {
		children = null,
		name = null,
		value = undefined,
		defaultValue = undefined,
		valueFormat = null,
		color = defaultColor,
		size = defaultSize,
		variant = defaultVariant,
		onChange = null,
		onClick = null,
		onDoubleClick = null,
		onFocus = null,
		onBlur = null,
		disabled = false,
		readOnly = false,
		precision = 'minutes',
		containerRef = null,
		selectAllOnFocus = true,
		m = null,
		mt = null,
		mr = null,
		mb = null,
		ml = null
	} = props;

	if (value !== undefined && defaultValue === undefined && !onChange) {
		theme.error('You must set onChange prop to <TimeField/> component when using it as controlled component');
	} else if (value !== undefined && defaultValue !== undefined) {
		theme.error('When using <TimeField/>, you can set the value OR defaultValue prop, not both');
	}

	const innerContainerRef = useRef(null);
	useImperativeHandle(containerRef, () => innerContainerRef.current);

	const focusFieldRef = useRef(null);

	const [{date, hours, minutes, seconds, milliseconds}, dispatch] = useReducer(reducer, {value, defaultValue}, init);

	/**
	 * ******************************** STYLE PARSER **************************************
	 */

	const [containerCss, inputCss] = useMemo(() => {
		// =============================    VARIANT    ========================================
		const variants = theme.json('inputField.variant');
		if (!isObject(variants[variant])) {
			throw new ThemeError(
				`Wrong <TimeField variant="${variant}" /> - "${variant}" is not properly defined in theme.inputField.variant.${variant}`
			);
		}
		const {borderRadius = null, borderWidth = null, fontFamily = null, textAlign = 'start'} = variants[variant];

		// =============================    SIZE    ========================================
		const sizes = theme.json('inputField.size');
		if (!isObject(sizes[size])) {
			throw new ThemeError(`Wrong <TimeField size="${size}" /> - "${size}" is not properly defined in theme.inputField.size.${size}`);
		}
		const {fontSize, fontWeight, padding, lineHeight, letterSpacing} = sizes[size];

		// =============================    COLOR    ========================================
		const colors = theme.json('inputField.color');
		if (!isObject(colors[color])) {
			throw new ThemeError(`Wrong <TimeField color="${color}" /> - "${color}" is not properly defined in theme.inputField.color.${color}`);
		}

		// because we're having container and the only usable CSS pseudoselector is :focus-within, we have to deal with "read-only" and "disabled" manually
		// a reason more to deal with disabled manually is because we won't defined ":disabled" pseudo selector since we have container "above" the input

		let colorSet = null;

		if (readOnly) {
			colorSet = colors[color].readOnly || {};
		} else if (disabled) {
			colorSet = colors[color].disabled || {};
		} else {
			colorSet = colors[color].normal || {};
		}

		const {background, backgroundSize, color: fontColor, borderColor, boxShadow, outline, outlineOffset, hover = {}, focus = {}} = colorSet;

		const {
			background: hoverBackground,
			color: hoverFontColor,
			borderColor: hoverBorderColor,
			boxShadow: hoverBoxShadow,
			outline: hoverOutline,
			outlineOffset: hoverOutlineOffset
		} = hover;

		const {
			background: focusBackground,
			color: focusFontColor,
			borderColor: focusBorderColor,
			boxShadow: focusBoxShadow,
			outline: focusOutline,
			outlineOffset: focusOutlineOffset
		} = focus;

		return [
			{
				...getStyleForMargins({m, mt, mr, mb, ml}),
				cursor: disabled ? 'not-allowed' : 'unset',
				borderRadius,
				borderWidth,
				borderColor: theme.processColor(borderColor),
				background: theme.processColor(background),
				boxShadow: theme.processColor(boxShadow),
				outline,
				outlineOffset,
				backgroundSize,
				'&:hover': {
					backgroundColor: theme.processColor(hoverBackground),
					borderColor: theme.processColor(hoverBorderColor),
					boxShadow: theme.processColor(hoverBoxShadow),
					outline: hoverOutline,
					outlineOffset: hoverOutlineOffset
				},
				'&:focus-within': {
					backgroundColor: theme.processColor(focusBackground),
					borderColor: theme.processColor(focusBorderColor),
					boxShadow: theme.processColor(focusBoxShadow),
					outline: focusOutline,
					outlineOffset: focusOutlineOffset
				}
			},
			{
				fontSize,
				fontWeight,
				fontFamily,
				padding,
				lineHeight,
				letterSpacing,
				textAlign,
				color: theme.processColor(fontColor),
				'&:hover': {
					color: theme.processColor(hoverFontColor)
				},
				'&:focus': {
					color: theme.processColor(focusFontColor)
				}
			}
		];
	}, [theme, variant, color, size, disabled, readOnly, m, mt, mr, mb, ml]);

	/**
	 * Useful methods
	 */

	const clearValue = useCallback(() => dispatch({type: 'set-value', value: null}), []);

	const focusField = useCallback(() => {
		if (focusFieldRef && focusFieldRef.current && isFunction(focusFieldRef.current.focus)) {
			focusFieldRef.current.focus();
		}
	}, [focusFieldRef]);

	/**
	 * ******************************** LOCAL CONTEXT **************************************
	 */

	const context = useMemo(
		() => ({
			name,
			value,
			defaultValue,
			valueFormat,
			disabled,
			readOnly,
			inputCss,
			onClick,
			onDoubleClick,
			onChange,
			onFocus,
			onBlur,
			precision,
			selectAllOnFocus,
			innerContainerRef,
			focusFieldRef,
			focusField,

			date,
			hours,
			minutes,
			seconds,
			milliseconds,
			dispatch,

			clearValue
		}),
		[
			name,
			value,
			defaultValue,
			valueFormat,
			disabled,
			readOnly,
			inputCss,
			onClick,
			onDoubleClick,
			onChange,
			onFocus,
			onBlur,
			precision,
			selectAllOnFocus,
			innerContainerRef,
			focusFieldRef,
			focusField,

			date,
			hours,
			minutes,
			seconds,
			milliseconds,
			dispatch,

			clearValue
		]
	);

	let fieldValue = '';

	if (isFunction(valueFormat)) {
		fieldValue = valueFormat(date);
	} else if (isValidDate(date)) {
		fieldValue = dateToISOString(date);
	}

	return (
		<Container containerCss={containerCss} ref={innerContainerRef}>
			{name && <input type="hidden" name={name} value={fieldValue} />}
			<InputFieldContext.Provider value={context}>{children || <Input />}</InputFieldContext.Provider>
		</Container>
	);
};

TimeField.propTypes = {
	children: PropTypes.node,
	name: PropTypes.string,
	value: PropTypes.instanceOf(Date),
	defaultValue: PropTypes.instanceOf(Date),
	valueFormat: PropTypes.func,
	color: PropTypes.string,
	size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	variant: PropTypes.string,
	onChange: PropTypes.func,
	onClick: PropTypes.func,
	onDoubleClick: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	disabled: PropTypes.bool,
	readOnly: PropTypes.bool,
	precision: PropTypes.oneOf(['minutes', 'seconds', 'milliseconds']),
	selectAllOnFocus: PropTypes.bool,
	containerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({current: PropTypes.any})]),

	// margins:
	m: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	ml: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const Container = styled.span`
	display: inline-flex;
	flex-wrap: nowrap;
	flex-direction: row;
	align-items: center;
	border: 2px solid #cfcfcf;
	height: auto;
	padding: 0 !important;
	box-sizing: border-box;
	position: relative;
	transition: all 300ms ease-in-out 10ms;
	${({containerCss}) => css(containerCss)}
`;

/**
 * ******************************** Input **************************************
 */

const Input = function() {
	const {
		name: fieldName,
		value,
		defaultValue,
		disabled,
		readOnly,
		inputCss,
		onClick,
		onDoubleClick,
		onChange,
		onFocus,
		onBlur,
		precision,
		selectAllOnFocus,
		innerContainerRef,
		focusFieldRef,

		date,
		hours,
		minutes,
		seconds,
		milliseconds,
		dispatch
	} = useContext(InputFieldContext);

	const hoursRef = useRef(null);
	useImperativeHandle(focusFieldRef, () => hoursRef.current);
	const minutesRef = useRef(null);
	const secondsRef = useRef(null);
	const millisecondsRef = useRef(null);

	const lastOnChange = useRef(null);
	lastOnChange.current = onChange;

	const lastName = useRef(null);
	lastName.current = fieldName;

	const lastDate = useRef(null);
	lastDate.current = date;

	const controlledComponent = isControlledComponent(value, defaultValue);

	/**
	 * ******************************** FOCUS & BLUR **************************************
	 */

	const handleFocus = useCallback(
		(e) => {
			if (selectAllOnFocus) {
				selectText(e.currentTarget);
			}

			if (isFunction(onFocus)) {
				onFocus({
					name: lastName.current,
					value: date,
					containerElement: innerContainerRef.current,
					field: e.currentTarget.dataset.name
				});
			}
		},
		[selectAllOnFocus, onFocus, date, innerContainerRef]
	);

	const handleBlur = useCallback(
		(e) => {
			if (isFunction(onBlur)) {
				onBlur({
					name: lastName.current,
					value: date,
					containerElement: innerContainerRef.current,
					field: e.currentTarget.dataset.name
				});
			}
		},
		[onBlur, date, innerContainerRef]
	);

	/**
	 * ******************************** CLICK & DOUBLE CLICK **************************************
	 */

	const handleClick = useCallback(
		(e) => {
			e.stopPropagation();

			if (isFunction(onClick)) {
				onClick({
					name: lastName.current,
					value: date,
					containerElement: innerContainerRef.current
				});
			}
		},
		[onClick, date, innerContainerRef]
	);

	const handleDoubleClick = useCallback(
		(e) => {
			e.stopPropagation();

			if (isFunction(onDoubleClick)) {
				onDoubleClick({
					name: lastName.current,
					value: date,
					containerElement: innerContainerRef.current
				});
			}
		},
		[onDoubleClick, date, innerContainerRef]
	);

	/**
	 * ******************************** SET METHODS **************************************
	 */

	const setPartialValue = useCallback((name, partialValue) => {
		if (controlledComponent) {
			const newDate = isValidDate(lastDate.current) ? new Date(lastDate.current) : new Date();

			switch (name) {
				case 'hours':
					newDate.setHours(valueParser(partialValue));
					break;
				case 'minutes':
					newDate.setMinutes(valueParser(partialValue));
					break;
				case 'seconds':
					newDate.setSeconds(valueParser(partialValue));
					break;
				case 'milliseconds':
					newDate.setMilliseconds(valueParser(partialValue));
					break;
				// no default
			}

			if (isFunction(lastOnChange.current)) {
				lastOnChange.current({
					name: lastName.current,
					containerElement: innerContainerRef.current,
					value: newDate
				});
			}
		} else {
			dispatch({
				type: 'set-partial-value',
				name,
				value: partialValue
			});
		}
	}, [dispatch, lastOnChange, innerContainerRef, controlledComponent]);

	/**
	 * ******************************** JUMP to NEXT / PREV **************************************
	 */

	const jumpToPrevious = useCallback(
		(from) => {
			let target = null;

			switch (from) {
				case 'milliseconds':
					target = secondsRef.current;
					break;

				case 'seconds':
					target = minutesRef.current;
					break;

				case 'minutes':
					target = hoursRef.current;
					break;

				// no default
			}

			if (target && isFunction(target.focus)) {
				target.focus();

				if (selectAllOnFocus) {
					selectText(target);
				}
			}
		},
		[selectAllOnFocus]
	);

	const jumpToNext = useCallback(
		(from) => {
			let target = null;

			switch (from) {
				case 'hours':
					target = minutesRef.current;
					break;

				case 'minutes':
					target = secondsRef.current;
					break;

				case 'seconds':
					target = millisecondsRef.current;
					break;

				// no default
			}

			if (target && isFunction(target.focus)) {
				target.focus();

				if (selectAllOnFocus) {
					selectText(target);
				}
			}
		},
		[selectAllOnFocus]
	);

	/**
	 * ******************************** ON KEY DOWN **************************************
	 */

	/**
	 * This method does some stuff before the new value is applied in the field
	 * @type {Function}
	 */
	const handleKeyDown = useCallback((e) => {
		const {key, currentTarget} = e;
		const {value: previousValue, dataset} = currentTarget;
		const {name} = dataset;

		const nextValue = `${previousValue}${key}`;
		let maxValue;
		let minValue;

		switch (name) {
			case 'hours':
				maxValue = 23;
				minValue = 0;
				break;

			case 'minutes':
				maxValue = 59;
				minValue = 0;
				break;

			case 'seconds':
				maxValue = 59;
				minValue = 0;
				break;

			case 'milliseconds':
				maxValue = 999;
				minValue = 0;
				break;

			// no default
		}

		const maxLength = maxValue.toString().length;

		switch (key) {
			case 'ArrowLeft':
				if (previousValue === '') {
					jumpToPrevious(name);
				}
				break;

			case 'ArrowRight':
				if (previousValue === '') {
					jumpToNext(name);
				}
				break;

			case 'ArrowUp':
				e.preventDefault();
				e.stopPropagation();

				if (previousValue === '') {
					setPartialValue(name, minValue);
				} else {
					const val = parseInt(previousValue, 10);

					if (Number.isNaN(val)) {
						setPartialValue(name, minValue);
					} else {
						setPartialValue(name, val + 1 > maxValue ? minValue : val + 1);
					}
				}
				break;

			case 'ArrowDown':
				e.preventDefault();
				e.stopPropagation();

				if (previousValue === '') {
					setPartialValue(name, maxValue);
				} else {
					const val = parseInt(previousValue, 10);

					if (Number.isNaN(val)) {
						setPartialValue(name, maxValue);
					} else {
						setPartialValue(name, val - 1 < minValue ? maxValue : val - 1);
					}
				}
				break;

			case '-':
			case '+':
			case 'e':
			case '.':
			case ',':
				e.preventDefault();
				e.stopPropagation();
				break;

			case '0':
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
				if (getSelectedText() === null && previousValue !== '') {
					// we must check the length as well, in case user entered leading zeros
					if (nextValue.length > maxLength) {
						e.preventDefault();
						e.stopPropagation();
					}
				}
				break;

			// no default
		}
	}, [jumpToNext, jumpToPrevious, setPartialValue]);

	/**
	 * ******************************** AFTER ON KEY DOWN - ON CHANGE **************************************
	 */

	const handlePartialOnChange = useCallback((e) => {
		const {currentTarget} = e;
		const {value: currentValue, dataset} = currentTarget;
		const {name} = dataset;

		let maxValue;
		let maxLength;

		switch (name) {
			case 'hours':
				maxValue = 23;
				maxLength = 2;
				break;

			case 'minutes':
				maxValue = 59;
				maxLength = 2;
				break;

			case 'seconds':
				maxValue = 59;
				maxLength = 2;
				break;

			case 'milliseconds':
				maxValue = 999;
				maxLength = 3;
				break;

			// no default
		}

		if (currentValue !== '') {
			const val = parseInt(currentValue, 10);

			if (val > maxValue) {
				setPartialValue(name, maxValue);
			} else {
				setPartialValue(name, currentValue);
				if (currentValue.toString().length === maxLength) {
					jumpToNext(name);
				}
			}
		} else {
			setPartialValue(name, null);
		}
	}, [jumpToNext, setPartialValue]);

	const filteredInputCss = {...inputCss};
	delete filteredInputCss.textAlign;

	let innerElementsCount = 2;

	switch (precision) {
		case 'seconds':
			innerElementsCount = 3;
			break;
		case 'milliseconds':
			innerElementsCount = 4;
			break;

		// no default
	}

	/**
	 * ******************************** FIRE ON CHANGE TO OUTSIDE **************************************
	 */

	const fireOnChangeToOutside = useRef(true);
	useEffect(() => {
		if (fireOnChangeToOutside.current) {
			// prevent from firing on first use
			fireOnChangeToOutside.current = false;
			return;
		}

		if (!controlledComponent && minutesRef.current !== null && isFunction(lastOnChange.current)) {
			// ok, all conditions are met to fire onChange event to outside world
			// onChange MUST NOT fire if change came from the outside
			lastOnChange.current({
				name: lastName.current,
				containerElement: innerContainerRef.current,
				value: date
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [date]);

	/**
	 * ******************************** RESPECT NEW VALUE FROM OUTSIDE **************************************
	 */
	const respectNewValueFromOutside = useRef(true);
	useEffect(() => {
		if (respectNewValueFromOutside.current) {
			// prevent from firing on first use
			respectNewValueFromOutside.current = false;
			return;
		}

		if (controlledComponent) {
			// it is controlled component
			dispatch({
				type: 'set-value',
				value
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	return (
		<Field inputCss={filteredInputCss} innerElementsCount={innerElementsCount}>
			<input
				type="number"
				min={0}
				max={59}
				placeholder="h"
				data-name="hours"
				ref={hoursRef}
				value={hours === null ? '' : hours}
				onChange={handlePartialOnChange}
				onClick={handleClick}
				onDoubleClick={handleDoubleClick}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onKeyDown={handleKeyDown}
				disabled={disabled}
				readOnly={readOnly}
			/>
			<span>:</span>
			<input
				type="number"
				min={0}
				max={59}
				placeholder="m"
				data-name="minutes"
				ref={minutesRef}
				value={minutes === null ? '' : minutes}
				onChange={handlePartialOnChange}
				onClick={handleClick}
				onDoubleClick={handleDoubleClick}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onKeyDown={handleKeyDown}
				disabled={disabled}
				readOnly={readOnly}
			/>
			{(precision === 'seconds' || precision === 'milliseconds') && (
				<>
					<span>:</span>
					<input
						type="number"
						min={0}
						max={59}
						placeholder="s"
						data-name="seconds"
						ref={secondsRef}
						value={seconds === null ? '' : seconds}
						onChange={handlePartialOnChange}
						onClick={handleClick}
						onDoubleClick={handleDoubleClick}
						onFocus={handleFocus}
						onBlur={handleBlur}
						onKeyDown={handleKeyDown}
						disabled={disabled}
						readOnly={readOnly}
					/>
				</>
			)}
			{precision === 'milliseconds' && (
				<>
					<span>.</span>
					<input
						type="number"
						min={0}
						max={999}
						placeholder="ms"
						data-name="milliseconds"
						ref={millisecondsRef}
						value={milliseconds === null ? '' : milliseconds}
						onChange={handlePartialOnChange}
						onClick={handleClick}
						onDoubleClick={handleDoubleClick}
						onFocus={handleFocus}
						onBlur={handleBlur}
						onKeyDown={handleKeyDown}
						disabled={disabled}
						readOnly={readOnly}
					/>
				</>
			)}
		</Field>
	);
};

const Field = styled.span`
	display: inline-flex;
	align-items: center;
	box-sizing: border-box;
	font-size: ${({inputCss}) => inputCss.fontSize || '1em'};
	color: ${({inputCss}) => inputCss.color || 'inherit'};

	> input {
		display: inline-block;
		box-sizing: border-box;
		outline: none !important;

		font-size: 1rem;
		font-family: unset;
		font-weight: 600;
		color: #444;
		line-height: 1.3;
		padding: 0.6em;
		margin: 0;
		border: 0 solid transparent;
		box-shadow: none;
		appearance: none;
		border-radius: 0;
		background: transparent;
		word-spacing: normal;
		transition: all 300ms ease-in-out 10ms;
		min-width: 2em;
		max-width: 3em;

		text-shadow: none;
		cursor: text;
		white-space: pre;
		align-items: center;
		text-align: center;
		text-indent: 0;
		letter-spacing: normal;
		text-rendering: optimizeSpeed;

		&:disabled {
			cursor: not-allowed;
		}

		-moz-appearance: textfield;

		::-webkit-inner-spin-button,
		::-webkit-outer-spin-button {
			appearance: none;
			margin: 0;
		}

		${({inputCss}) => css(inputCss)}

		&:nth-child(7) {
			min-width: 3em;
		}
	}

	> span {
		width: 2px;
	}
`;

/**
 * ******************************** EXPORTS **************************************
 */

TimeField.Input = Input;
TimeField.Text = Text;
TimeField.Box = Box;

export default TimeField;
