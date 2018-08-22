import { IRIRefToken } from "./IRIRefToken";
import { SubPathToken } from "./SubPathToken";


describe( "SubPathToken", ():void => {

	it( "should exists", ():void => {
		expect( SubPathToken ).toBeDefined();
		expect( SubPathToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "SubPathToken.constructor", ():void => {

		it( "should be instantiable", ():void => {
			const token:SubPathToken<IRIRefToken> = new SubPathToken( new IRIRefToken( "prop" ) );
			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( SubPathToken ) );
		} );

		it( "should assign path", ():void => {
			const token:SubPathToken<IRIRefToken> = new SubPathToken( new IRIRefToken( "prop" ) );
			expect( token.path ).toEqual( new IRIRefToken( "prop" ) );
		} );

		it( "should assign `subPath` as token name", ():void => {
			const token:SubPathToken<IRIRefToken> = new SubPathToken( new IRIRefToken( "prop" ) );
			expect( token.token ).toBe( "subPath" );
		} );

	} );

	describe( "SubPathToken.toString", ():void => {

		it( "should exists", ():void => {
			expect( SubPathToken.prototype.toString ).toBeDefined();
			expect( SubPathToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return SPARQL for the path", ():void => {
			const token:SubPathToken<IRIRefToken> = new SubPathToken( new IRIRefToken( "prop" ) );
			expect( token.toString() ).toBe( "(<prop>)" );
		} );

	} );

} );
