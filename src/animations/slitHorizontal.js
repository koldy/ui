import {css, keyframes} from 'styled-components';

/**
 * @link http://animista.net/play/entrances/slit-in/slit-in-horizontal
 * @type {Keyframes}
 */
export const slitInHorizontalKeyframes = keyframes`
0% {
	transform: translateZ(-800px) rotateX(90deg);
	opacity: 0;
}
54% {
	transform: translateZ(-160px) rotateX(87deg);
	opacity: 1;
}
100% {
	transform: translateZ(0) rotateX(0);
}
`;

/**
 * @param animationDuration
 * @return {[]|null|*}
 */
export const slitInHorizontalAnimation = ({animationDuration = '450ms'} = {}) => {
	return css`
		${slitInHorizontalKeyframes} ${animationDuration} ease-out both
	`;
};

/**
 * @link https://animista.net/play/exits/slit-out/slit-out-horizontal
 * @type {Keyframes}
 */
export const slitOutHorizontalKeyframes = keyframes`
0% {
  transform: translateZ(0) rotateX(0);
  opacity: 1;
}
54% {
  transform: translateZ(-160px) rotateX(87deg);
  opacity: 1;
}
100% {
  transform: translateZ(-800px) rotateX(90deg);
  opacity: 0;
}
`;

/**
 * @param animationDuration
 * @return {[]|null|*}
 */
export const slitOutHorizontalAnimation = ({animationDuration = '500ms'} = {}) => {
	return css`
		animation: ${slitInHorizontalKeyframes} ${animationDuration} ease-in both;
	`;
};
