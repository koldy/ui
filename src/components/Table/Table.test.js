import React from 'react';
import {shallow} from 'enzyme';

import Table from './Table';
import TestApp from '../../../test/TestApp';
import {testMargins} from '../../../test/test-helpers';

describe('Testing Table', () => {
	testMargins('Table', Table);
});
