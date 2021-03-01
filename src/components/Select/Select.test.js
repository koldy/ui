import React from 'react';
import {mount} from 'enzyme';

import lightTheme from '../../../themes/koldy-ui-light-theme/src/koldy-ui-light-theme';

import Select from './Select';
import TestApp from '../../../test/TestApp';
import {testMargins} from '../../../test/test-helpers';

describe('Select standard usage', () => {
	it('Renders empty without crashing', () => {
    mount(
			<TestApp>
				<Select />
			</TestApp>
		);
	});

	it('Renders with simple option(s) without crashing', () => {
    mount(
			<TestApp>
				<Select>
					<option>one</option>
					<option>two</option>
					<option>three</option>
				</Select>
			</TestApp>
		);
	});

	it('Renders with simple option(s) and complex without crashing', () => {
    mount(
			<TestApp>
				<Select>
					<Select.Text>Go</Select.Text>
					<Select.Input>
						<option>one</option>
						<option>two</option>
						<option>three</option>
					</Select.Input>
				</Select>
			</TestApp>
		);
	});

	it('Renders with name without crashing', () => {
    mount(
			<TestApp>
				<Select name="select-test" />
			</TestApp>
		);
	});

	it('Renders with optgroup option(s) without crashing', () => {
    mount(
			<TestApp>
				<Select>
					<optgroup label="First">
						<option>one</option>
						<option>two</option>
						<option>three</option>
					</optgroup>
					<optgroup label="Second">
						<option>four</option>
						<option>five</option>
					</optgroup>
				</Select>
			</TestApp>
		);
	});

	Object.keys(lightTheme.inputField.size).forEach((val) =>
		it(`Renders with size=${val}`, () => {
      mount(
				<TestApp>
					<Select size={val} />
				</TestApp>
			);
		})
	);

	Object.keys(lightTheme.inputField.variant).forEach((val) =>
		it(`Renders with variant=${val}`, () => {
      mount(
				<TestApp>
					<Select variant={val} />
				</TestApp>
			);
		})
	);

	Object.keys(lightTheme.inputField.width).forEach((val) =>
		it(`Renders with width=${val}`, () => {
      mount(
				<TestApp>
					<Select width={val} />
				</TestApp>
			);
		})
	);

	it(`Renders with minWidth and maxWidth`, () => {
    mount(
			<TestApp>
				<Select minWidth={100} maxWidth={200} />
			</TestApp>
		);
	});

	testMargins('Select', Select);
});
