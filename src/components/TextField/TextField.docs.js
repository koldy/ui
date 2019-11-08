import React, {Fragment, useContext} from 'react';
import DocsTitle from '../../../docs/components/DocsTitle';

import ThemeContext from '../../theme/ThemeContext';

import ImportComponent from '../../../docs/components/ImportComponent';
import TextField from './TextField';
import DocsCode from '../../../docs/components/DocsCode';
import DocsText from '../../../docs/components/DocsText';
import Props from '../../../docs/components/Props';
import AvailableKeys from '../../../docs/components/AvailableKeys';
import Text from '../Text/Text';
import DocsSubTitle from '../../../docs/components/DocsSubTitle';

export const title = 'TextField';
export const slug = 'text-field';
export const json = 'inputField';

const types = [
	'text',
	'password',
	'tel',
	'email',
	'search',
	'number',
	'url',
	'date',
	'datetime-local',
	'month',
	'time',
	'week',
	'color'
];

export const Documentation = function() {
	const {theme} = useContext(ThemeContext);

	const sizes = theme.json('inputField.size');
	const colors = theme.json('inputField.color');
	const variants = theme.json('inputField.variant');
	const widths = theme.json('inputField.width');

	return (
		<>
			<DocsTitle hash="textField">TextField</DocsTitle>
			<ImportComponent name="TextField" />
			<DocsCode>
				<DocsCode.Example>
					<Text as="label">
						The label <TextField />
					</Text>
				</DocsCode.Example>
				<DocsCode.Code>
					{`
					<Text as="label">
						The label <TextField />
					</Text>					
					`}
				</DocsCode.Code>
			</DocsCode>
			<DocsText>
				<code>TextField</code> component is standard HTML input element with some advanced features which will be
				explained later. Check the props and check the examples for the usage.
			</DocsText>
			<DocsText>
				Although this component looks really simple, look closely and you'll see that it's possible to combine any of
				the components you already saw in other UI libraries, such as "search button with text field", or any other
				content that might be useful to put within the <code>TextField</code>.
			</DocsText>

			<Props>
				<Props.Prop name="children" type="node" defaultValue="<TextField.Input/>">
					<p>
						If you want to create "complex" looking and behaving <code>TextField</code>, then use children to
						reconfigure it's inner layout. This allows you to put any content before or after the input element itself.
						If nothing is set, then standard HTML input will be used.
					</p>
					<p>There are few components you should use for configuring the layout:</p>
					<ul>
						<li>
							<code>TextField.Input</code> - standard input component which is used by default, but if yo're making your
							own inner layout, then you have to use this component to tell where input should be
						</li>
						<li>
							<code>TextField.Text</code> - use this component if you want to place plain text before or after the input
							component itself; this component will take the padding and font size from the input field so it's style
							and size will be automatically set
						</li>
						<li>
							<code>TextField.Box</code> - use this component to put more advanced components, like <code>Button</code>{' '}
							or anything else. Unlike TextField.Text which has the component's style, this component has nothing, no
							margin and no padding, so it's easier to position inner component.
						</li>
					</ul>
					<p>Here's an example for putting the dollar sign before the text input:</p>
					<DocsCode>
						<DocsCode.Example>
							<TextField>
								<TextField.Text>$</TextField.Text>
								<TextField.Input />
							</TextField>
						</DocsCode.Example>
						<DocsCode.Code>
							{`
							<TextField>
								<TextField.Text>$</TextField.Text>
								<TextField.Input />
							</TextField>
							`}
						</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="type" type="string" defaultValue="text">
					<p>Set the input's type attribute.</p>
					<AvailableKeys data={types} />
					<p>
						All listed types are HTML input types. Some of these types has their specialized component, like DateInput.
					</p>
				</Props.Prop>
				<Props.Prop name="name" type="string">
					Name used for forms.
				</Props.Prop>
				<Props.Prop name="value" type={['string', 'number']}>
					<p>
						If you want to use TextField as controlled component, then set the <code>value</code> prop.
					</p>
					<TextField
						value="I'm here and you can't change me"
						onChange={({value}) => console.log('New value is', value)}
					/>
				</Props.Prop>
				<Props.Prop name="defaultValue" type={['string', 'number']}>
					<p>
						If you plan to use TextField as uncontrolled component, then use <code>defaultValue</code> to set the
						initial value.
					</p>
					<TextField defaultValue="I'm here by default" />
				</Props.Prop>
				<Props.Prop name="placeholder" type={['string', 'number']}>
					<p>Standard placeholder attribute.</p>
					<TextField placeholder="I'm placeholder..." width="50%" />
					<p>&nbsp;</p>
					<p>More complex example:</p>
					<TextField placeholder="I'm placeholder..." width="50%">
						<TextField.Text>$</TextField.Text>
						<TextField.Input />
					</TextField>
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
								<TextField variant={variant} />
							</DocsCode.Example>
						</DocsCode>
					))}
				</Props.Prop>
				<Props.Prop name="width" type="string" defaultValue="theme.inputField.defaults.width">
					<p>
						Use one of the keys set in <code>theme.inputField.width</code> or set your own fixed width.
					</p>
					<AvailableKeys data={widths} name="theme.inputField.width" />
					<p>Example of fixed with of 75%</p>
					<DocsCode>
						<DocsCode.Example>
							<TextField width="75%" />
						</DocsCode.Example>
						<DocsCode.Code>{`<TextField width="75%" />`}</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="minWidth" type="string">
					If set, it'll be added at the bottom of CSS definition so if you have any previous definition of{' '}
					<code>min-width</code> (for example, in theme's variant definition), it'll be overridden with this value.
				</Props.Prop>
				<Props.Prop name="maxWidth" type="string">
					If set, it'll be added at the bottom of CSS definition so if you have any previous definition of{' '}
					<code>max-width</code> (for example, in theme's variant definition), it'll be overridden with this value.
				</Props.Prop>
				<Props.Prop name="onChange" type="func">
					<p>Called when value has changed. This is required prop when TextField is used as controlled component.</p>
					<p>Called function will get the object as first parameter that has the following keys:</p>
					<ul>
						<li>
							<strong>name</strong>
						</li>
						<li>
							<strong>value</strong> - new value that has been set
						</li>
						<li>
							<strong>element</strong> - instance of <code>HTMLElement</code>
						</li>
					</ul>
					<p>Check the example and watch your browser's console to see the change.</p>
					<TextField name="onChangeExampleName" onChange={(o) => console.log(o)} />
				</Props.Prop>
				<Props.Prop name="onInput" type="func">
					<p>
						Unlike <code>onChange</code> which is called on every change, <code>onInput</code> function will be called
						with defined delay. This is useful when you want to allow user to type something in first and then you want
						to fire callback when typing is done.
					</p>
					<p>Called function will get the object as first parameter that has the following keys:</p>
					<ul>
						<li>
							<strong>name</strong>
						</li>
						<li>
							<strong>value</strong> - new value that has been set
						</li>
						<li>
							<strong>element</strong> - instance of <code>HTMLElement</code>
						</li>
					</ul>
					<p>Check the example and watch your browser's console to see the change.</p>
					<TextField name="onInputExampleName" onInput={({name, value}) => console.log(name, value)} />
				</Props.Prop>
				<Props.Prop name="inputDelay" type="number" defaultValue={300}>
					<p>
						To set the delay for <code>onInput</code>, use this prop.
					</p>
					<p>
						Check the example with input delay of 1000 (1 second) and watch your browser's console to see the change.
					</p>
					<TextField
						name="onInputDelayExample"
						onInput={({name, value}) => console.log(name, value)}
						inputDelay={1000}
					/>
				</Props.Prop>
				<Props.Prop name="onClick" type="func">
					<p>Called when the component is clicked on.</p>
					<p>Called function will get the object as first parameter that has the following keys:</p>
					<ul>
						<li>
							<strong>name</strong>
						</li>
						<li>
							<strong>value</strong> - new value that has been set
						</li>
						<li>
							<strong>element</strong> - instance of <code>HTMLElement</code>
						</li>
					</ul>
					<p>Check the example and watch your browser's console to see the change.</p>
					<TextField name="onClickExampleName" onClick={(o) => console.log(o)} />
				</Props.Prop>
				<Props.Prop name="onDoubleClick" type="func">
					<p>Called when the component is double clicked on.</p>
					<p>Called function will get the object as first parameter that has the following keys:</p>
					<ul>
						<li>
							<strong>name</strong>
						</li>
						<li>
							<strong>value</strong> - new value that has been set
						</li>
						<li>
							<strong>element</strong> - instance of <code>HTMLElement</code>
						</li>
					</ul>
					<p>Check the example and watch your browser's console to see the change.</p>
					<TextField name="onDoubleClickExampleName" onDoubleClick={(o) => console.log(o)} />
				</Props.Prop>
				<Props.Prop name="onFocus" type="func">
					<p>Called when the component is focused.</p>
					<p>Called function will get the object as first parameter that has the following keys:</p>
					<ul>
						<li>
							<strong>name</strong>
						</li>
						<li>
							<strong>value</strong> - new value that has been set
						</li>
						<li>
							<strong>element</strong> - instance of <code>HTMLElement</code>
						</li>
					</ul>
					<p>Check the example and watch your browser's console to see the change.</p>
					<TextField name="onFocusExampleName" onFocus={(o) => console.log(o)} />
					<p>Check more complex example:</p>
					<TextField name="onFocusExampleName2" onFocus={(o) => console.log(o)}>
						<TextField.Text>Click me here</TextField.Text>
						<TextField.Input />
					</TextField>
				</Props.Prop>
				<Props.Prop name="onBlur" type="func">
					<p>Called when the component is blurred.</p>
					<p>Called function will get the object as first parameter that has the following keys:</p>
					<ul>
						<li>
							<strong>name</strong>
						</li>
						<li>
							<strong>value</strong> - new value that has been set
						</li>
						<li>
							<strong>element</strong> - instance of <code>HTMLElement</code>
						</li>
					</ul>
					<p>Check the example and watch your browser's console to see the change.</p>
					<TextField name="onBlurExampleName" onBlur={(o) => console.log(o)} />
				</Props.Prop>
				<Props.Prop name="disabled" type="boolean" defaultValue={false}>
					<p>
						This is standard HTML's <code>disabled</code> attribute.
					</p>
					<TextField name="disabledExample" disabled />
					<p>More complex example:</p>
					<TextField name="disabledExample2" disabled>
						<TextField.Text>$</TextField.Text>
						<TextField.Input />
					</TextField>
				</Props.Prop>
				<Props.Prop name="readOnly" type="boolean" defaultValue={false}>
					<p>
						This is standard HTML's <code>readOnly</code> attribute.
					</p>
					<TextField name="readOnlyExample" defaultValue="Default value" readOnly />
					<p>More complex example:</p>
					<TextField name="readOnlyExample2" defaultValue="Default value" readOnly>
						<TextField.Text>$</TextField.Text>
						<TextField.Input />
					</TextField>
				</Props.Prop>
				<Props.Prop name="m" />
				<Props.Prop name="mt" />
				<Props.Prop name="mr" />
				<Props.Prop name="mb" />
				<Props.Prop name="ml" />
				<Props.Prop name="ref" />
			</Props>
			<Props title="Props for TextField.Input" hash="textfield-input-props">
				<Props.Prop name="flex" type={['string', 'number']}>
					All elements within the text field's container are aligned with <code>inline-flex</code>, so if you want to
					provide custom width or relative width, you may use this prop. This is standard CSS <code>flex</code>{' '}
					property.
				</Props.Prop>
				<Props.Prop name="width" type={['string', 'number']}>
					If you want to set custom width on the content's width, then use this prop.
				</Props.Prop>
			</Props>
			<Props title="Props for TextField.Text" hash="textfield-text-props">
				<Props.Prop name="children" type={['string', 'number', 'node']} required>
					The content you want to put.
				</Props.Prop>
				<Props.Prop name="flex" type={['string', 'number']}>
					All elements within the text field's container are aligned with <code>inline-flex</code>, so if you want to
					provide custom width or relative width, you may use this prop. This is standard CSS <code>flex</code>{' '}
					property.
				</Props.Prop>
				<Props.Prop name="width" type={['string', 'number']}>
					If you want to set custom width on the content's width, then use this prop.
				</Props.Prop>
				<Props.Prop name="alignSelf" type="string">
					All elements within the text field's container are aligned with <code>inline-flex</code>, so if you want to
					customize the position of this component, then use this prop. It is standard CSS <code>align-self</code>{' '}
					property, so allowed values are:
					<AvailableKeys data={['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch']} />
				</Props.Prop>
				<Props.Prop name="textAlign" type="string">
					If this component is wider then its inner content, then you may want to set the <code>text-align</code>{' '}
					explicitly.
				</Props.Prop>
				<Props.Prop name="p" />
				<Props.Prop name="pt" />
				<Props.Prop name="pr" />
				<Props.Prop name="pb" />
				<Props.Prop name="pl" />
			</Props>
			<DocsCode label="Example for TextField.Text:">
				<DocsCode.Example>
					<TextField>
						<TextField.Text>Look</TextField.Text>
						<TextField.Input />
						<TextField.Text>Go</TextField.Text>
					</TextField>
				</DocsCode.Example>
				<DocsCode.Code>
					{`
					<TextField>
						<TextField.Text>Look</TextField.Text>
						<TextField.Input />
						<TextField.Text>Go</TextField.Text>
					</TextField>
					`}
				</DocsCode.Code>
			</DocsCode>
			<Props title="Props for TextField.Box" hash="textfield-box-props">
				<Props.Prop name="children" type={['string', 'number', 'node']} required>
					The content you want to put.
				</Props.Prop>
				<Props.Prop name="flex" type={['string', 'number']}>
					All elements within the box field's container are aligned with <code>inline-flex</code>, so if you want to
					provide custom width or relative width, you may use this prop. This is standard CSS <code>flex</code>{' '}
					property.
				</Props.Prop>
				<Props.Prop name="width" type={['string', 'number']}>
					If you want to set custom width on the content's width, then use this prop.
				</Props.Prop>
				<Props.Prop name="alignSelf" type="string">
					All elements within the box field's container are aligned with <code>inline-flex</code>, so if you want to
					customize the position of this component, then use this prop. It is standard CSS <code>align-self</code>{' '}
					property, so allowed values are:
					<AvailableKeys data={['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch']} />
				</Props.Prop>
				<Props.Prop name="textAlign" type="string">
					If this component is wider then its inner content, then you may want to set the <code>text-align</code>{' '}
					explicitly.
				</Props.Prop>
				<Props.Prop name="p" />
				<Props.Prop name="pt" />
				<Props.Prop name="pr" />
				<Props.Prop name="pb" />
				<Props.Prop name="pl" />
			</Props>
			<DocsCode label="Example for TextField.Box:">
				<DocsCode.Example>
					<TextField>
						<TextField.Box alignSelf="stretch">
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
						</TextField.Box>
						<TextField.Input />
					</TextField>
				</DocsCode.Example>
				<DocsCode.Code>
					{`
					<TextField>
						<TextField.Box alignSelf="stretch">
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
						</TextField.Box>
						<TextField.Input />
					</TextField>
					`}
				</DocsCode.Code>
			</DocsCode>
			<DocsSubTitle hash="type">Type</DocsSubTitle>
			<DocsText>These are the examples of standard HTML5 types.</DocsText>
			{types.map((t) => (
				<DocsCode key={t} label={t} labelWidth="auto">
					<DocsCode.Example>
						<TextField type={t} />
					</DocsCode.Example>
				</DocsCode>
			))}
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
								<TextField width={120} variant={variant} color={color} />
								<TextField width={120} variant={variant} color={color} ml={10} disabled defaultValue="Disabled value" />
								<TextField
									width={120}
									variant={variant}
									color={color}
									ml={10}
									readOnly
									defaultValue="Read only value"
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
						<TextField size={t} />
					</DocsCode.Example>
				</DocsCode>
			))}
			<DocsSubTitle hash="width">Width</DocsSubTitle>
			<DocsText>
				It is possible to predefine width in the theme, so you can have one place from where you control the width.
			</DocsText>
			<DocsText>
				<AvailableKeys data={widths} />
			</DocsText>
			{Object.keys(widths).map((t) => (
				<DocsCode key={t} label={t} labelWidth="auto">
					<DocsCode.Example>
						<TextField width={t} />
					</DocsCode.Example>
				</DocsCode>
			))}
		</>
	);
};
