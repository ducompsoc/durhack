const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	module: {
		rules: [
			{
				test: /\.scss$/i,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader',
				],
			},
			{
				test: /\.css$/i,
				use: [
					'style-loader',
					'css-loader',
				],
			},
			{
				test: /\.hbs$/,
				loader: 'handlebars-loader',
			}
		],
	},
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new HtmlWebpackPlugin({
			template: './src/volunteer.html',
			filename: 'volunteer.html',
		}),
		new HtmlWebpackPlugin({
			template: './src/404.html',
			filename: '404.html',
			chunks: '404',
		}),
		new HtmlWebpackPlugin({
			template: './src/nextgen.html',
			filename: 'nextgen.html'
		}),
		new CopyWebpackPlugin([
			{
				from: 'assets',
				to: 'assets',
			},
		]),
	],
};
