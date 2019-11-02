import {css, keyframes} from 'styled-components';

/**
 * @link http://animista.net/play/entrances/slide-in-bck/slide-in-bck-center
 * @type {Keyframes}
 */

export const slideInBckCenterKeyframes = keyframes`
0% {
	transform: translateZ(600px);
	opacity: 0;
}
100% {
	transform: translateZ(0);
	opacity: 1;
}
`;

export const slideInBckCenterAnimation = (args) => {
	const {animationDuration = '700ms'} = args || {};
	return css`
		${slideInBckCenterKeyframes} ${animationDuration} cubic-bezier(0.250, 0.460, 0.450, 0.940) both
	`;
};
