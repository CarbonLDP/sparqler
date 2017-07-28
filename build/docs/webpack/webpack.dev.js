const path = require( 'path' );
const webpack = require( 'webpack' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

const BUILD_DIR = path.resolve( __dirname, '.' );
const SRC_DIR = path.resolve( __dirname, '../src/' );
const DIST_DIR = path.resolve( __dirname, '../../../docs/' );

const extractCSS = new ExtractTextPlugin( 'styles/styles.css' );

module.exports = {
	entry: {
		'bundle': path.resolve( SRC_DIR, 'entry-point.js' ),
	},

	output: {
		path: DIST_DIR,
		filename: 'scripts/bundle.js',
	},

	devtool: 'source-map',

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
							sourceMap: true,
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
				],
			},
		],
	},

	plugins: [
		extractCSS,
		new webpack.ProvidePlugin( {
			$: "jquery",
			jQuery: "jquery",
			hljs: "highlight.js/lib/highlight",
		} ),
	],
};
