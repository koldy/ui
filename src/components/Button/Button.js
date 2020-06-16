import React, {forwardRef, useContext, useCallback, useRef, useImperativeHandle} from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

import {getPixelsOrString, getStyleForMargins, getStyleForWidth, isFunction, isObject} from '../../util/helpers';
import ThemeContext from '../../theme/ThemeContext';

const Button = forwardRef(function(props, ref) {
	const {
		children = null,
		type = null,
		name = null,
		disabled = false,
		onClick = null,
		onDoubleClick = null,
		onFocus = null,
		onBlur = null,
		color: userColor = null,
		variant = null,
		width = null,
		size = null,
		style: userStyle = null,
		m = null,
		mt = null,
		mr = null,
		mb = null,
		ml = null,
		...otherProps
	} = props;

	const {theme} = useContext(ThemeContext);

	const innerRef = useRef(null);
	useImperativeHandle(ref, () => innerRef.current);

	const lastName = useRef(null);
	lastName.current = name;

	/* detect type if type is not set */
	let selectedType = type;
	if (selectedType === null) {
		selectedType = onClick ? 'button' : 'submit';
	}

	/* get button data from theme */
	const buttonData = theme.json('button');
	const defaults = theme.json('button.defaults');
	const variants = theme.json('button.variant');
	const buttonColors = theme.json('button.color');
	const widths = theme.json('button.width');
	const sizes = theme.json('button.size');

	/* get the color instance of get the first defined color instance */
	// const color = theme.color(userColor) || theme.firstColor();

	let variantKey = null;
	let useVariant = null;

	/* get the variants - variants are different shapes or style behaviours */

	if (variants[variant]) {
		useVariant = variants[variant];
		variantKey = variant;
	} else if (variants[defaults.variant]) {
		useVariant = variants[defaults.variant];
		variantKey = defaults.variant;
	} else if (variants[Object.keys(variants)[0]]) {
		useVariant = variants[Object.keys(variants)[0]];
		// eslint-disable-next-line
		variantKey = Object.keys(variants)[0];
	}

	if (variant !== null && variant !== variantKey) {
		theme.warning(`<Button variant="${variant}"/> not found so <Button variant="${variantKey}"/> was applied`);
	}

	let variantCss = null;
	// depending on variant, let's process it; it has to be either object or function
	if (typeof useVariant === 'function') {
		// if it's a function, then return value must be object, otherwise it's invalid

		variantCss = useVariant({theme, ...props});

		if (!isObject(variantCss)) {
			theme.warning(
				`Variant function from button.variant.${variantKey} returned invalid value; expected object, got: ${typeof variantCss}`
			);
			variantCss = null;
		} else {
			// it's valid, let's process it
			variantCss = theme.processColors(variantCss);
		}
	} else if (isObject(useVariant)) {
		variantCss = theme.processColors(useVariant);
	} else {
		theme.warning(`Can not process button.variant.${variantKey}; value not function nor object`);
	}

	// width detection
	let widthCss = null;
	let minWidthCss = null;

	if (width === null) {
		// let's examine defaults
		if (defaults.width) {
			if (widths[defaults.width]) {
				minWidthCss = widths[defaults.width];
			} else {
				widthCss = getPixelsOrString(defaults.width);
			}
		}
	} else if (typeof width === 'number' || width) {
		if (widths[width]) {
			minWidthCss = widths[width];
		} else {
			widthCss = getPixelsOrString(width);
		}
	}

	// let's process colors
	const selectedColor = userColor || defaults.color || null;
	let colorsCss = {};

	if (selectedColor === null) {
		if (userColor !== null) {
			theme.warning(`Unable to use <Button color="${userColor}"/>, color not found in button.color`);
		}
	} else {
		// we have something, let's try to use it
		const colorData = buttonColors[selectedColor] || null;

		if (colorData === null) {
			const colorData2 = buttonColors[defaults.color] || null;

			if (colorData2 === null) {
				theme.warning(
					`Unable to use <Button color="${selectedColor}"/>, left button without style because there's no default color either`
				);
			} else {
				colorsCss = theme.processColors(colorData2);
				theme.warning(`Unable to use <Button color="${selectedColor}"/>, so using <Button color="${defaults.color}"/> instead`);
			}
		} else {
			colorsCss = theme.processColors(colorData);
		}
	}

	// process size
	const defaultSizeCss = {
		padding: '0.3rem 0.75rem',
		fontSize: '1rem',
		lineHeight: 1
	};

	let sizeCss = null;

	if (size === null) {
		// let's take default size
		const defaultSize = defaults.size || null;

		if (defaultSize) {
			// we have default size, let's use it
			sizeCss = sizes[defaultSize] || defaultSizeCss;
		}
	} else {
		// size is defined, let's take user defined size
		sizeCss = sizes[size] || null;

		if (sizeCss === null) {
			const defaultSize = defaults.size || null;
			if (defaultSize) {
				// we have default size, let's use it
				sizeCss = sizes[defaultSize] || defaultSizeCss;
				theme.warning(`Unable to use <Button size="${size}"/> because it's not defined; applied default size from theme`);
			} else {
				theme.warning(`Unable to use <Button size="${size}"/> because it's not defined; applied theme default size`);
			}
		}
	}

	/**
	 * ******************************** METHODS **************************************
	 */

	const handleClick = useCallback(
		(e) => {
			e.stopPropagation();

			if (isFunction(onClick)) {
				e.preventDefault();
				onClick({
					element: innerRef.current,
					name: lastName.current
				});
			}
		},
		[onClick]
	);

	const handleDoubleClick = useCallback(
		(e) => {
			e.stopPropagation();

			if (isFunction(onDoubleClick)) {
				e.preventDefault();
				onDoubleClick({
					element: innerRef.current,
					name: lastName.current
				});
			}
		},
		[onDoubleClick]
	);

	const handleFocus = useCallback(() => {
		if (isFunction(onFocus)) {
			onFocus({
				element: innerRef.current,
				name: lastName.current
			});
		}
	}, [onFocus]);

	const handleBlur = useCallback(() => {
		if (isFunction(onBlur)) {
			onBlur({
				element: innerRef.current,
				name: lastName.current
			});
		}
	}, [onBlur]);

	/**
	 * ******************************** STYLE **************************************
	 */

	const style = {
		...getStyleForWidth(width, buttonData.width || {}),
		...getStyleForMargins({m, mt, mr, mb, ml}),
		width: widthCss,
		minWidth: minWidthCss,
		...userStyle
	};

	return (
		<StyledButton
			ref={innerRef}
			type={selectedType}
			onClick={isFunction(onClick) ? handleClick : undefined}
			onDoubleClick={isFunction(onDoubleClick) ? handleDoubleClick : undefined}
			onFocus={isFunction(onFocus) ? handleFocus : undefined}
			onBlur={isFunction(onBlur) ? handleBlur : undefined}
			name={name}
			disabled={disabled}
			theme={theme}
			variantCss={variantCss || ''}
			colorsCss={colorsCss || ''}
			sizeCss={sizeCss}
			role="button"
			style={style}
			{...otherProps}
		>
			{children}
		</StyledButton>
	);
});

Button.propTypes = {
	children: PropTypes.node,
	type: PropTypes.oneOf(['button', 'submit', 'reset']),
	name: PropTypes.string,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	onDoubleClick: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	color: PropTypes.string,
	variant: PropTypes.string,
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	size: PropTypes.string,
	style: PropTypes.object,

	// margins:
	m: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	ml: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const StyledButton = styled.button`
	display: inline-block;
	vertical-align: inherit;
	outline: none;
	text-decoration: none;
	position: relative;
	appearance: none;
	box-sizing: border-box;
	margin: 0;
	padding: 0;

	cursor: pointer;
	touch-action: manipulation;
	border: 1px solid transparent;

	text-transform: none;
	text-align: center;
	text-overflow: ellipsis;
	white-space: nowrap;
	word-wrap: break-word;
	overflow: hidden;
	user-select: none;
	line-height: normal;

	${({sizeCss}) => css(sizeCss)}

	${({variantCss}) => css(variantCss)};
	${({colorsCss}) => css(colorsCss)}
`;

export default Button;
