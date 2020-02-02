import React, {useContext, useMemo} from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

import ThemeContext from '../../theme/ThemeContext';
import {getPixelsOrString, getStyleForMargins, isNumberOrString, isObject} from '../../util/helpers';

const ProgressBar = function(props) {
	const {theme} = useContext(ThemeContext);
	const {color: defaultColor = null, size: defaultSize = null, variant: defaultVariant = null} = theme.json('progressBar.defaults');

	const {
		value = null,
		max = null,
		variant = defaultVariant,
		size = defaultSize,
		color = defaultColor,
		width = '100%',
		minWidth = null,
		maxWidth = null,
		m = null,
		mt = null,
		mr = null,
		mb = null,
		ml = null,
		...otherProps
	} = props;

	const {containerStyle, containerCss, barCss, padding} = useMemo(() => {
		const sizes = theme.json('progressBar.size');
		const variants = theme.json('progressBar.variant');
		const colors = theme.json('progressBar.color');

		const cc = {};
		const bc = {};
		let s = null;
		let p = null;

		if (!isObject(sizes[size])) {
			theme.warning(`<ProgressBar size="${size}"/> is not set or not an object, so using the size of 8px by default`);
			s = 8;
			p = 2;
		} else {
			const {height: hh = 8, padding: pp = 0} = sizes[size];
			s = hh;
			p = pp;
		}

		if (colors[color] === undefined) {
			theme.warning(`<ProgressBar color="${color}"/> is not set in theme.progressBar.color.${color}`);
		} else {
			const {inactiveBackgroundColor = 'transparent', activeBackgroundColor = 'transparent'} = colors[color];
			bc.backgroundColor = theme.processColor(activeBackgroundColor);
			cc.backgroundColor = theme.processColor(inactiveBackgroundColor);
		}

		if (variants[variant] === undefined) {
			theme.warning(`<ProgressBar variant="${variant}"/> is not set in theme.progressBar.variant.${variant}`);
		} else if (typeof variants[variant] === 'number') {
			const v = variants[variant];
			cc.borderRadius = `${v + p}px`;
			bc.borderRadius = `${v}px`;
		} else {
			theme.warning(`Found invalid value in theme.progressBar.variant.${variant}, expected number, got ${typeof variants[variant]}`);
		}

		cc.height = `${s}px`;

		if (p > 0) {
			bc.top = `${p}px`;
			bc.left = `${p}px`;
			bc.bottom = `${p}px`;
		}

		return {
			containerCss: cc,
			barCss: bc,
			containerStyle: {
				...getStyleForMargins({m, mt, mr, mb, ml}),
				width: isNumberOrString(width) ? getPixelsOrString(width) : 'auto',
				minWidth: isNumberOrString(minWidth) ? getPixelsOrString(minWidth) : '0',
				maxWidth: isNumberOrString(maxWidth) ? getPixelsOrString(maxWidth) : 'none'
			},
			padding: p
		};
	}, [theme, variant, size, color, width, maxWidth, minWidth, m, mt, mr, mb, ml]);

	const barStyle = {};
	let percent = 100;

	if (typeof value === 'number' && typeof max === 'number') {
		percent = (value / max) * 100;

		if (percent < 0) {
			percent = 0;
		} else if (percent > 100) {
			percent = 100;
		}

		barStyle.width = `calc(${percent}% - ${padding * 2}px)`;
	} else {
		barStyle.width = `calc(100% - ${padding * 2}px)`;
	}

	return (
		<StyledProgressBar containerCss={containerCss} barCss={barCss} padding={padding} style={containerStyle} {...otherProps}>
			<div style={barStyle} />
		</StyledProgressBar>
	);
};

ProgressBar.propTypes = {
	value: PropTypes.number,
	max: PropTypes.number,
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

	size: PropTypes.string,
	variant: PropTypes.string,
	color: PropTypes.string,

	// margins:
	m: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	ml: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const StyledProgressBar = styled.div`
	display: inline-block;
	vertical-align: inherit;
	position: relative;
	box-sizing: border-box;
	overflow: hidden;
	${({containerCss}) => css(containerCss)}

	> div {
		display: block;
		box-sizing: border-box;
		position: absolute;
		transition: width 300ms ease-in-out;
		top: 0;
		left: 0;
		bottom: 0;
		${({barCss}) => css(barCss)}
	}
`;

export default ProgressBar;
