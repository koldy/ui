import React, {forwardRef, useContext, useCallback} from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

import {isFunction} from '../../util/helpers';
import ThemeContext from '../../theme/ThemeContext';
import useInputFieldStyleParser from '../../hooks/useInputFieldStyleParser';

const TextArea = forwardRef(function(props, ref) {
	const {theme} = useContext(ThemeContext);

	const {size: defaultSize, width: defaultWidth, variant: defaultVariant, color: defaultColor} = theme.json('inputField.defaults');

	const {
		name = null,
		value,
		defaultValue,
		onChange = null,
		variant = defaultVariant,
		color = defaultColor,
		size = defaultSize,
		width = defaultWidth,
		minWidth = null,
		maxWidth = null,
		height = null,
		minHeight = null,
		maxHeight = null,
		rows,
		disabled = false,
		readOnly = false,
		placeholder = null,
		onClick = null,
		onDoubleClick = null,
		resize = 'none',
		containerRef,
		m = null,
		mt = null,
		mr = null,
		mb = null,
		ml = null,
		...otherProps
	} = props;

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
				const {value: newValue} = e.currentTarget;

				onChange({
					name,
					value: newValue,
					element: e.currentTarget
				});
			}
		},
		[onChange, name]
	);

	if (value !== undefined && defaultValue === undefined && !onChange) {
		theme.error('You must set onChange prop to <TextArea/> component when using it as controlled component');
	} else if (value !== undefined && defaultValue !== undefined) {
		theme.error('When using <TextArea/>, you can set the value OR defaultValue prop, not both');
	}

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
		minHeight,
		maxHeight,
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

	return (
		<Container containerCss={containerCss} style={containerStyle} ref={containerRef}>
			<Field
				ref={ref}
				name={name}
				value={value || undefined}
				defaultValue={defaultValue || undefined}
				onChange={handleChange}
				onClick={handleClick}
				onDoubleClick={handleDoubleClick}
				inputCss={inputCss}
				disabled={disabled}
				readOnly={readOnly}
				placeholder={placeholder}
				resize={resize}
				rows={rows}
				{...otherProps}
			/>
		</Container>
	);
});

TextArea.propTypes = {
	name: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	color: PropTypes.string,
	size: PropTypes.string,
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	rows: PropTypes.number,
	variant: PropTypes.string,
	disabled: PropTypes.bool,
	readOnly: PropTypes.bool,
	resize: PropTypes.oneOf(['none', 'both', 'vertical', 'horizontal']),
	containerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({current: PropTypes.any})]),

	onChange: PropTypes.func,
	onClick: PropTypes.func,
	onDoubleClick: PropTypes.func,

	// margins:
	m: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	ml: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const Container = styled.span`
	display: inline-block;
	vertical-align: middle;
	border: none;
	height: auto;
	padding: 0 !important;
	box-sizing: border-box;
	position: relative;
	${({containerCss}) => css(containerCss)}
`;

const Field = styled.textarea`
	display: block;
	font-size: 1rem;
	font-family: unset;
	font-weight: 600;
	color: #444;
	line-height: 1.3;
	padding: 0.6em;
	width: 100%;
	box-sizing: border-box;
	margin: 0;
	border: none;
	box-shadow: none;
	appearance: none;
	border-radius: 0;
	background-color: transparent;
	word-spacing: normal;
	transition: opacity 200ms ease, background-color 300ms ease-in-out;
	outline: none;
	resize: ${({resize}) => resize};

	text-shadow: none;
	cursor: text;
	white-space: pre-line;
	align-items: center;
	text-align: start;
	text-indent: 0;
	letter-spacing: normal;
	text-rendering: optimizeSpeed;

	${({inputCss}) => css(inputCss)};
`;

export default TextArea;
