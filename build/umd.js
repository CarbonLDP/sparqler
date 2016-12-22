"use strict";
var SPARQLER_1 = require( "./../src/SPARQLER" );
(function( root, factory ) {
	if( typeof define === 'function' && define.amd ) {
		// AMD. Register as an anonymous module.
		define( [ 'b' ], factory );
	}
	else {
		// Browser globals
		root.amdWeb = factory( root.b );
	}
}( this, function( b ) {
	return SPARQLER_1.default;
} ));
