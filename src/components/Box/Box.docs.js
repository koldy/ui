import React, {useReducer} from 'react';
import {css, keyframes} from 'styled-components';

import Box from './Box';
import {fadeInAnimation, fadeOutAnimation} from '../../animations/fade';
import {rotateInCenterAnimation, rotateOutCenterAnimation} from '../../animations/rotateCenter';
import {slideInTopAnimation, slideOutTopAnimation} from '../../animations/slideTop';
import {slitInHorizontalAnimation, slitOutHorizontalAnimation} from '../../animations/slitHorizontal';

import Code from '../../../docs/components/Code';
import H1 from '../../../docs/components/H1';
import Paragraph from '../../../docs/components/Paragraph';
import Props from '../../../docs/components/Props';
import H2 from '../../../docs/components/H2';
import List from '../../../docs/components/List';
import Button from '../Button/Button';

const fadeInKeyframes = keyframes`
0% {
  opacity: 0;
}

100% {
  opacity: 1;
}
`;

const animation = css`
	${fadeInKeyframes} ease-in-out 2000ms
`;

export const title = 'Box';
export const route = '/box';
export const json = null;

const init = {
	importedAnimation: 'fadeInAnimation',
	anim: fadeInAnimation(),
};

const reducer = function (state, action) {
	switch (action.type) {
		case 'fadeInAnimation':
			return {
				...state,
				importedAnimation: 'fadeInAnimation',
				anim: fadeInAnimation(),
			};

		case 'fadeOutAnimation':
			return {
				...state,
				importedAnimation: 'fadeOutAnimation',
				anim: fadeOutAnimation(),
			};

		case 'rotateInCenterAnimation':
			return {
				...state,
				importedAnimation: 'rotateInCenterAnimation',
				anim: rotateInCenterAnimation(),
			};

		case 'rotateOutCenterAnimation':
			return {
				...state,
				importedAnimation: 'rotateOutCenterAnimation',
				anim: rotateOutCenterAnimation(),
			};

		case 'slideInTopAnimation':
			return {
				...state,
				importedAnimation: 'slideInTopAnimation',
				anim: slideInTopAnimation(),
			};

		case 'slideOutTopAnimation':
			return {
				...state,
				importedAnimation: 'slideOutTopAnimation',
				anim: slideOutTopAnimation(),
			};

		case 'slitInHorizontalAnimation':
			return {
				...state,
				importedAnimation: 'slitInHorizontalAnimation',
				anim: slitInHorizontalAnimation(),
			};

		case 'slitOutHorizontalAnimation':
			return {
				...state,
				importedAnimation: 'slitOutHorizontalAnimation',
				anim: slitOutHorizontalAnimation(),
			};

		default:
			return state;
	}
};

export default function BoxDocs() {
	const [{anim, importedAnimation}, dispatch] = useReducer(reducer, init);

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
				<Props.Prop name="animation" type="array">
					<Paragraph>
						<code>Box</code> component can be used to animate its children on any way you want.
					</Paragraph>
					<Paragraph>
						To animate, pass the result of styled-component <code>css</code> function with keyframes definition.
					</Paragraph>
					<Paragraph>
						Read more in <a href="#animation">animation</a> section.
					</Paragraph>
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
			<H2 hash="animation">Animation</H2>
			<Paragraph>
				<code>Box</code> component can be used to animate its content. To start the animation, pass the result of styled-component's{' '}
				<code>css</code> function as <code>animation</code> prop:
			</Paragraph>
			<Code
				language="js"
				code={`
import {css, keyframes} from 'styled-components';
const fadeInKeyframes = keyframes\`
0% {opacity: 0;}
100% {opacity: 1;}
\`;

const animation = css\`
  \${fadeInKeyframes} ease-in-out 2000ms
\`;

<Box animation={animation}>Hey, I'm animated!</Box>
				`}
			>
				<Box animation={animation}>Hey, I'm animated!</Box>
			</Code>
			<Paragraph>
				<code>Koldy UI</code> comes with many predefined CSS animations you can use for your components thanks to{' '}
				<a href="https://animista.net" target="_blank">
					Animista
				</a>
				. Check next example so you can get better understanding how it works.
			</Paragraph>
			<Code
				language="js"
				code={`
import {Box, ${importedAnimation}} from 'koldy-ui';

export default () => (
  <Box animation={${importedAnimation}()} width="fit-content">
    Hey, I'm the content in Box!
  </Box>
);
`}
			>
				<Box animation={anim} width="fit-content">
					Hey, I'm the content in Box!
				</Box>
			</Code>
			<Box>
				<Button onClick={() => dispatch({type: 'fadeInAnimation'})}>Fade In</Button>
				<Button onClick={() => dispatch({type: 'fadeOutAnimation'})}>Fade Out</Button>
				<Button onClick={() => dispatch({type: 'rotateInCenterAnimation'})}>Rotate In</Button>
				<Button onClick={() => dispatch({type: 'rotateOutCenterAnimation'})}>Rotate Out</Button>
				<Button onClick={() => dispatch({type: 'slideInTopAnimation'})}>Slide Top In</Button>
				<Button onClick={() => dispatch({type: 'slideOutTopAnimation'})}>Slide Top Out</Button>
				<Button onClick={() => dispatch({type: 'slitInHorizontalAnimation'})}>Slit In</Button>
				<Button onClick={() => dispatch({type: 'slitOutHorizontalAnimation'})}>Slit Out</Button>
			</Box>
		</>
	);
}
