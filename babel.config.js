module.exports = function(api) {
	api.cache(true);

	const presets = ['@babel/preset-env', '@babel/preset-react'];
	const plugins = [
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

	return {
		presets,
		plugins
	};
};
