const path = require( 'path' );
const webpack = require( 'webpack' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

const BUILD_DIR = path.resolve( __dirname, '.' );
const SRC_DIR = path.resolve( __dirname, '../src/' );
const DIST_DIR = path.resolve( __dirname, '../../../docs/' );

const extractCSS = new ExtractTextPlugin( 'styles/styles.min.css' );

module.exports = {
	entry: {
		'bundle': path.resolve( BUILD_DIR, 'index.js' ),
	},

	output: {
		path: DIST_DIR,
		filename: 'scripts/bundle.min.js',
	},

	module: {
		loaders: [
			{
				test: /\.css$/,
				use: extractCSS.extract( {
					fallback: 'style-loader',
					use: {
						loader: 'css-loader',
						options: {
							import: false,
							minimize: true,
							discardComments: { removeAll: true },
						},
					},
				} ),
			},
			{
				test: /fonts\/.*\.(woff|svg|eot|ttf|woff2)$/,
				loader: [
					{
						loader: 'url-loader',
						query: {
							limit: 1024,
							name: '/fonts/[name].[ext]',
						},
					},
					'image-webpack-loader',
				],
			},
		],
	},

	plugins: [
		extractCSS,
		new webpack.ProvidePlugin( {
			$: 'jquery',
			jQuery: 'jquery',
			hljs: 'highlight.js/lib/highlight',
		} ),
		new webpack.optimize.UglifyJsPlugin( {
			include: /\.js$/,
			output: {
				comments: false,
			},
		} ),
	],
};
