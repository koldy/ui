import React from 'react';
import {mount} from 'enzyme';

import ProgressBar from './ProgressBar';
import TestApp from '../../../test/TestApp';
import {testMargins} from '../../../test/test-helpers';

describe('ProgressBar standard usage', () => {
	it('Renders without crashing', () => {
    mount(
			<TestApp>
				<ProgressBar />
			</TestApp>
		);
	});

	it('Renders with a lot of props', () => {
    mount(
			<TestApp>
				<ProgressBar value={40} max={30} mt={0} mr={0} mb={1} ml={-1} p={2} width={800} />
			</TestApp>
		);
	});

	it('Gives wrong prop type on margin', () => {
		expect(() => {
			mount(
				<TestApp>
					<ProgressBar mt={<span>something wrong</span>} />
				</TestApp>
			).html();
		}).toThrow(Error);
	});

	testMargins('ProgressBar', ProgressBar);
});
