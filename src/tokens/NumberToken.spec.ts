import { NumberToken } from "./NumberToken";


describe( "NumberToken", ():void => {

	it( "should exists", ():void => {
		expect( NumberToken ).toBeDefined();
		expect( NumberToken ).toEqual( jasmine.any( Function ) );
	} );

	it( "should construct", ():void => {
		const token = new NumberToken( 1 );

		expect( token ).toBeDefined();
		expect( token ).toEqual( jasmine.any( NumberToken ) );
	} );

	it( "should store the provided number", ():void => {
		expect( new NumberToken( 1 ).value ).toBe( 1 );
		expect( new NumberToken( 10.01 ).value ).toBe( 10.01 );
	} );

	it( "should assign the `number` as token name", ():void => {
		expect( new NumberToken( 1 ).token ).toBe( "number" );
		expect( new NumberToken( 10.01 ).token ).toBe( "number" );
	} );

	describe( "NumberToken.toString", ():void => {

		it( "should override toString method", ():void => {
			const token:NumberToken = new NumberToken( 1 );

			expect( token.toString ).toBeDefined();
			expect( token.toString ).not.toBe( Object.prototype.toString );
		} );

		it( "should return the number as string", ():void => {
			expect( new NumberToken( 1 ).toString() ).toBe( "1" );
			expect( new NumberToken( 10.01 ).toString() ).toBe( "10.01" );
		} );

	} );

} );
