const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

/*
In order to avoid some typing, we can set up a Webpack plugin known as 
npm-install-webpack-plugin. As we develop the project, it will detect 
changes made to Webpack configuration and the projects files and install 
the dependencies for us. It will modify package.json automatically as 
well.

You can still install dependencies manually if you want. Any 
dependencies within app should be installed through --save (or -S). Root 
level dependencies (i.e. packages needed by Webpack), should be installed 
through --save-dev (or -D). This separation will become handy when we 
generate production bundles at Building Kanban.
*/
const NpmInstallPlugin = require('npm-install-webpack-plugin');


// Load *package.json* so we can use `dependencies` from there
const pkg = require('./package.json');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build'),
	style: path.join(__dirname, 'app/main.css')
};

// Generating index.html through html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Cleaning the Build
/*
Our current setup doesn't clean the build directory between builds. As this 
can get annoying if we change our setup, we can use a plugin to clean the 
directory for us. Install the plugin and change the build configuration as 
follows to integrate it:
*/
const CleanPlugin = require('clean-webpack-plugin');

/*
Separating CSS
Even though we have a nice build set up now, where did all the CSS go? As per our 
configuration, it has been inlined to JavaScript! Even though this can be 
convenient during development, it doesn't sound ideal. The current solution 
doesn't allow us to cache CSS. In some cases we might suffer from a flash of 
unstyled content (FOUC).

It just so happens that Webpack provides a means to generate a separate CSS bundle. 
We can achieve this using the ExtractTextPlugin. It comes with overhead during the 
compilation phase, and it won't work with Hot Module Replacement (HMR) by design. 
Given we are using it only for production, that won't be a problem.
*/
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/*
We also need to make Babel aware of HMR. First, we should pass the target 
environment to Babel through our Webpack configuration. This allows us to 
control environment specific functionality through .babelrc. In this case we 
want to enable HMR just for development. If you wanted to enable some specific 
plugins for a production build, you would use the same idea.

An easy way to control .babelrc is to set BABEL_ENV environment variable as 
npm lifecycle event. This gives us a predictable mapping between package.json 
and .babelrc:

In addition we need to expand our Babel configuration to include the plugin we 
need during development. This is where that BABEL_ENV comes in. Babel determines 
the value of env like this:

Use the value of BABEL_ENV if set.
Use the value of NODE_ENV if set.
Default to development.
To connect BABEL_ENV='start' with Babel, configure as follows (in .babelrc):
"env": {
    "start": {
      "presets": [
        "react-hmre"
      ]
    }
  }
*/
process.env.BABEL_ENV = TARGET;

const common = {
	// Entry accepts a path or an object of entries. We'll be using the 
	// latter form given it's convenient with more complex configurations.
	entry: {
		app: PATHS.app,
		style: PATHS.style
	},

	// Add resolve.extensions.
	// '' is needed to allow imports without an extension.
	// Note the .'s before extensions as it will fail to match without!!!
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	output: {
		path: PATHS.build,

		// Output using entry name
		//filename: 'bundle.js'
		filename: '[name].js'
	},
	module: {
		loaders: [
			/* Removed since we're now separating CSS using extract-text-webpack-plugin
				Movied to 'start'
			{
				// Test expects a RegExp! Note the slashes!
				test: /\.css$/,
				loaders: ['style', 'css'],
				// Include accepts either a path or an array of paths.
				include: PATHS.app
			},
			*/

			// Setup jsx. This accepts js too thanks to RegExp
			{
				test: /\.jsx?$/,
				// Enable caching for improved performance during development
				// It uses default OS directory by default. IF you need something
				// more custom, pass a path to it.  i.e., babel?cacheDirectory=<path>
				loaders: ['babel?cacheDirectory'],
				// Parse only app files! Without this it will go through entire project.
				// In addition to being slow, that will most likely result in an error
				include: PATHS.app
			}
		]
	},

	// Generating index.html through html-webpack-plugin
	plugins: [
		new HtmlWebpackPlugin({
			template: 'node_modules/html-webpack-template/index.ejs',
			title: 'Kanban app',
			appMountId: 'app',
			inject: false
		})
	]
};

// Default configuration
if(TARGET === 'start' || !TARGET) {
	//module.exports = merge(common, {});
	module.exports = merge(common, {
		devtool: 'eval-source-map',
		devServer: {
			// Removed because we are now using HtmlWebpackPlugin
			//contentBase: PATHS.build,

			// Enable history API fallback so HTML5 History API based
			// routing works. This is a good default that will come
			// in handy in more complicated setups.
			historyApiFallback: true,
			hot: true,
			inline: true,
			progress: true,

			// Display only errors to reduce the amount of output.
			stats: 'errors-only',

			// Parse host and port from env so this is easy to customize.
			//
			// If you use Vagrant or Cloud9, set
			// host: process.env.HOST || '0.0.0.0';
			//
			// 0.0.0.0 is available to all network devices unlike default
			// localhost
			host: process.env.HOST,
			port: process.env.PORT
		},

		module: {
			loaders: [
				// Define development specific CSS setup
				{
					test: /\.css$/,
					loaders: ['style', 'css'],
					include: PATHS.app
				}
			]
		},

		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new NpmInstallPlugin({
				save: true // --save
			})
		]
	});
}


/*
The easiest way to enable minification is to call webpack -p (-p as in production). 
Alternatively, we an use a plugin directly as this provides us more control. By 
default Uglify will output a lot of warnings and they don't provide value in this 
case, we'll be disabling them.
*/
if(TARGET === 'build' || TARGET === 'stats') {
	module.exports = merge(common, {

		// Define vendor entry point needed for splitting
		entry: {
			vendor: Object.keys(pkg.dependencies).filter(function(v) {
				// Exclude alt-utils as it won't work with this setup
        		// due to the way the package has been designed
        		// (no package.json main).
        		return v !== 'alt-utils';
			})
		},

		/*
		Adding Hashes to Filenames
		Webpack provides placeholders that can be used to access different 
		types of hashes and entry name as we saw before. The most useful 
		ones are:

		[name] - Returns entry name.
		[hash] - Returns build hash.
		[chunkhash] - Returns a chunk specific hash.
		Using these placeholders you could end up with filenames, such as:

		app.d587bbd6e38337f5accd.js
		vendor.dc746a5db4ed650296e1.js
		If the file contents are different, the hash will change as well, 
		thus invalidating the cache, or more accurately the browser will send 
		a new request for the new file. This means if only app bundle gets 
		updated, only that file needs to be requested again.
		*/
		output: {
			paths: PATHS.build,
			filename: '[name].[chunkhash].js',
			chunkFilename: '[chunkhash].js'
		},


		module: {
			loaders: [
				// Separating CSS for build
				// Extract CSS during build
				{
					test: /\.css$/,
					loader: ExtractTextPlugin.extract('style', 'css'),
					include: PATHS.app	
				}
			]
		},

		plugins: [

			// clean build folder
			new CleanPlugin([PATHS.build], {
				verbose: false // Don't write logs to console
			}),

			// Output extracted CSS to a file
			new ExtractTextPlugin('[name].[chunkhash].css'),

			// Extract vendor and manifest files
			new webpack.optimize.CommonsChunkPlugin({
				names: ['vendor', 'manifest']
			}),

			// Setting DefinePlugin affects React library size!
      		// DefinePlugin replaces content "as is" so we need some extra quotes
      		// for the generated code to make sense
      		new webpack.DefinePlugin({
      			'process.env.NODE_ENV': '"production"'
      			// You can set this to JSON.stringify('development') for your
        		// development target to force NODE_ENV to development mode
        		// no matter what
      		}),

			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				}
			})
		]
	});
}