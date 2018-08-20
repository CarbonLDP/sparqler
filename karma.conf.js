// Karma configuration
// Generated on Tue Jan 03 2017 13:24:01 GMT-0600 (CST)

module.exports = function( config ) {
	let configuration = {

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: "",


		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: [ "jasmine", "karma-typescript", "source-map-support" ],


		// list of files / patterns to load in the browser
		files: [
			{ pattern: "src/**/*.ts" },
			{ pattern: "test/**/*.ts" },
		],

		// list of files to exclude
		exclude: [],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			"**/*.ts": [ "karma-typescript" ]
		},


		// test results reporter to use
		// possible values: "dots", "progress"
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: [ "mocha" ],

		// reporter options
		mochaReporter: {
			ignoreSkipped: true,
		},


		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: [ "ChromeHeadless" ],

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true,

		// Concurrency level
		// how many browser should be started simultaneous
		concurrency: Infinity,

		karmaTypescriptConfig: {
			tsconfig: "./tsconfig.json",
			bundlerOptions: {
				addNodeGlobals: false,
				entrypoints: /\.spec\.ts$/,
			},
			compilerOptions: {
				strict: false,
				sourceMap: true,
			}
		}

	};

	if( process.env.TRAVIS ) configuration.browsers = [ "ChromeHeadless" ];

	config.set( configuration );

};
