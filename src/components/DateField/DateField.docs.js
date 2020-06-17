import React, {Fragment, useContext} from 'react';

import ThemeContext from '../../theme/ThemeContext';

import DateField from './DateField';
import Props from '../../../docs/components/Props';
import AvailableKeys from '../../../docs/components/AvailableKeys';
import Text from '../Text/Text';
import H1 from '../../../docs/components/H1';
import Code from '../../../docs/components/Code';
import H2 from '../../../docs/components/H2';
import Paragraph from '../../../docs/components/Paragraph';
import List from '../../../docs/components/List';

export const title = 'DateField';
export const route = '/date-field';
export const json = 'inputField';

export default function DateFieldDocs() {
	const {theme} = useContext(ThemeContext);

	const sizes = theme.json('inputField.size');
	const colors = theme.json('inputField.color');
	const variants = theme.json('inputField.variant');
	const widths = theme.json('inputField.width');

	return (
		<>
			<H1>DateField</H1>
			<Code language="js" code="import {DateField} from 'koldy-ui';" />
			<Code language="js" code={'<Text as="label">The label <DateField /></Text>'}>
				<Text as="label">
					The label <DateField />
				</Text>
			</Code>
			<Paragraph>
				<code>DateField</code> component is standard HTML input element with some advanced features which will be explained later. Check the
				props and check the examples for the usage.
			</Paragraph>
			<Paragraph>
				Although this component looks really simple, look closely and you'll see that it's possible to combine any of the components you
				already saw in other UI libraries, such as "search button with text field", or any other content that might be useful to put within
				the <code>DateField</code>.
			</Paragraph>

			<Props>
				<Props.Prop name="children" type="node" defaultValue="<DateField.Input/>">
					<Paragraph>
						If you want to create "complex" looking and behaving <code>DateField</code>, then use children to reconfigure it's inner layout.
						This allows you to put any content before or after the input element itself. If nothing is set, then standard HTML input will be
						used.
					</Paragraph>
					<Paragraph>There are few components you should use for configuring the layout:</Paragraph>
					<List>
						<List.Item>
							<code>DateField.Input</code> - standard input component which is used by default, but if yo're making your own inner layout,
							then you have to use this component to tell where input should be
						</List.Item>
						<List.Item>
							<code>DateField.Text</code> - use this component if you want to place plain text before or after the input component itself;
							this component will take the padding and font size from the input field so it's style and size will be automatically set
						</List.Item>
						<List.Item>
							<code>DateField.Box</code> - use this component to put more advanced components, like <code>Button</code> or anything else.
							Unlike DateField.Text which has the component's style, this component has nothing, no margin and no padding, so it's easier to
							position inner component.
						</List.Item>
					</List>
					<Paragraph>Here's an example for putting the dollar sign before the text input:</Paragraph>
					<Code
						language="js"
						code={`
<DateField>
  <DateField.Text>$</DateField.Text>
  <DateField.Input />
</DateField>
					`}
					>
						<DateField>
							<DateField.Text>$</DateField.Text>
							<DateField.Input />
						</DateField>
					</Code>
				</Props.Prop>
				<Props.Prop name="name" type="string">
					Name used for forms.
				</Props.Prop>
				<Props.Prop name="value" type={['string', 'number']}>
					<Paragraph>
						If you want to use DateField as controlled component, then set the <code>value</code> prop.
					</Paragraph>
					<Code
						language="js"
						code={"<DateField value=\"I'm here and you can't change me\" onChange={({value}) => console.log('New value is', value)} />"}
					>
						<DateField value="I'm here and you can't change me" onChange={({value}) => console.log('New value is', value)} />
					</Code>
				</Props.Prop>
				<Props.Prop name="defaultValue" type={['string', 'number']}>
					<Paragraph>
						If you plan to use DateField as uncontrolled component, then use <code>defaultValue</code> to set the initial value.
					</Paragraph>
					<Code language="js" code={'<DateField defaultValue="I\'m here by default" />'}>
						<DateField defaultValue="I'm here by default" />
					</Code>
				</Props.Prop>
				<Props.Prop name="placeholder" type={['string', 'number']}>
					<Paragraph>Standard placeholder attribute.</Paragraph>
					<DateField placeholder="I'm placeholder..." width="50%" />
					<Paragraph>&nbsp;</Paragraph>
					<Paragraph>More complex example:</Paragraph>
					<Code
						language="js"
						code={`
<DateField placeholder="I'm placeholder..." width="50%">
  <DateField.Text>$</DateField.Text>
  <DateField.Input />
</DateField>
					`}
					>
						<DateField placeholder="I'm placeholder..." width="50%">
							<DateField.Text>$</DateField.Text>
							<DateField.Input />
						</DateField>
					</Code>
				</Props.Prop>
				<Props.Prop name="color" type="string" defaultValue="theme.inputField.defaults.color">
					<Paragraph>
						Use one of the keys set in <code>theme.inputField.color</code>.
					</Paragraph>
					<AvailableKeys data={colors} name="theme.inputField.color" />
				</Props.Prop>
				<Props.Prop name="size" type="string" defaultValue="theme.inputField.defaults.size">
					<Paragraph>
						Use one of the keys set in <code>theme.inputField.size</code>.
					</Paragraph>
					<AvailableKeys data={sizes} name="theme.inputField.size" />
				</Props.Prop>
				<Props.Prop name="variant" type="string" defaultValue="theme.inputField.defaults.variant">
					<Paragraph>
						Use one of the keys set in <code>theme.inputField.variant</code>. Possible variants in current theme are:
					</Paragraph>
					{Object.keys(variants).map((variant) => (
						<Code language="js" code={`<DateField variant="${variant}" />`} key={variant} label={variant} labelWidth="auto">
							<DateField variant={variant} />
						</Code>
					))}
				</Props.Prop>
				<Props.Prop name="width" type="string" defaultValue="theme.inputField.defaults.width">
					<Paragraph>
						Use one of the keys set in <code>theme.inputField.width</code> or set your own fixed width.
					</Paragraph>
					<AvailableKeys data={widths} name="theme.inputField.width" />
					<Paragraph>Example of fixed with of 75%</Paragraph>
					<Code language="js" code={'<DateField width="75%" />'}>
						<DateField width="75%" />
					</Code>
				</Props.Prop>
				<Props.Prop name="minWidth" type="string">
					If set, it'll be added at the bottom of CSS definition so if you have any previous definition of <code>min-width</code> (for
					example, in theme's variant definition), it'll be overridden with this value.
				</Props.Prop>
				<Props.Prop name="maxWidth" type="string">
					If set, it'll be added at the bottom of CSS definition so if you have any previous definition of <code>max-width</code> (for
					example, in theme's variant definition), it'll be overridden with this value.
				</Props.Prop>
				<Props.Prop name="onChange" type="function">
					<Paragraph>Called when value has changed. This is required prop when DateField is used as controlled component.</Paragraph>
					<Paragraph>Called function will get the object as first parameter that has the following keys:</Paragraph>
					<List>
						<List.Item>
							<strong>name</strong>
						</List.Item>
						<List.Item>
							<strong>value</strong> - new value that has been set
						</List.Item>
						<List.Item>
							<strong>element</strong> - instance of <code>HTMLElement</code>
						</List.Item>
					</List>
					<Paragraph>Check the example and watch your browser's console to see the change.</Paragraph>
					<Code language="js" code={'<DateField name="onChangeExampleName" onChange={(o) => console.log(o)} />'}>
						<DateField name="onChangeExampleName" onChange={(o) => console.log(o)} />
					</Code>
				</Props.Prop>
				<Props.Prop name="onInput" type="function">
					<Paragraph>
						Unlike <code>onChange</code> which is called on every change, <code>onInput</code> function will be called with defined delay.
						This is useful when you want to allow user to type something in first and then you want to fire callback when typing is done.
					</Paragraph>
					<Paragraph>Called function will get the object as first parameter that has the following keys:</Paragraph>
					<List>
						<List.Item>
							<strong>name</strong>
						</List.Item>
						<List.Item>
							<strong>value</strong> - new value that has been set
						</List.Item>
						<List.Item>
							<strong>element</strong> - instance of <code>HTMLElement</code>
						</List.Item>
					</List>
					<Paragraph>Check the example and watch your browser's console to see the change.</Paragraph>
					<Code language="js" code={'<DateField name="onInputExampleName" onInput={({name, value}) => console.log(name, value)} />'}>
						<DateField name="onInputExampleName" onInput={({name, value}) => console.log(name, value)} />
					</Code>
				</Props.Prop>
				<Props.Prop name="inputDelay" type="number" defaultValue={300}>
					<Paragraph>
						To set the delay for <code>onInput</code>, use this prop.
					</Paragraph>
					<Paragraph>Check the example with input delay of 1000 (1 second) and watch your browser's console to see the change.</Paragraph>
					<Code
						language="js"
						code={'<DateField name="onInputDelayExample" onInput={({name, value}) => console.log(name, value)} inputDelay={1000} />'}
					>
						<DateField name="onInputDelayExample" onInput={({name, value}) => console.log(name, value)} inputDelay={1000} />
					</Code>
				</Props.Prop>
				<Props.Prop name="onClick" type="function">
					<Paragraph>Called when the component is clicked on.</Paragraph>
					<Paragraph>Called function will get the object as first parameter that has the following keys:</Paragraph>
					<List>
						<List.Item>
							<strong>name</strong>
						</List.Item>
						<List.Item>
							<strong>value</strong> - new value that has been set
						</List.Item>
						<List.Item>
							<strong>element</strong> - instance of <code>HTMLElement</code>
						</List.Item>
					</List>
					<Paragraph>Check the example and watch your browser's console to see the change.</Paragraph>
					<Code language="js" code={'<DateField name="onClickExampleName" onClick={(o) => console.log(o)} />'}>
						<DateField name="onClickExampleName" onClick={(o) => console.log(o)} />
					</Code>
				</Props.Prop>
				<Props.Prop name="onDoubleClick" type="function">
					<Paragraph>Called when the component is double clicked on.</Paragraph>
					<Paragraph>Called function will get the object as first parameter that has the following keys:</Paragraph>
					<List>
						<List.Item>
							<strong>name</strong>
						</List.Item>
						<List.Item>
							<strong>value</strong> - new value that has been set
						</List.Item>
						<List.Item>
							<strong>element</strong> - instance of <code>HTMLElement</code>
						</List.Item>
					</List>
					<Paragraph>Check the example and watch your browser's console to see the change.</Paragraph>
					<Code language="js" code={'<DateField name="onDoubleClickExampleName" onDoubleClick={(o) => console.log(o)} />'}>
						<DateField name="onDoubleClickExampleName" onDoubleClick={(o) => console.log(o)} />
					</Code>
				</Props.Prop>
				<Props.Prop name="onFocus" type="function">
					<Paragraph>Called when the component is focused.</Paragraph>
					<Paragraph>Called function will get the object as first parameter that has the following keys:</Paragraph>
					<List>
						<List.Item>
							<strong>name</strong>
						</List.Item>
						<List.Item>
							<strong>value</strong> - new value that has been set
						</List.Item>
						<List.Item>
							<strong>element</strong> - instance of <code>HTMLElement</code>
						</List.Item>
					</List>
					<Paragraph>Check the example and watch your browser's console to see the change.</Paragraph>
					<Code language="js" code={'<DateField name="onFocusExampleName" onFocus={(o) => console.log(o)} />'}>
						<DateField name="onFocusExampleName" onFocus={(o) => console.log(o)} />
					</Code>
					<Paragraph>Check more complex example:</Paragraph>
					<Code
						language="js"
						code={`
<DateField name="onFocusExampleName2" onFocus={(o) => console.log(o)}>
  <DateField.Text>Click me here</DateField.Text>
  <DateField.Input />
</DateField>
					`}
					>
						<DateField name="onFocusExampleName2" onFocus={(o) => console.log(o)}>
							<DateField.Text>Click me here</DateField.Text>
							<DateField.Input />
						</DateField>
					</Code>
				</Props.Prop>
				<Props.Prop name="onBlur" type="function">
					<Paragraph>Called when the component is blurred.</Paragraph>
					<Paragraph>Called function will get the object as first parameter that has the following keys:</Paragraph>
					<List>
						<List.Item>
							<strong>name</strong>
						</List.Item>
						<List.Item>
							<strong>value</strong> - new value that has been set
						</List.Item>
						<List.Item>
							<strong>element</strong> - instance of <code>HTMLElement</code>
						</List.Item>
					</List>
					<Paragraph>Check the example and watch your browser's console to see the change.</Paragraph>
					<Code language="js" code={'<DateField name="onBlurExampleName" onBlur={(o) => console.log(o)} />'}>
						<DateField name="onBlurExampleName" onBlur={(o) => console.log(o)} />
					</Code>
				</Props.Prop>
				<Props.Prop name="disabled" type="boolean" defaultValue={false}>
					<Paragraph>
						This is standard HTML's <code>disabled</code> attribute.
					</Paragraph>
					<Code language="js" code={'<DateField name="disabledExample" disabled />'}>
						<DateField name="disabledExample" disabled />
					</Code>
					<Paragraph>More complex example:</Paragraph>
					<Code
						language="js"
						code={`
<DateField name="disabledExample2" disabled>
  <DateField.Text>$</DateField.Text>
  <DateField.Input />
</DateField>
					`}
					>
						<DateField name="disabledExample2" disabled>
							<DateField.Text>$</DateField.Text>
							<DateField.Input />
						</DateField>
					</Code>
				</Props.Prop>
				<Props.Prop name="readOnly" type="boolean" defaultValue={false}>
					<Paragraph>
						This is standard HTML's <code>readOnly</code> attribute.
					</Paragraph>
					<Code language="js" code={'<DateField name="readOnlyExample" defaultValue="Default value" readOnly />'}>
						<DateField name="readOnlyExample" defaultValue="Default value" readOnly />
					</Code>
					<Paragraph>More complex example:</Paragraph>
					<Code
						language="js"
						code={`
<DateField name="readOnlyExample2" defaultValue="Default value" readOnly>
  <DateField.Text>$</DateField.Text>
  <DateField.Input />
</DateField>
					`}
					>
						<DateField name="readOnlyExample2" defaultValue="Default value" readOnly>
							<DateField.Text>$</DateField.Text>
							<DateField.Input />
						</DateField>
					</Code>
				</Props.Prop>
				<Props.Prop name="m" />
				<Props.Prop name="mt" />
				<Props.Prop name="mr" />
				<Props.Prop name="mb" />
				<Props.Prop name="ml" />
				<Props.Prop name="ref" />
			</Props>
			<Props title="Props for DateField.Input" hash="DateField-input-props">
				<Props.Prop name="flex" type={['string', 'number']}>
					All elements within the text field's container are aligned with <code>inline-flex</code>, so if you want to provide custom width
					or relative width, you may use this prop. This is standard CSS <code>flex</code> property.
				</Props.Prop>
				<Props.Prop name="width" type={['string', 'number']}>
					If you want to set custom width on the content's width, then use this prop.
				</Props.Prop>
			</Props>
			<Props title="Props for DateField.Text" hash="DateField-text-props">
				<Props.Prop name="children" type={['string', 'number', 'node']} required>
					The content you want to put.
				</Props.Prop>
				<Props.Prop name="flex" type={['string', 'number']}>
					All elements within the text field's container are aligned with <code>inline-flex</code>, so if you want to provide custom width
					or relative width, you may use this prop. This is standard CSS <code>flex</code> property.
				</Props.Prop>
				<Props.Prop name="width" type={['string', 'number']}>
					If you want to set custom width on the content's width, then use this prop.
				</Props.Prop>
				<Props.Prop name="alignSelf" type="string">
					All elements within the text field's container are aligned with <code>inline-flex</code>, so if you want to customize the position
					of this component, then use this prop. It is standard CSS <code>align-self</code> property, so allowed values are:
					<AvailableKeys data={['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch']} />
				</Props.Prop>
				<Props.Prop name="textAlign" type="string">
					If this component is wider then its inner content, then you may want to set the <code>text-align</code> explicitly.
				</Props.Prop>
				<Props.Prop name="p" />
				<Props.Prop name="pt" />
				<Props.Prop name="pr" />
				<Props.Prop name="pb" />
				<Props.Prop name="pl" />
			</Props>
			<Code
				language="js"
				code={`
<DateField>
  <DateField.Text>Look</DateField.Text>
  <DateField.Input />
  <DateField.Text>Go</DateField.Text>
</DateField>
					`}
				label="Example for DateField.Text:"
			>
				<DateField>
					<DateField.Text>Look</DateField.Text>
					<DateField.Input />
					<DateField.Text>Go</DateField.Text>
				</DateField>
			</Code>
			<Props title="Props for DateField.Box" hash="DateField-box-props">
				<Props.Prop name="children" type={['string', 'number', 'node']} required>
					The content you want to put.
				</Props.Prop>
				<Props.Prop name="flex" type={['string', 'number']}>
					All elements within the box field's container are aligned with <code>inline-flex</code>, so if you want to provide custom width or
					relative width, you may use this prop. This is standard CSS <code>flex</code> property.
				</Props.Prop>
				<Props.Prop name="width" type={['string', 'number']}>
					If you want to set custom width on the content's width, then use this prop.
				</Props.Prop>
				<Props.Prop name="alignSelf" type="string">
					All elements within the box field's container are aligned with <code>inline-flex</code>, so if you want to customize the position
					of this component, then use this prop. It is standard CSS <code>align-self</code> property, so allowed values are:
					<AvailableKeys data={['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch']} />
				</Props.Prop>
				<Props.Prop name="textAlign" type="string">
					If this component is wider then its inner content, then you may want to set the <code>text-align</code> explicitly.
				</Props.Prop>
				<Props.Prop name="p" />
				<Props.Prop name="pt" />
				<Props.Prop name="pr" />
				<Props.Prop name="pb" />
				<Props.Prop name="pl" />
			</Props>
			<Code
				language="js"
				code={`
<DateField>
  <DateField.Box alignSelf="stretch">
    <div
      style={{
        backgroundColor: 'gray',
        border: '1px solid red',
        color: 'white',
        height: '100%'
      }}
    >
      Hey!
    </div>
  </DateField.Box>
  <DateField.Input />
</DateField>
					`}
				label="Example for DateField.Box:"
			>
				<DateField>
					<DateField.Box alignSelf="stretch">
						<div
							style={{
								backgroundColor: 'gray',
								border: '1px solid red',
								color: 'white',
								height: '100%',
							}}
						>
							Hey!
						</div>
					</DateField.Box>
					<DateField.Input />
				</DateField>
			</Code>
			<H2 hash="size">Size</H2>
			<Paragraph>
				Size can only be set in theme. Don't mix this prop with the <code>width</code> prop, size tells how big the component is (font size,
				padding and etc).
			</Paragraph>
			<AvailableKeys data={sizes} />
			{Object.keys(sizes).map((t) => (
				<Code language="js" code={`<DateField size="${t}" />`} key={t} label={t} labelWidth="auto">
					<DateField size={t} />
				</Code>
			))}
			<H2 hash="width">Width</H2>
			<Paragraph>It is possible to predefine width in the theme, so you can have one place from where you control the width.</Paragraph>
			<AvailableKeys data={widths} />
			{Object.keys(widths).map((t) => (
				<Code language="js" code={`<DateField width="${t}" />`} key={t} label={t} labelWidth="auto">
					<DateField width={t} />
				</Code>
			))}
		</>
	);
}
