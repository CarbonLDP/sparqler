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

		describe( "ValuesToken.addValues", ():void => {

			it( "should exists", ():void => {
				expect( ValuesToken.prototype.addValues ).toBeDefined();
				expect( ValuesToken.prototype.addValues ).toEqual( jasmine.any( Function ) );
			} );

			it( "should add the variable and empty values", ():void => {
				const valuesToken:ValuesToken = new ValuesToken();

				const variable:VariableToken = new VariableToken( "variable" );
				valuesToken.addValues( variable );

				expect( valuesToken.variables ).toEqual( [ variable ] );
				expect( valuesToken.values ).toEqual( [ [] ] );
			} );

			it( "should add the variable and the values", ():void => {
				const valuesToken:ValuesToken = new ValuesToken();

				const variable:VariableToken = new VariableToken( "variable" );
				const values:( IRIToken | PrefixedNameToken | LiteralToken | "UNDEF" )[] = [
					new IRIToken( "http://example.com/" ),
					new PrefixedNameToken( "ex:resource" ),
					new LiteralToken( "literal" ),
					"UNDEF",
				];
				valuesToken.addValues( variable, ...values );

				expect( valuesToken.variables ).toEqual( [ variable ] );
				expect( valuesToken.values ).toEqual( [ [ ...values ] ] );
			} );

			it( "should append the variables and values", ():void => {
				const valuesToken:ValuesToken = new ValuesToken();

				const variable1:VariableToken = new VariableToken( "variable1" );
				const values1:( IRIToken | PrefixedNameToken | LiteralToken | "UNDEF" )[] = [
					new IRIToken( "http://example.com/" ),
					new PrefixedNameToken( "ex:resource" ),
					new LiteralToken( "literal" ),
					"UNDEF",
				];
				valuesToken.addValues( variable1, ...values1 );

				const variable2:VariableToken = new VariableToken( "variable2" );
				const values2:( IRIToken | PrefixedNameToken | LiteralToken | "UNDEF" )[] = [
					new IRIToken( "http://example.com/" ),
					new PrefixedNameToken( "ex:resource" ),
					new LiteralToken( "literal" ),
					"UNDEF",
				];
				valuesToken.addValues( variable2, ...values2 );

				expect( valuesToken.variables ).toEqual( [ variable1, variable2 ] );
				expect( valuesToken.values ).toEqual( [ [ ...values1 ], [ ...values2 ] ] );
			} );

			it( "should return itself", ():void => {
				const valuesToken:ValuesToken = new ValuesToken();
				const variable:VariableToken = new VariableToken( "variable" );

				const returned:ValuesToken = valuesToken.addValues( variable );
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

				const variable:VariableToken = new VariableToken( "variable" );
				const values:( IRIToken | PrefixedNameToken | LiteralToken | "UNDEF" )[] = [
					new IRIToken( "http://example.com/" ),
					new PrefixedNameToken( "ex:resource" ),
					new LiteralToken( "literal" ),
					"UNDEF",
				];
				valuesToken.addValues( variable, ...values );

				expect( valuesToken.toString() ).toBe( `VALUES ?variable { <http://example.com/> ex:resource "literal" UNDEF }` );
			} );

			it( "should return multiple data block when multiple variables", ():void => {
				const valuesToken:ValuesToken = new ValuesToken();

				const variable1:VariableToken = new VariableToken( "variable1" );
				const values1:( IRIToken | PrefixedNameToken | LiteralToken | "UNDEF" )[] = [
					new IRIToken( "http://example.com/" ),
					new PrefixedNameToken( "ex:resource" ),
					new LiteralToken( "literal" ),
					"UNDEF",
				];
				valuesToken.addValues( variable1, ...values1 );

				const variable2:VariableToken = new VariableToken( "variable2" );
				const values2:( IRIToken | PrefixedNameToken | LiteralToken | "UNDEF" )[] = [
					new IRIToken( "http://example.com/" ),
					new PrefixedNameToken( "ex:resource" ),
					new LiteralToken( "literal" ),
					"UNDEF",
				];
				valuesToken.addValues( variable2, ...values2 );

				expect( valuesToken.toString() ).toBe( `VALUES ( ?variable1 ?variable2 ) { ( <http://example.com/> ex:resource "literal" UNDEF ) ( <http://example.com/> ex:resource "literal" UNDEF ) }` );
			} );

			it( "should return empty list when no data", ():void => {
				const valuesToken:ValuesToken = new ValuesToken();
				expect( valuesToken.toString() ).toBe( "VALUES () { () }" );
			} );

		} );

	} );

} );
