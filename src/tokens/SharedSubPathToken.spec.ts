import { IRIRefToken } from "./IRIRefToken";
import { SharedSubPathToken } from "./SharedSubPathToken";


describe( "SharedSubPathToken", ():void => {

	it( "should exists", ():void => {
		expect( SharedSubPathToken ).toBeDefined();
		expect( SharedSubPathToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "SharedSubPathToken.constructor", ():void => {

		it( "should be instantiable", ():void => {
			const token:SharedSubPathToken<IRIRefToken> = new SharedSubPathToken( new IRIRefToken( "prop" ) );
			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( SharedSubPathToken ) );
		} );

		it( "should assign path", ():void => {
			const token:SharedSubPathToken<IRIRefToken> = new SharedSubPathToken( new IRIRefToken( "prop" ) );
			expect( token.path ).toEqual( new IRIRefToken( "prop" ) );
		} );

		it( "should assign `subPath` as token name", ():void => {
			const token:SharedSubPathToken<IRIRefToken> = new SharedSubPathToken( new IRIRefToken( "prop" ) );
			expect( token.token ).toBe( "subPath" );
		} );

	} );

	describe( "SharedSubPathToken.toString", ():void => {

		it( "should exists", ():void => {
			expect( SharedSubPathToken.prototype.toString ).toBeDefined();
			expect( SharedSubPathToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return SPARQL for the path", ():void => {
			const token:SharedSubPathToken<IRIRefToken> = new SharedSubPathToken( new IRIRefToken( "prop" ) );
			expect( token.toString() ).toBe( "(<prop>)" );
		} );

	} );

} );
