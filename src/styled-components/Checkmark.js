import styled from 'styled-components';
import ThemeError from '../theme/ThemeError';

export const getInputProps = function(theme, defaults, userSize, userColor, variant, component) {
	const sizes = theme.json('checkboxAndRadio.size');
	const colors = theme.json('checkboxAndRadio.color');

	/**
	 * ******************************** SIZE **************************************
	 */

	let sizeCss = null;
	if (userSize) {
		// something was put in size
		if (typeof sizes[userSize] === 'number') {
			sizeCss = sizes[userSize];
		} else {
			theme.warning(`<${component} size="${userSize}"/> is not defined in theme.checkboxAndRadio.size, fallbacking to default size`);
			sizeCss = null;
		}
	}

	if (!sizeCss) {
		const defaultSize = defaults.size || null;

		if (!defaultSize || typeof defaultSize !== 'string') {
			theme.error(`${component} default size is not defined in theme.checkboxAndRadio.defaults.size or it's not a string`);
		} else if (typeof sizes[defaultSize] === 'number') {
			// it's valid size
			sizeCss = sizes[defaultSize];
		} else {
			theme.error(`${component} default size (${defaultSize}) is not defined in theme.checkboxAndRadio.size`);
		}
	}

	/**
	 * ******************************** CHECK WIDTH **************************************
	 */

	let checkBorderCss = Math.floor(sizeCss / 10);
	if (checkBorderCss < 2) {
		checkBorderCss = 2;
	}

	/**
	 * ******************************** COLORS **************************************
	 */

	let selectedColor = null;
	let colorDefinitions = {};

	if (userColor) {
		// user set the color

		if (typeof colors[userColor] === 'undefined') {
			theme.warning(`<${component} color="${userColor}"/> is not defined in theme.checkboxAndRadio.color, fallbacking to default color`);
		} else {
			// color exists, all good
			colorDefinitions = theme.processColors(colors[userColor]);
			selectedColor = userColor;
		}
	}

	if (selectedColor === null) {
		// use the default color
		const defaultColor = defaults.color;

		if (!defaultColor) {
			throw new ThemeError(
				"There's no theme.checkboxAndRadio.defaults.color in the theme; please define default checkbox color in order to proceed"
			);
		}

		if (typeof colors[defaultColor] === 'undefined') {
			throw new ThemeError(
				`<${component} color="${defaultColor}"/> is not defined in theme.checkboxAndRadio.color; check the value of theme.checkboxAndRadio.defaults.color`
			);
		} else {
			// color exists, all good
			colorDefinitions = theme.processColors(colors[defaultColor]);
		}
	}

	let borderRadiusCss = '2px';

	if (variant === 'checkmark-round') {
		borderRadiusCss = '100%';
	}

	return {
		sizeCss,
		checkBorderCss,
		borderRadiusCss,
		...colorDefinitions
	};
};

const Checkmark = styled.label`
	display: inline-block;
	vertical-align: middle;
	padding: 0;
	margin: 0;
	height: ${({sizeCss}) => sizeCss}px;
	width: ${({sizeCss}) => sizeCss}px;
	position: relative;
	box-sizing: border-box;

	> span {
		position: absolute;
		top: 0;
		left: 0;
		height: ${({sizeCss}) => sizeCss}px;
		width: ${({sizeCss}) => sizeCss}px;
		background-color: ${({inactiveContainerBackground}) => inactiveContainerBackground};
		transition: all 200ms ease;
		border-radius: ${({borderRadiusCss}) => borderRadiusCss};
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		touch-action: manipulation;

		&:after {
			content: '';
			position: absolute;
			display: none;
			left: ${({sizeCss}) => Math.round((9 * sizeCss) / 25)}px;
			top: ${({sizeCss}) => Math.round((5 * sizeCss) / 25)}px;
			width: ${({sizeCss}) => (6 * sizeCss) / 25}px;
			height: ${({sizeCss}) => (11 * sizeCss) / 25}px;
			border: solid ${({activeMarkerColor}) => activeMarkerColor};
			border-width: 0 ${({checkBorderCss}) => checkBorderCss}px ${({checkBorderCss}) => checkBorderCss}px 0;
			transform: rotate(45deg);
			transition: all 200ms ease;
			box-sizing: border-box;
			margin: 0;
			padding: 0;
		}
	}

	> input[type='checkbox'],
	> input[type='radio'] {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;

		&:disabled ~ span {
			cursor: not-allowed;
			opacity: 0.5;
		}

		&:active ~ span {
			box-shadow: inset 0 0 1px 2px ${({inactiveContainerHoverBackground}) => inactiveContainerHoverBackground};
		}

		&:focus ~ span {
			box-shadow: 0 0 1px 2px ${({inactiveContainerHoverBackground}) => inactiveContainerHoverBackground};
		}

		/* When the checkbox is checked, add a blue background */
		&:checked ~ span {
			background-color: ${({activeContainerBackground}) => activeContainerBackground};

			&:hover {
				background-color: ${({activeContainerHoverBackground}) => activeContainerHoverBackground};

				&:after {
					border-color: ${({activeMarkerHoverColor}) => activeMarkerHoverColor};
				}
			}

			&:after {
				display: block;
				border-color: ${({activeMarkerColor}) => activeMarkerColor};
			}
		}

		&:checked:active ~ span {
			box-shadow: inset 0 0 1px 2px ${({activeContainerHoverBackground}) => activeContainerHoverBackground};
		}

		&:checked:focus ~ span {
			box-shadow: 0 0 1px 2px ${({activeContainerHoverBackground}) => activeContainerHoverBackground};
		}
	}

	/* On mouse-over, add a grey background color */
	&:hover {
		> input ~ span {
			background-color: ${({inactiveContainerHoverBackground}) => inactiveContainerHoverBackground};
		}
	}
`;

export default Checkmark;
