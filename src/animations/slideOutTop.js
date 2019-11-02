import {css, keyframes} from 'styled-components';

export const slideOutTopKeyframes = keyframes`
0% {
	transform: translateY(0%);	
}
100% {
	transform: translateY(-100%);
}
`;

export const slideOutTopAnimation = (args) => {
	const {animationDuration = '400ms'} = args || {};
	return css`
		${slideOutTopKeyframes} ${animationDuration} cubic-bezier(0.550, 0.085, 0.680, 0.530) both
	`;
};
