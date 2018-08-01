import { BaseToken } from "sparqler/tokens/BaseToken";
import { ConstructToken } from "sparqler/tokens/ConstructToken";
import { IRIToken } from "sparqler/tokens/IRIToken";
import { PrefixToken } from "sparqler/tokens/PrefixToken";
import { ValuesToken } from "sparqler/tokens/ValuesToken";
import { VariableToken } from "sparqler/tokens/VariableToken";

import * as Module from "./QueryToken";
import { QueryToken } from "./QueryToken";

describe( "Module QueryToken", ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	describe( "QueryToken", ():void => {

		it( "should exists", ():void => {
			expect( QueryToken ).toBeDefined();
			expect( QueryToken ).toEqual( jasmine.any( Function ) );
		} );

		describe( "QueryToken.constructor", ():void => {

			it( "should be instantiable", ():void => {
				const token:QueryToken = new QueryToken( null, null );
				expect( token ).toBeDefined();
				expect( token ).toEqual( jasmine.any( QueryToken ) );
			} );

			it( "should assign the provided query", ():void => {
				const construct:ConstructToken = new ConstructToken();
				const token:QueryToken = new QueryToken( construct );

				expect( token.queryClause ).toBe( construct );
			} );

			it( "should not assign values if no provided", ():void => {
				const token:QueryToken = new QueryToken( null );
				expect( token.values ).toBeUndefined();
			} );

			it( "should assign the provided values", ():void => {
				const values:ValuesToken = new ValuesToken();
				const token:QueryToken = new QueryToken( null, values );

				expect( token.values ).toBe( values );
			} );

			it( "should assign `query` as token name", ():void => {
				const token:QueryToken = new QueryToken( null );
				expect( token.token ).toBe( "query" );
			} );

		} );

		describe( "QueryToken.addPrologues", ():void => {

			it( "should exists", ():void => {
				expect( QueryToken.prototype.addPrologues ).toBeDefined();
				expect( QueryToken.prototype.addPrologues ).toEqual( jasmine.any( Function ) );
			} );

			it( "should add single pattern", ():void => {
				const token:QueryToken = new QueryToken( null );

				const prologue:BaseToken = new BaseToken( new IRIToken( "https://example.com/" ) );
				token.addPrologues( prologue );

				expect( token.prologues ).toEqual( [ prologue ] );
			} );

			it( "should add multiple patterns", ():void => {
				const token:QueryToken = new QueryToken( null );

				const prologue1:BaseToken = new BaseToken( new IRIToken( "https://example.com/" ) );
				const prologue2:PrefixToken = new PrefixToken( "ex", new IRIToken( "https://example.com/ns#" ) );
				token.addPrologues( prologue1, prologue2 );

				expect( token.prologues ).toEqual( [ prologue1, prologue2 ] );
			} );

			it( "should append patterns", ():void => {
				const token:QueryToken = new QueryToken( null );

				const firstPrologue:BaseToken = new BaseToken( new IRIToken( "https://example.com/" ) );
				token.addPrologues( firstPrologue );

				const newPrologue:PrefixToken = new PrefixToken( "ex", new IRIToken( "https://example.com/ns#" ) );
				token.addPrologues( newPrologue );

				expect( token.prologues ).toEqual( [ firstPrologue, newPrologue ] );
			} );

			it( "should return itself", ():void => {
				const token:QueryToken = new QueryToken( null );

				const prologue:BaseToken = new BaseToken( new IRIToken( "https://example.com/" ) );
				const returned:QueryToken = token.addPrologues( prologue );

				expect( returned ).toBe( token );
			} );

		} );

		describe( "QueryToken.toString", ():void => {

			it( "should exists", ():void => {
				expect( QueryToken.prototype.toString ).toBeDefined();
				expect( QueryToken.prototype.toString ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return the base SPARQL query statement", ():void => {
				const construct:ConstructToken = new ConstructToken();
				const token:QueryToken = new QueryToken( construct );

				expect( token.toString() ).toBe( "CONSTRUCT {  } WHERE {  }" );
			} );

			it( "should return the SPARQL query statement with prologues", ():void => {
				const construct:ConstructToken = new ConstructToken();
				const token:QueryToken = new QueryToken( construct )
					.addPrologues( new BaseToken( new IRIToken( "https://example.com/" ) ) )
					.addPrologues( new PrefixToken( "ex", new IRIToken( "https://example.com/ns#" ) ) )
				;

				expect( token.toString() ).toBe( "" +
					"BASE <https://example.com/> " +
					"PREFIX ex: <https://example.com/ns#> " +
					"CONSTRUCT {  } WHERE {  }" +
					"",
				);
			} );

			it( "should return the SPARQL query statement with values", ():void => {
				const construct:ConstructToken = new ConstructToken();
				const values:ValuesToken = new ValuesToken()
					.addValues( new VariableToken( "var" ), "UNDEF" );

				const token:QueryToken = new QueryToken( construct, values );

				expect( token.toString() ).toBe( "" +
					"CONSTRUCT {  } WHERE {  } " +
					"VALUES ?var { UNDEF }" +
					"",
				);
			} );

		} );

	} );

} );
