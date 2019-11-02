import React, {useReducer, useContext, createContext, useState, useEffect, useMemo} from 'react';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ThemeContext from '../../theme/ThemeContext';
import {fadeInAnimation} from '../../animations/fadeIn';
import {rotateInCenterAnimation} from '../../animations/rotateInCenter';
import {rotateVerticalCenterAnimation} from '../../animations/rotateVerticalCenter';
import {rotateHorizontalCenterAnimation} from '../../animations/rotateHorizontalCenter';
import {rotateScaleUpVerticalAnimation} from '../../animations/rotateScaleUpVertical';
import {flipInHorizontalBottomAnimation} from '../../animations/flipInHorizontalBottom';
import {slitInHorizontalAnimation} from '../../animations/slitInHorizontalKeyframes';
import {slideInBckCenterAnimation} from '../../animations/slideInBckCenter';
import {swingInTopFwdAnimation} from '../../animations/swingInTopFwd';

const Toast = function(props) {
	const {children, position, entryAnimation = 'fade', onClose = null} = props;

	const {appIndex, theme} = useContext(ThemeContext);
	const defaults = theme.json('toast.defaults');
	const {position: defaultPosition = 'top-right'} = defaults;

	const target = document.getElementById(`koldy-ui-toasts-${position || defaultPosition}-${appIndex}`);
	const [targetExists, setTargetExists] = useState(!!target);

	const [goingOn, setGoingOn] = useState(false);
	const [goingOff, setGoingOff] = useState(false);

	const animation = useMemo(() => {
		switch (entryAnimation) {
			case 'fade-in':
				return fadeInAnimation({animationDuration: '300ms'});

			case 'rotate-in-center':
				return rotateInCenterAnimation({animationDuration: '1300ms'});

			case 'rotate-vertical-center':
				return rotateVerticalCenterAnimation({animationDuration: '1300ms'});

			case 'rotate-horizontal-center':
				return rotateHorizontalCenterAnimation({animationDuration: '1300ms'});

			case 'rotate-scale-up-vertical':
				return rotateScaleUpVerticalAnimation();

			case 'flip-in-horizontal-bottom':
				return flipInHorizontalBottomAnimation();

			case 'slit-in-horizontal':
				return slitInHorizontalAnimation();

			case 'slide-in-bck-center':
				return slideInBckCenterAnimation();

			case 'swing-in-top-fwd':
				return swingInTopFwdAnimation();

			// no default
		}

		return 'none';
	}, [entryAnimation]);

	if (targetExists) {
		return createPortal(<StyledToast animation={animation}>{children({closeFn: onClose})}</StyledToast>, target);
	}

	// If Toast is rendered inside of <App> without any delay, it would throw an error telling that HTMLElement doesn't exist
	// therefore, we solved that by the following hack:

	setTimeout(() => setTargetExists(true), 0);
	return null;
};

Toast.propTypes = {
	children: PropTypes.func.isRequired,
	position: PropTypes.oneOf([
		'top-left',
		'top-center',
		'top-right',
		'top-stretch',
		'bottom-left',
		'bottom-center',
		'bottom-right',
		'bottom-stretch'
	]),
	entryAnimation: PropTypes.oneOf([
		'fade-in',
		'rotate-in-center',
		'rotate-vertical-center',
		'rotate-horizontal-center',
		'rotate-scale-up-vertical',
		'flip-in-horizontal-bottom',
		'slit-in-horizontal',
		'slide-in-bck-center',
		'swing-in-top-fwd'
	]),
	onClose: PropTypes.func
};

const StyledToast = styled.div`
	display: block;
	margin: 0;
	padding: 0;
	animation: ${({animation}) => animation};
`;

export default Toast;
