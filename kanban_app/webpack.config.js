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



const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build')
};


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
		app: PATHS.app
	},

	// Add resolve.extensions.
	// '' is needed to allow imports without an extension.
	// Note the .'s before extensions as it will fail to match without!!!
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	output: {
		path: PATHS.build,
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				// Test expects a RegExp! Note the slashes!
				test: /\.css$/,
				loaders: ['style', 'css'],
				// Include accepts either a path or an array of paths.
				include: PATHS.app
			},

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
	}
};

// Default configuration
if(TARGET === 'start' || !TARGET) {
	//module.exports = merge(common, {});
	module.exports = merge(common, {
		devtool: 'eval-source-map',
		devServer: {
			contentBase: PATHS.build,

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
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new NpmInstallPlugin({
				save: true // --save
			})
		]
	});
}

if(TARGET === 'build' || !TARGET) {
	module.exports = merge(common, {});
}