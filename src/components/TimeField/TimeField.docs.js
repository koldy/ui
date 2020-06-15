import React, {Fragment, useContext, useState, useCallback} from 'react';

import ThemeContext from '../../theme/ThemeContext';

import TimeField from './TimeField';
import Props from '../../../docs/components/Props';
import AvailableKeys from '../../../docs/components/AvailableKeys';
import TextDocs from '../InputField/Text.docs';
import BoxDocs from '../InputField/Box.docs';
import H1 from '../../../docs/components/H1';
import Code from '../../../docs/components/Code';
import Paragraph from '../../../docs/components/Paragraph';
import H2 from '../../../docs/components/H2';
import List from '../../../docs/components/List';

export const title = 'TimeField';
export const route = '/time-field';
export const json = 'inputField';

const newYear2019 = new Date(Date.parse('2019-01-01 10:45:00'));

export default function TimeFieldDocs() {
	const {theme} = useContext(ThemeContext);

	const sizes = theme.json('inputField.size');
	const colors = theme.json('inputField.color');
	const variants = theme.json('inputField.variant');
	const widths = theme.json('inputField.width');

	const [dt, setDt] = useState(new Date());
	const handleChange = useCallback(({value}) => {
		setDt(value);
	}, []);

	return (
		<>
			<H1>TimeField</H1>
			<Code language="js" code="import {TimeField} from 'koldy-ui';" />
			<Paragraph>
				TimeField is input component that allows user to enter time in numeric format. By default, component shows hours and minutes, but it
				can show seconds and milliseconds if it's set using <code>precision</code> prop.
			</Paragraph>
			<Paragraph>By default, it looks like this:</Paragraph>
			<Code language="js" code="<TimeField />">
				<TimeField />
			</Code>
			<Paragraph>
				Be aware that the default look depends about the theme and since there are universal theme settings for all input elements, this
				component uses that look as well, except for the width.
			</Paragraph>
			<Props>
				<Props.Prop name="children" type="node" defaultValue="<TimeField.Input/>">
					<Paragraph>
						If you want to create "complex" looking and behaving <code>TimeField</code>, then use children to reconfigure it's inner layout.
						This allows you to put any content before or after the input element itself.
					</Paragraph>
					<Paragraph>There are few components you should use for configuring the layout:</Paragraph>
					<List>
						<List.Item>
							<code>TimeField.Input</code> - standard input component which is used by default, but if yo're making your own inner layout,
							then you have to use this component to tell where input should be
						</List.Item>
						<List.Item>
							<code>TimeField.Text</code> - use this component if you want to place plain text before or after the input component itself;
							this component will take the padding and font size from the input field so it's style and size will be automatically set
						</List.Item>
						<List.Item>
							<code>TimeField.Box</code> - use this component to put more advanced components, like <code>Button</code> or anything else.
							Unlike TimeField.Text which has the component's style, this component has nothing, no margin and no padding, so it's easier to
							position inner component.
						</List.Item>
					</List>
					<Paragraph>Here's an example for putting the text content before the text input:</Paragraph>
					<Code
						language="js"
						code={`
<TimeField>
  <TimeField.Text>enter time</TimeField.Text>
  <TimeField.Input />
</TimeField>
							`}
					>
						<TimeField>
							<TimeField.Text>enter time</TimeField.Text>
							<TimeField.Input />
						</TimeField>
					</Code>
				</Props.Prop>
				<Props.Prop name="name" type="string">
					Name used for forms. If name is set, field's value will be rendered in DOM as <code>&lt;input type="hidden"/&gt;</code> and value
					will be in yyyy-MM-dd HH:mm:ss format. If you want to customize format, then use <code>valueFormat</code> prop, which is a
					function that accepts instance of <code>Date</code> or <code>null</code> as first parameter.
				</Props.Prop>
				<Props.Prop name="value" type="Date">
					<Paragraph>
						If you want to use TimeField as controlled component, then set the <code>value</code> prop. Component will ignore year, month
						and day.
					</Paragraph>
					<Code
						language="js"
						code={`
<TimeField
  value={new Date(Date.parse('2019-01-01 10:45:00'))}
  onChange={({value}) => {
    console.log('New value is', value);
    setDt(value);
  }}
  mt="0.5rem"
  mb="1rem"
/>
					`}
					>
						<TimeField
							value={newYear2019}
							onChange={({value}) => {
								console.log('New value is', value);
								setDt(value);
							}}
							mt="0.5rem"
							mb="1rem"
						/>
					</Code>
				</Props.Prop>
				<Props.Prop name="defaultValue" type={['string', 'number']}>
					<Paragraph>
						If you plan to use TimeField as uncontrolled component, then use <code>defaultValue</code> to set the initial value.
					</Paragraph>
					<Code language="js" code={`<TimeField defaultValue={new Date(Date.parse('2019-01-01 10:45:00'))} />`}>
						<TimeField defaultValue={newYear2019} />
					</Code>
				</Props.Prop>
				<Props.Prop name="valueFormat" type="function">
					<Paragraph>
						<code>valueFormat</code> is function that gets the instance of <code>Date</code> or <code>null</code> for its first parameter
						and it's up to you how do you want to format it. The returned value from that function will be rendered as{' '}
						<code>&lt;input type="hidden" name="field_name" value="function's return value"/&gt;</code>.
					</Paragraph>
					<Paragraph>
						Use the function as opportunity to format the value of the Date. We don't force you to use Moment.js, date-fns or any other date
						and time library, so it's up to you how you want to format your value.
					</Paragraph>
					<Paragraph>
						If this prop is not set, then the date will be rendered as<code>yyyy-MM-dd HH:mm:ss</code>.
					</Paragraph>
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
						<Code language="js" code={`<TimeField variant="${variant}" />`} key={variant} label={variant} labelWidth="auto">
							<TimeField variant={variant} />
						</Code>
					))}
				</Props.Prop>
				<Props.Prop name="onChange" type="function">
					<Paragraph>Called when value has changed. This is required prop when TimeField is used as controlled component.</Paragraph>
					<Paragraph>Called function will get the object as first parameter that has the following keys:</Paragraph>
					<List>
						<List.Item>
							<strong>name</strong>
						</List.Item>
						<List.Item>
							<strong>value</strong> - new <code>Date</code> instance or <code>null</code>
						</List.Item>
						<List.Item>
							<strong>containerElement</strong> - instance of <code>HTMLElement</code>
						</List.Item>
					</List>
					<Paragraph>Check the example and watch your browser's console to see the change.</Paragraph>
					<Code language="js" code={'<TimeField name="onChangeExampleName" onChange={(o) => console.log(o)} />'}>
						<TimeField name="onChangeExampleName" onChange={(o) => console.log(o)} />
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
							<strong>value</strong> - <code>Date</code> instance or <code>null</code>
						</List.Item>
						<List.Item>
							<strong>containerElement</strong> - instance of <code>HTMLElement</code>
						</List.Item>
					</List>
					<Paragraph>Check the example and watch your browser's console to see the change.</Paragraph>
					<Code language="js" code={'<TimeField name="onClickExampleName" onClick={(o) => console.log(o)} />'}>
						<TimeField name="onClickExampleName" onClick={(o) => console.log(o)} />
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
							<strong>value</strong> - <code>Date</code> instance or <code>null</code>
						</List.Item>
						<List.Item>
							<strong>containerElement</strong> - instance of <code>HTMLElement</code>
						</List.Item>
					</List>
					<Paragraph>Check the example and watch your browser's console to see the change.</Paragraph>
					<Code language="js" code={'<TimeField name="onDoubleClickExampleName" onDoubleClick={(o) => console.log(o)} />'}>
						<TimeField name="onDoubleClickExampleName" onDoubleClick={(o) => console.log(o)} />
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
							<strong>value</strong> - <code>Date</code> instance or <code>null</code>
						</List.Item>
						<List.Item>
							<strong>containerElement</strong> - instance of <code>HTMLElement</code>
						</List.Item>
						<List.Item>
							<strong>field</strong> - which field was focused (one of the values: minutes, hours, seconds, milliseconds)
						</List.Item>
					</List>
					<Paragraph>Check the example and watch your browser's console to see the change.</Paragraph>
					<Code language="js" code={'<TimeField name="onFocusExampleName" onFocus={(o) => console.log(o)} />'}>
						<TimeField name="onFocusExampleName" onFocus={(o) => console.log(o)} />
					</Code>
					<Paragraph>Check more complex example:</Paragraph>
					<Code
						language="js"
						code={`
<TimeField name="onFocusExampleName2" onFocus={(o) => console.log(o)}>
  <TimeField.Text>Some content</TimeField.Text>
  <TimeField.Input />
</TimeField>
					`}
					>
						<TimeField name="onFocusExampleName2" onFocus={(o) => console.log(o)}>
							<TimeField.Text>Some content</TimeField.Text>
							<TimeField.Input />
						</TimeField>
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
							<strong>value</strong> - <code>Date</code> instance or <code>null</code>
						</List.Item>
						<List.Item>
							<strong>containerElement</strong> - instance of <code>HTMLElement</code>
						</List.Item>
						<List.Item>
							<strong>field</strong> - which field was focused (one of the values: minutes, hours, seconds, milliseconds)
						</List.Item>
					</List>
					<Paragraph>Check the example and watch your browser's console to see the change.</Paragraph>
					<Code language="js" code={'<TimeField name="onBlurExampleName" onBlur={(o) => console.log(o)} />'}>
						<TimeField name="onBlurExampleName" onBlur={(o) => console.log(o)} />
					</Code>
				</Props.Prop>
				<Props.Prop name="disabled" type="boolean" defaultValue={false}>
					<Paragraph>
						This is standard HTML's <code>disabled</code> attribute.
					</Paragraph>
					<Code language="js" code={'<TimeField name="disabledExample" disabled defaultValue={newYear2019} />'}>
						<TimeField name="disabledExample" disabled defaultValue={newYear2019} />
					</Code>
					<Paragraph>More complex example:</Paragraph>
					<Code
						language="js"
						code={`
<TimeField name="disabledExample2" disabled defaultValue={newYear2019}>
  <TimeField.Text>$</TimeField.Text>
  <TimeField.Input />
</TimeField>
					`}
					>
						<TimeField name="disabledExample2" disabled defaultValue={newYear2019}>
							<TimeField.Text>$</TimeField.Text>
							<TimeField.Input />
						</TimeField>
					</Code>
				</Props.Prop>
				<Props.Prop name="readOnly" type="boolean" defaultValue={false}>
					<Paragraph>
						This is standard HTML's <code>readOnly</code> attribute.
					</Paragraph>
					<Code language="js" code={'<TimeField name="readOnlyExample" defaultValue={newYear2019} readOnly />'}>
						<TimeField name="readOnlyExample" defaultValue={newYear2019} readOnly />
					</Code>
					<Paragraph>More complex example:</Paragraph>
					<Code
						language="js"
						code={`
<TimeField name="readOnlyExample2" defaultValue={newYear2019} readOnly>
  <TimeField.Text>$</TimeField.Text>
  <TimeField.Input />
</TimeField>
					`}
					>
						<TimeField name="readOnlyExample2" defaultValue={newYear2019} readOnly>
							<TimeField.Text>$</TimeField.Text>
							<TimeField.Input />
						</TimeField>
					</Code>
				</Props.Prop>
				<Props.Prop name="precision" type="string" defaultValue="minutes">
					One of the available options:
					{['minutes', 'seconds', 'milliseconds'].map((precision) => (
						<Code
							language="js"
							code={`<TimeField precision="${precision}" width="auto" />`}
							key={precision}
							label={precision}
							labelWidth="auto"
						>
							<TimeField precision={precision} width="auto" />
						</Code>
					))}
				</Props.Prop>
				<Props.Prop name="m" />
				<Props.Prop name="mt" />
				<Props.Prop name="mr" />
				<Props.Prop name="mb" />
				<Props.Prop name="ml" />
			</Props>
			<H2 hash="timefield-input">TimeField.Input</H2>
			<Paragraph>
				Unlike other <em>Input</em> subcomponents, this one doesn't accept any prop.
			</Paragraph>
			<TextDocs component="TimeField" />
			<Code
				language="js"
				code={`
<TimeField>
  <TimeField.Text>Look</TimeField.Text>
  <TimeField.Input />
  <TimeField.Text>Go</TimeField.Text>
</TimeField>
					`}
				label="Example for TimeField.Text:"
			>
				<TimeField>
					<TimeField.Text>Look</TimeField.Text>
					<TimeField.Input />
					<TimeField.Text>Go</TimeField.Text>
				</TimeField>
			</Code>
			<BoxDocs component="TimeField" />
			<Code
				language="js"
				code={`
<TimeField>
  <TimeField.Box alignSelf="stretch">
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
  </TimeField.Box>
  <TimeField.Input />
</TimeField>
					`}
				label="Example for TimeField.Box:"
			>
				<TimeField>
					<TimeField.Box alignSelf="stretch">
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
					</TimeField.Box>
					<TimeField.Input />
				</TimeField>
			</Code>
			<H2 hash="color">Color</H2>
			<Paragraph>
				Here are examples of all variants, its color and other states, like <code>disabled</code> and <code>readOnly</code>.
			</Paragraph>
			{Object.keys(variants).map((variant) => (
				<Fragment key={variant}>
					<Paragraph>Variant: {variant}</Paragraph>
					{Object.keys(colors).map((color) => (
						<Code
							language="js"
							code={`
<TimeField width="auto" variant="${variant}" precision="seconds" color="${color}" />
<TimeField width="auto" variant="${variant}" precision="seconds" color="${color}" ml={10} disabled defaultValue={new Date(Date.parse('2019-01-01 10:45:00'))} />
<TimeField width="auto" variant="${variant}" precision="seconds" color="${color}" ml={10} readOnly defaultValue={new Date(Date.parse('2019-01-01 10:45:00'))} />
						`}
							key={`${variant}_${color}`}
							label={color}
							labelWidth="auto"
						>
							<TimeField width="auto" variant={variant} precision="seconds" color={color} />
							<TimeField width="auto" variant={variant} precision="seconds" color={color} ml={10} disabled defaultValue={newYear2019} />
							<TimeField width="auto" variant={variant} precision="seconds" color={color} ml={10} readOnly defaultValue={newYear2019} />
						</Code>
					))}
				</Fragment>
			))}
			<H2 hash="size">Size</H2>
			<Paragraph>
				Size can only be set in theme. Don't mix this prop with the <code>width</code> prop, size tells how big the component is (font size,
				padding and etc).
			</Paragraph>
			<AvailableKeys data={sizes} />
			{Object.keys(sizes).map((t) => (
				<Code language="js" code={`<TimeField size="${t}" />`} key={t} label={t} labelWidth="auto">
					<TimeField size={t} />
				</Code>
			))}
		</>
	);
}
