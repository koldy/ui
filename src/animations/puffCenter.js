import {css, keyframes} from 'styled-components';

/**
 * @link https://animista.net/play/entrances/puff-in/puff-in-center
 * @type {Keyframes}
 */
export const puffInKeyframes = keyframes`
0% {
  transform: scale(2);
  filter: blur(4px);
  opacity: 0;
}
100% {
  transform: scale(1);
  filter: blur(0px);
  opacity: 1;
}
`;

/**
 * @link https://animista.net/play/entrances/puff-in/puff-in
 */
export const puffInAnimation = ({animationDuration = '700ms'} = {}) => {
	return css`
		${puffInKeyframes} ${animationDuration} cubic-bezier(0.470, 0.000, 0.745, 0.715) both
	`;
};

/**
 * @type {Keyframes}
 */
export const puffOutKeyframes = keyframes`
0% {
  transform: scale(1);
  filter: blur(0px);
  opacity: 1;
}
100% {
  transform: scale(2);
  filter: blur(4px);
  opacity: 0;
}
`;

/**
 * @link https://animista.net/play/exits/puff-out/puff-out-center
 */
export const puffOutAnimation = ({animationDuration = '1s'} = {}) => {
	return css`
		${puffOutKeyframes} ${animationDuration} cubic-bezier(0.165, 0.840, 0.440, 1.000) both
	`;
};
