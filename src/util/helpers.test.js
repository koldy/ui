import {omit} from './helpers';

// TODO: Write more tests

describe('Testing omit()', () => {
	it(`Simple omit`, () => {
		const a = {
			one: 1,
			two: 2
		};

		expect(Object.keys(omit(a, ['one'])).length).toBe(1);
	});
});
