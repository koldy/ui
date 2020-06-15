import React, {useContext} from 'react';

import Badge from './Badge';
import ThemeContext from '../../theme/ThemeContext';

import Props from '../../../docs/components/Props';
import AvailableKeys from '../../../docs/components/AvailableKeys';
import H1 from '../../../docs/components/H1';
import H2 from '../../../docs/components/H2';
import Code from '../../../docs/components/Code';
import Paragraph from '../../../docs/components/Paragraph';
import List from '../../../docs/components/List';

export const title = 'Badge';
export const route = '/badge';
export const json = 'badge';

export default function BadgeDocs() {
	const {theme} = useContext(ThemeContext);

	const colors = theme.json('badge.color');
	const sizes = theme.json('badge.size');
	const variants = theme.json('badge.variant');

	return (
		<>
			<H1>Badge</H1>
			<Code language="js" code="import {Badge} from 'koldy-ui';" />
			<Code language="js" code="Hey, look at this: <Badge>I'm badge</Badge>">
				Hey, look at this: <Badge>I'm badge</Badge>
			</Code>
			<Props>
				<Props.Prop name="children" type="node" />
				<Props.Prop name="onClick" type="function">
					<p>Fires function with object on first parameter with the following keys:</p>
					<ul>
						<List.Item>
							<strong>element</strong> - HTMLElement
						</List.Item>
					</ul>
					<Code language="js" code="<Badge onClick={(x) => console.log(x)}>Click me!</Badge>">
						<Badge onClick={(x) => console.log(x)}>Click me!</Badge>
					</Code>
				</Props.Prop>
				<Props.Prop name="onDoubleClick" type="function">
					<Paragraph>Fires function with object on first parameter with the following keys:</Paragraph>
					<List>
						<List.Item>
							<strong>element</strong> - HTMLElement
						</List.Item>
					</List>
					<Code language="js" code="<Badge onDoubleClick={(x) => console.log(x)}>Double click me!</Badge>">
						<Badge onDoubleClick={(x) => console.log(x)}>Double click me!</Badge>
					</Code>
				</Props.Prop>
				<Props.Prop name="color" type="string" defaultValue="theme.badge.defaults.color">
					<Paragraph>
						One of the colors defined in <code>theme.badge.color</code>.
					</Paragraph>
					<AvailableKeys data={colors} />
				</Props.Prop>
				<Props.Prop name="variant" type="string" defaultValue="theme.badge.defaults.variant">
					<Paragraph>Variant is used to shape the badge.</Paragraph>
					<AvailableKeys data={variants} name="theme.badge.variant" />
				</Props.Prop>
				<Props.Prop name="size" type="string" defaultValue="theme.badge.defaults.size">
					<Paragraph>
						One of the defined sizes in <code>theme.badge.size</code>.
					</Paragraph>
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
			<H2 hash="some-theory">Some theory</H2>
			<Paragraph>
				Badge is standard component that usually show off some number (like unread message count) or any other information that requires
				user's attention. In theory, there are few things you need about every badge:
			</Paragraph>
			<List>
				<List.Item>color</List.Item>
				<List.Item>size - usually three different sizes, sometimes more</List.Item>
				<List.Item>variant - the badge's shape</List.Item>
			</List>
			<Paragraph>
				Badge's size should be always expressed in <em>em</em> units so the size can inherit the size of the places where it's added (for
				example, if you put normal size Badge in &lt;h1&gt; tag, it has to have the same size as title).
			</Paragraph>
			<H2 hash="color">Color</H2>
			<Paragraph>You may use anything in CSS to customize the color of badge, including the hover state.</Paragraph>
			<Paragraph>Available badge colors are:</Paragraph>
			{Object.keys(colors).map((val) => (
				<Code language="js" key={val} label={val} labelWidth="auto" code={`<Badge color="${val}">1</Badge>`}>
					<Badge color={val}>1</Badge>
				</Code>
			))}
			<H2 hash="size">Size</H2>
			<Paragraph>
				Badge size is automatic and it'll inherit the size of parent component, so when talking about badge size, you just have to define do
				you want bigger or smaller badge according to the parent component. So, when defining badge size in theme, we recommend that you
				define the font size and padding in <code>em</code> units instead in pixels, rems or any other fixed size unit.
			</Paragraph>
			<Paragraph>Available badge sizes are:</Paragraph>
			{Object.keys(sizes).map((val) => (
				<Code
					key={val}
					label={val}
					labelWidth="auto"
					language="js"
					code={Object.keys(colors)
						.map((color) => `<Badge size="${val}" color="${color}" mr={10}>1</Badge>`)
						.join('\n')}
				>
					{Object.keys(colors).map((color) => (
						<Badge size={val} color={color} key={color} mr={10}>
							1
						</Badge>
					))}
				</Code>
			))}
			<Paragraph>
				Here's example of Badge without defined size, but placed in <code>h2</code> tag which, by default, has bigger font size:
			</Paragraph>
			<Code language="js" code={`<h2>Some title <Badge color="danger">2</Badge></h2>`}>
				<h2>
					Some title <Badge color="danger">1</Badge>
				</h2>
			</Code>
			<H2 hash="variant">Variant</H2>
			<Paragraph>
				Variant is the badge's shape. By using variants, you can completely redefine badge's shape. Most common case is when you want to
				have standard square badge or circle badge. You're not limited to any predefined properties and you can define anything you want.
			</Paragraph>
			<Paragraph>Available variants in theme are:</Paragraph>
			{Object.keys(variants).map((val) => (
				<Code
					language="js"
					key={val}
					label={val}
					labelWidth="auto"
					code={Object.keys(colors)
						.map((color) => `<Badge variant="${val}" color="${color}" mr={10}>1</Badge>`)
						.join('\n')}
				>
					{Object.keys(colors).map((color) => (
						<Badge variant={val} color={color} key={color} mr={10}>
							1
						</Badge>
					))}
				</Code>
			))}
		</>
	);
}
