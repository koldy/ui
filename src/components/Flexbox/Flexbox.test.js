import React from 'react';
import {shallow, mount} from 'enzyme';

import Flexbox from './Flexbox';
import TestApp from '../../../test/TestApp';
import {testMargins} from '../../../test/test-helpers';

describe('Flexbox standard usage', () => {
	it('Renders without crashing', () => {
		shallow(
			<TestApp>
				<Flexbox>
					<Flexbox.Item>Some content 1</Flexbox.Item>
					<Flexbox.Item>Some content 2</Flexbox.Item>
				</Flexbox>
			</TestApp>
		);
	});

	it('Gives error on wrong children type', () => {
		expect(() => {
			mount(
				<TestApp>
					<Flexbox>{() => <span>I'm function in children, I shouldn't be here</span>}</Flexbox>
				</TestApp>
			).html();
		}).toThrow(Error);
	});

	testMargins('Flexbox', Flexbox);
});
