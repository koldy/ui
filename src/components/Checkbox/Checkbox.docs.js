import React, {Fragment, useContext, useState} from 'react';
import DocsTitle from '../../../docs/components/DocsTitle';

import ThemeContext from '../../theme/ThemeContext';

import Props from '../../../docs/components/Props';
import DocsSubTitle from '../../../docs/components/DocsSubTitle';
import DocsText from '../../../docs/components/DocsText';
import ImportComponent from '../../../docs/components/ImportComponent';
import Checkbox from './Checkbox';
import DocsCode from '../../../docs/components/DocsCode';
import AvailableKeys from '../../../docs/components/AvailableKeys';
import Box from '../Box/Box';
import Text from '../Text/Text';

export const title = 'Checkbox';
export const slug = 'checkbox';
export const json = 'checkboxAndRadio';

export const Documentation = function() {
	const {theme} = useContext(ThemeContext);

	const sizes = theme.json('checkboxAndRadio.size');
	const colors = theme.json('checkboxAndRadio.color');
	const variants = ['checkmark-square', 'checkmark-round', 'dot-square', 'dot-round', 'switch-square', 'switch-round'];

	const [checked, setChecked] = useState(false);

	return (
		<>
			<DocsTitle hash="checkbox">Checkbox</DocsTitle>
			<ImportComponent name="Checkbox" />
			<DocsCode>
				<DocsCode.Example>
					<Checkbox id="chkExample" /> <Text htmlFor="chkExample">This is just an example</Text>
				</DocsCode.Example>
				<DocsCode.Code>
					{`
					<Checkbox id="chkExample" />{' '}
					<Text htmlFor="chkExample">This is just an example</Text>
					`}
				</DocsCode.Code>
			</DocsCode>
			<Props>
				<Props.Prop name="name" type="string">
					Name used for forms.
				</Props.Prop>
				<Props.Prop name="value" type={['string', 'number']}>
					Value used for forms.
				</Props.Prop>
				<Props.Prop name="offValue" type={['string', 'number']} defaultValue="undefined">
					<p>
						By default, Checkbox component will behave just like the regular HTML5 checkbox: if value is checked, value
						will be serialized in form. If value is not checked, value will be completely omitted from serialization and
						that behaviour is sometimes very annoying.
					</p>
					<p>In some cases, you'll want to get the value of unchecked checkbox and this prop solves that problem.</p>
					<p>
						Note 1: this won't work if <code>name</code> is not set.
					</p>
					<p>
						Note 2: if <code>offValue</code> is set, it'll be rendered as hidden field with the same name and the name
						from the input tag will be removed so the eventual manual serialization don't serialize two fields.
					</p>
				</Props.Prop>
				<Props.Prop name="checked" type="bool" defaultValue="undefined">
					If you want to create controlled checkbox component, then set this prop. When component is controlled, you're
					required to set the <code>onChange</code> function as well.
				</Props.Prop>
				<Props.Prop name="defaultChecked" type="bool" defaultValue="undefined">
					If you want to create uncontrolled checkbox component, then use this prop to set the initial "checked".
				</Props.Prop>
				<Props.Prop name="size" type="string" defaultValue="theme.checkboxAndRadio.defaults.size">
					<p>The predefined size for the checkbox. Define as many sizes in theme as you want.</p>
					<AvailableKeys data={sizes} />
				</Props.Prop>
				<Props.Prop name="variant" type="string" defaultValue="theme.checkboxAndRadio.defaults.variant">
					<p>
						Same checkbox behavior can be applied on a components with a different look. Using this prop, you're telling
						how do you want the checkbox to look like.
					</p>
					<p>
						Unlike other components where variants can be defined in the theme, here, variants are predefined and you
						may choose one of:
					</p>
					<p>
						{variants.map((variant) => (
							<Fragment key={variant}>
								<code>{variant}</code>{' '}
							</Fragment>
						))}
					</p>
				</Props.Prop>
				<Props.Prop name="color" type="string" defaultValue="theme.checkboxAndRadio.defaults.color">
					<p>The checkbox's color variations defined in theme.</p>
					<AvailableKeys data={colors} />
				</Props.Prop>
				<Props.Prop name="onChange" type="func">
					<p>
						Function called when value has changed. It'll get the object for the first parameter with the following
						keys:
					</p>
					<ul>
						<li>
							<strong>name</strong>
						</li>
						<li>
							<strong>checked</strong> - boolean
						</li>
						<li>
							<strong>value</strong>
						</li>
						<li>
							<strong>offValue</strong>
						</li>
						<li>
							<strong>element</strong> - instance of <code>HTMLElement</code>
						</li>
					</ul>
				</Props.Prop>
				<Props.Prop name="m" />
				<Props.Prop name="mt" />
				<Props.Prop name="mr" />
				<Props.Prop name="mb" />
				<Props.Prop name="ml" />
				<Props.Prop name="ref" />
			</Props>
			<DocsSubTitle hash="size">Size</DocsSubTitle>
			<DocsText>It's possible to define as many sizes as you want in the theme. Available sizes are:</DocsText>
			{Object.keys(sizes).map((val) => (
				<DocsCode key={val} label={val} labelWidth="auto">
					<DocsCode.Example>
						{variants.map((variant) => (
							<Checkbox key={variant} variant={variant} size={val} mr={10} />
						))}
					</DocsCode.Example>
					<DocsCode.Code>
						{variants.map((variant) => `<Checkbox size="${val}" variant="${variant}" />`).join('\n')}
					</DocsCode.Code>
				</DocsCode>
			))}
			<DocsSubTitle hash="color">Color</DocsSubTitle>
			<DocsText>
				Defining color for checkbox is very limited when compared to other components and there are just few states. If
				you think of checkbox very carefully, you'll see:
			</DocsText>
			<DocsText>
				<ul>
					<li>there are two states: active (checked) and inactive (unchecked)</li>
					<li>there are two elements: container (outer element) and marker (inline element)</li>
					<li>for each element and for each state, you can set the color and the hover color</li>
					<li>^ that's the total of 8 colors that should be defined in the theme</li>
				</ul>
			</DocsText>
			{Object.keys(colors).map((color) => (
				<DocsCode key={color} label={color} labelWidth="auto">
					<DocsCode.Example>
						{variants.map((variant) => (
							<Box key={variant} mt="0.5rem" mb="0.5rem">
								<Checkbox variant={variant} color={color} m="0.25rem" />
								<Checkbox variant={variant} color={color} m="0.25rem" defaultChecked />
								<Checkbox variant={variant} color={color} m="0.25rem" disabled />
								<Checkbox variant={variant} color={color} m="0.25rem" disabled defaultChecked />
							</Box>
						))}
					</DocsCode.Example>
					<DocsCode.Code>
						{variants
							.map(
								(variant) =>
									`<Box mt="0.5rem" mb="0.5rem">
	<Checkbox variant="${variant}" color="${color}" m="0.25rem" />
	<Checkbox variant="${variant}" color="${color}" m="0.25rem" defaultChecked />
	<Checkbox variant="${variant}" color="${color}" m="0.25rem" disabled />
	<Checkbox variant="${variant}" color="${color}" m="0.25rem" disabled defaultChecked />
</Box>`
							)
							.join('\n')}
					</DocsCode.Code>
				</DocsCode>
			))}
			<DocsSubTitle hash="variant">Variant</DocsSubTitle>
			<DocsText>
				Variant is prop that tells how component will look like. Same functionality can be achieved with different look.
			</DocsText>
			<DocsText>
				Unlike other components where variants can be defined in the theme, this component doesn't allow that. There are
				few predefined variant values:
				{variants.map((variant) => (
					<code key={variant}>{variant}</code>
				))}
				. Each of the values represent one styled component. Size and colors are the only parameters you can modify.
				Even with this limited parametrization, you can achieve some effects, like this:
			</DocsText>
			<DocsCode>
				<DocsCode.Example>
					<Checkbox
						checked={checked}
						onChange={() => setChecked(!checked)}
						variant={checked ? 'checkmark-round' : 'checkmark-square'}
						id="chkEffect"
					/>
					<label htmlFor="chkEffect">Click me</label>
				</DocsCode.Example>
				<DocsCode.Code>
					{`
					const [checked, setChecked] = useState(false);
					
					<Checkbox
						checked={checked}
						onChange={() => setChecked(!checked)}
						variant={checked ? 'checkmark-round' : 'checkmark-square'}
					/>
					`}
				</DocsCode.Code>
			</DocsCode>
		</>
	);
};
