import React from 'react';
import {shallow} from 'enzyme';

import lightTheme from '../../../themes/koldy-ui-light-theme/src/koldy-ui-light-theme';

import FileField from './FileField';
import TestApp from '../../../test/TestApp';
import {testMargins} from '../../../test/test-helpers';

describe('TextField standard usage', () => {
	it('Renders empty without crashing', () => {
		shallow(
			<TestApp>
				<FileField />
			</TestApp>
		);
	});

	it('Renders with name without crashing', () => {
		shallow(
			<TestApp>
				<FileField name="textField-test" />
			</TestApp>
		);
	});

	Object.keys(lightTheme.inputField.size).forEach((val) =>
		it(`Renders with size=${val}`, () => {
			shallow(
				<TestApp>
					<FileField size={val} />
				</TestApp>
			);
		})
	);

	Object.keys(lightTheme.inputField.variant).forEach((val) =>
		it(`Renders with variant=${val}`, () => {
			shallow(
				<TestApp>
					<FileField variant={val} />
				</TestApp>
			);
		})
	);

	Object.keys(lightTheme.inputField.width).forEach((val) =>
		it(`Renders with width=${val}`, () => {
			shallow(
				<TestApp>
					<FileField width={val} />
				</TestApp>
			);
		})
	);

	it(`Renders with minWidth and maxWidth`, () => {
		shallow(
			<TestApp>
				<FileField minWidth={100} maxWidth={200} />
			</TestApp>
		);
	});

	testMargins('TextField', FileField);
});
