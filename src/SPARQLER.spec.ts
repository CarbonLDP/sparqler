import * as SPARQLERModule from "./SPARQLER";
import SPARQLER from "./SPARQLER";

import {
	QueryClause,
	FromClause,
	WhereClause,
	FinishClause,
	HavingClause,
	OrderClause,
	LimitOffsetClause,
	OffsetClause,
	LimitClause,
} from "./clauses/interfaces";
import { Identifier } from "./tokens/Identifier";
import { LeftSymbol } from "./tokens/LeftSymbol";
import { StringLiteral } from "./tokens/StringLiteral";
import { RightSymbol } from "./tokens/RightSymbol";
import { PatternBuilder } from "./patterns/PatternBuilder";
import { NewLineSymbol } from "./tokens/NewLineSymbol";
import {
	Token,
	TokenFormat
} from "./tokens/Token";
import { NumberLiteral } from "./tokens/NumberLiteral";
import {
	OPEN_MULTI_BLOCK,
	CLOSE_MULTI_BLOCK,
	EMPTY_SEPARATOR
} from "./patterns/tokens";
import { Operator } from "./tokens/Operator";

describe( "Module SPARQLER", () => {

	it( "Exists", ():void => {
		expect( SPARQLERModule ).toBeDefined();
	} );

	describe( "Class SPARQLER", ():void => {

		it( "Exists", ():void => {
			expect( SPARQLER ).toBeDefined();
			expect( SPARQLER ).toEqual( jasmine.any( Function ) );
			expect( SPARQLER ).toBe( SPARQLERModule.SPARQLER );
		} );

		it( "Constructor", ():void => {
			let sparqler:SPARQLER = new SPARQLER();
			expect( sparqler ).toBeDefined();
			expect( sparqler ).toEqual( jasmine.any( SPARQLER ) );
		} );

		it( "Has all the Clauses functions", ():void => {
			let sparqler:SPARQLER = new SPARQLER();

			// Query Clauses

			expect( "base" in sparqler ).toBe( true );
			expect( sparqler.base ).toEqual( jasmine.any( Function ) );

			expect( "vocab" in sparqler ).toBe( true );
			expect( sparqler.vocab ).toEqual( jasmine.any( Function ) );

			expect( "prefix" in sparqler ).toBe( true );
			expect( sparqler.prefix ).toEqual( jasmine.any( Function ) );


			//From Clauses

			expect( "from" in sparqler ).toBe( true );
			expect( sparqler.from ).toEqual( jasmine.any( Function ) );

			expect( "fromNamed" in sparqler ).toBe( true );
			expect( sparqler.fromNamed ).toEqual( jasmine.any( Function ) );

			//Select Clauses

			expect( "select" in sparqler ).toBe( true );
			expect( sparqler.select ).toEqual( jasmine.any( Function ) );

			expect( "selectDistinct" in sparqler ).toBe( true );
			expect( sparqler.selectDistinct ).toEqual( jasmine.any( Function ) );

			expect( "selectReduced" in sparqler ).toBe( true );
			expect( sparqler.selectReduced ).toEqual( jasmine.any( Function ) );

			expect( "selectAll" in sparqler ).toBe( true );
			expect( sparqler.selectAll ).toEqual( jasmine.any( Function ) );

			expect( "selectAllDistinct" in sparqler ).toBe( true );
			expect( sparqler.selectAllDistinct ).toEqual( jasmine.any( Function ) );

			expect( "selectAllReduced" in sparqler ).toBe( true );
			expect( sparqler.selectAllReduced ).toEqual( jasmine.any( Function ) );

			//Where Clauses

			expect( "where" in sparqler ).toBe( true );
			expect( sparqler.where ).toEqual( jasmine.any( Function ) );

			// Group Clauses

			expect( "groupBy" in sparqler ).toBe( true );
			expect( sparqler.groupBy ).toEqual( jasmine.any( Function ) );

			// Having Clauses

			expect( "having" in sparqler ).toBe( true );
			expect( sparqler.having ).toEqual( jasmine.any( Function ) );

			// Order Clauses

			expect( "orderBy" in sparqler ).toBe( true );
			expect( sparqler.orderBy ).toEqual( jasmine.any( Function ) );

			// Offset Clauses

			expect( "offset" in sparqler ).toBe( true );
			expect( sparqler.offset ).toEqual( jasmine.any( Function ) );

			// Limit Clauses

			expect( "limit" in sparqler ).toBe( true );
			expect( sparqler.limit ).toEqual( jasmine.any( Function ) );

			// Finish Clauses

			expect( "toCompactString" in sparqler ).toBe( true );
			expect( sparqler.toCompactString ).toEqual( jasmine.any( Function ) );

			expect( "toPrettyString" in sparqler ).toBe( true );
			expect( sparqler.toPrettyString ).toEqual( jasmine.any( Function ) );

		} );

		// Test the methods

		it( "SPARQLER.base()", ():void => {
			let sparqler:SPARQLER = new SPARQLER();
			let clause:QueryClause = sparqler.base( "http://example.com/" );

			// Check data stored
			expect( sparqler[ "_base" ] ).toEqual( "http://example.com/" );

			// Check if only the QueryClause functions
			expect( Object.keys( clause ) ).toEqual( [
				"base",
				"vocab",
				"prefix",
				"select",
				"selectDistinct",
				"selectReduced",
				"selectAll",
				"selectAllDistinct",
				"selectAllReduced",
			] );

			// Are functions
			expect( clause.base ).toEqual( jasmine.any( Function ) );
			expect( clause.vocab ).toEqual( jasmine.any( Function ) );
			expect( clause.prefix ).toEqual( jasmine.any( Function ) );
			expect( clause.select ).toEqual( jasmine.any( Function ) );
			expect( clause.selectDistinct ).toEqual( jasmine.any( Function ) );
			expect( clause.selectReduced ).toEqual( jasmine.any( Function ) );
			expect( clause.selectAll ).toEqual( jasmine.any( Function ) );
			expect( clause.selectAllDistinct ).toEqual( jasmine.any( Function ) );
			expect( clause.selectAllReduced ).toEqual( jasmine.any( Function ) );

			// Always return a QueryClause
			let equalClause:QueryClause = clause.base( "http://another-example.com/" );
			expect( equalClause ).toEqual( clause );
			expect( sparqler[ "_base" ] ).toEqual( "http://another-example.com/" );

			equalClause = clause.base( "http://another-another-example.com/" );
			expect( equalClause ).toEqual( clause );
			expect( sparqler[ "_base" ] ).toEqual( "http://another-another-example.com/" );
		} );

		it( "SPARQLER.vocab()", ():void => {
			let sparqler:SPARQLER = new SPARQLER();
			let clause:QueryClause = sparqler.vocab( "http://example.com/ns#" );

			// Check data stored
			expect( sparqler[ "_vocab" ] ).toEqual( "http://example.com/ns#" );

			// Check if only the QueryClause functions
			expect( Object.keys( clause ) ).toEqual( [
				"base",
				"vocab",
				"prefix",
				"select",
				"selectDistinct",
				"selectReduced",
				"selectAll",
				"selectAllDistinct",
				"selectAllReduced",
			] );

			// Are functions
			expect( clause.base ).toEqual( jasmine.any( Function ) );
			expect( clause.vocab ).toEqual( jasmine.any( Function ) );
			expect( clause.prefix ).toEqual( jasmine.any( Function ) );
			expect( clause.select ).toEqual( jasmine.any( Function ) );
			expect( clause.selectDistinct ).toEqual( jasmine.any( Function ) );
			expect( clause.selectReduced ).toEqual( jasmine.any( Function ) );
			expect( clause.selectAll ).toEqual( jasmine.any( Function ) );
			expect( clause.selectAllDistinct ).toEqual( jasmine.any( Function ) );
			expect( clause.selectAllReduced ).toEqual( jasmine.any( Function ) );

			// Always return a QueryClause
			let equalClause:QueryClause = clause.vocab( "http://another-example.com/ns#" );
			expect( equalClause ).toEqual( clause );
			expect( sparqler[ "_vocab" ] ).toEqual( "http://another-example.com/ns#" );

			equalClause = clause.vocab( "http://another-another-example.com/ns#" );
			expect( equalClause ).toEqual( clause );
			expect( sparqler[ "_vocab" ] ).toEqual( "http://another-another-example.com/ns#" );
		} );

		it( "SPARQLER.prefix()", ():void => {
			let sparqler:SPARQLER = new SPARQLER();
			let clause:QueryClause = sparqler.prefix( "ex", "http://example.com/ns#" );

			// Check data stored
			expect( sparqler[ "_prefixes" ] ).toEqual( jasmine.any( Map ) );
			expect( sparqler[ "_prefixes" ].size ).toBe( 1 );
			expect( sparqler[ "_prefixes" ].get( "ex" ) ).toEqual( { iri: "http://example.com/ns#", used: false } );

			// Check if only the QueryClause functions
			expect( Object.keys( clause ) ).toEqual( [
				"base",
				"vocab",
				"prefix",
				"select",
				"selectDistinct",
				"selectReduced",
				"selectAll",
				"selectAllDistinct",
				"selectAllReduced",
			] );

			// Are functions
			expect( clause.base ).toEqual( jasmine.any( Function ) );
			expect( clause.vocab ).toEqual( jasmine.any( Function ) );
			expect( clause.prefix ).toEqual( jasmine.any( Function ) );
			expect( clause.select ).toEqual( jasmine.any( Function ) );
			expect( clause.selectDistinct ).toEqual( jasmine.any( Function ) );
			expect( clause.selectReduced ).toEqual( jasmine.any( Function ) );
			expect( clause.selectAll ).toEqual( jasmine.any( Function ) );
			expect( clause.selectAllDistinct ).toEqual( jasmine.any( Function ) );
			expect( clause.selectAllReduced ).toEqual( jasmine.any( Function ) );

			// Always return a QueryClause
			let equalClause:QueryClause = clause.prefix( "another", "http://another-example.com/ns#" );
			expect( equalClause ).toEqual( clause );
			expect( sparqler[ "_prefixes" ].size ).toBe( 2 );
			expect( sparqler[ "_prefixes" ].get( "another" ) ).toEqual( { iri: "http://another-example.com/ns#", used: false } );

			equalClause = clause.prefix( "another-another", "http://another-another-example.com/ns#" );
			expect( equalClause ).toEqual( clause );
			expect( sparqler[ "_prefixes" ].size ).toBe( 3 );
			expect( sparqler[ "_prefixes" ].get( "another-another" ) ).toEqual( { iri: "http://another-another-example.com/ns#", used: false } );
		} );

		it( "SPARQLER.select()", ():void => {
			let sparqler:SPARQLER = new SPARQLER();
			let clause:WhereClause<FinishSelectClause> & FromClause<FinishSelectClause> = sparqler.select( "a" );

			// Check data stored
			expect( sparqler[ "_selects" ] ).toEqual( jasmine.any( Array ) );
			expect( sparqler[ "_selects" ] ).toEqual( [ new Identifier( "SELECT" ), new LeftSymbol( "?" ), new StringLiteral( "a" ) ] );

			// Check the object returned has the functions of WhereClause and FromClause
			expect( Object.keys( clause ) ).toEqual( [ "where", "from", "fromNamed" ] );

			// Are functions
			expect( clause.from ).toEqual( jasmine.any( Function ) );
			expect( clause.fromNamed ).toEqual( jasmine.any( Function ) );
			expect( clause.where ).toEqual( jasmine.any( Function ) );

			// Test more variables provided
			sparqler.select( "b", "c" );
			expect( sparqler[ "_selects" ] ).toEqual( jasmine.any( Array ) );
			expect( sparqler[ "_selects" ] ).toEqual( [
				new Identifier( "SELECT" ),
				new LeftSymbol( "?" ), new StringLiteral( "b" ),
				new LeftSymbol( "?" ), new StringLiteral( "c" ),
			] );

			// Test variables with larger names
			sparqler.select( "more", "and", "larger", "names" );
			expect( sparqler[ "_selects" ] ).toEqual( jasmine.any( Array ) );
			expect( sparqler[ "_selects" ] ).toEqual( [
				new Identifier( "SELECT" ),
				new LeftSymbol( "?" ), new StringLiteral( "more" ),
				new LeftSymbol( "?" ), new StringLiteral( "and" ),
				new LeftSymbol( "?" ), new StringLiteral( "larger" ),
				new LeftSymbol( "?" ), new StringLiteral( "names" ),
			] );
		} );

		it( "SPARQLER.selectAll()", ():void => {
			let sparqler:SPARQLER = new SPARQLER();
			let clause:WhereClause<FinishSelectClause> & FromClause<FinishSelectClause> = sparqler.selectAll();

			// Check data stored
			expect( sparqler[ "_selects" ] ).toEqual( jasmine.any( Array ) );
			expect( sparqler[ "_selects" ] ).toEqual( [ new Identifier( "SELECT" ), new RightSymbol( "*" ) ] );

			// Check the object returned has the functions of WhereClause and FromClause
			expect( Object.keys( clause ) ).toEqual( [ "where", "from", "fromNamed" ] );

			// Are functions
			expect( clause.from ).toEqual( jasmine.any( Function ) );
			expect( clause.fromNamed ).toEqual( jasmine.any( Function ) );
			expect( clause.where ).toEqual( jasmine.any( Function ) );

			// Calling a `select` method overrides de previous stored data
			sparqler.select( "a" );
			expect( sparqler[ "_selects" ] ).toEqual( jasmine.any( Array ) );
			expect( sparqler[ "_selects" ] ).toEqual( [
				new Identifier( "SELECT" ),
				new LeftSymbol( "?" ), new StringLiteral( "a" ),
			] );

			sparqler.selectAll();
			expect( sparqler[ "_selects" ] ).toEqual( jasmine.any( Array ) );
			expect( sparqler[ "_selects" ] ).toEqual( [
				new Identifier( "SELECT" ),
				new RightSymbol( "*" ),
			] );
		} );

		it( "SPARQLER.from()", ():void => {
			let sparqler:SPARQLER = new SPARQLER();
			let clause:WhereClause<FinishClause> = sparqler.from( "http://example.com/resource/" );

			// Check data stored
			expect( sparqler[ "_from" ] ).toEqual( jasmine.any( Array ) );
			expect( sparqler[ "_from" ] ).toEqual( [
				new Identifier( "FROM" ),
				new LeftSymbol( "<" ), new StringLiteral( "http://example.com/resource/" ), new RightSymbol( ">" ),
			] );

			// Check the object returned has the function of WhereClause
			expect( Object.keys( clause ) ).toEqual( [ "where" ] );

			// Are functions
			expect( clause.where ).toEqual( jasmine.any( Function ) );

			// Calling the method again override the stored data
			sparqler.from( "http://example.com/another-resource/" );
			expect( sparqler[ "_from" ] ).toEqual( jasmine.any( Array ) );
			expect( sparqler[ "_from" ] ).toEqual( [
				new Identifier( "FROM" ),
				new LeftSymbol( "<" ), new StringLiteral( "http://example.com/another-resource/" ), new RightSymbol( ">" ),
			] );
		} );

		it( "SPARQLER.fromNamed()", ():void => {
			let sparqler:SPARQLER = new SPARQLER();
			let clause:WhereClause<FinishClause> = sparqler.fromNamed( "http://example.com/resource/" );

			// Check data stored
			expect( sparqler[ "_from" ] ).toEqual( jasmine.any( Array ) );
			expect( sparqler[ "_from" ] ).toEqual( [
				new Identifier( "FROM" ), new Identifier( "NAMED" ),
				new LeftSymbol( "<" ), new StringLiteral( "http://example.com/resource/" ), new RightSymbol( ">" ),
			] );

			// Check the object returned has the function of WhereClause
			expect( Object.keys( clause ) ).toEqual( [ "where" ] );

			// Are functions
			expect( clause.where ).toEqual( jasmine.any( Function ) );

			// Calling a `from` method replace the stored data
			sparqler.from( "http://example.com/resource/" );
			expect( sparqler[ "_from" ] ).toEqual( jasmine.any( Array ) );
			expect( sparqler[ "_from" ] ).toEqual( [
				new Identifier( "FROM" ),
				new LeftSymbol( "<" ), new StringLiteral( "http://example.com/resource/" ), new RightSymbol( ">" ),
			] );

			sparqler.fromNamed( "http://example.com/another-resource/" );
			expect( sparqler[ "_from" ] ).toEqual( jasmine.any( Array ) );
			expect( sparqler[ "_from" ] ).toEqual( [
				new Identifier( "FROM" ), new Identifier( "NAMED" ),
				new LeftSymbol( "<" ), new StringLiteral( "http://example.com/another-resource/" ), new RightSymbol( ">" ),
			] );
		} );

		it( "SPARQLER.where()", ():void => {
			let sparqler:SPARQLER = new SPARQLER();
			let clause:SolutionModifier<FinishClause> & FinishClause = sparqler.where( ( patternBuilder:PatternBuilder ) => {

				// Check a pattern builder has been provided
				expect( patternBuilder ).toEqual( jasmine.any( PatternBuilder ) );

				// Empty where statement
				return [];
			} );

			// Check data stored
			expect( sparqler[ "_where" ] ).toEqual( jasmine.any( Array ) );
			expect( sparqler[ "_where" ] ).toEqual( [
				new Identifier( "WHERE" ),
				new LeftSymbol( "{" ),
				new RightSymbol( "}" ),
			] );

			// Check the object returned has the function of WhereClause
			expect( Object.keys( clause ) ).toEqual( [ "groupBy", "having", "orderBy", "limit", "offset", "toCompactString", "toPrettyString" ] );

			// Are functions
			expect( clause.groupBy ).toEqual( jasmine.any( Function ) );
			expect( clause.having ).toEqual( jasmine.any( Function ) );
			expect( clause.orderBy ).toEqual( jasmine.any( Function ) );
			expect( clause.limit ).toEqual( jasmine.any( Function ) );
			expect( clause.offset ).toEqual( jasmine.any( Function ) );
			expect( clause.toCompactString ).toEqual( jasmine.any( Function ) );
			expect( clause.toPrettyString ).toEqual( jasmine.any( Function ) );

			class MockToken extends Token {
				protected getPrettySeparator():string {
					return "";
				}

				protected getCompactSeparator():string {
					return "";
				}
			}

			// Test different patterns returned

			sparqler.where( () => {
				// Single pattern
				return { getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] };
			} );

			// Check data stored
			expect( sparqler[ "_where" ] ).toEqual( jasmine.any( Array ) );
			expect( sparqler[ "_where" ] ).toEqual( [
				new Identifier( "WHERE" ),
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
			] );
			sparqler.where( () => {
				// Single pattern in an array
				return [
					{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
				];
			} );

			// Check data stored
			expect( sparqler[ "_where" ] ).toEqual( jasmine.any( Array ) );
			expect( sparqler[ "_where" ] ).toEqual( [
				new Identifier( "WHERE" ),
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
			] );
			sparqler.where( () => {
				// Multiple patterns
				return [
					{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
					{ getPattern: () => [ new MockToken( "token-3" ), new MockToken( "token-4" ) ] },
				];
			} );

			// Check data stored
			expect( sparqler[ "_where" ] ).toEqual( jasmine.any( Array ) );
			expect( sparqler[ "_where" ] ).toEqual( [
				new Identifier( "WHERE" ),
				new NewLineSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ), new NewLineSymbol( "." ),
				new MockToken( "token-3" ), new MockToken( "token-4" ),
				new NewLineSymbol( "}" ),
			] );

		} );

		it( "SPARQLER.groupBy()", ():void => {
			let sparqler:SPARQLER = new SPARQLER();
			let clause:HavingClause<FinishClause> & OrderClause<FinishClause> & LimitOffsetClause<FinishClause> & FinishClause = sparqler.groupBy( "?a" );

			// Check data stored
			expect( sparqler[ "_group" ] ).toEqual( jasmine.any( Array ) );
			expect( sparqler[ "_group" ] ).toEqual( [
				new Identifier( "GROUP" ), new Identifier( "BY" ),
				new StringLiteral( "?a" ),
			] );

			// Check the object returned has the function of WhereClause
			expect( Object.keys( clause ) ).toEqual( [ "having", "orderBy", "limit", "offset", "toCompactString", "toPrettyString" ] );

			// Are functions
			expect( clause.having ).toEqual( jasmine.any( Function ) );
			expect( clause.orderBy ).toEqual( jasmine.any( Function ) );
			expect( clause.limit ).toEqual( jasmine.any( Function ) );
			expect( clause.offset ).toEqual( jasmine.any( Function ) );
			expect( clause.toCompactString ).toEqual( jasmine.any( Function ) );
			expect( clause.toPrettyString ).toEqual( jasmine.any( Function ) );

			// Calling the method again replace the stored data
			sparqler.groupBy( "DESC ( ?a )" );
			expect( sparqler[ "_group" ] ).toEqual( jasmine.any( Array ) );
			expect( sparqler[ "_group" ] ).toEqual( [
				new Identifier( "GROUP" ), new Identifier( "BY" ),
				new StringLiteral( "DESC ( ?a )" ),
			] );
		} );

		it( "SPARQLER.having()", ():void => {
			let sparqler:SPARQLER = new SPARQLER();
			let clause:OrderClause<FinishClause> & LimitOffsetClause<FinishClause> & FinishClause = sparqler.having( "( ?a )" );

			// Check data stored
			expect( sparqler[ "_having" ] ).toEqual( jasmine.any( Array ) );
			expect( sparqler[ "_having" ] ).toEqual( [
				new Identifier( "HAVING" ),
				new StringLiteral( "( ?a )" ),
			] );

			// Check the object returned has the function of WhereClause
			expect( Object.keys( clause ) ).toEqual( [ "orderBy", "limit", "offset", "toCompactString", "toPrettyString" ] );

			// Are functions
			expect( clause.orderBy ).toEqual( jasmine.any( Function ) );
			expect( clause.limit ).toEqual( jasmine.any( Function ) );
			expect( clause.offset ).toEqual( jasmine.any( Function ) );
			expect( clause.toCompactString ).toEqual( jasmine.any( Function ) );
			expect( clause.toPrettyString ).toEqual( jasmine.any( Function ) );

			// Calling the method again replace the stored data
			sparqler.having( "( AVG(?size) > 10 )" );
			expect( sparqler[ "_having" ] ).toEqual( jasmine.any( Array ) );
			expect( sparqler[ "_having" ] ).toEqual( [
				new Identifier( "HAVING" ),
				new StringLiteral( "( AVG(?size) > 10 )" ),
			] );
		} );

		it( "SPARQLER.orderBy()", ():void => {
			let sparqler:SPARQLER = new SPARQLER();
			let clause:LimitOffsetClause<FinishClause> & FinishClause = sparqler.orderBy( "?a" );

			// Check data stored
			expect( sparqler[ "_order" ] ).toEqual( jasmine.any( Array ) );
			expect( sparqler[ "_order" ] ).toEqual( [
				new Identifier( "ORDER" ), new Identifier( "BY" ),
				new StringLiteral( "?a" ),
			] );

			// Check the object returned has the function of WhereClause
			expect( Object.keys( clause ) ).toEqual( [ "limit", "offset", "toCompactString", "toPrettyString" ] );

			// Are functions
			expect( clause.limit ).toEqual( jasmine.any( Function ) );
			expect( clause.offset ).toEqual( jasmine.any( Function ) );
			expect( clause.toCompactString ).toEqual( jasmine.any( Function ) );
			expect( clause.toPrettyString ).toEqual( jasmine.any( Function ) );

			// Calling the method again replace the stored data
			sparqler.orderBy( "DESC ( ?a )" );
			expect( sparqler[ "_order" ] ).toEqual( jasmine.any( Array ) );
			expect( sparqler[ "_order" ] ).toEqual( [
				new Identifier( "ORDER" ), new Identifier( "BY" ),
				new StringLiteral( "DESC ( ?a )" ),
			] );
		} );

		it( "SPARQLER.limit()", ():void => {
			let sparqler:SPARQLER = new SPARQLER();
			let clause:OffsetClause<FinishClause> & FinishClause = sparqler.limit( 1 );

			// Check data stored
			expect( sparqler[ "_limit" ] ).toEqual( jasmine.any( Array ) );
			expect( sparqler[ "_limit" ] ).toEqual( [
				new Identifier( "LIMIT" ),
				new NumberLiteral( 1 ),
			] );

			// Check the object returned has the function of WhereClause
			expect( Object.keys( clause ) ).toEqual( [ "offset", "toCompactString", "toPrettyString" ] );

			// Are functions
			expect( clause.offset ).toEqual( jasmine.any( Function ) );
			expect( clause.toCompactString ).toEqual( jasmine.any( Function ) );
			expect( clause.toPrettyString ).toEqual( jasmine.any( Function ) );

			// Calling the method again replace the stored data
			sparqler.limit( 10 );
			expect( sparqler[ "_limit" ] ).toEqual( jasmine.any( Array ) );
			expect( sparqler[ "_limit" ] ).toEqual( [
				new Identifier( "LIMIT" ),
				new NumberLiteral( 10 ),
			] );

			// If `offset` has been set the returned object will not have the function
			sparqler = new SPARQLER();
			let finish:FinishClause = sparqler.offset( 10 ).limit( 10 );

			expect( Object.keys( finish ) ).not.toContain( "offset" );
			expect( Object.keys( finish ) ).toEqual( [ "toCompactString", "toPrettyString" ] );
			expect( clause.toCompactString ).toEqual( jasmine.any( Function ) );
			expect( clause.toPrettyString ).toEqual( jasmine.any( Function ) );
		} );

		it( "SPARQLER.offset()", ():void => {
			let sparqler:SPARQLER = new SPARQLER();
			let clause:LimitClause<FinishClause> & FinishClause = sparqler.offset( 1 );

			// Check data stored
			expect( sparqler[ "_offset" ] ).toEqual( jasmine.any( Array ) );
			expect( sparqler[ "_offset" ] ).toEqual( [
				new Identifier( "OFFSET" ),
				new NumberLiteral( 1 ),
			] );

			// Check the object returned has the function of WhereClause
			expect( Object.keys( clause ) ).toEqual( [ "limit", "toCompactString", "toPrettyString" ] );

			// Are functions
			expect( clause.limit ).toEqual( jasmine.any( Function ) );
			expect( clause.toCompactString ).toEqual( jasmine.any( Function ) );
			expect( clause.toPrettyString ).toEqual( jasmine.any( Function ) );

			// Calling the method again replace the stored data
			sparqler.offset( 10 );
			expect( sparqler[ "_offset" ] ).toEqual( jasmine.any( Array ) );
			expect( sparqler[ "_offset" ] ).toEqual( [
				new Identifier( "OFFSET" ),
				new NumberLiteral( 10 ),
			] );

			// If `limit` has been set the returned object will not have the function
			sparqler = new SPARQLER();
			let finish:FinishClause = sparqler.limit( 10 ).offset( 10 );

			expect( Object.keys( finish ) ).not.toContain( "limit" );
			expect( Object.keys( finish ) ).toEqual( [ "toCompactString", "toPrettyString" ] );
			expect( clause.toCompactString ).toEqual( jasmine.any( Function ) );
			expect( clause.toPrettyString ).toEqual( jasmine.any( Function ) );
		} );

		it( "SPARQLER._resolveIRI()", ():void => {
			let sparqler:SPARQLER = new SPARQLER();

			// SPARQLER implements the method
			expect( "_resolveIRI" in sparqler ).toBe( true );
			expect( sparqler._resolveIRI ).toEqual( jasmine.any( Function ) );

			let tokens:Token[];

			// Tokens of an iri
			sparqler = new SPARQLER();
			tokens = sparqler._resolveIRI( "http://example.com/resource/" );
			expect( tokens ).toEqual( [ new LeftSymbol( "<" ), new StringLiteral( "http://example.com/resource/" ), new RightSymbol( ">" ) ] );

			// Mark prefixes as used
			sparqler = new SPARQLER();
			sparqler[ "_prefixes" ] = new Map<string, PrefixInfo>();
			sparqler[ "_prefixes" ].set( "ex", { iri: "http://example.com/ns#", used: false } );
			sparqler[ "_prefixes" ].set( "another", { iri: "http://another-example.com/ns#", used: true } );
			tokens = sparqler._resolveIRI( "ex:some" );
			expect( tokens ).toEqual( [ new StringLiteral( "ex" ), new Operator( ":" ), new StringLiteral( "some" ) ] );
			expect( sparqler[ "_prefixes" ].get( "ex" ) ).toEqual( { iri: "http://example.com/ns#", used: true } );

			sparqler = new SPARQLER();
			sparqler[ "_prefixes" ] = new Map<string, PrefixInfo>();
			sparqler[ "_prefixes" ].set( "ex", { iri: "http://example.com/ns#", used: false } );
			sparqler[ "_prefixes" ].set( "another", { iri: "http://another-example.com/ns#", used: true } );
			tokens = sparqler._resolveIRI( "another:some" );
			expect( tokens ).toEqual( [ new StringLiteral( "another" ), new Operator( ":" ), new StringLiteral( "some" ) ] );
			expect( sparqler[ "_prefixes" ].get( "another" ) ).toEqual( { iri: "http://another-example.com/ns#", used: true } );

			// Relative IRI with out use of the vocabulary
			sparqler = new SPARQLER();
			tokens = sparqler._resolveIRI( "relative-iri" );
			expect( tokens ).toEqual( [ new LeftSymbol( "<" ), new StringLiteral( "relative-iri" ), new RightSymbol( ">" ) ] );

			sparqler = new SPARQLER();
			sparqler[ "_vocab" ] = "http://example.com/ns#";
			tokens = sparqler._resolveIRI( "relative-iri", false );
			expect( tokens ).toEqual( [ new LeftSymbol( "<" ), new StringLiteral( "relative-iri" ), new RightSymbol( ">" ) ] );

			// Relative IRI resolved with the vocabulary
			sparqler = new SPARQLER();
			sparqler[ "_vocab" ] = "http://example.com/ns#";
			tokens = sparqler._resolveIRI( "relative-iri", true );
			expect( tokens ).toEqual( [ new LeftSymbol( "<" ), new StringLiteral( "http://example.com/ns#relative-iri" ), new RightSymbol( ">" ) ] );
		} );

	} );

} );
