import React, {useContext} from 'react';
import DocsTitle from '../../../docs/components/DocsTitle';

import Button from './Button';
import ThemeContext from '../../theme/ThemeContext';

import Props from '../../../docs/components/Props';
import DocsSubTitle from '../../../docs/components/DocsSubTitle';
import DocsText from '../../../docs/components/DocsText';
import ImportComponent from '../../../docs/components/ImportComponent';
import DocsCode from '../../../docs/components/DocsCode';
import AvailableKeys from '../../../docs/components/AvailableKeys';

export const title = 'Button';
export const slug = 'button';
export const json = 'button';

export const Documentation = function() {
	const {theme} = useContext(ThemeContext);

	const colors = theme.json('button.color');
	const sizes = theme.json('button.size');
	const widths = theme.json('button.width');
	const variants = theme.json('button.variant');

	return (
		<>
			<DocsTitle hash="button">Button</DocsTitle>
			<ImportComponent name="Button" />
			<DocsCode>
				<DocsCode.Example>
					<Button>Submit</Button>
				</DocsCode.Example>
				<DocsCode.Code>{`<Button>Submit</Button>`}</DocsCode.Code>
			</DocsCode>
			<DocsSubTitle hash="some-theory">Some theory</DocsSubTitle>
			<DocsText>
				Button component seems like simple component and you'll find a lot of component libraries trying to define
				button in one way or another. Most of the libraries gives you ability to use one of their predefined properties
				and changing it is really hard sometimes. Adding additional properties and styles is sometimes impossible
				without doing hacks or digging deep into their documentation. Here, styling button or adding new styles is
				really easy.
			</DocsText>
			<Props>
				<Props.Prop name="children" type="node">
					You may put anything inside of button, but try to stick to strings and numbers. Be aware that button applies
					<code>white-space:nowrap</code> so you can't have multiline text inside of button.
				</Props.Prop>
				<Props.Prop name="type" type="string">
					<p>
						One of <code>button</code>, <code>submit</code> or <code>reset</code>.
					</p>
					<p>
						If not set, then it'll be determined automatically based on <code>onClick</code>. If
						<code>onClick</code> is set, then type will be <code>button</code>, otherwise it's
						<code>submit</code>. So, if you use this component inside your form, it'll be automatically suitable for
						form submit. If you set the <code>onClick</code>, then button won't submit form automatically any more.
					</p>
				</Props.Prop>
				<Props.Prop name="name" type="string">
					This is usually never used, unless you have to send button's name through the form.
				</Props.Prop>
				<Props.Prop name="disabled" type="bool" defaultValue={false}>
					Adds <code>disabled</code> attribute to the button. In this case, you're able to use CSS's{' '}
					<code>:disabled</code> pseudo selector to style the button.
				</Props.Prop>
				<Props.Prop name="onClick" type="function">
					<DocsCode>
						<DocsCode.Example>
							<Button onClick={(x) => console.log(x)}>Click me!</Button>
						</DocsCode.Example>
						<DocsCode.Code>{'<Button onClick={(x) => console.log(x)}>Click me!</Button>'}</DocsCode.Code>
					</DocsCode>
					<p>First parameter of the fired function will be object with the following keys:</p>
					<ul>
						<li>
							<strong>name</strong> - string - provided if prop <code>name</code> is set, null otherwise
						</li>
						<li>
							<strong>element</strong> - HTMLElement - the HTML instance of Button
						</li>
					</ul>
				</Props.Prop>
				<Props.Prop name="onDoubleClick" type="function">
					If you set <code>onDoubleClick</code> without <code>onClick</code> prop, button will keep the type{' '}
					<code>submit</code> which could cause unexpected behaviour when used within the form. In that case, take care
					of <code>type</code> prop yourself.
					<DocsCode>
						<DocsCode.Example>
							<Button onDoubleClick={(x) => console.log(x)}>Double click me!</Button>
						</DocsCode.Example>
						<DocsCode.Code>{'<Button onDoubleClick={(x) => console.log(x)}>Double click me!</Button>'}</DocsCode.Code>
					</DocsCode>
					<p>First parameter of the fired function will be object with the following keys:</p>
					<ul>
						<li>
							<strong>name</strong> - string - provided if prop <code>name</code> is set, null otherwise
						</li>
						<li>
							<strong>element</strong> - HTMLElement - the HTML instance of Button
						</li>
					</ul>
				</Props.Prop>
				<Props.Prop name="onFocus" type="function">
					<p>
						If set, it'll fire given function with standard information. You may use this as opportunity to catch the{' '}
						<code>element</code> and place the drop down menu if you like.
					</p>
					<DocsCode>
						<DocsCode.Example>
							<Button onFocus={(x) => console.log(x)}>Focus me!</Button>
						</DocsCode.Example>
						<DocsCode.Code>{'<Button onFocus={(x) => console.log(x)}>Focus me!</Button>'}</DocsCode.Code>
					</DocsCode>
					<p>First parameter of the fired function will be object with the following keys:</p>
					<ul>
						<li>
							<strong>name</strong> - string - provided if prop <code>name</code> is set, null otherwise
						</li>
						<li>
							<strong>element</strong> - HTMLElement - the HTML instance of Button
						</li>
					</ul>
				</Props.Prop>
				<Props.Prop name="onBlur" type="function">
					<p>If set, it'll fire given function with standard information.</p>
					<DocsCode>
						<DocsCode.Example>
							<Button onBlur={(x) => console.log(x)}>Blur me!</Button>
						</DocsCode.Example>
						<DocsCode.Code>{'<Button onBlur={(x) => console.log(x)}>Blur me!</Button>'}</DocsCode.Code>
					</DocsCode>
					<p>First parameter of the fired function will be object with the following keys:</p>
					<ul>
						<li>
							<strong>name</strong> - string - provided if prop <code>name</code> is set, null otherwise
						</li>
						<li>
							<strong>element</strong> - HTMLElement - the HTML instance of Button
						</li>
					</ul>
					<p>
						Here's an example of attached <code>onFocus</code> and <code>onBlur</code> function to the button:
					</p>
					<DocsCode>
						<DocsCode.Example>
							<Button onFocus={(x) => console.log(x)} onBlur={(x) => console.log(x)}>
								Focus &amp; blur me!
							</Button>
						</DocsCode.Example>
						<DocsCode.Code>
							{'<Button onFocus={(x) => console.log(x)} onBlur={(x) => console.log(x)}>Focus &amp; blur me!</Button>'}
						</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="color" type="string" defaultValue="theme.button.defaults.color">
					<p>
						Sets the button's color. Use one of the color values defined in <code>theme.button.color</code>.
					</p>
					<AvailableKeys data={colors} />
				</Props.Prop>
				<Props.Prop name="variant" type="string" defaultValue="theme.button.defaults.variant">
					<p>
						Variant is ability to shape the button's look. Use one of the values from variants defined in{' '}
						<code>theme.button.variant</code>.
					</p>
					<AvailableKeys data={variants} />
				</Props.Prop>
				<Props.Prop name="width" type={['string', 'number']} defaultValue="theme.button.defaults.width">
					<p>If passed as number, it'll be used as pixels.</p>
					<p>
						If passed as string that contains information about native width, such as <code>10rem</code> or
						<code>10px</code>, then it'll be used as is.{' '}
					</p>
					<p>
						If you pass any value defined in <code>theme.button.width</code>, then it'll use value from defined widths.{' '}
					</p>
					<AvailableKeys data={widths} />
				</Props.Prop>
				<Props.Prop name="size" type="string" defaultValue="theme.button.defaults.size">
					<p>
						Sets the size of the button which should be defined in the theme. Use one of the defined sizes from{' '}
						<code>theme.button.size</code>.
					</p>
					<AvailableKeys data={sizes} />
				</Props.Prop>
				<Props.Prop name="style" />
				<Props.Prop name="m" />
				<Props.Prop name="mt" />
				<Props.Prop name="mr" />
				<Props.Prop name="mb" />
				<Props.Prop name="ml" />
				<Props.Prop name="as">
					<p>
						You can render Button with other HTML tag or component other than <code>&lt;button&gt;</code> tag.
					</p>
					<p>
						Here's an example of a Button rendered as <code>&lt;a&gt;</code> and <code>&lt;span&gt;</code> tags:
					</p>
					<Button as="a" href="/" title="I'm a link">
						Go to homepage
					</Button>
					<Button as="span" ml={10}>
						I'm span
					</Button>
				</Props.Prop>
				<Props.Prop name="ref" />
			</Props>
			<DocsText>In theory, there are few things you need about every button:</DocsText>
			<DocsText>
				<ul>
					<li>color</li>
					<li>size - usually three different sizes, sometimes more</li>
					<li>width - not to be confused with size</li>
					<li>variant - the button's shape</li>
				</ul>
			</DocsText>
			<DocsSubTitle hash="color">Color</DocsSubTitle>
			<DocsText>
				It's impossible to define button with just one color because there are various button's states which can use
				other color or similar tone of the same color. To simplify things, you can pass the color name as prop, but all
				state colors will be defined by the theme. You're not limited just to background, border and text color. You can
				define anything you want in theme, including states, such as <code>:disabled</code>, <code>:focus</code>,{' '}
				<code>:hover</code> and such.
			</DocsText>
			<DocsText>Available button colors are:</DocsText>
			{Object.keys(colors).map((color) => (
				<DocsCode key={color} label={color} labelWidth="auto">
					<DocsCode.Example>
						<Button color={color}>Submit</Button>
						<Button color={color} disabled ml={10}>
							Disabled
						</Button>
					</DocsCode.Example>
					<DocsCode.Code>
						{`
						<Button color="${color}">Submit</Button>
						<Button color="${color}" disabled ml={10}>Disabled</Button>
						`}
					</DocsCode.Code>
				</DocsCode>
			))}
			<DocsSubTitle hash="size">Size</DocsSubTitle>
			<DocsText>When talking about button's size, there are just two things you have to deal with:</DocsText>
			<DocsText>
				<ul>
					<li>font size</li>
					<li>padding</li>
				</ul>
			</DocsText>
			<DocsText>
				So, when defining size, that's all you should be defining in your theme. Be aware that variant CSS is applied
				after size so if you define size in variant, it'll override size defined here.
			</DocsText>
			<DocsText>Available button sizes are:</DocsText>
			{Object.keys(sizes).map((size) => (
				<DocsCode key={size} label={size} labelWidth="auto">
					<DocsCode.Example>
						{Object.keys(colors).map((color) => (
							<Button size={size} color={color} key={color} m="0.1rem">
								Submit
							</Button>
						))}
					</DocsCode.Example>
					<DocsCode.Code>
						{Object.keys(colors)
							.map((color) => `<Button size="${size}" color="${color}" m="0.1rem">Submit</Button>`)
							.join('\n')}
					</DocsCode.Code>
				</DocsCode>
			))}
			<DocsSubTitle hash="width">Width</DocsSubTitle>
			<DocsText>
				Size is not width, and vice versa. Width is just definition of how wide is the button and nothing else. By using
				width, it's possible to use any button size with different width.
			</DocsText>
			<DocsText>
				Width is a prop that's not necessarily defined in theme because you can pass any width any time. Here are few
				examples:
			</DocsText>

			{[30, 100, '120px', '100%'].map((w) => (
				<DocsCode key={w} label={w} labelWidth="auto">
					<DocsCode.Example>
						<Button width={w}>Submit</Button>
					</DocsCode.Example>
					<DocsCode.Code>
						{`<Button width=${typeof w === 'number' ? `{${w}}` : `"${w}"`}>Submit</Button>`}
					</DocsCode.Code>
				</DocsCode>
			))}

			<DocsText>
				You can pass any valid CSS value for width and it'll work. However, some designs require button widths to be
				consistent and in that case, you can define the list of widths and use them simply by passing their name to{' '}
				<code>width</code> prop.
			</DocsText>
			<DocsText>Available widths in theme are:</DocsText>
			{Object.keys(widths).map((w) => (
				<DocsCode key={w} label={w} labelWidth="auto">
					<DocsCode.Example>
						<Button width={w}>Submit</Button>
					</DocsCode.Example>
					<DocsCode.Code>{`<Button width="${w}">Submit</Button>`}</DocsCode.Code>
				</DocsCode>
			))}
			<DocsText>
				When setting width with CSS value, then it'll set the exact <code>width</code> to button. If you're using width
				definition from the theme, then it'll set the <code>min-width</code> to the button, allowing you to have more
				text in your button if needed, without cutting it.
			</DocsText>
			<DocsSubTitle hash="variant">Variant</DocsSubTitle>
			<DocsText>
				Variant is the button's shape. By using variants, you can completely redefine button's shape. Most common case
				is when you want to have standard square button or circle button. You're not limited to any predefined
				properties and you can define anything you want.
			</DocsText>
			<DocsText>Available variants in theme are:</DocsText>
			{Object.keys(variants).map((val) => (
				<DocsCode key={val} label={val} labelWidth="auto">
					<DocsCode.Example>
						<Button variant={val}>Submit</Button>
					</DocsCode.Example>
					<DocsCode.Code>{`<Button variant="${val}">Submit</Button>`}</DocsCode.Code>
				</DocsCode>
			))}
		</>
	);
};
