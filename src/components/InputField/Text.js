import React, {useContext, useCallback} from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

import {getPixelsOrString, getStyleForPaddings, isEmpty} from '../../util/helpers';
import InputFieldContext from './InputFieldContext';

/**
 * This component should be used as prefix or suffix in other input components.
 * @param props
 * @return {*}
 * @constructor
 */
const Text = function(props) {
	const {children, flex, width, alignSelf, textAlign = 'unset', p, pt, pr, pb, pl, ...otherProps} = props;
	const {disabled, focusField, inputCss} = useContext(InputFieldContext);

	const paddingCss = {
		padding: inputCss.padding || null,
		...getStyleForPaddings({p, pt, pr, pb, pl})
	};

	const handleClick = useCallback(
		(e) => {
			e.preventDefault();
			e.stopPropagation();

			if (typeof focusField === 'function' && !disabled) {
				focusField();
			}
		},
		[focusField, disabled]
	);

	return (
		<StyledText
			cssFlex={flex}
			cssWidth={width}
			cssAlignSelf={alignSelf}
			cssTextAlign={textAlign}
			paddingCss={paddingCss}
			onClick={handleClick}
			{...otherProps}
		>
			{children}
		</StyledText>
	);
};

Text.propTypes = {
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]).isRequired,
	flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	alignSelf: PropTypes.oneOf(['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch']),
	textAlign: PropTypes.oneOf(['left', 'center', 'right', 'inherit', 'unset']),

	// padding:
	p: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	pt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	pr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	pb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	pl: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const StyledText = styled.span`
	display: block;
	line-height: 1.3;
	text-align: ${({cssTextAlign}) => cssTextAlign};
	position: relative;
	white-space: nowrap;

	align-self: ${({cssAlignSelf}) => cssAlignSelf || 'unset'};
	flex: ${({cssFlex}) => cssFlex || 'unset'};
	width: ${({cssWidth}) => (typeof cssWidth === 'string' || typeof cssWidth === 'number' ? getPixelsOrString(cssWidth) : 'unset')};

	${({paddingCss}) => (!isEmpty(paddingCss) ? css(paddingCss) : '')}
`;

export default Text;
