import {css, keyframes} from 'styled-components';

/**
 * @link http://animista.net/play/basic/rotate/rotate-vert-center
 * @type {Keyframes}
 */
export const rotateVerticalCenterKeyframes = keyframes`
0% {
	transform: rotateY(0);
}

100% {
	transform: rotateY(360deg);
}
`;

/**
 * @param animationDuration
 * @param delay
 * @param count
 * @param fillMode
 * @return {[]|null|*}
 */
export const rotateVerticalCenterAnimation = ({animationDuration = '500ms', delay = null, count = null, fillMode = 'both'} = {}) => {
	return css`
		${rotateVerticalCenterKeyframes} ${animationDuration} cubic-bezier(0.455, 0.030, 0.515, 0.955) ${delay} ${count} ${fillMode}
	`;
};
