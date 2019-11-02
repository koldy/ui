import {css, keyframes} from 'styled-components';

/**
 * @link http://animista.net/play/basic/rotate-scale/rotate-scale-up-ver
 * @type {Keyframes}
 */

export const rotateScaleUpVerticalKeyframes = keyframes`
0% {
	transform: scale(1) rotateY(0);
}
50% {
	transform: scale(2) rotateY(180deg);
}
100% {
	transform: scale(1) rotateY(360deg);
}
`;

export const rotateScaleUpVerticalAnimation = (args) => {
	const {animationDuration = '650ms'} = args || {};

	return css`
		${rotateScaleUpVerticalKeyframes} ${animationDuration} linear both
	`;
};
