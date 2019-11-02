import React, {useContext, useState, useCallback} from 'react';
import DocsTitle from '../../../docs/components/DocsTitle';

import Menu from './Menu';
import ThemeContext from '../../theme/ThemeContext';

import Props from '../../../docs/components/Props';
import DocsSubTitle from '../../../docs/components/DocsSubTitle';
import DocsText from '../../../docs/components/DocsText';
import ImportComponent from '../../../docs/components/ImportComponent';
import DocsCode from '../../../docs/components/DocsCode';
import AvailableKeys from '../../../docs/components/AvailableKeys';
import Button from '../Button/Button';
import Flexbox from '../Flexbox/Flexbox';
import Checkbox from '../Checkbox/Checkbox';
import {emptyFn} from '../../util/helpers';

export const title = 'Menu';
export const slug = 'menu';
export const json = 'menu';

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

	const variants = theme.json('menu.variant');
	const colors = theme.json('menu.color');
	const sizes = theme.json('menu.size');

	const [example1, setExample1] = useState('Croatia');

	return (
		<>
			<DocsTitle hash="menu">Menu</DocsTitle>
			<ImportComponent name="Menu" />
			<DocsText>Sub components:</DocsText>
			<ul>
				<li>
					<code>Menu.Item</code>
				</li>
				<li>
					<code>Menu.Divider</code>
				</li>
			</ul>
			<DocsText>
				<code>Menu</code> component is one of the most useful components created in this UI library and here's why.
			</DocsText>
			<DocsText>
				It can be used both as navigation menu and it can be used as input component (that's why it's placed under input
				components). When used as input component, then it behaves similar to <code>Select</code> component. Other UI
				libraries and frameworks would offer components like Select2, SelectMenu, Navs, Vertical menus, Tag inputs and
				similar. So, in order not to "hardcode" all these derivatives, Koldy UI offers just a tool which can be used to
				build all those components and that tool is <code>Menu</code>.
			</DocsText>
			<DocsText>Here's an example of simple vertical menu:</DocsText>
			<DocsCode>
				<DocsCode.Example>
					<Menu>
						<Menu.Item as="a" href="https://google.com" target="_blank">
							Google
						</Menu.Item>
						<Menu.Item as="a" href="https://reactjs.org" target="_blank">
							React.js
						</Menu.Item>
						<Menu.Divider />
						<Menu.Item as="a" href="https://koldy.io" target="_blank">
							Koldy.io
						</Menu.Item>
					</Menu>
				</DocsCode.Example>
				<DocsCode.Code>
					{`
					<Menu>
						<Menu.Item as="a" href="https://google.com" target="_blank">
							Google
						</Menu.Item>
						<Menu.Item as="a" href="https://reactjs.org" target="_blank">
							React.js
						</Menu.Item>
						<Menu.Divider />
						<Menu.Item as="a" href="https://koldy.io" target="_blank">
							Koldy.io
						</Menu.Item>
					</Menu>
					`}
				</DocsCode.Code>
			</DocsCode>
			<DocsText>
				And here's an example of <code>Menu</code> as input component. Watch the browser's console to see the changes on
				click.
			</DocsText>
			<DocsCode>
				<DocsCode.Example>
					<Menu onChange={(x) => console.log(x)}>
						{customOptions.map(({country}) => (
							<Menu.Item value={country} key={country}>
								{country}
							</Menu.Item>
						))}
					</Menu>
				</DocsCode.Example>
				<DocsCode.Code>
					{`
					<Menu onChange={(x) => console.log(x)}>
						{customOptions.map(({country}) => (
							<Menu.Item value={country} key={country}>
								{country}
							</Menu.Item>
						))}
					</Menu>
					`}
				</DocsCode.Code>
			</DocsCode>
			<DocsText>
				Notice that as soon as you give a value to the <code>Item</code>, it applies "input" behaviour. Check props docs
				for more explanation and examples.
			</DocsText>
			<Props>
				<Props.Prop name="children" type="node" required>
					This prop is required and you're free to put literally anything in there, but to use this component's
					features, we recommend that you use <code>Menu.Item</code> and <code>Menu.Divider</code> for achieving most of
					the functionality.
				</Props.Prop>
				<Props.Prop name="name" type="string">
					If set, all active values will be rendered as HTML's <code>select</code> and <code>option</code> tags which
					are visually hidden, but if you put the menu inside the form, form serialization will automatically collect
					the selected options as well.
				</Props.Prop>
				<Props.Prop name="multiple" type="bool" defaultValue={false}>
					<p>
						If set to <code>true</code>, it'll allow multiple options to be active at the same time. If{' '}
						<code>onChange</code> is provided as well, then the value given through the onChange function will be either
						array (if multiple) or scalar value (if not multiple). Check your browser's console to see the case.
					</p>
					<DocsCode>
						<DocsCode.Example>
							<Menu onChange={({value}) => console.log(value)} multiple>
								{customOptions.map(({country}) => (
									<Menu.Item value={country} key={country}>
										{country}
									</Menu.Item>
								))}
							</Menu>
						</DocsCode.Example>
						<DocsCode.Code>
							{`
							<Menu onChange={({value}) => console.log(value)} multiple>
								{customOptions.map(({country}) => (
									<Menu.Item value={country} key={country}>
										{country}
									</Menu.Item>
								))}
							</Menu>
							`}
						</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="value" type={['number', 'string', 'array']}>
					<p>
						If set, it means you're using this component as controlled component and you are responsible for the values
						all the time.
					</p>
					<DocsCode>
						<DocsCode.Example>
							<Menu onChange={({value}) => setExample1(value)} value={example1}>
								{customOptions.map(({country}) => (
									<Menu.Item value={country} key={country}>
										{country}
									</Menu.Item>
								))}
							</Menu>
							<Button onClick={() => setExample1('Germany')}>Set Germany</Button>
						</DocsCode.Example>
						<DocsCode.Code>
							{`
							const [example1, setExample1] = useState('Croatia');

							<Menu onChange={({value}) => setExample1(value)} value={example1}>
								{customOptions.map(({country}) => (
									<Menu.Item value={country} key={country}>
										{country}
									</Menu.Item>
								))}
							</Menu>
							`}
						</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="defaultValue" type={['number', 'string', 'array']}>
					<p>
						If set, it means you're using this component as uncontrolled component and you're just setting initial
						value.
					</p>
					<DocsCode>
						<DocsCode.Example>
							<Menu onChange={({value}) => console.log(value)} defaultValue="Croatia">
								{customOptions.map(({country}) => (
									<Menu.Item value={country} key={country}>
										{country}
									</Menu.Item>
								))}
							</Menu>
						</DocsCode.Example>
						<DocsCode.Code>
							{`
							<Menu onChange={({value}) => console.log(value)} defaultValue="Croatia">
								{customOptions.map(({country}) => (
									<Menu.Item value={country} key={country}>
										{country}
									</Menu.Item>
								))}
							</Menu>
							`}
						</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="variant" type="string" defaultValue="theme.menu.defaults.variant">
					<p>The shape of menu and its elements.</p>
					<AvailableKeys data={variants} />
				</Props.Prop>
				<Props.Prop name="size" type="string" defaultValue="theme.menu.defaults.size">
					<p>The size of menu and its elements.</p>
					<AvailableKeys data={sizes} />
				</Props.Prop>
				<Props.Prop name="color" type="string" defaultValue="theme.menu.defaults.color">
					<p>The color of menu and its elements.</p>
					<AvailableKeys data={colors} />
				</Props.Prop>
				<Props.Prop name="height" type={['string', 'number']}>
					<p>
						If set, it'll fixate the height of menu and if there's more content inside of <code>Menu</code>
						component that its height, vertical scroll will appear.
					</p>
					<DocsCode>
						<DocsCode.Example>
							<Menu height={240}>
								{states.map((country) => (
									<Menu.Item value={country} key={country}>
										{country}
									</Menu.Item>
								))}
							</Menu>
						</DocsCode.Example>
						<DocsCode.Code>
							{`
							<Menu height={240}>
								{states.map((country) => (
									<Menu.Item value={country} key={country}>
										{country}
									</Menu.Item>
								))}
							</Menu>
							`}
						</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="onChange" type="func">
					<p>
						Fires when there's a change on selected value(s). Function will get the object for first parameter with the
						following keys:
					</p>
					<ul>
						<li>
							<strong>name</strong> - the name of <code>Menu</code> component or <code>null</code>
						</li>
						<li>
							<strong>value</strong> - if <code>Menu</code> has <code>multiple</code> prop set to true, then value will
							be array, otherwise it'll be scalar value or <code>null</code> if nothing is selected.
						</li>
					</ul>
				</Props.Prop>
				<Props.Prop name="disabled" type="bool" defaultValue={false}>
					<p>
						If set to <code>true</code>, all items in within the Menu will be disabled.
					</p>
					<DocsCode>
						<DocsCode.Example>
							<Menu name="country" disabled defaultValue="Croatia">
								{customOptions.map(({country}) => (
									<Menu.Item value={country} key={country}>
										{country}
									</Menu.Item>
								))}
							</Menu>
						</DocsCode.Example>
						<DocsCode.Code>
							{`
							<Menu name="country" disabled defaultValue="Croatia">
								{customOptions.map(({country}) => (
									<Menu.Item value={country} key={country}>
										{country}
									</Menu.Item>
								))}
							</Menu>
							`}
						</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="m" />
				<Props.Prop name="mt" />
				<Props.Prop name="mr" />
				<Props.Prop name="mb" />
				<Props.Prop name="ml" />
				<Props.Prop name="ref" />
			</Props>
			<DocsSubTitle hash="variant">Variants</DocsSubTitle>
			<DocsText>
				You may use variants as a chance to do some component styling, like having another font, or having another
				border style.
			</DocsText>
			<AvailableKeys data={variants} />
			{Object.keys(variants).map((val) => (
				<DocsCode label={val} labelWidth="auto" key={val}>
					<DocsCode.Example>
						<Menu variant={val}>
							{customOptions.map(({country}) => (
								<Menu.Item value={country} key={country}>
									{country}
								</Menu.Item>
							))}
						</Menu>
					</DocsCode.Example>
					<DocsCode.Code>
						{`
						<Menu variant="${val}">
							{customOptions.map(({country}) => (
								<Menu.Item value={country} key={country}>
									{country}
								</Menu.Item>
							))}
						</Menu>
						`}
					</DocsCode.Code>
				</DocsCode>
			))}
			<DocsSubTitle hash="size">Sizes</DocsSubTitle>
			<DocsText>
				You may have multiple sizes defined in theme for each of the subcomponents. Under size, you may define font
				size, padding and some margins.
			</DocsText>
			<DocsText>
				<AvailableKeys data={sizes} />
			</DocsText>
			{Object.keys(sizes).map((val) => (
				<DocsCode label={val} labelWidth="auto" key={val}>
					<DocsCode.Example>
						<Menu size={val}>
							{customOptions.map(({country}) => (
								<Menu.Item value={country} key={country}>
									{country}
								</Menu.Item>
							))}
						</Menu>
					</DocsCode.Example>
					<DocsCode.Code>
						{`
						<Menu size="${val}">
							{customOptions.map(({country}) => (
								<Menu.Item value={country} key={country}>
									{country}
								</Menu.Item>
							))}
						</Menu>
						`}
					</DocsCode.Code>
				</DocsCode>
			))}
			<DocsSubTitle hash="color">Colors</DocsSubTitle>
			<DocsText>
				You may have multiple colors defined in theme for each of the subcomponents. Check the theme for more options.
			</DocsText>
			<DocsText>
				<AvailableKeys data={colors} />
			</DocsText>
			{Object.keys(colors).map((val) => (
				<DocsCode label={val} labelWidth="auto" key={val}>
					<DocsCode.Example>
						<Menu color={val}>
							{customOptions.map(({country}) => (
								<Menu.Item value={country} key={country}>
									{country}
								</Menu.Item>
							))}
						</Menu>
					</DocsCode.Example>
					<DocsCode.Code>
						{`
						<Menu color="${val}">
							{customOptions.map(({country}) => (
								<Menu.Item value={country} key={country}>
									{country}
								</Menu.Item>
							))}
						</Menu>
						`}
					</DocsCode.Code>
				</DocsCode>
			))}
			<DocsSubTitle hash="item">Menu.Item</DocsSubTitle>
			<DocsText>
				This component provides the core functionality of <code>Menu</code> component while still keeping the
				possibility of completely visually customizing it. Check its props for more explanation and examples.
			</DocsText>
			<Props hash="item-props" title="Props for Menu.Item">
				<Props.Prop name="children" type={['string', 'number', 'node', 'func']}>
					<p>
						If passing <code>string</code>, <code>number</code> or <code>node</code>, then it'll be rendered as is, but
						respecting all styling from the theme. <code>node</code> allows you to put, for example,{' '}
						<code>Flexbox</code>
						inside to achieve more complex layout (for example, you want to put icon, then text).
					</p>
					<p>
						If using function, then it's possible to get some internal Item's state in order to customize whatever you
						need to customize. So, the first parameter of this function is object with the following keys:
					</p>
					<ul>
						<li>
							<strong>name</strong> - the name of <code>Menu</code> component
						</li>
						<li>
							<strong>isSelected</strong> - boolean - true if current Item is currently selected (item must have{' '}
							<code>value</code> prop set in order for this to work)
						</li>
						<li>
							<strong>isDisabled</strong> - boolean - true if menu or this item are set to be disabled
						</li>
					</ul>
				</Props.Prop>
				<Props.Prop name="value" type={['string', 'number']}>
					<p>
						If set, Item will start to behave like select's <code>option</code> tag.
					</p>
					<p>If Menu's value is equal to this value, it means that this item is then selected.</p>
					<p>
						Be aware the difference between string and number. <code>1</code> is not equal to <code>'1'</code>.
					</p>
				</Props.Prop>
				<Props.Prop name="inline" type="bool" defaultValue={false}>
					<p>
						If set to true, item will be rendered as <code>inline-block</code>.
					</p>
					<DocsCode>
						<DocsCode.Example>
							<Menu>
								{states.map((country) => (
									<Menu.Item value={country} key={country} inline>
										{country}
									</Menu.Item>
								))}
							</Menu>
						</DocsCode.Example>
						<DocsCode.Code>
							{`
							<Menu>
								{states.map((country) => (
									<Menu.Item value={country} key={country} inline>
										{country}
									</Menu.Item>
								))}
							</Menu>
							`}
						</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="disabled" type="bool" defaultValue={false}>
					<p>If set to true, this Item will be disabled.</p>
				</Props.Prop>
				<Props.Prop name="m" />
				<Props.Prop name="mt" />
				<Props.Prop name="mr" />
				<Props.Prop name="mb" />
				<Props.Prop name="ml" />
				<Props.Prop name="ref" />
			</Props>
			<DocsText>Here's more complex example when you want to put a checkbox and icon before the text.</DocsText>
			<DocsCode>
				<DocsCode.Example>
					<Menu defaultValue="Croatia">
						{customOptions.map(({country, icon}) => (
							<Menu.Item value={country} key={country} inline>
								{({isSelected}) => (
									<Flexbox alignItems="center">
										<Flexbox.Item width={30}>
											<Checkbox checked={isSelected} onChange={emptyFn} />
										</Flexbox.Item>
										<Flexbox.Item width={30}>
											<span className={`flag-icon flag-icon-${icon}`} />
										</Flexbox.Item>
										<Flexbox.Item>{country}</Flexbox.Item>
									</Flexbox>
								)}
							</Menu.Item>
						))}
					</Menu>
				</DocsCode.Example>
				<DocsCode.Code>
					{`
					<Menu defaultValue="Croatia">
						{customOptions.map(({country, icon}) => (
							<Menu.Item value={country} key={country} inline>
								{({isSelected}) => (
									<Flexbox alignItems="center">
										<Flexbox.Item width={30}>
											<Checkbox checked={isSelected} onChange={emptyFn} />
										</Flexbox.Item>
										<Flexbox.Item width={30}>
											<span className={\`flag-icon flag-icon-\${icon}\`} />
										</Flexbox.Item>
										<Flexbox.Item>{country}</Flexbox.Item>
									</Flexbox>
								)}
							</Menu.Item>
						))}
					</Menu>
					`}
				</DocsCode.Code>
			</DocsCode>
			<DocsSubTitle hash="divider">Menu.Divider</DocsSubTitle>
			<DocsText>
				Divider is simple component that puts the horizontal line 100% wide. Its color can be customized in theme, as
				well as thickness in variant. This component has no props.
			</DocsText>
		</>
	);
};
