jest.spyOn(global.console, 'log').mockImplementation(() => jest.fn());

const {error} = console;

console.error = (message, ...args) => {
	if (/(Invalid prop|Failed prop type)/gi.test(message)) {
		throw new Error(message);
	}

	error.apply(console, [message, ...args]);
};
