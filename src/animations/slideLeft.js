import {css, keyframes} from 'styled-components';

/**
 * @link https://animista.net/play/entrances/slide-in/slide-in-left
 * @type {Keyframes}
 */
export const slideInLeftKeyframes = keyframes`
0% {
  transform: translateX(-1000px);
  opacity: 0;
}
100% {
  transform: translateX(0);
  opacity: 1;
}
`;

/**
 * @param animationDuration
 * @return {[]|null|*}
 */
export const slideInLeftAnimation = ({animationDuration = '500ms'} = {}) => {
	return css`
		${slideInLeftKeyframes} ${animationDuration} cubic-bezier(0.250, 0.460, 0.450, 0.940) both
	`;
};

/**
 * @link https://animista.net/play/exits/slide-out/slide-out-left
 * @type {Keyframes}
 */
export const slideOutLeftKeyframes = keyframes`
0% {
  transform: translateX(0);
  opacity: 1;
}
100% {
  transform: translateX(-1000px);
  opacity: 0;
}
`;

/**
 * @param animationDuration
 * @return {[]|null|*}
 */
export const slideOutLeftAnimation = ({animationDuration = '500ms'} = {}) => {
	return css`
		${slideOutLeftKeyframes} ${animationDuration} cubic-bezier(0.550, 0.085, 0.680, 0.530) both
	`;
};