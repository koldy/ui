import React, {useContext, useState} from 'react';
import format from 'date-fns/format';

import ThemeContext from '../../theme/ThemeContext';

import DateInput from './DateInput';
import Props from '../../../docs/components/Props';
import AvailableKeys from '../../../docs/components/AvailableKeys';
import Text from '../Text/Text';
import H1 from '../../../docs/components/H1';
import Code from '../../../docs/components/Code';
import H2 from '../../../docs/components/H2';
import Paragraph from '../../../docs/components/Paragraph';
import List from '../../../docs/components/List';
import TextDocs from '../InputField/Text.docs';
import Button from '../Button/Button';
import isValid from 'date-fns/isValid';

export const title = 'DateInput';
export const route = '/date-input';
export const json = 'inputField';

const displayValue = function ({value}) {
	return format(value, 'dd.MM.yyyy');
};

const inputParser = function ({value}) {
	if (!value) {
		return null;
	}

	if (typeof value === 'string') {
		// dd.MM.yyyy
		const parts = value.split('.').map((el) => el.trim());
		if (parts.length >= 3 && parts.length <= 4) {
			// check if all strings are integers
			for (let i = 0; i < parts.length; i += 1) {
				if (Number.isNaN(parseInt(parts[i], 10))) {
					return null;
				}
			}

			if (parts[2].length !== 4) {
				return null;
			}

			// if we're here, then we're all good, probably
			const dt = new Date(Date.parse(`${parts[2]}-${parts[1]}-${parts[0]}`));

			if (isValid(dt)) {
				return dt;
			}
		}
	}

	return null;
};

const date = new Date(Date.parse('2020-06-08'));

export default function DateInputDocs() {
	const {theme} = useContext(ThemeContext);
	const [val, setVal] = useState(date);

	const sizes = theme.json('inputField.size');
	const colors = theme.json('inputField.color');
	const variants = theme.json('inputField.variant');
	const widths = theme.json('inputField.width');

	return (
		<>
			<H1>DateInput (unstable)</H1>
			<Code language="js" code="import {DateInput} from 'koldy-ui';" />
			<Code language="js" code={'<Text as="label">The label <DateInput /></Text>'}>
				<Text as="label">
					The label <DateInput />
				</Text>
			</Code>
			<Paragraph>
				<code>DateInput</code> component is standard HTML input element with some advanced features which will be explained later. Check the
				props and check the examples for the usage.
			</Paragraph>
			<Paragraph>
				Although this component looks really simple, look closely and you'll see that it's possible to combine any of the components you
				already saw in other UI libraries, such as "search button with text field", or any other content that might be useful to put within
				the <code>DateInput</code>.
			</Paragraph>

			<Props>
				<Props.Prop name="children" type="node" defaultValue="<DateInput.Input/>">
					<Paragraph>
						If you want to create "complex" looking and behaving <code>DateInput</code>, then use children to reconfigure it's inner layout.
						This allows you to put any content before or after the input element itself. If nothing is set, then standard HTML input will be
						used.
					</Paragraph>
					<Paragraph>There are few components you should use for configuring the layout:</Paragraph>
					<List>
						<List.Item>
							<code>DateInput.Input</code> - standard input component which is used by default, but if yo're making your own inner layout,
							then you have to use this component to tell where input should be
						</List.Item>
						<List.Item>
							<code>DateInput.Text</code> - use this component if you want to place plain text before or after the input component itself;
							this component will take the padding and font size from the input field so it's style and size will be automatically set
						</List.Item>
						<List.Item>
							<code>DateInput.Box</code> - use this component to put more advanced components, like <code>Button</code> or anything else.
							Unlike DateInput.Text which has the component's style, this component has nothing, no margin and no padding, so it's easier to
							position inner component.
						</List.Item>
					</List>
					<Paragraph>Here's an example for putting the dollar sign before the text input:</Paragraph>
					<Code
						language="js"
						code={`
<DateInput>
	<DateInput.Text>$</DateInput.Text>
	<DateInput.Input />
</DateInput>
								`}
					>
						<DateInput>
							<DateInput.Text>$</DateInput.Text>
							<DateInput.Input />
						</DateInput>
					</Code>
				</Props.Prop>
				<Props.Prop name="name" type="string">
					Name used for forms.
				</Props.Prop>
				<Props.Prop name="value" type="Date">
					<Paragraph>
						If you want to use DateInput as controlled component, then set the <code>value</code> prop.
					</Paragraph>
					<Code
						language="js"
						code={"<DateInput value={new Date(Date.parse('2020-06-08'))} onChange={({value}) => console.log('New value is', value)} />"}
					>
						<DateInput value={date} onChange={({value}) => console.log('New value is', value)} />
					</Code>
					<Paragraph>Fully controlled component:</Paragraph>
					<Code
						language="js"
						code={`
const [val, setVal] = useState(new Date(Date.parse('2020-06-08')));
<DateInput value={val} onChange={({value}) => setVal(value)} />
						`}
					>
						<DateInput value={val} onChange={({value}) => setVal(value)} />
					</Code>
				</Props.Prop>
				<Props.Prop name="defaultValue" type="Date">
					<Paragraph>
						If you plan to use DateInput as uncontrolled component, then use <code>defaultValue</code> to set the initial value.
					</Paragraph>
					<Code language="js" code={'<DateInput name="date" defaultValue={new Date(Date.parse(\'2020-06-08\'))} />'}>
						<DateInput name="date" defaultValue={date} />
					</Code>
				</Props.Prop>
				<Props.Prop name="valueFormat" type="func">
					<Paragraph>
						Value format gives you ability to put the custom value in the DOM as hidden value so you can customize what you'd like to get on
						your backend. If you don't provide this function, then value in the DOM will be in <code>yyyy-MM-dd</code> format.
					</Paragraph>
					<Paragraph>Function arguments:</Paragraph>
					<List>
						<List.Item>
							first argument - object with keys:
							<List>
								<List.Item>
									<code>value</code> - Javascript's instance of <code>Date</code> or <code>null</code> or falsy instance of{' '}
									<code>Date</code>
								</List.Item>
							</List>
						</List.Item>
					</List>
				</Props.Prop>
				<Props.Prop name="displayValue" type="func">
					<Paragraph>
						Display format gives you ability to format the text in text field so you can customize what user will see. If you don't provide
						this function, then value in the field will be in <code>yyyy-MM-dd</code> format.
					</Paragraph>
					<Paragraph>Function arguments:</Paragraph>
					<List>
						<List.Item>
							first argument - object with keys:
							<List>
								<List.Item>
									<code>value</code> - Javascript's instance of <code>Date</code> or <code>null</code> or falsy instance of{' '}
									<code>Date</code>
								</List.Item>
							</List>
						</List.Item>
					</List>
				</Props.Prop>
				<Props.Prop name="inputParser" type="func">
					<Paragraph>
						This function gives you ability to make custom parser of the text in text field. This function will be used after every change
						in the text field. Returned value should be <code>null</code> or Javascript's instance of <code>Date</code>. When Date is
						returned, DateInput will know the new date value.
					</Paragraph>
					<Paragraph>Function arguments:</Paragraph>
					<List>
						<List.Item>
							first argument - object with keys:
							<List>
								<List.Item>
									<code>value</code> - the actual string from the text field
								</List.Item>
								<List.Item>
									<code>minDate</code> - a prop passed to <code>DateInput</code>
								</List.Item>
								<List.Item>
									<code>maxDate</code> - a prop passed to <code>DateInput</code>
								</List.Item>
								<List.Item>
									<code>element</code> - a <code>HTMLElement</code> of the input field you can use to eventually modify the input (for
									example, user enters two digits and you add <code>/</code> (slash) after that)
								</List.Item>
							</List>
						</List.Item>
					</List>
					<Paragraph>Example: enter date in dd.MM.yyyy format:</Paragraph>
					<DateInput width={180} inputParser={inputParser} displayValue={displayValue} placeholder="dd.MM.yyyy" />
				</Props.Prop>
				<Props.Prop name="minDate" type="Date" defaultValue="last 100 years">
					<Paragraph>
						Passed to <code>DatePicker</code>. If set, it won't be possible to select date lower than this date. In this example, min date
						is set to today. If user enters date before than <code>minDate</code>, then <code>inputParser</code> function should return the
						minimum date.
					</Paragraph>
					<Code language="js" code={`<DateInput minDate={new Date()} />`}>
						<DateInput minDate={new Date()} />
					</Code>
				</Props.Prop>
				<Props.Prop name="maxDate" type="Date" defaultValue="next 100 years">
					<Paragraph>
						Passed to <code>DatePicker</code>. If set, it won't be possible to select date greater than this date. In this example, min date
						is set to today. If user enters date after than <code>maxDate</code>, then <code>inputParser</code> function should return the
						maximum date.
					</Paragraph>
					<Code language="js" code={`<DateInput maxDate={new Date()} />`}>
						<DateInput maxDate={new Date()} />
					</Code>
				</Props.Prop>
				<Props.Prop name="placeholder" type={['string', 'number']}>
					<Paragraph>Standard placeholder attribute.</Paragraph>
					<DateInput placeholder="I'm placeholder..." width="50%" />
					<Paragraph>&nbsp;</Paragraph>
					<Paragraph>More complex example:</Paragraph>
					<Code
						language="js"
						code={`
			<DateInput placeholder="I'm placeholder..." width="50%">
			  <DateInput.Text>$</DateInput.Text>
			  <DateInput.Input />
			</DateInput>
								`}
					>
						<DateInput placeholder="I'm placeholder..." width="50%">
							<DateInput.Text>$</DateInput.Text>
							<DateInput.Input />
						</DateInput>
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
						<Code language="js" code={`<DateInput variant="${variant}" />`} key={variant} label={variant} labelWidth="auto">
							<DateInput variant={variant} />
						</Code>
					))}
				</Props.Prop>
				<Props.Prop name="width" type="string" defaultValue="theme.inputField.defaults.width">
					<Paragraph>
						Use one of the keys set in <code>theme.inputField.width</code> or set your own fixed width.
					</Paragraph>
					<AvailableKeys data={widths} name="theme.inputField.width" />
					<Paragraph>Example of fixed with of 75%</Paragraph>
					<Code language="js" code={'<DateInput width="75%" />'}>
						<DateInput width="75%" />
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
				<Props.Prop name="verticalAlign" type={['string', 'number']} defaultValue="middle">
					Standard CSS value for vertical-align. It will be applied to the input's container. By default, it's <code>middle</code>
					so you can place multiple input components inline.
				</Props.Prop>
				<Props.Prop name="onChange" type="function">
					<Paragraph>Called when value has changed. This is required prop when DateInput is used as controlled component.</Paragraph>
					<Paragraph>Called function will get the object as first parameter that has the following keys:</Paragraph>
					<List>
						<List.Item>
							<strong>name</strong>
						</List.Item>
						<List.Item>
							<strong>value</strong> - new instance of Date
						</List.Item>
						<List.Item>
							<strong>valueString</strong> - new value in string format - value that is seen by the user
						</List.Item>
						<List.Item>
							<strong>element</strong> - instance of <code>HTMLElement</code>
						</List.Item>
					</List>
					<Paragraph>Check the example and watch your browser's console to see the change.</Paragraph>
					<Code language="js" code={'<DateInput name="onChangeExampleName" onChange={(o) => console.log(o)} />'}>
						<DateInput name="onChangeExampleName" onChange={(o) => console.log(o)} />
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
							<strong>value</strong> - new instance of Date
						</List.Item>
						<List.Item>
							<strong>valueString</strong> - new value in string format - value that is seen by the user
						</List.Item>
						<List.Item>
							<strong>element</strong> - instance of <code>HTMLElement</code>
						</List.Item>
					</List>
					<Paragraph>Check the example and watch your browser's console to see the change.</Paragraph>
					<Code language="js" code={'<DateInput name="onInputExampleName" onInput={({name, value}) => console.log(name, value)} />'}>
						<DateInput name="onInputExampleName" onInput={({name, value}) => console.log(name, value)} />
					</Code>
				</Props.Prop>
				<Props.Prop name="inputDelay" type="number" defaultValue={300}>
					<Paragraph>
						To set the delay for <code>onInput</code>, use this prop.
					</Paragraph>
					<Paragraph>Check the example with input delay of 1000 (1 second) and watch your browser's console to see the change.</Paragraph>
					<Code
						language="js"
						code={'<DateInput name="onInputDelayExample" onInput={({name, value}) => console.log(name, value)} inputDelay={1000} />'}
					>
						<DateInput name="onInputDelayExample" onInput={({name, value}) => console.log(name, value)} inputDelay={1000} />
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
					<Code language="js" code={'<DateInput name="onClickExampleName" onClick={(o) => console.log(o)} />'}>
						<DateInput name="onClickExampleName" onClick={(o) => console.log(o)} />
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
					<Code language="js" code={'<DateInput name="onDoubleClickExampleName" onDoubleClick={(o) => console.log(o)} />'}>
						<DateInput name="onDoubleClickExampleName" onDoubleClick={(o) => console.log(o)} />
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
					<Code language="js" code={'<DateInput name="onFocusExampleName" onFocus={(o) => console.log(o)} />'}>
						<DateInput name="onFocusExampleName" onFocus={(o) => console.log(o)} />
					</Code>
					<Paragraph>Check more complex example:</Paragraph>
					<Code
						language="js"
						code={`
			<DateInput name="onFocusExampleName2" onFocus={(o) => console.log(o)}>
			  <DateInput.Text>Click me here</DateInput.Text>
			  <DateInput.Input />
			</DateInput>
								`}
					>
						<DateInput name="onFocusExampleName2" onFocus={(o) => console.log(o)}>
							<DateInput.Text>Click me here</DateInput.Text>
							<DateInput.Input />
						</DateInput>
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
					<Code language="js" code={'<DateInput name="onBlurExampleName" onBlur={(o) => console.log(o)} />'}>
						<DateInput name="onBlurExampleName" onBlur={(o) => console.log(o)} />
					</Code>
				</Props.Prop>
				<Props.Prop name="disabled" type="boolean" defaultValue={false}>
					<Paragraph>
						This is standard HTML's <code>disabled</code> attribute.
					</Paragraph>
					<Code language="js" code={'<DateInput name="disabledExample" disabled />'}>
						<DateInput name="disabledExample" disabled />
					</Code>
					<Paragraph>More complex example:</Paragraph>
					<Code
						language="js"
						code={`
			<DateInput name="disabledExample2" disabled>
			  <DateInput.Text>Enter date</DateInput.Text>
			  <DateInput.Input />
			</DateInput>
								`}
					>
						<DateInput name="disabledExample2" disabled>
							<DateInput.Text>Enter date</DateInput.Text>
							<DateInput.Input />
						</DateInput>
					</Code>
				</Props.Prop>
				<Props.Prop name="readOnly" type="boolean" defaultValue={false}>
					<Paragraph>
						This is standard HTML's <code>readOnly</code> attribute.
					</Paragraph>
					<Code language="js" code={'<DateInput name="readOnlyExample" defaultValue={new Date(Date.parse(\'2020-06-08\'))} readOnly />'}>
						<DateInput name="readOnlyExample" defaultValue={new Date(Date.parse('2020-06-08'))} readOnly />
					</Code>
					<Paragraph>More complex example:</Paragraph>
					<Code
						language="js"
						code={`
			<DateInput name="readOnlyExample2" defaultValue={new Date(Date.parse('2020-06-08'))} readOnly>
			  <DateInput.Text>$</DateInput.Text>
			  <DateInput.Input />
			</DateInput>
								`}
					>
						<DateInput name="readOnlyExample2" defaultValue={new Date(Date.parse('2020-06-08'))} readOnly>
							<DateInput.Text>$</DateInput.Text>
							<DateInput.Input />
						</DateInput>
					</Code>
				</Props.Prop>
				<Props.Prop name="m" />
				<Props.Prop name="mt" />
				<Props.Prop name="mr" />
				<Props.Prop name="mb" />
				<Props.Prop name="ml" />
				<Props.Prop name="ref" />
			</Props>
			<Props title="Props for DateInput.Input" hash="DateInput-input-props">
				<Props.Prop name="flex" type={['string', 'number']}>
					All elements within the text field's container are aligned with <code>inline-flex</code>, so if you want to provide custom width
					or relative width, you may use this prop. This is standard CSS <code>flex</code> property.
				</Props.Prop>
				<Props.Prop name="width" type={['string', 'number']}>
					If you want to set custom width on the content's width, then use this prop.
				</Props.Prop>
			</Props>
			<TextDocs component="DateInput" />
			<Code
				language="js"
				code={`
			<DateInput>
			  <DateInput.Text>Look</DateInput.Text>
			  <DateInput.Input />
			  <DateInput.Text>Go</DateInput.Text>
			</DateInput>
								`}
				label="Example for DateInput.Text:"
			>
				<DateInput>
					<DateInput.Text>Look</DateInput.Text>
					<DateInput.Input />
					<DateInput.Text>Go</DateInput.Text>
				</DateInput>
			</Code>
			<Props title="Props for DateInput.Box" hash="DateInput-box-props">
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
			<DateInput>
			  <DateInput.Box alignSelf="stretch">
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
			  </DateInput.Box>
			  <DateInput.Input />
			</DateInput>
			<DateInput ml="1rem">
			  <DateInput.Input />
			  <DateInput.Box>
			    <Button>Do something</Button>
			  </DateInput.Box>
			</DateInput>
								`}
				label="Example for DateInput.Box:"
			>
				<DateInput>
					<DateInput.Box alignSelf="stretch">
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
					</DateInput.Box>
					<DateInput.Input />
				</DateInput>
				<DateInput ml="1rem">
					<DateInput.Input />
					<DateInput.Box>
						<Button>Do something</Button>
					</DateInput.Box>
				</DateInput>
			</Code>
			<H2 hash="size">Size</H2>
			<Paragraph>
				Size can only be set in theme. Don't mix this prop with the <code>width</code> prop, size tells how big the component is (font size,
				padding and etc).
			</Paragraph>
			<AvailableKeys data={sizes} />
			{Object.keys(sizes).map((t) => (
				<Code language="js" code={`<DateInput size="${t}" />`} key={t} label={t} labelWidth="auto">
					<DateInput size={t} />
				</Code>
			))}
			<H2 hash="width">Width</H2>
			<Paragraph>It is possible to predefine width in the theme, so you can have one place from where you control the width.</Paragraph>
			<AvailableKeys data={widths} />
			{Object.keys(widths).map((t) => (
				<Code language="js" code={`<DateInput width="${t}" />`} key={t} label={t} labelWidth="auto">
					<DateInput width={t} />
				</Code>
			))}
		</>
	);
}
