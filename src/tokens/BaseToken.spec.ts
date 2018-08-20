import { BaseToken } from "./BaseToken";
import { IRIRefToken } from "./IRIRefToken";


describe( "BaseToken", ():void => {

	it( "should exists", ():void => {
		expect( BaseToken ).toBeDefined();
		expect( BaseToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "BaseToken.constructor", ():void => {

		it( "should be instantiable", ():void => {
			const iri:IRIRefToken = new IRIRefToken( "http://example.com/" );
			const token:BaseToken = new BaseToken( iri );

			expect( token ).toBeDefined();
		} );

		it( "should store the provided iri", ():void => {
			const iri:IRIRefToken = new IRIRefToken( "http://example.com/" );
			const token:BaseToken = new BaseToken( iri );

			expect( token.iri ).toBe( iri );
		} );

		it( "should assign the `base` as token name", ():void => {
			expect( new BaseToken( new IRIRefToken( "http://example.com/" ) ).token ).toBe( "base" );
			expect( new BaseToken( new IRIRefToken( "http://example.com/resource/" ) ).token ).toBe( "base" );
		} );

	} );

	describe( "BaseToken.toString", ():void => {

		it( "should override toString method", ():void => {
			const token:BaseToken = new BaseToken( new IRIRefToken( "http://example.com/" ) );

			expect( token.toString ).toBeDefined();
			expect( token.toString ).not.toBe( Object.prototype.toString );
		} );

		it( "should return SPARQL BASE prologue", ():void => {
			const iri:IRIRefToken = new IRIRefToken( "http://example.com/" );
			expect( new BaseToken( iri ).toString() ).toBe( `BASE <http://example.com/>` );
		} );

	} );

} );
