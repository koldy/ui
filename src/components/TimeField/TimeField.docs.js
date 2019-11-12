import React, {Fragment, useContext, useState, useCallback} from 'react';

import ThemeContext from '../../theme/ThemeContext';

import ImportComponent from '../../../docs/components/ImportComponent';
import DocsTitle from '../../../docs/components/DocsTitle';
import TimeField from './TimeField';
import DocsCode from '../../../docs/components/DocsCode';
import DocsText from '../../../docs/components/DocsText';
import Props from '../../../docs/components/Props';
import AvailableKeys from '../../../docs/components/AvailableKeys';
import DocsSubTitle from '../../../docs/components/DocsSubTitle';
import TextDocs from '../InputField/Text.docs';
import BoxDocs from '../InputField/Box.docs';

export const title = 'TimeField';
export const slug = 'time-field';
export const json = 'inputField';

const newYear2019 = new Date(Date.parse('2019-01-01 10:45:00'));

export const Documentation = function() {
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
			<DocsTitle hash="timeField">TimeField</DocsTitle>
			<ImportComponent name="TimeField" />
			<DocsText>
				TimeField is input component that allows user to enter time in numeric format. By default, component shows hours
				and minutes, but it can show seconds and milliseconds if it's set using <code>precision</code> prop.
			</DocsText>
			<DocsText>By default, it looks like this:</DocsText>
			<DocsCode>
				<DocsCode.Example>
					<TimeField />
				</DocsCode.Example>
				<DocsCode.Code>{'<TimeField />'}</DocsCode.Code>
			</DocsCode>
			<DocsText>
				Be aware that the default look depends about the theme and since there are universal theme settings for all
				input elements, this component uses that look as well, except for the width.
			</DocsText>
			<Props>
				<Props.Prop name="children" type="node" defaultValue="<TimeField.Input/>">
					<p>
						If you want to create "complex" looking and behaving <code>TimeField</code>, then use children to
						reconfigure it's inner layout. This allows you to put any content before or after the input element itself.
					</p>
					<p>There are few components you should use for configuring the layout:</p>
					<ul>
						<li>
							<code>TimeField.Input</code> - standard input component which is used by default, but if yo're making your
							own inner layout, then you have to use this component to tell where input should be
						</li>
						<li>
							<code>TimeField.Text</code> - use this component if you want to place plain text before or after the input
							component itself; this component will take the padding and font size from the input field so it's style
							and size will be automatically set
						</li>
						<li>
							<code>TimeField.Box</code> - use this component to put more advanced components, like <code>Button</code>{' '}
							or anything else. Unlike TimeField.Text which has the component's style, this component has nothing, no
							margin and no padding, so it's easier to position inner component.
						</li>
					</ul>
					<p>Here's an example for putting the text content before the text input:</p>
					<DocsCode>
						<DocsCode.Example>
							<TimeField>
								<TimeField.Text>enter time</TimeField.Text>
								<TimeField.Input />
							</TimeField>
						</DocsCode.Example>
						<DocsCode.Code>
							{`
							<TimeField>
								<TimeField.Text>enter time</TimeField.Text>
								<TimeField.Input />
							</TimeField>
							`}
						</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="name" type="string">
					Name used for forms. If name is set, field's value will be rendered in DOM as{' '}
					<code>&lt;input type="hidden"/&gt;</code> and value will be in yyyy-MM-dd HH:mm:ss format. If you want to
					customize format, then use <code>valueFormat</code> prop, which is a function that accepts instance of{' '}
					<code>Date</code> or <code>null</code> as first parameter.
				</Props.Prop>
				<Props.Prop name="value" type="Date">
					<p>
						If you want to use TimeField as controlled component, then set the <code>value</code> prop. Component will
						ignore year, month and day.
					</p>
					<TimeField
						value={newYear2019}
						onChange={({value}) => {
							console.log('New value is', value);
							setDt(value);
						}}
						mt="0.5rem"
						mb="1rem"
					/>
				</Props.Prop>
				<Props.Prop name="defaultValue" type={['string', 'number']}>
					<p>
						If you plan to use TimeField as uncontrolled component, then use <code>defaultValue</code> to set the
						initial value.
					</p>
					<TimeField defaultValue={newYear2019} />
				</Props.Prop>
				<Props.Prop name="valueFormat" type="function">
					<p>
						<code>valueFormat</code> is function that gets the instance of <code>Date</code> or <code>null</code> for
						its first parameter and it's up to you how do you want to format it. The returned value from that function
						will be rendered as{' '}
						<code>&lt;input type="hidden" name="field_name" value="function's return value"/&gt;</code>.
					</p>
					<p>
						Use the function as opportunity to format the value of the Date. We don't force you to use Moment.js,
						date-fns or any other date and time library, so it's up to you how you want to format your value.
					</p>
					<p>
						If this prop is not set, then the date will be rendered as<code>yyyy-MM-dd HH:mm:ss</code>.
					</p>
				</Props.Prop>
				<Props.Prop name="color" type="string" defaultValue="theme.inputField.defaults.color">
					<p>
						Use one of the keys set in <code>theme.inputField.color</code>.
					</p>
					<AvailableKeys data={colors} name="theme.inputField.color" />
				</Props.Prop>
				<Props.Prop name="size" type="string" defaultValue="theme.inputField.defaults.size">
					<p>
						Use one of the keys set in <code>theme.inputField.size</code>.
					</p>
					<AvailableKeys data={sizes} name="theme.inputField.size" />
				</Props.Prop>
				<Props.Prop name="variant" type="string" defaultValue="theme.inputField.defaults.variant">
					<p>
						Use one of the keys set in <code>theme.inputField.variant</code>. Possible variants in current theme are:
					</p>
					{Object.keys(variants).map((variant) => (
						<DocsCode key={variant} label={variant} labelWidth="auto">
							<DocsCode.Example>
								<TimeField variant={variant} />
							</DocsCode.Example>
						</DocsCode>
					))}
				</Props.Prop>
				<Props.Prop name="onChange" type="function">
					<p>Called when value has changed. This is required prop when TimeField is used as controlled component.</p>
					<p>Called function will get the object as first parameter that has the following keys:</p>
					<ul>
						<li>
							<strong>name</strong>
						</li>
						<li>
							<strong>value</strong> - new <code>Date</code> instance or <code>null</code>
						</li>
						<li>
							<strong>containerElement</strong> - instance of <code>HTMLElement</code>
						</li>
					</ul>
					<p>Check the example and watch your browser's console to see the change.</p>
					<TimeField name="onChangeExampleName" onChange={(o) => console.log(o)} />
				</Props.Prop>
				<Props.Prop name="onClick" type="function">
					<p>Called when the component is clicked on.</p>
					<p>Called function will get the object as first parameter that has the following keys:</p>
					<ul>
						<li>
							<strong>name</strong>
						</li>
						<li>
							<strong>value</strong> - <code>Date</code> instance or <code>null</code>
						</li>
						<li>
							<strong>containerElement</strong> - instance of <code>HTMLElement</code>
						</li>
					</ul>
					<p>Check the example and watch your browser's console to see the change.</p>
					<TimeField name="onClickExampleName" onClick={(o) => console.log(o)} />
				</Props.Prop>
				<Props.Prop name="onDoubleClick" type="function">
					<p>Called when the component is double clicked on.</p>
					<p>Called function will get the object as first parameter that has the following keys:</p>
					<ul>
						<li>
							<strong>name</strong>
						</li>
						<li>
							<strong>value</strong> - <code>Date</code> instance or <code>null</code>
						</li>
						<li>
							<strong>containerElement</strong> - instance of <code>HTMLElement</code>
						</li>
					</ul>
					<p>Check the example and watch your browser's console to see the change.</p>
					<TimeField name="onDoubleClickExampleName" onDoubleClick={(o) => console.log(o)} />
				</Props.Prop>
				<Props.Prop name="onFocus" type="function">
					<p>Called when the component is focused.</p>
					<p>Called function will get the object as first parameter that has the following keys:</p>
					<ul>
						<li>
							<strong>name</strong>
						</li>
						<li>
							<strong>value</strong> - <code>Date</code> instance or <code>null</code>
						</li>
						<li>
							<strong>containerElement</strong> - instance of <code>HTMLElement</code>
						</li>
						<li>
							<strong>field</strong> - which field was focused (one of the values: minutes, hours, seconds,
							milliseconds)
						</li>
					</ul>
					<p>Check the example and watch your browser's console to see the change.</p>
					<TimeField name="onFocusExampleName" onFocus={(o) => console.log(o)} />
					<p>Check more complex example:</p>
					<TimeField name="onFocusExampleName2" onFocus={(o) => console.log(o)}>
						<TimeField.Text>Some content</TimeField.Text>
						<TimeField.Input />
					</TimeField>
				</Props.Prop>
				<Props.Prop name="onBlur" type="function">
					<p>Called when the component is blurred.</p>
					<p>Called function will get the object as first parameter that has the following keys:</p>
					<ul>
						<li>
							<strong>name</strong>
						</li>
						<li>
							<strong>value</strong> - <code>Date</code> instance or <code>null</code>
						</li>
						<li>
							<strong>containerElement</strong> - instance of <code>HTMLElement</code>
						</li>
						<li>
							<strong>field</strong> - which field was focused (one of the values: minutes, hours, seconds,
							milliseconds)
						</li>
					</ul>
					<p>Check the example and watch your browser's console to see the change.</p>
					<TimeField name="onBlurExampleName" onBlur={(o) => console.log(o)} />
				</Props.Prop>
				<Props.Prop name="disabled" type="boolean" defaultValue={false}>
					<p>
						This is standard HTML's <code>disabled</code> attribute.
					</p>
					<TimeField name="disabledExample" disabled defaultValue={newYear2019} />
					<p>More complex example:</p>
					<TimeField name="disabledExample2" disabled defaultValue={newYear2019}>
						<TimeField.Text>$</TimeField.Text>
						<TimeField.Input />
					</TimeField>
				</Props.Prop>
				<Props.Prop name="readOnly" type="boolean" defaultValue={false}>
					<p>
						This is standard HTML's <code>readOnly</code> attribute.
					</p>
					<TimeField name="readOnlyExample" defaultValue={newYear2019} readOnly />
					<p>More complex example:</p>
					<TimeField name="readOnlyExample2" defaultValue={newYear2019} readOnly>
						<TimeField.Text>$</TimeField.Text>
						<TimeField.Input />
					</TimeField>
				</Props.Prop>
				<Props.Prop name="precision" type="string" defaultValue="minutes">
					One of the available options:
					{['minutes', 'seconds', 'milliseconds'].map((precision) => (
						<DocsCode key={precision} label={precision} labelWidth="auto">
							<DocsCode.Example>
								<TimeField precision={precision} width="auto" />
							</DocsCode.Example>
							<DocsCode.Code>{`<TimeField precision="${precision}" width="auto" />`}</DocsCode.Code>
						</DocsCode>
					))}
				</Props.Prop>
				<Props.Prop name="m" />
				<Props.Prop name="mt" />
				<Props.Prop name="mr" />
				<Props.Prop name="mb" />
				<Props.Prop name="ml" />
			</Props>
			<DocsSubTitle hash="timefield-input">TimeField.Input</DocsSubTitle>
			<DocsText>
				Unlike other <em>Input</em> subcomponents, this one doesn't accept any prop.
			</DocsText>
			<TextDocs component="TimeField" />
			<DocsCode label="Example for TimeField.Text:">
				<DocsCode.Example>
					<TimeField>
						<TimeField.Text>Look</TimeField.Text>
						<TimeField.Input />
						<TimeField.Text>Go</TimeField.Text>
					</TimeField>
				</DocsCode.Example>
				<DocsCode.Code>
					{`
					<TimeField>
						<TimeField.Text>Look</TimeField.Text>
						<TimeField.Input />
						<TimeField.Text>Go</TimeField.Text>
					</TimeField>
					`}
				</DocsCode.Code>
			</DocsCode>
			<BoxDocs component="TimeField" />
			<DocsCode label="Example for TimeField.Box:">
				<DocsCode.Example>
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
				</DocsCode.Example>
				<DocsCode.Code>
					{`
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
				</DocsCode.Code>
			</DocsCode>
			<DocsSubTitle hash="color">Color</DocsSubTitle>
			<DocsText>
				Here are examples of all variants, its color and other states, like <code>disabled</code> and{' '}
				<code>readOnly</code>.
			</DocsText>
			{Object.keys(variants).map((variant) => (
				<Fragment key={variant}>
					<DocsText>Variant: {variant}</DocsText>
					{Object.keys(colors).map((color) => (
						<DocsCode key={`${variant}_${color}`} label={color} labelWidth="auto">
							<DocsCode.Example>
								<TimeField width="auto" variant={variant} precision="seconds" color={color} />
								<TimeField
									width="auto"
									variant={variant}
									precision="seconds"
									color={color}
									ml={10}
									disabled
									defaultValue={newYear2019}
								/>
								<TimeField
									width="auto"
									variant={variant}
									precision="seconds"
									color={color}
									ml={10}
									readOnly
									defaultValue={newYear2019}
								/>
							</DocsCode.Example>
						</DocsCode>
					))}
				</Fragment>
			))}
			<DocsSubTitle hash="size">Size</DocsSubTitle>
			<DocsText>
				Size can only be set in theme. Don't mix this prop with the <code>width</code> prop, size tells how big the
				component is (font size, padding and etc).
			</DocsText>
			<DocsText>
				<AvailableKeys data={sizes} />
			</DocsText>
			{Object.keys(sizes).map((t) => (
				<DocsCode key={t} label={t} labelWidth="auto">
					<DocsCode.Example>
						<TimeField size={t} />
					</DocsCode.Example>
				</DocsCode>
			))}
		</>
	);
};
