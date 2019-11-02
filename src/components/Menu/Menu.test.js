import React from 'react';
import {shallow, mount} from 'enzyme';

import Menu from './Menu';
import TestApp from '../../../test/TestApp';
import {testClick, testDoubleClick, testMargins, testPaddings} from '../../../test/test-helpers';

describe('Menu standard usage', () => {
	it('Renders without crashing', () => {
		shallow(
			<TestApp>
				<Menu>some content</Menu>
			</TestApp>
		);
	});

	it('Renders with one Menu.Item', () => {
		shallow(
			<TestApp>
				<Menu>
					<Menu.Item>First</Menu.Item>
				</Menu>
			</TestApp>
		);
	});

	it('Gives error on wrong children type', () => {
		expect(() => {
			mount(
				<TestApp>
					<Menu>{() => <span>I'm function in children, I shouldn't be here</span>}</Menu>
				</TestApp>
			).html();
		}).toThrow(Error);
	});

	testMargins('Menu', Menu);
});
