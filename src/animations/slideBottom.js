import {css, keyframes} from 'styled-components';

/**
 * @link https://animista.net/play/entrances/slide-in/slide-in-bottom
 * @type {Keyframes}
 */
export const slideInBottomKeyframes = keyframes`
0% {
  transform: translateY(1000px);
  opacity: 0;
}
100% {
  transform: translateY(0);
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
export const slideInBottomAnimation = ({animationDuration = '500ms', delay = null, count = null, fillMode = 'both'} = {}) => {
	return css`
		${slideInBottomKeyframes} ${animationDuration} cubic-bezier(0.250, 0.460, 0.450, 0.940) ${delay} ${count} ${fillMode}
	`;
};

/**
 * @link https://animista.net/play/exits/slide-out/slide-out-bottom
 * @type {Keyframes}
 */
export const slideOutBottomKeyframes = keyframes`
0% {
  transform: translateY(0);
  opacity: 1;
}
100% {
  transform: translateY(1000px);
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
export const slideOutBottomAnimation = ({animationDuration = '500ms', delay = null, count = null, fillMode = 'both'} = {}) => {
	return css`
		${slideOutBottomKeyframes} ${animationDuration} cubic-bezier(0.550, 0.085, 0.680, 0.530) ${delay} ${count} ${fillMode}
	`;
};
