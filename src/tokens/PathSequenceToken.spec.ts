import { IRIRefToken } from "./IRIRefToken";
import { PathSequenceToken } from "./PathSequenceToken";


describe( "PathSequenceToken", ():void => {

	it( "should exists", ():void => {
		expect( PathSequenceToken ).toBeDefined();
		expect( PathSequenceToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "PathSequenceToken.constructor", ():void => {

		it( "should be instantiable", ():void => {
			const token:PathSequenceToken = new PathSequenceToken();
			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( PathSequenceToken ) );
		} );

		it( "should initialize paths", ():void => {
			const token:PathSequenceToken = new PathSequenceToken();
			expect( token.paths ).toEqual( [] );
		} );

		it( "should assign `pathSequence` as token name", ():void => {
			const token:PathSequenceToken = new PathSequenceToken();
			expect( token.token ).toBe( "pathSequence" );
		} );

	} );

	describe( "PathSequenceToken.toString", ():void => {

		it( "should exists", ():void => {
			expect( PathSequenceToken.prototype.toString ).toBeDefined();
			expect( PathSequenceToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return empty SPARQL when no paths", ():void => {
			const token:PathSequenceToken = new PathSequenceToken();
			expect( token.toString() ).toBe( "" );
		} );

		it( "should return SPARQL when one path", ():void => {
			const token:PathSequenceToken = new PathSequenceToken();
			token.paths.push( new IRIRefToken( "prop" ) );
			expect( token.toString() ).toBe( "<prop>" );
		} );

		it( "should return SPARQL when multiple path", ():void => {
			const token:PathSequenceToken = new PathSequenceToken();
			token.paths.push( new IRIRefToken( "prop1" ) );
			token.paths.push( new IRIRefToken( "prop2" ) );

			expect( token.toString() ).toBe( "<prop1>/<prop2>" );
		} );

	} );

} );

