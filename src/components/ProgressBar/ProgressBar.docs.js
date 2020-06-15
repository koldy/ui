import React, {useContext, useState, useCallback, Fragment} from 'react';

import ProgressBar from './ProgressBar';
import ThemeContext from '../../theme/ThemeContext';

import Props from '../../../docs/components/Props';
import AvailableKeys from '../../../docs/components/AvailableKeys';
import Button from '../Button/Button';
import H1 from '../../../docs/components/H1';
import Code from '../../../docs/components/Code';
import H2 from '../../../docs/components/H2';
import Paragraph from '../../../docs/components/Paragraph';

export const title = 'Progress Bar';
export const route = '/progress-bar';
export const json = 'progressBar';

export default function ProgressBarDocs() {
	const {theme} = useContext(ThemeContext);

	const [{value = null, max = null}, setValues] = useState({});

	const variants = theme.json('progressBar.variant');
	const colors = theme.json('progressBar.color');
	const sizes = theme.json('progressBar.size');

	const handleSwitchExample = useCallback(() => {
		if (value === null || max === null) {
			setValues({
				value: 50,
				max: 100
			});
		} else {
			setValues({
				value: null,
				max: null
			});
		}
	}, [value, max]);

	return (
		<>
			<H1 hash="progress-bar">Progress Bar</H1>
			<Code language="js" code="import {ProgressBar} from 'koldy-ui';" />
			<Code language="js" code="">
				<>
					<ProgressBar value={value} max={max} />
					<Button onClick={handleSwitchExample} size="sm" mt="1rem">
						Change values
					</Button>
				</>
			</Code>
			<Paragraph>
				Progress bar is simple component that replaces HTML's <code>&lt;progress&gt;</code> tag. It's easy to customize through theme,
				because it requires only two colors, height, padding and border radius.
			</Paragraph>
			<Props>
				<Props.Prop name="value" type="number">
					When setting determinate progress, then you have to set <code>value</code> and <code>max</code> props so the component can
					calculate the percentage of the bar. If that's not possible, then it'll always show 100%.
				</Props.Prop>
				<Props.Prop name="max" type="number">
					When setting determinate progress, then you have to set <code>value</code> and <code>max</code> props so the component can
					calculate the percentage of the bar. If that's not possible, then it'll always show 100%.
				</Props.Prop>
				<Props.Prop name="color" type="string">
					<Paragraph>One of the values from the theme.</Paragraph>
					<AvailableKeys data={colors} />
				</Props.Prop>
				<Props.Prop name="size" type="string">
					<Paragraph>One of the values from the theme.</Paragraph>
					<Paragraph>
						Theme accepts only two values: height and padding. Height the container's height in pixels, while padding is the space between
						the par and container, in pixels.
					</Paragraph>
					<AvailableKeys data={sizes} />
				</Props.Prop>
				<Props.Prop name="variant" type="string">
					<Paragraph>One of the values from the theme.</Paragraph>
					<Paragraph>
						Theme accepts only number for the variant. Value is in pixels and it tells what's the border radius of container and bar.
					</Paragraph>
					<AvailableKeys data={variants} />
				</Props.Prop>
				<Props.Prop name="width" type={['string', 'number']} defaultValue="100%">
					If you want to set the fixed width, then use this prop. Ny default, component is 100% wide.
				</Props.Prop>
				<Props.Prop name="maxWidth" type={['string', 'number']}>
					Use this prop to set the CSS's <code>max-width</code>.
				</Props.Prop>
				<Props.Prop name="minWidth" type={['string', 'number']}>
					Use this prop to set the CSS's <code>min-width</code>.
				</Props.Prop>
				<Props.Prop name="m" />
				<Props.Prop name="mt" />
				<Props.Prop name="mr" />
				<Props.Prop name="mb" />
				<Props.Prop name="ml" />
			</Props>
			<H2 hash="color">Color</H2>
			<Paragraph>Here are examples of all colors from the theme.</Paragraph>
			{Object.keys(colors).map((color) => (
				<Code
					language="js"
					code={`
<ProgressBar color="${color}" value={50} max={100} />
<ProgressBar color="${color}" mt="1rem" />
            `}
					key={color}
					label={color}
				>
					<ProgressBar color={color} value={50} max={100} />
					<ProgressBar color={color} mt="1rem" />
				</Code>
			))}
			<H2 hash="size">Size</H2>
			<Paragraph>Here are examples of all sizes from the theme.</Paragraph>
			{Object.keys(sizes).map((size) => (
				<Code
					language="js"
					code={`
<ProgressBar size="${size}" value={50} max={100} />
<ProgressBar size="${size}" mt="1rem" />
            `}
					key={size}
					label={size}
				>
					<ProgressBar size={size} value={50} max={100} />
					<ProgressBar size={size} mt="1rem" />
				</Code>
			))}
			<H2 hash="variant">Variant</H2>
			<Paragraph>Here are examples of all variants from the theme.</Paragraph>
			{Object.keys(variants).map((variant) => (
				<Code language="js" code="" key={variant} labelWidth="auto" label={variant}>
					{Object.keys(sizes).map((size) => (
						<Fragment key={size}>
							<ProgressBar variant={variant} size={size} mt="1rem" value={50} max={100} />
							<ProgressBar variant={variant} size={size} mt="0.25rem" />
						</Fragment>
					))}
				</Code>
			))}
		</>
	);
}
