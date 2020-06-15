import React, {useContext} from 'react';

import ThemeContext from '../../theme/ThemeContext';

import Props from '../../../docs/components/Props';
import TextArea from './TextArea';
import AvailableKeys from '../../../docs/components/AvailableKeys';
import Text from '../Text/Text';
import H1 from '../../../docs/components/H1';
import Code from '../../../docs/components/Code';
import Paragraph from '../../../docs/components/Paragraph';
import List from '../../../docs/components/List';
import H2 from '../../../docs/components/H2';

export const title = 'TextArea';
export const route = '/text-area';
export const json = 'inputField';

export default function TextAreaDocs() {
	const {theme} = useContext(ThemeContext);

	const sizes = theme.json('inputField.size');
	const colors = theme.json('inputField.color');
	const variants = theme.json('inputField.variant');
	const widths = theme.json('inputField.width');

	return (
		<>
			<H1>TextArea</H1>
			<Code language="js" code="import {TextArea} from 'koldy-ui';" />
			<Code
				language="js"
				code={`
<Text as="label" htmlFor="inputExample">
  The label
</Text>
<TextArea id="inputExample" mt="0.5rem" />
        `}
			>
				<Text as="label" htmlFor="inputExample">
					The label
				</Text>
				<TextArea id="inputExample" mt="0.5rem" />
			</Code>
			<Paragraph>
				If you think of <code>textarea</code> carefully, you'll see that this is the same component as <code>TextField</code>, only
				multiline. Therefore, theme's <code>textArea</code> rules will be applied on TextArea component as well. Only difference is that
				TextArea implements some additional props like <code>rows</code> and
				<code>height</code> and has no "type" like TextField does.
			</Paragraph>
			<Props>
				<Props.Prop name="name" type="string">
					Name used for forms.
				</Props.Prop>
				<Props.Prop name="value" type={['string', 'number']}>
					<Paragraph>
						If you want to use TextArea as controlled component, then set the <code>value</code> prop.
					</Paragraph>
					<TextArea value="I'm here and you can't change me" onChange={({value}) => console.log('New value is', value)} />
				</Props.Prop>
				<Props.Prop name="defaultValue" type={['string', 'number']}>
					<Paragraph>
						If you plan to use TextArea as uncontrolled component, then use <code>defaultValue</code> to set the initial value.
					</Paragraph>
					<Code language="js" code={'<TextArea defaultValue="I\'m here by default" />'}>
						<TextArea defaultValue="I'm here by default" />
					</Code>
				</Props.Prop>
				<Props.Prop name="placeholder" type={['string', 'number']}>
					<Paragraph>Standard placeholder attribute.</Paragraph>
					<Code language="js" code={'<TextArea placeholder="I\'m placeholder. Type something and I\'m gone..." width="100%" />'}>
						<TextArea placeholder="I'm placeholder. Type something and I'm gone..." width="100%" />
					</Code>
				</Props.Prop>
				<Props.Prop name="color" type="string" defaultValue="theme.textField.defaults.color">
					<Paragraph>
						Use one of the keys set in <code>theme.textField.color</code>.
					</Paragraph>
					<AvailableKeys data={colors} name="theme.textField.color" />
				</Props.Prop>
				<Props.Prop name="size" type="string" defaultValue="theme.textField.defaults.size">
					<Paragraph>
						Use one of the keys set in <code>theme.textField.size</code>.
					</Paragraph>
					<AvailableKeys data={sizes} name="theme.textField.size" />
				</Props.Prop>
				<Props.Prop name="width" type="string" defaultValue="theme.textField.defaults.width">
					<Paragraph>
						Use one of the keys set in <code>theme.textField.width</code>.
					</Paragraph>
					<AvailableKeys data={widths} name="theme.textField.width" />
				</Props.Prop>
				<Props.Prop name="minWidth" type="string">
					If set, it'll be added at the bottom of CSS definition so if you have any previous definition of <code>min-width</code> (for
					example, in theme's variant definition), it'll be overridden with this value.
				</Props.Prop>
				<Props.Prop name="maxWidth" type="string">
					If set, it'll be added at the bottom of CSS definition so if you have any previous definition of <code>max-width</code> (for
					example, in theme's variant definition), it'll be overridden with this value.
				</Props.Prop>
				<Props.Prop name="height" type={['string', 'number']}>
					Set the height of the TextArea. If set as number, it'll be used as pixels, otherwise it'll be used as is.
				</Props.Prop>
				<Props.Prop name="minHeight" type={['string', 'number']}>
					Set the min-height of the TextArea. If set as number, it'll be used as pixels, otherwise it'll be used as is.
				</Props.Prop>
				<Props.Prop name="maxHeight" type={['string', 'number']}>
					Set the max-height of the TextArea. If set as number, it'll be used as pixels, otherwise it'll be used as is.
				</Props.Prop>
				<Props.Prop name="rows" type="number">
					<Paragraph>
						Sets the <code>rows</code> HTML attribute.
					</Paragraph>
					<Code language="js" code={'<TextArea rows={8} placeholder="This textarea has the rows set to 8" />'}>
						<TextArea rows={8} placeholder="This textarea has the rows set to 8" />
					</Code>
				</Props.Prop>
				<Props.Prop name="resize" type="string" defaultValue="none">
					<Paragraph>
						Sets the <code>resize</code> CSS value.
					</Paragraph>
					<Paragraph>
						Available values are:{' '}
						{['none', 'both', 'vertical', 'horizontal'].map((v) => (
							<code key={v}>{v}</code>
						))}
					</Paragraph>
					<Code language="js" code={'<TextArea resize="vertical" />'} label="vertical" labelWidth="auto">
						<TextArea resize="vertical" />
					</Code>
				</Props.Prop>
				<Props.Prop name="onChange" type="function">
					<Paragraph>Called when value has changed. This is required prop when TextArea is used as controlled component.</Paragraph>
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
					<Code language="js" code={'<TextArea name="onChangeExampleName" onChange={(o) => console.log(o)} />'}>
						<TextArea name="onChangeExampleName" onChange={(o) => console.log(o)} />
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
					<Code language="js" code={'<TextArea name="onClickExampleName" onClick={(o) => console.log(o)} />'}>
						<TextArea name="onClickExampleName" onClick={(o) => console.log(o)} />
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
					<Code language="js" code={'<TextArea name="onDoubleClickExampleName" onDoubleClick={(o) => console.log(o)} />'}>
						<TextArea name="onDoubleClickExampleName" onDoubleClick={(o) => console.log(o)} />
					</Code>
				</Props.Prop>
				<Props.Prop name="disabled" type="boolean" defaultValue={false}>
					<Paragraph>
						This is standard HTML's <code>disabled</code> attribute.
					</Paragraph>
					<TextArea name="disabledExample" disabled />
				</Props.Prop>
				<Props.Prop name="readOnly" type="boolean" defaultValue={false}>
					<Paragraph>
						This is standard HTML's <code>readOnly</code> attribute.
					</Paragraph>
					<TextArea name="readOnlyExample" readOnly />
				</Props.Prop>
				<Props.Prop name="m" />
				<Props.Prop name="mt" />
				<Props.Prop name="mr" />
				<Props.Prop name="mb" />
				<Props.Prop name="ml" />
				<Props.Prop name="ref" />
			</Props>
			<H2 hash="variant">Variant</H2>
			<Paragraph>Variant is the shape of TextArea component.</Paragraph>
			<AvailableKeys data={variants} name="theme.textField.variant" />
			{Object.keys(variants).map((val) => (
				<Code language="js" code={`<TextArea variant="${val}"/>`} key={val} label={val} labelWidth="auto">
					<TextArea variant={val} />
				</Code>
			))}
			<H2 hash="color">Color</H2>
			<Paragraph>You may set any of the predefined colors from the theme.</Paragraph>
			<AvailableKeys data={colors} name="theme.textField.color" />
			{Object.keys(colors).map((val) => (
				<Code language="js" code={`<TextArea color="${val}"/>`} key={val} label={val} labelWidth="auto">
					<TextArea color={val} />
				</Code>
			))}
			<H2 hash="size">Size</H2>
			<Paragraph>
				Use <code>size</code> prop to set the size of the TextArea component. Don't get confused by the component's width because that's not
				the same as size (read about width in next section). Size tells the size of font, height and padding. While setting the CSS for
				size, only font size will be applied.
			</Paragraph>
			<AvailableKeys data={sizes} name="theme.textField.size" />
			{Object.keys(sizes).map((val) => (
				<Code language="js" code={`<TextArea size="${val}"/>`} key={val} label={val} labelWidth="auto">
					<TextArea size={val} />
				</Code>
			))}
			<H2 hash="width">Width</H2>
			<Paragraph>
				Use <code>width</code> prop to set the width of the TextArea component. Don't get confused by the component's size. Width tells the
				width of TextArea component and it can be predefined in theme or it can be set using the <code>width</code> prop.
			</Paragraph>
			<AvailableKeys data={widths} name="theme.textField.width" />
			{Object.keys(widths).map((val) => (
				<Code language="js" code={`<TextArea width="${val}"/>`} key={val} label={val} labelWidth="auto">
					<TextArea width={val} />
				</Code>
			))}
			<Paragraph>
				You can set the width manually using the <code>width</code> prop.
			</Paragraph>
			<Code language="js" code="<TextArea width={30}/>" label="30" labelWidth="auto">
				<TextArea width={30} />
			</Code>
			<Code language="js" code={'<TextArea width="75%"/>'} label="75%" labelWidth="auto">
				<TextArea width="75%" />
			</Code>
			<Code language="js" code={'<TextArea width="100%"/>'} label="100%" labelWidth="auto">
				<TextArea width="100%" />
			</Code>
		</>
	);
}
