import React from 'react';
import {mount} from 'enzyme';

import lightTheme from '../../../themes/koldy-ui-light-theme/src/koldy-ui-light-theme';

import TimeField from './TimeField';
import TestApp from '../../../test/TestApp';
import {testMargins} from '../../../test/test-helpers';

describe('TimeField standard usage', () => {
	it('Renders empty without crashing', () => {
    mount(
			<TestApp>
				<TimeField />
			</TestApp>
		);
	});

	it('Renders with name without crashing', () => {
    mount(
			<TestApp>
				<TimeField name="timeField-test" />
			</TestApp>
		);
	});

	Object.keys(lightTheme.inputField.size).forEach((val) =>
		it(`Renders with size=${val}`, () => {
      mount(
				<TestApp>
					<TimeField size={val} />
				</TestApp>
			);
		})
	);

	Object.keys(lightTheme.inputField.variant).forEach((val) =>
		it(`Renders with variant=${val}`, () => {
      mount(
				<TestApp>
					<TimeField variant={val} />
				</TestApp>
			);
		})
	);

	Object.keys(lightTheme.inputField.width).forEach((val) =>
		it(`Renders with width=${val}`, () => {
      mount(
				<TestApp>
					<TimeField width={val} />
				</TestApp>
			);
		})
	);

	it(`Renders with minWidth and maxWidth`, () => {
    mount(
			<TestApp>
				<TimeField minWidth={100} maxWidth={200} />
			</TestApp>
		);
	});

	testMargins('TimeField', TimeField);
});
