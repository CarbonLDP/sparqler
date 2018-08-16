import { BooleanToken } from "./BooleanToken";


describe( "BooleanToken", ():void => {

	it( "should exists", ():void => {
		expect( BooleanToken ).toBeDefined();
		expect( BooleanToken ).toEqual( jasmine.any( Function ) );
	} );

	it( "should construct", ():void => {
		const token = new BooleanToken( true );

		expect( token ).toBeDefined();
		expect( token ).toEqual( jasmine.any( BooleanToken ) );
	} );

	it( "should store the provided boolean", ():void => {
		expect( new BooleanToken( true ).value ).toBe( true );
		expect( new BooleanToken( false ).value ).toBe( false );
	} );

	it( "should assign the `boolean` as token name", ():void => {
		expect( new BooleanToken( true ).token ).toBe( "boolean" );
		expect( new BooleanToken( false ).token ).toBe( "boolean" );
	} );

	describe( "BooleanToken.toString", ():void => {

		it( "should override toString method", ():void => {
			const token:BooleanToken = new BooleanToken( true );

			expect( token.toString ).toBeDefined();
			expect( token.toString ).not.toBe( Object.prototype.toString );
		} );

		it( "should return the boolean as string", ():void => {
			expect( new BooleanToken( true ).toString() ).toBe( "true" );
			expect( new BooleanToken( false ).toString() ).toBe( "false" );
		} );

	} );

} );
