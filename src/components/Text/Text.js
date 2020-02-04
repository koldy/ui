import React, {useContext, useMemo, useCallback, forwardRef} from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

import {
	getStyleForMargins,
	getStyleForPaddings,
	getStyleForStringOrNumber,
	getStyleForValue,
	isFunction,
	isObject
} from '../../util/helpers';
import ThemeContext from '../../theme/ThemeContext';

const Text = forwardRef(function(props, ref) {
	const {theme} = useContext(ThemeContext);
	const defaults = theme.json('text.defaults');

	const {
		children = null,
		block = false,
		style: userStyle = null,
		variant = defaults.variant,
		color = null,
		onClick = null,
		onDoubleClick = null,
		fontFamily = null,
		fontSize = null,
		fontWeight = null,
		lineHeight = null,
		as = 'span',
		m = null,
		mt = null,
		mr = null,
		mb = null,
		ml = null,
		p = null,
		pt = null,
		pr = null,
		pb = null,
		pl = null,
		...otherProps
	} = props;

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

	/**
	 * ******************************** STYLE PARSER **************************************
	 */
	const textCss = useMemo(() => {
		const variants = theme.json('text.variant');

		let c = {};

		// variant
		if (!isObject(variants[variant])) {
			theme.warning(`<Text variant="${variant}"/> doesn't exists in theme's json: theme.text.variant.${variant}`);
		} else {
			c = {
				...theme.processColors(variants[variant]),
				fontFamily,
				fontWeight
			};
		}

		if (color) {
			c.color = theme.processColor(color);
		}

		return c;
	}, [theme, variant, color, fontFamily, fontWeight]);

	const style = useMemo(
		() => ({
			...getStyleForPaddings({p, pt, pr, pb, pl}),
			...getStyleForMargins({m, mt, mr, mb, ml}),
			...getStyleForStringOrNumber('fontSize', fontSize),
			...getStyleForValue('lineHeight', lineHeight),
			...theme.processColors(userStyle || {})
		}),
		[theme, userStyle, fontSize, lineHeight, p, pt, pr, pb, pl, m, mt, mr, mb, ml]
	);

	return (
		<StyledText
			ref={ref}
			onClick={isFunction(onClick) ? handleClick : undefined}
			onDoubleClick={isFunction(onDoubleClick) ? handleDoubleClick : undefined}
			hasClick={hasClick}
			textCss={textCss}
			blockCss={block}
			style={style}
			as={as}
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
	cursor: ${({hasClick, as}) => (hasClick || as === 'a' ? 'pointer' : 'unset')};
	font-weight: inherit;
	font-family: inherit;
	font-size: inherit;
	margin: 0;
	padding: 0;
	text-decoration: none;
	margin-block-start: 0;
	margin-block-end: 0;
	margin-inline-start: 0;
	margin-inline-end: 0;

	${({textCss}) => css(textCss)}
`;

Text.propTypes = {
	block: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]),
	variant: PropTypes.string,
	color: PropTypes.string,
	fontFamily: PropTypes.string,
	fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	fontWeight: PropTypes.oneOf(['normal', 'bold', 'bolder', 'lighter', 'initial', 'inherit', 100, 200, 300, 400, 500, 600, 700, 800, 900]),
	lineHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onClick: PropTypes.func,
	onDoubleClick: PropTypes.func,
	// eslint-disable-next-line
	style: PropTypes.object,

	// padding
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
	as: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.shape({render: PropTypes.func.isRequired})])
};

export default Text;
