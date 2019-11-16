import React, {useContext} from 'react';
import DocsTitle from '../../../docs/components/DocsTitle';

import Table from './Table';
import ThemeContext from '../../theme/ThemeContext';

import Props from '../../../docs/components/Props';
import DocsSubTitle from '../../../docs/components/DocsSubTitle';
import DocsText from '../../../docs/components/DocsText';
import ImportComponent from '../../../docs/components/ImportComponent';
import AvailableKeys from '../../../docs/components/AvailableKeys';
import DocsCode from '../../../docs/components/DocsCode';

export const title = 'Table';
export const slug = 'table';
export const json = 'table';

export const Documentation = function() {
	const {theme} = useContext(ThemeContext);

	const colors = theme.json('table.color');
	const sizes = theme.json('table.size');

	return (
		<>
			<DocsTitle hash="table">Table</DocsTitle>
			<ImportComponent name="Table" />
			<DocsText>
				This is Koldy <strong>UI</strong> and that's why this component offers only styled User Interface and nothing
				else. Here's an example of Table:
			</DocsText>
			<DocsCode>
				<DocsCode.Example>
					<Table color="gray" border="table|head|row|column" striped hover="row">
						<Table.Head>
							<Table.Tr>
								<Table.Th>continent</Table.Th>
								<Table.Th>country</Table.Th>
								<Table.Th>population</Table.Th>
							</Table.Tr>
						</Table.Head>
						<Table.Body>
							<Table.Tr>
								<Table.Td>Australia</Table.Td>
								<Table.Td>Australia</Table.Td>
								<Table.Td>20M</Table.Td>
							</Table.Tr>
							<Table.Tr>
								<Table.Td>Europe</Table.Td>
								<Table.Td>Croatia</Table.Td>
								<Table.Td>4M</Table.Td>
							</Table.Tr>
							<Table.Tr>
								<Table.Td>Europe</Table.Td>
								<Table.Td>Germany</Table.Td>
								<Table.Td>81M</Table.Td>
							</Table.Tr>
						</Table.Body>
					</Table>
				</DocsCode.Example>
				<DocsCode.Code>
					{`
					<Table color="gray" border="table|head|row|column" striped hover="row">
						<Table.Head>
							<Table.Tr>
								<Table.Th>continent</Table.Th>
								<Table.Th>country</Table.Th>
								<Table.Th>population</Table.Th>
							</Table.Tr>
						</Table.Head>
						<Table.Body>
							<Table.Tr>
								<Table.Td>Australia</Table.Td>
								<Table.Td>Australia</Table.Td>
								<Table.Td>20M</Table.Td>
							</Table.Tr>
							<Table.Tr>
								<Table.Td>Europe</Table.Td>
								<Table.Td>Croatia</Table.Td>
								<Table.Td>4M</Table.Td>
							</Table.Tr>
							<Table.Tr>
								<Table.Td>Europe</Table.Td>
								<Table.Td>Germany</Table.Td>
								<Table.Td>81M</Table.Td>
							</Table.Tr>
						</Table.Body>
					</Table>
					`}
				</DocsCode.Code>
			</DocsCode>
			<DocsText>
				Jump to subcomponent:{' '}
				<a href="#head">
					<code>Head</code>
				</a>
				,{' '}
				<a href="#body">
					<code>Body</code>
				</a>
				,{' '}
				<a href="#foot">
					<code>Foot</code>
				</a>
				,{' '}
				<a href="#tr">
					<code>Tr</code>
				</a>
				,{' '}
				<a href="#th">
					<code>Th</code>
				</a>
				,{' '}
				<a href="#td">
					<code>Td</code>
				</a>
			</DocsText>
			<Props>
				<Props.Prop name="children" type="node" />
				<Props.Prop name="color" type="string" defaultValue="theme.table.defaults.color">
					<p>Set the table's predefined color set.</p>
					<AvailableKeys data={colors} />
				</Props.Prop>
				<Props.Prop name="size" type="string" defaultValue="theme.table.defaults.size">
					<p>Sets the table's size using parameters from the theme.</p>
					<AvailableKeys data={sizes} />
				</Props.Prop>
				<Props.Prop name="tableLayout" type="string" defaultValue="theme.table.defaults.tableLayout">
					Use one of the CSS's value: <code>auto</code> or <code>fixed</code>.
				</Props.Prop>
				<Props.Prop name="width" type={['string', 'number']} defaultValue="100%">
					Defines the width. If passed as number, it'll be used as pixels, otherwise it'll be used as is.
				</Props.Prop>
				<Props.Prop name="border" type="string" defaultValue="theme.table.defaults.border">
					<p>
						Defines where you want to have a border visible on table. This prop can accept multiple border values by
						separating the string with <code>|</code>. So if you want to have a border around the whole table, plus
						under every row, then set the border to <code>table|row</code>.
					</p>
					<AvailableKeys data={['table', 'row', 'column', 'head', 'foot']} />
				</Props.Prop>
				<Props.Prop name="hover" type="string" defaultValue="theme.table.defaults.hover">
					<p>Defines which elements should change its color on hover.</p>
					<AvailableKeys data={['table', 'row', 'cell']} />
				</Props.Prop>
				<Props.Prop name="striped" type="boolean" defaultValue="theme.table.defaults.striped">
					<p>Tells the component to have different background on every even row.</p>
				</Props.Prop>
				<Props.Prop name="style" />
				<Props.Prop name="m" />
				<Props.Prop name="mt" />
				<Props.Prop name="mr" />
				<Props.Prop name="mb" />
				<Props.Prop name="ml" />
			</Props>
			<DocsText>Table is a component for showing tabular data. Don't ever use Table component for layout.</DocsText>
			<DocsText>
				This component wraps basic HTML and CSS properties into several components provided as static properties of{' '}
				<code>Table</code>:
			</DocsText>
			<DocsText>
				<ul>
					<li>
						<a href="#head">
							<code>Table.Head</code>
						</a>
					</li>
					<li>
						<a href="#body">
							<code>Table.Body</code>
						</a>
					</li>
					<li>
						<a href="#foot">
							<code>Table.Foot</code>
						</a>
					</li>
					<li>
						<a href="#tr">
							<code>Table.Tr</code>
						</a>
					</li>
					<li>
						<a href="#th">
							<code>Table.Th</code>
						</a>
					</li>
					<li>
						<a href="#td">
							<code>Table.Td</code>
						</a>
					</li>
				</ul>
			</DocsText>
			<DocsText>
				Table component always expect <code>Head</code>, <code>Body</code> or <code>Foot</code> as its direct children
				and to keep everything consistent, it won't allow <code>&lt;tr&gt;</code> tags as direct children of{' '}
				<code>&lt;table&gt;</code> tag.
			</DocsText>
			<DocsSubTitle hash="theory">Some theory about styling</DocsSubTitle>
			<DocsText>
				When you're thinking about styling the table, there's just few things reasonable enough that should go to the
				theme definition:
			</DocsText>
			<DocsText>
				<ul>
					<li>size</li>
					<li>colors</li>
				</ul>
			</DocsText>
			<DocsText>
				When we're talking about the size, we're talking about default cell padding, spacing and default font size
				within the cell. Avoid defining CSS for the children in cells.
			</DocsText>
			<DocsText>
				And when we're talking about the colors, we talk about backgrounds, text color, hover effects, border colors and
				the colors of the child elements within the table's cell.
			</DocsText>
			<DocsText>Both size and colors can be defined in the theme. Please note:</DocsText>
			<DocsText>
				<ul>
					<li>table's column widths, row heights and etc. shouldn't be defined in the theme</li>
					<li>table's column widths, row heights and etc. should be defined while implementing table's components</li>
				</ul>
			</DocsText>
			<DocsCode>
				<DocsCode.Example>
					<Table width="100%" tableLayout="fixed">
						<Table.Head>
							<Table.Tr>
								<Table.Th width={70}>-</Table.Th>
								<Table.Th>1st</Table.Th>
								<Table.Th>2nd</Table.Th>
								<Table.Th>3rd</Table.Th>
							</Table.Tr>
						</Table.Head>
						<Table.Body>
							<Table.Tr>
								<Table.Th>first</Table.Th>
								<Table.Td>1.1</Table.Td>
								<Table.Td>1.2</Table.Td>
								<Table.Td>1.3</Table.Td>
							</Table.Tr>
							<Table.Tr>
								<Table.Th>second</Table.Th>
								<Table.Td>2.1</Table.Td>
								<Table.Td>2.2</Table.Td>
								<Table.Td>2.3</Table.Td>
							</Table.Tr>
						</Table.Body>
					</Table>
				</DocsCode.Example>
				<DocsCode.Code>
					{`
					<Table width="100%" tableLayout="fixed">
						<Table.Head>
							<Table.Tr>
								<Table.Th width={70}>-</Table.Th>
								<Table.Th>1st</Table.Th>
								<Table.Th>2nd</Table.Th>
								<Table.Th>3rd</Table.Th>
							</Table.Tr>
						</Table.Head>
						<Table.Body>
							<Table.Tr>
								<Table.Th>first</Table.Th>
								<Table.Td>1.1</Table.Td>
								<Table.Td>1.2</Table.Td>
								<Table.Td>1.3</Table.Td>
							</Table.Tr>
							<Table.Tr>
								<Table.Th>second</Table.Th>
								<Table.Td>2.1</Table.Td>
								<Table.Td>2.2</Table.Td>
								<Table.Td>2.3</Table.Td>
							</Table.Tr>
						</Table.Body>
					</Table>
					`}
				</DocsCode.Code>
			</DocsCode>
			<DocsSubTitle hash="size">Size</DocsSubTitle>
			<DocsText>
				<AvailableKeys data={sizes} name="theme.table.size" />
			</DocsText>
			{Object.keys(sizes).map((size) => (
				<DocsCode key={size} label={size}>
					<DocsCode.Example>
						<Table size={size}>
							<Table.Head>
								<Table.Tr>
									<Table.Th>continent</Table.Th>
									<Table.Th>country</Table.Th>
									<Table.Th>population</Table.Th>
								</Table.Tr>
							</Table.Head>
							<Table.Body>
								<Table.Tr>
									<Table.Td>Australia</Table.Td>
									<Table.Td>Australia</Table.Td>
									<Table.Td>20M</Table.Td>
								</Table.Tr>
								<Table.Tr>
									<Table.Td>Europe</Table.Td>
									<Table.Td>Croatia</Table.Td>
									<Table.Td>4M</Table.Td>
								</Table.Tr>
								<Table.Tr>
									<Table.Td>Europe</Table.Td>
									<Table.Td>Germany</Table.Td>
									<Table.Td>81M</Table.Td>
								</Table.Tr>
							</Table.Body>
						</Table>
					</DocsCode.Example>
					<DocsCode.Code>
						{`
						<Table size="${size}">
							<Table.Head>
								<Table.Tr>
									<Table.Th>continent</Table.Th>
									<Table.Th>country</Table.Th>
									<Table.Th>population</Table.Th>
								</Table.Tr>
							</Table.Head>
							<Table.Body>
								<Table.Tr>
									<Table.Td>Australia</Table.Td>
									<Table.Td>Australia</Table.Td>
									<Table.Td>20M</Table.Td>
								</Table.Tr>
								<Table.Tr>
									<Table.Td>Europe</Table.Td>
									<Table.Td>Croatia</Table.Td>
									<Table.Td>4M</Table.Td>
								</Table.Tr>
								<Table.Tr>
									<Table.Td>Europe</Table.Td>
									<Table.Td>Germany</Table.Td>
									<Table.Td>81M</Table.Td>
								</Table.Tr>
							</Table.Body>
						</Table>
						`}
					</DocsCode.Code>
				</DocsCode>
			))}
			<DocsSubTitle hash="color">Color</DocsSubTitle>
			<DocsText>
				<AvailableKeys data={colors} name="theme.table.color" />
			</DocsText>
			{Object.keys(colors).map((color) => (
				<DocsCode key={color} label={color}>
					<DocsCode.Example>
						<Table color={color} border="row|column|table|head">
							<Table.Head>
								<Table.Tr>
									<Table.Th>continent</Table.Th>
									<Table.Th>country</Table.Th>
									<Table.Th>population</Table.Th>
								</Table.Tr>
							</Table.Head>
							<Table.Body>
								<Table.Tr>
									<Table.Td>Australia</Table.Td>
									<Table.Td>Australia</Table.Td>
									<Table.Td>20M</Table.Td>
								</Table.Tr>
								<Table.Tr>
									<Table.Td>Europe</Table.Td>
									<Table.Td>Croatia</Table.Td>
									<Table.Td>4M</Table.Td>
								</Table.Tr>
								<Table.Tr>
									<Table.Td>Europe</Table.Td>
									<Table.Td>Germany</Table.Td>
									<Table.Td>81M</Table.Td>
								</Table.Tr>
							</Table.Body>
						</Table>
					</DocsCode.Example>
					<DocsCode.Code>
						{`
						<Table color="${color}" border="row|column|table|head">
							<Table.Head>
								<Table.Tr>
									<Table.Th>continent</Table.Th>
									<Table.Th>country</Table.Th>
									<Table.Th>population</Table.Th>
								</Table.Tr>
							</Table.Head>
							<Table.Body>
								<Table.Tr>
									<Table.Td>Australia</Table.Td>
									<Table.Td>Australia</Table.Td>
									<Table.Td>20M</Table.Td>
								</Table.Tr>
								<Table.Tr>
									<Table.Td>Europe</Table.Td>
									<Table.Td>Croatia</Table.Td>
									<Table.Td>4M</Table.Td>
								</Table.Tr>
								<Table.Tr>
									<Table.Td>Europe</Table.Td>
									<Table.Td>Germany</Table.Td>
									<Table.Td>81M</Table.Td>
								</Table.Tr>
							</Table.Body>
						</Table>
						`}
					</DocsCode.Code>
				</DocsCode>
			))}
			<DocsSubTitle hash="head">Head</DocsSubTitle>
			<DocsSubTitle hash="body">Body</DocsSubTitle>
			<DocsSubTitle hash="foot">Foot</DocsSubTitle>
			<DocsText>All these components accept only children prop which should be node.</DocsText>
			<DocsSubTitle hash="tr">Tr</DocsSubTitle>
			<DocsText>
				Use this component as direct child of <code>Table.Head</code>, <code>Table.Body</code> or{' '}
				<code>Table.Foot</code> component.
			</DocsText>
			<Props hash="tr-props">
				<Props.Prop name="children" type="node" />
				<Props.Prop name="onClick">If defined, it'll be triggered if any cell within the row is clicked on.</Props.Prop>
				<Props.Prop name="onDoubleClick">
					If defined, it'll be triggered if any cell within the row is double clicked on.
				</Props.Prop>
			</Props>
			<DocsSubTitle hash="th">Th</DocsSubTitle>
			<DocsText>
				Use this component as direct child of <code>Table.Tr</code> component.
			</DocsText>
			<Props hash="th-props">
				<Props.Prop name="children" type="node" />
				<Props.Prop name="onClick">
					If defined, it'll be triggered when user clicks on the cell. <code>onClick</code> events are always stopped
					when propagation, so if there's <code>onClick</code> set on <code>Tr</code> component, it won't be triggered.
				</Props.Prop>
				<Props.Prop name="onDoubleClick">
					If defined, it'll be triggered if any cell within the row is double clicked on.
				</Props.Prop>
				<Props.Prop name="width" type={['string', 'number']}>
					Set the cell width. If number is passed, it'll be treated as pixels. If string is passed, it'll be used as is.
				</Props.Prop>
				<Props.Prop name="textAlign" type="string">
					One of: <code>left</code>, <code>center</code>, <code>right</code>, <code>justify</code>
				</Props.Prop>
				<Props.Prop name="verticalAlign" type="string">
					One of: <code>baseline</code>, <code>sub</code>, <code>super</code>, <code>text-top</code>,{' '}
					<code>text-bottom</code>, <code>middle</code>, <code>top</code> or <code>bottom</code>.
				</Props.Prop>
				<Props.Prop name="colSpan" type="number">
					Standard <code>colspan</code> attribute for the cell.
				</Props.Prop>
				<Props.Prop name="rowSpan" type="number">
					Standard <code>rowspan</code> attribute for the cell.
				</Props.Prop>
				<Props.Prop name="p" />
				<Props.Prop name="pt" />
				<Props.Prop name="pr" />
				<Props.Prop name="pb" />
				<Props.Prop name="pl" />
				<Props.Prop name="style" />
			</Props>
			<DocsSubTitle hash="td">Td</DocsSubTitle>
			<DocsText>
				Use this component as direct child of <code>Table.Tr</code> component.
			</DocsText>
			<Props hash="td-props">
				<Props.Prop name="children" type="node" />
				<Props.Prop name="onClick">
					If defined, it'll be triggered when user clicks on the cell. <code>onClick</code> events are always stopped
					when propagation, so if there's <code>onClick</code> set on <code>Tr</code> component, it won't be triggered.
				</Props.Prop>
				<Props.Prop name="onDoubleClick">
					If defined, it'll be triggered if any cell within the row is double clicked on.
				</Props.Prop>
				<Props.Prop name="width" type={['string', 'number']}>
					Set the cell width. If number is passed, it'll be treated as pixels. If string is passed, it'll be used as is.
				</Props.Prop>
				<Props.Prop name="textAlign" type="string">
					One of: <code>left</code>, <code>center</code>, <code>right</code>, <code>justify</code>
				</Props.Prop>
				<Props.Prop name="verticalAlign" type="string">
					One of: <code>baseline</code>, <code>sub</code>, <code>super</code>, <code>text-top</code>,{' '}
					<code>text-bottom</code>, <code>middle</code>, <code>top</code> or <code>bottom</code>.
				</Props.Prop>
				<Props.Prop name="colSpan" type="number">
					Standard <code>colspan</code> attribute for the cell.
				</Props.Prop>
				<Props.Prop name="rowSpan" type="number">
					Standard <code>rowspan</code> attribute for the cell.
				</Props.Prop>
				<Props.Prop name="p" />
				<Props.Prop name="pt" />
				<Props.Prop name="pr" />
				<Props.Prop name="pb" />
				<Props.Prop name="pl" />
				<Props.Prop name="style" />
			</Props>
		</>
	);
};
