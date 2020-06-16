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

/**
 * @param animationDuration
 * @param delay
 * @param count
 * @param fillMode
 * @return {[]|null|*}
 */
export const flipInHorizontalBottomAnimation = ({animationDuration = '500ms', delay = null, count = null, fillMode = 'both'} = {}) => {
	return css`
		${flipInHorizontalBottomKeyframes} ${animationDuration} cubic-bezier(0.250, 0.460, 0.450, 0.940) ${delay} ${count} ${fillMode}
	`;
};

/**
 * @link http://animista.net/play/entrances/flip-in/flip-in-hor-bottom
 * @type {Keyframes}
 */
export const flipOutHorizontalBottomKeyframes = keyframes`
0% {
  transform: rotateX(0);
  opacity: 1;
}
100% {
  transform: rotateX(-70deg);
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
export const flipOutHorizontalBottomAnimation = ({animationDuration = '450ms', delay = null, count = null, fillMode = 'both'} = {}) => {
	return css`
		${flipOutHorizontalBottomKeyframes} ${animationDuration} cubic-bezier(0.550, 0.085, 0.680, 0.530) ${delay} ${count} ${fillMode}
	`;
};
