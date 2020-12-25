import React, {useContext, forwardRef, useCallback, useRef, useImperativeHandle, useMemo} from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

import Box from '../InputField/Box';
import Text from '../InputField/Text';

import ThemeContext from '../../theme/ThemeContext';
import {getPixelsOrString, isControlledComponent, isNumberOrString} from '../../util/helpers';
import useInputFieldStyleParser from '../../hooks/useInputFieldStyleParser/useInputFieldStyleParser';
import InputFieldContext from '../InputField/InputFieldContext';

let inputTimeout = null;

/**
 * ******************************** TextField **************************************
 */
const TextField = forwardRef(function (props, ref) {
	const {theme} = useContext(ThemeContext);

	const {size: defaultSize = null, width: defaultWidth = null, variant: defaultVariant, color: defaultColor} = theme.json(
		'inputField.defaults'
	);

	const {
		children = null,
		type = null,
		name = null,
		value = undefined,
		defaultValue = undefined,
		placeholder = null,
		color = null,
		size = null,
		variant = null,
		width = null,
		minWidth = null,
		maxWidth = null,
		verticalAlign = null,
		onChange = null,
		onInput = null,
		inputDelay = null,
		onClick = null,
		onDoubleClick = null,
		onFocus = null,
		onBlur = null,
		disabled = false,
		readOnly = false,
		containerRef = null,
		m = null,
		mt = null,
		mr = null,
		mb = null,
		ml = null,
		...otherProps
	} = props;

	const innerRef = useRef(null);
	useImperativeHandle(ref, () => innerRef.current);

	if (value !== undefined && defaultValue === undefined && !onChange) {
		theme.error('You must set onChange prop to <TextField/> component when using it as controlled component');
	} else if (value !== undefined && defaultValue !== undefined) {
		theme.error('When using <TextField/>, you can set the value OR defaultValue prop, not both');
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

			if (typeof onInput === 'function' && ((typeof inputDelay === 'number' && inputDelay > 0) || inputDelay === null)) {
				if (inputTimeout) {
					clearTimeout(inputTimeout);
				}

				const delayedName = name;
				const delayedValue = newValue;
				const delayedElement = e.currentTarget;

				inputTimeout = setTimeout(
					() => {
						if (delayedElement && typeof onInput === 'function') {
							onInput({
								name: delayedName,
								value: delayedValue,
								element: delayedElement
							});
						}

						inputTimeout = null;
					},
					typeof inputDelay === 'number' ? inputDelay : 300
				);
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
		size: size || defaultSize,
		width: isNumberOrString(width) ? width : defaultWidth,
		minWidth,
		maxWidth,
		variant: variant || defaultVariant,
		color: color || defaultColor,
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
			type,
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
			type,
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

	return (
		<Container $containerCss={containerCss} style={containerStyle} ref={containerRef} $verticalAlign={verticalAlign}>
			<InputFieldContext.Provider value={context}>{children || <Input />}</InputFieldContext.Provider>
		</Container>
	);
});

TextField.propTypes = {
	children: PropTypes.node,
	type: PropTypes.oneOf([
		'text',
		'password',
		'tel',
		'email',
		'search',
		'number',
		'url',
		'date',
		'datetime-local',
		'month',
		'time',
		'week',
		'color'
	]),
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
	verticalAlign: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
	vertical-align: ${({$verticalAlign}) => (isNumberOrString($verticalAlign) ? $verticalAlign : 'middle')};
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
		type,
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
		<InputWrapper $inputCss={inputCss} $cssFlex={flex} $cssWidth={width}>
			<input
				ref={innerRef}
				type={type || 'text'}
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
				{...otherProps}
			/>
		</InputWrapper>
	);
};

Input.propTypes = {
	flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const InputWrapper = styled.span`
	display: block;
	box-sizing: border-box;
	font-size: 1rem;
	font-family: unset;
	font-weight: 600;
	color: #444;
	line-height: 1.3;
	padding: 0;
	margin: 0;
	border: 0 solid transparent;
	box-shadow: none;
	border-radius: 0;
	background: transparent;
	word-spacing: normal;
	flex: 1;

	text-shadow: none;
	cursor: text;

	> input {
		display: block;
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
		width: ${({$cssWidth}) => (isNumberOrString($cssWidth) ? getPixelsOrString($cssWidth) : '100%')};

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

		${({$inputCss}) => css($inputCss)}
		${({$cssFlex}) => (isNumberOrString($cssFlex) ? `flex: ${$cssFlex};` : '')}
	}
`;

/**
 * ******************************** EXPORTS **************************************
 */

TextField.Input = Input;
TextField.Text = Text;
TextField.Box = Box;

export default TextField;
