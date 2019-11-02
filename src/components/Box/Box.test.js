import React from 'react';
import {shallow, mount} from 'enzyme';

import Box from './Box';
import TestApp from '../../../test/TestApp';
import {testClick, testDoubleClick, testMargins, testPaddings} from '../../../test/test-helpers';

describe('Box standard usage', () => {
	it('Renders without crashing', () => {
		shallow(
			<TestApp>
				<Box>Click me</Box>
			</TestApp>
		);
	});

	it('Renders with a lot of props', () => {
		shallow(
			<TestApp>
				<Box mt={0} mr={0} mb={1} ml={-1} p={2} background="gray" width={800} height={400}>
					Some content
				</Box>
			</TestApp>
		);
	});

	it('Renders with all size props', () => {
		shallow(
			<TestApp>
				<Box width={100} height={100} minWidth={50} maxWidth={200} minHeight={50} maxHeight={200}>
					Some content
				</Box>
			</TestApp>
		);
	});

	it('Renders with all position props', () => {
		shallow(
			<TestApp>
				<Box width={100} height={100} minWidth={50} maxWidth={200} minHeight={50} maxHeight={200}>
					Some content
				</Box>
			</TestApp>
		);
	});

	it('Gives wrong prop type on margin', () => {
		expect(() => {
			mount(
				<TestApp>
					<Box mt={<span>something wrong</span>}>Ok!</Box>
				</TestApp>
			).html();
		}).toThrow(Error);
	});

	testMargins('Box', Box);
	testPaddings('Box', Box);
	testClick('Box', Box);
	testDoubleClick('Box', Box);
});
