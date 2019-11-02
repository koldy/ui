import useZIndex from './useZIndex';
import ThemeManager from '../theme/ThemeManager';

describe('Testing ZIndex', () => {
	it('Works with primitive values', () => {
		const zIndex = useZIndex({
			theme: new ThemeManager({
				json: {
					zIndex: 5000
				}
			})
		});

		const example1 = zIndex.register('example1');
		expect(example1).toBe(5000);
		expect(example1).toBe(zIndex.register('example1'));

		const example2 = zIndex.register('example2');
		expect(example2).toBe(5010);

		zIndex.unregister('example1');
		expect(zIndex.register('example2')).toBe(5010);

		const example3 = zIndex.register('example3');
		expect(example3).toBe(5020);
		expect(zIndex.register('example3')).toBe(example3);
	});

	it('Works with HTMLElements', () => {
		const zIndex = useZIndex({
			theme: new ThemeManager({
				json: {
					zIndex: 5000
				}
			})
		});

		const e1 = document.createElement('div');
		const e2 = document.createElement('nav');
		const e3 = document.createElement('span');

		const example1 = zIndex.register(e1);
		expect(example1).toBe(5000);
		expect(example1).toBe(zIndex.register(e1));

		const example2 = zIndex.register(e2);
		expect(example2).toBe(5010);

		zIndex.unregister(e1);
		expect(zIndex.register(e2)).toBe(5010);

		const example3 = zIndex.register(e3);
		expect(example3).toBe(5020);
		expect(zIndex.register(e3)).toBe(example3);
	});
});
