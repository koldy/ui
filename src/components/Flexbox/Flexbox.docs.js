import React from 'react';

import Flexbox from './Flexbox';
import DocsTitle from '../../../docs/components/DocsTitle';
import Props from '../../../docs/components/Props';
import DocsSubTitle from '../../../docs/components/DocsSubTitle';
import DocsText from '../../../docs/components/DocsText';
import ImportComponent from '../../../docs/components/ImportComponent';
import DocsCode from '../../../docs/components/DocsCode';

export const title = 'Flexbox';
export const slug = 'flexbox';
export const json = null;

export const Documentation = function() {
	return (
		<>
			<DocsTitle hash="flexbox">FlexBox</DocsTitle>
			<ImportComponent name="FlexBox" />
			<DocsCode>
				<DocsCode.Example>
					<Flexbox>
						<Flexbox.Item flex={1}>I'm left</Flexbox.Item>
						<Flexbox.Item flex={1}>I'm in center</Flexbox.Item>
						<Flexbox.Item flex={1}>I'm right</Flexbox.Item>
					</Flexbox>
				</DocsCode.Example>
				<DocsCode.Code>
					{`
					<Flexbox>
						<Flexbox.Item flex={1}>I'm left</Flexbox.Item>
						<Flexbox.Item flex={1}>I'm in center</Flexbox.Item>
						<Flexbox.Item flex={1}>I'm right</Flexbox.Item>
					</Flexbox>
					`}
				</DocsCode.Code>
			</DocsCode>
			<DocsText>
				<code>Flexbox</code> and <code>Flexbox.Item</code> components map flexbox's container and child as defined in
				great article on{' '}
				<a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/" target="_blank" rel="noopener noreferrer">
					CSS-Tricks
				</a>
				. So, basically, this component is just a wrapper for flexbox.
			</DocsText>
			<Props>
				<Props.Prop name="children" type="node" required>
					<p>
						Make sure that you use only <code>Flexbox.Item</code> components as direct children to <code>Flexbox</code>.
					</p>
				</Props.Prop>
				<Props.Prop name="inline" type="bool" defaultValue={false}>
					<p>
						If set to <code>true</code>, CSS display will be set to <code>inline-flex</code>.
					</p>
				</Props.Prop>
				<Props.Prop name="flexDirection" type="string" defaultValue="row">
					<p>
						One of the: <code>row</code>, <code>row-reverse</code>, <code>column</code>, <code>column-reverse</code>.
					</p>
				</Props.Prop>
				<Props.Prop name="flexWrap" type="string" defaultValue="nowrap">
					<p>
						One of the: <code>nowrap</code>, <code>wrap</code>, <code>wrap-reverse</code>.
					</p>
				</Props.Prop>
				<Props.Prop name="justifyContent" type="string" defaultValue="flex-start">
					<p>
						One of the: <code>flex-start</code>, <code>flex-end</code>, <code>center</code>, <code>space-between</code>,{' '}
						<code>space-around</code>, <code>space-evenly</code>.
					</p>
				</Props.Prop>
				<Props.Prop name="alignItems" type="string" defaultValue="stretch">
					<p>
						One of the: <code>stretch</code>, <code>flex-start</code>, <code>flex-end</code>, <code>center</code>,{' '}
						<code>baseline</code>.
					</p>
				</Props.Prop>
				<Props.Prop name="width" type={['string', 'number']}>
					<p>Fixed width. If passed as number, it'll be used as pixels, otherwise as is.</p>
				</Props.Prop>
				<Props.Prop name="height" type={['string', 'number']}>
					<p>Fixed height. If passed as number, it'll be used as pixels, otherwise as is.</p>
				</Props.Prop>
				<Props.Prop name="style" />
				<Props.Prop name="m" />
				<Props.Prop name="mt" />
				<Props.Prop name="mr" />
				<Props.Prop name="mb" />
				<Props.Prop name="ml" />
				<Props.Prop name="ref" />
			</Props>
			<DocsSubTitle hash="flexbox-item">Flexbox.Item</DocsSubTitle>
			<DocsText>
				To keep your code clean and consistent, use this component as direct child of <code>Flexbox</code> component.
			</DocsText>
			<Props hash="item-props" title="Flexbox.Item Props">
				<Props.Prop name="children" type="node" />
				<Props.Prop name="order" type="number">
					<p>
						Defines the CSS <code>order</code> value.
					</p>
				</Props.Prop>
				<Props.Prop name="flex" type={['string', 'number']}>
					<p>
						Defines the CSS <code>flex</code> value, both as number or as string. We recommend using it as number, but
						if you need to define some more complex &quot;flex&quot; scenarios, then you'll have to use it as string.
					</p>
				</Props.Prop>
				<Props.Prop name="alignSelf" type="string" defaultValue="auto">
					<p>
						One of <code>auto</code>, <code>flex-start</code>, <code>flex-end</code>, <code>center</code>,{' '}
						<code>baseline</code> or <code>stretch</code>.
					</p>
				</Props.Prop>
				<Props.Prop name="textAlign" type="string">
					<p>
						This is shorthand for aligning text within the Flexbox.Item. Use one of <code>left</code>,{' '}
						<code>center</code>, <code>right</code> or <code>justify</code> values.
					</p>
					<DocsCode>
						<DocsCode.Example>
							<Flexbox>
								<Flexbox.Item flex={1} textAlign="left">
									I'm left
								</Flexbox.Item>
								<Flexbox.Item flex={1} textAlign="right">
									I'm right
								</Flexbox.Item>
							</Flexbox>
						</DocsCode.Example>
						<DocsCode.Code>
							{`
							<Flexbox>
								<Flexbox.Item flex={1} textAlign="left">
									I'm left
								</Flexbox.Item>
								<Flexbox.Item flex={1} textAlign="right">
									I'm right
								</Flexbox.Item>
							</Flexbox>
							`}
						</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="width" type={['string', 'number']}>
					<p>Fixed width. If passed as number, it'll be used as pixels, otherwise as is.</p>
				</Props.Prop>
				<Props.Prop name="height" type={['string', 'number']}>
					<p>Fixed height. If passed as number, it'll be used as pixels, otherwise as is.</p>
				</Props.Prop>
				<Props.Prop name="style" />
				<Props.Prop name="ref" />
			</Props>
		</>
	);
};
