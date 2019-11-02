import React, {useContext, useMemo, useCallback, forwardRef} from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

import {
	getStyleForMargins,
	getStyleForPaddings,
	getStyleForStringOrNumber,
	getStyleForValue,
	isFunction,
	omit
} from '../../util/helpers';
import ThemeContext from '../../theme/ThemeContext';

const Text = forwardRef(function(props, ref) {
	const {
		children = null,
		block = false,
		style: userStyle = null,
		variant = null,
		color = null,
		onClick = null,
		onDoubleClick = null,
		fontFamily = null,
		fontSize = null,
		fontWeight = null,
		lineHeight = null,
		as: userAs = null,
		m = null,
		mt = null,
		mr = null,
		mb = null,
		ml = null,
		p = null,
		pt = null,
		pr = null,
		pb = null,
		pl = null
	} = props;

	const {theme} = useContext(ThemeContext);

	/**
	 * ******************************** CLICK EVENTS **************************************
	 */

	const handleClick = useCallback(
		(e) => {
			if (isFunction(onClick)) {
				e.preventDefault();
				e.stopPropagation();
				onClick();
			}
		},
		[onClick]
	);

	const handleDoubleClick = useCallback(
		(e) => {
			if (isFunction(onDoubleClick)) {
				e.preventDefault();
				e.stopPropagation();
				onDoubleClick();
			}
		},
		[onDoubleClick]
	);

	const hasClick = !!onClick || !!onDoubleClick;

	// TODO: Use one useMemo instead of 3

	/**
	 * ******************************** COLOR **************************************
	 */

	const colorCss = useMemo(() => {
		const colors = theme.json('text.color');
		const defaults = theme.json('text.defaults');

		// what if color is set?
		if (color) {
			// first, is this color defined in theme?

			if (typeof colors[color] === 'undefined') {
				// it is not defined in theme, so it'll be used as is (included in style attr)
				return {};
			}

			// else, color is set in theme, let's take it and return in
			return theme.processColors(colors[color]);
		}

		// if we're here, it means that color value is not set, so let's try with default color (if any)
		const defaultColor = defaults.color || null;

		if (defaultColor) {
			if (typeof colors[defaultColor] !== 'undefined') {
				// color is set in theme, let's return it
				return theme.processColors(colors[defaultColor]);
			}

			// else, we'll just print warning
			theme.warning(`There's no default color "${defaultColor}" defined in theme.text.color`);
		}

		return {};
	}, [theme, color]);

	/**
	 * ******************************** VARIANT **************************************
	 */

	const variantCss = useMemo(() => {
		const variants = theme.json('text.variant');
		const defaults = theme.json('text.defaults');

		if (variant) {
			// if variant is set, let's look for it in theme

			if (typeof variants[variant] === 'undefined') {
				theme.warning(
					`There's no <Text variant="${variant}"/> defined in theme.text.variant, fallbacking to default variant`
				);
			} else {
				// else, variant exists
				return variants[variant];
			}
		}

		// if we're here, we're gonna use defaultVariant
		const defaultVariant = defaults.variant || null;

		if (defaultVariant) {
			if (typeof variants[defaultVariant] === 'undefined') {
				theme.warning(
					`There's no <Text variant="${defaultVariant}"/> defined in theme.text.variant, no variant will be used`
				);
			} else {
				// else, variant exists
				return variants[defaultVariant];
			}
		}

		return {};
	}, [theme, variant]);

	/**
	 * ******************************** STYLE **************************************
	 */

	const style = useMemo(() => {
		const colorStyle = {};

		if (color) {
			// append color only if color is defined and value doesn't exist in theme.text.color
			const colors = theme.json('text.color');

			if (typeof colors[color] === 'undefined') {
				colorStyle.color = color;
			}
		}

		return {
			...getStyleForPaddings({p, pt, pr, pb, pl}),
			...getStyleForMargins({m, mt, mr, mb, ml}),
			...colorStyle,
			...getStyleForValue('fontFamily', fontFamily),
			...getStyleForValue('fontWeight', fontWeight),
			...getStyleForStringOrNumber('fontSize', fontSize),
			...getStyleForValue('lineHeight', lineHeight),
			...theme.processColors(userStyle || {})
		};
	}, [theme, userStyle, p, pt, pr, pb, pl, m, mt, mr, mb, ml, color, fontFamily, fontSize, fontWeight, lineHeight]);

	/**
	 * ******************************** OTHER PROPS **************************************
	 */

	const otherProps = omit(props, Object.keys(Text.propTypes));

	return (
		<StyledText
			ref={ref}
			onClick={handleClick}
			onDoubleClick={handleDoubleClick}
			hasClick={hasClick}
			colorCss={colorCss}
			variantCss={variantCss}
			blockCss={block}
			style={style}
			as={userAs || 'span'}
			{...otherProps}
		>
			{children}
		</StyledText>
	);
});

const StyledText = styled.span`
	display: ${({blockCss}) => (blockCss ? 'block' : 'inline')};
	vertical-align: inherit;
	line-height: inherit;
	box-sizing: border-box;
	cursor: ${({hasClick}) => (hasClick ? 'pointer' : 'unset')};
	font-weight: unset;
	font-family: unset;
	font-size: unset;
	margin: 0;
	padding: 0;
	margin-block-start: 0;
	margin-block-end: 0;
	margin-inline-start: 0;
	margin-inline-end: 0;

	${({colorCss}) => css(colorCss)}
	${({variantCss}) => css(variantCss)}
`;

Text.propTypes = {
	block: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]),
	variant: PropTypes.string,
	color: PropTypes.string,
	fontFamily: PropTypes.string,
	fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	fontWeight: PropTypes.oneOf([
		'normal',
		'bold',
		'bolder',
		'lighter',
		'initial',
		'inherit',
		100,
		200,
		300,
		400,
		500,
		600,
		700,
		800,
		900
	]),
	lineHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onClick: PropTypes.func,
	onDoubleClick: PropTypes.func,
	// eslint-disable-next-line
	style: PropTypes.object,

	// paddings
	p: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	pt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	pr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	pb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	pl: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

	// margins:
	m: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	ml: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

	// advanced props:
	as: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

export default Text;
