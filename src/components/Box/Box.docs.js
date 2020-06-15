import React from 'react';

import Box from './Box';

import Code from '../../../docs/components/Code';
import H1 from '../../../docs/components/H1';
import Paragraph from '../../../docs/components/Paragraph';
import Props from '../../../docs/components/Props';
import H2 from '../../../docs/components/H2';
import List from '../../../docs/components/List';

export const title = 'Box';
export const route = '/box';
export const json = null;

export default function BoxDocs() {
	return (
		<>
			<H1>Box</H1>
			<Code language="js" code="import {Box} from 'koldy-ui';" />
			<Code language="js" code="<Box>I'm in the box</Box>">
				<Box>I'm in the box</Box>
			</Code>
			<H2 hash="some-theory">Some theory</H2>
			<Paragraph>
				<code>Box</code> component is wrapper for <code>div</code> element and its main purpose is to be used for positioning. Although it
				can be used like <code>&lt;Box as="p"/&gt;</code>, don't use it for content. So, any time when you want to create menu, some
				subelements, or place anything else, use this component.
			</Paragraph>
			<Props>
				<Props.Prop name="children" type="node" />
				<Props.Prop name="onClick">
					<Paragraph>Fires function with object on first parameter with the following keys:</Paragraph>
					<List>
						<List.Item>
							<strong>element</strong> - HTMLElement
						</List.Item>
					</List>
					<Code language="js" code={`<Box onClick={(x) => console.log(x)}>Hi! Click me</Box>`}>
						<Box onClick={(x) => console.log(x)}>Hi! Click me</Box>
					</Code>
				</Props.Prop>
				<Props.Prop name="onDoubleClick">
					<Paragraph>Fires function with object on first parameter with the following keys:</Paragraph>
					<List>
						<List.Item>
							<strong>element</strong> - HTMLElement
						</List.Item>
					</List>
					<Code language="js" code={`<Box onDoubleClick={(x) => console.log(x)}>Hi! Double click me</Box>`}>
						<Box onDoubleClick={(x) => console.log(x)}>Hi! Double click me</Box>
					</Code>
				</Props.Prop>
				<Props.Prop name="width" type={['string', 'number']} defaultValue="100%">
					Defines the width. If passed as number, it'll be used as pixels, otherwise it'll be used as is.
				</Props.Prop>
				<Props.Prop name="height" type={['string', 'number']} defaultValue="auto">
					Defines the height. If passed as number, it'll be used as pixels, otherwise it'll be used as is.
				</Props.Prop>
				<Props.Prop name="maxWidth" type={['string', 'number']}>
					Defines the max-width. If passed as number, it'll be used as pixels, otherwise it'll be used as is.
				</Props.Prop>
				<Props.Prop name="minWidth" type={['string', 'number']}>
					Defines the min-width. If passed as number, it'll be used as pixels, otherwise it'll be used as is.
				</Props.Prop>
				<Props.Prop name="maxHeight" type={['string', 'number']}>
					Defines the max-height. If passed as number, it'll be used as pixels, otherwise it'll be used as is.
				</Props.Prop>
				<Props.Prop name="minHeight" type={['string', 'number']}>
					Defines the min-height. If passed as number, it'll be used as pixels, otherwise it'll be used as is.
				</Props.Prop>
				<Props.Prop name="background" type="string">
					<Paragraph>
						Defines the CSS's background value. You can pass any color value from the defined colors in theme in format{' '}
						<code>color|tone</code>, otherwise, it'll be used as is, which means that you're able to pass any other valid CSS color or the
						whole background definition.
					</Paragraph>
					<Paragraph>
						Be aware that if you defined, for example, color <code>red</code> in the theme and then you pass <code>red</code> as a
						background's prop value, then you'll get the color definition from the theme instead of #ff0000.
					</Paragraph>
				</Props.Prop>
				<Props.Prop name="textAlign" type="string" defaultValue="inherit">
					This is shorthand for aligning text within the box. Use one of <code>left</code>, <code>center</code>, <code>right</code>,{' '}
					<code>justify</code> or <code>inherit</code> values.
				</Props.Prop>
				<Props.Prop name="position" type="string" defaultValue="static">
					<Paragraph>
						Set the box's position. Use one of <code>static</code>, <code>absolute</code>, <code>fixed</code>, <code>relative</code>,{' '}
						<code>sticky</code>, <code>initial</code> or <code>inheirt</code> values.
					</Paragraph>
					<Paragraph>
						Please note: if <code>Box</code> has position of <code>absolute</code> or <code>fixed</code>, then:
					</Paragraph>
					<List>
						<List.Item>
							you may use props: <code>top</code>, <code>right</code>, <code>bottom</code> and <code>left</code>.
						</List.Item>
						<List.Item>
							<code>width</code> prop has NO default value
						</List.Item>
						<List.Item>
							<code>height</code> prop has NO default value
						</List.Item>
					</List>
				</Props.Prop>
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
				<Props.Prop name="top" type={['string', 'number']}>
					<Paragraph>
						Pass any valid CSS value for <code>top</code> property here.
					</Paragraph>
					<Paragraph>
						It won't work unless <code>position</code> prop is not set to <code>absolute</code> or <code>fixed</code>.
					</Paragraph>
				</Props.Prop>
				<Props.Prop name="right" type={['string', 'number']}>
					<Paragraph>
						Pass any valid CSS value for <code>right</code> property here.
					</Paragraph>
					<Paragraph>
						It won't work unless <code>position</code> prop is not set to <code>absolute</code> or <code>fixed</code>.
					</Paragraph>
				</Props.Prop>
				<Props.Prop name="bottom" type={['string', 'number']}>
					<Paragraph>
						Pass any valid CSS value for <code>bottom</code> property here.
					</Paragraph>
					<Paragraph>
						It won't work unless <code>position</code> prop is not set to <code>absolute</code> or <code>fixed</code>.
					</Paragraph>
				</Props.Prop>
				<Props.Prop name="left" type={['string', 'number']}>
					<Paragraph>
						Pass any valid CSS value for <code>left</code> property here.
					</Paragraph>
					<Paragraph>
						It won't work unless <code>position</code> prop is not set to <code>absolute</code> or <code>fixed</code>.
					</Paragraph>
				</Props.Prop>
				<Props.Prop name="style" />
				<Props.Prop name="as" />
				<Props.Prop name="ref" />
			</Props>
			<H2 hash="color">Color</H2>
			<Paragraph>
				The only color prop that <code>Box</code> accepts is <code>background</code>.
			</Paragraph>
			<Code language="js" code='<Box background="aqua">This box has aqua background</Box>'>
				<Box background="aqua">This box has aqua background</Box>
			</Code>
			<Code language="js" code='<Box background="primary">This box has primary background</Box>'>
				<Box background="primary">This box has primary background</Box>
			</Code>
			<Code language="js" code='<Box background="primary|2">This box has dark primary background</Box>'>
				<Box background="primary|2">This box has dark primary background</Box>
			</Code>
		</>
	);
}
