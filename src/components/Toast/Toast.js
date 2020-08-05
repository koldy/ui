import React, {useContext, useState} from 'react';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ThemeContext from '../../theme/ThemeContext';
import {isFunction} from '../../util/helpers';

const Toast = function({children, position, entryAnimation = 'fade', onClose = null, ...otherProps}) {
	const {appIndex, theme} = useContext(ThemeContext);
	const defaults = theme.json('toast.defaults');
	const {position: defaultPosition = 'top-right'} = defaults;

	const target = document.getElementById(`koldy-ui-toasts-${position || defaultPosition}-${appIndex}`);
	const [targetExists, setTargetExists] = useState(!!target);

	if (targetExists) {
		return createPortal(
			<StyledToast animation={entryAnimation} {...otherProps}>{isFunction(children) ? children({closeFn: onClose}) : children}</StyledToast>,
			target
		);
	}

	// If Toast is rendered inside of <App> without any delay, it would throw an error telling that HTMLElement doesn't exist
	// therefore, we solved that by the following hack:

	setTimeout(() => setTargetExists(true), 0);
	return null;
};

Toast.propTypes = {
	children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
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
	entryAnimation: PropTypes.array,
	onClose: PropTypes.func
};

const StyledToast = styled.div`
	display: block;
	margin: 0;
	padding: 0;
	animation: ${({animation}) => animation || 'none'};
`;

export default Toast;
