import { IRIToken } from "./IRIToken";


describe( "IRIToken", ():void => {

	it( "should exists", ():void => {
		expect( IRIToken ).toBeDefined();
		expect( IRIToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "IRIToken.construct", () => {

		it( "should be instantiable", ():void => {
			const token = new IRIToken( "" );

			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( IRIToken ) );
		} );

		it( "should store the provided iri string", ():void => {
			expect( new IRIToken( "http://example.com" ).value ).toBe( "http://example.com" );
			expect( new IRIToken( "ftp://example.org" ).value ).toBe( "ftp://example.org" );
		} );

		it( "should assign the `iri` as token name", ():void => {
			expect( new IRIToken( "" ).token ).toBe( "iri" );
			expect( new IRIToken( "http://example.com" ).token ).toBe( "iri" );
		} );

	} );

	describe( "IRIToken.toString", ():void => {

		it( "should override toString method", ():void => {
			const token:IRIToken = new IRIToken( "" );

			expect( token.toString ).toBeDefined();
			expect( token.toString ).not.toBe( Object.prototype.toString );
		} );

		it( "should return the string as a SPARQL IRI", ():void => {
			const iriCreator = ( iri:string ) => {
				const token = new IRIToken( iri );
				return token.toString();
			};
			expect( iriCreator( "http://example.com" ) ).toBe( "<http://example.com>" );
			expect( iriCreator( "ftp://example.org" ) ).toBe( "<ftp://example.org>" );
		} );

	} );

} );
