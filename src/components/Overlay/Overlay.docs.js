import React, {useCallback, useContext, useState} from 'react';

import Overlay from './Overlay';
import ThemeContext from '../../theme/ThemeContext';

import Button from '../Button/Button';
import Text from '../Text/Text';
import Box from '../Box/Box';
import {preventDefaultAndStopPropagation} from '../../util/helpers';
import H1 from '../../../docs/components/H1';
import Code from '../../../docs/components/Code';
import Paragraph from '../../../docs/components/Paragraph';
import H2 from '../../../docs/components/H2';
import Props from '../../../docs/components/Props';
import List from '../../../docs/components/List';

export const title = 'Overlay';
export const route = '/overlay';
export const json = 'overlay';

export default function OverlayDocs() {
	const {theme, addToast} = useContext(ThemeContext);

	const [mainExample, setMainExample] = useState(false);
	const [example1, setExample1] = useState(false);
	const [example2, setExample2] = useState(false);

	const handleAddToast = useCallback(() => {
		addToast(
			() => (
				<Box mt="1rem" mb="1rem" p="1rem" background="primary">
					<Text fontSize="1.2rem" fontWeight={700} color="white">
						I'm title
					</Text>
					<Box mt="0.5rem">
						<Text color="white">And I'm the content. I'll be closed automatically</Text>
					</Box>
				</Box>
			),
			{entryAnimation: 'slit-in-horizontal', duration: 5000}
		);
	}, []);

	return (
		<>
			<H1>Overlay</H1>
			<Code language="js" code="import {Overlay} from 'koldy-ui';" />
			<Paragraph>
				Overlay is a div useful for creating customized modals, alerts or confirmation alerts. It's usually in some semi-transparent color,
				but it can be completely transparent. Koldy UI provides complete functionality over overlay's animations, zIndexes, background color
				and etc.
			</Paragraph>
			<Paragraph>
				Koldy UI DOES NOT provide modals, alert and similar components because there can be so many variations and there's no logical reason
				why would you be forced to use our way. Instead, use the <code>Overlay</code> component as a powerful tool to quickly create your
				own modals, alert and any other component that needs to be in "overlay".
			</Paragraph>
			<Paragraph>Here's basic example that opens overlay with 500ms animation and semi-transparent background:</Paragraph>
			<Code
				language="js"
				code={`
const [mainExample, setMainExample] = useState(false);

return (
  {mainExample && (
    <Overlay
      onClose={() => setMainExample(false)}
      animationDuration="500ms"
      backgroundColor="rgba(65,120,198,0.8)"
    >
      {() => (
        <Text color="yellow" m="2rem">
          I am content in overlay. Use ESC or click outside to close me.
        </Text>
      )}
    </Overlay>
  )}

  <Button onClick={() => setMainExample(true)}>Show Overlay example</Button>
);
					`}
			>
				{mainExample && (
					<Overlay onClose={() => setMainExample(false)} animationDuration="500ms" backgroundColor="rgba(65,120,198,0.8)">
						{() => (
							<Text color="yellow" m="2rem">
								I am content in overlay. Use ESC or click outside to close me.
							</Text>
						)}
					</Overlay>
				)}

				<Button onClick={() => setMainExample(true)}>Show Overlay example</Button>
			</Code>
			<H2 hash="some-theory">Some theory</H2>
			<Paragraph>Overlay is simple div that:</Paragraph>
			<List>
				<List.Item>covers the whole viewport (100% width and 100% height)</List.Item>
				<List.Item>
					renders as the last element under <code>&lt;body&gt;</code> tag
				</List.Item>
				<List.Item>has high and calculated z-index</List.Item>
				<List.Item>blocks body scrolling on first appearance</List.Item>
			</List>
			<Props>
				<Props.Prop name="children" type={['function', 'node']} required>
					Use the function as opportunity to get some of the Overlay's properties useful for creating UI on top of overlay. This function
					gets object for parameter which contains:
					<ul>
						<List.Item>
							<strong>closeFn</strong> - function that should be used for triggering the overlay close action (useful if you want to have
							your own close button)
						</List.Item>
					</ul>
				</Props.Prop>
				<Props.Prop name="backgroundColor" type="string" defaultValue="theme.overlay.defaults.backgroundColor">
					Overlay is simple component that accepts any native CSS color for this prop or the name from theme's color definition in{' '}
					<code>theme.color</code>.
				</Props.Prop>
				<Props.Prop name="animationDuration" type="string" defaultValue="theme.overlay.defaults.animationDuration">
					If set, entry and exit animations will be that long. You can pass any valid CSS value for animation duration. Example:{' '}
					<code>300ms</code>.
				</Props.Prop>
				<Props.Prop name="onClose" type="function" required>
					Function which will close the modal. You are responsible for unmounting the Overlay so your <code>onClose</code> function should
					do it.
				</Props.Prop>
				<Props.Prop name="zIndex" type="number" defaultValue={theme.json('zIndex') || 5000}>
					Custom z-index value for the overlay. Koldy UI starts rendering overlays on z-index {theme.json('zIndex') || 5000} (it can be
					configured in theme) so if you have a case where this should be different, then define it here.
				</Props.Prop>
				<Props.Prop name="disableCloseOnESC" type="boolean" defaultValue="false">
					By default, overlay will close on ESC key. If you want to prevent this, set this prop to <code>true</code>.
				</Props.Prop>
				<Props.Prop name="disableCloseOnClick" type="boolean" defaultValue="false">
					By default, overlay will close click. If you want to prevent this, set this prop to <code>true</code> and it would be good that
					children of this component stop the click event from propagating.
				</Props.Prop>
				<Props.Prop name="style" />
			</Props>

			<Paragraph>
				You can "render" overlays one inside of other, but thanks to React portals, it'll be rendered on correct place in DOM.
			</Paragraph>
			<Code language="js">
				<Button onClick={() => setExample1(!example1)}>Show 1st overlay</Button>
			</Code>
			{example1 && (
				<Overlay onClose={() => setExample1(false)} backgroundColor="semiBlack">
					{({closeFn}) => (
						<Box p="3rem" textAlign="center" background="#ffffff" onClick={preventDefaultAndStopPropagation}>
							This is content of 1st overlay <Button onClick={closeFn}>Close 1st overlay</Button>
							<Box p="1rem">
								<Button onClick={() => setExample2(!example2)}>Show 2nd overlay</Button>
							</Box>
							<Box p="1rem">
								<Button onClick={handleAddToast}>Or test Toast by adding it</Button>
							</Box>
							{example2 && (
								<Overlay onClose={() => setExample2(false)} backgroundColor="semiBlack">
									{({closeFn: onClose2}) => (
										<Box p="4rem" textAlign="center" background="#ffffff" onClick={preventDefaultAndStopPropagation}>
											<Paragraph>This is content of 2nd overlay</Paragraph>
											<Paragraph>
												<Button
													onClick={() => {
														closeFn();
														onClose2();
													}}
												>
													Close 1st overlay
												</Button>
											</Paragraph>
											<Paragraph>
												<Button onClick={onClose2}>Close 2nd overlay</Button>
											</Paragraph>
										</Box>
									)}
								</Overlay>
							)}
						</Box>
					)}
				</Overlay>
			)}
		</>
	);
}
