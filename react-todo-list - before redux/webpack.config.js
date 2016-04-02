var webpack = require('webpack');

module.exports = {

	//should only do in dev environment
	//what this does is when the browser shows an error in bundle.js
	//it instead will show the error from the corresponding file instead
	devtool: 'inline-source-map',

	//from what files, can be an array of files
	entry: [
		'webpack-hot-middleware/client',
		'./client/client.js'
	],

	//to output where
	output: {
		path: require("path").resolve("./dist"),	//to where
		filename: 'bundle.js', 						//to what file
		publicPath: '/' 
	},

	//webpack plugins
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),		//allows any changes to be replace hot modularly
		new webpack.NoErrorsPlugin()					//doesn't allow webpack to finish if there's an error
	],

	//where you define tasks you want webpack to do while it's bundling
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: { //same as setting up a .babelrc file
					presets: ['react', 'es2015', 'react-hmre']
				}
			}
		]
	}


}