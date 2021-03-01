import React from 'react';
import {mount} from 'enzyme';

import Badge from './Badge';
import TestApp from '../../../test/TestApp';
import {testClick, testDoubleClick, testMargins} from '../../../test/test-helpers';

describe('Testing Badge', () => {
	it('Renders number', () => {
    mount(
			<TestApp>
				<Badge>1</Badge>
			</TestApp>
		);
	});

	it('Renders string', () => {
    mount(
			<TestApp>
				<Badge>Hey, I'm badge</Badge>
			</TestApp>
		);
	});

	it('Renders html', () => {
    mount(
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
