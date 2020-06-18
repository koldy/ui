import React, {useContext, forwardRef, useCallback, useRef, useImperativeHandle, useMemo, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import {createPopper} from '@popperjs/core';

import Box from '../InputField/Box';
import Text from '../InputField/Text';
import DatePicker from '../DatePicker/DatePicker';

import ThemeContext from '../../theme/ThemeContext';
import {getPixelsOrString, isControlledComponent, isNumberOrString} from '../../util/helpers';
import useInputFieldStyleParser from '../../hooks/useInputFieldStyleParser/useInputFieldStyleParser';
import InputFieldContext from '../InputField/InputFieldContext';

let inputTimeout = null;

/**
 * ******************************** DateField **************************************
 */
const DateField = forwardRef(function (props, ref) {
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

		// other props
		m = null,
		mt = null,
		mr = null,
		mb = null,
		ml = null,
		...otherProps
	} = props;

	const popper = useRef(null);
	const popperRef = useRef(null);
	const innerRef = useRef(null);
	useImperativeHandle(ref, () => innerRef.current);

	if (value !== undefined && defaultValue === undefined && !onChange) {
		theme.error('You must set onChange prop to <DateField/> component when using it as controlled component');
	} else if (value !== undefined && defaultValue !== undefined) {
		theme.error('When using <DateField/>, you can set the value OR defaultValue prop, not both');
	}

	/**
	 * ******************************** CLICK and DOUBLE CLICK **************************************
	 */

	const handleClick = useCallback(
		(e) => {
			e.stopPropagation();

			if (typeof onClick === 'function') {
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

			if (typeof onDoubleClick === 'function') {
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
			const {value: newValue} = e.currentTarget;

			if (typeof onChange === 'function') {
				onChange({
					name,
					value: newValue,
					element: e.currentTarget
				});
			}

			if (typeof onInput === 'function' && typeof inputDelay === 'number' && inputDelay > 0) {
				if (inputTimeout) {
					clearTimeout(inputTimeout);
				}

				const delayedName = name;
				const delayedValue = newValue;
				const delayedElement = e.currentTarget;

				inputTimeout = setTimeout(() => {
					if (delayedElement && typeof onInput === 'function') {
						onInput({
							name: delayedName,
							value: delayedValue,
							element: delayedElement
						});
					}

					inputTimeout = null;
				}, inputDelay);
			}
		},
		[onChange, onInput, inputDelay, name]
	);

	/**
	 * ******************************** FOCUS and BLUR **************************************
	 */

	const handleFocus = useCallback(
		(e) => {
			e.stopPropagation();

			if (typeof onFocus === 'function') {
				const {value: newValue} = e.currentTarget;

				onFocus({
					name,
					value: newValue,
					element: e.currentTarget
				});
			}
		},
		[onFocus, name]
	);

	const handleBlur = useCallback(
		(e) => {
			e.stopPropagation();

			if (typeof onBlur === 'function') {
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
		if (innerRef && innerRef.current && typeof innerRef.current.focus === 'function') {
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
			controlledComponent: isControlledComponent(value, defaultValue),
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
			otherProps
		}),
		[
			innerRef,
			name,
			value,
			defaultValue,
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
			otherProps
		]
	);

	useEffect(() => {
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
						fallbackPlacements: ['top', 'right']
					}
				}
			]
		});
	}, []);

	return (
		<>
			<Container $containerCss={containerCss} style={containerStyle} ref={containerRef}>
				<InputFieldContext.Provider value={context}>{children || <Input />}</InputFieldContext.Provider>
			</Container>
			<PopperWrapper $containerCss={containerCss} $baseZIndex={baseZIndex} ref={popperRef}>
				<DatePicker />
				<div className="arrow" data-popper-arrow="" />
			</PopperWrapper>
		</>
	);
});

DateField.propTypes = {
	children: PropTypes.node,
	name: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
		otherProps
	} = useContext(InputFieldContext);

	return (
		<Field
			ref={innerRef}
			type="text"
			name={name}
			value={controlledComponent ? value : undefined}
			defaultValue={!controlledComponent ? defaultValue : undefined}
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
			border-top: 8px solid ${({$containerCss}) => $containerCss.background || '#ffffff'};
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
			border-bottom: 8px solid ${({$containerCss}) => $containerCss.background || '#ffffff'};
		}
	}

	&[data-popper-placement^='left'] > .arrow {
		right: -10px;
	}

	&[data-popper-placement^='right'] > .arrow {
		left: -10px;
	}

	&[data-popper-reference-hidden] {
		visibility: hidden;
		pointer-events: none;
	}
`;

/**
 * ******************************** EXPORTS **************************************
 */

DateField.Input = Input;
DateField.Text = Text;
DateField.Box = Box;

export default DateField;
