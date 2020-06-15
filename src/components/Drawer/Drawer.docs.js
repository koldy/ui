import React, {useState} from 'react';

import Drawer from './Drawer';
import Button from '../Button/Button';
import Box from '../Box/Box';
import Text from '../Text/Text';
import Props from '../../../docs/components/Props';
import AvailableKeys from '../../../docs/components/AvailableKeys';
import {emptyFn} from '../../util/helpers';
import Overlay from '../Overlay/Overlay';
import H1 from '../../../docs/components/H1';
import Paragraph from '../../../docs/components/Paragraph';
import Code from '../../../docs/components/Code';

export const title = 'Drawer';
export const route = '/drawer';
export const json = 'drawer';

export default function DrawerDocs() {
	const [showTopExample, setShowTopExample] = useState(false);
	const [showRightExample, setShowRightExample] = useState(false);
	const [showBottomExample, setShowBottomExample] = useState(false);
	const [showLeftExample, setShowLeftExample] = useState(false);

	const [showTopExample2, setShowTopExample2] = useState(false);
	const [showRightExample2, setShowRightExample2] = useState(false);
	const [showBottomExample2, setShowBottomExample2] = useState(false);
	const [showLeftExample2, setShowLeftExample2] = useState(false);

	const [showTopExample3, setShowTopExample3] = useState(false);
	const [showRightExample3, setShowRightExample3] = useState(false);
	const [showBottomExample3, setShowBottomExample3] = useState(false);
	const [showLeftExample3, setShowLeftExample3] = useState(false);

	const [showBackgroundExample, setShowBackgroundExample] = useState(false);

	const [nested1, setNested1] = useState(false);
	const [nested2, setNested2] = useState(false);
	const [nested3, setNested3] = useState(false);
	const [overlay, setOverlay] = useState(false);

	return (
		<>
			<H1>Drawer</H1>
			<Code language="js" code="import {Drawer} from 'koldy-ui';" />

			<Code
				language="js"
				code={`
<Box textAlign="center">
  <Button onClick={() => setShowTopExample(true)} m="0.1rem">
    top
  </Button>
  <Box>
    <Button onClick={() => setShowLeftExample(true)} m="0.1rem">
      left
    </Button>
    <Button onClick={() => setShowRightExample(true)} m="0.1rem">
      right
    </Button>
  </Box>
  <Button onClick={() => setShowBottomExample(true)} m="0.1rem">
    bottom
  </Button>
</Box>
{showTopExample && (
  <Drawer backgroundColor="#ffffff" onClose={emptyFn} position="top">
    {({closeFn}) => (
      <Box p="1rem">
        Content of the top drawer without overlay. <Button onClick={closeFn}>Close</Button>
      </Box>
    )}
  </Drawer>
)}
{showRightExample && (
  <Drawer backgroundColor="#ffffff" onClose={emptyFn} position="right">
    {({closeFn}) => (
      <Box p="1rem">
        Content of the right drawer without overlay. <Button onClick={closeFn}>Close</Button>
      </Box>
    )}
  </Drawer>
)}
{showBottomExample && (
  <Drawer backgroundColor="#ffffff" onClose={emptyFn} position="bottom">
    {({closeFn}) => (
      <Box p="1rem">
        Content of the bottom drawer without overlay. <Button onClick={closeFn}>Close</Button>
      </Box>
    )}
  </Drawer>
)}
{showLeftExample && (
  <Drawer backgroundColor="#ffffff" onClose={emptyFn} position="left">
    {({closeFn}) => (
      <Box p="1rem">
        Content of the left drawer without overlay. <Button onClick={closeFn}>Close</Button>
      </Box>
    )}
  </Drawer>
)}
									`}
				label="Examples without overlay"
			>
				<Box textAlign="center">
					<Button onClick={() => setShowTopExample(true)} m="0.1rem">
						top
					</Button>
					<Box>
						<Button onClick={() => setShowLeftExample(true)} m="0.1rem">
							left
						</Button>
						<Button onClick={() => setShowRightExample(true)} m="0.1rem">
							right
						</Button>
					</Box>
					<Button onClick={() => setShowBottomExample(true)} m="0.1rem">
						bottom
					</Button>
				</Box>
				{showTopExample && (
					<Drawer backgroundColor="#ffffff" onClose={() => setShowTopExample(false)} position="top">
						{({closeFn}) => (
							<Box p="1rem">
								Content of the top drawer without overlay. <Button onClick={closeFn}>Close</Button>
							</Box>
						)}
					</Drawer>
				)}
				{showRightExample && (
					<Drawer backgroundColor="#ffffff" onClose={() => setShowRightExample(false)} position="right">
						{({closeFn}) => (
							<Box p="1rem">
								Content of the right drawer without overlay. <Button onClick={closeFn}>Close</Button>
							</Box>
						)}
					</Drawer>
				)}
				{showBottomExample && (
					<Drawer backgroundColor="#ffffff" onClose={() => setShowBottomExample(false)} position="bottom">
						{({closeFn}) => (
							<Box p="1rem">
								Content of the bottom drawer without overlay. <Button onClick={closeFn}>Close</Button>
							</Box>
						)}
					</Drawer>
				)}
				{showLeftExample && (
					<Drawer backgroundColor="#ffffff" onClose={() => setShowLeftExample(false)} position="left">
						{({closeFn}) => (
							<Box p="1rem">
								Content of the left drawer without overlay. <Button onClick={closeFn}>Close</Button>
							</Box>
						)}
					</Drawer>
				)}
			</Code>

			<Code
				language="js"
				code={`
<Box textAlign="center">
  <Button onClick={() => setShowTopExample2(true)} m="0.1rem">
    top
  </Button>
  <Box>
    <Button onClick={() => setShowLeftExample2(true)} m="0.1rem">
      left
    </Button>
    <Button onClick={() => setShowRightExample2(true)} m="0.1rem">
      right
    </Button>
  </Box>
  <Button onClick={() => setShowBottomExample2(true)} m="0.1rem">
    bottom
  </Button>
</Box>
{showTopExample2 && (
  <Drawer
    overlayBackgroundColor="semiBlack"
    backgroundColor="#ffffff"
    size="30%"
    onClose={() => setShowTopExample2(false)}
    position="top"
  >
    <Box p="1rem">Content of top drawer</Box>
  </Drawer>
)}
{showRightExample2 && (
  <Drawer
    overlayBackgroundColor="semiBlack"
    backgroundColor="#ffffff"
    size="30%"
    onClose={() => setShowRightExample2(false)}
    position="right"
  >
    <Box p="1rem">Content of right drawer</Box>
  </Drawer>
)}
{showBottomExample2 && (
  <Drawer
    overlayBackgroundColor="semiBlack"
    backgroundColor="#ffffff"
    size="30%"
    onClose={() => setShowBottomExample2(false)}
    position="bottom"
  >
    <Box p="1rem">Content of bottom drawer</Box>
  </Drawer>
)}
{showLeftExample2 && (
  <Drawer
    overlayBackgroundColor="semiBlack"
    backgroundColor="#ffffff"
    size="30%"
    onClose={() => setShowLeftExample2(false)}
    position="left"
  >
    <Box p="1rem">Content of left drawer</Box>
  </Drawer>
)}
									`}
				label="Examples with overlay"
			>
				<Box textAlign="center">
					<Button onClick={() => setShowTopExample2(true)} m="0.1rem">
						top
					</Button>
					<Box>
						<Button onClick={() => setShowLeftExample2(true)} m="0.1rem">
							left
						</Button>
						<Button onClick={() => setShowRightExample2(true)} m="0.1rem">
							right
						</Button>
					</Box>
					<Button onClick={() => setShowBottomExample2(true)} m="0.1rem">
						bottom
					</Button>
				</Box>
				{showTopExample2 && (
					<Drawer
						overlayBackgroundColor="semiBlack"
						backgroundColor="#ffffff"
						size="30%"
						onClose={() => setShowTopExample2(false)}
						position="top"
					>
						<Box p="1rem">Content of top drawer</Box>
					</Drawer>
				)}
				{showRightExample2 && (
					<Drawer
						overlayBackgroundColor="semiBlack"
						backgroundColor="#ffffff"
						size="30%"
						onClose={() => setShowRightExample2(false)}
						position="right"
					>
						<Box p="1rem">Content of right drawer</Box>
					</Drawer>
				)}
				{showBottomExample2 && (
					<Drawer
						overlayBackgroundColor="semiBlack"
						backgroundColor="#ffffff"
						size="30%"
						onClose={() => setShowBottomExample2(false)}
						position="bottom"
					>
						<Box p="1rem">Content of bottom drawer</Box>
					</Drawer>
				)}
				{showLeftExample2 && (
					<Drawer
						overlayBackgroundColor="semiBlack"
						backgroundColor="#ffffff"
						size="30%"
						onClose={() => setShowLeftExample2(false)}
						position="left"
					>
						<Box p="1rem">Content of left drawer</Box>
					</Drawer>
				)}
			</Code>

			<Code
				language="js"
				code={`
<Box textAlign="center">
  <Button onClick={() => setShowTopExample3(true)} m="0.1rem">
    top
  </Button>
  <Box>
    <Button onClick={() => setShowLeftExample3(true)} m="0.1rem">
      left
    </Button>
    <Button onClick={() => setShowRightExample3(true)} m="0.1rem">
      right
    </Button>
  </Box>
  <Button onClick={() => setShowBottomExample3(true)} m="0.1rem">
    bottom
  </Button>
</Box>
{showTopExample3 && (
  <Drawer
    overlayBackgroundColor="semiBlack"
    backgroundColor="#ffffff"
    size="30%"
    onClose={() => setShowTopExample3(false)}
    position="top"
    exitAnimationDuration="750ms"
  >
    {({closeFn}) => (
      <Box p="1rem">
        I'm the content as render props children
        <Box position="absolute" top="1rem" right="1rem">
          <Button onClick={closeFn}>X</Button>
        </Box>
      </Box>
    )}
  </Drawer>
)}
{showRightExample3 && (
  <Drawer
    overlayBackgroundColor="semiBlack"
    backgroundColor="#ffffff"
    size="30%"
    onClose={() => setShowRightExample3(false)}
    position="right"
    exitAnimationDuration="750ms"
  >
    {({closeFn}) => (
      <Box p="1rem">
        I'm the content as render props children
        <Box position="absolute" top="1rem" right="1rem">
          <Button onClick={closeFn}>X</Button>
        </Box>
      </Box>
    )}
  </Drawer>
)}
{showBottomExample3 && (
  <Drawer
    overlayBackgroundColor="semiBlack"
    backgroundColor="#ffffff"
    size="30%"
    onClose={() => setShowBottomExample3(false)}
    position="bottom"
    exitAnimationDuration="750ms"
  >
    {({closeFn}) => (
      <Box p="1rem">
        I'm the content as render props children
        <Box position="absolute" top="1rem" right="1rem">
          <Button onClick={closeFn}>X</Button>
        </Box>
      </Box>
    )}
  </Drawer>
)}
{showLeftExample3 && (
  <Drawer
    overlayBackgroundColor="semiBlack"
    backgroundColor="#ffffff"
    size="30%"
    onClose={() => setShowLeftExample3(false)}
    position="left"
    exitAnimationDuration="750ms"
  >
    {({closeFn}) => (
      <Box p="1rem">
        I'm the content as render props children
        <Box position="absolute" top="1rem" right="1rem">
          <Button onClick={closeFn}>X</Button>
        </Box>
      </Box>
    )}
  </Drawer>
)}
									`}
				label="Examples with close function and exit animation duration of 750ms"
			>
				<Box textAlign="center">
					<Button onClick={() => setShowTopExample3(true)} m="0.1rem">
						top
					</Button>
					<Box>
						<Button onClick={() => setShowLeftExample3(true)} m="0.1rem">
							left
						</Button>
						<Button onClick={() => setShowRightExample3(true)} m="0.1rem">
							right
						</Button>
					</Box>
					<Button onClick={() => setShowBottomExample3(true)} m="0.1rem">
						bottom
					</Button>
				</Box>
				{showTopExample3 && (
					<Drawer
						overlayBackgroundColor="semiBlack"
						backgroundColor="#ffffff"
						size="30%"
						onClose={() => setShowTopExample3(false)}
						position="top"
						exitAnimationDuration="750ms"
					>
						{({closeFn}) => (
							<Box p="1rem">
								I'm the content as render props children
								<Box position="absolute" top="1rem" right="1rem">
									<Button onClick={closeFn}>X</Button>
								</Box>
							</Box>
						)}
					</Drawer>
				)}
				{showRightExample3 && (
					<Drawer
						overlayBackgroundColor="semiBlack"
						backgroundColor="#ffffff"
						size="30%"
						onClose={() => setShowRightExample3(false)}
						position="right"
						exitAnimationDuration="750ms"
					>
						{({closeFn}) => (
							<Box p="1rem">
								I'm the content as render props children
								<Box position="absolute" top="1rem" right="1rem">
									<Button onClick={closeFn}>X</Button>
								</Box>
							</Box>
						)}
					</Drawer>
				)}
				{showBottomExample3 && (
					<Drawer
						overlayBackgroundColor="semiBlack"
						backgroundColor="#ffffff"
						size="30%"
						onClose={() => setShowBottomExample3(false)}
						position="bottom"
						exitAnimationDuration="750ms"
					>
						{({closeFn}) => (
							<Box p="1rem">
								I'm the content as render props children
								<Box position="absolute" top="1rem" right="1rem">
									<Button onClick={closeFn}>X</Button>
								</Box>
							</Box>
						)}
					</Drawer>
				)}
				{showLeftExample3 && (
					<Drawer
						overlayBackgroundColor="semiBlack"
						backgroundColor="#ffffff"
						size="30%"
						onClose={() => setShowLeftExample3(false)}
						position="left"
						exitAnimationDuration="750ms"
					>
						{({closeFn}) => (
							<Box p="1rem">
								I'm the content as render props children
								<Box position="absolute" top="1rem" right="1rem">
									<Button onClick={closeFn}>X</Button>
								</Box>
							</Box>
						)}
					</Drawer>
				)}
			</Code>

			<Code
				language="js"
				code={`
const [nested1, setNested1] = useState(false);
const [nested2, setNested2] = useState(false);
const [nested3, setNested3] = useState(false);

<Button onClick={() => setNested1(true)}>Show 1st</Button>
{nested1 && (
  <Drawer
    onClose={() => setNested1(false)}
    backgroundColor="#ffffff"
    overlayBackgroundColor="semiBlack"
    size="60%"
    position="right"
  >
    <Box p="1rem">First content</Box>
    <Button onClick={() => setNested2(true)}>Show 2nd</Button>
    {nested2 && (
      <Drawer
        onClose={() => setNested2(false)}
        backgroundColor="#ffffff"
        overlayBackgroundColor="semiBlack"
        size="50%"
        position="right"
      >
        <Box p="1rem">Second content</Box>
        <Button onClick={() => setNested3(true)}>Show 3nd</Button>
        {nested3 && (
          <Drawer
            onClose={() => setNested3(false)}
            backgroundColor="#ffffff"
            overlayBackgroundColor="semiBlack"
            size="40%"
            position="right"
          >
            {({closeFn}) => (
              <>
                <Box p="1rem">Third content</Box>
                <Button onClick={closeFn}>Close 3rd</Button> or{' '}
                <Button onClick={() => setOverlay(true)}>Open overlay from here</Button>
                {overlay && (
                  <Overlay
                    onClose={() => setOverlay(false)}
                    backgroundColor="primary"
                    animationDuration="500ms"
                  >
                    <Box p="1rem">
                      <Text color="white">
                        This is now overlay content. You may watch for zIndex.
                      </Text>
                    </Box>
                  </Overlay>
                )}
              </>
            )}
          </Drawer>
        )}
      </Drawer>
    )}
  </Drawer>
)}
									`}
				label="Example of nested drawers"
			>
				<Button onClick={() => setNested1(true)}>Show 1st</Button>
				{nested1 && (
					<Drawer
						onClose={() => setNested1(false)}
						backgroundColor="#ffffff"
						overlayBackgroundColor="semiBlack"
						size="60%"
						position="right"
					>
						<Box p="1rem">First content</Box>
						<Button onClick={() => setNested2(true)}>Show 2nd</Button>
						{nested2 && (
							<Drawer
								onClose={() => setNested2(false)}
								backgroundColor="#ffffff"
								overlayBackgroundColor="semiBlack"
								size="50%"
								position="right"
							>
								<Box p="1rem">Second content</Box>
								<Button onClick={() => setNested3(true)}>Show 3nd</Button>
								{nested3 && (
									<Drawer
										onClose={() => setNested3(false)}
										backgroundColor="#ffffff"
										overlayBackgroundColor="semiBlack"
										size="40%"
										position="right"
									>
										{({closeFn}) => (
											<>
												<Box p="1rem">Third content</Box>
												<Button onClick={closeFn}>Close 3rd</Button> or{' '}
												<Button onClick={() => setOverlay(true)}>Open overlay from here</Button>
												{overlay && (
													<Overlay onClose={() => setOverlay(false)} backgroundColor="primary" animationDuration="500ms">
														<Box p="1rem">
															<Text color="white">This is now overlay content. You may watch for zIndex.</Text>
														</Box>
													</Overlay>
												)}
											</>
										)}
									</Drawer>
								)}
							</Drawer>
						)}
					</Drawer>
				)}
			</Code>

			<Paragraph>
				<code>Drawer</code> is common component that's usually used to show some additional content on any of four positions. There's not
				much to style tho, except the size and the entry/exit animation.
			</Paragraph>
			<Props>
				<Props.Prop name="children" type={['node', 'func']} required>
					<Paragraph>
						Content is required for this component and it can be either a node or a function. If you're using it as function, then you have
						a chance to access the component's <code>closeFn</code> which, when used, will animate drawer while disappearing.
					</Paragraph>
					<Code
						language="js"
						code={`
<Drawer position="right">
  {({closeFn}) =>
    <div>
      I'm the content.
      <Text onClick={closeFn}>close me</Text>
    </div>
  }
</Drawer>
							`}
					/>
				</Props.Prop>
				<Props.Prop name="size" type={['string', 'number']} defaultValue="theme.drawer.defaults.size">
					<Paragraph>
						The size of the drawer. It can be fixed or relative size. If set as number, then it'll be used as pixels, otherwise, any value
						you pass will be used as is.
					</Paragraph>
					<Paragraph>
						If position is <code>top</code> or <code>bottom</code>, then the size will be applied to height.
					</Paragraph>
					<Paragraph>
						If position is <code>left</code> or <code>right</code>, then the size will be applied to width.
					</Paragraph>
					<Paragraph>
						Be careful when using viewport units. When using <code>top</code> or <code>bottom</code>, then <code>vh</code> can be used,
						otherwise <code>vw</code> should be used.
					</Paragraph>
				</Props.Prop>
				<Props.Prop name="position" type="string" required>
					<Paragraph>The position of drawer.</Paragraph>
					<AvailableKeys data={['top', 'right', 'bottom', 'left']} />
				</Props.Prop>
				<Props.Prop name="backgroundColor" type="string">
					<Paragraph>
						The background color of the <code>Drawer</code>. It can be CSS color value or any valid value from the colors definition in
						theme.
					</Paragraph>
					<Code
						language="js"
						code={`
const [showBackgroundExample, setShowBackgroundExample] = useState(false);

{showBackgroundExample && (
  <Drawer position="right" backgroundColor="primary" onClose={() => setShowBackgroundExample(false)}>
    {({closeFn}) => (
      <>
        <Box p="1rem">
          <Text color="white">I'm the content</Text>
        </Box>
        <Box position="absolute" top="1rem" right="1rem">
          <Button onClick={closeFn}>Close me</Button>
        </Box>
      </>
    )}
  </Drawer>
)}
<Button onClick={() => setShowBackgroundExample(true)}>Show example</Button>
							`}
					>
						{showBackgroundExample && (
							<Drawer position="right" backgroundColor="primary" onClose={() => setShowBackgroundExample(false)}>
								{({closeFn}) => (
									<>
										<Box p="1rem">
											<Text color="white">I'm the content</Text>
										</Box>
										<Box position="absolute" top="1rem" right="1rem">
											<Button onClick={closeFn}>Close me</Button>
										</Box>
									</>
								)}
							</Drawer>
						)}
						<Button onClick={() => setShowBackgroundExample(true)}>Show example</Button>
					</Code>
				</Props.Prop>
				<Props.Prop name="overlayBackgroundColor" type="string">
					If set, <code>Drawer</code> will appear with background color set here. If overlay's background color is not set, then Overlay
					won't be rendered at all.
				</Props.Prop>
				<Props.Prop name="overlayAnimationDuration" type="string" defaultValue="theme.drawer.defaults.overlayAnimationDuration">
					Sets the overlay duration for both entry and exit duration. Value must be valid CSS value that contains <code>ms</code> or{' '}
					<code>s</code>. Example: <code>350ms</code>.
				</Props.Prop>
				<Props.Prop name="onClose" type="function" required>
					<Paragraph>
						If/when drawer is closed from the inside, then this function will be called. When this function is called, <code>Drawer</code>{' '}
						should be unmounted.
					</Paragraph>
				</Props.Prop>
				<Props.Prop name="entryAnimationDuration" type="string" defaultValue="theme.drawer.defaults.entryAnimationDuration">
					<Paragraph>
						The CSS animation duration of the entrance. The type of animation is set internally by component according to{' '}
						<code>position</code> prop.
					</Paragraph>
				</Props.Prop>
				<Props.Prop name="exitAnimationDuration" type="string" defaultValue="theme.drawer.defaults.exitAnimationDuration">
					<Paragraph>
						The CSS animation duration of the exit. The type of animation is set internally by component according to <code>position</code>{' '}
						prop.
					</Paragraph>
				</Props.Prop>
			</Props>
		</>
	);
}
