import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ThemeContext from '../src/theme/ThemeContext';
import DocsTitle from './components/DocsTitle';
import DocsText from './components/DocsText';
import DocsCode from './components/DocsCode';
import Flexbox from '../src/components/Flexbox/Flexbox';
import Box from '../src/components/Box/Box';
import ThemeManager from '../src/theme/ThemeManager';

export const title = 'Colors';
export const slug = 'colors';
export const json = 'color';

export const Documentation = function() {
	const {theme} = useContext(ThemeContext);

	const colors = theme.json('color');

	return (
		<>
			<DocsTitle hash="colors">Colors</DocsTitle>
			<DocsText>
				In theory, naming colors is easy. But then, in practice, it's hard. You may think if it like: yeah, I have three
				colors I want to use anywhere and that's it. And you might be right, but soon, you'll get into situation where
				you need color variations for hover effects, disabled state, active and focus state, then the hover state on
				disabled elements and etc. Some people solve that by using 3rd party tools that generate darker or lighter
				colors according to given color. Sometimes, that might work, but in most cases, that won't be enough because
				these tools are calculating colors using math and the result, sometimes, isn't what you want. Then, you may find
				UI solutions that requires you to define too many colors or too little colors and getting it right is real pain.
			</DocsText>
			<DocsText>
				Here, you should name the main colors you want to use, like, which color is primary (can be named{' '}
				<code>primary</code>), intent colors (like <code>info</code>, <code>success</code>, <code>danger</code>) and
				etc. You are not limited by any way, you can have as many colors as you like and you can use any name you want.
			</DocsText>
			<DocsText>
				To define a color in theme, you need a name (one name) and then you define the array of all color variations,
				from lightest to darkest.
			</DocsText>
			<DocsCode>
				<DocsCode.Code>const primary = ['#4d97c2', '#3c8dbc', '#3781ab'];</DocsCode.Code>
			</DocsCode>
			<DocsText>In this example, there's three colors, but think of it like this:</DocsText>
			<DocsText>
				<ul>
					<li>there's middle color which is considered as main primary color (#3c8dbc)</li>
					<li>first element is the left (or lighter) color of primary (#4d97c2)</li>
					<li>third element is the right (or darker) color of primary (#3781ab)</li>
				</ul>
			</DocsText>
			<DocsText>
				So, when you want to use color lighter than the primary, use <code>primary|-1</code>, and when you need color
				darker than the primary, use <code>primary|1</code>. This principal works across the whole theme's JSON and some
				components like <code>Text</code> will accept color defined like that. This principal allows you to have as many
				variations as you want. Koldy UI ships its main colors with main color +/- 4 variations.
			</DocsText>
			<DocsText>Current theme has these color sets:</DocsText>
			<DocsCode>
				<DocsCode.Example>
					<Flexbox flexWrap="wrap">
						{Object.keys(colors).map((color) => (
							<ColorSet color={color} theme={theme} key={color} />
						))}
					</Flexbox>
				</DocsCode.Example>
			</DocsCode>
			<DocsText>When defining colors, you can use any valid CSS value, including rgb, rgba, hsl and etc.</DocsText>
		</>
	);
};

const ColorSet = function({color, theme}) {
	const cls = theme.color(color);

	const indexes = [];
	for (let i = cls.lowest; i <= cls.highest; i += 1) {
		indexes.push(i);
	}

	return (
		<Flexbox.Item width={120}>
			<Box p="0.5rem">
				{indexes.map((i) => (
					<Box key={i} textAlign="center" p="0.25rem" background={`${color}|${i}`}>
						<Text>{i === 0 ? color : i}</Text>
					</Box>
				))}
			</Box>
		</Flexbox.Item>
	);
};

ColorSet.propTypes = {
	color: PropTypes.string.isRequired,
	theme: PropTypes.instanceOf(ThemeManager).isRequired
};

const Text = styled.span`
	font-size: 0.8rem;
	color: white;
	text-shadow: 0 0 2px black;
`;
