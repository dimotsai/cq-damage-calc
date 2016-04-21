var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: __dirname + '/src',
	entry: './app.jsx',
	output: {
		path: './dist',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel', // 'babel-loader' is also a legal name to reference
				query: {
					presets: ['react', 'es2015']
				}
			},
			{
				test: /\.css$/,
				loader: 'style!css?modules',
				include: /flexboxgrid/
			}
		]
	},
	plugins: [new HtmlWebpackPlugin({
		template: 'index.html'
	})]
};
