import React, {useContext, useState, useCallback, Fragment} from 'react';
import DocsTitle from '../../../docs/components/DocsTitle';

import ProgressBar from './ProgressBar';
import ThemeContext from '../../theme/ThemeContext';

import Props from '../../../docs/components/Props';
import DocsSubTitle from '../../../docs/components/DocsSubTitle';
import DocsText from '../../../docs/components/DocsText';
import ImportComponent from '../../../docs/components/ImportComponent';
import DocsCode from '../../../docs/components/DocsCode';
import AvailableKeys from '../../../docs/components/AvailableKeys';
import Button from '../Button/Button';

export const title = 'Progress Bar';
export const slug = 'progress-bar';
export const json = 'progressBar';

export const Documentation = function() {
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
			<DocsTitle hash="progress-bar">Progress Bar</DocsTitle>
			<ImportComponent name="ProgressBar" />
			<DocsCode>
				<DocsCode.Example>
					<ProgressBar value={value} max={max} />
					<Button onClick={handleSwitchExample} size="sm" mt="1rem">
						Change values
					</Button>
				</DocsCode.Example>
			</DocsCode>
			<DocsText>
				Progress bar is simple component that replaces HTML's <code>&lt;progress&gt;</code> tag. It's easy to customize through theme,
				because it requires only two colors, height, padding and border radius.
			</DocsText>
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
					<p>One of the values from the theme.</p>
					<AvailableKeys data={colors} />
				</Props.Prop>
				<Props.Prop name="size" type="string">
					<p>One of the values from the theme.</p>
					<p>
						Theme accepts only two values: height and padding. Height the container's height in pixels, while padding is the space between
						the par and container, in pixels.
					</p>
					<AvailableKeys data={sizes} />
				</Props.Prop>
				<Props.Prop name="variant" type="string">
					<p>One of the values from the theme.</p>
					<p>Theme accepts only number for the variant. Value is in pixels and it tells what's the border radius of container and bar.</p>
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
			<DocsSubTitle hash="color">Color</DocsSubTitle>
			<DocsText>Here are examples of all colors from the theme.</DocsText>
			{Object.keys(colors).map((color) => (
				<DocsCode key={color} labelWidth="auto" label={color}>
					<DocsCode.Example>
						<ProgressBar color={color} value={50} max={100} />
						<ProgressBar color={color} mt="1rem" />
					</DocsCode.Example>
					<DocsCode.Code>
						{`
            <ProgressBar color="${color}" value={50} max={100} />
            <ProgressBar color="${color}" mt="1rem" />
            `}
					</DocsCode.Code>
				</DocsCode>
			))}
			<DocsSubTitle hash="size">Size</DocsSubTitle>
			<DocsText>Here are examples of all sizes from the theme.</DocsText>
			{Object.keys(sizes).map((size) => (
				<DocsCode key={size} labelWidth="auto" label={size}>
					<DocsCode.Example>
						<ProgressBar size={size} value={50} max={100} />
						<ProgressBar size={size} mt="1rem" />
					</DocsCode.Example>
					<DocsCode.Code>
						{`
            <ProgressBar size="${size}" value={50} max={100} />
            <ProgressBar size="${size}" mt="1rem" />
            `}
					</DocsCode.Code>
				</DocsCode>
			))}
			<DocsSubTitle hash="variant">Variant</DocsSubTitle>
			<DocsText>Here are examples of all variants from the theme.</DocsText>
			{Object.keys(variants).map((variant) => (
				<DocsCode key={variant} labelWidth="auto" label={variant}>
					<DocsCode.Example>
						{Object.keys(sizes).map((size) => (
							<Fragment key={size}>
								<ProgressBar variant={variant} size={size} mt="1rem" value={50} max={100} />
								<ProgressBar variant={variant} size={size} mt="0.25rem" />
							</Fragment>
						))}
					</DocsCode.Example>
				</DocsCode>
			))}
		</>
	);
};
