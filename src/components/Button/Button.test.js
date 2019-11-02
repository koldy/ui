import React from 'react';
import {shallow, mount} from 'enzyme';

import Button from './Button';
import TestApp from '../../../test/TestApp';
import ThemeError from '../../theme/ThemeError';
import {testClick, testDoubleClick, testMargins} from '../../../test/test-helpers';

describe('Button standard usage', () => {
	it('Renders without crashing', () => {
		shallow(
			<TestApp>
				<Button>Click me</Button>
			</TestApp>
		);
	});

	it('Renders with a lot of props', () => {
		shallow(
			<TestApp>
				<Button type="reset" name="btn" disabled color="secondary" width="lg">
					Click me
				</Button>
			</TestApp>
		);
	});

	it('Gives error on wrong color', () => {
		expect(() => {
			mount(
				<TestApp>
					<Button color="primary-invalid">Ok!</Button>
				</TestApp>
			).html();
		}).toThrow(ThemeError);
	});

	testMargins('Button', Button);
	testClick('Button', Button);
	testDoubleClick('Button', Button);
});
