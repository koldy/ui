import React from 'react';
import {shallow, mount} from 'enzyme';

import Checkbox from './Checkbox';
import TestApp from '../../../test/TestApp';
import {testMargins} from '../../../test/test-helpers';

describe('Checkbox standard usage', () => {
	it('Renders without crashing', () => {
		shallow(
			<TestApp>
				<Checkbox />
			</TestApp>
		);
	});

	['sm', 'md', 'lg', 'xlg'].forEach((val) =>
		it(`Renders with size=${val}`, () => {
			shallow(
				<TestApp>
					<Checkbox size={val} />
				</TestApp>
			);
		})
	);

	['checkmark-square', 'checkmark-round', 'switch-square', 'switch-round'].forEach((val) =>
		it(`Renders with variant=${val}`, () => {
			shallow(
				<TestApp>
					<Checkbox variant={val} />
				</TestApp>
			);
		})
	);

	it('Gives wrong prop type on margin', () => {
		expect(() => {
			mount(
				<TestApp>
					<Checkbox mt={<span>something wrong</span>} />
				</TestApp>
			).html();
		}).toThrow(Error);
	});

	testMargins('Checkbox', Checkbox);
});
