import React, {useContext} from 'react';

import Table from './Table';
import ThemeContext from '../../theme/ThemeContext';

import Props from '../../../docs/components/Props';
import H1 from '../../../docs/components/H1';
import Code from '../../../docs/components/Code';
import Paragraph from '../../../docs/components/Paragraph';
import AvailableKeys from '../../../docs/components/AvailableKeys';
import List from '../../../docs/components/List';
import H2 from '../../../docs/components/H2';
import Button from '../Button/Button';

export const title = 'Table';
export const route = '/table';
export const json = 'table';

export default function TableDocs() {
	const {theme} = useContext(ThemeContext);

	const colors = theme.json('table.color');
	const sizes = theme.json('table.size');

	return (
		<>
			<H1>Table</H1>
			<Code language="js" code="import {Table} from 'koldy-ui';" />
			<Paragraph>
				This is Koldy <strong>UI</strong> and that's why this component offers only styled User Interface and nothing else. Here's an
				example of Table:
			</Paragraph>
			<Code
				language="js"
				code={`
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
			>
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
			</Code>
			<Paragraph>
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
			</Paragraph>
			<Props>
				<Props.Prop name="children" type="node" />
				<Props.Prop name="color" type="string" defaultValue="theme.table.defaults.color">
					<Paragraph>Set the table's predefined color set.</Paragraph>
					<AvailableKeys data={colors} />
				</Props.Prop>
				<Props.Prop name="size" type="string" defaultValue="theme.table.defaults.size">
					<Paragraph>Sets the table's size using parameters from the theme.</Paragraph>
					<AvailableKeys data={sizes} />
				</Props.Prop>
				<Props.Prop name="tableLayout" type="string" defaultValue="theme.table.defaults.tableLayout">
					Use one of the CSS's value: <code>auto</code> or <code>fixed</code>.
				</Props.Prop>
				<Props.Prop name="width" type={['string', 'number']} defaultValue="100%">
					Defines the width. If passed as number, it'll be used as pixels, otherwise it'll be used as is.
				</Props.Prop>
				<Props.Prop name="border" type="string" defaultValue="theme.table.defaults.border">
					<Paragraph>
						Defines where you want to have a border visible on table. This prop can accept multiple border values by separating the string
						with <code>|</code>. So if you want to have a border around the whole table, plus under every row, then set the border to{' '}
						<code>table|row</code>.
					</Paragraph>
					<AvailableKeys data={['table', 'row', 'column', 'head', 'foot']} />
				</Props.Prop>
				<Props.Prop name="hover" type="string" defaultValue="theme.table.defaults.hover">
					<Paragraph>Defines which elements should change its color on hover.</Paragraph>
					<AvailableKeys data={['table', 'row', 'cell']} />
				</Props.Prop>
				<Props.Prop name="striped" type="boolean" defaultValue="theme.table.defaults.striped">
					<Paragraph>Tells the component to have different background on every even row.</Paragraph>
				</Props.Prop>
				<Props.Prop name="style" />
				<Props.Prop name="m" />
				<Props.Prop name="mt" />
				<Props.Prop name="mr" />
				<Props.Prop name="mb" />
				<Props.Prop name="ml" />
			</Props>
			<Paragraph>Table is a component for showing tabular data. Don't ever use Table component for layout.</Paragraph>
			<Paragraph>
				This component wraps basic HTML and CSS properties into several components provided as static properties of <code>Table</code>:
			</Paragraph>
			<List>
				<List.Item>
					<a href="#head">
						<code>Table.Head</code>
					</a>
				</List.Item>
				<List.Item>
					<a href="#body">
						<code>Table.Body</code>
					</a>
				</List.Item>
				<List.Item>
					<a href="#foot">
						<code>Table.Foot</code>
					</a>
				</List.Item>
				<List.Item>
					<a href="#tr">
						<code>Table.Tr</code>
					</a>
				</List.Item>
				<List.Item>
					<a href="#th">
						<code>Table.Th</code>
					</a>
				</List.Item>
				<List.Item>
					<a href="#td">
						<code>Table.Td</code>
					</a>
				</List.Item>
				<List.Item>
					<a href="#on-row-hover">
						<code>Table.OnRowHover</code>
					</a>
				</List.Item>
			</List>
			<Paragraph>
				Table component always expect <code>Head</code>, <code>Body</code> or <code>Foot</code> as its direct children and to keep
				everything consistent, it won't allow <code>&lt;tr&gt;</code> tags as direct children of <code>&lt;table&gt;</code> tag.
			</Paragraph>
			<Paragraph>
				<code>Table.OnRowHover</code> is special component that's initially hidden, unless you hover over table's row. Show/hide effect is
				achieved with pure CSS, so no Javascript or internal state updates are made.
			</Paragraph>
			<H2 hash="theory">Some theory about styling</H2>
			<Paragraph>
				When you're thinking about styling the table, there's just few things reasonable enough that should go to the theme definition:
			</Paragraph>
			<List>
				<List.Item>size</List.Item>
				<List.Item>colors</List.Item>
			</List>
			<Paragraph>
				When we're talking about the size, we're talking about default cell padding, spacing and default font size within the cell. Avoid
				defining CSS for the children in cells.
			</Paragraph>
			<Paragraph>
				And when we're talking about the colors, we talk about backgrounds, text color, hover effects, border colors and the colors of the
				child elements within the table's cell.
			</Paragraph>
			<Paragraph>Both size and colors can be defined in the theme. Please note:</Paragraph>
			<List>
				<List.Item>table's column widths, row heights and etc. shouldn't be defined in the theme</List.Item>
				<List.Item>table's column widths, row heights and etc. should be defined while implementing table's components</List.Item>
			</List>
			<Code
				language="js"
				code={`
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
			>
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
			</Code>
			<H2 hash="size">Size</H2>
			<AvailableKeys data={sizes} name="theme.table.size" />
			{Object.keys(sizes).map((size) => (
				<Code
					language="js"
					code={`
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
					key={size}
					label={size}
				>
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
				</Code>
			))}
			<H2 hash="color">Color</H2>
			<AvailableKeys data={colors} name="theme.table.color" />
			{Object.keys(colors).map((color) => (
				<Code
					language="js"
					code={`
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
					key={color}
					label={color}
				>
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
				</Code>
			))}
			<H2 hash="head">Head</H2>
			<H2 hash="body">Body</H2>
			<H2 hash="foot">Foot</H2>
			<Paragraph>All these components accept only children prop which should be node.</Paragraph>
			<H2 hash="tr">Tr</H2>
			<Paragraph>
				Use this component as direct child of <code>Table.Head</code>, <code>Table.Body</code> or <code>Table.Foot</code> component.
			</Paragraph>
			<Props hash="tr-props">
				<Props.Prop name="children" type="node" />
				<Props.Prop name="onClick">If defined, it'll be triggered if any cell within the row is clicked on.</Props.Prop>
				<Props.Prop name="onDoubleClick">If defined, it'll be triggered if any cell within the row is double clicked on.</Props.Prop>
			</Props>
			<H2 hash="th">Th</H2>
			<Paragraph>
				Use this component as direct child of <code>Table.Tr</code> component.
			</Paragraph>
			<Props hash="th-props">
				<Props.Prop name="children" type="node" />
				<Props.Prop name="onClick">
					If defined, it'll be triggered when user clicks on the cell. <code>onClick</code> events are always stopped when propagation, so
					if there's <code>onClick</code> set on <code>Tr</code> component, it won't be triggered.
				</Props.Prop>
				<Props.Prop name="onDoubleClick">If defined, it'll be triggered if any cell within the row is double clicked on.</Props.Prop>
				<Props.Prop name="width" type={['string', 'number']}>
					Set the cell width. If number is passed, it'll be treated as pixels. If string is passed, it'll be used as is.
				</Props.Prop>
				<Props.Prop name="textAlign" type="string" defaultValue="inherit">
					One of: <code>left</code>, <code>center</code>, <code>right</code>, <code>justify</code>, <code>inherit</code>
				</Props.Prop>
				<Props.Prop name="verticalAlign" type="string">
					One of: <code>baseline</code>, <code>sub</code>, <code>super</code>, <code>text-top</code>, <code>text-bottom</code>,{' '}
					<code>middle</code>, <code>top</code> or <code>bottom</code>.
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
			<H2 hash="td">Td</H2>
			<Paragraph>
				Use this component as direct child of <code>Table.Tr</code> component.
			</Paragraph>
			<Props hash="td-props">
				<Props.Prop name="children" type="node" />
				<Props.Prop name="onClick">
					If defined, it'll be triggered when user clicks on the cell. <code>onClick</code> events are always stopped when propagation, so
					if there's <code>onClick</code> set on <code>Tr</code> component, it won't be triggered.
				</Props.Prop>
				<Props.Prop name="onDoubleClick">If defined, it'll be triggered if any cell within the row is double clicked on.</Props.Prop>
				<Props.Prop name="width" type={['string', 'number']}>
					Set the cell width. If number is passed, it'll be treated as pixels. If string is passed, it'll be used as is.
				</Props.Prop>
				<Props.Prop name="textAlign" type="string" defaultValue="inherit">
					One of: <code>left</code>, <code>center</code>, <code>right</code>, <code>justify</code>
				</Props.Prop>
				<Props.Prop name="verticalAlign" type="string">
					One of: <code>baseline</code>, <code>sub</code>, <code>super</code>, <code>text-top</code>, <code>text-bottom</code>,{' '}
					<code>middle</code>, <code>top</code> or <code>bottom</code>.
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
			<H2 hash="on-row-hover">OnRowHover</H2>
			<Paragraph>
				Use this component when you want to show some content inside table's cell while hovering mouse pointer over the table's row.
			</Paragraph>
			<Props hash="on-row-hover-props">
				<Props.Prop name="children" type="node" />
			</Props>
			<Paragraph>Check the example:</Paragraph>
			<Code
				language="js"
				code={`
<Table color="gray" border="table|head|row|column" striped hover="row">
  <Table.Head>
    <Table.Tr>
      <Table.Th>country</Table.Th>
      <Table.Th width={180} textAlign="right">action</Table.Th>
    </Table.Tr>
  </Table.Head>
  <Table.Body>
    <Table.Tr>
      <Table.Td>Australia</Table.Td>
      <Table.Td textAlign="right">
        <Table.OnRowHover>
          <Button color="danger" size="sm">Delete</Button>
        </Table.OnRowHover>
      </Table.Td>
    </Table.Tr>
    <Table.Tr>
      <Table.Td>Croatia</Table.Td>
      <Table.Td textAlign="right">
        <Table.OnRowHover>
          <Button color="danger" size="sm">Delete</Button>
        </Table.OnRowHover>
      </Table.Td>
    </Table.Tr>
    <Table.Tr>
      <Table.Td>Germany</Table.Td>
      <Table.Td textAlign="right">
        <Table.OnRowHover>
          <Button color="danger" size="sm">Delete</Button>
        </Table.OnRowHover>
      </Table.Td>
    </Table.Tr>
  </Table.Body>
</Table>
					`}
			>
				<Table color="gray" border="table|head|row|column" striped hover="row">
					<Table.Head>
						<Table.Tr>
							<Table.Th>country</Table.Th>
							<Table.Th width={180} textAlign="right">
								action
							</Table.Th>
						</Table.Tr>
					</Table.Head>
					<Table.Body>
						<Table.Tr>
							<Table.Td>Australia</Table.Td>
							<Table.Td textAlign="right">
								<Table.OnRowHover>
									<Button color="danger" size="sm">
										Delete
									</Button>
								</Table.OnRowHover>
							</Table.Td>
						</Table.Tr>
						<Table.Tr>
							<Table.Td>Croatia</Table.Td>
							<Table.Td textAlign="right">
								<Table.OnRowHover>
									<Button color="danger" size="sm">
										Delete
									</Button>
								</Table.OnRowHover>
							</Table.Td>
						</Table.Tr>
						<Table.Tr>
							<Table.Td>Germany</Table.Td>
							<Table.Td textAlign="right">
								<Table.OnRowHover>
									<Button color="danger" size="sm">
										Delete
									</Button>
								</Table.OnRowHover>
							</Table.Td>
						</Table.Tr>
					</Table.Body>
				</Table>
			</Code>
		</>
	);
}
