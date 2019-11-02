import {css, keyframes} from 'styled-components';

/**
 * @link http://animista.net/play/entrances/swing-in/swing-in-top-fwd
 * @type {Keyframes}
 */

export const swingInTopFwdKeyframes = keyframes`
0% {
	transform: rotateX(-100deg);
	transform-origin: top;
	opacity: 0;
}
100% {
	transform: rotateX(0deg);
	transform-origin: top;
	opacity: 1;
}
`;

export const swingInTopFwdAnimation = (args) => {
	const {animationDuration = '750ms'} = args || {};
	return css`
		${swingInTopFwdKeyframes} ${animationDuration} cubic-bezier(0.175, 0.885, 0.320, 1.275) both
	`;
};
