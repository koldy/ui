import {css, keyframes} from 'styled-components';

export const fadeInKeyframes = keyframes`
0% {
  opacity: 0;
}

100% {
  opacity: 1;
}
`;

export const fadeInAnimation = (args) => {
	const {animationDuration = '300ms'} = args || {};
	return css`
		${fadeInKeyframes} ${animationDuration} ease-in-out both
	`;
};
