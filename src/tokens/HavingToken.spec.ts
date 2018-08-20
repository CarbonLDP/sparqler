import { HavingToken } from "./HavingToken";


describe( "HavingToken", ():void => {

	it( "should exists", ():void => {
		expect( HavingToken ).toBeDefined();
		expect( HavingToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "HavingToken.constructor", ():void => {

		it( "should be instantiable", ():void => {
			const token:HavingToken = new HavingToken( "" );

			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( HavingToken ) );
		} );

		it( "should assign the provided condition", ():void => {
			const token:HavingToken = new HavingToken( "the condition" );
			expect( token.rawCondition ).toBe( "the condition" );
		} );

		it( "should assign `having` as token name", ():void => {
			expect( new HavingToken( "" ).token ).toBe( "having" );
		} );

	} );

	describe( "HavingToken.toString", ():void => {

		it( "should exists", ():void => {
			expect( HavingToken.prototype.toString ).toBeDefined();
			expect( HavingToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );

		it( "should print the SPARQL filter statement", ():void => {
			const token:HavingToken = new HavingToken( "BOUND( ?var )" );
			expect( token.toString() ).toBe( "HAVING BOUND( ?var )" );
		} );

	} );

} );
