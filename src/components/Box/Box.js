import React, {useContext, useCallback, useMemo, forwardRef, useRef, useImperativeHandle} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {getStyleForMargins, getStyleForPaddings, getStyleForStringOrNumber, isFunction} from '../../util/helpers';
import ThemeContext from '../../theme/ThemeContext';

const Box = forwardRef(function(props, ref) {
	const {
		children = null,
		style: userStyle = null,
		background = null,
		textAlign = null,
		position = null,
		width = null,
		height = null,
		minWidth = null,
		minHeight = null,
		maxWidth = null,
		maxHeight = null,
		onClick = null,
		onDoubleClick = null,
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
		top = null,
		right = null,
		bottom = null,
		left = null,
		as = 'div',
		...otherProps
	} = props;

	const {theme} = useContext(ThemeContext);

	const innerRef = useRef(null);
	useImperativeHandle(ref, () => innerRef.current);

	/**
	 * ******************************** Click handlers **************************************
	 */

	const handleClick = useCallback(
		(e) => {
			if (isFunction(onClick)) {
				e.preventDefault();
				e.stopPropagation();

				onClick({
					element: innerRef.current
				});
			}
		},
		[onClick]
	);

	const handleDoubleClick = useCallback(
		(e) => {
			if (isFunction(onDoubleClick)) {
				e.preventDefault();
				e.stopPropagation();

				onDoubleClick({
					element: innerRef.current
				});
			}
		},
		[onDoubleClick]
	);

	/**
	 * ******************************** STYLE PARSER **************************************
	 */

	const style = useMemo(() => {
		let backgroundCss = {};

		if (background) {
			backgroundCss = theme.processColors({background});
		}

		const isAbsolute = position === 'absolute' || position === 'fixed';

		let positions = {};
		if (isAbsolute) {
			positions = {
				...getStyleForStringOrNumber('top', top),
				...getStyleForStringOrNumber('right', right),
				...getStyleForStringOrNumber('bottom', bottom),
				...getStyleForStringOrNumber('left', left)
			};
		} else {
			if (top) {
				theme.debug(`<Box top="${top}"/> has no effect when position is "${position}"`);
			}

			if (right) {
				theme.debug(`<Box right="${right}"/> has no effect when position is "${position}"`);
			}

			if (bottom) {
				theme.debug(`<Box bottom="${bottom}"/> has no effect when position is "${position}"`);
			}

			if (left) {
				theme.debug(`<Box left="${left}"/> has no effect when position is "${position}"`);
			}
		}

		return {
			...backgroundCss,
			...getStyleForStringOrNumber('width', width === null && !isAbsolute ? '100%' : width),
			...getStyleForStringOrNumber('height', height === 'null' && !isAbsolute ? 'auto' : height),
			...getStyleForStringOrNumber('maxWidth', maxWidth),
			...getStyleForStringOrNumber('maxHeight', maxHeight),
			...getStyleForStringOrNumber('minWidth', minWidth),
			...getStyleForStringOrNumber('minHeight', minHeight),
			...getStyleForMargins({m, mt, mr, mb, ml}),
			...getStyleForPaddings({p, pt, pr, pb, pl}),
			...positions,
			...userStyle
		};
	}, [
		theme,
		background,
		width,
		height,
		minWidth,
		maxWidth,
		maxWidth,
		maxHeight,
		userStyle,
		position,
		top,
		right,
		bottom,
		left,
		m,
		mt,
		mr,
		mb,
		ml,
		p,
		pt,
		pr,
		pb,
		pl
	]);

	return (
		<StyledBox
			ref={innerRef}
			onClick={handleClick}
			onDoubleClick={handleDoubleClick}
			textAlignValue={textAlign}
			positionValue={position}
			style={style}
			as={as}
			{...otherProps}
		>
			{children}
		</StyledBox>
	);
});

Box.propTypes = {
	children: PropTypes.node,
	onClick: PropTypes.func,
	onDoubleClick: PropTypes.func,
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	background: PropTypes.string,
	textAlign: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
	position: PropTypes.oneOf(['static', 'absolute', 'fixed', 'relative', 'sticky', 'initial', 'inherit']),
	// eslint-disable-next-line
	style: PropTypes.object,

	// margins:
	m: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	ml: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

	// padding:
	p: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	pt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	pr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	pb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	pl: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

	// position:
	top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

	// advanced props:
	as: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.shape({render: PropTypes.func.isRequired})])
};

const StyledBox = styled.div`
	display: block;
	box-sizing: border-box;
	text-align: ${({textAlignValue}) => textAlignValue || 'unset'};
	position: ${({positionValue}) => positionValue || 'static'};
`;

export default Box;
