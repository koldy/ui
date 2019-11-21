import React, {useContext} from 'react';
import DocsTitle from '../../../docs/components/DocsTitle';

import Badge from './Badge';
import ThemeContext from '../../theme/ThemeContext';

import Props from '../../../docs/components/Props';
import DocsSubTitle from '../../../docs/components/DocsSubTitle';
import DocsText from '../../../docs/components/DocsText';
import ImportComponent from '../../../docs/components/ImportComponent';
import DocsCode from '../../../docs/components/DocsCode';
import AvailableKeys from '../../../docs/components/AvailableKeys';

export const title = 'Badge';
export const slug = 'badge';
export const json = 'badge';

export const Documentation = function() {
	const {theme} = useContext(ThemeContext);

	const colors = theme.json('badge.color');
	const sizes = theme.json('badge.size');
	const variants = theme.json('badge.variant');

	return (
		<>
			<DocsTitle hash="badge">Badge</DocsTitle>
			<ImportComponent name="Badge" />
			<DocsCode>
				<DocsCode.Example>
					Hey, look at this: <Badge>I'm badge</Badge>
				</DocsCode.Example>
				<DocsCode.Code>{"Hey, look at this: <Badge>I'm badge</Badge>"}</DocsCode.Code>
			</DocsCode>
			<Props>
				<Props.Prop name="children" type="node" />
				<Props.Prop name="onClick" type="function">
					<p>Fires function with object on first parameter with the following keys:</p>
					<ul>
						<li>
							<strong>element</strong> - HTMLElement
						</li>
					</ul>
					<DocsCode>
						<DocsCode.Example>
							<Badge onClick={(x) => console.log(x)}>Click me!</Badge>
						</DocsCode.Example>
						<DocsCode.Code>{'<Badge onClick={(x) => console.log(x)}>Click me!</Badge>'}</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="onDoubleClick" type="function">
					<p>Fires function with object on first parameter with the following keys:</p>
					<ul>
						<li>
							<strong>element</strong> - HTMLElement
						</li>
					</ul>
					<DocsCode>
						<DocsCode.Example>
							<Badge onDoubleClick={(x) => console.log(x)}>Double click me!</Badge>
						</DocsCode.Example>
						<DocsCode.Code>{'<Badge onDoubleClick={(x) => console.log(x)}>Double click me!</Badge>'}</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="color" type="string" defaultValue="theme.badge.defaults.color">
					<p>
						One of the colors defined in <code>theme.badge.color</code>.
					</p>
					<AvailableKeys data={colors} />
				</Props.Prop>
				<Props.Prop name="variant" type="string" defaultValue="theme.badge.defaults.variant">
					<p>Variant is used to shape the badge.</p>
					<AvailableKeys data={variants} name="theme.badge.variant" />
				</Props.Prop>
				<Props.Prop name="size" type="string" defaultValue="theme.badge.defaults.size">
					<p>
						One of the defined sizes in <code>theme.badge.size</code>.
					</p>
					<AvailableKeys data={sizes} />
				</Props.Prop>
				<Props.Prop name="style" />
				<Props.Prop name="m" />
				<Props.Prop name="mt" />
				<Props.Prop name="mr" />
				<Props.Prop name="mb" />
				<Props.Prop name="ml" />
				<Props.Prop name="as" />
				<Props.Prop name="ref" />
			</Props>
			<DocsSubTitle hash="some-theory">Some theory</DocsSubTitle>
			<DocsText>
				Badge is standard component that usually show off some number (like unread message count) or any other information that requires
				user's attention. In theory, there are few things you need about every badge:
			</DocsText>
			<DocsText>
				<ul>
					<li>color</li>
					<li>size - usually three different sizes, sometimes more</li>
					<li>variant - the badge's shape</li>
				</ul>
			</DocsText>
			<DocsText>
				Badge's size should be always expressed in <em>em</em> units so the size can inherit the size of the places where it's added (for
				example, if you put normal size Badge in &lt;h1&gt; tag, it has to have the same size as title).
			</DocsText>
			<DocsSubTitle hash="color">Color</DocsSubTitle>
			<DocsText>You may use anything in CSS to customize the color of badge, including the hover state.</DocsText>
			<DocsText>Available badge colors are:</DocsText>
			{Object.keys(colors).map((val) => (
				<DocsCode key={val} label={val} labelWidth="auto">
					<DocsCode.Example>
						<Badge color={val}>1</Badge>
					</DocsCode.Example>
					<DocsCode.Code>{`<Badge color="${val}">1</Badge>`}</DocsCode.Code>
				</DocsCode>
			))}
			<DocsSubTitle hash="size">Size</DocsSubTitle>
			<DocsText>
				Badge size is automatic and it'll inherit the size of parent component, so when talking about badge size, you just have to define do
				you want bigger or smaller badge according to the parent component. So, when defining badge size in theme, we recommend that you
				define the font size and padding in <code>em</code> units instead in pixels, rems or any other fixed size unit.
			</DocsText>
			<DocsText>Available badge sizes are:</DocsText>
			{Object.keys(sizes).map((val) => (
				<DocsCode key={val} label={val} labelWidth="auto">
					<DocsCode.Example>
						{Object.keys(colors).map((color) => (
							<Badge size={val} color={color} key={color} mr={10}>
								1
							</Badge>
						))}
					</DocsCode.Example>
					<DocsCode.Code>
						{Object.keys(colors)
							.map((color) => `<Badge size="${val}" color="${color}" mr={10}>1</Badge>`)
							.join('\n')}
					</DocsCode.Code>
				</DocsCode>
			))}
			<DocsText>
				Here's example of Badge without defined size, but placed in <code>h2</code> tag which, by default, has bigger font size:
			</DocsText>
			<DocsCode>
				<DocsCode.Example>
					<h2>
						Some title <Badge color="danger">1</Badge>
					</h2>
				</DocsCode.Example>
				<DocsCode.Code>
					{`
					<h2>
						Some title <Badge color="danger">2</Badge>
					</h2>
					`}
				</DocsCode.Code>
			</DocsCode>
			<DocsSubTitle hash="variant">Variant</DocsSubTitle>
			<DocsText>
				Variant is the badge's shape. By using variants, you can completely redefine badge's shape. Most common case is when you want to
				have standard square badge or circle badge. You're not limited to any predefined properties and you can define anything you want.
			</DocsText>
			<DocsText>Available variants in theme are:</DocsText>
			{Object.keys(variants).map((val) => (
				<DocsCode key={val} label={val} labelWidth="auto">
					<DocsCode.Example>
						{Object.keys(colors).map((color) => (
							<Badge variant={val} color={color} key={color} mr={10}>
								1
							</Badge>
						))}
					</DocsCode.Example>
					<DocsCode.Code>
						{Object.keys(colors)
							.map((color) => `<Badge variant="${val}" color="${color}" mr={10}>1</Badge>`)
							.join('\n')}
					</DocsCode.Code>
				</DocsCode>
			))}
		</>
	);
};
