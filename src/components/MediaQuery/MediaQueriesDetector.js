import React, {useEffect, useMemo, useContext, useState} from 'react';
import PropTypes from 'prop-types';

import ResponsiveContext from './ResponsiveContext';
import ThemeContext from '../../theme/ThemeContext';
import {isFunction} from '../../util/helpers';

let timer = null;

const MediaQueriesDetector = function(props) {
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

		const mediaQueryData = {};
		const mediaQueries = theme.json('mediaQueries');

		if (isFunction(window.matchMedia)) {
			const retinaMediaQuery = `
				only screen and (-webkit-min-device-pixel-ratio: 2),
				only screen and (min--moz-device-pixel-ratio: 2),
				only screen and (-o-min-device-pixel-ratio: 2/1),
				only screen and (min-device-pixel-ratio: 2),
				only screen and (min-resolution: 192dpi),
				only screen and (min-resolution: 2dppx)
			`;

			mediaQueryData.portrait = window.matchMedia('screen and (orientation:portrait)').matches;
			mediaQueryData.landscape = window.matchMedia('screen and (orientation:landscape)').matches;
			mediaQueryData.retina = window.matchMedia(retinaMediaQuery).matches;
			mediaQueryData.prefersDarkColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
			mediaQueryData.prefersLightColorScheme = window.matchMedia('(prefers-color-scheme: light)').matches;

			for (const mediaQuery of Object.keys(mediaQueries)) {
				const query = mediaQueries[mediaQuery];

				const {matches} = window.matchMedia(query);

				const brk = mediaQuery.substr(0, 1).toUpperCase() + mediaQuery.substr(1, mediaQuery.length - 1);
				mediaQueryData[`is${brk}`] = typeof matches === 'boolean' ? matches : false;
			}
		} else {
			theme.warning('window.matchMedia is not available, all media queries will be set to null');

			mediaQueryData.portrait = innerHeight > innerWidth;
			mediaQueryData.landscape = innerWidth > innerHeight;
			mediaQueryData.retina = null;
			mediaQueryData.prefersDarkColorScheme = null;
			mediaQueryData.prefersLightColorScheme = null;

			for (const mediaQuery of Object.keys(mediaQueries)) {
				const brk = mediaQuery.substr(0, 1).toUpperCase() + mediaQuery.substr(1, mediaQuery.length - 1);
				mediaQueryData[`is${brk}`] = null;
			}
		}

		return {
			innerWidth,
			innerHeight,
			square,
			aspectRatio,
			...mediaQueryData
		};
	}, [theme, sizes]);

	return <ResponsiveContext.Provider value={responsiveContext}>{children}</ResponsiveContext.Provider>;
};

MediaQueriesDetector.propTypes = {
	children: PropTypes.node
};

export default MediaQueriesDetector;
