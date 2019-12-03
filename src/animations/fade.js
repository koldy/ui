import {css, keyframes} from 'styled-components';

/**
 * @type {Keyframes}
 */
export const fadeInKeyframes = keyframes`
0% {
  opacity: 0;
}

100% {
  opacity: 1;
}
`;

/**
 * @link https://animista.net/play/entrances/fade-in/fade-in
 */
export const fadeInAnimation = (args) => {
	const {animationDuration = '1.2s'} = args || {};
	return css`
		${fadeInKeyframes} ${animationDuration} cubic-bezier(0.390, 0.575, 0.565, 1.000) both
	`;
};

export const fadeInAnimationDuration = '1.2s';

/**
 * @type {Keyframes}
 */
export const fadeOutKeyframes = keyframes`
from {
  opacity: 1;
}

to {
  opacity: 0;
}
`;

/**
 * @link https://animista.net/play/exits/fade-out/fade-out
 */
export const fadeOutAnimation = (args) => {
	const {animationDuration = '1s'} = args || {};
	return css`
		${fadeOutKeyframes} ${animationDuration} ease-out both
	`;
};

export const fadeOutAnimationDuration = '1s';
