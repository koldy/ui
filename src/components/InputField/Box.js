import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

import {getPixelsOrString, getStyleForPaddings, isEmpty} from '../../util/helpers';
import InputFieldContext from './InputFieldContext';

/**
 * Box can be used as prefix or suffix in TextField or other input component(s)
 * @param props
 * @return {*}
 * @constructor
 */
const Box = function(props) {
	const {children, flex, width, alignSelf, textAlign = 'unset', p, pt, pr, pb, pl} = props;
	const paddingCss = getStyleForPaddings({p, pt, pr, pb, pl});

	const {focusField} = useContext(InputFieldContext);

	return (
		<StyledBox
			cssFlex={flex}
			cssWidth={width}
			cssAlignSelf={alignSelf}
			cssTextAlign={textAlign}
			paddingCss={paddingCss}
		>
			{typeof children === 'function' ? children({focusField}) : children}
		</StyledBox>
	);
};

Box.propTypes = {
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node, PropTypes.func]).isRequired,
	flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	alignSelf: PropTypes.oneOf(['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch']),
	textAlign: PropTypes.oneOf(['left', 'center', 'right', 'inherit', 'unset']),

	// paddings:
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
	${({paddingCss}) => (!isEmpty(paddingCss) ? css(paddingCss) : '')}

	align-self: ${({cssAlignSelf}) => cssAlignSelf || 'unset'};
	flex: ${({cssFlex}) => cssFlex || 'unset'};
	width: ${({cssWidth}) =>
		typeof cssWidth === 'string' || typeof cssWidth === 'number' ? getPixelsOrString(cssWidth) : 'unset'};
`;

export default Box;
