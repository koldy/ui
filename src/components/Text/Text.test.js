import React from 'react';
import {shallow, mount} from 'enzyme';

import Text from './Text';
import TestApp from '../../../test/TestApp';
import {testClick, testDoubleClick, testMargins, testPaddings} from '../../../test/test-helpers';

describe('Menu standard usage', () => {
	it('Renders without crashing', () => {
		shallow(
			<TestApp>
				<Text>some content</Text>
			</TestApp>
		);
	});

	it('Renders with font props', () => {
		shallow(
			<TestApp>
				<Text fontFamily="Roboto, sans-serif" fontWeight={600} fontSize="2rem" lineHeight={1.5}>
					some content
				</Text>
			</TestApp>
		);
	});

	it('Gives error on wrong children type', () => {
		expect(() => {
			mount(
				<TestApp>
					<Text>{() => <span>I'm function in children, I shouldn't be here</span>}</Text>
				</TestApp>
			).html();
		}).toThrow(Error);
	});

	testMargins('Text', Text);
	testPaddings('Text', Text);
	testClick('Text', Text);
	testDoubleClick('Text', Text);
});
