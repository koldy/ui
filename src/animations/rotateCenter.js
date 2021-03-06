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

/**
 * @param animationDuration
 * @param delay
 * @param count
 * @param fillMode
 * @return {[]|null|*}
 */
export const rotateInCenterAnimation = ({animationDuration = '600ms', delay = null, count = null, fillMode = 'both'} = {}) => {
	return css`
		${rotateInCenterKeyframes} ${animationDuration} cubic-bezier(0.250, 0.460, 0.450, 0.940) ${delay} ${count} ${fillMode}
	`;
};

/**
 * @link https://animista.net/play/exits/rotate-out/rotate-out-center
 * @type {Keyframes}
 */
export const rotateOutCenterKeyframes = keyframes`
0% {
  transform: rotate(0);
  opacity: 1;
}
100% {
  transform: rotate(-360deg);
  opacity: 0;
}
`;

/**
 * @param animationDuration
 * @param delay
 * @param count
 * @param fillMode
 * @return {[]|null|*}
 */
export const rotateOutCenterAnimation = ({animationDuration = '600ms', delay = null, count = null, fillMode = 'both'} = {}) => {
	return css`
		${rotateOutCenterKeyframes} ${animationDuration} cubic-bezier(0.550, 0.085, 0.680, 0.530) ${delay} ${count} ${fillMode}
	`;
};
