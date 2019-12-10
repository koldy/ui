import {css, keyframes} from 'styled-components';

/**
 * @link http://animista.net/play/entrances/slide-in-bck/slide-in-bck-center
 * @type {Keyframes}
 */
export const slideInBckCenterKeyframes = keyframes`
0% {
	transform: translateZ(600px);
	opacity: 0;
}
100% {
	transform: translateZ(0);
	opacity: 1;
}
`;

/**
 * @param animationDuration
 * @return {[]|null|*}
 */
export const slideInBckCenterAnimation = ({animationDuration = '700ms'} = {}) => {
	return css`
		${slideInBckCenterKeyframes} ${animationDuration} cubic-bezier(0.250, 0.460, 0.450, 0.940) both
	`;
};

/**
 * @link https://animista.net/play/exits/slide-out-bck/slide-out-bck-center
 * @type {Keyframes}
 */
export const slideOutBckCenterKeyframes = keyframes`
0% {
  transform: translateZ(0);
  opacity: 1;
}
100% {
  transform: translateZ(-1100px);
  opacity: 0;
}
`;

/**
 * @param animationDuration
 * @return {[]|null|*}
 */
export const slideInOutCenterAnimation = ({animationDuration = '500ms'} = {}) => {
	return css`
		${slideInBckCenterKeyframes} ${animationDuration} cubic-bezier(0.550, 0.085, 0.680, 0.530) both
	`;
};
