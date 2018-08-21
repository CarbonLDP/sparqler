import { IRIRefToken } from "./IRIRefToken";
import { PathInGroupNegatedToken } from "./PathInGroupNegatedToken";


describe( "PathInGroupNegatedToken", ():void => {

	it( "should exists", ():void => {
		expect( PathInGroupNegatedToken ).toBeDefined();
		expect( PathInGroupNegatedToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "PathInGroupNegatedToken.constructor", ():void => {

		it( "should be instantiable", ():void => {
			const token:PathInGroupNegatedToken = new PathInGroupNegatedToken( new IRIRefToken( "prop" ) );
			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( PathInGroupNegatedToken ) );
		} );

		it( "should assign path", ():void => {
			const token:PathInGroupNegatedToken = new PathInGroupNegatedToken( new IRIRefToken( "prop" ) );
			expect( token.path ).toEqual( new IRIRefToken( "prop" ) );
		} );

		it( "should assign `pathGroup` as token name", ():void => {
			const token:PathInGroupNegatedToken = new PathInGroupNegatedToken( new IRIRefToken( "prop" ) );
			expect( token.token ).toBe( "pathGroup" );
		} );

	} );

	describe( "PathInGroupNegatedToken.toString", ():void => {

		it( "should exists", ():void => {
			expect( PathInGroupNegatedToken.prototype.toString ).toBeDefined();
			expect( PathInGroupNegatedToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return SPARQL for the path", ():void => {
			const token:PathInGroupNegatedToken = new PathInGroupNegatedToken( new IRIRefToken( "prop" ) );
			expect( token.toString() ).toBe( "(<prop>)" );
		} );

	} );

} );
