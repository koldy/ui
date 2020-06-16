import React, {useContext, useState, useCallback} from 'react';

import Toast from './Toast';
import ThemeContext from '../../theme/ThemeContext';

import Button from '../Button/Button';
import Box from '../Box/Box';
import Flexbox from '../Flexbox/Flexbox';
import Text from '../Text/Text';
import Radio from '../Radio/Radio';
import Props from '../../../docs/components/Props';
import AvailableKeys from '../../../docs/components/AvailableKeys';
import H1 from '../../../docs/components/H1';
import Code from '../../../docs/components/Code';
import Paragraph from '../../../docs/components/Paragraph';
import H2 from '../../../docs/components/H2';
import List from '../../../docs/components/List';

export const title = 'Toast';
export const route = '/toast';
export const json = 'toast';

const positions = ['top-left', 'top-center', 'top-right', 'top-stretch', 'bottom-left', 'bottom-center', 'bottom-right', 'bottom-stretch'];

const animations = [
	'fade-in',
	'rotate-in-center',
	'rotate-vertical-center',
	'rotate-scale-up-vertical',
	'flip-in-horizontal-bottom',
	'slit-in-horizontal',
	'slide-in-bck-center',
	'swing-in-top-fwd',
	'puff-in-center'
];

export default function ToastDocs() {
	const {theme, addToast} = useContext(ThemeContext);

	const colors = theme.json('color');
	const buttonColors = theme.json('button.color');

	const colorKeys = Object.keys(colors);
	const buttonKeys = Object.keys(buttonColors);

	const secondColor = colorKeys.length > 1 ? colorKeys[1] : colorKeys[0];
	const secondButtonColor = buttonKeys.length > 1 ? buttonKeys[1] : buttonKeys[0];

	const [position, setPosition] = useState('top-right');
	const [animation, setAnimation] = useState('rotate-in-center');

	const showAdvancedExample = useCallback(() => {
		addToast(
			({closeFn}) => (
				<Box mt="1rem" mb="1rem" p="1rem" background={secondColor}>
					<Text fontSize="1.2rem" fontWeight={700} color="white">
						I'm title
					</Text>
					<Box mt="0.5rem">
						<Text color="white">And I'm the content.</Text>
					</Box>
					<Box textAlign="center" mt="0.5rem">
						<Button onClick={closeFn} color={secondButtonColor}>
							Close me
						</Button>
					</Box>
				</Box>
			),
			{entryAnimation: 'slit-in-horizontal'}
		);
	}, [secondColor, secondButtonColor]);

	return (
		<>
			<H1>Toast</H1>
			<Code language="js" code="import {Toast} from 'koldy-ui';" />
			<H2 hash="main-example">Example</H2>
			<Flexbox>
				<Flexbox.Item flex={1}>
					<Paragraph>Position</Paragraph>
					<Radio value={position} onChange={({value}) => setPosition(value)}>
						{positions.map((pos) => (
							<Box as="label" key={pos}>
								<Radio.Option value={pos} /> {pos}
							</Box>
						))}
					</Radio>
				</Flexbox.Item>
				<Flexbox.Item flex={1}>
					<Paragraph>Animation</Paragraph>
					<Radio value={animation} onChange={({value}) => setAnimation(value)}>
						{animations.map((ani) => (
							<Box as="label" key={ani}>
								<Radio.Option value={ani} /> {ani}
							</Box>
						))}
					</Radio>
				</Flexbox.Item>
			</Flexbox>

			<Code
				language="js"
				code={`
<Toast position="${position}" entryAnimation="${animation}">
  {() => (
    <Box background="primary" p="1rem">
      <Text color="white">I'm content in toast!</Text>
    </Box>
  )}
</Toast>
        `}
			/>
			<Toast position={position} entryAnimation={animation}>
				{() => (
					<Box background="primary" p="1rem">
						<Text color="white">I'm content in toast!</Text>
					</Box>
				)}
			</Toast>
			<Paragraph>
				Name <code>Toast</code> is usually used for notifications shown on web page's corner or top/bottom location. This component, like
				others, is dumb and knows nothing but to position and animate given component. You are in complete control of what to show in the{' '}
				<code>Toast</code>. Unlike other UI component frameworks and libraries where you have to define color, icon(s) and such stuff, Koldy
				UI won't nag you with that stuff.
			</Paragraph>
			<Paragraph>
				To render <code>Toast</code>, there's two ways of doing it:
			</Paragraph>
			<List>
				<List.Item>
					React way - by rendering <code>&lt;Toast&gt;</code> - see the example above - that's why example can't be removed from the screen
					because it has to be unmounted manually
				</List.Item>
				<List.Item>
					by using helper function which doesn't require you to render <code>&lt;Toast&gt;</code> in JSX every time you need it - for
					example, that's useful for success/failure notifications in Ajax requests
				</List.Item>
			</List>
			<H2 hash="using-helper-function">Rendering using helper function</H2>
			<Paragraph>
				Koldy UI exposes some useful stuff through <code>ThemeContext</code> and one of the useful stuff are the following functions:
			</Paragraph>
			<List>
				<List.Item>
					<strong>addToast</strong> - returns unique ID for the created Toast
				</List.Item>
				<List.Item>
					<strong>removeToast</strong> - requires unique ID as first parameter
				</List.Item>
				<List.Item>
					<strong>removeAllToasts</strong>
				</List.Item>
			</List>
			<Paragraph>API looks like this:</Paragraph>
			<Code language="js" code={`addToast(() => <jsx />, {...options});`} />
			<Code
				language="js"
				code={`
import React, {useCallback} from 'react';
import {ThemeContext} from 'koldy-ui';

const Component = function (props) {
  const {addToast, removeToast, removeAllToasts} = useContext(ThemeContext);
  
  const doAddToast = useCallback(() => {
    addToast(() => (
      <Box background="primary" p="1rem">
        <Text color="white">I'm content in toast!</Text>
      </Box>
    ), {duration: 5000, entryAnimation: 'slit-in-horizontal'});
  });
  
  return (
    <Button onClick={doAddToast}>Click me</Button>
  );
};
					`}
			>
				<Button
					onClick={() =>
						addToast(
							() => (
								<Box background="primary" p="1rem">
									<Text color="white">I'm content in toast!</Text>
								</Box>
							),
							{duration: 5000, entryAnimation: 'slit-in-horizontal'}
						)
					}
				>
					Click me
				</Button>
			</Code>
			<Paragraph>This example will show the Toast on its default position and it'll disappear after 5 seconds.</Paragraph>
			<H2 hash="available-options-when-using-add-toast">Available options when using addToast()</H2>
			<List>
				<List.Item>
					<strong>duration</strong> - in milliseconds - if set, Toast will be automatically destroyed after given time
				</List.Item>
				<List.Item>
					<strong>position</strong> - one of position options, see the props
				</List.Item>
				<List.Item>
					<strong>entryAnimation</strong> - one of entry animations, see the props
				</List.Item>
			</List>
			<Props>
				<Props.Prop name="children" type={['function', 'node']} required>
					<Paragraph>
						Every Toast must have the content which is function or node. If children prop is a function, then the function will get an
						object for first parameter which has:
					</Paragraph>
					<List>
						<List.Item>
							<strong>closeFn</strong> - function you can call from inside the Toast in order to close it; this function is always present
							when you're using <code>addToast()</code>, but if you render <code>&lt;Toast&gt;</code> yourself and don't provide{' '}
							<code>onClose</code> prop, then <code>closeFn</code> might be <code>null</code>.
						</List.Item>
					</List>
					<Code
						language="js"
						code={`
<Toast>
  {({closeFn}) => <div>I'm content <button onClick={closeFn}>X</button></div>}
</Toast>
            `}
					/>
				</Props.Prop>
				<Props.Prop name="position" type="string" defaultValue="top-right">
					<Paragraph>Position on the screen where Toast will be rendered.</Paragraph>
					<AvailableKeys data={positions} />
				</Props.Prop>
				<Props.Prop name="entryAnimation" type="string">
					<Paragraph>Ability to choose entry animation. By default, toast will be rendered without any animation.</Paragraph>
					<AvailableKeys data={animations} />
				</Props.Prop>
				<Props.Prop name="onClose" type="function">
					<Paragraph>
						You may set the <code>onClose</code> function which should be used as callback when <code>Toast</code> should be unmounted.
					</Paragraph>
				</Props.Prop>
			</Props>
			<H2 hash="one-more-example">One more example</H2>
			<Paragraph>
				In this example, Toast will be added with <code>addToast()</code> function and it'll stay on the screen until user manually clicks
				on <i>Close me</i> button inside the Toast. Toast rendered inside has defined margins so the Toasts will be visually separated.
			</Paragraph>
			<Code
				language="js"
				code={`
const showAdvancedExample = useCallback(
  () =>
    addToast(
      ({closeFn}) => (
        <Box mt="1rem" mb="1rem" p="1rem" background="${secondColor}">
          <Text fontSize="1.2rem" fontWeight={700} color="white">
            I'm title
          </Text>
          <Box mt="0.5rem">
            <Text color="white">And I'm the content.</Text>
          </Box>
          <Box textAlign="center" mt="0.5rem">
            <Button onClick={closeFn} color="${secondButtonColor}">
              Close me
            </Button>
          </Box>
        </Box>
      ),
      {entryAnimation: 'slit-in-horizontal'}
    ),
  []
);

<Button onClick={showAdvancedExample}>Show me more advanced example</Button>
					`}
			>
				<Button onClick={showAdvancedExample}>Show me more advanced example</Button>
			</Code>
		</>
	);
}
