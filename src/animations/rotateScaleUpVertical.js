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

/**
 * @param animationDuration
 * @param delay
 * @param count
 * @param fillMode
 * @return {[]|null|*}
 */
export const rotateScaleUpVerticalAnimation = ({animationDuration = '650ms', delay = null, count = null, fillMode = 'both'} = {}) => {
	return css`
		${rotateScaleUpVerticalKeyframes} ${animationDuration} linear ${delay} ${count} ${fillMode}
	`;
};
