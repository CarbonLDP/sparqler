import { IRIRefToken } from "./IRIRefToken";


describe( "IRIRefToken", ():void => {

	it( "should exists", ():void => {
		expect( IRIRefToken ).toBeDefined();
		expect( IRIRefToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "IRIRefToken.construct", () => {

		it( "should be instantiable", ():void => {
			const token = new IRIRefToken( "" );

			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( IRIRefToken ) );
		} );

		it( "should store the provided iri string", ():void => {
			expect( new IRIRefToken( "http://example.com" ).value ).toBe( "http://example.com" );
			expect( new IRIRefToken( "ftp://example.org" ).value ).toBe( "ftp://example.org" );
		} );

		it( "should assign the `iri` as token name", ():void => {
			expect( new IRIRefToken( "" ).token ).toBe( "iri" );
			expect( new IRIRefToken( "http://example.com" ).token ).toBe( "iri" );
		} );

	} );

	describe( "IRIRefToken.toString", ():void => {

		it( "should override toString method", ():void => {
			const token:IRIRefToken = new IRIRefToken( "" );

			expect( token.toString ).toBeDefined();
			expect( token.toString ).not.toBe( Object.prototype.toString );
		} );

		it( "should return the string as a SPARQL IRI", ():void => {
			const iriCreator = ( iri:string ) => {
				const token = new IRIRefToken( iri );
				return token.toString();
			};
			expect( iriCreator( "http://example.com" ) ).toBe( "<http://example.com>" );
			expect( iriCreator( "ftp://example.org" ) ).toBe( "<ftp://example.org>" );
		} );

	} );

} );
