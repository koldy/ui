import {css, keyframes} from 'styled-components';

/**
 * @link https://animista.net/play/entrances/slide-in/slide-in-top
 * @type {Keyframes}
 */
export const slideInTopKeyframes = keyframes`
0% {
  transform: translateY(-1000px);
  opacity: 0;
}
100% {
  transform: translateY(0);
  opacity: 1;
}
`;

export const slideInTopAnimation = ({animationDuration = '500ms', delay = null, count = null, fillMode = 'both'} = {}) => {
	return css`
		${slideInTopKeyframes} ${animationDuration} cubic-bezier(0.250, 0.460, 0.450, 0.940) ${delay} ${count} ${fillMode}
	`;
};

/**
 * @link https://animista.net/play/exits/slide-out/slide-out-top
 * @type {Keyframes}
 */
export const slideOutTopKeyframes = keyframes`
0% {
  transform: translateY(0);
  opacity: 1;
}
100% {
  transform: translateY(-1000px);
  opacity: 0;
}
`;

export const slideOutTopAnimation = ({animationDuration = '500ms', delay = null, count = null, fillMode = 'both'} = {}) => {
	return css`
		${slideOutTopKeyframes} ${animationDuration} cubic-bezier(0.550, 0.085, 0.680, 0.530) ${delay} ${count} ${fillMode}
	`;
};
