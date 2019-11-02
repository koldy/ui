import React from 'react';
import {shallow, mount} from 'enzyme';

import Overlay from './Overlay';
import TestApp from '../../../test/TestApp';

describe('Overlay standard usage', () => {
	it('Renders without crashing', () => {
		shallow(
			<TestApp>
				<Overlay onClose={() => {}}>{() => <div>some content</div>}</Overlay>
			</TestApp>
		);
	});

	it('onClose is working properly in standard usage', () => {
		const mockCallBack = jest.fn();
		const render = mount(
			<TestApp>
				<Overlay onClose={mockCallBack}>{() => <span>some content</span>}</Overlay>
			</TestApp>
		);
		render.find(Overlay).simulate('click');
		expect(mockCallBack.mock.calls.length).toEqual(1);
	});
});
