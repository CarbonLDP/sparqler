import * as XSD from "./XSD";

describe( "Module XSD", ():void => {

	it( "Exists", ():void => {
		expect( XSD ).toBeDefined();
		expect( XSD ).toEqual( jasmine.any( Object ) );
	} );

	it( "NAMESPACE", ():void => {
		expect( XSD.NAMESPACE ).toBeDefined();
		expect( XSD.NAMESPACE ).toEqual( jasmine.any( String ) );
		expect( XSD.NAMESPACE ).toBe( "http://www.w3.org/2001/XMLSchema#" );
	} );

	it( "dateTime", ():void => {
		expect( XSD.dateTime ).toBeDefined();
		expect( XSD.dateTime ).toEqual( jasmine.any( String ) );
		expect( XSD.dateTime ).toBe( "http://www.w3.org/2001/XMLSchema#dateTime" );
	} );

	it( "integer", ():void => {
		expect( XSD.integer ).toBeDefined();
		expect( XSD.integer ).toEqual( jasmine.any( String ) );
		expect( XSD.integer ).toBe( "http://www.w3.org/2001/XMLSchema#integer" );
	} );

	it( "float", ():void => {
		expect( XSD.float ).toBeDefined();
		expect( XSD.float ).toEqual( jasmine.any( String ) );
		expect( XSD.float ).toBe( "http://www.w3.org/2001/XMLSchema#float" );
	} );

	it( "boolean", ():void => {
		expect( XSD.boolean ).toBeDefined();
		expect( XSD.boolean ).toEqual( jasmine.any( String ) );
		expect( XSD.boolean ).toBe( "http://www.w3.org/2001/XMLSchema#boolean" );
	} );

	it( "string", ():void => {
		expect( XSD.string ).toBeDefined();
		expect( XSD.string ).toEqual( jasmine.any( String ) );
		expect( XSD.string ).toBe( "http://www.w3.org/2001/XMLSchema#string" );
	} );

} );
