import React, {useContext, useEffect, useMemo, useRef} from 'react';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ThemeContext from '../../theme/ThemeContext';
import {addDocumentEvent, emptyFn, isFunction, removeDocumentEvent} from '../../util/helpers';
import useZIndex from '../../hooks/useZIndex';
import {fadeInAnimation} from '../../animations/fade';

const overlays = []; // the array of all active overlays
const closeFunctions = {}; // index:fn pairs of closing functions called from ESC key
let originalOverflow = null; // the original overflow from the body that we'll return when all overlays are gone

/**
 * Function on window keydown
 * @param e
 */
const globalCloseOnESC = function(e) {
	if (e.keyCode === 27) {
		// the ESC key
		// in this moment, overlays should contain information about all active overlays; we need the last one

		if (overlays.length > 0) {
			const latestIndex = overlays[overlays.length - 1];

			// let's find the close function in closeFunctions
			if (closeFunctions[latestIndex]) {
				const {onClose, disableCloseOnESC} = closeFunctions[latestIndex];

				// it is possible that close function doesn't exist because if ESC key is prevented, then close function won't exist
				if (!disableCloseOnESC && isFunction(onClose)) {
					onClose();
				}
			}
		}
	}
};

/**
 * Function on overlay click
 * @param e
 */
const handleMouseClick = function(e) {
	e.stopPropagation();

	// in this moment, overlays should contain information about all active overlays; we need the last one
	if (overlays.length > 0) {
		const latestIndex = overlays[overlays.length - 1];

		// let's find the close function in closeFunctions
		if (closeFunctions[latestIndex]) {
			const {onClose, disableCloseOnClick} = closeFunctions[latestIndex];

			// it is possible that close function doesn't exist because if ESC key is prevented, then close function won't exist
			if (!disableCloseOnClick && isFunction(onClose)) {
				onClose();
			}
		}
	}
};

/**
 * @typedef {Object} Props
 * @property {number|null} zIndex - Custom zIndex. If not set, default will be used (5000)
 * @property {Function} onClose - Mandatory function that will be called on close
 * @property {bool} disableCloseOnESC - If true, ESC key won't close the overlay
 * @property {bool} disableCloseOnClick - If true, click on overlay won't close the overlay
 * @property {number|null} animationDuration - Animation duration in milliseconds
 */

/**
 * @param {Props} props
 */
const Overlay = function(props) {
	const {
		children,
		zIndex = null,
		onClose,
		style: userStyle = null,
		backgroundColor = null,
		disableCloseOnESC = false,
		disableCloseOnClick = false,
		animationDuration: userAnimationDuration = null,
		...otherProps
	} = props;

	const {theme} = useContext(ThemeContext);
	const defaults = theme ? theme.json('overlay.defaults') : {};
	const {register, unregister} = useZIndex({theme});

	const ref = useRef(null);

	// detect the animation duration, either set by user or by theme
	const animationDuration = userAnimationDuration || defaults.animationDuration || null;

	// TODO: optimize stacking and implement body-scroll-locking because overflow:hidden is not enough

	// bind close function(s)
	useEffect(() => {
		// eslint-disable-next-line
		const index = (Overlay.counter += 1);

		overlays.push(index);
		closeFunctions[index] = {onClose, disableCloseOnESC, disableCloseOnClick};

		if (overlays.length === 1) {
			// on first overlay, lock the scroll on body
			originalOverflow = document.body.style.overflow;
			document.body.style.overflow = 'hidden';

			// on first overlay, attach listener for ESC key
			addDocumentEvent('keydown', globalCloseOnESC);
		}

		return () => {
			const i = overlays.indexOf(index);

			if (i >= 0) {
				overlays.splice(i, 1);
				delete closeFunctions[index];
			}

			if (overlays.length === 0) {
				document.body.style.overflow = originalOverflow;
				removeDocumentEvent('keydown', globalCloseOnESC);
			}
		};
	}, []);

	// handle zIndex
	useEffect(() => {
		if (zIndex) {
			ref.current.style.zIndex = zIndex;
		} else {
			ref.current.style.zIndex = register(ref.current);
		}

		return () => {
			if (!zIndex) {
				unregister(ref.current);
			}
		};
	}, [zIndex, theme]);

	// remember the style and update it only if some of the variables are different
	const style = useMemo(() => {
		let backgroundColorCss = null;

		if (theme) {
			if (backgroundColor) {
				backgroundColorCss = {};

				if (backgroundColor) {
					backgroundColorCss.background = theme.processColor(backgroundColor);
				}
			} else {
				backgroundColorCss = {
					backgroundColor: theme.processColor(defaults.backgroundColor)
				};
			}
		}

		return {
			...backgroundColorCss,
			...userStyle
		};
	}, [theme, backgroundColor, userStyle]);

	return createPortal(
		<Wrapper
			ref={ref}
			onClick={disableCloseOnClick ? emptyFn : handleMouseClick}
			animationDuration={animationDuration}
			style={style}
			{...otherProps}
		>
			{typeof children === 'function' ? children({closeFn: onClose}) : children}
		</Wrapper>,
		document.body
	);
};

Overlay.counter = 0;

Overlay.propTypes = {
	children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
	animationDuration: PropTypes.string,
	backgroundColor: PropTypes.string,
	disableCloseOnESC: PropTypes.bool,
	disableCloseOnClick: PropTypes.bool,
	onClose: PropTypes.func.isRequired,
	// eslint-disable-next-line
	style: PropTypes.object,
	zIndex: PropTypes.number
};

// TODO: fade should animate background only, not children
const Wrapper = styled.div`
	display: block;
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	overflow: auto;
	animation: ${fadeInAnimation};
	z-index: 5000;
`;

export default Overlay;
