import React, {useContext} from 'react';
import DocsTitle from '../../../docs/components/DocsTitle';

import ThemeContext from '../../theme/ThemeContext';

import Props from '../../../docs/components/Props';
import DocsSubTitle from '../../../docs/components/DocsSubTitle';
import DocsText from '../../../docs/components/DocsText';
import ImportComponent from '../../../docs/components/ImportComponent';
import Radio from './Radio';
import DocsCode from '../../../docs/components/DocsCode';
import AvailableKeys from '../../../docs/components/AvailableKeys';
import Box from '../Box/Box';
import Text from '../Text/Text';

export const title = 'Radio';
export const slug = 'radio';
export const json = 'checkboxAndRadio';

export const Documentation = function() {
	const {theme} = useContext(ThemeContext);

	const sizes = theme.json('checkboxAndRadio.size');
	const colors = theme.json('checkboxAndRadio.color');
	const variants = ['checkmark-square', 'checkmark-round', 'dot-square', 'dot-round', 'switch-square', 'switch-round'];

	return (
		<>
			<DocsTitle hash="checkbox">Radio</DocsTitle>
			<ImportComponent name="Radio" />
			<DocsCode>
				<DocsCode.Example>
					<Radio defaultValue={true} onChange={(x) => console.log(x)}>
						<Box as="label" p={4}>
							<Radio.Option value={1} /> 1
						</Box>
						<Box as="label" p={4}>
							<Radio.Option value="2" /> "2"
						</Box>
						<Box as="label" p={4}>
							<Radio.Option value={null} mr={10} /> null
						</Box>
						<Box as="label" p={4}>
							<Radio.Option value={true} /> true
						</Box>
						<Box as="label" p={4}>
							<Radio.Option value={false} /> false
						</Box>
						<Box as="label" p={4}>
							<Radio.Option /> undefined
						</Box>
					</Radio>
				</DocsCode.Example>
				<DocsCode.Code>
					{`
					<Radio defaultValue={true} onChange={(x) => console.log(x)}>
						<Box as="label" p={4}>
							<Radio.Option value={1} /> 1
						</Box>
						<Box as="label" p={4}>
							<Radio.Option value="2" /> "2"
						</Box>
						<Box as="label" p={4}>
							<Radio.Option value={null} mr={10} /> null
						</Box>
						<Box as="label" p={4}>
							<Radio.Option value={true} /> true
						</Box>
						<Box as="label" p={4}>
							<Radio.Option value={false} /> false
						</Box>
						<Box as="label" p={4}>
							<Radio.Option /> undefined
						</Box>
					</Radio>
					`}
				</DocsCode.Code>
			</DocsCode>
			<Props title="Props for Radio">
				<Props.Prop name="children" type="node" required>
					<code>Radio</code> component is just wrapper for its options, but in order to allow any layout you want, you may put anything
					here, but in some point, use <code>Radio.Option</code>. <code>Radio.Option</code> components won't work properly if it's not
					within the <code>Radio</code>.
				</Props.Prop>
				<Props.Prop name="name" type="string">
					Name used for forms.
				</Props.Prop>
				<Props.Prop name="value" type={['string', 'number', 'bool']}>
					If <code>value</code> is set, it means you'll use this component as controlled component, so <code>onChange</code> handler is
					required as well.
				</Props.Prop>
				<Props.Prop name="defaultValue" type={['string', 'number', 'bool']}>
					If <code>defaultValue</code> is set, it means you'll use this component as uncontrolled component.
				</Props.Prop>
				<Props.Prop name="size" type="string" defaultValue="theme.checkboxAndRadio.defaults.size">
					<p>The predefined size for the radio. Define as many sizes in theme as you want.</p>
					<AvailableKeys data={sizes} />
				</Props.Prop>
				<Props.Prop name="variant" type="string" defaultValue="theme.checkboxAndRadio.defaults.variant">
					<p>
						Same radio behavior can be applied on a components with a different look. Using this prop, you're telling how do you want the
						radio to look like.
					</p>
					<p>
						Unlike other components where variants can be defined in the theme, here, variants are predefined and you may choose one of:
					</p>
					<p>
						{variants.map((variant) => (
							<code key={variant}>{variant}</code>
						))}
					</p>
				</Props.Prop>
				<Props.Prop name="color" type="string" defaultValue="theme.checkboxAndRadio.defaults.color">
					<p>The radio's color variations defined in theme.</p>
					<AvailableKeys data={colors} />
				</Props.Prop>
				<Props.Prop name="disabled" type="bool" defaultValue="false">
					Set this prop to disabled if you want to disable all options within this <code>Radio</code> set.
				</Props.Prop>
				<Props.Prop name="onChange" type="function">
					<p>Function called when value has changed. It'll get the object for the first parameter with the following keys:</p>
					<ul>
						<li>
							<strong>name</strong>
						</li>
						<li>
							<strong>value</strong>
						</li>
						<li>
							<strong>element</strong> - instance of <code>HTMLElement</code>
						</li>
					</ul>
				</Props.Prop>
			</Props>
			<Props title="Props for Radio.Option">
				<Props.Prop name="value" type={['string', 'number', 'bool']}>
					The standard <code>value</code> of <code>&lt;input type="radio"/&gt;</code>.
				</Props.Prop>
				<Props.Prop name="disabled" type="bool" defaultValue="false">
					Use this prop if you want to disable specific option.
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
							<Box p="0.5rem" key={variant}>
								<Radio name={`size_example_${variant}_${val}`} variant={variant} size={val} defaultValue={1}>
									<Text as="label">
										<Radio.Option value={1} /> one
									</Text>
									<Text as="label" ml="1rem">
										<Radio.Option value={2} /> two
									</Text>
								</Radio>
							</Box>
						))}
					</DocsCode.Example>
					<DocsCode.Code>
						{variants
							.map(
								(variant) => `
									<Box p="0.5rem">
										<Radio name="size_example_${variant}_${val}" variant="${variant}" size="${val}" defaultValue={1}>
											<Text as="label">
												<Radio.Option value={1} /> one
											</Text>
											<Text as="label" ml="1rem">
												<Radio.Option value={2} /> two
											</Text>
										</Radio>
									</Box>
								`
							)
							.join('')}
					</DocsCode.Code>
				</DocsCode>
			))}
			<DocsSubTitle hash="color">Color</DocsSubTitle>
			<DocsText>
				Defining color for radio is very limited when compared to other components and there are just few states. If you think of radio very
				carefully, you'll see:
			</DocsText>
			<DocsText>
				<ul>
					<li>there are two states: active (checked) and inactive (unchecked)</li>
					<li>there are two elements: container (outer element) and marker (inline element)</li>
					<li>for each element and for each state, you can set the color and the hover color</li>
					<li>^ that's the total of 8 colors that should be defined in the theme</li>
				</ul>
			</DocsText>
			{Object.keys(colors).map((val) => (
				<DocsCode key={val} label={val} labelWidth="auto">
					<DocsCode.Example>
						{variants.map((variant) => (
							<Box p="0.5rem" key={variant}>
								<Radio name={`size_example_${variant}_${val}`} variant={variant} color={val} defaultValue={1}>
									<Text as="label">
										<Radio.Option value={1} /> one
									</Text>
									<Text as="label" ml="1rem">
										<Radio.Option value={2} /> two
									</Text>
								</Radio>
							</Box>
						))}
					</DocsCode.Example>
					<DocsCode.Code>
						{variants
							.map(
								(variant) => `
									<Box p="0.5rem">
										<Radio name="size_example_${variant}_${val}" variant="${variant}" color="${val}" defaultValue={1}>
											<Text as="label">
												<Radio.Option value={1} /> one
											</Text>
											<Text as="label" ml="1rem">
												<Radio.Option value={2} /> two
											</Text>
										</Radio>
									</Box>
								`
							)
							.join('')}
					</DocsCode.Code>
				</DocsCode>
			))}
			<DocsSubTitle hash="variant">Variant</DocsSubTitle>
			<DocsText>Variant is prop that tells how component will look like. Same functionality can be achieved with different look.</DocsText>
			<DocsText>
				Unlike other components where variants can be defined in the theme, this component doesn't allow that. There are few predefined
				variant values:
				{variants.map((variant) => (
					<code key={variant}>{variant}</code>
				))}
				. Each of the values represent one styled component. Size and colors are the only parameters you can modify. Even with this limited
				parametrization, you can achieve some effects, like this:
			</DocsText>
			{variants.map((variant) => (
				<DocsCode key={variant} label={variant} labelWidth="auto">
					<DocsCode.Example>
						<Radio name={`size_example_variant_${variant}`} variant={variant} defaultValue={1}>
							<Text as="label">
								<Radio.Option value={1} /> one
							</Text>
							<Text as="label" ml="1rem">
								<Radio.Option value={2} /> two
							</Text>
						</Radio>
					</DocsCode.Example>
					<DocsCode.Code>
						{`
							<Radio name="size_example_variant_${variant}" variant="${variant}" defaultValue={1}>
								<Text as="label">
									<Radio.Option value={1} /> one
								</Text>
								<Text as="label" ml="1rem">
									<Radio.Option value={2} /> two
								</Text>
							</Radio>
						`}
					</DocsCode.Code>
				</DocsCode>
			))}
		</>
	);
};
