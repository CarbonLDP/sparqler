import * as Utils from "./utils";

describe( "Module Utils", ():void => {

	it( "Exists", ():void => {
		expect( Utils ).toBeDefined();
		expect( Utils ).toEqual( jasmine.any( Object ) );
	} );

	describe( "isAbsolute", ():void => {

		it( "Exists", ():void => {
			expect( Utils.isAbsolute ).toBeDefined();
			expect( Utils.isAbsolute ).toEqual( jasmine.any( Function ) );
		} );

		it( "String with any protocol is absolute", ():void => {
			expect( Utils.isAbsolute( "http://example.com/" ) ).toBe( true );
			expect( Utils.isAbsolute( "http://example.com/part-of-the/iri" ) ).toBe( true );
			expect( Utils.isAbsolute( "https://example.com/" ) ).toBe( true );
			expect( Utils.isAbsolute( "ftp://example.com/" ) ).toBe( true );
			expect( Utils.isAbsolute( "any-protocol://example.com/" ) ).toBe( true );
		} );

		it( "Prefixed string is absolute", ():void => {
			expect( Utils.isAbsolute( "prefix:path" ) ).toBe( true );
			expect( Utils.isAbsolute( "another-prefix:path/part-of-the/path" ) ).toBe( true );
			expect( Utils.isAbsolute( "last-prefix:path/" ) ).toBe( true );
		} );

		it( "Relative string is not absolute", ():void => {
			expect( Utils.isAbsolute( "relative-iri" ) ).toBe( false );
			expect( Utils.isAbsolute( "/another-relative-iri" ) ).toBe( false );
			expect( Utils.isAbsolute( "relative-iri-2/" ) ).toBe( false );
			expect( Utils.isAbsolute( "/another-relative-iri-2/" ) ).toBe( false );
			expect( Utils.isAbsolute( "" ) ).toBe( false );
		} );

	} );

	describe( "hasProtocol", ():void => {

		it( "Exists", ():void => {
			expect( Utils.hasProtocol ).toBeDefined();
			expect( Utils.hasProtocol ).toEqual( jasmine.any( Function ) );
		} );

		it( "String with any type of protocol", ():void => {
			expect( Utils.hasProtocol( "http://example.com/" ) ).toBe( true );
			expect( Utils.hasProtocol( "http://example.com/part-of-the/iri" ) ).toBe( true );
			expect( Utils.hasProtocol( "https://example.com/" ) ).toBe( true );
			expect( Utils.hasProtocol( "ftp://example.com/" ) ).toBe( true );
			expect( Utils.hasProtocol( "any-protocol://example.com/" ) ).toBe( true );
		} );

		it( "Relative string has no protocol", ():void => {
			expect( Utils.hasProtocol( "relative-iri" ) ).toBe( false );
			expect( Utils.hasProtocol( "relative-iri/" ) ).toBe( false );
			expect( Utils.hasProtocol( "/another-relative-iri" ) ).toBe( false );
			expect( Utils.hasProtocol( "/another-relative-iri/" ) ).toBe( false );
			expect( Utils.hasProtocol( "" ) ).toBe( false );
		} );

		it( "Prefixed string has no protocol", ():void => {
			expect( Utils.hasProtocol( "prefix:path" ) ).toBe( false );
			expect( Utils.hasProtocol( "another-prefix:path/part-of-the/path" ) ).toBe( false );
			expect( Utils.hasProtocol( "last-prefix:path/" ) ).toBe( false );
		} );

	} );

	describe( "isRelative", ():void => {

		it( "Exists", ():void => {
			expect( Utils.isRelative ).toBeDefined();
			expect( Utils.isRelative ).toEqual( jasmine.any( Function ) );
		} );

		it( "Relative string", ():void => {
			expect( Utils.isRelative( "relative-iri" ) ).toBe( true );
			expect( Utils.isRelative( "relative-iri/" ) ).toBe( true );
			expect( Utils.isRelative( "/another-relative-iri" ) ).toBe( true );
			expect( Utils.isRelative( "/another-relative-iri/" ) ).toBe( true );
			expect( Utils.isRelative( "" ) ).toBe( true );
		} );

		it( "String with any protocol is not relative", ():void => {
			expect( Utils.isRelative( "http://example.com/" ) ).toBe( false );
			expect( Utils.isRelative( "http://example.com/part-of-the/iri" ) ).toBe( false );
			expect( Utils.isRelative( "https://example.com/" ) ).toBe( false );
			expect( Utils.isRelative( "ftp://example.com/" ) ).toBe( false );
			expect( Utils.isRelative( "any-protocol://example.com/" ) ).toBe( false );
		} );

		it( "Prefixed string is not relative", ():void => {
			expect( Utils.isRelative( "prefix:path" ) ).toBe( false );
			expect( Utils.isRelative( "another-prefix:path/part-of-the/path" ) ).toBe( false );
			expect( Utils.isRelative( "last-prefix:path/" ) ).toBe( false );
		} );

	} );

	describe( "isIRI", ():void => {

		it( "Exists", ():void => {
			expect( Utils.isIRI ).toBeDefined();
			expect( Utils.isIRI ).toEqual( jasmine.any( Function ) );
		} );

		it( "String with a protocol is an IRI", ():void => {
			expect( Utils.isIRI( "http://example.com/" ) ).toBe( true );
			expect( Utils.isIRI( "http://example.com/part-of-the/iri" ) ).toBe( true );
			expect( Utils.isIRI( "https://example.com/" ) ).toBe( true );
			expect( Utils.isIRI( "ftp://example.com/" ) ).toBe( true );
			expect( Utils.isIRI( "any-protocol://example.com/" ) ).toBe( true );
		} );

		it( "Relative string is an IRI", ():void => {
			expect( Utils.isIRI( "relative-iri" ) ).toBe( true );
			expect( Utils.isIRI( "relative-iri/" ) ).toBe( true );
			expect( Utils.isIRI( "/another-relative-iri" ) ).toBe( true );
			expect( Utils.isIRI( "/another-relative-iri/" ) ).toBe( true );
			expect( Utils.isIRI( "" ) ).toBe( true );
		} );

		it( "String with a prefix is NOT a strict SPARQL IRI", ():void => {
			expect( Utils.isIRI( "prefix:path" ) ).toBe( false );
			expect( Utils.isIRI( "another-prefix:path/part-of-the/path" ) ).toBe( false );
			expect( Utils.isIRI( "last-prefix:path/" ) ).toBe( false );
		} );

	} );

	describe( "isBNodeLabel", ():void => {

		it( "should exists", ():void => {
			expect( Utils.isBNodeLabel ).toBeDefined();
			expect( Utils.isBNodeLabel ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return true when the string starts with `_:`", ():void => {
			expect( Utils.isBNodeLabel( "_:label" ) ).toBe( true );
			expect( Utils.isBNodeLabel( "_:another-label" ) ).toBe( true );
			expect( Utils.isBNodeLabel( "_:1234" ) ).toBe( true );
			expect( Utils.isBNodeLabel( "_:_" ) ).toBe( true );
			expect( Utils.isBNodeLabel( "_:_-" ) ).toBe( true );
			expect( Utils.isBNodeLabel( "_:_-_" ) ).toBe( true );
			expect( Utils.isBNodeLabel( "_:_-a1_" ) ).toBe( true );
			expect( Utils.isBNodeLabel( "_:@#%" ) ).toBe( true );
		} );

	} );

	describe( "isPrefixed", ():void => {

		it( "Exists", ():void => {
			expect( Utils.isPrefixed ).toBeDefined();
			expect( Utils.isPrefixed ).toEqual( jasmine.any( Function ) );
		} );

		it( "Absolute is not prefixed", ():void => {
			expect( Utils.isPrefixed( "http://example.com/" ) ).toBe( false );
			expect( Utils.isPrefixed( "http://example.com/part-of-the/iri" ) ).toBe( false );
			expect( Utils.isPrefixed( "https://example.com/" ) ).toBe( false );
			expect( Utils.isPrefixed( "ftp://example.com/" ) ).toBe( false );
			expect( Utils.isPrefixed( "any-protocol://example.com/" ) ).toBe( false );
		} );

		it( "Relative is not prefixed", ():void => {
			expect( Utils.isPrefixed( "relative-iri" ) ).toBe( false );
			expect( Utils.isPrefixed( "relative-iri/" ) ).toBe( false );
			expect( Utils.isPrefixed( "/another-relative-iri" ) ).toBe( false );
			expect( Utils.isPrefixed( "/another-relative-iri/" ) ).toBe( false );
			expect( Utils.isPrefixed( "" ) ).toBe( false );
		} );

		it( "should return false when is a blank node label", ():void => {
			expect( Utils.isPrefixed( "_:label" ) ).toBe( false );
			expect( Utils.isPrefixed( "_:_" ) ).toBe( false );
			expect( Utils.isPrefixed( "_:" ) ).toBe( false );
		} );

		it( "A relative prefix is prefixed", ():void => {
			expect( Utils.isPrefixed( ":has-a-relative/prefix" ) ).toBe( true );
			expect( Utils.isPrefixed( ":path" ) ).toBe( true );
		} );

		it( "Any valid prefix is prefixed", ():void => {
			expect( Utils.isPrefixed( "prefix:path" ) ).toBe( true );
			expect( Utils.isPrefixed( "another-prefix:path/part-of-the/path" ) ).toBe( true );
			expect( Utils.isPrefixed( "last-prefix:path/" ) ).toBe( true );
			expect( Utils.isPrefixed( "prefix:" ) ).toBe( true );
		} );

	} );

} );
