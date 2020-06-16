import React, {forwardRef, useContext, useMemo, useCallback, useImperativeHandle, useRef} from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

import ThemeContext from '../../theme/ThemeContext';
import {getPixelsOrString, isControlledComponent, isFunction, isNumberOrString} from '../../util/helpers';
import useInputFieldStyleParser from '../../hooks/useInputFieldStyleParser/useInputFieldStyleParser';
import InputFieldContext from '../InputField/InputFieldContext';

import Box from '../InputField/Box';
import Text from '../InputField/Text';

const Select = forwardRef(function(props, ref) {
	const {theme} = useContext(ThemeContext);

	const {size: defaultSize = null, width: defaultWidth = null, variant: defaultVariant, color: defaultColor} = theme.json(
		'inputField.defaults'
	);

	const {
		children = null,
		name = null,
		value,
		defaultValue,
		onChange = null,
		onClick = null,
		onDoubleClick = null,
		onFocus = null,
		onBlur = null,
		variant = defaultVariant,
		color = defaultColor,
		size = defaultSize,
		width = defaultWidth,
		height = null,
		minWidth = null,
		maxWidth = null,
		disabled = false,
		multiple = false,
		visibleOptions,
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

	/**
	 * ******************************** Detect what do we have in children **************************************
	 */

	const childrenIsStandardHTMLDom = useMemo(() => {
		let isStandard = true;

		React.Children.forEach(children, (child) => {
			const {type} = child;

			if (type !== 'option' && type !== 'optgroup') {
				isStandard = false;
			}
		});

		return isStandard;
	}, [children]);

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
			if (isFunction(onChange)) {
				let newValue = null;

				if (multiple) {
					const sel = e.currentTarget;
					newValue = [];
					const len = sel.options.length;

					for (let i = 0; i < len; i += 1) {
						const opt = sel.options[i];

						if (opt.selected) {
							newValue.push(opt.value);
						}
					}
				} else {
					newValue = e.currentTarget.value;
				}

				onChange({
					name,
					value: newValue,
					element: e.currentTarget
				});
			}
		},
		[onChange, name, multiple]
	);

	if (value !== undefined && defaultValue === undefined && !onChange) {
		theme.warning('You must set onChange prop to <Select/> component when using it as controlled component');
	} else if (value !== undefined && defaultValue !== undefined) {
		theme.warning('When using <Select/>, you can set the value OR defaultValue prop, not both');
	}

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
		},
		[onFocus, name]
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
		height,
		minWidth,
		maxWidth,
		variant,
		color,
		disabled,
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
			disabled,
			multiple,
			visibleOptions,
			containerCss,
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
			disabled,
			multiple,
			visibleOptions,
			containerCss,
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
		<Container containerCss={containerCss} style={containerStyle} ref={containerRef}>
			<InputFieldContext.Provider value={context}>
				{childrenIsStandardHTMLDom ? <Input>{children}</Input> : children}
			</InputFieldContext.Provider>
		</Container>
	);
});

Select.propTypes = {
	children: PropTypes.node,
	name: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	color: PropTypes.string,
	size: PropTypes.string,
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onChange: PropTypes.func,
	onClick: PropTypes.func,
	onDoubleClick: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	variant: PropTypes.string,
	disabled: PropTypes.bool,
	multiple: PropTypes.bool,
	visibleOptions: PropTypes.number,
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
	${({containerCss}) => css(containerCss)}
	
	${({minWidthCss}) => (minWidthCss !== null ? `min-width: ${getPixelsOrString(minWidthCss)};` : '')}
	${({maxWidthCss}) => (maxWidthCss !== null ? `max-width: ${getPixelsOrString(maxWidthCss)};` : '')}
`;

/**
 * ******************************** Input **************************************
 */

const Input = function(props) {
	const {children = null, flex = null, width = '100%'} = props;

	const {
		innerRef,
		name,
		value,
		defaultValue,
		controlledComponent,
		multiple,
		visibleOptions,
		disabled,
		inputCss,
		containerCss,
		handleClick,
		handleDoubleClick,
		handleFocus,
		handleBlur,
		handleChange,
		otherProps
	} = useContext(InputFieldContext);

	return (
		<Field containerCss={containerCss} inputCss={inputCss} cssFlex={flex} cssWidth={width}>
			<select
				ref={innerRef}
				name={name}
				value={controlledComponent ? value : undefined}
				defaultValue={!controlledComponent ? defaultValue : undefined}
				multiple={multiple}
				size={visibleOptions}
				disabled={disabled}
				onClick={handleClick}
				onDoubleClick={handleDoubleClick}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onChange={handleChange}
				{...otherProps}
			>
				{children}
			</select>
		</Field>
	);
};

Input.propTypes = {
	children: PropTypes.node,
	flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const Field = styled.span`
	display: inline-block;
	${({cssFlex}) => (isNumberOrString(cssFlex) ? `flex: ${cssFlex};` : '')}
	${({cssWidth}) => (isNumberOrString(cssWidth) ? `width: ${getPixelsOrString(cssWidth)};` : '')}
	position: relative;
	font-size: ${({inputCss}) => inputCss.fontSize || '1rem'};

	> select {
		display: block;
		font-size: 1rem;
		font-family: unset;
		font-weight: 600;
		color: #444;
		line-height: 1.3;
		padding: 0.6em 1.4em 0.5em 0.8em;
		width: 100%;
		height: auto;
		box-sizing: border-box;
		margin: 0;
		border: none;
		box-shadow: none;
		appearance: none;
		border-radius: 0;
		background: transparent;
		word-spacing: normal;
		outline: none;
		overflow: hidden;

		text-shadow: none;
		cursor: default;
		white-space: pre;
		align-items: center;
		text-align: start;
		text-indent: 0;
		letter-spacing: normal;
		text-rendering: optimizeSpeed;

		&::-ms-expand {
			display: none;
		}

		> option {
			font-weight: normal;
		}

		${({inputCss}) => css(inputCss)}
	}

	&:after {
		content: ' ';
		display: block;
		position: absolute;
		top: 50%;
		margin-top: -0.15em;
		right: 0.9em;
		width: 0;
		height: 0;
		border-left: 0.3em solid transparent;
		border-right: 0.3em solid transparent;

		border-top: 0.3em solid ${({containerCss}) => containerCss.borderColor || 'gray'};
		pointer-events: none;
	}
`;

/**
 * ******************************** EXPORTS **************************************
 */

Select.Input = Input;
Select.Text = Text;
Select.Box = Box;

export default Select;
