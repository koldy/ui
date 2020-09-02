import {useMemo} from 'react';

import {getPixelsOrString, getStyleForMargins, isNumberOrString, isObject} from '../../util/helpers';
import ThemeError from '../../theme/ThemeError';

export default ({
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
}) => {
	return useMemo(() => {
		// =============================    WIDTH    ========================================
		const widths = theme.json('inputField.width');
		const widthValue = widths[width] === undefined ? getPixelsOrString(width) : getPixelsOrString([widths[width]]);

		// =============================    VARIANT    ========================================
		const variants = theme.json('inputField.variant');
		if (!isObject(variants[variant])) {
			throw new ThemeError(
				`Wrong <TextField variant="${variant}" /> - "${variant}" is not properly defined in theme.inputField.variant.${variant}`
			);
		}
		const {
			border = null,
			borderWidth = null,
			borderStyle = null,
			borderTopWidth = null,
			borderRightWidth = null,
			borderBottomWidth = null,
			borderLeftWidth = null,
			borderTopColor = null,
			borderRightColor = null,
			borderBottomColor = null,
			borderLeftColor = null,
			borderTopStyle = null,
			borderRightStyle = null,
			borderBottomStyle = null,
			borderLeftStyle = null,
			borderRadius = null,
			fontFamily = null,
			textAlign = 'start',
			transition = null,
			transitionDelay = null,
			transitionDuration = null,
			transitionProperty = null,
			transform = null,
			transformOrigin = null,
			transformStyle = null
		} = variants[variant];

		// =============================    SIZE    ========================================
		const sizes = theme.json('inputField.size');
		if (!isObject(sizes[size])) {
			throw new ThemeError(`Wrong <TextField size="${size}" /> - "${size}" is not properly defined in theme.inputField.size.${size}`);
		}
		const {fontSize, fontWeight, padding, lineHeight, letterSpacing} = sizes[size];

		// =============================    COLOR    ========================================
		const colors = theme.json('inputField.color');
		if (!isObject(colors[color])) {
			throw new ThemeError(`Wrong <TextField color="${color}" /> - "${color}" is not properly defined in theme.inputField.color.${color}`);
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

		const {
			background,
			backgroundSize,
			color: fontColor,
			borderColor,
			boxShadow,
			outline,
			outlineOffset,
			hover = {},
			focus = {},
			placeholder = {}
		} = colorSet;

		const {
			background: hoverBackground,
			color: hoverFontColor,
			borderColor: hoverBorderColor,
			borderTopColor: hoverBorderTopColor,
			borderRightColor: hoverBorderRightColor,
			borderBottomColor: hoverBorderBottomColor,
			borderLeftColor: hoverBorderLeftColor,
			boxShadow: hoverBoxShadow,
			outline: hoverOutline,
			outlineOffset: hoverOutlineOffset
		} = hover;

		const {
			background: focusBackground,
			color: focusFontColor,
			borderColor: focusBorderColor,
			borderTopColor: focusBorderTopColor,
			borderRightColor: focusBorderRightColor,
			borderBottomColor: focusBorderBottomColor,
			borderLeftColor: focusBorderLeftColor,
			boxShadow: focusBoxShadow,
			outline: focusOutline,
			outlineOffset: focusOutlineOffset
		} = focus;

		const {color: placeholderFontColor = null} = placeholder;

		const containerStyle = {
			...getStyleForMargins({m, mt, mr, mb, ml})
		};

		if (isNumberOrString(minWidth)) {
			containerStyle.minWidth = getPixelsOrString(minWidth);
		}

		if (isNumberOrString(maxWidth)) {
			containerStyle.maxWidth = getPixelsOrString(maxWidth);
		}

		if (isNumberOrString(minHeight)) {
			containerStyle.minHeight = getPixelsOrString(minHeight);
		}

		if (isNumberOrString(maxHeight)) {
			containerStyle.maxHeight = getPixelsOrString(maxHeight);
		}

		if (isNumberOrString(height)) {
			containerStyle.height = getPixelsOrString(height);
		}

		return {
			containerStyle,
			containerCss: {
				width: widthValue,
				cursor: disabled ? 'not-allowed' : 'unset',
				border,
				borderWidth,
				borderStyle,
				borderTopWidth,
				borderRightWidth,
				borderBottomWidth,
				borderLeftWidth,
				borderTopColor,
				borderRightColor,
				borderBottomColor,
				borderLeftColor,
				borderTopStyle,
				borderRightStyle,
				borderBottomStyle,
				borderLeftStyle,
				borderRadius,
				borderColor: theme.processColor(borderColor),
				background: theme.processColor(background),
				boxShadow: theme.processColor(boxShadow),
				outline,
				outlineOffset,
				backgroundSize,
				transition,
				transitionDelay,
				transitionDuration,
				transitionProperty,
				transform,
				transformOrigin,
				transformStyle,
				'&:hover': {
					backgroundColor: theme.processColor(hoverBackground),
					borderColor: theme.processColor(hoverBorderColor),
					borderTopColor: theme.processColor(hoverBorderTopColor),
					borderRightColor: theme.processColor(hoverBorderRightColor),
					borderBottomColor: theme.processColor(hoverBorderBottomColor),
					borderLeftColor: theme.processColor(hoverBorderLeftColor),
					boxShadow: theme.processColor(hoverBoxShadow),
					outline: hoverOutline,
					outlineOffset: hoverOutlineOffset
				},
				'&:focus-within': {
					backgroundColor: theme.processColor(focusBackground),
					borderColor: theme.processColor(focusBorderColor),
					borderTopColor: theme.processColor(focusBorderTopColor),
					borderRightColor: theme.processColor(focusBorderRightColor),
					borderBottomColor: theme.processColor(focusBorderBottomColor),
					borderLeftColor: theme.processColor(focusBorderLeftColor),
					boxShadow: theme.processColor(focusBoxShadow),
					outline: focusOutline,
					outlineOffset: focusOutlineOffset
				}
			},
			inputCss: {
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
				},
				'&::placeholder': {
					color: theme.processColor(placeholderFontColor)
				}
			}
		};
	}, [theme, size, width, height, minWidth, maxWidth, minHeight, maxHeight, variant, color, disabled, readOnly, m, mt, mr, mb, ml]);
};
