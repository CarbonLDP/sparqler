import { spyContainers } from "../../../test/spies/clones";

import { Container } from "../../core/containers/Container";
import { IRIResolver } from "../../core/iri/IRIResolver";

import { IRIRefToken } from "../../tokens/IRIRefToken";
import { LiteralToken } from "../../tokens/LiteralToken";
import { RDFLiteralToken } from "../../tokens/RDFLiteralToken";
import { ValuesToken } from "../../tokens/ValuesToken";

import { XSD } from "../../utils/XSD";

import { Literal } from "../triplePatterns/Literal";
import { Resource } from "../triplePatterns/Resource";

import { MultipleValuesPattern, MultipleValuesPatternMore } from "./MultipleValuesPattern";


describe( "MultipleValuesPattern", () => {

	it( "should exists", () => {
		expect( MultipleValuesPattern ).toBeDefined();
		expect( MultipleValuesPattern ).toEqual( jasmine.any( Object ) );
	} );

	let container:Container<ValuesToken>;
	beforeEach( () => {
		container = new Container( {
			iriResolver: new IRIResolver(),
			targetToken: new ValuesToken()
		} );

		spyContainers.install();
	} );

	afterEach( () => {
		spyContainers.uninstall();
	} );

	function getResource( iri:string ):Resource {
		return Resource.createFrom( new Container( {
			iriResolver: container.iriResolver,
			targetToken: new IRIRefToken( iri ),
		} ), {} );
	}

	function getLiteral( value:string ):Literal {
		return Literal.createFrom( new Container( {
			iriResolver: container.iriResolver,
			targetToken: new LiteralToken( value ),
		} ), {} );
	}


	describe( "MultipleValuesPattern.createFrom", () => {

		it( "should exists", () => {
			expect( MultipleValuesPattern.createFrom ).toBeDefined();
			expect( MultipleValuesPattern.createFrom ).toEqual( jasmine.any( Function ) );
		} );


		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const triplePattern:MultipleValuesPattern = MultipleValuesPattern
				.createFrom( container, myObject );

			expect( myObject ).toBe( triplePattern );
		} );

		it( "should create a MultipleValuesPattern object", () => {
			const triplePattern:MultipleValuesPattern = MultipleValuesPattern
				.createFrom( container, {} );

			expect( triplePattern ).toEqual( {
				has: jasmine.any( Function ),

				// Inherit
				getPattern: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "MultipleValuesPattern.has", () => {

		let pattern:MultipleValuesPattern;
		beforeEach( () => {
			pattern = MultipleValuesPattern.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( pattern.has ).toBeDefined();
			expect( pattern.has ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return a MultipleValuesPatternMore", () => {
			const returned:MultipleValuesPatternMore = pattern.has( "val" );
			expect( returned ).toEqual( {
				and: jasmine.any( Function ),

				getPattern: jasmine.any( Function ),
			} )
		} );


		it( "should create a ValuesToken", () => {
			pattern.has( "val" );

			const newContainer:Container<ValuesToken> = spyContainers.getLast();
			expect( newContainer.targetToken ).toEqual( jasmine.any( ValuesToken ) );
		} );

		it( "should not mutate container token", () => {
			pattern.has( "val" );
			expect( container.targetToken.values ).toEqual( [] );
		} );


		it( "should add single string value", () => {
			pattern.has( "val" );

			const newContainer:Container<ValuesToken> = spyContainers.getLast();
			expect( newContainer.targetToken.values )
				.toContain( [ new LiteralToken( "val" ) ] );
		} );

		it( "should add single number value", () => {
			pattern.has( 10 );

			const newContainer:Container<ValuesToken> = spyContainers.getLast();
			expect( newContainer.targetToken.values )
				.toContain( [ new LiteralToken( 10 ) ] );
		} );

		it( "should add single Date value", () => {
			const date:Date = new Date();
			pattern.has( date );

			const newContainer:Container<ValuesToken> = spyContainers.getLast();
			expect( newContainer.targetToken.values )
				.toContain( [ new RDFLiteralToken( date.toISOString(), new IRIRefToken( XSD.dateTime ) ) ] );
		} );

		it( "should add single Resource value", () => {
			pattern.has( getResource( "resource/" ) );

			const newContainer:Container<ValuesToken> = spyContainers.getLast();
			expect( newContainer.targetToken.values )
				.toContain( [ new IRIRefToken( "resource/" ) ] );
		} );

		it( "should add single Literal value", () => {
			pattern.has( getLiteral( "value" ) );

			const newContainer:Container<ValuesToken> = spyContainers.getLast();
			expect( newContainer.targetToken.values )
				.toContain( [ new LiteralToken( "value" ) ] );
		} );

		it( "should add single UNDEF value", () => {
			pattern.has( "UNDEF" );

			const newContainer:Container<ValuesToken> = spyContainers.getLast();
			expect( newContainer.targetToken.values )
				.toContain( [ "UNDEF" ] );
		} );


		it( "should multiple values", () => {
			const date:Date = new Date();
			pattern.has(
				"val",
				10,
				date,
				getResource( "resource/" ),
				getLiteral( "value" ),
				"UNDEF",
			);

			const newContainer:Container<ValuesToken> = spyContainers.getLast();
			expect( newContainer.targetToken.values )
				.toContain( [
					new LiteralToken( "val" ),
					new LiteralToken( 10 ),
					new RDFLiteralToken( date.toISOString(), new IRIRefToken( XSD.dateTime ) ),
					new IRIRefToken( "resource/" ),
					new LiteralToken( "value" ),
					"UNDEF",
				] );
		} );

	} );

} );

describe( "MultipleValuesPatternMore", () => {

	it( "should exists", () => {
		expect( MultipleValuesPatternMore ).toBeDefined();
		expect( MultipleValuesPatternMore ).toEqual( jasmine.any( Object ) );
	} );

	let container:Container<ValuesToken>;
	beforeEach( () => {
		container = new Container( {
			iriResolver: new IRIResolver(),
			targetToken: new ValuesToken()
		} );

		spyContainers.install();
	} );

	afterEach( () => {
		spyContainers.uninstall();
	} );

	function getResource( iri:string ):Resource {
		return Resource.createFrom( new Container( {
			iriResolver: container.iriResolver,
			targetToken: new IRIRefToken( iri ),
		} ), {} );
	}

	function getLiteral( value:string ):Literal {
		return Literal.createFrom( new Container( {
			iriResolver: container.iriResolver,
			targetToken: new LiteralToken( value ),
		} ), {} );
	}


	describe( "MultipleValuesPatternMore.createFrom", () => {

		it( "should exists", () => {
			expect( MultipleValuesPatternMore.createFrom ).toBeDefined();
			expect( MultipleValuesPatternMore.createFrom ).toEqual( jasmine.any( Function ) );
		} );


		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const triplePattern:MultipleValuesPatternMore = MultipleValuesPatternMore
				.createFrom( container, myObject );

			expect( myObject ).toBe( triplePattern );
		} );

		it( "should create a MultipleValuesPatternMore object", () => {
			const triplePattern:MultipleValuesPatternMore = MultipleValuesPatternMore
				.createFrom( container, {} );

			expect( triplePattern ).toEqual( {
				and: jasmine.any( Function ),

				// Inherit
				getPattern: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "MultipleValuesPatternMore.and", () => {

		let pattern:MultipleValuesPatternMore;
		beforeEach( () => {
			pattern = MultipleValuesPatternMore.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( pattern.and ).toBeDefined();
			expect( pattern.and ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return a MultipleValuesPatternMore", () => {
			const returned:MultipleValuesPatternMore = pattern.and( "val" );
			expect( returned ).toEqual( {
				and: jasmine.any( Function ),

				getPattern: jasmine.any( Function ),
			} )
		} );


		it( "should create a ValuesToken", () => {
			pattern.and( "val" );

			const newContainer:Container<ValuesToken> = spyContainers.getLast();
			expect( newContainer.targetToken ).toEqual( jasmine.any( ValuesToken ) );
		} );

		it( "should not mutate container token", () => {
			pattern.and( "val" );
			expect( container.targetToken.values ).toEqual( [] );
		} );


		it( "should add single string value", () => {
			pattern.and( "val" );

			const newContainer:Container<ValuesToken> = spyContainers.getLast();
			expect( newContainer.targetToken.values )
				.toContain( [ new LiteralToken( "val" ) ] );
		} );

		it( "should add single number value", () => {
			pattern.and( 10 );

			const newContainer:Container<ValuesToken> = spyContainers.getLast();
			expect( newContainer.targetToken.values )
				.toContain( [ new LiteralToken( 10 ) ] );
		} );

		it( "should add single Date value", () => {
			const date:Date = new Date();
			pattern.and( date );

			const newContainer:Container<ValuesToken> = spyContainers.getLast();
			expect( newContainer.targetToken.values )
				.toContain( [ new RDFLiteralToken( date.toISOString(), new IRIRefToken( XSD.dateTime ) ) ] );
		} );

		it( "should add single Resource value", () => {
			pattern.and( getResource( "resource/" ) );

			const newContainer:Container<ValuesToken> = spyContainers.getLast();
			expect( newContainer.targetToken.values )
				.toContain( [ new IRIRefToken( "resource/" ) ] );
		} );

		it( "should add single Literal value", () => {
			pattern.and( getLiteral( "value" ) );

			const newContainer:Container<ValuesToken> = spyContainers.getLast();
			expect( newContainer.targetToken.values )
				.toContain( [ new LiteralToken( "value" ) ] );
		} );

		it( "should add single UNDEF value", () => {
			pattern.and( "UNDEF" );

			const newContainer:Container<ValuesToken> = spyContainers.getLast();
			expect( newContainer.targetToken.values )
				.toContain( [ "UNDEF" ] );
		} );


		it( "should multiple values", () => {
			const date:Date = new Date();
			pattern.and(
				"val",
				10,
				date,
				getResource( "resource/" ),
				getLiteral( "value" ),
				"UNDEF",
			);

			const newContainer:Container<ValuesToken> = spyContainers.getLast();
			expect( newContainer.targetToken.values )
				.toContain( [
					new LiteralToken( "val" ),
					new LiteralToken( 10 ),
					new RDFLiteralToken( date.toISOString(), new IRIRefToken( XSD.dateTime ) ),
					new IRIRefToken( "resource/" ),
					new LiteralToken( "value" ),
					"UNDEF",
				] );
		} );

	} );

} );
