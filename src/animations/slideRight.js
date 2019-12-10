import {css, keyframes} from 'styled-components';

/**
 * @link https://animista.net/play/entrances/slide-in/slide-in-right
 * @type {Keyframes}
 */
export const slideInRightKeyframes = keyframes`
0% {
  transform: translateX(1000px);
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
export const slideInRightAnimation = ({animationDuration = '500ms'} = {}) => {
	return css`
		${slideInRightKeyframes} ${animationDuration} cubic-bezier(0.250, 0.460, 0.450, 0.940) both
	`;
};

/**
 * @link https://animista.net/play/exits/slide-out/slide-out-right
 * @type {Keyframes}
 */
export const slideOutRightKeyframes = keyframes`
0% {
  transform: translateX(0);
  opacity: 1;
}
100% {
  transform: translateX(1000px);
  opacity: 0;
}
`;

/**
 * @param animationDuration
 * @return {[]|null|*}
 */
export const slideOutRightAnimation = ({animationDuration = '500ms'} = {}) => {
	return css`
		${slideOutRightKeyframes} ${animationDuration} cubic-bezier(0.550, 0.085, 0.680, 0.530) both
	`;
};
