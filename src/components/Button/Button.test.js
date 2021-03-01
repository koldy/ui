import React from 'react';
import {mount} from 'enzyme';

import Button from './Button';
import TestApp from '../../../test/TestApp';
import ThemeError from '../../theme/ThemeError';
import {testClick, testDoubleClick, testMargins} from '../../../test/test-helpers';

describe('Button standard usage', () => {
	it('Renders without crashing', () => {
		mount(
			<TestApp>
				<Button>Click me</Button>
			</TestApp>
		);
	});

	it('Renders with a lot of props', () => {
    mount(
			<TestApp>
				<Button type="reset" name="btn" disabled color="primary" width="lg">
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
