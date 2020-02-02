import React from 'react';
import {mount} from 'enzyme';

import TestApp from '../../../test/TestApp';
import ColumnLayout from './ColumnLayout';
import Box from '../Box/Box';
import {testMargins} from '../../../test/test-helpers';

describe('ColumnLayout standard usage', () => {
	it('Has two children', () => {
		const wrapper = mount(
			<TestApp>
				<ColumnLayout>
					<Box>Text1</Box>
					<Box>Text2</Box>
				</ColumnLayout>
			</TestApp>
		);

		expect(wrapper.find(ColumnLayout).find(Box)).toHaveLength(2);
	});

	testMargins('ColumnLayout', ColumnLayout);
});
