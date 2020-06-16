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

/**
 * @param animationDuration
 * @param delay
 * @param count
 * @param fillMode
 * @return {[]|null|*}
 */
export const swingInTopFwdAnimation = ({animationDuration = '500ms', delay = null, count = null, fillMode = 'both'} = {}) => {
	return css`
		${swingInTopFwdKeyframes} ${animationDuration} cubic-bezier(0.175, 0.885, 0.320, 1.275) ${delay} ${count} ${fillMode}
	`;
};

/**
 * @link https://animista.net/play/exits/swing-out/swing-out-top-fwd
 * @type {Keyframes}
 */

export const swingOutTopFwdKeyframes = keyframes`
0% {
  transform: rotateX(0deg);
  transform-origin: top;
  opacity: 1;
}
100% {
  transform: rotateX(70deg);
  transform-origin: top;
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
export const swingOutTopFwdAnimation = ({animationDuration = '550ms', delay = null, count = null, fillMode = 'both'} = {}) => {
	return css`
		${swingOutTopFwdKeyframes} ${animationDuration} cubic-bezier(0.6, -0.28, 0.735, 0.045) ${delay} ${count} ${fillMode};
	`;
};
