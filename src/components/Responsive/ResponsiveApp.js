import React, {useEffect, useMemo, useContext, useState} from 'react';
import PropTypes from 'prop-types';

import ResponsiveContext from './ResponsiveContext';
import ThemeContext from '../../theme/ThemeContext';
import {isFunction} from '../../util/helpers';

let timer = null;

const ResponsiveApp = function(props) {
	const {children} = props;

	const {theme} = useContext(ThemeContext);

	const [sizes, setSizes] = useState({
		innerWidth: window.innerWidth,
		innerHeight: window.innerHeight
	});

	useEffect(() => {
		const handleResize = () => {
			if (timer) {
				clearTimeout(timer);
			}

			timer = setTimeout(() => {
				setSizes({
					innerWidth: window.innerWidth,
					innerHeight: window.innerHeight
				});

				timer = null;
			}, 25);
		};

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const responsiveContext = useMemo(() => {
		const {innerWidth, innerHeight} = sizes;

		const square = innerWidth === innerHeight;
		const aspectRatio = innerWidth / innerHeight;

		const breakpointsData = {};
		const breakpoints = theme.json('breakpoints');

		if (isFunction(window.matchMedia)) {
			const retinaMediaQuery = `
				only screen and (-webkit-min-device-pixel-ratio: 2),
				only screen and (min--moz-device-pixel-ratio: 2),
				only screen and (-o-min-device-pixel-ratio: 2/1),
				only screen and (min-device-pixel-ratio: 2),
				only screen and (min-resolution: 192dpi),
				only screen and (min-resolution: 2dppx)
			`;

			breakpointsData.portrait = window.matchMedia('screen and (orientation:portrait)').matches;
			breakpointsData.landscape = window.matchMedia('screen and (orientation:landscape)').matches;
			breakpointsData.retina = window.matchMedia(retinaMediaQuery).matches;

			for (const breakpoint of Object.keys(breakpoints)) {
				const query = breakpoints[breakpoint];

				const {matches} = window.matchMedia(query);

				const brk = breakpoint.substr(0, 1).toUpperCase() + breakpoint.substr(1, breakpoint.length - 1);
				breakpointsData[`is${brk}`] = typeof matches === 'boolean' ? matches : false;
			}
		} else {
			theme.warning('window.matchMedia is not available, all breakpoints will be set to null');

			breakpointsData.portrait = innerHeight > innerWidth;
			breakpointsData.landscape = innerWidth > innerHeight;
			breakpointsData.retina = null;

			for (const breakpoint of Object.keys(breakpoints)) {
				const brk = breakpoint.substr(0, 1).toUpperCase() + breakpoint.substr(1, breakpoint.length - 1);
				breakpointsData[`is${brk}`] = null;
			}
		}

		return {
			innerWidth,
			innerHeight,
			square,
			aspectRatio,
			...breakpointsData
		};
	}, [theme, sizes]);

	return <ResponsiveContext.Provider value={responsiveContext}>{children}</ResponsiveContext.Provider>;
};

ResponsiveApp.propTypes = {
	children: PropTypes.node
};

export default ResponsiveApp;
