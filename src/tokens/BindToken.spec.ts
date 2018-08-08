import * as Module from "./BindToken";
import { BindToken } from "./BindToken";
import { VariableToken } from "./VariableToken";


describe( "Module BindToken", ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	describe( "BindToken", ():void => {

		it( "should exists", ():void => {
			expect( BindToken ).toBeDefined();
			expect( BindToken ).toEqual( jasmine.any( Function ) );
		} );

		describe( "BindToken.constructor", ():void => {

			it( "should be instantiable", ():void => {
				const token:BindToken = new BindToken( null, null );
				expect( token ).toBeDefined();
				expect( token ).toEqual( jasmine.any( BindToken ) );
			} );

			it( "should should assign the expression", ():void => {
				const token:BindToken = new BindToken( "expression", null );
				expect( token.expression ).toBe( "expression" );
			} );

			it( "should assign the variable", ():void => {
				const variable:VariableToken = new VariableToken( "name" );
				const token:BindToken = new BindToken( null, variable );
				expect( token.variable ).toBe( variable );
			} );

			it( "should assign `bind` as token name", ():void => {
				expect( new BindToken( null, null ).token ).toBe( "bind" );
				expect( new BindToken( "", null ).token ).toBe( "bind" );
				expect( new BindToken( null, new VariableToken( "var" ) ).token ).toBe( "bind" );
			} );

		} );

		describe( "BindToken.toString", ():void => {

			it( "should exists", ():void => {
				expect( BindToken.prototype.toString ).toBeDefined();
				expect( BindToken.prototype.toString ).toEqual( jasmine.any( Function ) );
			} );

			it( "should override Object.toString method", ():void => {
				const token:BindToken = new BindToken( null, null );
				expect( token.toString ).not.toBe( Object.prototype.toString );
			} );

			it( "should return the SPARQL BIND when string statement", ():void => {
				expect( new BindToken(
					"RAND()",
					new VariableToken( "var" ),
				).toString() ).toBe( "BIND(RAND() AS ?var)" );

				expect( new BindToken(
					"STR( ?number % 10 )",
					new VariableToken( "var" ),
				).toString() ).toBe( "BIND(STR( ?number % 10 ) AS ?var)" );
			} );

		} );

	} );

} );
