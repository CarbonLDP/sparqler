import { IRIRefToken } from "./IRIRefToken";
import { PathModToken } from "./PathModToken";


describe( "PathModToken", ():void => {

	it( "should exists", ():void => {
		expect( PathModToken ).toBeDefined();
		expect( PathModToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "PathModToken.constructor", ():void => {

		it( "should be instantiable", ():void => {
			const token:PathModToken = new PathModToken( new IRIRefToken( "prop" ), "?" );
			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( PathModToken ) );
		} );

		it( "should assign path", ():void => {
			const token:PathModToken = new PathModToken( new IRIRefToken( "prop" ), "?" );
			expect( token.path ).toEqual( new IRIRefToken( "prop" ) );
		} );

		it( "should assign mod", ():void => {
			const token:PathModToken = new PathModToken( new IRIRefToken( "prop" ), "?" );
			expect( token.mod ).toEqual( "?" );
		} );

		it( "should assign `pathMod` as token name", ():void => {
			const token:PathModToken = new PathModToken( new IRIRefToken( "prop" ), "?" );
			expect( token.token ).toBe( "pathMod" );
		} );

	} );

	describe( "PathModToken.toString", ():void => {

		it( "should exists", ():void => {
			expect( PathModToken.prototype.toString ).toBeDefined();
			expect( PathModToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return SPARQL for the path and zeroOrOne mod", ():void => {
			const token:PathModToken = new PathModToken( new IRIRefToken( "prop" ), "?" );
			expect( token.toString() ).toBe( "<prop>?" );
		} );

		it( "should return SPARQL for the path and noneOrMore mod", ():void => {
			const token:PathModToken = new PathModToken( new IRIRefToken( "prop" ), "*" );
			expect( token.toString() ).toBe( "<prop>*" );
		} );

		it( "should return SPARQL for the path and oneOrMore mod", ():void => {
			const token:PathModToken = new PathModToken( new IRIRefToken( "prop" ), "+" );
			expect( token.toString() ).toBe( "<prop>+" );
		} );

	} );

} );
