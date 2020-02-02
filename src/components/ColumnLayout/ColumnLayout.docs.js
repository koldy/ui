import React from 'react';

import {Title, Props, ImportComponent} from '../../../docs/components';
import DocsSubTitle from '../../../docs/components/DocsSubTitle';
import DocsText from '../../../docs/components/DocsText';
import DocsCode from '../../../docs/components/DocsCode';
import ColumnLayout from './ColumnLayout';
import AvailableKeys from '../../../docs/components/AvailableKeys';
import useMediaQueries from '../MediaQuery/useMediaQueries';
import Box from '../Box/Box';

export const title = 'ColumnLayout';
export const slug = 'column-layout';
export const json = null;

const ALIGNS = ['stretch', 'start', 'end', 'center'];

export const Documentation = function() {
	const {isMobile} = useMediaQueries();

	return (
		<>
			<Title hash="box">ColumnLayout</Title>
			<ImportComponent name="ColumnLayout" />
			<DocsCode>
				<DocsCode.Example>
					<ColumnLayout>
						<>First column</>
						<>Second column</>
						<>Third column</>
					</ColumnLayout>
				</DocsCode.Example>
				<DocsCode.Code>
					{`
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
				</DocsCode.Code>
			</DocsCode>
			<DocsText>
				<code>ColumnLayout</code> component creates columns by default. If you pass to component that is should break, then it'll readjust
				its layout to standard rows. You may tell the component what's the space between the column or row. Layout breaking is done entirely
				with CSS. Check the props for more examples.
			</DocsText>
			<Props>
				<Props.Prop name="children" type="node">
					Pass any node or array of nodes as its children. Check the first example on this page.
				</Props.Prop>
				<Props.Prop name="breakOn" type="boolean" defaultValue="false">
					<p>This tells the component to break into rows. You are in control when to do it.</p>
					<DocsCode>
						<DocsCode.Example>
							<ColumnLayout breakOn={isMobile}>
								<>First column</>
								<>Second column</>
								<>Third column</>
							</ColumnLayout>
						</DocsCode.Example>
						<DocsCode.Code>
							{`
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
						</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="space" type={['string', 'number']} defaultValue="0">
					<p>
						Tells the component what should be the space between columns or rows. This value can be number or string, but must be valid CSS
						value (pixels, ems, rems, and etc.). If it's number, then it's treated as pixels.
					</p>
					<DocsCode>
						<DocsCode.Example>
							<ColumnLayout space="1rem">
								<Box background="info">First column</Box>
								<Box background="success">Second column</Box>
								<Box background="warning">Third column</Box>
							</ColumnLayout>
						</DocsCode.Example>
						<DocsCode.Code>
							{`
              <ColumnLayout space="1rem">
                <Box background="info">First column</Box>
                <Box background="success">Second column</Box>
                <Box background="warning">Third column</Box>
              </ColumnLayout>
              `}
						</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="gridTemplateColumns" type="string">
					<p>
						This prop tells what's the width of every column. Since this component is made with CSS grid, values provided here should be in{' '}
						<code>fr</code> units. This prop has no effect when <code>breakOn</code> is true.
					</p>
					<DocsCode>
						<DocsCode.Example>
							<ColumnLayout gridTemplateColumns="3fr 1fr">
                <Box background="info">First column, 75% width</Box>
                <Box background="success">Second column, 25% width</Box>
							</ColumnLayout>
						</DocsCode.Example>
						<DocsCode.Code>
							{`
              <ColumnLayout gridTemplateColumns="3fr 1fr">
                <Box background="info">First column, 75% width</Box>
                <Box background="success">Second column, 25% width</Box>
              </ColumnLayout>
              `}
						</DocsCode.Code>
					</DocsCode>
				</Props.Prop>
				<Props.Prop name="align" type="string">
					<p>
						This tells the component how it should align columns. By default, all columns are stretched. This prop has no effect when{' '}
						<code>breakOn</code> is true.
					</p>
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
};
