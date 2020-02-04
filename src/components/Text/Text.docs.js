import React, {useContext} from 'react';
import DocsTitle from '../../../docs/components/DocsTitle';

import Text from './Text';
import ThemeContext from '../../theme/ThemeContext';

import Props from '../../../docs/components/Props';
import DocsSubTitle from '../../../docs/components/DocsSubTitle';
import DocsText from '../../../docs/components/DocsText';
import ImportComponent from '../../../docs/components/ImportComponent';
import DocsCode from '../../../docs/components/DocsCode';
import AvailableKeys from '../../../docs/components/AvailableKeys';

export const title = 'Text';
export const slug = 'text';
export const json = 'text';

// eslint-disable-next-line
const H1 = function({children}) {
	return (
		<Text block as="h1" fontWeight="bold" fontSize="1.5rem">
			{children}
		</Text>
	);
};

export const Documentation = function() {
	const {theme} = useContext(ThemeContext);

	const variants = theme.json('text.variant');
	const colors = theme.json('color');

	return (
		<>
			<DocsTitle hash="text">Text</DocsTitle>
			<ImportComponent name="Text" />
			<DocsCode>
				<DocsCode.Example>
					<Text>I'm text example</Text>
				</DocsCode.Example>
				<DocsCode.Code>{"<Text>I'm text example</Text>"}</DocsCode.Code>
			</DocsCode>
			<DocsSubTitle hash="some-theory">Some theory</DocsSubTitle>
			<DocsText>Use this component when you want to print text, both inline text and text block (which is meant for headings).</DocsText>
			<DocsText>
				This component renders as <code>span</code> tag by default.
			</DocsText>
			<DocsText>
				Koldy UI doesn't provide typography system so it's completely up to you to define, but this component can be used for defining your
				typography system. Like this:
			</DocsText>
			<DocsCode>
				<DocsCode.Example>
					<H1>The H1 title</H1>
				</DocsCode.Example>
				<DocsCode.Code>
					{`
					const H1 = function({children}) {
						return (
							<Text block as="h1" fontWeight="bold" fontSize="1.5rem">
								{children}
							</Text>
						);
					};
					
					<H1>The H1 title</H1>
					`}
				</DocsCode.Code>
			</DocsCode>
			<Props>
				<Props.Prop name="children" type="node" />
				<Props.Prop name="block" type="bool" defaultValue={false}>
					<p>If set to true, it'll be rendered as block element (as CSS display block), otherwise, it's inline element by default. </p>
					<DocsCode>
						<DocsCode.Example>
							<Text block>I'm a text in block component.</Text>
							<Text block>I'm 2nd text in block component.</Text>
						</DocsCode.Example>
						<DocsCode.Code>
							{`
							<Text block>I'm a text in block component.</Text>
							<Text block>I'm 2nd text in block component.</Text>
							`}
						</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="variant" type="string" defaultValue="theme.text.defaults.variant">
					<p>
						Variant is variation you want to use in your system. You're not limited to anything in the theme, so feel free to write any CSS
						you'd like, including colors and size definitions. You may have variant named <code>paragraph</code>
						which has everything predefined if you'd like.
					</p>
					<AvailableKeys data={variants} />
				</Props.Prop>
				<Props.Prop name="color" type="string">
					<p>
						Set any color you'd like from predefined colors in the theme. Color definitions are located in <code>theme.color</code>, not in
						theme.text.color.
					</p>
					<p>
						It is possible to provide color like <code>primary|2</code> for this prop.
					</p>
					<AvailableKeys data={colors} />
					<p>
						If you set value that's not defined in a theme, the value you set here will be used as is. This gives you opportunity to set
						custom color "on the fly".{' '}
					</p>
					<DocsCode>
						<DocsCode.Example>
							<Text color="rgba(255, 0, 0, 0.5)">I'm semi-red and I'm not defined in theme.</Text>
						</DocsCode.Example>
						<DocsCode.Code>{'<Text color="rgba(255, 0, 0, 0.5)">I\'m semi-red and I\'m not defined in theme.</Text>'}</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="onClick">
					<p>
						If <code>onClick</code> is set, cursor is automatically set to <code>pointer</code>.{' '}
					</p>
					<DocsCode>
						<DocsCode.Example>
							<Text onClick={() => alert('Click!')}>I'm clickable text.</Text>
						</DocsCode.Example>
						<DocsCode.Code>{"<Text onClick={() => alert('Click!')}>I'm clickable text.</Text>"}</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="onDoubleClick">
					<p>
						If <code>onDoubleClick</code> is set, cursor is automatically set to <code>pointer</code>.{' '}
					</p>
					<DocsCode>
						<DocsCode.Example>
							<Text onDoubleClick={() => alert('Double clicked!')}>I'm (double)clickable text.</Text>
						</DocsCode.Example>
						<DocsCode.Code>{"<Text onDoubleClick={() => alert('Double clicked!')}>I'm (double)clickable text.</Text>"}</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="fontFamily" type="string" defaultValue="inherit">
					<p>
						To set the font, use any valid <code>font-family</code> CSS value and pass it here.{' '}
					</p>
					<p>
						When set, it'll override any other <code>font-family</code> definition.{' '}
					</p>
					<DocsCode>
						<DocsCode.Example>
							<Text fontFamily="'Times New Roman', sans-serif">I have Times New Roman</Text>
						</DocsCode.Example>
						<DocsCode.Code>{'<Text fontFamily="\'Times New Roman\', sans-serif">I have Times New Roman font.</Text>'}</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="fontSize" type="string" defaultValue="inherit">
					<p>
						To set the font size, use any valid <code>font-size</code> CSS value and pass it here.{' '}
					</p>
					<p>
						When set, it'll override any other <code>font-size</code> definition.{' '}
					</p>
					<DocsCode>
						<DocsCode.Example>
							<Text fontSize="2rem">I'm 2rem big!</Text>
						</DocsCode.Example>
						<DocsCode.Code>{'<Text fontSize="2rem">I 2rem big!</Text>'}</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="fontWeight" type="string" defaultValue="inherit">
					<p>
						To set the font weight, use any valid <code>font-weight</code> CSS value and pass it here.{' '}
					</p>
					<p>
						When set, it'll override any other <code>font-weight</code> definition.{' '}
					</p>
					<DocsCode>
						<DocsCode.Example>
							<Text fontWeight={700}>I'm 700 bold</Text>
						</DocsCode.Example>
						<DocsCode.Code>{"<Text fontWeight={700}>I'm 700 bold</Text>"}</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="lineHeight" type={['string', 'number']} defaultValue="inherit">
					<p>
						To set the line height, use any valid <code>line-height</code> CSS value and pass it here.{' '}
					</p>
					<p>
						When set, it'll override any other <code>line-height</code> definition.{' '}
					</p>
					<DocsCode>
						<DocsCode.Example>
							<Text lineHeight={2}>
								I have line
								<br />
								height of 2
							</Text>
						</DocsCode.Example>
						<DocsCode.Code>
							{`
							<Text lineHeight="{2}">
								I have line
								<br />
								height of 2
							</Text>
							`}
						</DocsCode.Code>
					</DocsCode>
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
			<DocsSubTitle hash="color">Color</DocsSubTitle>
			<DocsText>Here are examples of using colors from the theme as text color:</DocsText>
			{Object.keys(colors).map((color) => (
				<DocsCode key={color}>
					<DocsCode.Example>
						<Text color={color}>I'm using color "{color}" from theme.</Text>
					</DocsCode.Example>
					<DocsCode.Code>{`<Text color="${color}">I'm using color "${color}" from theme.</Text>`}</DocsCode.Code>
				</DocsCode>
			))}
			<DocsCode>
				<DocsCode.Example>
					<Text color="#ff0000">I'm pure red and I'm not from the theme!</Text>
				</DocsCode.Example>
				<DocsCode.Code>{`<Text color="#ff0000">I'm pure red and I'm not from the theme!</Text>`}</DocsCode.Code>
			</DocsCode>
			<DocsText>
				<AvailableKeys data={colors} name="theme.color" />
			</DocsText>
			<DocsSubTitle hash="variant">Variant</DocsSubTitle>
			<DocsText>
				Variant is the shape of the <code>Text</code> component and it should include all the possible styling. You may include colors and
				size, but those styles will be overridden if provided through other props.
			</DocsText>
			<DocsText>
				<AvailableKeys data={variants} name="theme.text.variant" />
			</DocsText>
			{Object.keys(variants).map((variant) => (
				<DocsCode key={variant}>
					<DocsCode.Example>
						<Text variant={variant}>I'm using variant "{variant}" from theme.</Text>
					</DocsCode.Example>
					<DocsCode.Code>{`<Text variant="${variant}">I'm using color "${variant}" from theme.</Text>`}</DocsCode.Code>
				</DocsCode>
			))}
			<DocsSubTitle hash="other-examples">Other examples</DocsSubTitle>
			<DocsText>
				One of the common examples for using the Text is usage with anchor (<code>&lt;a&gt;</code>).
			</DocsText>
			<DocsCode>
				<DocsCode.Example>
					<Text as="a" href="https://koldy.io" target="_blank" rel="noopener noreferrer">
						I'm external link
					</Text>
				</DocsCode.Example>
				<DocsCode.Code>
					{'<Text as="a" href="https://koldy.io" target="_blank" rel="noopener noreferrer">I\'m external link</Text>'}
				</DocsCode.Code>
			</DocsCode>
		</>
	);
};
