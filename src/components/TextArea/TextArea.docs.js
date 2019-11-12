import React, {useContext} from 'react';
import DocsTitle from '../../../docs/components/DocsTitle';

import ThemeContext from '../../theme/ThemeContext';

import Props from '../../../docs/components/Props';
import DocsSubTitle from '../../../docs/components/DocsSubTitle';
import DocsText from '../../../docs/components/DocsText';
import ImportComponent from '../../../docs/components/ImportComponent';
import TextArea from './TextArea';
import DocsCode from '../../../docs/components/DocsCode';
import AvailableKeys from '../../../docs/components/AvailableKeys';
import Text from '../Text/Text';

export const title = 'TextArea';
export const slug = 'text-area';
export const json = 'inputField';

export const Documentation = function() {
	const {theme} = useContext(ThemeContext);

	const sizes = theme.json('inputField.size');
	const colors = theme.json('inputField.color');
	const variants = theme.json('inputField.variant');
	const widths = theme.json('inputField.width');

	return (
		<>
			<DocsTitle hash="textField">TextArea</DocsTitle>
			<ImportComponent name="TextArea" />
			<DocsCode>
				<DocsCode.Example>
					<Text as="label" htmlFor="inputExample">
						The label
					</Text>
					<TextArea id="inputExample" />
				</DocsCode.Example>
				<DocsCode.Code>
					{`
					<Text as="label" htmlFor="inputExample">
						The label
					</Text>
					<TextArea id="inputExample" mt="0.5rem" />
					`}
				</DocsCode.Code>
			</DocsCode>
			<DocsText>
				If you think of <code>textarea</code> carefully, you'll see that this is the same component as{' '}
				<code>TextField</code>, only multiline. Therefore, theme's <code>textArea</code> rules will be applied on
				TextArea component as well. Only difference is that TextArea implements some additional props like{' '}
				<code>rows</code> and
				<code>height</code> and has no "type" like TextField does.
			</DocsText>
			<Props>
				<Props.Prop name="name" type="string">
					Name used for forms.
				</Props.Prop>
				<Props.Prop name="value" type={['string', 'number']}>
					<p>
						If you want to use TextArea as controlled component, then set the <code>value</code> prop.
					</p>
					<TextArea
						value="I'm here and you can't change me"
						onChange={({value}) => console.log('New value is', value)}
					/>
				</Props.Prop>
				<Props.Prop name="defaultValue" type={['string', 'number']}>
					<p>
						If you plan to use TextArea as uncontrolled component, then use <code>defaultValue</code> to set the initial
						value.
					</p>
					<TextArea defaultValue="I'm here by default" />
				</Props.Prop>
				<Props.Prop name="placeholder" type={['string', 'number']}>
					<p>Standard placeholder attribute.</p>
					<TextArea placeholder="I'm placeholder. Type something and I'm gone..." width="100%" />
				</Props.Prop>
				<Props.Prop name="color" type="string" defaultValue="theme.textField.defaults.color">
					<p>
						Use one of the keys set in <code>theme.textField.color</code>.
					</p>
					<AvailableKeys data={colors} name="theme.textField.color" />
				</Props.Prop>
				<Props.Prop name="size" type="string" defaultValue="theme.textField.defaults.size">
					<p>
						Use one of the keys set in <code>theme.textField.size</code>.
					</p>
					<AvailableKeys data={sizes} name="theme.textField.size" />
				</Props.Prop>
				<Props.Prop name="width" type="string" defaultValue="theme.textField.defaults.width">
					<p>
						Use one of the keys set in <code>theme.textField.width</code>.
					</p>
					<AvailableKeys data={widths} name="theme.textField.width" />
				</Props.Prop>
				<Props.Prop name="minWidth" type="string">
					If set, it'll be added at the bottom of CSS definition so if you have any previous definition of{' '}
					<code>min-width</code> (for example, in theme's variant definition), it'll be overridden with this value.
				</Props.Prop>
				<Props.Prop name="maxWidth" type="string">
					If set, it'll be added at the bottom of CSS definition so if you have any previous definition of{' '}
					<code>max-width</code> (for example, in theme's variant definition), it'll be overridden with this value.
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
					<p>
						Sets the <code>rows</code> HTML attribute.
					</p>
					<TextArea rows={8} placeholder="This textarea has the rows set to 8" />
				</Props.Prop>
				<Props.Prop name="resize" type="string" defaultValue="none">
					<p>
						Sets the <code>resize</code> CSS value.
					</p>
					<p>
						Available values are:{' '}
						{['none', 'both', 'vertical', 'horizontal'].map((v) => (
							<code key={v}>{v}</code>
						))}
					</p>
					<DocsCode label="vertical" labelWidth="auto">
						<DocsCode.Example>
							<TextArea resize="vertical" />
						</DocsCode.Example>
						<DocsCode.Code>
							{`
							<TextArea resize="vertical" />
							`}
						</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="onChange" type="function">
					<p>Called when value has changed. This is required prop when TextArea is used as controlled component.</p>
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
					<TextArea name="onChangeExampleName" onChange={(o) => console.log(o)} />
				</Props.Prop>
				<Props.Prop name="onClick" type="function">
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
					<TextArea name="onClickExampleName" onClick={(o) => console.log(o)} />
				</Props.Prop>
				<Props.Prop name="onDoubleClick" type="function">
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
					<TextArea name="onDoubleClickExampleName" onDoubleClick={(o) => console.log(o)} />
				</Props.Prop>
				<Props.Prop name="disabled" type="boolean" defaultValue={false}>
					<p>
						This is standard HTML's <code>disabled</code> attribute.
					</p>
					<TextArea name="disabledExample" disabled />
				</Props.Prop>
				<Props.Prop name="readOnly" type="boolean" defaultValue={false}>
					<p>
						This is standard HTML's <code>readOnly</code> attribute.
					</p>
					<TextArea name="readOnlyExample" readOnly />
				</Props.Prop>
				<Props.Prop name="m" />
				<Props.Prop name="mt" />
				<Props.Prop name="mr" />
				<Props.Prop name="mb" />
				<Props.Prop name="ml" />
				<Props.Prop name="ref" />
			</Props>
			<DocsSubTitle hash="variant">Variant</DocsSubTitle>
			<DocsText>
				Variant is the shape of TextArea component. <AvailableKeys data={variants} name="theme.textField.variant" />
			</DocsText>
			{Object.keys(variants).map((val) => (
				<DocsCode key={val} label={val} labelWidth="auto">
					<DocsCode.Example>
						<TextArea variant={val} />
					</DocsCode.Example>
					<DocsCode.Code>
						{`
						<TextArea variant="${val}"/>
						`}
					</DocsCode.Code>
				</DocsCode>
			))}
			<DocsSubTitle hash="color">Color</DocsSubTitle>
			<DocsText>
				You may set any of the predefined colors from the theme.{' '}
				<AvailableKeys data={colors} name="theme.textField.color" />
			</DocsText>
			{Object.keys(colors).map((val) => (
				<DocsCode key={val} label={val} labelWidth="auto">
					<DocsCode.Example>
						<TextArea color={val} />
					</DocsCode.Example>
					<DocsCode.Code>
						{`
						<TextArea color="${val}"/>
						`}
					</DocsCode.Code>
				</DocsCode>
			))}
			<DocsSubTitle hash="size">Size</DocsSubTitle>
			<DocsText>
				Use <code>size</code> prop to set the size of the TextArea component. Don't get confused by the component's
				width because that's not the same as size (read about width in next section). Size tells the size of font,
				height and padding. While setting the CSS for size, only font size will be applied.
			</DocsText>
			<DocsText>
				<AvailableKeys data={sizes} name="theme.textField.size" />
			</DocsText>
			{Object.keys(sizes).map((val) => (
				<DocsCode key={val} label={val} labelWidth="auto">
					<DocsCode.Example>
						<TextArea size={val} />
					</DocsCode.Example>
					<DocsCode.Code>
						{`
						<TextArea size="${val}"/>
						`}
					</DocsCode.Code>
				</DocsCode>
			))}
			<DocsSubTitle hash="width">Width</DocsSubTitle>
			<DocsText>
				Use <code>width</code> prop to set the width of the TextArea component. Don't get confused by the component's
				size. Width tells the width of TextArea component and it can be predefined in theme or it can be set using the{' '}
				<code>width</code> prop.
			</DocsText>
			<DocsText>
				<AvailableKeys data={widths} name="theme.textField.width" />
			</DocsText>
			{Object.keys(widths).map((val) => (
				<DocsCode key={val} label={val} labelWidth="auto">
					<DocsCode.Example>
						<TextArea width={val} />
					</DocsCode.Example>
					<DocsCode.Code>
						{`
						<TextArea width="${val}"/>
						`}
					</DocsCode.Code>
				</DocsCode>
			))}
			<DocsText>
				You can set the width manually using the <code>width</code> prop.
			</DocsText>
			<DocsCode label="30" labelWidth="auto">
				<DocsCode.Example>
					<TextArea width={30} />
				</DocsCode.Example>
				<DocsCode.Code>
					{`
					<TextArea width={30}/>
					`}
				</DocsCode.Code>
			</DocsCode>
			<DocsCode label="75%" labelWidth="auto">
				<DocsCode.Example>
					<TextArea width="75%" />
				</DocsCode.Example>
				<DocsCode.Code>
					{`
					<TextArea width="75%"/>
					`}
				</DocsCode.Code>
			</DocsCode>
			<DocsCode label="100%" labelWidth="auto">
				<DocsCode.Example>
					<TextArea width="100%" />
				</DocsCode.Example>
				<DocsCode.Code>
					{`
					<TextArea width="100%"/>
					`}
				</DocsCode.Code>
			</DocsCode>
		</>
	);
};
