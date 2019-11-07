import React, {useMemo, forwardRef} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {getPixelsOrString, getStyleForMargins, omit} from '../../util/helpers';

/**
 * The container for Flexbox container - it is just mapping the flexbox properties. It's children should be only "Flexbox.Item", nothing else.
 * @param props
 * @return {*}
 * @constructor
 * @link https://css-tricks.com/snippets/css/a-guide-to-flexbox/
 *
 * Usage:
 *
 * <Flexbox alignItems="center">
 *   <Flexbox.Item>1</Flexbox.Item>
 *   <Flexbox.Item>2</Flexbox.Item>
 *   <Flexbox.Item>3</Flexbox.Item>
 * </Flexbox>
 */
const Flexbox = forwardRef(function(props, ref) {
	const {
		children,
		inline = false,
		flexDirection = 'row',
		flexWrap = 'nowrap',
		justifyContent = 'flex-start',
		alignItems = 'stretch',
		alignContent = 'stretch',
		width = null,
		height = null,
		style: userStyle = null,
		m = null,
		mt = null,
		mr = null,
		mb = null,
		ml = null
	} = props;

	const style = useMemo(
		() => ({
			...getStyleForMargins({m, mt, mr, mb, ml}),
			width: getPixelsOrString(width),
			height: getPixelsOrString(height),
			...userStyle
		}),
		[width, height, userStyle, m, mt, mr, mb, ml]
	);

	const otherProps = omit(props, Object.keys(Flexbox.propTypes));

	return (
		<StyledFlexbox
			ref={ref}
			inline={inline}
			flexDirection={flexDirection}
			flexWrap={flexWrap}
			justifyContent={justifyContent}
			alignItems={alignItems}
			alignContent={alignContent}
			style={style}
			{...otherProps}
		>
			{children}
		</StyledFlexbox>
	);
});

const StyledFlexbox = styled.div`
	display: ${({inline}) => (inline ? 'inline-flex' : 'flex')};
	box-sizing: border-box;
	flex-direction: ${({flexDirection}) => flexDirection};
	flex-wrap: ${({flexWrap}) => flexWrap};
	justify-content: ${({justifyContent}) => justifyContent};
	align-items: ${({alignItems}) => alignItems};
	align-content: ${({alignContent}) => alignContent};
`;

Flexbox.propTypes = {
	children: PropTypes.node.isRequired,
	inline: PropTypes.bool,
	flexDirection: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
	flexWrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
	justifyContent: PropTypes.oneOf([
		'flex-start',
		'flex-end',
		'center',
		'space-between',
		'space-around',
		'space-evenly'
	]),
	alignItems: PropTypes.oneOf(['stretch', 'flex-start', 'flex-end', 'center', 'baseline']),
	alignContent: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch']),

	// some standard box props
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	// eslint-disable-next-line
	style: PropTypes.object,

	// margins:
	m: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	ml: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

/**
 * The flexbox item element. It should be placed under <Flexbox> component ONLY.
 * @param props
 * @constructor
 * @link https://css-tricks.com/snippets/css/a-guide-to-flexbox/
 */
const FlexboxItem = forwardRef(function(props, ref) {
	const {
		children = null,
		style: userStyle = null,
		width = null,
		height = null,
		order = null,
		flex = null,
		alignSelf = null,
		textAlign: textAlignValue = null
	} = props;

	const style = useMemo(
		() => ({
			width: getPixelsOrString(width),
			height: getPixelsOrString(height),
			...userStyle
		}),
		[width, height, userStyle]
	);

	const otherProps = omit(props, Object.keys(FlexboxItem.propTypes));

	return (
		<StyledFlexboxItem
			ref={ref}
			order={order}
			flex={flex}
			alignSelf={alignSelf}
			textAlignValue={textAlignValue}
			style={style}
			{...otherProps}
		>
			{children}
		</StyledFlexboxItem>
	);
});

const StyledFlexboxItem = styled.div`
	display: block;
	box-sizing: border-box;
	order: ${({order}) => order || 'unset'};
	align-self: ${({alignSelf}) => alignSelf || 'unset'};
	flex: ${({flex}) => flex || 'unset'};
	text-align: ${({textAlignValue}) => textAlignValue || 'unset'};
`;

FlexboxItem.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.number]),
	order: PropTypes.number,
	flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	alignSelf: PropTypes.oneOf(['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch']),
	textAlign: PropTypes.oneOf(['left', 'center', 'right', 'justify']),

	// some standard box props
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	// eslint-disable-next-line
	style: PropTypes.object
};

Flexbox.Item = FlexboxItem;

export default Flexbox;
