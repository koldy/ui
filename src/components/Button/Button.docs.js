import React, {useContext} from 'react';

import Button from './Button';
import ThemeContext from '../../theme/ThemeContext';

import Props from '../../../docs/components/Props';
import AvailableKeys from '../../../docs/components/AvailableKeys';
import H1 from '../../../docs/components/H1';
import Code from '../../../docs/components/Code';
import H2 from '../../../docs/components/H2';
import Paragraph from '../../../docs/components/Paragraph';
import List from '../../../docs/components/List';

export const title = 'Button';
export const route = '/button';
export const json = 'button';

export default function ButtonDocs() {
	const {theme} = useContext(ThemeContext);

	const colors = theme.json('button.color');
	const sizes = theme.json('button.size');
	const widths = theme.json('button.width');
	const variants = theme.json('button.variant');

	return (
		<>
			<H1>Button</H1>
			<Code language="js" code="import {Button} from 'koldy-ui';" />
			<Code language="js" code="<Button>Submit</Button>">
				<Button>Submit</Button>
			</Code>
			<H2 hash="some-theory">Some theory</H2>
			<Paragraph>
				Button component seems like simple component and you'll find a lot of component libraries trying to define button in one way or
				another. Most of the libraries gives you ability to use one of their predefined properties and changing it is really hard sometimes.
				Adding additional properties and styles is sometimes impossible without doing hacks or digging deep into their documentation. Here,
				styling button or adding new styles is really easy.
			</Paragraph>
			<Props>
				<Props.Prop name="children" type="node">
					You may put anything inside of button, but try to stick to strings and numbers. Be aware that button applies
					<code>white-space:nowrap</code> so you can't have multiline text inside of button.
				</Props.Prop>
				<Props.Prop name="type" type="string">
					<Paragraph>
						One of <code>button</code>, <code>submit</code> or <code>reset</code>.
					</Paragraph>
					<Paragraph>
						If not set, then it'll be determined automatically based on <code>onClick</code>. If
						<code>onClick</code> is set, then type will be <code>button</code>, otherwise it's
						<code>submit</code>. So, if you use this component inside your form, it'll be automatically suitable for form submit. If you set
						the <code>onClick</code>, then button won't submit form automatically any more.
					</Paragraph>
				</Props.Prop>
				<Props.Prop name="name" type="string">
					This is usually never used, unless you have to send button's name through the form.
				</Props.Prop>
				<Props.Prop name="disabled" type="bool" defaultValue={false}>
					Adds <code>disabled</code> attribute to the button. In this case, you're able to use CSS's <code>:disabled</code> pseudo selector
					to style the button.
				</Props.Prop>
				<Props.Prop name="onClick" type="function">
					<Code language="js" code="<Button onClick={(x) => console.log(x)}>Click me!</Button>">
						<Button onClick={(x) => console.log(x)}>Click me!</Button>
					</Code>
					<Paragraph>First parameter of the fired function will be object with the following keys:</Paragraph>
					<List>
						<List.Item>
							<strong>name</strong> - string - provided if prop <code>name</code> is set, null otherwise
						</List.Item>
						<List.Item>
							<strong>element</strong> - HTMLElement - the HTML instance of Button
						</List.Item>
					</List>
				</Props.Prop>
				<Props.Prop name="onDoubleClick" type="function">
					If you set <code>onDoubleClick</code> without <code>onClick</code> prop, button will keep the type <code>submit</code> which could
					cause unexpected behaviour when used within the form. In that case, take care of <code>type</code> prop yourself.
					<Code language="js" code="<Button onDoubleClick={(x) => console.log(x)}>Double click me!</Button>">
						<Button onDoubleClick={(x) => console.log(x)}>Double click me!</Button>
					</Code>
					<Paragraph>First parameter of the fired function will be object with the following keys:</Paragraph>
					<List>
						<List.Item>
							<strong>name</strong> - string - provided if prop <code>name</code> is set, null otherwise
						</List.Item>
						<List.Item>
							<strong>element</strong> - HTMLElement - the HTML instance of Button
						</List.Item>
					</List>
				</Props.Prop>
				<Props.Prop name="onFocus" type="function">
					<Paragraph>
						If set, it'll fire given function with standard information. You may use this as opportunity to catch the <code>element</code>{' '}
						and place the drop down menu if you like.
					</Paragraph>
					<Code language="js" code="<Button onFocus={(x) => console.log(x)}>Focus me!</Button>">
						<Button onFocus={(x) => console.log(x)}>Focus me!</Button>
					</Code>
					<Paragraph>First parameter of the fired function will be object with the following keys:</Paragraph>
					<List>
						<List.Item>
							<strong>name</strong> - string - provided if prop <code>name</code> is set, null otherwise
						</List.Item>
						<List.Item>
							<strong>element</strong> - HTMLElement - the HTML instance of Button
						</List.Item>
					</List>
				</Props.Prop>
				<Props.Prop name="onBlur" type="function">
					<Paragraph>If set, it'll fire given function with standard information.</Paragraph>
					<Code language="js" code="<Button onBlur={(x) => console.log(x)}>Blur me!</Button>">
						<Button onBlur={(x) => console.log(x)}>Blur me!</Button>
					</Code>
					<Paragraph>First parameter of the fired function will be object with the following keys:</Paragraph>
					<List>
						<List.Item>
							<strong>name</strong> - string - provided if prop <code>name</code> is set, null otherwise
						</List.Item>
						<List.Item>
							<strong>element</strong> - HTMLElement - the HTML instance of Button
						</List.Item>
					</List>
					<Paragraph>
						Here's an example of attached <code>onFocus</code> and <code>onBlur</code> function to the button:
					</Paragraph>
					<Code language="js" code="<Button onFocus={(x) => console.log(x)} onBlur={(x) => console.log(x)}>Focus &amp; blur me!</Button>">
						<Button onFocus={(x) => console.log(x)} onBlur={(x) => console.log(x)}>
							Focus &amp; blur me!
						</Button>
					</Code>
				</Props.Prop>
				<Props.Prop name="color" type="string" defaultValue="theme.button.defaults.color">
					<Paragraph>
						Sets the button's color. Use one of the color values defined in <code>theme.button.color</code>.
					</Paragraph>
					<AvailableKeys data={colors} />
				</Props.Prop>
				<Props.Prop name="variant" type="string" defaultValue="theme.button.defaults.variant">
					<Paragraph>
						Variant is ability to shape the button's look. Use one of the values from variants defined in <code>theme.button.variant</code>.
					</Paragraph>
					<AvailableKeys data={variants} />
				</Props.Prop>
				<Props.Prop name="width" type={['string', 'number']} defaultValue="theme.button.defaults.width">
					<Paragraph>If passed as number, it'll be used as pixels.</Paragraph>
					<Paragraph>
						If passed as string that contains information about native width, such as <code>10rem</code> or
						<code>10px</code>, then it'll be used as is.{' '}
					</Paragraph>
					<Paragraph>
						If you pass any value defined in <code>theme.button.width</code>, then it'll use value from defined widths.{' '}
					</Paragraph>
					<AvailableKeys data={widths} />
				</Props.Prop>
				<Props.Prop name="size" type="string" defaultValue="theme.button.defaults.size">
					<Paragraph>
						Sets the size of the button which should be defined in the theme. Use one of the defined sizes from{' '}
						<code>theme.button.size</code>.
					</Paragraph>
					<AvailableKeys data={sizes} />
				</Props.Prop>
				<Props.Prop name="style" />
				<Props.Prop name="m" />
				<Props.Prop name="mt" />
				<Props.Prop name="mr" />
				<Props.Prop name="mb" />
				<Props.Prop name="ml" />
				<Props.Prop name="as">
					<Paragraph>
						You can render Button with other HTML tag or component other than <code>&lt;button&gt;</code> tag.
					</Paragraph>
					<Paragraph>
						Here's an example of a Button rendered as <code>&lt;a&gt;</code> and <code>&lt;span&gt;</code> tags:
					</Paragraph>
					<Button as="a" href="/" title="I'm a link">
						Go to homepage
					</Button>
					<Button as="span" ml={10}>
						I'm span
					</Button>
				</Props.Prop>
				<Props.Prop name="ref" />
			</Props>
			<Paragraph>In theory, there are few things you need about every button:</Paragraph>
			<List>
				<List.Item>color</List.Item>
				<List.Item>size - usually three different sizes, sometimes more</List.Item>
				<List.Item>width - not to be confused with size</List.Item>
				<List.Item>variant - the button's shape</List.Item>
			</List>
			<H2 hash="color">Color</H2>
			<Paragraph>
				It's impossible to define button with just one color because there are various button's states which can use other color or similar
				tone of the same color. To simplify things, you can pass the color name as prop, but all state colors will be defined by the theme.
				You're not limited just to background, border and text color. You can define anything you want in theme, including states, such as{' '}
				<code>:disabled</code>, <code>:focus</code>, <code>:hover</code> and such.
			</Paragraph>
			<Paragraph>Available button colors are:</Paragraph>
			{Object.keys(colors).map((color) => (
				<Code
					language="js"
					key={color}
					label={color}
					code={`
<Button color="${color}">Submit</Button>
<Button color="${color}" disabled ml={10}>Disabled</Button>
						`}
				>
					<Button color={color}>Submit</Button>
					<Button color={color} disabled ml={10}>
						Disabled
					</Button>
				</Code>
			))}
			<H2 hash="size">Size</H2>
			<Paragraph>When talking about button's size, there are just two things you have to deal with:</Paragraph>
			<List>
				<List.Item>font size</List.Item>
				<List.Item>padding</List.Item>
			</List>
			<Paragraph>
				So, when defining size, that's all you should be defining in your theme. Be aware that variant CSS is applied after size so if you
				define size in variant, it'll override size defined here.
			</Paragraph>
			<Paragraph>Available button sizes are:</Paragraph>
			{Object.keys(sizes).map((size) => (
				<Code
					language="js"
					code={Object.keys(colors)
						.map((color) => `<Button size="${size}" color="${color}" m="0.1rem">Submit</Button>`)
						.join('\n')}
					key={size}
					label={size}
				>
					{Object.keys(colors).map((color) => (
						<Button size={size} color={color} key={color} m="0.1rem">
							Submit
						</Button>
					))}
				</Code>
			))}
			<H2 hash="width">Width</H2>
			<Paragraph>
				Size is not width, and vice versa. Width is just definition of how wide is the button and nothing else. By using width, it's
				possible to use any button size with different width.
			</Paragraph>
			<Paragraph>
				Width is a prop that's not necessarily defined in theme because you can pass any width any time. Here are few examples:
			</Paragraph>

			{[30, 100, '120px', '100%'].map((w) => (
				<Code language="js" code={`<Button width=${typeof w === 'number' ? `{${w}}` : `"${w}"`}>Submit</Button>`} key={w} label={w}>
					<Button width={w}>Submit</Button>
				</Code>
			))}

			<Paragraph>
				You can pass any valid CSS value for width and it'll work. However, some designs require button widths to be consistent and in that
				case, you can define the list of widths and use them simply by passing their name to <code>width</code> prop.
			</Paragraph>
			<Paragraph>Available widths in theme are:</Paragraph>
			{Object.keys(widths).map((w) => (
				<Code language="js" code={`<Button width="${w}">Submit</Button>`} key={w} label={w}>
					<Button width={w}>Submit</Button>
				</Code>
			))}
			<Paragraph>
				When setting width with CSS value, then it'll set the exact <code>width</code> to button. If you're using width definition from the
				theme, then it'll set the <code>min-width</code> to the button, allowing you to have more text in your button if needed, without
				cutting it.
			</Paragraph>
			<H2 hash="variant">Variant</H2>
			<Paragraph>
				Variant is the button's shape. By using variants, you can completely redefine button's shape. Most common case is when you want to
				have standard square button or circle button. You're not limited to any predefined properties and you can define anything you want.
			</Paragraph>
			<Paragraph>Available variants in theme are:</Paragraph>
			{Object.keys(variants).map((val) => (
				<Code language="js" code={`<Button variant="${val}">Submit</Button>`} key={val} label={val}>
					<Button variant={val}>Submit</Button>
				</Code>
			))}
		</>
	);
}
