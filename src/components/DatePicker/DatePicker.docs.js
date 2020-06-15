import React, {useContext} from 'react';

import DatePicker from './DatePicker';
import ThemeContext from '../../theme/ThemeContext';

import Props from '../../../docs/components/Props';
import AvailableKeys from '../../../docs/components/AvailableKeys';
import Button from '../Button/Button';
import H1 from '../../../docs/components/H1';
import Code from '../../../docs/components/Code';
import List from '../../../docs/components/List';
import H2 from '../../../docs/components/H2';
import Paragraph from '../../../docs/components/Paragraph';

export const title = 'Date Picker';
export const route = '/date-picker';
export const json = 'datePicker';

export default function DatePickerDocumentation() {
	const {theme} = useContext(ThemeContext);

	const sizes = theme.json('datePicker.size');
	const colors = theme.json('datePicker.color');
	const variants = theme.json('datePicker.variant');

	const sizes2 = theme.json('inputField.size');
	const colors2 = theme.json('inputField.color');

	return (
		<>
			<H1 hash="text">Date Picker</H1>
			<Code language="js" code="import {DatePicker} from 'koldy-ui';" />
			<Code language="js" code="<DatePicker />">
				<DatePicker />
			</Code>
			<Paragraph>
				DatePicker component is a calendar that can be used as input component for selecting date and time. Check the props to explore more
				options.
			</Paragraph>
			<Props>
				<Props.Prop name="children" type={['node', 'func']}>
					<Paragraph>
						Children can be used for adding additional content under the calendar itself. If it's used as <code>node</code>, then the
						content will be just appended. If it's used as <code>function</code>, then the function will get some useful information. First
						parameter of the function is object with the following keys:
					</Paragraph>
					<List>
						<List.Item>
							<strong>setSelectedDate</strong> - function that can be used for setting the calendar's internal date. Pass instance of{' '}
							<code>Date</code> as first parameter.
						</List.Item>
						<List.Item>
							<strong>selectedDate</strong> - instance of <code>Date</code> or <code>null</code> - current date in the component
						</List.Item>
						<List.Item>
							<strong>setViewDate</strong> - using this function you're able to set the month that is currently being seen by end user. This
							can be used when <code>selectedDate</code> is not yet set.
						</List.Item>
						<List.Item>
							<strong>minDate</strong> - instance of <code>Date</code> - if you didn't pass the <code>minDate</code> by yourself, then
							you'll get the calculated minimum date here
						</List.Item>
						<List.Item>
							<strong>maxDate</strong> - instance of <code>Date</code> - if you didn't pass the <code>maxDate</code> by yourself, then
							you'll get the calculated maximum date here
						</List.Item>
					</List>
					<Code
						language="js"
						code={`
<DatePicker>
  {({setSelectedDate}) => (
    <>
      <Button onClick={() => setSelectedDate(new Date())}>Set today</Button>
      <Button onClick={() => setSelectedDate(null)}>Clear</Button>
    </>
  )}
</DatePicker>
            `}
					>
						<DatePicker>
							{({setSelectedDate}) => (
								<>
									<Button onClick={() => setSelectedDate(new Date())}>Set today</Button>
									<Button onClick={() => setSelectedDate(null)}>Clear</Button>
								</>
							)}
						</DatePicker>
					</Code>
				</Props.Prop>
				<Props.Prop name="name" type="string">
					<Paragraph>If set, value will be rendered as hidden field and will be visible while serializing data in form.</Paragraph>
					<Paragraph>
						To customize value in hidden field, use <code>valueFormat</code> prop.
					</Paragraph>
				</Props.Prop>
				<Props.Prop name="firstDayOfWeek" type="number" defaultValue={1}>
					<Paragraph>First day of week. 1 for Monday, 0 for Sunday. Here's an example when first day of week is Sunday:</Paragraph>
					<Code language="js" code={`<DatePicker firstDayOfWeek={0} />`}>
						<DatePicker firstDayOfWeek={0} />
					</Code>
				</Props.Prop>
				<Props.Prop name="value" type="Date">
					If you plan to use this component as controlled component, then set the Date. If you want to use it as controlled component
					without initial value, then pass <code>null</code> as initial value.
				</Props.Prop>
				<Props.Prop name="value" type="Date">
					If you plan to use this component as uncontrolled component, but want to set the initial value, then use this prop.
				</Props.Prop>
				<Props.Prop name="valueFormat" type="function">
					To customize the value rendered as hidden field when using <code>name</code> prop, use this prop. First parameter of this function
					is either instance of <code>Date</code> or <code>null</code>.
				</Props.Prop>
				<Props.Prop name="initialMonth" type="Date" defaultValue="new Date()">
					If you don't set the initial value, by default, calendar will show the current month. If you want to change the initial month, you
					may do that by setting this prop.
				</Props.Prop>
				<Props.Prop name="minDate" type="Date" defaultValue="last 100 years">
					<Paragraph>
						If set, it won't be possible to select date lower than this date. In this example, min date is set to today.
					</Paragraph>
					<Code language="js" code={`<DatePicker minDate={new Date()} />`}>
						<DatePicker minDate={new Date()} />
					</Code>
				</Props.Prop>
				<Props.Prop name="maxDate" type="Date" defaultValue="next 100 years">
					<Paragraph>
						If set, it won't be possible to select date greater than this date. In this example, min date is set to today.
					</Paragraph>
					<Code language="js" code={`<DatePicker maxDate={new Date()} />`}>
						<DatePicker maxDate={new Date()} />
					</Code>
				</Props.Prop>
				<Props.Prop name="color" type="string" defaultValue="theme.datePicker.defaults.color">
					<Paragraph>
						Use one of the keys set in <code>theme.datePicker.color</code>.
					</Paragraph>
					<AvailableKeys data={colors} name="theme.datePicker.color" />
					<Paragraph>See the color section for more examples.</Paragraph>
				</Props.Prop>
				<Props.Prop name="size" type="string" defaultValue="theme.datePicker.defaults.size">
					<Paragraph>
						Use one of the keys set in <code>theme.datePicker.size</code>.
					</Paragraph>
					<AvailableKeys data={sizes} name="theme.datePicker.size" />
					<Paragraph>See the size section for more examples.</Paragraph>
				</Props.Prop>
				<Props.Prop name="variant" type="string" defaultValue="theme.datePicker.defaults.variant">
					<Paragraph>
						Use one of the keys set in <code>theme.datePicker.variant</code>. Possible variants in current theme are:
					</Paragraph>
					<AvailableKeys data={variants} />
					<Paragraph>See the variant section for more examples.</Paragraph>
				</Props.Prop>
				<Props.Prop name="onChange" type="function">
					<Paragraph>Called when value has changed. This is required prop when DatePicker is used as controlled component.</Paragraph>
					<Paragraph>Called function will get the object as first parameter that has the following keys:</Paragraph>
					<List>
						<List.Item>
							<strong>name</strong>
						</List.Item>
						<List.Item>
							<strong>value</strong> - new <code>Date</code> instance or <code>null</code>
						</List.Item>
						<List.Item>
							<strong>containerElement</strong> - instance of <code>HTMLElement</code>
						</List.Item>
					</List>
					<Paragraph>Check the example and watch your browser's console to see the change.</Paragraph>
					<Code language="js" code={'<DatePicker onChange={(x) => console.log(x)} />'}>
						<DatePicker onChange={(x) => console.log(x)} />
					</Code>
				</Props.Prop>
				<Props.Prop name="hideNav" type="boolean" defaultValue={false}>
					<Paragraph>
						If you want to hide the navigation (previous/next month, month selector and year) for any reason, use this prop.
					</Paragraph>
					<Code language="js" code="<DatePicker hideNav />">
						<DatePicker hideNav />
					</Code>
				</Props.Prop>
				<Props.Prop name="disabled" type="boolean" defaultValue={false}>
					<Paragraph>
						Acting as standard <code>disabled</code> attribute on input fields. If set to <code>true</code>, all dates inside of calendar
						will become disabled.
					</Paragraph>
					<Code language="js" code="<DatePicker disabled onChange={(x) => console.log(x)} />">
						<DatePicker disabled onChange={(x) => console.log(x)} />
					</Code>
				</Props.Prop>
				<Props.Prop name="timePrecision" type="string">
					<Paragraph>
						If set, then <code>TimeField</code> component will be rendered under the calendar and user will have ability to set the time
						next to selected date. When this prop is set, other <code>time</code> props can be set in order to customize TimeField.
					</Paragraph>
					<Code language="js" code={'<DatePicker timePrecision="seconds" />'}>
						<DatePicker timePrecision="seconds" />
					</Code>
				</Props.Prop>
				<Props.Prop name="timeColor" type="string" defaultValue="theme.inputField.defaults.color">
					<Paragraph>
						To adjust the color of <code>TimeField</code> under the calendar, use one of the keys set in <code>theme.inputField.color</code>
						.
					</Paragraph>
					<AvailableKeys data={colors2} name="theme.inputField.color" />
				</Props.Prop>
				<Props.Prop name="timeSize" type="string" defaultValue="theme.inputField.defaults.size">
					<Paragraph>
						To adjust the size of <code>TimeField</code> under the calendar, use one of the keys set in <code>theme.inputField.size</code>.
					</Paragraph>
					<AvailableKeys data={sizes2} name="theme.inputField.size" />
				</Props.Prop>
				<Props.Prop name="timeVariant" type="string" defaultValue="theme.inputField.defaults.variant">
					<Paragraph>
						To adjust the variant of <code>TimeField</code> under the calendar, use one of the keys set in{' '}
						<code>theme.inputField.variant</code>. Possible variants in current theme are:
					</Paragraph>
				</Props.Prop>
				<Props.Prop name="m" />
				<Props.Prop name="mt" />
				<Props.Prop name="mr" />
				<Props.Prop name="mb" />
				<Props.Prop name="ml" />
			</Props>
			<H2 hash="color">Color</H2>
			<H2>
				Available colors for <code>DatePicker</code> are:
			</H2>
			{Object.keys(colors).map((color) => (
				<Code language="js" code={`<DatePicker color="${color}" defaultValue={new Date()} />`} key={color} label={color} labelWidth="auto">
					<DatePicker color={color} defaultValue={new Date()} />
				</Code>
			))}
			<H2 hash="variant">Variant</H2>
			<H2>
				Available variants for <code>DatePicker</code> are:
			</H2>
			{Object.keys(variants).map((variant) => (
				<Code
					language="js"
					code={`<DatePicker variant="${variant}" defaultValue={new Date()} />`}
					key={variant}
					label={variant}
					labelWidth="auto"
				>
					<DatePicker variant={variant} defaultValue={new Date()} />
				</Code>
			))}
			<H2 hash="size">Size</H2>
			<H2>
				Available sizes for <code>DatePicker</code> are:
			</H2>
			{Object.keys(sizes).map((size) => (
				<Code language="js" code={`<DatePicker size="${size}" defaultValue={new Date()} />`} key={size} label={size} labelWidth="auto">
					<DatePicker size={size} defaultValue={new Date()} />
				</Code>
			))}
		</>
	);
}
