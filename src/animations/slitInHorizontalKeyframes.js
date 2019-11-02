import {css, keyframes} from 'styled-components';

/**
 * @link http://animista.net/play/entrances/slit-in/slit-in-horizontal
 * @type {Keyframes}
 */

export const slitInHorizontalKeyframes = keyframes`
0% {
	transform: translateZ(-800px) rotateX(90deg);
	opacity: 0;
}
54% {
	transform: translateZ(-160px) rotateX(87deg);
	opacity: 1;
}
100% {
	transform: translateZ(0) rotateX(0);
}
`;

export const slitInHorizontalAnimation = (args) => {
	const {animationDuration = '450ms'} = args || {};
	return css`
		${slitInHorizontalKeyframes} ${animationDuration} ease-out both
	`;
};
