import * as Module from "./VariableToken";
import { VariableToken } from "./VariableToken";

describe( "Module VariableToken", ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	describe( "VariableToken", ():void => {

		it( "should exists", ():void => {
			expect( VariableToken ).toBeDefined();
			expect( VariableToken ).toEqual( jasmine.any( Function ) );
		} );

		it( "should construct", ():void => {
			const token = new VariableToken( "x" );

			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( VariableToken ) );
		} );

		it( "should store the provided name", ():void => {
			expect( new VariableToken( "o" ).name ).toBe( "o" );
			expect( new VariableToken( "variable_1" ).name ).toBe( "variable_1" );
		} );

		it( "should assign the `variable` as token token", ():void => {
			expect( new VariableToken( "o" ).token ).toBe( "variable" );
			expect( new VariableToken( "variable_1" ).token ).toBe( "variable" );
		} );

		describe( "VariableToken.toString", ():void => {

			it( "should override toString method", ():void => {
				const token:VariableToken = new VariableToken( "o" );

				expect( token.toString ).toBeDefined();
				expect( token.toString ).not.toBe( Object.prototype.toString );
			} );

			it( "should return the name as string", ():void => {
				expect( new VariableToken( "o" ).toString() ).toBe( "?o" );
				expect( new VariableToken( "variable_1" ).toString() ).toBe( "?variable_1" );
			} );

		} );

	} );

} );
