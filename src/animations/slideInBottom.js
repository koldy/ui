import {css, keyframes} from 'styled-components';

export const slideInBottomKeyframes = keyframes`
0% {
	transform: translateY(100%);
}
100% {
	transform: translateY(0%);
}
`;

export const slideInBottomAnimation = (args) => {
	const {animationDuration = '400ms'} = args || {};
	return css`
		${slideInBottomKeyframes} ${animationDuration} cubic-bezier(0.175, 0.885, 0.320, 1.275) both
	`;
};
