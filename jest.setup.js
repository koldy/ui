jest.spyOn(global.console, 'log').mockImplementation(() => jest.fn());

const {error} = console;

console.error = (message, ...args) => {
	if (/(Invalid prop|Failed prop type)/gi.test(message)) {
		throw new Error(message);
	}

	error.apply(console, [message, ...args]);
};

window.matchMedia = jest.fn().mockImplementation(query => {
	return {
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(), // deprecated
		removeListener: jest.fn(), // deprecated
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	};
});
