const path = require( "path" );

module.exports = {
	entry: {
		"umd": "./build/umd.ts"
	},

	output: {
		path: path.resolve( __dirname, "./dist/bundles/" ),
		filename: "sparqler.umd.js",
		library: "SPARQLER",
		libraryTarget: "umd"
	},

	resolve: {
		extensions: [ ".ts" ],
		alias: {
			"sparqler": path.resolve( __dirname, "./src" ),
		}
	},

	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: "awesome-typescript-loader",
				options: {
					reportFiles: [
						"**/*.!spec.ts",
					],
				},
			}
		]
	},

	mode: "none",
};
