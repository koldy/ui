const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const CONTENT_BASE = path.join(__dirname, './');
const {version} = require('./package.json');

module.exports = function () {
	return {
		mode: 'production',
		target: 'web',
		devtool: 'inline-cheap-source-map',

		entry: {
			docs: path.join(CONTENT_BASE, 'docs', 'docs.js')
		},

		output: {
			path: path.resolve(__dirname, 'dist/'),
			filename: `docs-${version}.js`
		},

		module: {
			rules: [
				{
					test: /\.js$/,
					use: ['babel-loader'],
					include: CONTENT_BASE,
					exclude: [path.resolve(__dirname, 'node_modules')]
				},
				{
					test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
					loader: 'file-loader?name=fonts/[hash].[ext]' // use [hash] to hide the font real name
				},
				{
					test: /\.(png|jpe?g|svg)$/,
					loader: 'url-loader?name=images/[hash].[ext]&limit=8192' // use [hash] to hide the font real name
				}
			]
		},

		plugins: [new CleanWebpackPlugin()]
	};
};
