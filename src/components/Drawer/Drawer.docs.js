import React, {Fragment, useState} from 'react';
import DocsTitle from '../../../docs/components/DocsTitle';

import Drawer from './Drawer';
import DocsCode from '../../../docs/components/DocsCode';
import Button from '../Button/Button';
import Box from '../Box/Box';
import Text from '../Text/Text';
import Flexbox from '../Flexbox/Flexbox';
import DocsText from '../../../docs/components/DocsText';
import Props from '../../../docs/components/Props';
import AvailableKeys from '../../../docs/components/AvailableKeys';
import {emptyFn} from '../../util/helpers';
import Overlay from '../Overlay/Overlay';

export const title = 'Drawer';
export const slug = 'drawer';
export const json = 'drawer';

export const Documentation = function() {
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
			<DocsTitle hash="drawer">Drawer</DocsTitle>
			<Flexbox>
				<Flexbox.Item flex={1}>
					<DocsCode label="Examples without overlay">
						<DocsCode.Example>
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
									<Box p="1rem">Content of top drawer and you can't close me. Reload the page</Box>
								</Drawer>
							)}
							{showRightExample && (
								<Drawer backgroundColor="#ffffff" onClose={emptyFn} position="right">
									<Box p="1rem">Content of right drawer and you can't close me. Reload the page</Box>
								</Drawer>
							)}
							{showBottomExample && (
								<Drawer backgroundColor="#ffffff" onClose={emptyFn} position="bottom">
									<Box p="1rem">Content of bottom drawer and you can't close me. Reload the page</Box>
								</Drawer>
							)}
							{showLeftExample && (
								<Drawer backgroundColor="#ffffff" onClose={emptyFn} position="left">
									<Box p="1rem">Content of left drawer and you can't close me. Reload the page</Box>
								</Drawer>
							)}
						</DocsCode.Example>
						<DocsCode.Code>
							{`
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
											<Box p="1rem">Content of top drawer and you can't close me. Reload the page</Box>
										</Drawer>
									)}
									{showRightExample && (
										<Drawer backgroundColor="#ffffff" onClose={emptyFn} position="right">
											<Box p="1rem">Content of right drawer and you can't close me. Reload the page</Box>
										</Drawer>
									)}
									{showBottomExample && (
										<Drawer backgroundColor="#ffffff" onClose={emptyFn} position="bottom">
											<Box p="1rem">Content of bottom drawer and you can't close me. Reload the page</Box>
										</Drawer>
									)}
									{showLeftExample && (
										<Drawer backgroundColor="#ffffff" onClose={emptyFn} position="left">
											<Box p="1rem">Content of left drawer and you can't close me. Reload the page</Box>
										</Drawer>
									)}
									`}
						</DocsCode.Code>
					</DocsCode>
				</Flexbox.Item>
				<Flexbox.Item flex={1}>
					<DocsCode label="Examples with overlay">
						<DocsCode.Example>
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
						</DocsCode.Example>
						<DocsCode.Code>
							{`
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
						</DocsCode.Code>
					</DocsCode>
				</Flexbox.Item>
			</Flexbox>
			<Flexbox mt="1rem">
				<Flexbox.Item flex={1}>
					<DocsCode label="Examples with close function and exit animation duration of 750ms">
						<DocsCode.Example>
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
						</DocsCode.Example>
						<DocsCode.Code>
							{`
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
						</DocsCode.Code>
					</DocsCode>
				</Flexbox.Item>
				<Flexbox.Item flex={1}>
					<DocsCode label="Example of nested drawers">
						<DocsCode.Example>
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
														<Fragment>
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
														</Fragment>
													)}
												</Drawer>
											)}
										</Drawer>
									)}
								</Drawer>
							)}
						</DocsCode.Example>
						<DocsCode.Code>
							{`
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
																<Fragment>
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
																</Fragment>
															)}
														</Drawer>
													)}
												</Drawer>
											)}
										</Drawer>
									)}
									`}
						</DocsCode.Code>
					</DocsCode>
				</Flexbox.Item>
			</Flexbox>
			<DocsText>
				<code>Drawer</code> is common component that's usually used to show some additional content on any of four
				positions. There's not much to style tho, except the size and the entry/exit animation.
			</DocsText>
			<Props>
				<Props.Prop name="children" type={['node', 'func']} required>
					<p>
						Content is required for this component and it can be either a node or a function. If you're using it as
						function, then you have a chance to access the component's <code>closeFn</code> which, when used, will
						animate drawer while disappearing.
					</p>
					<DocsCode>
						<DocsCode.Code>
							{`
							<Drawer position="right">
								{({closeFn}) =>
									<div>
										I'm the content.
										<Text onClick={closeFn}>close me</Text>
									</div>
								}
							</Drawer>
							`}
						</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="size" type={['string', 'number']} defaultValue="theme.drawer.defaults.size">
					<p>
						The size of the drawer. It can be fixed or relative size. If set as number, then it'll be used as pixels,
						otherwise, any value you pass will be used as is.
					</p>
					<p>
						If position is <code>top</code> or <code>bottom</code>, then the size will be applied to height.
					</p>
					<p>
						If position is <code>left</code> or <code>right</code>, then the size will be applied to width.
					</p>
					<p>
						Be careful when using viewport units. When using <code>top</code> or <code>bottom</code>, then{' '}
						<code>vh</code> can be used, otherwise <code>vw</code> should be used.
					</p>
				</Props.Prop>
				<Props.Prop name="position" type="string" required>
					<p>The position of drawer.</p>
					<AvailableKeys data={['top', 'right', 'bottom', 'left']} />
				</Props.Prop>
				<Props.Prop name="backgroundColor" type="string">
					<p>
						The background color of the <code>Drawer</code>. It can be CSS color value or any valid value from the
						colors definition in theme.
					</p>
					<DocsCode>
						<DocsCode.Example>
							{showBackgroundExample && (
								<Drawer position="right" backgroundColor="primary" onClose={() => setShowBackgroundExample(false)}>
									{({closeFn}) => (
										<Fragment>
											<Box p="1rem">
												<Text color="white">I'm the content</Text>
											</Box>
											<Box position="absolute" top="1rem" right="1rem">
												<Button onClick={closeFn}>Close me</Button>
											</Box>
										</Fragment>
									)}
								</Drawer>
							)}
							<Button onClick={() => setShowBackgroundExample(true)}>Show example</Button>
						</DocsCode.Example>
						<DocsCode.Code>
							{`
							const [showBackgroundExample, setShowBackgroundExample] = useState(false);

							{showBackgroundExample && (
								<Drawer position="right" backgroundColor="primary" onClose={() => setShowBackgroundExample(false)}>
									{({closeFn}) => (
										<Fragment>
											<Box p="1rem">
												<Text color="white">I'm the content</Text>
											</Box>
											<Box position="absolute" top="1rem" right="1rem">
												<Button onClick={closeFn}>Close me</Button>
											</Box>
										</Fragment>
									)}
								</Drawer>
							)}
							<Button onClick={() => setShowBackgroundExample(true)}>Show example</Button>
							`}
						</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="overlayBackgroundColor" type="string">
					If set, <code>Drawer</code> will appear with background color set here. If overlay's background color is not
					set, then Overlay won't be rendered at all.
				</Props.Prop>
				<Props.Prop
					name="overlayAnimationDuration"
					type="string"
					defaultValue="theme.drawer.defaults.overlayAnimationDuration"
				>
					Sets the overlay duration for both entry and exit duration. Value must be valid CSS value that contains{' '}
					<code>ms</code> or <code>s</code>. Example: <code>350ms</code>.
				</Props.Prop>
				<Props.Prop name="onClose" type="func" required>
					<p>
						If/when drawer is closed from the inside, then this function will be called. When this function is called,{' '}
						<code>Drawer</code> should be unmounted.
					</p>
				</Props.Prop>
				<Props.Prop
					name="entryAnimationDuration"
					type="string"
					defaultValue="theme.drawer.defaults.entryAnimationDuration"
				>
					<p>
						The CSS animation duration of the entrance. The type of animation is set internally by component according
						to <code>position</code> prop.
					</p>
				</Props.Prop>
				<Props.Prop
					name="exitAnimationDuration"
					type="string"
					defaultValue="theme.drawer.defaults.exitAnimationDuration"
				>
					<p>
						The CSS animation duration of the exit. The type of animation is set internally by component according to{' '}
						<code>position</code> prop.
					</p>
				</Props.Prop>
			</Props>
		</>
	);
};
