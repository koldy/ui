import React, {useContext} from 'react';

import Text from './Text';
import ThemeContext from '../../theme/ThemeContext';

import Props from '../../../docs/components/Props';
import AvailableKeys from '../../../docs/components/AvailableKeys';
import Code from '../../../docs/components/Code';
import Paragraph from '../../../docs/components/Paragraph';
import H2 from '../../../docs/components/H2';
import H1 from '../../../docs/components/H1';

export const title = 'Text';
export const route = '/text';
export const json = 'text';

// eslint-disable-next-line
const H1Example = function({children}) {
	return (
		<Text block as="h1" fontWeight="bold" fontSize="1.5rem">
			{children}
		</Text>
	);
};

export default function TextDocs() {
	const {theme} = useContext(ThemeContext);

	const variants = theme.json('text.variant');
	const colors = theme.json('color');

	return (
		<>
			<H1>Text</H1>
			<Code language="js" code="import {Text} from 'koldy-ui';" />
			<Code language="js" code="<Text>I'm text example</Text>">
				<Text>I'm text example</Text>
			</Code>
			<H2 hash="some-theory">Some theory</H2>
			<Paragraph>Use this component when you want to print text, both inline text and text block (which is meant for headings).</Paragraph>
			<Paragraph>
				This component renders as <code>span</code> tag by default.
			</Paragraph>
			<Paragraph>
				Koldy UI doesn't provide typography system so it's completely up to you to define, but this component can be used for defining your
				typography system. Like this:
			</Paragraph>
			<Code
				language="js"
				code={`
const H1 = function({children}) {
  return (
    <Text block as="h1" fontWeight="bold" fontSize="1.5rem">
      {children}
    </Text>
  );
};

<H1>The H1 title</H1>
					`}
			>
				<H1Example>The H1 title</H1Example>
			</Code>
			<Props>
				<Props.Prop name="children" type="node" />
				<Props.Prop name="block" type="bool" defaultValue={false}>
					<Paragraph>
						If set to true, it'll be rendered as block element (as CSS display block), otherwise, it's inline element by default.{' '}
					</Paragraph>
					<Code language="js" code="">
						<>
							<Text block>I'm a text in block component.</Text>
							<Text block>I'm 2nd text in block component.</Text>
						</>
						<>
							{`
							<Text block>I'm a text in block component.</Text>
							<Text block>I'm 2nd text in block component.</Text>
							`}
						</>
					</Code>
				</Props.Prop>
				<Props.Prop name="variant" type="string" defaultValue="theme.text.defaults.variant">
					<Paragraph>
						Variant is variation you want to use in your system. You're not limited to anything in the theme, so feel free to write any CSS
						you'd like, including colors and size definitions. You may have variant named <code>paragraph</code>
						which has everything predefined if you'd like.
					</Paragraph>
					<AvailableKeys data={variants} />
				</Props.Prop>
				<Props.Prop name="color" type="string">
					<Paragraph>
						Set any color you'd like from predefined colors in the theme. Color definitions are located in <code>theme.color</code>, not in
						theme.text.color.
					</Paragraph>
					<Paragraph>
						It is possible to provide color like <code>primary|2</code> for this prop.
					</Paragraph>
					<AvailableKeys data={colors} />
					<Paragraph>
						If you set value that's not defined in a theme, the value you set here will be used as is. This gives you opportunity to set
						custom color "on the fly".{' '}
					</Paragraph>
					<Code language="js" code={'<Text color="rgba(255, 0, 0, 0.5)">I\'m semi-red and I\'m not defined in theme.</Text>'}>
						<Text color="rgba(255, 0, 0, 0.5)">I'm semi-red and I'm not defined in theme.</Text>
					</Code>
				</Props.Prop>
				<Props.Prop name="onClick">
					<Paragraph>
						If <code>onClick</code> is set, cursor is automatically set to <code>pointer</code>.{' '}
					</Paragraph>
					<Code language="js" code="<Text onClick={() => alert('Click!')}>I'm clickable text.</Text>">
						<Text onClick={() => alert('Click!')}>I'm clickable text.</Text>
					</Code>
				</Props.Prop>
				<Props.Prop name="onDoubleClick">
					<Paragraph>
						If <code>onDoubleClick</code> is set, cursor is automatically set to <code>pointer</code>.{' '}
					</Paragraph>
					<Code language="js" code="<Text onDoubleClick={() => alert('Double clicked!')}>I'm (double)clickable text.</Text>">
						<Text onDoubleClick={() => alert('Double clicked!')}>I'm (double)clickable text.</Text>
					</Code>
				</Props.Prop>
				<Props.Prop name="fontFamily" type="string" defaultValue="inherit">
					<Paragraph>
						To set the font, use any valid <code>font-family</code> CSS value and pass it here.{' '}
					</Paragraph>
					<Paragraph>
						When set, it'll override any other <code>font-family</code> definition.{' '}
					</Paragraph>
					<Code language="js" code={'<Text fontFamily="\'Times New Roman\', sans-serif">I have Times New Roman font.</Text>'}>
						<Text fontFamily="'Times New Roman', sans-serif">I have Times New Roman</Text>
					</Code>
				</Props.Prop>
				<Props.Prop name="fontSize" type="string" defaultValue="inherit">
					<Paragraph>
						To set the font size, use any valid <code>font-size</code> CSS value and pass it here.{' '}
					</Paragraph>
					<Paragraph>
						When set, it'll override any other <code>font-size</code> definition.{' '}
					</Paragraph>
					<Code language="js" code={'<Text fontSize="2rem">I 2rem big!</Text>'}>
						<Text fontSize="2rem">I'm 2rem big!</Text>
					</Code>
				</Props.Prop>
				<Props.Prop name="fontWeight" type="string" defaultValue="inherit">
					<Paragraph>
						To set the font weight, use any valid <code>font-weight</code> CSS value and pass it here.{' '}
					</Paragraph>
					<Paragraph>
						When set, it'll override any other <code>font-weight</code> definition.{' '}
					</Paragraph>
					<Code language="js" code="<Text fontWeight={700}>I'm 700 bold</Text>">
						<Text fontWeight={700}>I'm 700 bold</Text>
					</Code>
				</Props.Prop>
				<Props.Prop name="lineHeight" type={['string', 'number']} defaultValue="inherit">
					<Paragraph>
						To set the line height, use any valid <code>line-height</code> CSS value and pass it here.{' '}
					</Paragraph>
					<Paragraph>
						When set, it'll override any other <code>line-height</code> definition.{' '}
					</Paragraph>
					<Code
						language="js"
						code={`
<Text lineHeight="{2}">
  I have line
  <br />
  height of 2
</Text>
							`}
					>
						<Text lineHeight={2}>
							I have line
							<br />
							height of 2
						</Text>
					</Code>
				</Props.Prop>
				<Props.Prop name="style" />
				<Props.Prop name="m" />
				<Props.Prop name="mt" />
				<Props.Prop name="mr" />
				<Props.Prop name="mb" />
				<Props.Prop name="ml" />
				<Props.Prop name="p" />
				<Props.Prop name="pt" />
				<Props.Prop name="pr" />
				<Props.Prop name="pb" />
				<Props.Prop name="pl" />
				<Props.Prop name="as" />
				<Props.Prop name="ref" />
			</Props>
			<H2 hash="color">Color</H2>
			<Paragraph>Here are examples of using colors from the theme as text color:</Paragraph>
			{Object.keys(colors).map((color) => (
				<Code language="js" code={`<Text color="${color}">I'm using color "${color}" from theme.</Text>`} key={color}>
					<Text color={color}>I'm using color "{color}" from theme.</Text>
				</Code>
			))}
			<Code language="js" code={`<Text color="#ff0000">I'm pure red and I'm not from the theme!</Text>`}>
				<Text color="#ff0000">I'm pure red and I'm not from the theme!</Text>
			</Code>
			<AvailableKeys data={colors} name="theme.color" />
			<H2 hash="variant">Variant</H2>
			<Paragraph>
				Variant is the shape of the <code>Text</code> component and it should include all the possible styling. You may include colors and
				size, but those styles will be overridden if provided through other props.
			</Paragraph>
			<AvailableKeys data={variants} name="theme.text.variant" />
			{Object.keys(variants).map((variant) => (
				<Code language="js" code={`<Text variant="${variant}">I'm using color "${variant}" from theme.</Text>`} key={variant}>
					<Text variant={variant}>I'm using variant "{variant}" from theme.</Text>
				</Code>
			))}
			<H2 hash="other-examples">Other examples</H2>
			<Paragraph>
				One of the common examples for using the Text is usage with anchor (<code>&lt;a&gt;</code>).
			</Paragraph>
			<Code language="js" code={'<Text as="a" href="https://koldy.io" target="_blank" rel="noopener noreferrer">I\'m external link</Text>'}>
				<Text as="a" href="https://koldy.io" target="_blank" rel="noopener noreferrer">
					I'm external link
				</Text>
			</Code>
		</>
	);
}
