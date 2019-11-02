import {css, keyframes} from 'styled-components';

export const fadeOutKeyframes = keyframes`
from {
  opacity: 1;
}

to {
  opacity: 0;
}
`;

export const fadeOutAnimation = (args) => {
	const {animationDuration = '300ms'} = args || {};
	return css`
		${fadeOutKeyframes} ${animationDuration} ease-in-out both
	`;
};
