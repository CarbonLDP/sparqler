module.exports = {
	entry: {
		"umd": "./build/umd.js"
	},

	output: {
		filename: "./dist/bundles/sparqler.umd.js",
		library: "SPARQLER",
		libraryTarget: "umd"
	},

	resolve: {
		extensions: [".ts"]
	},

	module: {
		loaders: [
			{
				test: /\.ts$/,
				loader: "awesome-typescript-loader"
			}
		]
	}
};
