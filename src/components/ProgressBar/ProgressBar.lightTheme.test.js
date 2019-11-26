import React from 'react';
import {shallow} from 'enzyme';

import ProgressBar from './ProgressBar';
import TestApp from '../../../test/TestApp';
import lightTheme from '../../../themes/koldy-ui-light-theme/src';

describe('ProgressBar test in light theme', () => {
	Object.keys(lightTheme.progressBar.color).forEach((color) => {
		it(`ProgressMap ${color} color`, () => {
			shallow(
				<TestApp>
					<ProgressBar value={40} max={30} width={800} color={color} />
				</TestApp>
			);
		});
	});

	Object.keys(lightTheme.progressBar.size).forEach((size) => {
		it(`ProgressMap ${size} size`, () => {
			shallow(
				<TestApp>
					<ProgressBar value={40} max={30} width={800} size={size} />
				</TestApp>
			);
		});
	});

	Object.keys(lightTheme.progressBar.variant).forEach((variant) => {
		it(`ProgressMap ${variant} variant`, () => {
			shallow(
				<TestApp>
					<ProgressBar value={40} max={30} width={800} variant={variant} />
				</TestApp>
			);
		});
	});

	Object.keys(lightTheme.progressBar.variant).forEach((variant) => {
		Object.keys(lightTheme.progressBar.size).forEach((size) => {
			it(`ProgressMap size=${size} variant=${variant}`, () => {
				shallow(
					<TestApp>
						<ProgressBar value={40} max={30} width={800} size={size} variant={variant} />
					</TestApp>
				);
			});
		});
	});
});
