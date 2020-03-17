import React, {Fragment, useContext} from 'react';
import DocsTitle from '../../../docs/components/DocsTitle';

import DatePicker from './DatePicker';
import ThemeContext from '../../theme/ThemeContext';

import Props from '../../../docs/components/Props';
import DocsText from '../../../docs/components/DocsText';
import ImportComponent from '../../../docs/components/ImportComponent';
import DocsCode from '../../../docs/components/DocsCode';
import AvailableKeys from '../../../docs/components/AvailableKeys';
import Button from '../Button/Button';
import DocsSubTitle from '../../../docs/components/DocsSubTitle';

export const title = 'Date Picker';
export const slug = 'date-picker';
export const json = 'datePicker';

export const Documentation = function() {
	const {theme} = useContext(ThemeContext);

	const sizes = theme.json('datePicker.size');
	const colors = theme.json('datePicker.color');
	const variants = theme.json('datePicker.variant');

	const sizes2 = theme.json('inputField.size');
	const colors2 = theme.json('inputField.color');

	return (
		<>
			<DocsTitle hash="text">Date Picker</DocsTitle>
			<ImportComponent name="DatePicker" />
			<DocsCode>
				<DocsCode.Example>
					<DatePicker />
				</DocsCode.Example>
				<DocsCode.Code>{'<DatePicker />'}</DocsCode.Code>
			</DocsCode>
			<DocsText>
				DatePicker component is a calendar that can be used as input component for selecting date and time. Check the props to explore more
				options.
			</DocsText>
			<Props>
				<Props.Prop name="children" type={['node', 'func']}>
					<p>
						Children can be used for adding additional content under the calendar itself. If it's used as <code>node</code>, then the
						content will be just appended. If it's used as <code>function</code>, then the function will get some useful information. First
						parameter of the function is object with the following keys:
					</p>
					<ul>
						<li>
							<strong>setSelectedDate</strong> - function that can be used for setting the calendar's internal date. Pass instance of{' '}
							<code>Date</code> as first parameter.
						</li>
						<li>
							<strong>selectedDate</strong> - instance of <code>Date</code> or <code>null</code> - current date in the component
						</li>
						<li>
							<strong>setViewDate</strong> - using this function you're able to set the month that is currently being seen by end user. This
							can be used when <code>selectedDate</code> is not yet set.
						</li>
						<li>
							<strong>minDate</strong> - instance of <code>Date</code> - if you didn't pass the <code>minDate</code> by yourself, then
							you'll get the calculated minimum date here
						</li>
						<li>
							<strong>maxDate</strong> - instance of <code>Date</code> - if you didn't pass the <code>maxDate</code> by yourself, then
							you'll get the calculated maximum date here
						</li>
					</ul>
					<DocsCode>
						<DocsCode.Example>
							<DatePicker>
								{({setSelectedDate}) => (
									<Fragment>
										<Button onClick={() => setSelectedDate(new Date())}>Set today</Button>
										<Button onClick={() => setSelectedDate(null)}>Clear</Button>
									</Fragment>
								)}
							</DatePicker>
						</DocsCode.Example>
						<DocsCode.Code>
							{`
							<DatePicker>
								{({setSelectedDate}) => (
									<Fragment>
										<Button onClick={() => setSelectedDate(new Date())}>Set today</Button>
										<Button onClick={() => setSelectedDate(null)}>Clear</Button>
									</Fragment>
								)}
							</DatePicker>
							`}
						</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="name" type="string">
					<p>If set, value will be rendered as hidden field and will be visible while serializing data in form.</p>
					<p>
						To customize value in hidden field, use <code>valueFormat</code> prop.
					</p>
				</Props.Prop>
				<Props.Prop name="firstDayOfWeek" type="number" defaultValue={1}>
					<p>First day of week. 1 for Monday, 0 for Sunday. Here's an example when first day of week is Sunday:</p>
					<DocsCode>
						<DocsCode.Example>
							<DatePicker firstDayOfWeek={0} />
						</DocsCode.Example>
						<DocsCode.Code>{`<DatePicker firstDayOfWeek={0} />`}</DocsCode.Code>
					</DocsCode>
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
					<p>If set, it won't be possible to select date lower than this date. In this example, min date is set to today.</p>
					<DocsCode>
						<DocsCode.Example>
							<DatePicker minDate={new Date()} />
						</DocsCode.Example>
						<DocsCode.Code>{`<DatePicker minDate={new Date()} />`}</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="maxDate" type="Date" defaultValue="next 100 years">
					<p>If set, it won't be possible to select date greater than this date. In this example, min date is set to today.</p>
					<DocsCode>
						<DocsCode.Example>
							<DatePicker maxDate={new Date()} />
						</DocsCode.Example>
						<DocsCode.Code>{`<DatePicker maxDate={new Date()} />`}</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="color" type="string" defaultValue="theme.datePicker.defaults.color">
					<p>
						Use one of the keys set in <code>theme.datePicker.color</code>.
					</p>
					<AvailableKeys data={colors} name="theme.datePicker.color" />
					<p>See the color section for more examples.</p>
				</Props.Prop>
				<Props.Prop name="size" type="string" defaultValue="theme.datePicker.defaults.size">
					<p>
						Use one of the keys set in <code>theme.datePicker.size</code>.
					</p>
					<AvailableKeys data={sizes} name="theme.datePicker.size" />
					<p>See the size section for more examples.</p>
				</Props.Prop>
				<Props.Prop name="variant" type="string" defaultValue="theme.datePicker.defaults.variant">
					<p>
						Use one of the keys set in <code>theme.datePicker.variant</code>. Possible variants in current theme are:
					</p>
					<AvailableKeys data={variants} />
					<p>See the variant section for more examples.</p>
				</Props.Prop>
				<Props.Prop name="onChange" type="function">
					<p>Called when value has changed. This is required prop when DatePicker is used as controlled component.</p>
					<p>Called function will get the object as first parameter that has the following keys:</p>
					<ul>
						<li>
							<strong>name</strong>
						</li>
						<li>
							<strong>value</strong> - new <code>Date</code> instance or <code>null</code>
						</li>
						<li>
							<strong>containerElement</strong> - instance of <code>HTMLElement</code>
						</li>
					</ul>
					<p>Check the example and watch your browser's console to see the change.</p>
					<DocsCode>
						<DocsCode.Example>
							<DatePicker onChange={(x) => console.log(x)} />
						</DocsCode.Example>
						<DocsCode.Code>{'<DatePicker onChange={(x) => console.log(x)} />'}</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="hideNav" type="boolean" defaultValue={false}>
					<p>If you want to hide the navigation (previous/next month, month selector and year) for any reason, use this prop.</p>
					<DocsCode>
						<DocsCode.Example>
							<DatePicker hideNav />
						</DocsCode.Example>
						<DocsCode.Code>{'<DatePicker hideNav />'}</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="disabled" type="boolean" defaultValue={false}>
					<p>
						Acting as standard <code>disabled</code> attribute on input fields. If set to <code>true</code>, all dates inside of calendar
						will become disabled.
					</p>
					<DocsCode>
						<DocsCode.Example>
							<DatePicker disabled onChange={(x) => console.log(x)} />
						</DocsCode.Example>
						<DocsCode.Code>{'<DatePicker disabled onChange={(x) => console.log(x)} />'}</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="timePrecision" type="string">
					<p>
						If set, then <code>TimeField</code> component will be rendered under the calendar and user will have ability to set the time
						next to selected date. When this prop is set, other <code>time</code> props can be set in order to customize TimeField.
					</p>
					<DocsCode>
						<DocsCode.Example>
							<DatePicker timePrecision="seconds" />
						</DocsCode.Example>
						<DocsCode.Code>{'<DatePicker timePrecision="seconds" />'}</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="timeColor" type="string" defaultValue="theme.inputField.defaults.color">
					<p>
						To adjust the color of <code>TimeField</code> under the calendar, use one of the keys set in <code>theme.inputField.color</code>
						.
					</p>
					<AvailableKeys data={colors2} name="theme.inputField.color" />
				</Props.Prop>
				<Props.Prop name="timeSize" type="string" defaultValue="theme.inputField.defaults.size">
					<p>
						To adjust the size of <code>TimeField</code> under the calendar, use one of the keys set in <code>theme.inputField.size</code>.
					</p>
					<AvailableKeys data={sizes2} name="theme.inputField.size" />
				</Props.Prop>
				<Props.Prop name="timeVariant" type="string" defaultValue="theme.inputField.defaults.variant">
					<p>
						To adjust the variant of <code>TimeField</code> under the calendar, use one of the keys set in{' '}
						<code>theme.inputField.variant</code>. Possible variants in current theme are:
					</p>
				</Props.Prop>
				<Props.Prop name="m" />
				<Props.Prop name="mt" />
				<Props.Prop name="mr" />
				<Props.Prop name="mb" />
				<Props.Prop name="ml" />
			</Props>
			<DocsSubTitle hash="color">Color</DocsSubTitle>
			<DocsText>
				Available colors for <code>DatePicker</code> are:
			</DocsText>
			{Object.keys(colors).map((color) => (
				<DocsCode key={color} label={color} labelWidth="auto">
					<DocsCode.Example>
						<DatePicker color={color} defaultValue={new Date()} />
					</DocsCode.Example>
					<DocsCode.Code>{`<DatePicker color="${color}" defaultValue={new Date()} />`}</DocsCode.Code>
				</DocsCode>
			))}
			<DocsSubTitle hash="variant">Variant</DocsSubTitle>
			<DocsText>
				Available variants for <code>DatePicker</code> are:
			</DocsText>
			{Object.keys(variants).map((variant) => (
				<DocsCode key={variant} label={variant} labelWidth="auto">
					<DocsCode.Example>
						<DatePicker variant={variant} defaultValue={new Date()} />
					</DocsCode.Example>
					<DocsCode.Code>{`<DatePicker variant="${variant}" defaultValue={new Date()} />`}</DocsCode.Code>
				</DocsCode>
			))}
			<DocsSubTitle hash="size">Size</DocsSubTitle>
			<DocsText>
				Available sizes for <code>DatePicker</code> are:
			</DocsText>
			{Object.keys(sizes).map((size) => (
				<DocsCode key={size} label={size} labelWidth="auto">
					<DocsCode.Example>
						<DatePicker size={size} defaultValue={new Date()} />
					</DocsCode.Example>
					<DocsCode.Code>{`<DatePicker size="${size}" defaultValue={new Date()} />`}</DocsCode.Code>
				</DocsCode>
			))}
		</>
	);
};
