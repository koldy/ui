import React, {useContext, useState} from 'react';

import Menu from './Menu';
import ThemeContext from '../../theme/ThemeContext';

import Props from '../../../docs/components/Props';
import AvailableKeys from '../../../docs/components/AvailableKeys';
import Button from '../Button/Button';
import Flexbox from '../Flexbox/Flexbox';
import Checkbox from '../Checkbox/Checkbox';

import {emptyFn} from '../../util/helpers';
import states from '../../../docs/util/example-data/states';
import H1 from '../../../docs/components/H1';
import Code from '../../../docs/components/Code';
import H2 from '../../../docs/components/H2';
import Paragraph from '../../../docs/components/Paragraph';
import List from '../../../docs/components/List';

export const title = 'Menu';
export const route = '/menu';
export const json = 'menu';

const customOptions = [
	{country: 'Austria', icon: 'at'},
	{country: 'Croatia', icon: 'hr'},
	{country: 'Germany', icon: 'de'}
];

export default function MenuDocs() {
	const {theme} = useContext(ThemeContext);

	const variants = theme.json('menu.variant');
	const colors = theme.json('menu.color');
	const sizes = theme.json('menu.size');

	const [example1, setExample1] = useState('Croatia');

	return (
		<>
			<H1>Menu (deprecated)</H1>
			<Code language="js" code="import {Menu} from 'koldy-ui';" />
			<Paragraph>Sub components:</Paragraph>
			<List>
				<List.Item>
					<a href="#item">
						<code>Menu.Item</code>
					</a>
				</List.Item>
				<List.Item>
					<a href="#divider">
						<code>Menu.Divider</code>
					</a>
				</List.Item>
			</List>
			<Paragraph>
				<code>Menu</code> component is one of the most useful components created in this UI library and here's why.
			</Paragraph>
			<Paragraph>
				It can be used both as navigation menu and it can be used as input component (that's why it's placed under input components). When
				used as input component, then it behaves similar to <code>Select</code> component. Other UI libraries and frameworks would offer
				components like Select2, SelectMenu, Navs, Vertical menus, Tag inputs and similar. So, in order not to "hardcode" all these
				derivatives, Koldy UI offers just a tool which can be used to build all those components and that tool is <code>Menu</code>.
			</Paragraph>
			<Paragraph>Here's an example of simple vertical menu:</Paragraph>
			<Code
				language="js"
				code={`
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
			>
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
			</Code>
			<Paragraph>
				And here's an example of <code>Menu</code> as input component. Watch the browser's console to see the changes on click.
			</Paragraph>
			<Code
				language="js"
				code={`
<Menu onChange={(x) => console.log(x)}>
  {customOptions.map(({country}) => (
    <Menu.Item value={country} key={country}>
      {country}
    </Menu.Item>
  ))}
</Menu>
        `}
			>
				<Menu onChange={(x) => console.log(x)}>
					{customOptions.map(({country}) => (
						<Menu.Item value={country} key={country}>
							{country}
						</Menu.Item>
					))}
				</Menu>
			</Code>
			<Paragraph>
				Notice that as soon as you give a value to the <code>Item</code>, it applies "input" behaviour. Check props docs for more
				explanation and examples.
			</Paragraph>
			<Props>
				<Props.Prop name="children" type="node" required>
					This prop is required and you're free to put literally anything in there, but to use this component's features, we recommend that
					you use <code>Menu.Item</code> and <code>Menu.Divider</code> for achieving most of the functionality.
				</Props.Prop>
				<Props.Prop name="name" type="string">
					If set, all active values will be rendered as HTML's <code>select</code> and <code>option</code> tags which are visually hidden,
					but if you put the menu inside the form, form serialization will automatically collect the selected options as well.
				</Props.Prop>
				<Props.Prop name="multiple" type="bool" defaultValue={false}>
					<Paragraph>
						If set to <code>true</code>, it'll allow multiple options to be active at the same time. If <code>onChange</code> is provided as
						well, then the value given through the onChange function will be either array (if multiple) or scalar value (if not multiple).
						Check your browser's console to see the case.
					</Paragraph>
					<Code
						language="js"
						code={`
<Menu onChange={({value}) => console.log(value)} multiple>
  {customOptions.map(({country}) => (
    <Menu.Item value={country} key={country}>
      {country}
    </Menu.Item>
  ))}
</Menu>
							`}
					>
						<Menu onChange={({value}) => console.log(value)} multiple>
							{customOptions.map(({country}) => (
								<Menu.Item value={country} key={country}>
									{country}
								</Menu.Item>
							))}
						</Menu>
					</Code>
				</Props.Prop>
				<Props.Prop name="value" type={['number', 'string', 'array']}>
					<Paragraph>
						If set, it means you're using this component as controlled component and you are responsible for the values all the time.
					</Paragraph>
					<Code
						language="js"
						code={`
const [example1, setExample1] = useState('Croatia');

<Menu onChange={({value}) => setExample1(value)} value={example1}>
  {customOptions.map(({country}) => (
    <Menu.Item value={country} key={country}>
      {country}
    </Menu.Item>
  ))}
</Menu>
            `}
					>
						<Menu onChange={({value}) => setExample1(value)} value={example1}>
							{customOptions.map(({country}) => (
								<Menu.Item value={country} key={country}>
									{country}
								</Menu.Item>
							))}
						</Menu>
						<Button onClick={() => setExample1('Germany')}>Set Germany</Button>
					</Code>
				</Props.Prop>
				<Props.Prop name="defaultValue" type={['number', 'string', 'array']}>
					<Paragraph>
						If set, it means you're using this component as uncontrolled component and you're just setting initial value.
					</Paragraph>
					<Code
						language="js"
						code={`
<Menu onChange={({value}) => console.log(value)} defaultValue="Croatia">
  {customOptions.map(({country}) => (
    <Menu.Item value={country} key={country}>
      {country}
    </Menu.Item>
  ))}
</Menu>
            `}
					>
						<Menu onChange={({value}) => console.log(value)} defaultValue="Croatia">
							{customOptions.map(({country}) => (
								<Menu.Item value={country} key={country}>
									{country}
								</Menu.Item>
							))}
						</Menu>
					</Code>
				</Props.Prop>
				<Props.Prop name="variant" type="string" defaultValue="theme.menu.defaults.variant">
					<Paragraph>The shape of menu and its elements.</Paragraph>
					<AvailableKeys data={variants} />
				</Props.Prop>
				<Props.Prop name="size" type="string" defaultValue="theme.menu.defaults.size">
					<Paragraph>The size of menu and its elements.</Paragraph>
					<AvailableKeys data={sizes} />
				</Props.Prop>
				<Props.Prop name="color" type="string" defaultValue="theme.menu.defaults.color">
					<Paragraph>The color of menu and its elements.</Paragraph>
					<AvailableKeys data={colors} />
				</Props.Prop>
				<Props.Prop name="height" type={['string', 'number']}>
					<Paragraph>
						If set, it'll fixate the height of menu and if there's more content inside of <code>Menu</code>
						component that its height, vertical scroll will appear.
					</Paragraph>
					<Code
						language="js"
						code={`
<Menu height={240}>
  {states.map((country) => (
    <Menu.Item value={country} key={country}>
      {country}
    </Menu.Item>
  ))}
</Menu>
							`}
					>
						<Menu height={240}>
							{states.map((country) => (
								<Menu.Item value={country} key={country}>
									{country}
								</Menu.Item>
							))}
						</Menu>
					</Code>
				</Props.Prop>
				<Props.Prop name="onChange" type="function">
					<Paragraph>
						Fires when there's a change on selected value(s). Function will get the object for first parameter with the following keys:
					</Paragraph>
					<List>
						<List.Item>
							<strong>name</strong> - the name of <code>Menu</code> component or <code>null</code>
						</List.Item>
						<List.Item>
							<strong>value</strong> - if <code>Menu</code> has <code>multiple</code> prop set to true, then value will be array, otherwise
							it'll be scalar value or <code>null</code> if nothing is selected.
						</List.Item>
					</List>
				</Props.Prop>
				<Props.Prop name="disabled" type="bool" defaultValue={false}>
					<Paragraph>
						If set to <code>true</code>, all items in within the Menu will be disabled.
					</Paragraph>
					<Code
						language="js"
						code={`
<Menu name="country" disabled defaultValue="Croatia">
  {customOptions.map(({country}) => (
    <Menu.Item value={country} key={country}>
      {country}
    </Menu.Item>
  ))}
</Menu>
							`}
					>
						<Menu name="country" disabled defaultValue="Croatia">
							{customOptions.map(({country}) => (
								<Menu.Item value={country} key={country}>
									{country}
								</Menu.Item>
							))}
						</Menu>
					</Code>
				</Props.Prop>
				<Props.Prop name="m" />
				<Props.Prop name="mt" />
				<Props.Prop name="mr" />
				<Props.Prop name="mb" />
				<Props.Prop name="ml" />
				<Props.Prop name="ref" />
			</Props>
			<H2 hash="variant">Variants</H2>
			<Paragraph>
				You may use variants as a chance to do some component styling, like having another font, or having another border style.
			</Paragraph>
			<AvailableKeys data={variants} />
			{Object.keys(variants).map((val) => (
				<Code
					language="js"
					code={`
<Menu variant="${val}">
  {customOptions.map(({country}) => (
    <Menu.Item value={country} key={country}>
      {country}
    </Menu.Item>
  ))}
</Menu>
						`}
					label={val}
					labelWidth="auto"
					key={val}
				>
					<Menu variant={val}>
						{customOptions.map(({country}) => (
							<Menu.Item value={country} key={country}>
								{country}
							</Menu.Item>
						))}
					</Menu>
				</Code>
			))}
			<H2 hash="size">Sizes</H2>
			<Paragraph>
				You may have multiple sizes defined in theme for each of the subcomponents. Under size, you may define font size, padding and some
				margins.
			</Paragraph>
			<Paragraph>
				<AvailableKeys data={sizes} />
			</Paragraph>
			{Object.keys(sizes).map((val) => (
				<Code
					language="js"
					code={`
<Menu size="${val}">
  {customOptions.map(({country}) => (
    <Menu.Item value={country} key={country}>
      {country}
    </Menu.Item>
  ))}
</Menu>
          `}
					label={val}
					labelWidth="auto"
					key={val}
				>
					<Menu size={val}>
						{customOptions.map(({country}) => (
							<Menu.Item value={country} key={country}>
								{country}
							</Menu.Item>
						))}
					</Menu>
				</Code>
			))}
			<H2 hash="color">Colors</H2>
			<Paragraph>You may have multiple colors defined in theme for each of the subcomponents. Check the theme for more options.</Paragraph>
			<Paragraph>
				<AvailableKeys data={colors} />
			</Paragraph>
			{Object.keys(colors).map((val) => (
				<Code
					language="js"
					code={`
<Menu color="${val}">
  {customOptions.map(({country}) => (
    <Menu.Item value={country} key={country}>
      {country}
    </Menu.Item>
  ))}
</Menu>
						`}
					label={val}
					labelWidth="auto"
					key={val}
				>
					<Menu color={val}>
						{customOptions.map(({country}) => (
							<Menu.Item value={country} key={country}>
								{country}
							</Menu.Item>
						))}
					</Menu>
				</Code>
			))}
			<Paragraph>
				These color combinations might not look attractive when having "vertical menus", so here's the same example with inline elements and
				variant rounded:
			</Paragraph>
			{Object.keys(colors).map((val) => (
				<Code
					language="js"
					code={`
<Menu color="${val}" variant="rounded">
  {customOptions.map(({country}) => (
    <Menu.Item value={country} inline m="0.25rem" key={country}>
      {country}
    </Menu.Item>
  ))}
</Menu>
						`}
					label={val}
					labelWidth="auto"
					key={val}
				>
					<Menu color={val} variant="rounded">
						{customOptions.map(({country}) => (
							<Menu.Item value={country} inline m="0.25rem" key={country}>
								{country}
							</Menu.Item>
						))}
					</Menu>
				</Code>
			))}
			<H2 hash="item">Menu.Item</H2>
			<Paragraph>
				This component provides the core functionality of <code>Menu</code> component while still keeping the possibility of completely
				visually customizing it. Check its props for more explanation and examples.
			</Paragraph>
			<Props hash="item-props" title="Props for Menu.Item">
				<Props.Prop name="children" type={['string', 'number', 'node', 'func']}>
					<Paragraph>
						If passing <code>string</code>, <code>number</code> or <code>node</code>, then it'll be rendered as is, but respecting all
						styling from the theme. <code>node</code> allows you to put, for example, <code>Flexbox</code>
						inside to achieve more complex layout (for example, you want to put icon, then text).
					</Paragraph>
					<Paragraph>
						If using function, then it's possible to get some internal Item's state in order to customize whatever you need to customize.
						So, the first parameter of this function is object with the following keys:
					</Paragraph>
					<List>
						<List.Item>
							<strong>name</strong> - the name of <code>Menu</code> component
						</List.Item>
						<List.Item>
							<strong>isSelected</strong> - boolean - true if current Item is currently selected (item must have <code>value</code> prop set
							in order for this to work)
						</List.Item>
						<List.Item>
							<strong>isDisabled</strong> - boolean - true if menu or this item are set to be disabled
						</List.Item>
					</List>
				</Props.Prop>
				<Props.Prop name="value" type={['string', 'number']}>
					<Paragraph>
						If set, Item will start to behave like select's <code>option</code> tag.
					</Paragraph>
					<Paragraph>If Menu's value is equal to this value, it means that this item is then selected.</Paragraph>
					<Paragraph>
						Be aware the difference between string and number. <code>1</code> is not equal to <code>'1'</code>.
					</Paragraph>
				</Props.Prop>
				<Props.Prop name="inline" type="bool" defaultValue={false}>
					<Paragraph>
						If set to true, item will be rendered as <code>inline-block</code>.
					</Paragraph>
					<Code
						language="js"
						code={`
<Menu>
  {states.map((country) => (
    <Menu.Item value={country} key={country} inline>
      {country}
    </Menu.Item>
  ))}
</Menu>
							`}
					>
						<Menu>
							{states.map((country) => (
								<Menu.Item value={country} key={country} inline>
									{country}
								</Menu.Item>
							))}
						</Menu>
					</Code>
				</Props.Prop>
				<Props.Prop name="disabled" type="bool" defaultValue={false}>
					<Paragraph>If set to true, this Item will be disabled.</Paragraph>
				</Props.Prop>
				<Props.Prop name="onClick">
					<Paragraph>Fires function with object on first parameter with the following keys:</Paragraph>
					<List>
						<List.Item>
							<strong>value</strong> - value given as prop
						</List.Item>
					</List>
					<Code language="js">
						<Menu>
							{customOptions.map(({country}) => (
								<Menu.Item key={country} value={country} inline onClick={(x) => console.log(x)}>
									{country}
								</Menu.Item>
							))}
						</Menu>
					</Code>
					<Paragraph>
						Bw aware that if <code>onClick</code> prop is set, then <code>onChange</code> in <code>Menu</code> component won't work because
						internal click handler will be overridden with your function.
					</Paragraph>
				</Props.Prop>
				<Props.Prop name="onDoubleClick">
					<Paragraph>Fires function with object on first parameter with the following keys:</Paragraph>
					<List>
						<List.Item>
							<strong>value</strong> - value given as prop
						</List.Item>
					</List>
					<Code language="js" code="">
						<>
							<Menu>
								{customOptions.map(({country}) => (
									<Menu.Item key={country} value={country} inline onDoubleClick={(x) => console.log(x)}>
										{country}
									</Menu.Item>
								))}
							</Menu>
						</>
					</Code>
				</Props.Prop>
				<Props.Prop name="m" />
				<Props.Prop name="mt" />
				<Props.Prop name="mr" />
				<Props.Prop name="mb" />
				<Props.Prop name="ml" />
				<Props.Prop name="ref" />
				<Props.Prop name="as">
					<Paragraph>
						If you're just building vertical menus with this component, then you may use this prop as opportunity to completely change its
						internal behaviour. Here are few examples:
					</Paragraph>
					<Code
						language="js"
						code={`
<Menu>
  {customOptions.map(({country}) => (
    <Menu.Item key={country} as="a" href={\`https://google.com/?q=\${country}\`} target="_blank">
      {country}
    </Menu.Item>
  ))}
</Menu>
            `}
					>
						<Menu>
							{customOptions.map(({country}) => (
								<Menu.Item key={country} as="a" href={`https://google.com/?q=${country}`} target="_blank">
									{country}
								</Menu.Item>
							))}
						</Menu>
					</Code>
					<Paragraph>
						Bw aware that if you're using this component on this way, then you shouldn't pass <code>value</code> prop because that would
						override the click events.
					</Paragraph>
				</Props.Prop>
			</Props>
			<Paragraph>Here's more complex example when you want to put a checkbox and icon before the text.</Paragraph>
			<Code
				language="js"
				code={`
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
			>
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
			</Code>
			<H2 hash="divider">Menu.Divider</H2>
			<Paragraph>
				Divider is simple component that puts the horizontal line 100% wide. Its color can be customized in theme, as well as thickness in
				variant. This component has no props.
			</Paragraph>
		</>
	);
}
