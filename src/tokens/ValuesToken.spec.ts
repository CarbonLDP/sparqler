import { IRIToken } from "sparqler/tokens/IRIToken";
import { LiteralToken } from "sparqler/tokens/LiteralToken";
import { PrefixedNameToken } from "sparqler/tokens/PrefixedNameToken";
import { VariableToken } from "sparqler/tokens/VariableToken";

import * as Module from "./ValuesToken";
import { ValuesToken } from "./ValuesToken";

describe( "Module ValuesToken", ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	describe( "ValuesToken", ():void => {

		it( "should exists", ():void => {
			expect( ValuesToken ).toBeDefined();
			expect( ValuesToken ).toEqual( jasmine.any( Function ) );
		} );

		describe( "ValuesToken.constructor", () => {

			it( "should initialize variables", ():void => {
				const token:ValuesToken = new ValuesToken();

				expect( token ).toBeDefined();
				expect( token.variables ).toEqual( [] );
			} );

			it( "should initialize values", ():void => {
				const token:ValuesToken = new ValuesToken();

				expect( token ).toBeDefined();
				expect( token.values ).toEqual( [] );
			} );

			it( "should assign the `values` as token name", ():void => {
				expect( new ValuesToken().token ).toBe( "values" );
				expect( new ValuesToken().token ).toBe( "values" );
			} );

		} );


		describe( "ValuesToken.addVariables", ():void => {

			it( "should exists", ():void => {
				expect( ValuesToken.prototype.addVariables ).toBeDefined();
				expect( ValuesToken.prototype.addVariables ).toEqual( jasmine.any( Function ) );
			} );

			it( "should add variable", ():void => {
				const valuesToken:ValuesToken = new ValuesToken();

				const variable:VariableToken = new VariableToken( "variable" );
				valuesToken.addVariables( variable );

				expect( valuesToken.variables ).toEqual( [ variable ] );
			} );

			it( "should add multiple variables", ():void => {
				const valuesToken:ValuesToken = new ValuesToken();

				const variable1:VariableToken = new VariableToken( "variable1" );
				const variable2:VariableToken = new VariableToken( "variable2" );
				valuesToken.addVariables( variable1, variable2 );

				expect( valuesToken.variables ).toEqual( [ variable1, variable2 ] );
			} );

			it( "should append variables", ():void => {
				const valuesToken:ValuesToken = new ValuesToken();

				const variable1:VariableToken = new VariableToken( "variable1" );
				const variable2:VariableToken = new VariableToken( "variable2" );

				valuesToken
					.addVariables( variable1 )
					.addVariables( variable2 )
				;

				expect( valuesToken.variables ).toEqual( [ variable1, variable2 ] );
			} );

			it( "should return itself", ():void => {
				const valuesToken:ValuesToken = new ValuesToken();
				const variable:VariableToken = new VariableToken( "variable" );

				const returned:ValuesToken = valuesToken.addVariables( variable );
				expect( returned ).toBe( valuesToken );
			} );

		} );

		describe( "ValuesToken.addValues", ():void => {

			it( "should exists", ():void => {
				expect( ValuesToken.prototype.addValues ).toBeDefined();
				expect( ValuesToken.prototype.addValues ).toEqual( jasmine.any( Function ) );
			} );

			it( "should add empty values", ():void => {
				const valuesToken:ValuesToken = new ValuesToken();

				valuesToken.addValues();

				expect( valuesToken.values ).toEqual( [ [] ] );
			} );

			it( "should add values", ():void => {
				const valuesToken:ValuesToken = new ValuesToken();

				const values:(IRIToken | PrefixedNameToken | LiteralToken | "UNDEF")[] = [
					new IRIToken( "http://example.com/" ),
					new PrefixedNameToken( "ex:resource" ),
					new LiteralToken( "literal" ),
					"UNDEF",
				];
				valuesToken.addValues( ...values );

				expect( valuesToken.values ).toEqual( [ [ ...values ] ] );
			} );

			it( "should append values", ():void => {
				const valuesToken:ValuesToken = new ValuesToken();

				const values1:(IRIToken | PrefixedNameToken | LiteralToken | "UNDEF")[] = [
					new IRIToken( "http://example.com/" ),
					new PrefixedNameToken( "ex:resource" ),
					new LiteralToken( "literal" ),
					"UNDEF",
				];

				const values2:(IRIToken | PrefixedNameToken | LiteralToken | "UNDEF")[] = [
					new IRIToken( "http://example.com/" ),
					new PrefixedNameToken( "ex:resource" ),
					new LiteralToken( "literal" ),
					"UNDEF",
				];

				valuesToken
					.addValues( ...values1 )
					.addValues( ...values2 )
				;

				expect( valuesToken.values ).toEqual( [ [ ...values1 ], [ ...values2 ] ] );
			} );

			it( "should return itself", ():void => {
				const valuesToken:ValuesToken = new ValuesToken();

				const returned:ValuesToken = valuesToken.addValues();
				expect( returned ).toBe( valuesToken );
			} );

		} );

		describe( "ValuesToken.toString", ():void => {

			it( "should override toString method", ():void => {
				const token:ValuesToken = new ValuesToken();

				expect( token.toString ).toBeDefined();
				expect( token.toString ).not.toBe( Object.prototype.toString );
			} );

			it( "should return single data block when only one variable", ():void => {
				const valuesToken:ValuesToken = new ValuesToken();

				valuesToken
					.addVariables( new VariableToken( "variable" ) )
					.addValues( new IRIToken( "http://example.com/" ) )
					.addValues( new PrefixedNameToken( "ex:resource" ) )
					.addValues( new LiteralToken( "literal" ) )
					.addValues( "UNDEF" )
				;

				expect( valuesToken.toString() ).toBe( `VALUES ?variable { <http://example.com/> ex:resource "literal" UNDEF }` );
			} );

			it( "should return pretty single data block when only one variable", ():void => {
				const valuesToken:ValuesToken = new ValuesToken();

				valuesToken
					.addVariables( new VariableToken( "variable" ) )
					.addValues( new IRIToken( "http://example.com/" ) )
					.addValues( new PrefixedNameToken( "ex:resource" ) )
					.addValues( new LiteralToken( "literal" ) )
					.addValues( "UNDEF" )
				;

				expect( valuesToken.toString( 0 ) ).toBe( `VALUES ?variable { <http://example.com/> ex:resource "literal" UNDEF }` );
			} );

			it( "should return multiple data block when multiple variables", ():void => {
				const valuesToken:ValuesToken = new ValuesToken();

				valuesToken
					.addVariables( new VariableToken( "variable1" ), new VariableToken( "variable2" ) )
					.addValues( new IRIToken( "http://example.com/1" ), new IRIToken( "http://example.com/2" ) )
					.addValues( new PrefixedNameToken( "ex:resource1" ), new PrefixedNameToken( "ex:resource2" ) )
					.addValues( new LiteralToken( "literal1" ), new LiteralToken( "literal2" ) )
					.addValues( "UNDEF", "UNDEF" )
				;

				expect( valuesToken.toString() ).toBe( "" +
					"VALUES ( ?variable1 ?variable2 ) { " +
					"" + "( <http://example.com/1> <http://example.com/2> ) " +
					"" + "( ex:resource1 ex:resource2 ) " +
					"" + "( \"literal1\" \"literal2\" ) " +
					"" + "( UNDEF UNDEF ) " +
					"}"
				);
			} );

			it( "should return pretty multiple data block when multiple variables", ():void => {
				const valuesToken:ValuesToken = new ValuesToken();

				valuesToken
					.addVariables( new VariableToken( "variable1" ), new VariableToken( "variable2" ) )
					.addValues( new IRIToken( "http://example.com/1" ), new IRIToken( "http://example.com/2" ) )
					.addValues( new PrefixedNameToken( "ex:resource1" ), new PrefixedNameToken( "ex:resource2" ) )
					.addValues( new LiteralToken( "literal1" ), new LiteralToken( "literal2" ) )
					.addValues( "UNDEF", "UNDEF" )
				;

				expect( valuesToken.toString( 0 ) ).toBe( "" +
					"VALUES ( ?variable1 ?variable2 ) {\n" +
					"    ( <http://example.com/1> <http://example.com/2> )\n" +
					"    ( ex:resource1 ex:resource2 )\n" +
					"    ( \"literal1\" \"literal2\" )\n" +
					"    ( UNDEF UNDEF )\n" +
					"}"
				);
			} );

			it( "should return empty list when no data", ():void => {
				const valuesToken:ValuesToken = new ValuesToken();
				expect( valuesToken.toString() ).toBe( "VALUES () {}" );
			} );

		} );

	} );

} );
