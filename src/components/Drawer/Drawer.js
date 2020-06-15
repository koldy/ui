import React, {useState, useMemo, useContext, useCallback, useRef, useEffect} from 'react';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

import ThemeContext from '../../theme/ThemeContext';
import Overlay from '../Overlay/Overlay';
import {getAnimationDuration, getPixelsOrString, stopPropagation} from '../../util/helpers';
import { slideInRightAnimation, slideOutRightAnimation } from "../../animations/slideRight";
import { slideInLeftAnimation, slideOutLeftAnimation } from "../../animations/slideLeft";
import {slideInTopAnimation, slideOutTopAnimation} from '../../animations/slideTop';
import { slideInBottomAnimation, slideOutBottomAnimation } from "../../animations/slideBottom";
import useZIndex from '../../hooks/useZIndex/useZIndex';

const Drawer = function(props) {
	const {theme} = useContext(ThemeContext);

	// TODO: Optimize/fix defaults to better use the theme definition

	const {
		size: defaultSize = '50%',
		entryAnimationDuration: defaultEntryAnimationDuration = null,
		exitAnimationDuration: defaultExitAnimationDuration = null,
		overlayAnimationDuration: defaultOverlayAnimationDuration = null
	} = theme.json('drawer.defaults');

	const {
		children,
		overlayBackgroundColor = null,
		overlayAnimationDuration = defaultOverlayAnimationDuration,
		entryAnimationDuration = defaultEntryAnimationDuration,
		exitAnimationDuration = defaultExitAnimationDuration,
		backgroundColor = null,
		size = defaultSize,
		position,
		onClose,
		...otherProps
	} = props;

	const ref = useRef(null);
	const {register, unregister} = useZIndex({theme});

	const [goingToClose, setGoingToClose] = useState(false);

	const handleClose = useCallback(() => {
		if (!goingToClose) {
			setGoingToClose(true);

			const exitDuration = getAnimationDuration(exitAnimationDuration);

			if (!exitDuration) {
				onClose();
			} else {
				setTimeout(() => onClose(), exitDuration);
			}
		}
	}, [exitAnimationDuration, onClose, goingToClose]);

	const content = useMemo(() => {
		if (typeof children === 'function') {
			return children({closeFn: handleClose});
		}

		return children;
	}, [children, handleClose]);

	const styleCss = useMemo(() => {
		let positionCss = {};

		const sizes = theme.json('drawer.size');
		const sizeValue = sizes[size] ? getPixelsOrString(sizes[size]) : getPixelsOrString(size);

		switch (position) {
			case 'top':
				positionCss = {
					top: 0,
					right: 0,
					left: 0,
					height: sizeValue
				};
				break;

			case 'right':
				positionCss = {
					top: 0,
					right: 0,
					bottom: 0,
					width: sizeValue
				};

				break;

			case 'bottom':
				positionCss = {
					bottom: 0,
					right: 0,
					left: 0,
					height: sizeValue
				};
				break;

			case 'left':
				positionCss = {
					top: 0,
					left: 0,
					bottom: 0,
					width: sizeValue
				};
				break;
			// no default
		}

		return {
			backgroundColor: theme.processColor(backgroundColor),
			...positionCss
		};
	}, [backgroundColor, size, position, theme]);

	useEffect(() => {
		if (ref.current) {
			ref.current.style.zIndex = register(ref.current);
		}

    // eslint-disable-next-line react-hooks/exhaustive-deps
		return () => unregister(ref.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [theme]);

	if (overlayBackgroundColor) {
		return createPortal(
			<Overlay onClose={handleClose} animationDuration={overlayAnimationDuration} backgroundColor={overlayBackgroundColor}>
				<Container
					position={position}
					entryAnimationDuration={entryAnimationDuration}
					exitAnimationDuration={exitAnimationDuration}
					goingToClose={goingToClose}
					onClick={stopPropagation}
					onDoubleClick={stopPropagation}
					styleCss={styleCss}
					{...otherProps}
				>
					{content}
				</Container>
			</Overlay>,
			document.body
		);
	}

	return createPortal(
		<Container
			ref={ref}
			position={position}
			entryAnimationDuration={entryAnimationDuration}
			exitAnimationDuration={exitAnimationDuration}
			goingToClose={goingToClose}
			onClick={stopPropagation}
			onDoubleClick={stopPropagation}
			styleCss={styleCss}
			zIndex={null}
			{...otherProps}
		>
			{content}
		</Container>,
		document.body
	);
};

Drawer.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
	overlayBackgroundColor: PropTypes.string,
	overlayAnimationDuration: PropTypes.string,
	entryAnimationDuration: PropTypes.string,
	exitAnimationDuration: PropTypes.string,
	backgroundColor: PropTypes.string,
	size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
	onClose: PropTypes.func.isRequired
};

const Container = styled.div`
	display: block;
	position: fixed;
	overflow: auto;
	z-index: ${({zIndex}) => zIndex};
	animation: ${({entryAnimationDuration, exitAnimationDuration, position, goingToClose}) => {
		switch (position) {
			case 'top':
				return !goingToClose
					? slideInTopAnimation({animationDuration: entryAnimationDuration})
					: slideOutTopAnimation({animationDuration: exitAnimationDuration});

			case 'right':
				return !goingToClose
					? slideInRightAnimation({animationDuration: entryAnimationDuration})
					: slideOutRightAnimation({animationDuration: exitAnimationDuration});

			case 'bottom':
				return !goingToClose
					? slideInBottomAnimation({animationDuration: entryAnimationDuration})
					: slideOutBottomAnimation({animationDuration: exitAnimationDuration});

			case 'left':
				return !goingToClose
					? slideInLeftAnimation({animationDuration: entryAnimationDuration})
					: slideOutLeftAnimation({animationDuration: exitAnimationDuration});

			default:
				return 'none';
		}
	}};
	${({styleCss}) => css(styleCss)}
`;

export default Drawer;
