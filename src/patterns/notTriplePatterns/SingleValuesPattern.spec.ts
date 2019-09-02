import { spyContainers } from "../../../test/spies/clones";

import { Container } from "../../core/containers/Container";
import { IRIResolver } from "../../core/iri/IRIResolver";

import { IRIRefToken } from "../../tokens/IRIRefToken";
import { getIRIToken } from "../../tokens/IRIToken";
import { LiteralToken } from "../../tokens/LiteralToken";
import { RDFLiteralToken } from "../../tokens/RDFLiteralToken";
import { ValuesToken } from "../../tokens/ValuesToken";

import { XSD } from "../../utils/XSD";

import { Literal } from "../triplePatterns/Literal";
import { Resource } from "../triplePatterns/Resource";

import { SingleValuesPattern, SingleValuesPatternMore } from "./SingleValuesPattern";


describe( "SingleValuesPattern", () => {

	it( "should exists", () => {
		expect( SingleValuesPattern ).toBeDefined();
		expect( SingleValuesPattern ).toEqual( jasmine.any( Object ) );
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


	describe( "SingleValuesPattern.createFrom", () => {

		it( "should exists", () => {
			expect( SingleValuesPattern.createFrom ).toBeDefined();
			expect( SingleValuesPattern.createFrom ).toEqual( jasmine.any( Function ) );
		} );


		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const triplePattern:SingleValuesPattern = SingleValuesPattern
				.createFrom( container, myObject );

			expect( myObject ).toBe( triplePattern );
		} );

		it( "should create a SingleValuesPattern object", () => {
			const triplePattern:SingleValuesPattern = SingleValuesPattern
				.createFrom( container, {} );

			expect( triplePattern ).toEqual( {
				has: jasmine.any( Function ),

				// Inherit
				getPattern: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "SingleValuesPattern.has", () => {

		let pattern:SingleValuesPattern;
		beforeEach( () => {
			pattern = SingleValuesPattern.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( pattern.has ).toBeDefined();
			expect( pattern.has ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return a SingleValuesPatternMore", () => {
			const returned:SingleValuesPatternMore = pattern.has( "val" );
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

		it( "should add string value", () => {
			pattern.has( "val" );

			const newContainer:Container<ValuesToken> = spyContainers.getLast();
			expect( newContainer.targetToken.values )
				.toContain( [ new LiteralToken( "val" ) ] );
		} );

		it( "should add number value", () => {
			pattern.has( 10 );

			const newContainer:Container<ValuesToken> = spyContainers.getLast();
			expect( newContainer.targetToken.values )
				.toContain( [ new LiteralToken( 10 ) ] );
		} );

		it( "should add Date value", () => {
			const date:Date = new Date();
			pattern.has( date );

			const newContainer:Container<ValuesToken> = spyContainers.getLast();
			expect( newContainer.targetToken.values )
				.toContain( [ new RDFLiteralToken( date.toISOString(), getIRIToken( XSD.dateTime ) ) ] );
		} );

		it( "should add Resource value", () => {
			pattern.has( getResource( "resource/" ) );

			const newContainer:Container<ValuesToken> = spyContainers.getLast();
			expect( newContainer.targetToken.values )
				.toContain( [ new IRIRefToken( "resource/" ) ] );
		} );

		it( "should add Literal value", () => {
			pattern.has( getLiteral( "value" ) );

			const newContainer:Container<ValuesToken> = spyContainers.getLast();
			expect( newContainer.targetToken.values )
				.toContain( [ new LiteralToken( "value" ) ] );
		} );

		it( "should add UNDEF value", () => {
			pattern.has( "UNDEF" );

			const newContainer:Container<ValuesToken> = spyContainers.getLast();
			expect( newContainer.targetToken.values )
				.toContain( [ "UNDEF" ] );
		} );

	} );

} );

describe( "SingleValuesPatternMore", () => {

	it( "should exists", () => {
		expect( SingleValuesPatternMore ).toBeDefined();
		expect( SingleValuesPatternMore ).toEqual( jasmine.any( Object ) );
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


	describe( "SingleValuesPatternMore.createFrom", () => {

		it( "should exists", () => {
			expect( SingleValuesPatternMore.createFrom ).toBeDefined();
			expect( SingleValuesPatternMore.createFrom ).toEqual( jasmine.any( Function ) );
		} );


		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const triplePattern:SingleValuesPatternMore = SingleValuesPatternMore
				.createFrom( container, myObject );

			expect( myObject ).toBe( triplePattern );
		} );

		it( "should create a SingleValuesPatternMore object", () => {
			const triplePattern:SingleValuesPatternMore = SingleValuesPatternMore
				.createFrom( container, {} );

			expect( triplePattern ).toEqual( {
				and: jasmine.any( Function ),

				// Inherit
				getPattern: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "SingleValuesPatternMore.and", () => {

		let pattern:SingleValuesPatternMore;
		beforeEach( () => {
			pattern = SingleValuesPatternMore.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( pattern.and ).toBeDefined();
			expect( pattern.and ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return a SingleValuesPatternMore", () => {
			const returned:SingleValuesPatternMore = pattern.and( "val" );
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

		it( "should add string value", () => {
			pattern.and( "val" );

			const newContainer:Container<ValuesToken> = spyContainers.getLast();
			expect( newContainer.targetToken.values )
				.toContain( [ new LiteralToken( "val" ) ] );
		} );

		it( "should add number value", () => {
			pattern.and( 10 );

			const newContainer:Container<ValuesToken> = spyContainers.getLast();
			expect( newContainer.targetToken.values )
				.toContain( [ new LiteralToken( 10 ) ] );
		} );

		it( "should add Date value", () => {
			const date:Date = new Date();
			pattern.and( date );

			const newContainer:Container<ValuesToken> = spyContainers.getLast();
			expect( newContainer.targetToken.values )
				.toContain( [ new RDFLiteralToken( date.toISOString(), getIRIToken( XSD.dateTime ) ) ] );
		} );

		it( "should add Resource value", () => {
			pattern.and( getResource( "resource/" ) );

			const newContainer:Container<ValuesToken> = spyContainers.getLast();
			expect( newContainer.targetToken.values )
				.toContain( [ new IRIRefToken( "resource/" ) ] );
		} );

		it( "should add Literal value", () => {
			pattern.and( getLiteral( "value" ) );

			const newContainer:Container<ValuesToken> = spyContainers.getLast();
			expect( newContainer.targetToken.values )
				.toContain( [ new LiteralToken( "value" ) ] );
		} );

		it( "should add UNDEF value", () => {
			pattern.and( "UNDEF" );

			const newContainer:Container<ValuesToken> = spyContainers.getLast();
			expect( newContainer.targetToken.values )
				.toContain( [ "UNDEF" ] );
		} );

	} );

} );
