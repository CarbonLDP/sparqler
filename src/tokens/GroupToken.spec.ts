import { GroupToken } from "./GroupToken";


describe( "GroupToken", ():void => {

	it( "should exists", ():void => {
		expect( GroupToken ).toBeDefined();
		expect( GroupToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "GroupToken.constructor", ():void => {

		it( "should be instantiable", ():void => {
			const token:GroupToken = new GroupToken( "" );

			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( GroupToken ) );
		} );

		it( "should assign the provided condition", ():void => {
			const token:GroupToken = new GroupToken( "the condition" );
			expect( token.rawCondition ).toBe( "the condition" );
		} );

		it( "should assign `group` as token name", ():void => {
			expect( new GroupToken( "" ).token ).toBe( "group" );
		} );

	} );

	describe( "GroupToken.toString", ():void => {

		it( "should exists", ():void => {
			expect( GroupToken.prototype.toString ).toBeDefined();
			expect( GroupToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );

		it( "should print the SPARQL filter statement", ():void => {
			const token:GroupToken = new GroupToken( "?var" );
			expect( token.toString() ).toBe( "GROUP BY ?var" );
		} );

	} );

} );
