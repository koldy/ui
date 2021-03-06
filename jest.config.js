module.exports = {
	clearMocks: true,
	collectCoverageFrom: ['src/**/*.{js}'],
	coverageDirectory: 'coverage',
	moduleFileExtensions: ['js'],
	setupFiles: ['<rootDir>/enzyme.config.js'],
	testEnvironment: 'jsdom',
	testMatch: ['**/src/**/?(*.)+(spec|test).js?(x)'],
	testPathIgnorePatterns: ['\\\\node_modules\\\\'],
	testURL: 'http://localhost',
	transformIgnorePatterns: ['<rootDir>/node_modules/'],
	verbose: true,
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};
