import React, {Fragment, useContext, useCallback} from 'react';

import ThemeContext from '../../theme/ThemeContext';

import FileField from './FileField';
import Props from '../../../docs/components/Props';
import AvailableKeys from '../../../docs/components/AvailableKeys';
import Button from '../Button/Button';
import H1 from '../../../docs/components/H1';
import Code from '../../../docs/components/Code';
import List from '../../../docs/components/List';
import Paragraph from '../../../docs/components/Paragraph';
import H2 from '../../../docs/components/H2';

export const title = 'FileField';
export const route = '/file-field';
export const json = 'inputField';

export default function FileFieldDocs() {
	const {theme} = useContext(ThemeContext);

	const sizes = theme.json('inputField.size');
	const colors = theme.json('inputField.color');
	const variants = theme.json('inputField.variant');
	const widths = theme.json('inputField.width');

	const placeholder = useCallback(
		({files, totalSize}) =>
			files === null || files.length === 0 ? 'No files selected' : `${files.length} file(s) selected, total ${totalSize} B`,
		[]
	);

	return (
		<>
			<H1>FileField</H1>
			<Code language="js" code=" import {FileField} from 'koldy-ui';" />
			<Paragraph>
				<strong>PLEASE NOTE!</strong> All examples on this page won't take any of your files. Any file you select won't go anywhere.
			</Paragraph>
			<Code language="js" code="<FileField />">
				<FileField />
			</Code>
			<Paragraph>
				This is example of file field without any props. It looks nothing special, but it's actually very powerful component ready to be
				customized much more than you expect. If you click on it, you'll be asked to select file, but after that, nothing will happen.
			</Paragraph>
			<Paragraph>
				The following example is probably much more similar to the file components you already saw (and this one is maybe even better):
			</Paragraph>
			<Code
				language="js"
				code={`
<FileField placeholder={({files, totalSize}) => files === null || files.length === 0 ? 'No files selected' : \`\${files.length} file(s) selected, total \${totalSize} B\`} multiple variant="round" width="auto">
  <FileField.Input />
  <FileField.Box>
    {({focusField}) => (
      <Button onClick={focusField} variant="round">
        Browse
      </Button>
    )}
  </FileField.Box>
</FileField>
					`}
			>
				<FileField placeholder={placeholder} multiple variant="round" width="auto">
					<FileField.Input />
					<FileField.Box>
						{({focusField}) => (
							<Button onClick={focusField} variant="round">
								Browse
							</Button>
						)}
					</FileField.Box>
				</FileField>
			</Code>
			<Paragraph>
				^^ That example is much better, so the similar props will be used on all other examples so you can get the feeling how this works.
			</Paragraph>
			<Props>
				<Props.Prop name="children" type="node" defaultValue="<FileField.Input/>">
					<Paragraph>
						If you want to create "complex" looking and behaving <code>FileField</code>, then use children to reconfigure it's inner layout.
						This allows you to put any content before or after the input element itself. If nothing is set, then standard HTML input will be
						used.{' '}
					</Paragraph>
					<Paragraph>There are few components you should use for configuring the layout:</Paragraph>
					<List>
						<List.Item>
							<code>FileField.Input</code> - standard input component which is used by default, but if yo're making your own inner layout,
							then you have to use this component to tell where input should be
						</List.Item>
						<List.Item>
							<code>FileField.Text</code> - use this component if you want to place plain text before or after the input component itself;
							this component will take the padding and font size from the input field so it's style and size will be automatically set
						</List.Item>
						<List.Item>
							<code>FileField.Box</code> - use this component to put more advanced components, like <code>Button</code> or anything else.
							Unlike FileField.Text which has the component's style, this component has nothing, no margin and no padding, so it's easier to
							position inner component.
						</List.Item>
					</List>
					<Paragraph>Here's an example for putting the dollar sign before the text input:</Paragraph>
					<Code
						language="js"
						code={`
<FileField>
  <FileField.Input />
  <FileField.Text>Select file</FileField.Text>
</FileField>
							`}
					>
						<FileField>
							<FileField.Input />
							<FileField.Text>Select file</FileField.Text>
						</FileField>
					</Code>
				</Props.Prop>
				<Props.Prop name="name" type="string">
					Name used for forms.
				</Props.Prop>
				<Props.Prop name="accept" type="string">
					This is standard HTML attribute for <code>accept</code>. Use it to filter what types of files you want to accept.
				</Props.Prop>
				<Props.Prop name="multiple" type="bool" defaultValue={false}>
					<Paragraph>
						This is standard HTML attribute for <code>multiple</code>. Use it if you want to allow selecting multiple files.{' '}
					</Paragraph>
					<Code
						language="js"
						code={`
<FileField placeholder={({files, totalSize}) => files === null || files.length === 0 ? 'No files selected' : \`\${files.length} file(s) selected, total \${totalSize} B\`} multiple width="auto">
  <FileField.Input />
  <FileField.Box>
    {({focusField}) => (
      <Button onClick={focusField}>
        Browse
      </Button>
    )}
  </FileField.Box>
</FileField>
							`}
					>
						<FileField placeholder={placeholder} multiple width="auto">
							<FileField.Input />
							<FileField.Box>{({focusField}) => <Button onClick={focusField}>Browse</Button>}</FileField.Box>
						</FileField>
					</Code>
				</Props.Prop>
				<Props.Prop name="placeholder" type={['string', 'number', 'node', 'func']}>
					<Paragraph>Since standard input field is visually hidden, you're able to put anything for the placeholder.</Paragraph>
					<FileField placeholder="I'm placeholder..." width="50%" />
					<Paragraph>&nbsp;</Paragraph>
					<Paragraph>More complex example:</Paragraph>
					<FileField placeholder="I'm placeholder..." width="50%">
						<FileField.Text>Select file</FileField.Text>
						<FileField.Input />
					</FileField>
					<Paragraph>It's pretty clear what would happen if you're using string, number or node for the placeholder.</Paragraph>
					<Paragraph>
						If you put function for placeholder, then you're able to customize the placeholder text according to the selected files in the
						input field. First parameter of this function is object with the following keys:{' '}
					</Paragraph>
					<List>
						<List.Item>
							<strong>files</strong> - instance of native <code>FileList</code>
						</List.Item>
						<List.Item>
							<strong>totalSize</strong> - number - total size of all files from the <code>files</code> in bytes
						</List.Item>
					</List>
					<Paragraph>
						As you can see, Koldy UI doesn't work with any internationalization so it's up to you if you want, and how you want to format
						the message in the component.{' '}
					</Paragraph>
				</Props.Prop>
				<Props.Prop name="color" type="string" defaultValue="theme.inputField.defaults.color">
					<Paragraph>
						Use one of the keys set in <code>theme.inputField.color</code>.{' '}
					</Paragraph>
					<AvailableKeys data={colors} name="theme.inputField.color" />
				</Props.Prop>
				<Props.Prop name="size" type="string" defaultValue="theme.inputField.defaults.size">
					<Paragraph>
						Use one of the keys set in <code>theme.inputField.size</code>.{' '}
					</Paragraph>
					<AvailableKeys data={sizes} name="theme.inputField.size" />
				</Props.Prop>
				<Props.Prop name="variant" type="string" defaultValue="theme.inputField.defaults.variant">
					<Paragraph>
						Use one of the keys set in <code>theme.inputField.variant</code>. Possible variants in current theme are:{' '}
					</Paragraph>
					{Object.keys(variants).map((variant) => (
						<Code language="js" code="" key={variant} label={variant} labelWidth="auto">
							<FileField variant={variant} />
						</Code>
					))}
				</Props.Prop>
				<Props.Prop name="width" type="string" defaultValue="theme.inputField.defaults.width">
					<Paragraph>
						Use one of the keys set in <code>theme.inputField.width</code> or set your own fixed width.{' '}
					</Paragraph>
					<AvailableKeys data={widths} name="theme.inputField.width" />
					<Paragraph>Example of fixed with of 75%</Paragraph>
					<Code
						language="js"
						code={`
<FileField placeholder={({files, totalSize}) => files === null || files.length === 0 ? 'No files selected' : \`\${files.length} file(s) selected, total \${totalSize} B\`} multiple width="75%">
  <FileField.Input />
  <FileField.Box>
    {({focusField}) => (
      <Button onClick={focusField}>
        Browse
      </Button>
    )}
  </FileField.Box>
</FileField>
							`}
					>
						<FileField placeholder={placeholder} multiple width="75%">
							<FileField.Input />
							<FileField.Box>{({focusField}) => <Button onClick={focusField}>Browse</Button>}</FileField.Box>
						</FileField>
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
					<Paragraph>Called when value has changed. This is required prop when FileField is used as controlled component.</Paragraph>
					<Paragraph>Called function will get the object as first parameter that has the following keys:</Paragraph>
					<List>
						<List.Item>
							<strong>name</strong>
						</List.Item>
						<List.Item>
							<strong>files</strong>
						</List.Item>
						<List.Item>
							<strong>element</strong> - instance of <code>HTMLElement</code>
						</List.Item>
					</List>
					<Paragraph>Check the example and watch your browser's console to see the change.</Paragraph>
					<FileField name="onChangeExampleName" onChange={(o) => console.log(o)} />
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
					<FileField name="onClickExampleName" onClick={(o) => console.log(o)} />
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
					<FileField name="onDoubleClickExampleName" onDoubleClick={(o) => console.log(o)} />
				</Props.Prop>
				<Props.Prop name="onFocus" type="function">
					<Paragraph>Called when the component is focused.</Paragraph>
					<Paragraph>Called function will get the object as first parameter that has the following keys:</Paragraph>
					<List>
						<List.Item>
							<strong>name</strong>
						</List.Item>
						<List.Item>
							<strong>files</strong> - new value that has been set
						</List.Item>
						<List.Item>
							<strong>element</strong> - instance of <code>HTMLElement</code>
						</List.Item>
					</List>
					<Paragraph>Check the example and watch your browser's console to see the change.</Paragraph>
					<FileField name="onFocusExampleName" onFocus={(o) => console.log(o)} />
					<Paragraph>Check more complex example:</Paragraph>
					<FileField name="onFocusExampleName2" onFocus={(o) => console.log(o)}>
						<FileField.Text>Click me here</FileField.Text>
						<FileField.Input />
					</FileField>
				</Props.Prop>
				<Props.Prop name="onBlur" type="function">
					<Paragraph>Called when the component is blurred.</Paragraph>
					<Paragraph>Called function will get the object as first parameter that has the following keys:</Paragraph>
					<List>
						<List.Item>
							<strong>name</strong>
						</List.Item>
						<List.Item>
							<strong>files</strong> - new value that has been set
						</List.Item>
						<List.Item>
							<strong>element</strong> - instance of <code>HTMLElement</code>
						</List.Item>
					</List>
					<Paragraph>Check the example and watch your browser's console to see the change.</Paragraph>
					<FileField name="onBlurExampleName" onBlur={(o) => console.log(o)} />
				</Props.Prop>
				<Props.Prop name="disabled" type="boolean" defaultValue={false}>
					<Paragraph>
						This is standard HTML's <code>disabled</code> attribute.{' '}
					</Paragraph>
					<FileField name="disabledExample" disabled />
					<Paragraph>More complex example:</Paragraph>
					<FileField name="disabledExample2" disabled>
						<FileField.Text>Select file</FileField.Text>
						<FileField.Input />
					</FileField>
				</Props.Prop>
				<Props.Prop name="m" />
				<Props.Prop name="mt" />
				<Props.Prop name="mr" />
				<Props.Prop name="mb" />
				<Props.Prop name="ml" />
				<Props.Prop name="ref" />
			</Props>
			<Props title="Props for FileField.Input" hash="fileField-input-props">
				<Props.Prop name="flex" type={['string', 'number']}>
					All elements within the text field's container are aligned with <code>inline-flex</code>, so if you want to provide custom width
					or relative width, you may use this prop. This is standard CSS <code>flex</code> property.
				</Props.Prop>
				<Props.Prop name="width" type={['string', 'number']}>
					If you want to set custom width on the content's width, then use this prop.
				</Props.Prop>
			</Props>
			<Props title="Props for FileField.Text" hash="fileField-text-props">
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
<FileField>
  <FileField.Text>Look</FileField.Text>
  <FileField.Input />
  <FileField.Text>Go</FileField.Text>
</FileField>
					`}
				label="Example for FileField.Text:"
			>
				<FileField>
					<FileField.Text>Look</FileField.Text>
					<FileField.Input />
					<FileField.Text>Go</FileField.Text>
				</FileField>
			</Code>
			<Props title="Props for FileField.Box" hash="fileField-box-props">
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
<FileField>
  <FileField.Box alignSelf="stretch">
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
  </FileField.Box>
  <FileField.Input />
</FileField>
					`}
				label="Example for FileField.Box:"
			>
				<FileField>
					<FileField.Box alignSelf="stretch">
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
					</FileField.Box>
					<FileField.Input />
				</FileField>
			</Code>
			<H2 hash="color">Color</H2>
			<Paragraph>
				Here are examples of all variants, its color and other states, like <code>disabled</code>.
			</Paragraph>
			{Object.keys(variants).map((variant) => (
				<Fragment key={variant}>
					<Paragraph>Variant: {variant}</Paragraph>
					{Object.keys(colors).map((color) => (
						<Code
							language="js"
							code={`
<FileField placeholder={({files, totalSize}) => files === null || files.length === 0 ? 'No files selected' : \`\${files.length} file(s) selected, total \${totalSize} B\`} multiple width="auto" variant="${variant}" color="${color}">
  <FileField.Input />
  <FileField.Box>
    {({focusField}) => (
      <Button onClick={focusField} variant="${variant}" color="${color}">
        Browse
      </Button>
    )}
  </FileField.Box>
</FileField>
							`}
							key={`${variant}_${color}`}
							label={color}
							labelWidth="auto"
						>
							<FileField placeholder={placeholder} multiple width="auto" variant={variant} color={color}>
								<FileField.Input />
								<FileField.Box>
									{({focusField}) => (
										<Button onClick={focusField} variant={variant} color={color}>
											Browse
										</Button>
									)}
								</FileField.Box>
							</FileField>
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
				<Code
					language="js"
					code={`
<FileField placeholder={({files, totalSize}) => files === null || files.length === 0 ? 'No files selected' : \`\${files.length} file(s) selected, total \${totalSize} B\`} multiple width="auto" size="${t}">
  <FileField.Input />
  <FileField.Box>
    {({focusField}) => (
      <Button onClick={focusField} size="${t}">
        Browse
      </Button>
    )}
  </FileField.Box>
</FileField>
          `}
					key={t}
					label={t}
					labelWidth="auto"
				>
					<FileField placeholder={placeholder} multiple width="auto" size={t}>
						<FileField.Input />
						<FileField.Box>
							{({focusField}) => (
								<Button onClick={focusField} size={t}>
									Browse
								</Button>
							)}
						</FileField.Box>
					</FileField>
				</Code>
			))}
			<H2 hash="width">Width</H2>
			<Paragraph>It is possible to predefine width in the theme, so you can have one place from where you control the width.</Paragraph>
			<AvailableKeys data={widths} />
			{Object.keys(widths).map((t) => (
				<Code
					language="js"
					code={`
<FileField placeholder={({files, totalSize}) => files === null || files.length === 0 ? 'No files selected' : \`\${files.length} file(s) selected, total \${totalSize} B\`} multiple width="${t}">
  <FileField.Input />
  <FileField.Box>
    {({focusField}) => (
      <Button onClick={focusField}>
        Browse
      </Button>
    )}
  </FileField.Box>
</FileField>
          `}
					key={t}
					label={t}
					labelWidth="auto"
				>
					<FileField placeholder={placeholder} multiple width={t}>
						<FileField.Input />
						<FileField.Box>{({focusField}) => <Button onClick={focusField}>Browse</Button>}</FileField.Box>
					</FileField>
				</Code>
			))}
		</>
	);
}
