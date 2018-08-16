import { IRIToken } from "./IRIToken";
import { PrefixToken } from "./PrefixToken";


describe( "PrefixToken", ():void => {

	it( "should exists", ():void => {
		expect( PrefixToken ).toBeDefined();
		expect( PrefixToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "PrefixToken.constructor", ():void => {

		it( "should be instantiable", ():void => {
			const token:PrefixToken = new PrefixToken( "", new IRIToken( "" ) );
			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( PrefixToken ) );
		} );

		it( "should assign the provided namespace", ():void => {
			const token:PrefixToken = new PrefixToken( "namespace", new IRIToken( "" ) );
			expect( token.namespace ).toBe( "namespace" );
		} );

		it( "should assign the provided iri", ():void => {
			const iri:IRIToken = new IRIToken( "http://example.com/ns#" );
			const token:PrefixToken = new PrefixToken( "", iri );

			expect( token.iri ).toBe( iri );
		} );

		it( "should assign `prefix` as token name", ():void => {
			const token:PrefixToken = new PrefixToken( "", new IRIToken( "" ) );
			expect( token.token ).toBe( "prefix" );
		} );

	} );

	describe( "PrefixToken.toString", ():void => {

		it( "should exists", ():void => {
			expect( PrefixToken.prototype.toString ).toBeDefined();
			expect( PrefixToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return the SPARQL prefix statement", ():void => {
			const token:PrefixToken = new PrefixToken( "ex", new IRIToken( "http://example.com/ns#" ) );
			expect( token.toString() ).toBe( "PREFIX ex: <http://example.com/ns#>" );
		} );

	} );

} );
