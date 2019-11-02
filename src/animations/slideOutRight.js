import {css, keyframes} from 'styled-components';

export const slideOutRightKeyframes = keyframes`
0% {
	transform: translateX(0%);	
}
100% {
	transform: translateX(100%);
}
`;

export const slideOutRightAnimation = (args) => {
	const {animationDuration = '400ms'} = args || {};
	return css`
		${slideOutRightKeyframes} ${animationDuration} cubic-bezier(0.550, 0.085, 0.680, 0.530) both
	`;
};
