import {css, keyframes} from 'styled-components';

/**
 * @link http://animista.net/play/entrances/flip-in/flip-in-hor-bottom
 * @type {Keyframes}
 */

export const flipInHorizontalBottomKeyframes = keyframes`
0% {
	transform: rotateX(80deg);
	opacity: 0;
}
100% {
	transform: rotateX(0);
	opacity: 1;
}
`;

export const flipInHorizontalBottomAnimation = (args = {}) => {
	const {animationDuration = '400ms'} = args || {};
	return css`
		${flipInHorizontalBottomKeyframes} ${animationDuration} cubic-bezier(0.250, 0.460, 0.450, 0.940) both
	`;
};
