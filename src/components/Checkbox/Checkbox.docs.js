import React, {Fragment, useContext, useState} from 'react';

import ThemeContext from '../../theme/ThemeContext';

import Props from '../../../docs/components/Props';
import Checkbox from './Checkbox';
import AvailableKeys from '../../../docs/components/AvailableKeys';
import Box from '../Box/Box';
import Text from '../Text/Text';
import H1 from '../../../docs/components/H1';
import Code from '../../../docs/components/Code';
import Paragraph from '../../../docs/components/Paragraph';
import List from '../../../docs/components/List';
import H2 from '../../../docs/components/H2';

export const title = 'Checkbox';
export const route = '/checkbox';
export const json = 'checkboxAndRadio';

export default function CheckboxDocs() {
	const {theme} = useContext(ThemeContext);

	const sizes = theme.json('checkboxAndRadio.size');
	const colors = theme.json('checkboxAndRadio.color');
	const variants = ['checkmark-square', 'checkmark-round', 'dot-square', 'dot-round', 'switch-square', 'switch-round'];

	const [checked, setChecked] = useState(false);

	return (
		<>
			<H1>Checkbox</H1>
			<Code language="js" code="import {Checkbox} from 'koldy-ui';" />
			<Code
				language="js"
				code={`
<Checkbox id="chkExample" />{' '}
<Text htmlFor="chkExample">This is just an example</Text>
        `}
			>
				<Checkbox id="chkExample" /> <Text htmlFor="chkExample">This is just an example</Text>
			</Code>
			<Props>
				<Props.Prop name="name" type="string">
					Name used for forms.
				</Props.Prop>
				<Props.Prop name="value" type={['string', 'number']}>
					Value used for forms.
				</Props.Prop>
				<Props.Prop name="offValue" type={['string', 'number']} defaultValue="undefined">
					<Paragraph>
						By default, Checkbox component will behave just like the regular HTML5 checkbox: if value is checked, value will be serialized
						in form. If value is not checked, value will be completely omitted from serialization and that behaviour is sometimes very
						annoying.
					</Paragraph>
					<Paragraph>In some cases, you'll want to get the value of unchecked checkbox and this prop solves that problem.</Paragraph>
					<Paragraph>
						Note 1: this won't work if <code>name</code> is not set.
					</Paragraph>
					<Paragraph>
						Note 2: if <code>offValue</code> is set, it'll be rendered as hidden field with the same name and the name from the input tag
						will be removed so the eventual manual serialization don't serialize two fields.
					</Paragraph>
				</Props.Prop>
				<Props.Prop name="checked" type="bool" defaultValue="undefined">
					If you want to create controlled checkbox component, then set this prop. When component is controlled, you're required to set the{' '}
					<code>onChange</code> function as well.
				</Props.Prop>
				<Props.Prop name="defaultChecked" type="bool" defaultValue="undefined">
					If you want to create uncontrolled checkbox component, then use this prop to set the initial "checked".
				</Props.Prop>
				<Props.Prop name="size" type="string" defaultValue="theme.checkboxAndRadio.defaults.size">
					<Paragraph>The predefined size for the checkbox. Define as many sizes in theme as you want.</Paragraph>
					<AvailableKeys data={sizes} />
				</Props.Prop>
				<Props.Prop name="variant" type="string" defaultValue="theme.checkboxAndRadio.defaults.variant">
					<Paragraph>
						Same checkbox behavior can be applied on a components with a different look. Using this prop, you're telling how do you want the
						checkbox to look like.
					</Paragraph>
					<Paragraph>
						Unlike other components where variants can be defined in the theme, here, variants are predefined and you may choose one of:
					</Paragraph>
					<Paragraph>
						{variants.map((variant) => (
							<Fragment key={variant}>
								<code>{variant}</code>{' '}
							</Fragment>
						))}
					</Paragraph>
				</Props.Prop>
				<Props.Prop name="color" type="string" defaultValue="theme.checkboxAndRadio.defaults.color">
					<Paragraph>The checkbox's color variations defined in theme.</Paragraph>
					<AvailableKeys data={colors} />
				</Props.Prop>
				<Props.Prop name="onChange" type="function">
					<Paragraph>
						Function called when value has changed. It'll get the object for the first parameter with the following keys:
					</Paragraph>
					<List>
						<List.Item>
							<strong>name</strong>
						</List.Item>
						<List.Item>
							<strong>checked</strong> - boolean
						</List.Item>
						<List.Item>
							<strong>value</strong>
						</List.Item>
						<List.Item>
							<strong>offValue</strong>
						</List.Item>
						<List.Item>
							<strong>element</strong> - instance of <code>HTMLElement</code>
						</List.Item>
					</List>
				</Props.Prop>
				<Props.Prop name="m" />
				<Props.Prop name="mt" />
				<Props.Prop name="mr" />
				<Props.Prop name="mb" />
				<Props.Prop name="ml" />
				<Props.Prop name="ref" />
			</Props>
			<H2 hash="size">Size</H2>
			<Paragraph>It's possible to define as many sizes as you want in the theme. Available sizes are:</Paragraph>
			{Object.keys(sizes).map((val) => (
				<Code
					language="js"
					code={variants.map((variant) => `<Checkbox size="${val}" variant="${variant}" />`).join('\n')}
					key={val}
					label={val}
					labelWidth="auto"
				>
					{variants.map((variant) => (
						<Checkbox key={variant} variant={variant} size={val} mr={10} />
					))}
				</Code>
			))}
			<H2 hash="color">Color</H2>
			<Paragraph>
				Defining color for checkbox is very limited when compared to other components and there are just few states. If you think of
				checkbox very carefully, you'll see:
			</Paragraph>
			<List>
				<List.Item>there are two states: active (checked) and inactive (unchecked)</List.Item>
				<List.Item>there are two elements: container (outer element) and marker (inline element)</List.Item>
				<List.Item>for each element and for each state, you can set the color and the hover color</List.Item>
				<List.Item>^ that's the total of 8 colors that should be defined in the theme</List.Item>
			</List>
			{Object.keys(colors).map((color) => (
				<Code
					language="js"
					code={variants
						.map(
							(variant) =>
								`
<Box mt="0.5rem" mb="0.5rem">
	<Checkbox variant="${variant}" color="${color}" m="0.25rem" />
	<Checkbox variant="${variant}" color="${color}" m="0.25rem" defaultChecked />
	<Checkbox variant="${variant}" color="${color}" m="0.25rem" disabled />
	<Checkbox variant="${variant}" color="${color}" m="0.25rem" disabled defaultChecked />
</Box>`
						)
						.join('\n')}
					key={color}
					label={color}
					labelWidth="auto"
				>
					{variants.map((variant) => (
						<Box key={variant} mt="0.5rem" mb="0.5rem">
							<Checkbox variant={variant} color={color} m="0.25rem" />
							<Checkbox variant={variant} color={color} m="0.25rem" defaultChecked />
							<Checkbox variant={variant} color={color} m="0.25rem" disabled />
							<Checkbox variant={variant} color={color} m="0.25rem" disabled defaultChecked />
						</Box>
					))}
				</Code>
			))}
			<H2 hash="variant">Variant</H2>
			<Paragraph>
				Variant is prop that tells how component will look like. Same functionality can be achieved with different look.
			</Paragraph>
			<Paragraph>
				Unlike other components where variants can be defined in the theme, this component doesn't allow that. There are few predefined
				variant values:
				<AvailableKeys data={variants} hideLabel />. Each of the values represent one styled component. Size and colors are the only
				parameters you can modify. Even with this limited parametrization, you can achieve some effects, like this:
			</Paragraph>
			<Code
				language="js"
				code={`
const [checked, setChecked] = useState(false);

<Checkbox
  checked={checked}
  onChange={() => setChecked(!checked)}
  variant={checked ? 'checkmark-round' : 'checkmark-square'}
/>
					`}
			>
				<Checkbox
					checked={checked}
					onChange={() => setChecked(!checked)}
					variant={checked ? 'checkmark-round' : 'checkmark-square'}
					id="chkEffect"
				/>
				<label htmlFor="chkEffect">Click me</label>
			</Code>
		</>
	);
}
