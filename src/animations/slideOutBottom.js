import {css, keyframes} from 'styled-components';

export const slideOutBottomKeyframes = keyframes`
0% {
	transform: translateY(0%);	
}
100% {
	transform: translateY(100%);
}
`;

export const slideOutBottomAnimation = (args) => {
	const {animationDuration = '400ms'} = args || {};
	return css`
		${slideOutBottomKeyframes} ${animationDuration} cubic-bezier(0.550, 0.085, 0.680, 0.530) both
	`;
};
