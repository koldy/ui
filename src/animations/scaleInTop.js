import {css, keyframes} from 'styled-components';

/**
 * @link https://animista.net/play/entrances/scale-in/scale-in-top
 * @type {Keyframes}
 */
export const scaleInTopKeyframes = keyframes`
0% {
	transform: scale(0);
	transform-origin: 50% 0%;
	opacity: 1;
}
100% {
	transform: scale(1);
	transform-origin: 50% 0%;
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
export const scaleInTopAnimation = ({animationDuration = '500ms', delay = null, count = null, fillMode = 'both'} = {}) => {
	return css`
		${scaleInTopKeyframes} ${animationDuration} cubic-bezier(0.250, 0.460, 0.450, 0.940) ${delay} ${count} ${fillMode}
	`;
};

/**
 * @link https://animista.net/play/exits/slide-out/slide-out-left
 * @type {Keyframes}
 */
export const scaleOutTopKeyframes = keyframes`
0% {
	transform: scale(1);
	transform-origin: 50% 0%;
	opacity: 1;
}
100% {
	transform: scale(0);
	transform-origin: 50% 0%;
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
export const scaleOutTopAnimation = ({animationDuration = '500ms', delay = null, count = null, fillMode = 'both'} = {}) => {
	return css`
		${scaleOutTopKeyframes} ${animationDuration} cubic-bezier(0.550, 0.085, 0.680, 0.530) ${delay} ${count} ${fillMode}
	`;
};
