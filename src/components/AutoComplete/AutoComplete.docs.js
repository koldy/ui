import React, {useContext, useState, useCallback} from 'react';
import DocsTitle from '../../../docs/components/DocsTitle';

import ThemeContext from '../../theme/ThemeContext';

import Props from '../../../docs/components/Props';
import DocsSubTitle from '../../../docs/components/DocsSubTitle';
import DocsText from '../../../docs/components/DocsText';
import ImportComponent from '../../../docs/components/ImportComponent';
import AutoComplete from './AutoComplete';
import DocsCode from '../../../docs/components/DocsCode';
import AvailableKeys from '../../../docs/components/AvailableKeys';
import Flexbox from '../Flexbox/Flexbox';
import Box from '../Box/Box';

export const title = <s>AutoComplete</s>;
export const slug = 'autocomplete';
export const json = null;

const states = [
	'Alabama',
	'Alaska',
	'American Samoa',
	'Arizona',
	'Arkansas',
	'California',
	'Colorado',
	'Connecticut',
	'Delaware',
	'District of Columbia',
	'Federated States of Micronesia',
	'Florida',
	'Georgia',
	'Guam',
	'Hawaii',
	'Idaho',
	'Illinois',
	'Indiana',
	'Iowa',
	'Kansas',
	'Kentucky',
	'Louisiana',
	'Maine',
	'Marshall Islands',
	'Maryland',
	'Massachusetts',
	'Michigan',
	'Minnesota',
	'Mississippi',
	'Missouri',
	'Montana',
	'Nebraska',
	'Nevada',
	'New Hampshire',
	'New Jersey',
	'New Mexico',
	'New York',
	'North Carolina',
	'North Dakota',
	'Northern Mariana Islands',
	'Ohio',
	'Oklahoma',
	'Oregon',
	'Palau',
	'Pennsylvania',
	'Puerto Rico',
	'Rhode Island',
	'South Carolina',
	'South Dakota',
	'Tennessee',
	'Texas',
	'Utah',
	'Vermont',
	'Virgin Island',
	'Virginia',
	'Washington',
	'West Virginia',
	'Wisconsin',
	'Wyoming'
];

const customOptions = [
	{country: 'Austria', icon: 'at'},
	{country: 'Croatia', icon: 'hr'},
	{country: 'Germany', icon: 'de'}
];

export const Documentation = function() {
	const {theme} = useContext(ThemeContext);

	const sizes = theme.json('textField.size');
	const colors = theme.json('textField.color');
	const variants = theme.json('textField.variant');
	const widths = theme.json('textField.width');

	const [suggestions, setSuggestions] = useState(states);
	const [value1, setValue1] = useState('California');

	const handleFilter = useCallback(({value}) => {
		if (value === '') {
			setSuggestions(states);
		} else {
			// filter it
			const opts = [];

			states.forEach((state) => {
				if (state.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) >= 0) {
					opts.push(state);
				}
			});

			setSuggestions(opts);
		}
	}, []);

	const [customSuggestions, setCustomSuggestions] = useState(customOptions);

	const handleCustomOptionsFilter = useCallback(({value}) => {
		if (value === '') {
			setCustomSuggestions(customOptions);
		} else {
			// filter it
			const opts = [];

			customOptions.forEach((opt) => {
				const {country} = opt;
				if (country.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) >= 0) {
					opts.push(opt);
				}
			});

			setCustomSuggestions(opts);
		}
	}, []);

	return (
		<>
			<DocsTitle hash="autoComplete">AutoComplete (experimental!)</DocsTitle>
			<ImportComponent name="AutoComplete" />
			<DocsCode>
				<DocsCode.Example>
					<AutoComplete onChange={handleFilter} type="search" name="email" placeholder="Enter the state in US">
						{suggestions.map((state) => (
							<AutoComplete.Option key={state} value={state} hoverBackgroundColor="#efefef" />
						))}
					</AutoComplete>
				</DocsCode.Example>
				<DocsCode.Code>
					{`
					const states = [
						'Alabama',
						'Alaska',
						'American Samoa',
						'Arizona',
						'Arkansas',
						'California',
						'Colorado',
						'Connecticut',
						'Delaware',
						'District of Columbia',
						'Federated States of Micronesia',
						'Florida',
						'Georgia',
						'Guam',
						'Hawaii',
						'Idaho',
						'Illinois',
						'Indiana',
						'Iowa',
						'Kansas',
						'Kentucky',
						'Louisiana',
						'Maine',
						'Marshall Islands',
						'Maryland',
						'Massachusetts',
						'Michigan',
						'Minnesota',
						'Mississippi',
						'Missouri',
						'Montana',
						'Nebraska',
						'Nevada',
						'New Hampshire',
						'New Jersey',
						'New Mexico',
						'New York',
						'North Carolina',
						'North Dakota',
						'Northern Mariana Islands',
						'Ohio',
						'Oklahoma',
						'Oregon',
						'Palau',
						'Pennsylvania',
						'Puerto Rico',
						'Rhode Island',
						'South Carolina',
						'South Dakota',
						'Tennessee',
						'Texas',
						'Utah',
						'Vermont',
						'Virgin Island',
						'Virginia',
						'Washington',
						'West Virginia',
						'Wisconsin',
						'Wyoming'
					];
				
					const [suggestions, setSuggestions] = useState(states);
				
					const handleFilter = useCallback(({value}) => {
						if (value === '') {
							setSuggestions(states);
						} else {
							// filter it
							const opts = [];
				
							for (const state of states) {
								if (state.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) >= 0) {
									opts.push(state);
								}
							}
				
							setSuggestions(opts);
						}
					}, []);

					<AutoComplete onChange={handleFilter} type="search" name="email" placeholder="Enter the state in US">
						{suggestions.map((state) => (
							<AutoComplete.Option key={state} value={state} hoverBackgroundColor="#efefef" />
						))}
					</AutoComplete>
					`}
				</DocsCode.Code>
			</DocsCode>
			<DocsText>
				AutoComplete is TextField with options that can be used to preset the text in the TextField. These options will become visible if:
			</DocsText>
			<DocsText>
				<ul>
					<li>options are set as children</li>
					<li>and user starts to type</li>
				</ul>
			</DocsText>
			<DocsText>
				Good example for the component is above: you want your users to be able to put any text in the TextField, but it would be good if
				the text is preselected from available set of values.
			</DocsText>
			<DocsText>
				This component is dumb and knows nothing but one thing: show its children as options when user types something. With that in mind,
				you are responsible on which options will be shown. If you take a look on the example above, you'll see that developer is
				responsible for filtering options on <code>onChange</code> or <code>onInput</code> event. Therefore, you are in total control on how
				this component will behave.
			</DocsText>
			<Props title="Props for AutoComplete" hash="props-autocomplete">
				<Props.Prop name="children" type="node">
					<p>
						Use children to define the possible values. Every child should be <code>AutoComplete.Option</code> component.
					</p>
				</Props.Prop>
				<Props.Prop name="type" type="string" defaultValue="text">
					<p>
						This is <code>type</code> attribute of text field. Allowed values are: <code>text</code>, <code> tel</code>, <code>email</code>{' '}
						and <code>search</code>.
					</p>
					{['text', 'tel', 'email', 'search'].map((type) => (
						<DocsCode key={type}>
							<DocsCode.Example>
								<AutoComplete type={type} placeholder={`I'm type of ${type}`}>
									{states.map((state) => (
										<AutoComplete.Option key={state} value={state} hoverBackgroundColor="#efefef" />
									))}
								</AutoComplete>
							</DocsCode.Example>
							<DocsCode.Code>
								{`
								<AutoComplete type={type} placeholder={\`I'm type of ${type}\`}>
									{states.map((state) => (
										<AutoComplete.Option key={state} value={state} hoverBackgroundColor="#efefef" />
									))}
								</AutoComplete>
								`}
							</DocsCode.Code>
						</DocsCode>
					))}
				</Props.Prop>
				<Props.Prop name="name" type={['string', 'number']}>
					This is <code>name</code> attribute of text field. Use it for forms.
				</Props.Prop>
				<Props.Prop name="value" type={['string', 'number']}>
					<p>
						If you want to use AutoComplete as controlled component, then set the <code>value</code> prop.
					</p>
					<AutoComplete value="I'm here and you can't change me" onChange={({value}) => console.log('New value is', value)} />
					<p>
						Remember that options won't become visible unless user types something in and that won't happen if you don't allow/control it.
					</p>
					<DocsCode>
						<DocsCode.Example>
							<AutoComplete value={value1} onChange={({value}) => setValue1(value)}>
								{states.map((state) => (
									<AutoComplete.Option key={state} value={state} hoverBackgroundColor="#efefef" />
								))}
							</AutoComplete>
						</DocsCode.Example>
						<DocsCode.Code>
							{`
								const [value1, setValue1] = useState('California');
								
								<AutoComplete value={value1} onChange={({value}) => setValue1(value)}>
									{states.map((state) => (
										<AutoComplete.Option key={state} value={state} hoverBackgroundColor="#efefef" />
									))}
								</AutoComplete>
								`}
						</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="defaultValue" type={['string', 'number']}>
					<p>
						If you plan to use TextField as uncontrolled component, then use <code>defaultValue</code> to set the initial value.
					</p>
					<AutoComplete defaultValue="I'm here by default">
						{states.map((state) => (
							<AutoComplete.Option key={state} value={state} hoverBackgroundColor="#efefef" />
						))}
					</AutoComplete>
				</Props.Prop>
				<Props.Prop name="placeholder" type={['string', 'number']}>
					<p>Standard placeholder attribute.</p>
					<AutoComplete placeholder="I'm placeholder. Type something and I'm gone..." width="100%">
						{states.map((state) => (
							<AutoComplete.Option key={state} value={state} hoverBackgroundColor="#efefef" />
						))}
					</AutoComplete>
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
					If set, it'll be added at the bottom of CSS definition so if you have any previous definition of <code>min-width</code> (for
					example, in theme's variant definition), it'll be overridden with this value.
				</Props.Prop>
				<Props.Prop name="maxWidth" type="string">
					If set, it'll be added at the bottom of CSS definition so if you have any previous definition of <code>max-width</code> (for
					example, in theme's variant definition), it'll be overridden with this value.
				</Props.Prop>
				<Props.Prop name="onChange" type="function">
					<p>Called when value has changed. This is required prop when TextField is used as controlled component.</p>
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
					<AutoComplete name="onChangeExampleName" onChange={(o) => console.log(o)}>
						{states.map((state) => (
							<AutoComplete.Option key={state} value={state} hoverBackgroundColor="#efefef" />
						))}
					</AutoComplete>
				</Props.Prop>
				<Props.Prop name="onInput" type="function">
					<p>
						Unlike <code>onChange</code> which is called on every change, <code>onInput</code> function will be called with defined delay.
						This is useful when you want to allow user to type something in first and then you want to fire callback when typing is done.
					</p>
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
					<AutoComplete name="onInputExampleName" onInput={({name, value}) => console.log(name, value)}>
						{states.map((state) => (
							<AutoComplete.Option key={state} value={state} hoverBackgroundColor="#efefef" />
						))}
					</AutoComplete>
				</Props.Prop>
				<Props.Prop name="inputDelay" type="number" defaultValue={300}>
					<p>
						To set the delay for <code>onInput</code>, use this prop.
					</p>
					<p>Check the example with input delay of 1000 (1 second) and watch your browser's console to see the change.</p>
					<AutoComplete name="onInputDelayExample" onInput={({name, value}) => console.log(name, value)} inputDelay={1000}>
						{states.map((state) => (
							<AutoComplete.Option key={state} value={state} hoverBackgroundColor="#efefef" />
						))}
					</AutoComplete>
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
					<AutoComplete name="onClickExampleName" onClick={(o) => console.log(o)}>
						{states.map((state) => (
							<AutoComplete.Option key={state} value={state} hoverBackgroundColor="#efefef" />
						))}
					</AutoComplete>
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
					<AutoComplete name="onDoubleClickExampleName" onDoubleClick={(o) => console.log(o)}>
						{states.map((state) => (
							<AutoComplete.Option key={state} value={state} hoverBackgroundColor="#efefef" />
						))}
					</AutoComplete>
				</Props.Prop>
				<Props.Prop name="onFocus" type="function">
					<p>Called when the component is focused.</p>
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
					<AutoComplete name="onFocusExampleName" onFocus={(o) => console.log(o)}>
						{states.map((state) => (
							<AutoComplete.Option key={state} value={state} hoverBackgroundColor="#efefef" />
						))}
					</AutoComplete>
				</Props.Prop>
				<Props.Prop name="onBlur" type="function">
					<p>Called when the component is blurred.</p>
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
					<AutoComplete name="onBlurExampleName" onBlur={(o) => console.log(o)}>
						{states.map((state) => (
							<AutoComplete.Option key={state} value={state} hoverBackgroundColor="#efefef" />
						))}
					</AutoComplete>
				</Props.Prop>
				<Props.Prop name="disabled" type="boolean" defaultValue={false}>
					<p>
						This is standard HTML's <code>disabled</code> attribute.
					</p>
					<AutoComplete name="disabledExample" disabled>
						{states.map((state) => (
							<AutoComplete.Option key={state} value={state} hoverBackgroundColor="#efefef" />
						))}
					</AutoComplete>
				</Props.Prop>
				<Props.Prop name="readOnly" type="boolean" defaultValue={false}>
					<p>
						This is standard HTML's <code>readOnly</code> attribute.
					</p>
					<AutoComplete name="readOnlyExample" readOnly>
						{states.map((state) => (
							<AutoComplete.Option key={state} value={state} hoverBackgroundColor="#efefef" />
						))}
					</AutoComplete>
				</Props.Prop>
				<Props.Prop name="m" />
				<Props.Prop name="mt" />
				<Props.Prop name="mr" />
				<Props.Prop name="mb" />
				<Props.Prop name="ml" />
			</Props>

			<Props title="Props for AutoComplete.Option" hash="props-autocomplete-option">
				<Props.Prop name="children" type="function">
					<p>
						If set, it has to be used as function. Render prop function will get the object for first parameter that has the following keys:
					</p>
					<ul>
						<li>
							<strong>value</strong> - string/number
						</li>
						<li>
							<strong>pickValue</strong> - function - use this function when user picks its value
						</li>
						<li>
							<strong>selectedValue</strong> - string/number - currently selected value with keyboard arrows
						</li>
						<li>
							<strong>isSelected</strong> - boolean - true if this element should be visually selected
						</li>
						<li>
							<strong>values</strong> - array - the array of all other values
						</li>
						<li>
							<strong>theme</strong> - instance of ThemeManager - if you want to access the theme's data, use this object
						</li>
					</ul>
					<p>If you're not using render prop function, then you may use some other props to customize option's look.</p>
				</Props.Prop>
				<Props.Prop name="value" type={['string', 'number']} required>
					<p>Value which will be applied to text field when selected. It's required in every case.</p>
				</Props.Prop>
				<Props.Prop name="textAlign" type="string" defaultValue="left">
					<p>If not using children render prop, then you may selected textAlign manually for every option.</p>
				</Props.Prop>
				<Props.Prop name="hoverBackgroundColor" type="string">
					<p>
						If not using render props, then <code>hoverBackgroundColor</code> will be applied when value is selected or user points the
						pointer over value.
					</p>
					<p>
						Please note that this prop doesn't have default value so if you don't set it yourself, then selected value won't be visually
						highlighted which may be very confusing for end user.
					</p>
				</Props.Prop>
				<Props.Prop name="p" />
				<Props.Prop name="pt" />
				<Props.Prop name="pr" />
				<Props.Prop name="pb" />
				<Props.Prop name="pl" />
			</Props>

			<DocsSubTitle hash="variant">Variant</DocsSubTitle>
			<DocsText>
				Variant is the shape of TextField component. <AvailableKeys data={variants} name="theme.textField.variant" />
			</DocsText>
			{Object.keys(variants).map((val) => (
				<DocsCode key={val} label={val} labelWidth="auto">
					<DocsCode.Example>
						<AutoComplete variant={val}>
							{states.map((state) => (
								<AutoComplete.Option key={state} value={state} hoverBackgroundColor="#efefef" />
							))}
						</AutoComplete>
					</DocsCode.Example>
					<DocsCode.Code>
						{`
						<AutoComplete variant="${val}">
						{states.map((state) => (
							<AutoComplete.Option key={state} value={state} hoverBackgroundColor="#efefef" />
						))}
						</AutoComplete>
						`}
					</DocsCode.Code>
				</DocsCode>
			))}
			<DocsSubTitle hash="color">Color</DocsSubTitle>
			<DocsText>
				You may set any of the predefined colors from the theme. <AvailableKeys data={colors} name="theme.textField.color" />
			</DocsText>
			{Object.keys(colors).map((val) => (
				<DocsCode key={val} label={val} labelWidth="auto">
					<DocsCode.Example>
						<AutoComplete color={val}>
							{states.map((state) => (
								<AutoComplete.Option key={state} value={state} hoverBackgroundColor="#efefef" />
							))}
						</AutoComplete>
					</DocsCode.Example>
					<DocsCode.Code>
						{`
						<AutoComplete color="${val}">
						{states.map((state) => (
							<AutoComplete.Option key={state} value={state} hoverBackgroundColor="#efefef" />
						))}
						</AutoComplete>
						`}
					</DocsCode.Code>
				</DocsCode>
			))}
			<DocsSubTitle hash="size">Size</DocsSubTitle>
			<DocsText>
				Use <code>size</code> prop to set the size of the TextField component. Don't get confused by the component's width because that's
				not the same as size (read about width in next section). Size tells the size of font, height and padding. While setting the CSS for
				size, only font size will be applied.
			</DocsText>
			<DocsText>
				<AvailableKeys data={sizes} name="theme.textField.size" />
			</DocsText>
			{Object.keys(sizes).map((val) => (
				<DocsCode key={val} label={val} labelWidth="auto">
					<DocsCode.Example>
						<AutoComplete size={val}>
							{states.map((state) => (
								<AutoComplete.Option key={state} value={state} hoverBackgroundColor="#efefef" />
							))}
						</AutoComplete>
					</DocsCode.Example>
					<DocsCode.Code>
						{`
						<AutoComplete size="${val}">
						{states.map((state) => (
							<AutoComplete.Option key={state} value={state} hoverBackgroundColor="#efefef" />
						))}
						</AutoComplete>
						`}
					</DocsCode.Code>
				</DocsCode>
			))}
			<DocsSubTitle hash="width">Width</DocsSubTitle>
			<DocsText>
				Use <code>width</code> prop to set the width of the TextField component. Don't get confused by the component's size. Width tells the
				width of TextField component and it can be predefined in theme or it can be set using the <code>width</code> prop.
			</DocsText>
			<DocsText>
				<AvailableKeys data={widths} name="theme.textField.width" />
			</DocsText>
			{Object.keys(widths).map((val) => (
				<DocsCode key={val} label={val} labelWidth="auto">
					<DocsCode.Example>
						<AutoComplete width={val}>
							{states.map((state) => (
								<AutoComplete.Option key={state} value={state} hoverBackgroundColor="#efefef" />
							))}
						</AutoComplete>
					</DocsCode.Example>
					<DocsCode.Code>
						{`
						<AutoComplete width="${val}">
						{states.map((state) => (
							<AutoComplete.Option key={state} value={state} hoverBackgroundColor="#efefef" />
						))}
						</AutoComplete>
						`}
					</DocsCode.Code>
				</DocsCode>
			))}
			<DocsText>
				You can set the width manually using the <code>width</code> prop.
			</DocsText>
			<DocsCode label="30" labelWidth="auto">
				<DocsCode.Example>
					<AutoComplete width={30}>
						{states.map((state) => (
							<AutoComplete.Option key={state} value={state} hoverBackgroundColor="#efefef" />
						))}
					</AutoComplete>
				</DocsCode.Example>
				<DocsCode.Code>
					{`
					<AutoComplete width={30}>
					{states.map((state) => (
							<AutoComplete.Option key={state} value={state} hoverBackgroundColor="#efefef" />
						))}
					</AutoComplete>
					`}
				</DocsCode.Code>
			</DocsCode>
			<DocsCode label="75%" labelWidth="auto">
				<DocsCode.Example>
					<AutoComplete width="75%">
						{states.map((state) => (
							<AutoComplete.Option key={state} value={state} hoverBackgroundColor="#efefef" />
						))}
					</AutoComplete>
				</DocsCode.Example>
				<DocsCode.Code>
					{`
					<AutoComplete width="75%">
					{states.map((state) => (
							<AutoComplete.Option key={state} value={state} hoverBackgroundColor="#efefef" />
						))}
					</AutoComplete>
					`}
				</DocsCode.Code>
			</DocsCode>
			<DocsCode label="100%" labelWidth="auto">
				<DocsCode.Example>
					<AutoComplete width="100%">
						{states.map((state) => (
							<AutoComplete.Option key={state} value={state} hoverBackgroundColor="#efefef" />
						))}
					</AutoComplete>
				</DocsCode.Example>
				<DocsCode.Code>
					{`
					<AutoComplete width="100%">
					{states.map((state) => (
							<AutoComplete.Option key={state} value={state} hoverBackgroundColor="#efefef" />
						))}
					</AutoComplete>
					`}
				</DocsCode.Code>
			</DocsCode>
			<DocsSubTitle hash="options-customization">Options customization</DocsSubTitle>
			<DocsText>
				Customizing options is easy. Simply use <code>AutoComplete.Option</code>, but set your own content using render prop function.
			</DocsText>
			<DocsCode>
				<DocsCode.Example>
					<AutoComplete placeholder="type Austria, Croatia or Germany" onInput={handleCustomOptionsFilter}>
						{customSuggestions.map(({country, icon}) => (
							<AutoComplete.Option value={country} key={country}>
								{({isSelected, pickValue}) => (
									<Box pt="0.25rem" pb="0.25rem" background={isSelected ? '#cfcfcf' : null} onClick={pickValue}>
										<Flexbox alignItems="center">
											<Flexbox.Item width={40}>
												<Box textAlign="center">
													<span className={`flag-icon flag-icon-${icon}`} />
												</Box>
											</Flexbox.Item>
											<Flexbox.Item flex={1}>{country}</Flexbox.Item>
										</Flexbox>
									</Box>
								)}
							</AutoComplete.Option>
						))}
					</AutoComplete>
				</DocsCode.Example>
				<DocsCode.Code>
					{`
					const customOptions = [
						{country: 'Austria', icon: 'at'},
						{country: 'Croatia', icon: 'hr'},
						{country: 'Germany', icon: 'de'}
					];
					
					const [customSuggestions, setCustomSuggestions] = useState(customOptions);

					const handleCustomOptionsFilter = useCallback(({value}) => {
						if (value === '') {
							setCustomSuggestions(customOptions);
						} else {
							// filter it
							const opts = [];
				
							for (const opt of customOptions) {
								const {country} = opt;
								if (country.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) >= 0) {
									opts.push(opt);
								}
							}
				
							setCustomSuggestions(opts);
						}
					}, []);
				
					return (
						<AutoComplete placeholder="type Austria, Croatia or Germany" onInput={handleCustomOptionsFilter}>
							{customSuggestions.map(({country, icon}) => (
								<AutoComplete.Option value={country} key={country}>
									{({isSelected, pickValue}) => (
										<Box pt="0.25rem" pb="0.25rem" background={isSelected ? '#cfcfcf' : null} onClick={pickValue}>
											<Flexbox alignItems="center">
												<Flexbox.Item width={40}>
													<Box textAlign="center">
														<span className={\`flag-icon flag-icon-\${icon}\`} />
													</Box>
												</Flexbox.Item>
												<Flexbox.Item flex={1}>{country}</Flexbox.Item>
											</Flexbox>
										</Box>
									)}
								</AutoComplete.Option>
							))}
						</AutoComplete>
					);
					`}
				</DocsCode.Code>
			</DocsCode>
			<DocsText>
				Render prop in <code>AutoComplete.Option</code> will always get one parameter, which is object with the following keys:
			</DocsText>
			<DocsText>
				<ul>
					<li>
						<strong>value</strong> - string/number - same value provide as prop
					</li>
					<li>
						<strong>pickValue</strong> - function - use this function if you want to "pick the value" - use it for click events
					</li>
					<li>
						<strong>selectedValue</strong> - string/number - which value in the list is currently "selected"
					</li>
					<li>
						<strong>isSelected</strong> - boolean - true if this value is currently selected
					</li>
					<li>
						<strong>values</strong> - array of string/number - the array current possible value
					</li>
					<li>
						<strong>theme</strong> - instance of ThemeManager - ability to access current theme settings for event more advanced usage
					</li>
				</ul>
			</DocsText>
		</>
	);
};
