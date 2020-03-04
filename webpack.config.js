/**
 * Reference Links:
 * - https://hub.packtpub.com/building-better-bundles-why-processenvnodeenv-matters-optimized-builds/
 */

const path = require('path');
const fs = require('fs');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

function generateHtmlPlugins (templateDir) {
    // Read files in template directory
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
    return templateFiles.map(item => {
		// Split names and extension
		const parts = item.split('.')
		const name = parts[0]
		const extension = parts[1]
		// Create new HTMLWebpackPlugin with options
		return new HtmlWebpackPlugin({
			filename: `${name}.html`,
			template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
			inject: true
		})
    })
}
const htmlPlugins = generateHtmlPlugins('./src/views/pages')

module.exports = {
	mode: 'development',
    entry: './src/scripts/main.js',
    output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'main.[contenthash].js',
		publicPath: ''
	},
	module: {
		rules: [
			{
				test: /\.(png|jpg)$/,
				use: [
					'file-loader',
				],
			},
			{
				test: /\.(css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				],
			},
			{
				test: /\.(scss)$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				],
			},
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/env'],
						plugins: []
					}
				}
			},
			{
				test: /\.(pug)$/,
				use: [
					'pug-loader'
				],
			}
		]
	},
	plugins: [
		new TerserPlugin(),
		new MiniCssExtractPlugin({
			filename: 'main.[contenthash].css',
		}),
		new CleanWebpackPlugin(),
		new FriendlyErrorsWebpackPlugin(),
		new CopyPlugin([
			{ from: 'src/images', to: 'images' }
		])
	].concat(htmlPlugins)
};