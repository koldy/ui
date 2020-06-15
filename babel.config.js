module.exports = function(api) {
	api.cache.never();

	const presets = ['@babel/preset-env', '@babel/preset-react'];

	const plugins = [
		'react-hot-loader/babel',
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-proposal-object-rest-spread',
		'@babel/plugin-proposal-throw-expressions',
		[
			'babel-plugin-styled-components',
			{
				pure: true
			}
		]
	];

	const env = {
		cjs: {
			presets: ['@babel/preset-env', '@babel/preset-react']
		},
		esm: {
			presets: [
				[
					'@babel/preset-env',
					{
						useBuiltIns: 'usage', // "usage" | "entry" | false, defaults to false.
						corejs: 3,
						targets: {
							esmodules: true,
							ie: '11'
						}
					}
				]
			]
		}
	};

	return {
		presets,
		plugins,
		env
	};
};
