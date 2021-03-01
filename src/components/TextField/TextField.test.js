import React from 'react';
import {mount} from 'enzyme';

import lightTheme from '../../../themes/koldy-ui-light-theme/src/koldy-ui-light-theme';

import TextField from './TextField';
import TestApp from '../../../test/TestApp';
import {testMargins} from '../../../test/test-helpers';

describe('TextField standard usage', () => {
	it('Renders empty without crashing', () => {
    mount(
			<TestApp>
				<TextField />
			</TestApp>
		);
	});

	it('Renders with name without crashing', () => {
    mount(
			<TestApp>
				<TextField name="textField-test" />
			</TestApp>
		);
	});

	Object.keys(lightTheme.inputField.size).forEach((val) =>
		it(`Renders with size=${val}`, () => {
      mount(
				<TestApp>
					<TextField size={val} />
				</TestApp>
			);
		})
	);

	Object.keys(lightTheme.inputField.variant).forEach((val) =>
		it(`Renders with variant=${val}`, () => {
      mount(
				<TestApp>
					<TextField variant={val} />
				</TestApp>
			);
		})
	);

	Object.keys(lightTheme.inputField.width).forEach((val) =>
		it(`Renders with width=${val}`, () => {
      mount(
				<TestApp>
					<TextField width={val} />
				</TestApp>
			);
		})
	);

	it(`Renders with minWidth and maxWidth`, () => {
    mount(
			<TestApp>
				<TextField minWidth={100} maxWidth={200} />
			</TestApp>
		);
	});

	testMargins('TextField', TextField);
});
