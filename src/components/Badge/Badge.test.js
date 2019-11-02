import React from 'react';
import {shallow} from 'enzyme';

import Badge from './Badge';
import TestApp from '../../../test/TestApp';
import {testClick, testDoubleClick, testMargins} from '../../../test/test-helpers';

describe('Testing Badge', () => {
	it('Renders number', () => {
		shallow(
			<TestApp>
				<Badge>1</Badge>
			</TestApp>
		);
	});

	it('Renders string', () => {
		shallow(
			<TestApp>
				<Badge>Hey, I'm badge</Badge>
			</TestApp>
		);
	});

	it('Renders html', () => {
		shallow(
			<TestApp>
				<Badge>
					Hey,
					<br />
					I'm badge
				</Badge>
			</TestApp>
		);
	});

	testMargins('Badge', Badge);
	testClick('Badge', Badge);
	testDoubleClick('Badge', Badge);
});
