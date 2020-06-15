import React from 'react';

import Flexbox from './Flexbox';
import H1 from '../../../docs/components/H1';
import Code from '../../../docs/components/Code';
import Paragraph from '../../../docs/components/Paragraph';
import Props from '../../../docs/components/Props';
import H2 from '../../../docs/components/H2';

export const title = 'Flexbox';
export const route = '/flexbox';
export const json = null;

export default function FlexboxDocs() {
	return (
		<>
			<H1>FlexBox</H1>
			<Code language="js" code="import {FlexBox} from 'koldy-ui';" />
			<Code
				language="js"
				code={`
<Flexbox>
  <Flexbox.Item flex={1}>I'm left</Flexbox.Item>
  <Flexbox.Item flex={1}>I'm in center</Flexbox.Item>
  <Flexbox.Item flex={1}>I'm right</Flexbox.Item>
</Flexbox>
					`}
			>
				<Flexbox>
					<Flexbox.Item flex={1}>I'm left</Flexbox.Item>
					<Flexbox.Item flex={1}>I'm in center</Flexbox.Item>
					<Flexbox.Item flex={1}>I'm right</Flexbox.Item>
				</Flexbox>
			</Code>
			<Paragraph>
				<code>Flexbox</code> and <code>Flexbox.Item</code> components map flexbox's container and child as defined in great article on{' '}
				<a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/" target="_blank" rel="noopener noreferrer">
					CSS-Tricks
				</a>
				. So, basically, this component is just a wrapper for flexbox.
			</Paragraph>
			<Props>
				<Props.Prop name="children" type="node" required>
					<Paragraph>
						Make sure that you use only <code>Flexbox.Item</code> components as direct children to <code>Flexbox</code>.
					</Paragraph>
				</Props.Prop>
				<Props.Prop name="inline" type="bool" defaultValue={false}>
					<Paragraph>
						If set to <code>true</code>, CSS display will be set to <code>inline-flex</code>.
					</Paragraph>
				</Props.Prop>
				<Props.Prop name="flexDirection" type="string" defaultValue="row">
					<Paragraph>
						One of the: <code>row</code>, <code>row-reverse</code>, <code>column</code>, <code>column-reverse</code>.
					</Paragraph>
				</Props.Prop>
				<Props.Prop name="flexWrap" type="string" defaultValue="nowrap">
					<Paragraph>
						One of the: <code>nowrap</code>, <code>wrap</code>, <code>wrap-reverse</code>.
					</Paragraph>
				</Props.Prop>
				<Props.Prop name="justifyContent" type="string" defaultValue="flex-start">
					<Paragraph>
						One of the: <code>flex-start</code>, <code>flex-end</code>, <code>center</code>, <code>space-between</code>,{' '}
						<code>space-around</code>, <code>space-evenly</code>.
					</Paragraph>
				</Props.Prop>
				<Props.Prop name="alignItems" type="string" defaultValue="stretch">
					<Paragraph>
						One of the: <code>stretch</code>, <code>flex-start</code>, <code>flex-end</code>, <code>center</code>, <code>baseline</code>.
					</Paragraph>
				</Props.Prop>
				<Props.Prop name="width" type={['string', 'number']}>
					<Paragraph>Fixed width. If passed as number, it'll be used as pixels, otherwise as is.</Paragraph>
				</Props.Prop>
				<Props.Prop name="height" type={['string', 'number']}>
					<Paragraph>Fixed height. If passed as number, it'll be used as pixels, otherwise as is.</Paragraph>
				</Props.Prop>
				<Props.Prop name="style" />
				<Props.Prop name="m" />
				<Props.Prop name="mt" />
				<Props.Prop name="mr" />
				<Props.Prop name="mb" />
				<Props.Prop name="ml" />
				<Props.Prop name="ref" />
			</Props>
			<H2 hash="flexbox-item">Flexbox.Item</H2>
			<Paragraph>
				To keep your code clean and consistent, use this component as direct child of <code>Flexbox</code> component.
			</Paragraph>
			<Props hash="item-props" title="Flexbox.Item Props">
				<Props.Prop name="children" type="node" />
				<Props.Prop name="order" type="number">
					<Paragraph>
						Defines the CSS <code>order</code> value.
					</Paragraph>
				</Props.Prop>
				<Props.Prop name="flex" type={['string', 'number']}>
					<Paragraph>
						Defines the CSS <code>flex</code> value, both as number or as string. We recommend using it as number, but if you need to define
						some more complex &quot;flex&quot; scenarios, then you'll have to use it as string.
					</Paragraph>
				</Props.Prop>
				<Props.Prop name="alignSelf" type="string" defaultValue="auto">
					<Paragraph>
						One of <code>auto</code>, <code>flex-start</code>, <code>flex-end</code>, <code>center</code>, <code>baseline</code> or{' '}
						<code>stretch</code>.
					</Paragraph>
				</Props.Prop>
				<Props.Prop name="textAlign" type="string" defaultValue="inherit">
					<Paragraph>
						This is shorthand for aligning text within the Flexbox.Item. Use one of <code>left</code>, <code>center</code>,{' '}
						<code>right</code> or <code>justify</code> values.
					</Paragraph>
					<Code
						language="js"
						code={`
<Flexbox>
  <Flexbox.Item flex={1} textAlign="left">
    I'm left
  </Flexbox.Item>
  <Flexbox.Item flex={1} textAlign="right">
    I'm right
  </Flexbox.Item>
</Flexbox>
							`}
					>
						<Flexbox>
							<Flexbox.Item flex={1} textAlign="left">
								I'm left
							</Flexbox.Item>
							<Flexbox.Item flex={1} textAlign="right">
								I'm right
							</Flexbox.Item>
						</Flexbox>
					</Code>
				</Props.Prop>
				<Props.Prop name="width" type={['string', 'number']}>
					<Paragraph>Fixed width. If passed as number, it'll be used as pixels, otherwise as is.</Paragraph>
				</Props.Prop>
				<Props.Prop name="height" type={['string', 'number']}>
					<Paragraph>Fixed height. If passed as number, it'll be used as pixels, otherwise as is.</Paragraph>
				</Props.Prop>
				<Props.Prop name="style" />
				<Props.Prop name="ref" />
			</Props>
		</>
	);
}
