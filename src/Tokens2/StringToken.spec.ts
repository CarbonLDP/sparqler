import * as Module from "./StringToken";
import { StringToken } from "./StringToken";

describe( "Module StringToken", ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	describe( "StringToken", ():void => {

		it( "should exists", ():void => {
			expect( StringToken ).toBeDefined();
			expect( StringToken ).toEqual( jasmine.any( Function ) );
		} );

		it( "should construct", ():void => {
			const token = new StringToken( "" );

			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( StringToken ) );
		} );

		it( "should store the provided string", ():void => {
			expect( new StringToken( "" ).value ).toBe( "" );
			expect( new StringToken( "string" ).value ).toBe( "string" );
		} );

		it( "should assign the `string` as token name", ():void => {
			expect( new StringToken( "" ).token ).toBe( "string" );
			expect( new StringToken( "string" ).token ).toBe( "string" );
		} );

		describe( "StringToken.toString", ():void => {

			it( "should override toString method", ():void => {
				const token:StringToken = new StringToken( "" );

				expect( token.toString ).toBeDefined();
				expect( token.toString ).not.toBe( Object.prototype.toString );
			} );

			it( "should return the string as string", ():void => {
				expect( new StringToken( "" ).toString() ).toBe( `""` );
				expect( new StringToken( "string" ).toString() ).toBe( `"string"` );
				expect( new StringToken( "a bit larger string" ).toString() ).toBe( `"a bit larger string"` );
			} );

		} );

	} );

} );
