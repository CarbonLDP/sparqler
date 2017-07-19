import * as SPARQLERModule from "./SPARQLER";
import SPARQLER from "./SPARQLER";

describe( "Module SPARQLER", () => {

	it( "Exists", ():void => {
		expect( SPARQLERModule ).toBeDefined();
	} );

	describe( "Class SPARQLER", ():void => {

		it( "Exists", ():void => {
			expect( SPARQLER ).toBeDefined();
			expect( SPARQLER ).toEqual( jasmine.any( Function ) );
			expect( SPARQLER ).toBe( SPARQLERModule.SPARQLER );
		} );

		it( "Constructor", ():void => {
			let sparqler:SPARQLER = new SPARQLER();
			expect( sparqler ).toBeDefined();
			expect( sparqler ).toEqual( jasmine.any( SPARQLER ) );
		} );

	} );

} );
