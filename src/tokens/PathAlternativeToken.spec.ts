import { IRIRefToken } from "./IRIRefToken";
import { PathAlternativeToken } from "./PathAlternativeToken";


describe( "PathAlternativeToken", ():void => {

	it( "should exists", ():void => {
		expect( PathAlternativeToken ).toBeDefined();
		expect( PathAlternativeToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "PathAlternativeToken.constructor", ():void => {

		it( "should be instantiable", ():void => {
			const token:PathAlternativeToken = new PathAlternativeToken();
			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( PathAlternativeToken ) );
		} );

		it( "should initialize paths", ():void => {
			const token:PathAlternativeToken = new PathAlternativeToken();
			expect( token.paths ).toEqual( [] );
		} );

		it( "should assign `pathAlternative` as token name", ():void => {
			const token:PathAlternativeToken = new PathAlternativeToken();
			expect( token.token ).toBe( "pathAlternative" );
		} );

	} );

	describe( "PathAlternativeToken.toString", ():void => {

		it( "should exists", ():void => {
			expect( PathAlternativeToken.prototype.toString ).toBeDefined();
			expect( PathAlternativeToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return empty SPARQL when no paths", ():void => {
			const token:PathAlternativeToken = new PathAlternativeToken();
			expect( token.toString() ).toBe( "" );
		} );

		it( "should return SPARQL when one path", ():void => {
			const token:PathAlternativeToken = new PathAlternativeToken();
			token.paths.push( new IRIRefToken( "prop" ) );
			expect( token.toString() ).toBe( "<prop>" );
		} );

		it( "should return SPARQL when multiple path", ():void => {
			const token:PathAlternativeToken = new PathAlternativeToken();
			token.paths.push( new IRIRefToken( "prop1" ) );
			token.paths.push( new IRIRefToken( "prop2" ) );

			expect( token.toString() ).toBe( "<prop1>|<prop2>" );
		} );

	} );

} );
