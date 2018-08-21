import { IRIRefToken } from "./IRIRefToken";
import { PathGroupToken } from "./PathGroupToken";


describe( "PathGroupToken", ():void => {

	it( "should exists", ():void => {
		expect( PathGroupToken ).toBeDefined();
		expect( PathGroupToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "PathGroupToken.constructor", ():void => {

		it( "should be instantiable", ():void => {
			const token:PathGroupToken = new PathGroupToken( new IRIRefToken( "prop" ) );
			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( PathGroupToken ) );
		} );

		it( "should assign path", ():void => {
			const token:PathGroupToken = new PathGroupToken( new IRIRefToken( "prop" ) );
			expect( token.path ).toEqual( new IRIRefToken( "prop" ) );
		} );

		it( "should assign `pathGroup` as token name", ():void => {
			const token:PathGroupToken = new PathGroupToken( new IRIRefToken( "prop" ) );
			expect( token.token ).toBe( "pathGroup" );
		} );

	} );

	describe( "PathGroupToken.toString", ():void => {

		it( "should exists", ():void => {
			expect( PathGroupToken.prototype.toString ).toBeDefined();
			expect( PathGroupToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return SPARQL for the path", ():void => {
			const token:PathGroupToken = new PathGroupToken( new IRIRefToken( "prop" ) );
			expect( token.toString() ).toBe( "(<prop>)" );
		} );

	} );

} );
