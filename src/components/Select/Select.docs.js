import React, {useContext} from 'react';

import ThemeContext from '../../theme/ThemeContext';

import Props from '../../../docs/components/Props';
import Select from './Select';
import AvailableKeys from '../../../docs/components/AvailableKeys';
import Button from '../Button/Button';
import H1 from '../../../docs/components/H1';
import Code from '../../../docs/components/Code';
import Paragraph from '../../../docs/components/Paragraph';
import List from '../../../docs/components/List';
import H2 from '../../../docs/components/H2';

export const title = 'Select';
export const route = '/select';
export const json = 'inputField';

export default function SelectDocs() {
	const {theme} = useContext(ThemeContext);

	const sizes = theme.json('inputField.size');
	const colors = theme.json('inputField.color');
	const variants = theme.json('inputField.variant');
	const widths = theme.json('inputField.width');

	return (
		<>
			<H1>Select</H1>
			<Code language="js" code="import {Select} from 'koldy-ui';" />
			<Code
				language="js"
				code={`
<Select>
  <option>one</option>
  <option>two</option>
  <option>three</option>
</Select>
					`}
			>
				<Select>
					<option>one</option>
					<option>two</option>
					<option>three</option>
				</Select>
			</Code>
			<Props>
				<Props.Prop name="children" type="node">
					Put <code>option</code> and/or <code>optgroup</code> children as offered Select values.
				</Props.Prop>
				<Props.Prop name="name" type="string">
					Name used for forms.
				</Props.Prop>
				<Props.Prop name="value" type={['string', 'number']}>
					If you want to use Select as controlled component, then set the <code>value</code> prop.
				</Props.Prop>
				<Props.Prop name="defaultValue" type={['string', 'number']}>
					If you plan to use Select as uncontrolled component, then use <code>defaultValue</code> to set the initial value.
				</Props.Prop>
				<Props.Prop name="color" type="string" defaultValue="theme.select.defaults.color">
					<Paragraph>
						Use one of the keys set in <code>theme.select.color</code>.
					</Paragraph>
					<AvailableKeys data={colors} name="theme.select.color" />
				</Props.Prop>
				<Props.Prop name="size" type="string" defaultValue="theme.select.defaults.size">
					<Paragraph>
						Use one of the keys set in <code>theme.select.size</code>.
					</Paragraph>
					<AvailableKeys data={sizes} name="theme.select.size" />
					<Paragraph>
						If you're looking for HTML's attribute <code>size</code>, then take a look at <code>visibleOptions</code> prop.
					</Paragraph>
				</Props.Prop>
				<Props.Prop name="width" type="string" defaultValue="theme.select.defaults.width">
					<Paragraph>
						Use one of the keys set in <code>theme.select.width</code>.
					</Paragraph>
					<AvailableKeys data={widths} name="theme.select.width" />
				</Props.Prop>
				<Props.Prop name="height" type="string">
					<Paragraph>
						Height is automatically set by the font size and padding, so this prop shouldn't be used. However, if you're using
						<code>multiple</code>, then you'll probably want to set the height. Otherwise, browser will decide what's the height for your
						component.
					</Paragraph>
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
					<Paragraph>Called when value has changed. This is required prop when Select is used as controlled component.</Paragraph>
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
					<Select name="onChangeExampleName" onChange={(o) => console.log(o)}>
						<option>- change this -</option>
						<option value={1}>one</option>
						<option value="2">two</option>
					</Select>
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
					<Select name="onFocusExampleName" onFocus={(o) => console.log(o)}>
						<option>- change this -</option>
						<option value={1}>one</option>
						<option value="2">two</option>
					</Select>
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
					<Select name="onBlurExampleName" onBlur={(o) => console.log(o)}>
						<option>- change this -</option>
						<option value={1}>one</option>
						<option value="2">two</option>
					</Select>
				</Props.Prop>
				<Props.Prop name="disabled" type="boolean" defaultValue={false}>
					<Paragraph>
						This is standard HTML's <code>disabled</code> attribute.
					</Paragraph>
					<Select name="disabledExample" disabled>
						<option value={1}>one</option>
						<option value={2}>two</option>
						<option value={3}>three</option>
						<option value={4}>four</option>
					</Select>
				</Props.Prop>
				<Props.Prop name="multiple" type="boolean" defaultValue={false}>
					<Paragraph>If you want to allow multiple selected options, then use this prop.</Paragraph>
					<Select name="multipleExample" multiple onChange={(o) => console.log(o)}>
						<option value={1}>one</option>
						<option value={2}>two</option>
						<option value={3}>three</option>
						<option value={4}>four</option>
					</Select>
				</Props.Prop>
				<Props.Prop name="visibleOptions" type="number">
					<Paragraph>
						This prop works only if <code>multiple</code> is set to <code>true</code>.
					</Paragraph>
					<Paragraph>
						To define number of visible options (HTML attribute <code>size</code>), then use this prop.
					</Paragraph>
					<Select name="visibleOptionsExample" multiple visibleOptions={3}>
						<option value={1}>one</option>
						<option value={2}>two</option>
						<option value={3}>three</option>
						<option value={4}>four</option>
						<option value={5}>five</option>
						<option value={6}>six</option>
					</Select>
				</Props.Prop>
				<Props.Prop name="m" />
				<Props.Prop name="mt" />
				<Props.Prop name="mr" />
				<Props.Prop name="mb" />
				<Props.Prop name="ml" />
				<Props.Prop name="ref" />
			</Props>
			<H2 hash="variant">Variant</H2>
			<Paragraph>Variant is the shape of Select component.</Paragraph>
			<AvailableKeys data={variants} name="theme.select.variant" />
			{Object.keys(variants).map((val) => (
				<Code
					language="js"
					code={`
<Select variant="${val}">
  <option>one</option>
  <option>two</option>
</Select>
						`}
					key={val}
					label={val}
					labelWidth="auto"
				>
					<Select variant={val}>
						<option>one</option>
						<option>two</option>
					</Select>
				</Code>
			))}
			<H2 hash="color">Color</H2>
			<Paragraph>You may set any of the predefined colors from the theme.</Paragraph>
			<AvailableKeys data={colors} name="theme.select.color" />
			{Object.keys(colors).map((val) => (
				<Code
					language="js"
					code={`
<Select color="${val}">
  <option>one</option>
  <option>two</option>
</Select>
						`}
					key={val}
					label={val}
					labelWidth="auto"
				>
					<Select color={val}>
						<option>one</option>
						<option>two</option>
					</Select>
				</Code>
			))}
			<H2 hash="size">Size</H2>
			<Paragraph>
				Use <code>size</code> prop to set the size of the Select component. Don't get confused by the component's width because that's not
				the same as size (read about width in next section). Size tells the size of font, height and padding. While setting the CSS for
				size, only font size will be applied.
			</Paragraph>
			<AvailableKeys data={sizes} name="theme.select.size" />
			{Object.keys(sizes).map((val) => (
				<Code
					language="js"
					code={`
<Select size="${val}">
  <option>one</option>
  <option>two</option>
</Select>
						`}
					key={val}
					label={val}
					labelWidth="auto"
				>
					<Select size={val}>
						<option>one</option>
						<option>two</option>
					</Select>
				</Code>
			))}
			<H2 hash="width">Width</H2>
			<Paragraph>
				Use <code>width</code> prop to set the width of the Select component. Don't get confused by the component's size. Width tells the
				width of Select component and it can be predefined in theme or it can be set using the <code>width</code> prop.
			</Paragraph>
			<AvailableKeys data={widths} name="theme.select.width" />
			{Object.keys(widths).map((val) => (
				<Code
					language="js"
					code={`
<Select width="${val}">
  <option>one</option>
  <option>two</option>
</Select>
						`}
					key={val}
					label={val}
					labelWidth="auto"
				>
					<Select width={val}>
						<option>one</option>
						<option>two</option>
					</Select>
				</Code>
			))}
			<Paragraph>
				You can set the width manually using the <code>width</code> prop.
			</Paragraph>
			<Code
				language="js"
				code={`
<Select width={30}>
  <option>one</option>
  <option>two</option>
</Select>
        `}
				label="30"
				labelWidth="auto"
			>
				<Select width={30}>
					<option>one</option>
					<option>two</option>
				</Select>
			</Code>
			<Code
				language="js"
				code={`
<Select>
  <option>one</option>
  <option>two</option>
</Select>
        `}
				label="75%"
				labelWidth="auto"
			>
				<Select width="75%">
					<option>one</option>
					<option>two</option>
				</Select>
			</Code>
			<Props title="Props for Select.Input" hash="select-input-props">
				<Props.Prop name="flex" type={['string', 'number']}>
					All elements within the text field's container are aligned with <code>inline-flex</code>, so if you want to provide custom width
					or relative width, you may use this prop. This is standard CSS <code>flex</code> property.
				</Props.Prop>
				<Props.Prop name="width" type={['string', 'number']}>
					If you want to set custom width on the content's width, then use this prop.
				</Props.Prop>
			</Props>
			<Props title="Props for Select.Text" hash="select-text-props">
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
					<Paragraph>
						All elements within the text field's container are aligned with <code>inline-flex</code>, so if you want to customize the
						position of this component, then use this prop. It is standard CSS <code>align-self</code> property, so allowed values are:
					</Paragraph>
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
<Select>
  <Select.Text>Look</Select.Text>
  <Select.Input>
    <option>one</option>
    <option>two</option>
  </Select.Input>
</Select>
        `}
				label="Example for Select.Text:"
			>
				<Select>
					<Select.Text>Look</Select.Text>
					<Select.Input>
						<option>one</option>
						<option>two</option>
					</Select.Input>
				</Select>
			</Code>
			<Props title="Props for Select.Box" hash="select-box-props">
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
<Select>
  <Select.Box alignSelf="stretch">
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
  </Select.Box>
  <Select.Input>
    <option>one</option>
    <option>two</option>
  </Select.Input>
</Select>
					`}
				label="Example for Select.Box:"
			>
				<Select>
					<Select.Box alignSelf="stretch">
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
					</Select.Box>
					<Select.Input>
						<option>one</option>
						<option>two</option>
					</Select.Input>
				</Select>
			</Code>
			<Paragraph>Example "nesting" buttons within the Select using Select.Box:</Paragraph>
			<Code
				language="js"
				code={`
<Select>
  <Select.Box>
    <Button>First</Button>
    <Button>Second</Button>
  </Select.Box>
  <Select.Input>
    <option>one</option>
    <option>two</option>
    <option>three</option>
  </Select.Input>
</Select>
					`}
			>
				<Select>
					<Select.Box>
						<Button>First</Button>
						<Button>Second</Button>
					</Select.Box>
					<Select.Input>
						<option>one</option>
						<option>two</option>
						<option>three</option>
					</Select.Input>
				</Select>
			</Code>
		</>
	);
}
