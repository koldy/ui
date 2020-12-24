import React, {useContext, useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

import {getPixelsOrString, getStyleForPaddings, isFunction, isNumberOrString} from '../../util/helpers';
import InputFieldContext from './InputFieldContext';
import useColor from '../../hooks/useColor/useColor';

/**
 * This component should be used as prefix or suffix in other input components.
 * @param props
 * @return {*}
 * @constructor
 */
const Text = function (props) {
	const {
		children,
		flex = null,
		width = null,
		minWidth = null,
		maxWidth = null,
		alignSelf = null,
		textAlign = null,
		p = null,
		pt = null,
		pr = null,
		pb = null,
		pl = null,
		color = null,
		fontSize = null,
		style: userStyle = null,
		...otherProps
	} = props;

	const {disabled, focusField, inputCss, name, clearValue} = useContext(InputFieldContext);
	const cls = useColor(color);

	const paddingCss = {
		padding: inputCss.padding || null,
		...getStyleForPaddings({p, pt, pr, pb, pl})
	};

	const handleClick = useCallback(
		(e) => {
			e.preventDefault();

			if (isFunction(focusField) && !disabled) {
				focusField();
			}
		},
		[focusField, disabled]
	);

	const style = useMemo(() => {
		return {
			fontSize: isNumberOrString(fontSize) ? getPixelsOrString(fontSize) : 'inherit',
			width: isNumberOrString(width) ? getPixelsOrString(width) : 'unset',
			minWidth: isNumberOrString(minWidth) ? getPixelsOrString(minWidth) : 'unset',
			maxWidth: isNumberOrString(maxWidth) ? getPixelsOrString(maxWidth) : 'unset',
			padding: inputCss.padding || null,
			...getStyleForPaddings({p, pt, pr, pb, pl}),
			...userStyle
		};
	}, [width, maxWidth, minWidth, p, pt, pr, pb, pl, fontSize, inputCss, userStyle]);

	return (
		<StyledText
			$cssFlex={flex}
			$cssAlignSelf={alignSelf}
			$cssTextAlign={textAlign}
			$color={cls}
			onClick={handleClick}
			style={style}
			{...otherProps}
		>
			{isFunction(children) ? children({focusField, name, clearValue}) : <span>{children}</span>}
		</StyledText>
	);
};

Text.propTypes = {
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node, PropTypes.func]).isRequired,
	flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	alignSelf: PropTypes.oneOf(['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch']),
	textAlign: PropTypes.oneOf(['left', 'center', 'right', 'inherit', 'initial']),
	color: PropTypes.string,
	fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	// eslint-disable-next-line
	style: PropTypes.object,

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
	text-align: ${({$cssTextAlign}) => $cssTextAlign || 'inherit'};
	position: relative;
	white-space: nowrap;
	color: ${({$color}) => $color || 'inherit'};

	align-self: ${({$cssAlignSelf}) => $cssAlignSelf || 'unset'};
	flex: ${({$cssFlex}) => $cssFlex || 'unset'};

	> span {
		pointer-events: none;
	}
`;

export default Text;
