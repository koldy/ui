import {css, keyframes} from 'styled-components';

/**
 * @link http://animista.net/play/entrances/rotate-in/rotate-in-center
 * @type {Keyframes}
 */

export const rotateInCenterKeyframes = keyframes`
0% {
	transform: rotate(-360deg);
	opacity: 0;
}
100% {
	transform: rotate(0);
	opacity: 1;
}
`;

export const rotateInCenterAnimation = (args) => {
	const {animationDuration = '600ms'} = args || {};
	return css`
		${rotateInCenterKeyframes} ${animationDuration} cubic-bezier(0.250, 0.460, 0.450, 0.940) both
	`;
};
