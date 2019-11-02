import React, {useContext, useCallback, forwardRef, useImperativeHandle, useRef} from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

import {getStyleForMargins, isFunction, isObject, omit} from '../../util/helpers';
import ThemeContext from '../../theme/ThemeContext';

const Badge = forwardRef(function(props, ref) {
	const {
		children = null,
		onClick = null,
		onDoubleClick = null,
		color: userColor = null,
		variant = null,
		size = null,
		style: userStyle = null
	} = props;

	const {m = null, mt = null, mr = null, mb = null, ml = null} = props;

	const {theme} = useContext(ThemeContext);

	const innerRef = useRef(null);
	useImperativeHandle(ref, () => innerRef.current);

	/* get badge data from theme */
	const defaults = theme.json('badge.defaults');
	const variants = theme.json('badge.variant');
	const badgeColors = theme.json('badge.color');
	const sizes = theme.json('badge.size');

	/* get the color instance of get the first defined color instance */

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
		theme.warning(`<Badge variant="${variant}"/> not found so <Badge variant="${variantKey}"/> was applied`);
	}

	let variantCss = null;
	// depending on variant, let's process it; it has to be either object or function
	// TODO: Remove the ability for variant to be a function
	if (typeof useVariant === 'function') {
		// if it's a function, then return value must be object, otherwise it's invalid

		variantCss = useVariant({theme, ...props});

		if (!isObject(variantCss)) {
			theme.warning(
				`Variant function from badge.variant.${variantKey} returned invalid value; expected object, got: ${typeof variantCss}`
			);
			variantCss = null;
		} else {
			// it's valid, let's process it
			variantCss = theme.processColors(variantCss);
		}
	} else if (isObject(useVariant)) {
		variantCss = theme.processColors(useVariant);
	} else {
		theme.warning(`Can not process badge.variant.${variantKey}; value not function nor object`);
	}

	// let's process colors
	const selectedColor = userColor || defaults.color || null;
	let colorsCss = {};

	if (selectedColor === null) {
		if (userColor !== null) {
			theme.warning(`Unable to use <Badge color="${userColor}"/>, color not found in badge.color`);
		}
	} else {
		// we have something, let's try to use it
		const colorData = badgeColors[selectedColor] || null;

		if (colorData === null) {
			const colorData2 = badgeColors[defaults.color] || null;

			if (colorData2 === null) {
				theme.warning(
					`Unable to use <Badge color="${selectedColor}"/>, left badge without style because there's no default color either`
				);
			} else {
				colorsCss = theme.processColors(colorData2);
				theme.warning(
					`Unable to use <Badge color="${selectedColor}"/>, so using <Badge color="${defaults.color}"/> instead`
				);
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
				theme.warning(
					`Unable to use <Badge size="${size}"/> because it's not defined; applied default size from theme`
				);
			} else {
				theme.warning(`Unable to use <Badge size="${size}"/> because it's not defined; applied theme default size`);
			}
		}
	}

	/* get all other props */
	const otherProps = omit(props, Object.keys(Badge.propTypes));

	const style = {
		...getStyleForMargins({m, mt, mr, mb, ml}),
		...userStyle
	};

	const handleClick = useCallback(
		(e) => {
			e.preventDefault();
			e.stopPropagation();

			if (isFunction(onClick)) {
				onClick({
					element: innerRef.current
				});
			}
		},
		[onClick]
	);

	const handleDoubleClick = useCallback(
		(e) => {
			e.preventDefault();
			e.stopPropagation();

			if (isFunction(onDoubleClick)) {
				onDoubleClick({
					element: innerRef.current
				});
			}
		},
		[onDoubleClick]
	);

	return (
		<StyledBadge
			ref={innerRef}
			theme={theme}
			variantCss={variantCss || ''}
			colorsCss={colorsCss || ''}
			sizeCss={sizeCss}
			style={style}
			hasClick={onClick !== null}
			onClick={handleClick}
			onDoubleClick={handleDoubleClick}
			{...otherProps}
		>
			{children}
		</StyledBadge>
	);
});

Badge.propTypes = {
	children: PropTypes.node,
	onClick: PropTypes.func,
	onDoubleClick: PropTypes.func,
	color: PropTypes.string,
	variant: PropTypes.string,
	size: PropTypes.string,
	// eslint-disable-next-line
	style: PropTypes.object,

	// margins:
	m: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	ml: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Badge;

const StyledBadge = styled.span`
	display: inline-block;
	vertical-align: middle;
	outline: none;
	text-decoration: none;
	box-sizing: border-box;

	cursor: ${({hasClick}) => (hasClick ? 'pointer' : 'default')};
	border: 1px solid transparent;

	text-align: center;
	text-overflow: ellipsis;
	white-space: nowrap;
	word-wrap: break-word;
	overflow: hidden;
	line-height: normal;

	width: auto;

	${({sizeCss}) => css(sizeCss)}

	${({variantCss}) => css(variantCss)};
	${({colorsCss}) => css(colorsCss)}
`;
