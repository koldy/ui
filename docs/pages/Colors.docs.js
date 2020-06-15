import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import H1 from '../components/H1';
import Paragraph from '../components/Paragraph';
import Code from '../components/Code';
import List from '../components/List';
import useTheme from '../../src/hooks/useTheme/useTheme';
import ThemeManager from "../../src/theme/ThemeManager";

export const route = '/colors';

export const title = 'Colors';

export default function ColorsDocs() {
	const theme = useTheme();
	const colors = theme.json('color');

	return (
		<>
			<H1>{title}</H1>
			<Paragraph>
				In theory, naming colors is easy. But then, in practice, it's hard. You may think if it like: yeah, I have three colors I want to
				use anywhere and that's it. And you might be right, but soon, you'll get into situation where you need color variations for hover
				effects, disabled state, active and focus state, then the hover state on disabled elements and etc. Some people solve that by using
				3rd party tools that generate darker or lighter colors according to given color. Sometimes, that might work, but in most cases, that
				won't be enough because these tools are calculating colors using math and the result, sometimes, isn't what you want. Then, you may
				find UI solutions that requires you to define too many colors or too little colors and getting it right is real pain.
			</Paragraph>
			<Paragraph>
				Here, you should name the main colors you want to use, like, which color is primary (can be named <code>primary</code>), intent
				colors (like <code>info</code>, <code>success</code>, <code>danger</code>) and etc. You are not limited by any way, you can have as
				many colors as you like and you can use any name you want.
			</Paragraph>
			<Paragraph>
				To define a color in theme, you need a name (one name) and then you define the array of all color variations, from lightest to
				darkest.
			</Paragraph>
			<Code code="const primary = ['#4d97c2', '#3c8dbc', '#3781ab'];" language="js" />
			<Paragraph>In this example, there's three colors, but think of it like this:</Paragraph>
			<List>
				<List.Item>
					there's middle color which is considered as main primary color: <code>#3c8dbc</code>
				</List.Item>
				<List.Item>
					first element is the left (or lighter) color of primary: <code>#4d97c2</code>
				</List.Item>
				<List.Item>
					third element is the right (or darker) color of primary: <code>#3781ab</code>
				</List.Item>
			</List>
			<Paragraph>
				So, when you want to use color lighter than the primary, use <code>primary|-1</code>, and when you need color darker than the
				primary, use <code>primary|1</code>. This principal works across the whole theme's JSON and some components like <code>Text</code>{' '}
				will accept color defined like that. This principal allows you to have as many variations as you want. Koldy UI ships its main
				colors with main color +/- 4 variations, depending on purpose.
			</Paragraph>
			<Paragraph>Current theme has these color sets:</Paragraph>
			<Code language="js">
				<Wrapper>
					{Object.keys(colors).map((color) => (
						<ColorSet color={color} theme={theme} key={color} />
					))}
				</Wrapper>
			</Code>
			<Paragraph>When defining colors, you can use any valid CSS value, including rgb, rgba, hsl and etc.</Paragraph>
		</>
	);
}

const ColorSet = function({color, theme}) {
	const cls = theme.color(color);

	const indexes = [];
	for (let i = cls.lowest; i <= cls.highest; i += 1) {
		indexes.push(i);
	}

	return (
		<div>
			<strong>{color}</strong>
			<ul>
				{indexes.map((i) => (
					<li key={i} style={{backgroundColor: theme.processColor(`${color}|${i}`)}}>
						{i === 0 ? color : i}
					</li>
				))}
			</ul>
		</div>
	);
};

ColorSet.propTypes = {
	color: PropTypes.string.isRequired,
	theme: PropTypes.instanceOf(ThemeManager).isRequired
};

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, 100px);
	grid-gap: 1rem;
	grid-auto-flow: dense;

	> div {
		> strong {
			display: block;
			width: 100%;
			text-align: center;
			font-size: 0.9rem;
		}

		> ul {
			list-style: none;
			margin: 0.5rem 0;
			padding: 0;
			box-shadow: 0 0 1px #000000;

			> li {
				display: block;
				text-align: center;
				font-size: 0.8rem;
				padding: 2px;
				border-left: 1px solid #ffffff;
				border-right: 1px solid #ffffff;

				&:first-child {
					border-top: 1px solid #ffffff;
				}

				&:last-child {
					border-bottom: 1px solid #ffffff;
				}
			}
		}
	}
`;
