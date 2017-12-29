// Custom handler for Map as Jasmine does not support it yet: jasmine/jasmine/pull/1340
const MapMatcher = {
	toEqual: ( util ) => {
		return {
			compare: function( actual, expected ) {
				return { pass: util.equals( actual, expected, [ compareMap ] ) };
			},
		};

		function compareMap( actual, expected ) {
			if( actual instanceof Map ) {
				let pass = actual.size === expected.size;
				if( pass ) {
					actual.forEach( ( v, k ) => {
						pass = pass && util.equals( v, expected.get( k ) );
					} );
				}
				return pass;
			} else {
				return undefined;
			}
		}
	},
};

beforeEach( () => {
	jasmine.addMatchers( MapMatcher );
} );
