import { IRIRefToken } from "./IRIRefToken";
import { PathNegatedToken } from "./PathNegatedToken";


describe( "PathNegatedToken", ():void => {

	it( "should exists", ():void => {
		expect( PathNegatedToken ).toBeDefined();
		expect( PathNegatedToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "PathNegatedToken.constructor", ():void => {

		it( "should be instantiable", ():void => {
			const token:PathNegatedToken = new PathNegatedToken( new IRIRefToken( "prop" ) );
			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( PathNegatedToken ) );
		} );

		it( "should assign path", ():void => {
			const token:PathNegatedToken = new PathNegatedToken( new IRIRefToken( "prop" ) );
			expect( token.path ).toEqual( new IRIRefToken( "prop" ) );
		} );

		it( "should assign `pathNegated` as token name", ():void => {
			const token:PathNegatedToken = new PathNegatedToken( new IRIRefToken( "prop" ) );
			expect( token.token ).toBe( "pathNegated" );
		} );

	} );

	describe( "PathNegatedToken.toString", ():void => {

		it( "should exists", ():void => {
			expect( PathNegatedToken.prototype.toString ).toBeDefined();
			expect( PathNegatedToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return SPARQL for the path", ():void => {
			const token:PathNegatedToken = new PathNegatedToken( new IRIRefToken( "prop" ) );
			expect( token.toString() ).toBe( "!<prop>" );
		} );

	} );

} );
