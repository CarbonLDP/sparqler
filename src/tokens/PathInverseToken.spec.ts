import { IRIRefToken } from "./IRIRefToken";
import { PathInverseToken } from "./PathInverseToken";


describe( "PathInverseToken", ():void => {

	it( "should exists", ():void => {
		expect( PathInverseToken ).toBeDefined();
		expect( PathInverseToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "PathInverseToken.constructor", ():void => {

		it( "should be instantiable", ():void => {
			const token:PathInverseToken = new PathInverseToken( new IRIRefToken( "prop" ) );
			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( PathInverseToken ) );
		} );

		it( "should assign path", ():void => {
			const token:PathInverseToken = new PathInverseToken( new IRIRefToken( "prop" ) );
			expect( token.path ).toEqual( new IRIRefToken( "prop" ) );
		} );

		it( "should assign `pathInverse` as token name", ():void => {
			const token:PathInverseToken = new PathInverseToken( new IRIRefToken( "prop" ) );
			expect( token.token ).toBe( "pathInverse" );
		} );

	} );

	describe( "PathInverseToken.toString", ():void => {

		it( "should exists", ():void => {
			expect( PathInverseToken.prototype.toString ).toBeDefined();
			expect( PathInverseToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return SPARQL for the path", ():void => {
			const token:PathInverseToken = new PathInverseToken( new IRIRefToken( "prop" ) );
			expect( token.toString() ).toBe( "^<prop>" );
		} );

	} );

} );
