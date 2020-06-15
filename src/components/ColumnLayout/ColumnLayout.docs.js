import React from 'react';

import ColumnLayout from './ColumnLayout';
import AvailableKeys from '../../../docs/components/AvailableKeys';
import useMediaQueries from '../../hooks/useMediaQueries/useMediaQueries';
import Box from '../Box/Box';
import Code from '../../../docs/components/Code';
import Paragraph from '../../../docs/components/Paragraph';
import Props from '../../../docs/components/Props';
import H1 from '../../../docs/components/H1';

export const title = 'ColumnLayout';
export const route = '/column-layout';
export const json = null;

const ALIGNS = ['stretch', 'start', 'end', 'center'];

export default function ColumnLayoutDocs() {
	const {isMobile} = useMediaQueries();

	return (
		<>
			<H1 hash="box">ColumnLayout</H1>
			<Code language="js" code="import {ColumnLayout} from 'koldy-ui';" />
			<Code
				language="js"
				code={`
<ColumnLayout>
  <>
    First column
  </>
  <>
    Second column
  </>
  <>
    Third column
  </>
</ColumnLayout>
          `}
			>
				<ColumnLayout>
					<>First column</>
					<>Second column</>
					<>Third column</>
				</ColumnLayout>
			</Code>
			<Paragraph>
				<code>ColumnLayout</code> component creates columns by default. If you pass to component that is should break, then it'll readjust
				its layout to standard rows. You may tell the component what's the space between the column or row. Layout breaking is done entirely
				with CSS. Check the props for more examples.
			</Paragraph>
			<Props>
				<Props.Prop name="children" type="node">
					Pass any node or array of nodes as its children. Check the first example on this page.
				</Props.Prop>
				<Props.Prop name="breakOn" type="boolean" defaultValue="false">
					<Paragraph>This tells the component to break into rows. You are in control when to do it.</Paragraph>
					<Code
						language="js"
						code={`
const {isMobile} = useMediaQueries();

<ColumnLayout breakOn={isMobile}>
  <>
    First column
  </>
  <>
    Second column
  </>
  <>
    Third column
  </>
</ColumnLayout>
              `}
					>
						<ColumnLayout breakOn={isMobile}>
							<>First column</>
							<>Second column</>
							<>Third column</>
						</ColumnLayout>
					</Code>
				</Props.Prop>
				<Props.Prop name="space" type={['string', 'number']} defaultValue="0">
					<Paragraph>
						Tells the component what should be the space between columns or rows. This value can be number or string, but must be valid CSS
						value (pixels, ems, rems, and etc.). If it's number, then it's treated as pixels.
					</Paragraph>
					<Code
						language="js"
						code={`
<ColumnLayout space="1rem">
  <Box background="info">First column</Box>
  <Box background="success">Second column</Box>
  <Box background="warning">Third column</Box>
</ColumnLayout>
              `}
					>
						<ColumnLayout space="1rem">
							<Box background="info">First column</Box>
							<Box background="success">Second column</Box>
							<Box background="warning">Third column</Box>
						</ColumnLayout>
					</Code>
				</Props.Prop>
				<Props.Prop name="gridTemplateColumns" type="string">
					<Paragraph>
						This prop tells what's the width of every column. Since this component is made with CSS grid, values provided here should be in{' '}
						<code>fr</code> units. This prop has no effect when <code>breakOn</code> is true.
					</Paragraph>
					<Code
						language="js"
						code={`
<ColumnLayout gridTemplateColumns="3fr 1fr">
  <Box background="info">First column, 75% width</Box>
  <Box background="success">Second column, 25% width</Box>
</ColumnLayout>
              `}
					>
						<ColumnLayout gridTemplateColumns="3fr 1fr">
							<Box background="info">First column, 75% width</Box>
							<Box background="success">Second column, 25% width</Box>
						</ColumnLayout>
					</Code>
				</Props.Prop>
				<Props.Prop name="align" type="string">
					<Paragraph>
						This tells the component how it should align columns. By default, all columns are stretched. This prop has no effect when{' '}
						<code>breakOn</code> is true.
					</Paragraph>
					<AvailableKeys data={ALIGNS} />
				</Props.Prop>
				<Props.Prop name="m" />
				<Props.Prop name="mt" />
				<Props.Prop name="mr" />
				<Props.Prop name="mb" />
				<Props.Prop name="ml" />
				<Props.Prop name="ref" />
			</Props>
		</>
	);
}
