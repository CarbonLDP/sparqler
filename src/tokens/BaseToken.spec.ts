import * as Module from "./BaseToken";
import { BaseToken } from "./BaseToken";

import { IRIToken } from "./IRIToken";

describe( "Module BaseToken", ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	describe( "BaseToken", ():void => {

		it( "should exists", ():void => {
			expect( BaseToken ).toBeDefined();
			expect( BaseToken ).toEqual( jasmine.any( Function ) );
		} );

		describe( "BaseToken.constructor", ():void => {

			it( "should be instantiable", ():void => {
				const iri:IRIToken = new IRIToken( "http://example.com/" );
				const token:BaseToken = new BaseToken( iri );

				expect( token ).toBeDefined();
			} );

			it( "should store the provided iri", ():void => {
				const iri:IRIToken = new IRIToken( "http://example.com/" );
				const token:BaseToken = new BaseToken( iri );

				expect( token.iri ).toBe( iri );
			} );

			it( "should assign the `base` as token name", ():void => {
				expect( new BaseToken( new IRIToken( "http://example.com/" ) ).token ).toBe( "base" );
				expect( new BaseToken( new IRIToken( "http://example.com/resource/" ) ).token ).toBe( "base" );
			} );

		} );

		describe( "BaseToken.toString", ():void => {

			it( "should override toString method", ():void => {
				const token:BaseToken = new BaseToken( new IRIToken( "http://example.com/" ) );

				expect( token.toString ).toBeDefined();
				expect( token.toString ).not.toBe( Object.prototype.toString );
			} );

			it( "should return SPARQL BASE prologue", ():void => {
				const iri:IRIToken = new IRIToken( "http://example.com/" );
				expect( new BaseToken( iri ).toString() ).toBe( `BASE <http://example.com/>` );
			} );

		} );

	} );

} );
