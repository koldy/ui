import React from 'react';
import {shallow} from 'enzyme';

import lightTheme from 'koldy-ui-light-theme';

import TextArea from './TextArea';
import TestApp from '../../../test/TestApp';
import {testMargins} from '../../../test/test-helpers';

describe('TextArea standard usage', () => {
	it('Renders empty without crashing', () => {
		shallow(
			<TestApp>
				<TextArea />
			</TestApp>
		);
	});

	it('Renders with name without crashing', () => {
		shallow(
			<TestApp>
				<TextArea name="textArea-test" />
			</TestApp>
		);
	});

	Object.keys(lightTheme.inputField.size).forEach((val) =>
		it(`Renders with size=${val}`, () => {
			shallow(
				<TestApp>
					<TextArea size={val} />
				</TestApp>
			);
		})
	);

	Object.keys(lightTheme.inputField.variant).forEach((val) =>
		it(`Renders with variant=${val}`, () => {
			shallow(
				<TestApp>
					<TextArea variant={val} />
				</TestApp>
			);
		})
	);

	Object.keys(lightTheme.inputField.width).forEach((val) =>
		it(`Renders with width=${val}`, () => {
			shallow(
				<TestApp>
					<TextArea width={val} />
				</TestApp>
			);
		})
	);

	it(`Renders with minWidth and maxWidth`, () => {
		shallow(
			<TestApp>
				<TextArea minWidth={100} maxWidth={200} />
			</TestApp>
		);
	});

	it(`Renders with minHeight and maxHeight`, () => {
		shallow(
			<TestApp>
				<TextArea minHeight={100} maxHeight={200} />
			</TestApp>
		);
	});

	it(`Renders with width and height`, () => {
		shallow(
			<TestApp>
				<TextArea width="80%" height={300} />
			</TestApp>
		);
	});

	it(`Renders with rows`, () => {
		shallow(
			<TestApp>
				<TextArea rows={21} />
			</TestApp>
		);
	});

	it(`Renders with placeholder`, () => {
		shallow(
			<TestApp>
				<TextArea placeholder="Enter some text" />
			</TestApp>
		);
	});

	it(`Renders with disabled`, () => {
		shallow(
			<TestApp>
				<TextArea placeholder="Enter some text" disabled />
			</TestApp>
		);
	});

	testMargins('TextArea', TextArea);
});
