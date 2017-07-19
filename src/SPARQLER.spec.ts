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
	TokenFormat,
} from "./tokens/Token";
import { NumberLiteral } from "./tokens/NumberLiteral";
import {
	OPEN_MULTI_BLOCK,
	CLOSE_MULTI_BLOCK,
	EMPTY_SEPARATOR,
} from "./patterns/tokens";
import { Operator } from "./tokens/Operator";

xdescribe( "Module SPARQLER", () => {

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

	} );

} );
