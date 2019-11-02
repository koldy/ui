import {css, keyframes} from 'styled-components';

/**
 * @link http://animista.net/play/basic/rotate/rotate-hor-center
 * @type {Keyframes}
 */

export const rotateHorizontalCenterKeyframes = keyframes`
0% {
	transform: rotateX(0);
}
100% {
	transform: rotateX(-360deg);
}
`;

export const rotateHorizontalCenterAnimation = (args) => {
	const {animationDuration = '500ms'} = args || {};

	return css`
		${rotateHorizontalCenterKeyframes} ${animationDuration} cubic-bezier(0.455, 0.030, 0.515, 0.955) both
	`;
};
