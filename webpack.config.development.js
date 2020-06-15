const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const DEV_SERVER_PORT = 3001;
const CONTENT_BASE = path.join(__dirname, './');
const PUBLIC_PATH = `http://localhost:${DEV_SERVER_PORT}/`;

module.exports = function() {
	return {
		mode: 'development',
		target: 'web',
		devtool: 'inline-cheap-source-map',

		entry: {
			docs: path.join(CONTENT_BASE, 'docs', 'index.js')
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

		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				title: 'Hot Module Replacement'
			})
		],

		devServer: {
			host: '0.0.0.0',
			port: DEV_SERVER_PORT,
			historyApiFallback: true,
			inline: true,
			hot: true,
			contentBase: CONTENT_BASE,
			publicPath: PUBLIC_PATH,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
				'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
			},
			stats: {
				assets: true,
				children: false,
				chunks: false,
				hash: false,
				modules: false,
				publicPath: false,
				timings: true,
				version: false,
				warnings: true,
				colors: {
					green: '\u001b[32m'
				}
			}
		}
	};
};
