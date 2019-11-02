import {css, keyframes} from 'styled-components';

export const slideOutLeftKeyframes = keyframes`
0% {
	transform: translateX(0%);	
}
100% {
	transform: translateX(-100%);
}
`;

export const slideOutLeftAnimation = (args) => {
	const {animationDuration = '400ms'} = args || {};
	return css`
		${slideOutLeftKeyframes} ${animationDuration} cubic-bezier(0.550, 0.085, 0.680, 0.530) both
	`;
};
