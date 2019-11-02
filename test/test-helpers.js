import React from 'react';
import {shallow} from 'enzyme';

import TestApp from './TestApp';

export const testMargins = (componentName, Component) => {
	const keys = ['m', 'mt', 'mr', 'mb', 'ml'];

	for (const key of keys) {
		it(`Renders ${componentName} ${key}={10}`, () => {
			const props = {};
			props[key] = 10;

			shallow(
				<TestApp>
					<Component {...props}>some content</Component>
				</TestApp>
			);
		});

		it(`Renders ${componentName} ${key}="20px"`, () => {
			const props = {};
			props[key] = '20px';

			shallow(
				<TestApp>
					<Component {...props}>some content</Component>
				</TestApp>
			);
		});

		it(`Renders ${componentName} ${key}="3rem"`, () => {
			const props = {};
			props[key] = '3rem';

			shallow(
				<TestApp>
					<Component {...props}>some content</Component>
				</TestApp>
			);
		});
	}

	it(`Renders ${componentName} margin props all together without m`, () => {
		shallow(
			<TestApp>
				<Component mt={10} mr={9} mb={8} ml={7}>
					some content
				</Component>
			</TestApp>
		);
	});

	it(`Renders ${componentName} margin props all together with m`, () => {
		shallow(
			<TestApp>
				<Component m={5} mt={10} mr={9} mb={8} ml={7}>
					some content
				</Component>
			</TestApp>
		);
	});
};

export const testPaddings = (componentName, Component) => {
	const keys = ['p', 'pt', 'pr', 'pb', 'pl'];

	for (const key of keys) {
		it(`Renders ${componentName} ${key}={10}`, () => {
			const props = {};
			props[key] = 10;

			shallow(
				<TestApp>
					<Component {...props}>some content</Component>
				</TestApp>
			);
		});

		it(`Renders ${componentName} ${key}="20px"`, () => {
			const props = {};
			props[key] = '20px';

			shallow(
				<TestApp>
					<Component {...props}>some content</Component>
				</TestApp>
			);
		});

		it(`Renders ${componentName} ${key}="3rem"`, () => {
			const props = {};
			props[key] = '3rem';

			shallow(
				<TestApp>
					<Component {...props}>some content</Component>
				</TestApp>
			);
		});
	}

	it(`Renders ${componentName} padding props all together without p`, () => {
		shallow(
			<TestApp>
				<Component pt={10} pr={9} pb={8} pl={7}>
					some content
				</Component>
			</TestApp>
		);
	});

	it(`Renders ${componentName} padding props all together with p`, () => {
		shallow(
			<TestApp>
				<Component p={5} pt={10} pr={9} pb={8} pl={7}>
					some content
				</Component>
			</TestApp>
		);
	});
};

export const testClick = (componentName, Component, children = null) => {
	it(`${componentName} works with onClick`, () => {
		const mockCallBack = jest.fn();
		const render = shallow(
			<TestApp>
				<Component onClick={mockCallBack}>{children || 'Anything'}</Component>
			</TestApp>
		);
		render.find(Component).simulate('click');
		expect(mockCallBack.mock.calls.length).toEqual(1);
	});
};

export const testDoubleClick = (componentName, Component, children = null) => {
	it(`${componentName} works with onDoubleClick`, () => {
		const mockCallBack = jest.fn();
		const render = shallow(
			<TestApp>
				<Component onDoubleClick={mockCallBack}>{children || 'Anything'}</Component>
			</TestApp>
		);
		render.find(Component).simulate('doubleClick');
		expect(mockCallBack.mock.calls.length).toEqual(1);
	});
};
