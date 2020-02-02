import React from 'react';

import Box from './Box';

import {Title, Props, ImportComponent} from '../../../docs/components';
import DocsSubTitle from '../../../docs/components/DocsSubTitle';
import DocsText from '../../../docs/components/DocsText';
import DocsCode from '../../../docs/components/DocsCode';

export const title = 'Box';
export const slug = 'box';
export const json = null;

export const Documentation = function() {
	return (
		<>
			<Title hash="box">Box</Title>
			<ImportComponent name="Box" />
			<DocsCode>
				<DocsCode.Example>
					<Box>I'm in the box</Box>
				</DocsCode.Example>
				<DocsCode.Code>{"<Box>I'm in the box</Box>"}</DocsCode.Code>
			</DocsCode>
			<DocsSubTitle hash="some-theory">Some theory</DocsSubTitle>
			<DocsText>
				<code>Box</code> component is wrapper for <code>div</code> element and its main purpose is to be used for positioning. Although it
				can be used like <code>&lt;Box as="p"/&gt;</code>, don't use it for content. So, any time when you want to create menu, some
				subelements, or place anything else, use this component.
			</DocsText>
			<Props>
				<Props.Prop name="children" type="node" />
				<Props.Prop name="onClick">
					<p>Fires function with object on first parameter with the following keys:</p>
					<ul>
						<li>
							<strong>element</strong> - HTMLElement
						</li>
					</ul>
					<DocsCode>
						<DocsCode.Example>
							<Box onClick={(x) => console.log(x)}>Hi! Click me</Box>
						</DocsCode.Example>
						<DocsCode.Code>{`<Box onClick={(x) => console.log(x)}>Hi! Click me</Box>`}</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="onDoubleClick">
					<p>Fires function with object on first parameter with the following keys:</p>
					<ul>
						<li>
							<strong>element</strong> - HTMLElement
						</li>
					</ul>
					<DocsCode>
						<DocsCode.Example>
							<Box onDoubleClick={(x) => console.log(x)}>Hi! Double click me</Box>
						</DocsCode.Example>
						<DocsCode.Code>{`<Box onDoubleClick={(x) => console.log(x)}>Hi! Double click me</Box>`}</DocsCode.Code>
					</DocsCode>
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
					<p>
						Defines the CSS's background value. You can pass any color value from the defined colors in theme in format{' '}
						<code>color|tone</code>, otherwise, it'll be used as is, which means that you're able to pass any other valid CSS color or the
						whole background definition.
					</p>
					<p>
						Be aware that if you defined, for example, color <code>red</code> in the theme and then you pass <code>red</code> as a
						background's prop value, then you'll get the color definition from the theme instead of #ff0000.
					</p>
				</Props.Prop>
				<Props.Prop name="textAlign" type="string" defaultValue="inherit">
					This is shorthand for aligning text within the box. Use one of <code>left</code>, <code>center</code>, <code>right</code>,{' '}
					<code>justify</code> or <code>inherit</code> values.
				</Props.Prop>
				<Props.Prop name="position" type="string" defaultValue="static">
					<p>
						Set the box's position. Use one of <code>static</code>, <code>absolute</code>, <code>fixed</code>, <code>relative</code>,{' '}
						<code>sticky</code>, <code>initial</code> or <code>inheirt</code> values.
					</p>
					<p>
						Please note: if <code>Box</code> has position of <code>absolute</code> or <code>fixed</code>, then:
					</p>
					<ul>
						<li>
							you may use props: <code>top</code>, <code>right</code>, <code>bottom</code> and <code>left</code>.
						</li>
						<li>
							<code>width</code> prop has NO default value
						</li>
						<li>
							<code>height</code> prop has NO default value
						</li>
					</ul>
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
					<p>
						Pass any valid CSS value for <code>top</code> property here.
					</p>
					<p>
						It won't work unless <code>position</code> prop is not set to <code>absolute</code> or <code>fixed</code>.
					</p>
				</Props.Prop>
				<Props.Prop name="right" type={['string', 'number']}>
					<p>
						Pass any valid CSS value for <code>right</code> property here.
					</p>
					<p>
						It won't work unless <code>position</code> prop is not set to <code>absolute</code> or <code>fixed</code>.
					</p>
				</Props.Prop>
				<Props.Prop name="bottom" type={['string', 'number']}>
					<p>
						Pass any valid CSS value for <code>bottom</code> property here.
					</p>
					<p>
						It won't work unless <code>position</code> prop is not set to <code>absolute</code> or <code>fixed</code>.
					</p>
				</Props.Prop>
				<Props.Prop name="left" type={['string', 'number']}>
					<p>
						Pass any valid CSS value for <code>left</code> property here.
					</p>
					<p>
						It won't work unless <code>position</code> prop is not set to <code>absolute</code> or <code>fixed</code>.
					</p>
				</Props.Prop>
				<Props.Prop name="style" />
				<Props.Prop name="as" />
				<Props.Prop name="ref" />
			</Props>
			<DocsSubTitle hash="color">Color</DocsSubTitle>
			<DocsText>
				The only color prop that <code>Box</code> accepts is <code>background</code>.
			</DocsText>
			<DocsCode>
				<DocsCode.Example>
					<Box background="aqua">This box has aqua background</Box>
				</DocsCode.Example>
				<DocsCode.Code>{'<Box background="aqua">This box has aqua background</Box>'}</DocsCode.Code>
			</DocsCode>
			<DocsCode>
				<DocsCode.Example>
					<Box background="primary">This box has primary background</Box>
				</DocsCode.Example>
				<DocsCode.Code>{'<Box background="primary">This box has primary background</Box>'}</DocsCode.Code>
			</DocsCode>
			<DocsCode>
				<DocsCode.Example>
					<Box background="primary|2">This box has dark primary background</Box>
				</DocsCode.Example>
				<DocsCode.Code>{'<Box background="primary|2">This box has dark primary background</Box>'}</DocsCode.Code>
			</DocsCode>
		</>
	);
};
