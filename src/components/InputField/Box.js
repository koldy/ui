import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

import {getPixelsOrString, getStyleForMargins, getStyleForPaddings, isEmpty, isFunction, isNumberOrString} from '../../util/helpers';
import InputFieldContext from './InputFieldContext';

/**
 * Box can be used as prefix or suffix in TextField or other input component(s)
 * @param props
 * @return {*}
 * @constructor
 */
const Box = function (props) {
	const {
		children,
		flex,
		width,
		alignSelf,
		textAlign = 'inherit',
		style: userStyle = null,
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

	const marginCss = getStyleForMargins({m, mt, mr, mb, ml});
	const paddingCss = getStyleForPaddings({p, pt, pr, pb, pl});

	const {focusField, name, clearValue} = useContext(InputFieldContext);

	return (
		<StyledBox
			cssFlex={flex}
			cssWidth={width}
			cssAlignSelf={alignSelf}
			cssTextAlign={textAlign}
			marginCss={marginCss}
			paddingCss={paddingCss}
      style={userStyle}
			{...otherProps}
		>
			{isFunction(children) ? children({focusField, name, clearValue}) : children}
		</StyledBox>
	);
};

Box.propTypes = {
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node, PropTypes.func]).isRequired,
	flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	alignSelf: PropTypes.oneOf(['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch']),
	textAlign: PropTypes.oneOf(['left', 'center', 'right', 'inherit', 'unset', 'initial']),
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
	pl: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const StyledBox = styled.span`
	display: inline-flex;
	align-items: center;
	flex-wrap: nowrap;
	padding: 0;
	text-align: ${({cssTextAlign}) => cssTextAlign};
	position: relative;
	${({marginCss}) => (!isEmpty(marginCss) ? css(marginCss) : '')}
	${({paddingCss}) => (!isEmpty(paddingCss) ? css(paddingCss) : '')}

	align-self: ${({cssAlignSelf}) => cssAlignSelf || 'unset'};
	flex: ${({cssFlex}) => cssFlex || 'unset'};
	width: ${({cssWidth}) => (isNumberOrString(cssWidth) ? getPixelsOrString(cssWidth) : 'unset')};
`;

export default Box;
