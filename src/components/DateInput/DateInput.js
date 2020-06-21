import React, {useContext, forwardRef, useCallback, useRef, useImperativeHandle, useMemo, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import {createPopper} from '@popperjs/core';
import isValidDate from 'date-fns/isValid';
import lightFormat from 'date-fns/lightFormat';
import parseISO from 'date-fns/parseISO';

import Box from '../InputField/Box';
import Text from '../InputField/Text';
import DatePicker from '../DatePicker/DatePicker';

import ThemeContext from '../../theme/ThemeContext';
import {getPixelsOrString, isControlledComponent, isFunction, isFunctionOr, isNumberOrString} from '../../util/helpers';
import useInputFieldStyleParser from '../../hooks/useInputFieldStyleParser/useInputFieldStyleParser';
import InputFieldContext from '../InputField/InputFieldContext';
import useOutsideClick from '../../hooks/useOutsideClick/useOutsideClick';
import {fadeInAnimation} from '../../animations/fade';

let inputTimeout = null;
let closeGlobalPopper = null;

/**
 * @param dt
 * @returns {string | *}
 */
const defaultValueFormat = function (dt) {
	return lightFormat(dt, 'yyyy-MM-dd');
};

/**
 * @type {function(*=): string | *}
 */
const defaultDisplayFormat = defaultValueFormat;

/**
 * @param str
 * @returns {Date | *}
 */
const defaultInputParser = function (str) {
	return parseISO(str);
};

/**
 * ******************************** DateField **************************************
 */
const DateInput = forwardRef(function (props, ref) {
	const {theme} = useContext(ThemeContext);

	const {
		size: defaultSize = null,
		width: defaultWidth = null,
		variant: defaultVariant,
		color: defaultColor,
		zIndex: baseZIndex = 5000
	} = theme.json('inputField.defaults');

	const {
		children = null,
		name = null,
		value = undefined,
		defaultValue = undefined,
		placeholder = null,
		color = defaultColor,
		size = defaultSize,
		variant = defaultVariant,
		width = defaultWidth,
		minWidth = null,
		maxWidth = null,
		onChange = null,
		onInput = null,
		inputDelay = 300,
		onClick = null,
		onDoubleClick = null,
		onFocus = null,
		onBlur = null,
		disabled = false,
		readOnly = false,
		containerRef = null,
		// calendar props
		minDate = null,
		maxDate = null,

		// other props
		m = null,
		mt = null,
		mr = null,
		mb = null,
		ml = null,
		...otherProps
	} = props;

	const valueFormat = isFunctionOr(props.valueFormat, defaultValueFormat);
	const displayFormat = isFunctionOr(props.displayFormat, defaultDisplayFormat);
	const inputParser = isFunctionOr(props.inputParser, defaultInputParser);

	const popper = useRef(null);
	const popperRef = useRef(null);
	const innerRef = useRef(null);
	useImperativeHandle(ref, () => innerRef.current);

	if (value !== undefined && defaultValue === undefined && !onChange) {
		theme.error('You must set onChange prop to <DateField/> component when using it as controlled component');
	} else if (value !== undefined && defaultValue !== undefined) {
		theme.error('When using <DateField/>, you can set the value OR defaultValue prop, not both');
	}

	const controlledComponent = isControlledComponent(value, defaultValue);
	const [internalValue, setInternalValue] = useState(controlledComponent ? value : defaultValue);

	/**
	 * ******************************** Popper stuff **************************************
	 */

	const hidePopper = useCallback(() => {
		popperRef.current.dataset.show = 'no';

		if (popper.current && isFunction(popper.current.destroy)) {
			popper.current.destroy();
			popper.current = null;
			closeGlobalPopper = null;
		}
	}, []);

	const showPopper = useCallback(() => {
		if (!disabled) {
			popperRef.current.dataset.show = 'yes';

			if (popper.current === null) {
				if (isFunction(closeGlobalPopper)) {
					closeGlobalPopper();
				}

				popper.current = createPopper(innerRef.current, popperRef.current, {
					placement: 'bottom',
					modifiers: [
						{
							name: 'offset',
							options: {
								offset: [0, 16]
							}
						},
						{
							name: 'flip',
							options: {
								fallbackPlacements: ['top', 'right', 'left']
							}
						}
					]
				});

				closeGlobalPopper = hidePopper;
			}
		}
	}, [hidePopper, disabled]);

	useOutsideClick(popperRef, hidePopper, innerRef);

	/**
	 * ******************************** CLICK and DOUBLE CLICK **************************************
	 */
	const handleClick = useCallback(
		(e) => {
			e.stopPropagation();

			if (isFunction(onClick)) {
				onClick({
					name,
					value: e.currentTarget.value,
					element: e.currentTarget
				});
			}
		},
		[onClick, name]
	);

	const handleDoubleClick = useCallback(
		(e) => {
			e.stopPropagation();

			if (isFunction(onDoubleClick)) {
				onDoubleClick({
					name,
					value: e.currentTarget.value,
					element: e.currentTarget
				});
			}
		},
		[onDoubleClick, name]
	);

	/**
	 * ******************************** ON CHANGE **************************************
	 */

	const handleChange = useCallback(
		(e) => {
			const {value: stringValue} = e.currentTarget;
			showPopper();

			let date = null;

			try {
				date = inputParser(stringValue);
			} catch (ignored) {
				date = 'Invalid Date';
			}

			if (isFunction(onChange)) {
				onChange({
					name,
					value: date,
					valueString: stringValue,
					element: e.currentTarget
				});
			}

			if (isFunction(onInput) && typeof inputDelay === 'number' && inputDelay > 0) {
				if (inputTimeout) {
					clearTimeout(inputTimeout);
				}

				const delayedName = name;
				const delayedValue = date;
				const delayedValueString = stringValue;
				const delayedElement = e.currentTarget;

				inputTimeout = setTimeout(() => {
					if (delayedElement && isFunction(onInput)) {
						onInput({
							name: delayedName,
							value: delayedValue,
							valueString: delayedValueString,
							element: delayedElement
						});
					}

					inputTimeout = null;
				}, inputDelay);
			}
		},
		[onChange, onInput, inputDelay, name, showPopper, inputParser]
	);

	const handleDateChange = useCallback(
		({value: selectedDateValue}) => {
			setInternalValue(selectedDateValue);
			innerRef.current.value = isFunction(displayFormat) ? displayFormat(selectedDateValue) : lightFormat(selectedDateValue, 'yyyy-MM-dd');

			if (isFunction(onChange)) {
				onChange({
					name,
					value: selectedDateValue,
					valueString: innerRef.current.value,
					element: innerRef.current
				});
			}
		},
		[displayFormat, onChange, name]
	);

	const clearValue = useCallback(() => {
		setInternalValue(null);

		if (!controlledComponent) {
			innerRef.current.value = '';
			showPopper();
		}
	}, [controlledComponent, showPopper]);

	/**
	 * ******************************** FOCUS and BLUR **************************************
	 */

	const handleFocus = useCallback(
		(e) => {
			e.stopPropagation();

			if (isFunction(onFocus)) {
				const {value: newValue} = e.currentTarget;

				onFocus({
					name,
					value: newValue,
					element: e.currentTarget
				});
			}

			showPopper();
		},
		[onFocus, name, showPopper]
	);

	const handleBlur = useCallback(
		(e) => {
			e.stopPropagation();

			if (isFunction(onBlur)) {
				const {value: newValue} = e.currentTarget;

				onBlur({
					name,
					value: newValue,
					element: e.currentTarget
				});
			}
		},
		[onBlur, name]
	);

	const focusField = useCallback(() => {
		if (innerRef && innerRef.current && isFunction(innerRef.current.focus)) {
			innerRef.current.focus();
		}
	}, [innerRef]);

	/**
	 * ******************************** STYLE PARSER **************************************
	 */

	const {containerStyle, containerCss, inputCss} = useInputFieldStyleParser({
		theme,
		size,
		width,
		minWidth,
		maxWidth,
		variant,
		color,
		disabled,
		readOnly,
		m,
		mt,
		mr,
		mb,
		ml
	});

	/**
	 * ******************************** LOCAL CONTEXT **************************************
	 */

	const context = useMemo(
		() => ({
			innerRef,
			name,
			value,
			defaultValue,
			controlledComponent,
			placeholder,
			disabled,
			readOnly,
			inputCss,
			handleClick,
			handleDoubleClick,
			handleFocus,
			handleBlur,
			handleChange,
			focusField,
			hidePopper,
			internalValue,
			setInternalValue,
			displayFormat,
			inputParser,
			clearValue,
			otherProps
		}),
		[
			innerRef,
			name,
			value,
			defaultValue,
			controlledComponent,
			placeholder,
			disabled,
			readOnly,
			inputCss,
			handleClick,
			handleDoubleClick,
			handleFocus,
			handleBlur,
			handleChange,
			focusField,
			hidePopper,
			internalValue,
			setInternalValue,
			displayFormat,
			inputParser,
			clearValue,
			otherProps
		]
	);

	return (
		<>
			<Container $containerCss={containerCss} style={containerStyle} ref={containerRef} onClick={showPopper}>
				{name && <input type="hidden" name={name} value={isValidDate(internalValue) ? valueFormat(internalValue) : ''} />}
				<InputFieldContext.Provider value={context}>{children || <Input />}</InputFieldContext.Provider>
			</Container>
			<PopperWrapper $containerCss={containerCss} $baseZIndex={baseZIndex} ref={popperRef} data-show="no">
				<DatePicker minDate={minDate} maxDate={maxDate} value={internalValue || null} onChange={handleDateChange} />
				<div className="arrow" data-popper-arrow="" />
			</PopperWrapper>
		</>
	);
});

DateInput.propTypes = {
	children: PropTypes.node,
	name: PropTypes.string,
	value: PropTypes.instanceOf(Date),
	defaultValue: PropTypes.instanceOf(Date),
	placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	color: PropTypes.string,
	size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	variant: PropTypes.string,
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onChange: PropTypes.func,
	onInput: PropTypes.func,
	inputDelay: PropTypes.number,
	onClick: PropTypes.func,
	onDoubleClick: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	disabled: PropTypes.bool,
	readOnly: PropTypes.bool,
	containerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({current: PropTypes.any})]),
	// calendar props
	minDate: PropTypes.instanceOf(Date),
	maxDate: PropTypes.instanceOf(Date),

	// component specific props
	valueFormat: PropTypes.func,
	displayFormat: PropTypes.func,
	inputParser: PropTypes.func,

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
	align-items: center;
	border: 2px solid #cfcfcf;
	height: auto;
	padding: 0 !important;
	box-sizing: border-box;
	position: relative;
	${({$containerCss}) => css($containerCss)}
`;

/**
 * ******************************** Input **************************************
 */

const Input = function (props) {
	const {flex = null, width = '100%'} = props;

	const {
		innerRef,
		defaultValue,
		controlledComponent,
		placeholder,
		disabled,
		readOnly,
		inputCss,
		handleClick,
		handleDoubleClick,
		handleFocus,
		handleBlur,
		handleChange,
		hidePopper,
		internalValue,
		setInternalValue,
		inputParser,
		displayFormat,
		otherProps
	} = useContext(InputFieldContext);

	const mounted = useRef(false);

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.keyCode === 9) {
				hidePopper();
			}
		};

		innerRef.current.addEventListener('keydown', handleKeyDown, true);

		return () => {
			innerRef.current.removeEventListener('keydown', handleKeyDown, true);
		};
	}, []);

	useEffect(() => {
		const handleInputChange = (e) => {
			// parse value and set the internal value if possible
			try {
				const date = inputParser(e.currentTarget.value);

				if (isValidDate(date)) {
					setInternalValue(date);
				} else {
					setInternalValue(null);
				}
			} catch (ignored) {}
		};

		if (!mounted.current) {
			innerRef.current.addEventListener('input', handleInputChange, true);
		}

		mounted.current = true;

		return () => {
			mounted.current = false;
			innerRef.current.removeEventListener('input', handleInputChange, true);
		};
	}, [inputParser]);

	let givenValue;
	let givenDefaultValue;

	if (controlledComponent) {
		if (isValidDate(internalValue)) {
			givenValue = displayFormat(internalValue);
		} else {
			givenValue = '';
		}
	} else if (isValidDate(defaultValue)) {
		givenDefaultValue = displayFormat(defaultValue);
	}

	return (
		<Field
			ref={innerRef}
			type="text"
			value={givenValue}
			defaultValue={givenDefaultValue}
			placeholder={placeholder}
			disabled={disabled}
			readOnly={readOnly}
			onClick={handleClick}
			onDoubleClick={handleDoubleClick}
			onFocus={handleFocus}
			onBlur={handleBlur}
			onChange={handleChange}
			inputCss={inputCss}
			cssFlex={flex}
			cssWidth={width}
			{...otherProps}
		/>
	);
};

Input.propTypes = {
	flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const Field = styled.input`
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

	text-shadow: none;
	cursor: text;
	white-space: pre;
	align-items: center;
	text-align: start;
	text-indent: 0;
	letter-spacing: normal;
	text-rendering: optimizeSpeed;
	
	&:-webkit-autofill,
	&:-webkit-autofill:hover,
	&:-webkit-autofill:focus,
	&:-webkit-autofill:active {
	    -webkit-transition: color 9999s ease-out, background-color 9999s ease-out;
	    -webkit-transition-delay: 9999s;
	}

	&:disabled {
		cursor: not-allowed;
	}

	${({inputCss}) => css(inputCss)}
	${({cssFlex}) => (isNumberOrString(cssFlex) ? `flex: ${cssFlex};` : '')}
	${({cssWidth}) => (isNumberOrString(cssWidth) ? `width: ${getPixelsOrString(cssWidth)};` : '')}
`;

const PopperWrapper = styled.div`
	background: ${({$containerCss}) => $containerCss.background || '#fff'};
	padding: 0.3rem;
	box-sizing: border-box;
	border: 2px solid ${({$containerCss}) => $containerCss.borderColor || 'transparent'};
	width: fit-content;
	z-index: ${({$baseZIndex}) => $baseZIndex + 1};
	box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1), 0 2px 4px rgba(16, 22, 26, 0.2), 0 8px 24px rgba(16, 22, 26, 0.2);
	user-select: none;
	border-radius: 3px;
	display: none;
	position: absolute;
	animation: none;

	&[data-show='yes'] {
		display: block;
		animation: ${fadeInAnimation({animationDuration: '180ms'})};
	}

	> .arrow,
	> .arrow::before {
		position: absolute;
		width: 20px;
		height: 20px;
	}

	> .arrow::before {
		content: '';
		width: 0;
		height: 0;
	}

	> .arrow::after {
		content: '';
		position: absolute;
		width: 0;
		height: 0;
	}

	&[data-popper-placement^='top'] > .arrow {
		bottom: -20px;

		&:before {
			border-left: 12px solid transparent;
			border-right: 12px solid transparent;
			border-top: 12px solid ${({$containerCss}) => $containerCss.borderColor || 'transparent'};
		}

		&:after {
			bottom: 12px;
			left: 4px;
			border-left: 8px solid transparent;
			border-right: 8px solid transparent;
			border-top: 8px solid ${({$containerCss}) => $containerCss.background || '#fff'};
		}
	}

	&[data-popper-placement^='bottom'] > .arrow {
		top: -12px;

		&:before {
			border-left: 12px solid transparent;
			border-right: 12px solid transparent;
			border-bottom: 12px solid ${({$containerCss}) => $containerCss.borderColor || 'transparent'};
		}

		&:after {
			top: 4px;
			left: 4px;
			border-left: 8px solid transparent;
			border-right: 8px solid transparent;
			border-bottom: 8px solid ${({$containerCss}) => $containerCss.background || '#fff'};
		}
	}

	&[data-popper-placement^='left'] > .arrow {
		right: -20px;

		&:before {
			border-top: 12px solid transparent;
			border-bottom: 12px solid transparent;
			border-left: 12px solid ${({$containerCss}) => $containerCss.borderColor || 'transparent'};
		}

		&:after {
			top: 4px;
			left: 0;
			border-top: 8px solid transparent;
			border-bottom: 8px solid transparent;
			border-left: 8px solid ${({$containerCss}) => $containerCss.background || '#fff'};
		}
	}

	&[data-popper-placement^='right'] > .arrow {
		left: -12px;

		&:before {
			border-top: 12px solid transparent;
			border-bottom: 12px solid transparent;
			border-right: 12px solid ${({$containerCss}) => $containerCss.borderColor || 'transparent'};
		}

		&:after {
			top: 4px;
			left: 4px;
			border-top: 8px solid transparent;
			border-bottom: 8px solid transparent;
			border-right: 8px solid ${({$containerCss}) => $containerCss.background || '#fff'};
		}
	}

	&[data-popper-reference-hidden] {
		visibility: hidden;
		pointer-events: none;
	}
`;

/**
 * ******************************** EXPORTS **************************************
 */

DateInput.Input = Input;
DateInput.Text = Text;
DateInput.Box = Box;

export default DateInput;
