import React, {useContext} from 'react';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

import ThemeContext from '../../theme/ThemeContext';

/**
 * Component that "holds" all the HTMLElements for rendering further toasts.
 *
 * @param props
 * @return {{children, implementation, containerInfo, $$typeof, key}}
 * @constructor
 */
const Toasts = function(props) {
	const {appIndex} = props;

	const {theme} = useContext(ThemeContext);

	const topLeftCss = theme.json('toast.top-left');
	const topCenterCss = theme.json('toast.top-center');
	const topRightCss = theme.json('toast.top-right');
	const topStretchCss = theme.json('toast.top-stretch');

	const bottomLeftCss = theme.json('toast.bottom-left');
	const bottomCenterCss = theme.json('toast.bottom-center');
	const bottomRightCss = theme.json('toast.bottom-right');
	const bottomStretchCss = theme.json('toast.bottom-stretch');

	return createPortal(
		<>
			<StyledTopLeft id={`koldy-ui-toasts-top-left-${appIndex}`} additionalCss={topLeftCss} />
			<StyledTopCenter id={`koldy-ui-toasts-top-center-${appIndex}`} additionalCss={topCenterCss} />
			<StyledTopRight id={`koldy-ui-toasts-top-right-${appIndex}`} additionalCss={topRightCss} />
			<StyledTopStretch id={`koldy-ui-toasts-top-stretch-${appIndex}`} additionalCss={topStretchCss} />
			<StyledBottomLeft id={`koldy-ui-toasts-bottom-left-${appIndex}`} additionalCss={bottomLeftCss} />
			<StyledBottomCenter id={`koldy-ui-toasts-bottom-center-${appIndex}`} additionalCss={bottomCenterCss} />
			<StyledBottomRight id={`koldy-ui-toasts-bottom-right-${appIndex}`} additionalCss={bottomRightCss} />
			<StyledBottomStretch id={`koldy-ui-toasts-bottom-stretch-${appIndex}`} additionalCss={bottomStretchCss} />
		</>,
		document.body
	);
};

Toasts.propTypes = {
	appIndex: PropTypes.number.isRequired
};

const StyledTopLeft = styled.div`
	display: block;
	position: fixed;
	z-index: 19999;
	top: 1rem;
	left: 1rem;
	width: 300px;
	${({additionalCss}) => css(additionalCss)}
`;

const StyledTopCenter = styled.div`
	display: block;
	position: fixed;
	z-index: 19999;
	top: 1rem;
	width: 300px;
	left: 50%;
	margin-left: -150px;
	${({additionalCss}) => css(additionalCss)}
`;

const StyledTopRight = styled.div`
	display: block;
	position: fixed;
	z-index: 19999;
	top: 1rem;
	right: 1rem;
	width: 300px;
	${({additionalCss}) => css(additionalCss)}
`;

const StyledTopStretch = styled.div`
	display: block;
	position: fixed;
	z-index: 19998;
	top: 0;
	left: 0;
	right: 0;
	${({additionalCss}) => css(additionalCss)}
`;

const StyledBottomLeft = styled.div`
	display: block;
	position: fixed;
	z-index: 19999;
	bottom: 1rem;
	left: 1rem;
	width: 300px;
	${({additionalCss}) => css(additionalCss)}
`;

const StyledBottomCenter = styled.div`
	display: block;
	position: fixed;
	z-index: 19999;
	bottom: 1rem;
	width: 300px;
	left: 50%;
	margin-left: -150px;
	${({additionalCss}) => css(additionalCss)}
`;

const StyledBottomRight = styled.div`
	display: block;
	position: fixed;
	z-index: 19999;
	bottom: 1rem;
	right: 1rem;
	width: 300px;
	${({additionalCss}) => css(additionalCss)}
`;

const StyledBottomStretch = styled.div`
	display: block;
	position: fixed;
	z-index: 19998;
	bottom: 0;
	left: 0;
	right: 0;
	${({additionalCss}) => css(additionalCss)}
`;

export default Toasts;
