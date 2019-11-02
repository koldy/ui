import {css, keyframes} from 'styled-components';

export const slideInLeftKeyframes = keyframes`
0% {
	transform: translateX(-100%);
}
100% {
	transform: translateX(0%);
}
`;

export const slideInLeftAnimation = (args) => {
	const {animationDuration = '400ms'} = args || {};
	return css`
		${slideInLeftKeyframes} ${animationDuration} cubic-bezier(0.175, 0.885, 0.320, 1.275) both
	`;
};
