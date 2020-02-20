/* eslint jsx-a11y/label-has-associated-control: 0 */
import React, {useContext, forwardRef, useCallback, useRef, useImperativeHandle, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

import ThemeContext from '../../theme/ThemeContext';
import {getPixelsOrString, isFunction, isNumberOrString} from '../../util/helpers';
import useInputFieldStyleParser from '../../hooks/useInputFieldStyleParser';
import InputFieldContext from '../InputField/InputFieldContext';

import Box from '../InputField/Box';
import Text from '../InputField/Text';

/**
 * ******************************** FileField **************************************
 */
const FileField = forwardRef(function(props, ref) {
	const {theme} = useContext(ThemeContext);

	const {size: defaultSize = null, width: defaultWidth = null, variant: defaultVariant, color: defaultColor} = theme.json(
		'inputField.defaults'
	);

	const {
		children = null,
		name = null,
		accept = null,
		multiple = false,
		placeholder = null,
		color = defaultColor,
		size = defaultSize,
		variant = defaultVariant,
		width = defaultWidth,
		minWidth = null,
		maxWidth = null,
		onChange = null,
		onClick = null,
		onDoubleClick = null,
		onFocus = null,
		onBlur = null,
		disabled = false,
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
	 * ******************************** CLICK and DOUBLE CLICK **************************************
	 */

	const handleClick = useCallback(
		(e) => {
			e.stopPropagation();

			if (isFunction(onClick)) {
				onClick({
					name,
					files: e.currentTarget.files,
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
					files: e.currentTarget.files,
					element: e.currentTarget
				});
			}
		},
		[onDoubleClick, name]
	);

	/**
	 * ******************************** FOCUS and BLUR **************************************
	 */

	const handleFocus = useCallback(
		(e) => {
			e.stopPropagation();

			if (isFunction(onFocus)) {
				onFocus({
					name,
					files: e.currentTarget.files,
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
				onBlur({
					name,
					files: e.currentTarget.files,
					element: e.currentTarget
				});
			}
		},
		[onBlur, name]
	);

	const focusField = useCallback(() => {
		if (innerRef && innerRef.current && typeof innerRef.current.click === 'function') {
			innerRef.current.click();
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
			placeholder,
			accept,
			multiple,
			disabled,
			inputCss,
			handleClick,
			handleDoubleClick,
			handleFocus,
			handleBlur,
			onChange,
			focusField,
			otherProps
		}),
		[
			innerRef,
			name,
			placeholder,
			accept,
			multiple,
			disabled,
			inputCss,
			handleClick,
			handleDoubleClick,
			handleFocus,
			handleBlur,
			onChange,
			focusField,
      otherProps
		]
	);

	return (
		<Container containerCss={containerCss} style={containerStyle} ref={containerRef}>
			<InputFieldContext.Provider value={context}>{children || <Input />}</InputFieldContext.Provider>
		</Container>
	);
});

FileField.propTypes = {
	children: PropTypes.node,
	name: PropTypes.string,
	accept: PropTypes.string,
	multiple: PropTypes.bool,
	placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func]),
	color: PropTypes.string,
	size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	variant: PropTypes.string,
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onChange: PropTypes.func,
	onClick: PropTypes.func,
	onDoubleClick: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	disabled: PropTypes.bool,
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
`;

/**
 * ******************************** Input **************************************
 */

const Input = function(props) {
	const {flex = null, width = '100%'} = props;

	const [files, setFiles] = useState(null);

	const {
		innerRef,
		name,
		placeholder,
		accept,
		multiple,
		disabled,
		inputCss,
		handleClick,
		handleDoubleClick,
		handleFocus,
		handleBlur,
		onChange,
		otherProps
	} = useContext(InputFieldContext);

	const handleChange = useCallback(
		(e) => {
			const {files: inputFiles} = e.currentTarget;
			setFiles(inputFiles);

			if (isFunction(onChange)) {
				onChange({
					files: inputFiles,
					name,
					element: innerRef.current
				});
			}
		},
		[onChange, name, innerRef]
	);

	const placeholderText = useMemo(() => {
		if (isNumberOrString(placeholder)) {
			return placeholder;
		}

		if (isFunction(placeholder)) {
			let totalSize = 0;

			if (files instanceof FileList) {
				for (let i = 0; i < files.length; i += 1) {
					const file = files[i];
					totalSize += file.size;
				}
			}

			return placeholder({files, totalSize});
		}

		return null;
	}, [placeholder, files]);

	return (
		<FieldContainer inputCss={inputCss} cssFlex={flex} cssWidth={width}>
			<label>
				<input
					ref={innerRef}
					type="file"
					name={name}
					accept={accept}
					multiple={multiple}
					disabled={disabled}
					onClick={handleClick}
					onDoubleClick={handleDoubleClick}
					onFocus={handleFocus}
					onBlur={handleBlur}
					onChange={handleChange}
					{...otherProps}
				/>
				{placeholderText || <>&nbsp;</>}
			</label>
		</FieldContainer>
	);
};

Input.propTypes = {
	flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const FieldContainer = styled.span`
	display: inline-block;
	box-sizing: border-box;
	outline: none !important;

	font-size: unset;
	font-family: unset;
	line-height: unset;
	padding: 0;
	margin: 0;
	border: 0 solid transparent;
	box-shadow: none;
	appearance: none;
	border-radius: 0;
	background: transparent;
	word-spacing: normal;

	text-shadow: none;
	white-space: pre;
	align-items: center;
	text-align: start;
	text-indent: 0;
	letter-spacing: normal;
	text-rendering: optimizeSpeed;

	${({cssFlex}) => (isNumberOrString(cssFlex) ? `flex: ${cssFlex};` : '')}
	${({cssWidth}) => (isNumberOrString(cssWidth) ? `width: ${getPixelsOrString(cssWidth)};` : '')}

	input {
		box-sizing: border-box;
		border: 0;
		clip: rect(0, 0, 0, 0);
		height: 1px;
		overflow: hidden;
		padding: 0;
		position: absolute !important;
		white-space: nowrap;
		width: 1px;
		outline: none;

		&:disabled {
			cursor: not-allowed;
		}
	}

	label {
		display: inline-block;
		vertical-align: inherit;
		box-sizing: border-box;
		width: 100%;
		padding: 0;
		margin: 0;
		background: transparent;
		cursor: pointer;
		outline: none;
		white-space: nowrap;
		text-overflow: ellipsis;
		${({inputCss}) => css(inputCss)}
	}
`;

/**
 * ******************************** EXPORTS **************************************
 */

FileField.Input = Input;
FileField.Text = Text;
FileField.Box = Box;

export default FileField;
