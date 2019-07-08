import { Container } from "../../../data/Container";
import { IRIResolver } from "../../../data/IRIResolver";
import { TriplePatternsBuilder } from "../../triplePatterns/TriplePatternsBuilder";
import { FunctionsBuilder } from "./FunctionsBuilder";

describe( "FunctionsBuilder", () => {

	it( "should exists", () => {
		expect( FunctionsBuilder ).toBeDefined();
		expect( FunctionsBuilder ).toEqual( jasmine.any( Object ) );
	} );

	let container:Container<undefined>;
	let triplesBuilder:TriplePatternsBuilder;
	beforeEach( () => {
		const iriResolver:IRIResolver = new IRIResolver();
		iriResolver.prefixes.set( "ex", false );

		container = new Container( {
			iriResolver: iriResolver,
			targetToken: void 0,
		} );

		triplesBuilder = TriplePatternsBuilder
			.createFrom( container, {} );
	} );


	describe( "FunctionsBuilder.createFrom", () => {

		it( "should exists", () => {
			expect( FunctionsBuilder.createFrom ).toBeDefined();
			expect( FunctionsBuilder.createFrom ).toEqual( jasmine.any( Function ) );
		} );

		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const finishPattern:FunctionsBuilder = FunctionsBuilder
				.createFrom( container, myObject );

			expect( myObject ).toBe( finishPattern );
		} );


		it( "should create a FunctionsBuilder object", () => {
			const finishPattern:FunctionsBuilder = FunctionsBuilder
				.createFrom( container, {} );

			expect( finishPattern ).toEqual( {
				bound: jasmine.any( Function ),
				if: jasmine.any( Function ),
				coalesce: jasmine.any( Function ),
				exists: jasmine.any( Function ),
				notExists: jasmine.any( Function ),
				sameTerm: jasmine.any( Function ),
				isIRI: jasmine.any( Function ),
				isURI: jasmine.any( Function ),
				isBlank: jasmine.any( Function ),
				isLiteral: jasmine.any( Function ),
				isNumeric: jasmine.any( Function ),
				str: jasmine.any( Function ),
				lang: jasmine.any( Function ),
				datatype: jasmine.any( Function ),
				iri: jasmine.any( Function ),
				uri: jasmine.any( Function ),
				bnode: jasmine.any( Function ),
				strDT: jasmine.any( Function ),
				strLang: jasmine.any( Function ),
				uuid: jasmine.any( Function ),
				strUUID: jasmine.any( Function ),
				strLen: jasmine.any( Function ),
				substr: jasmine.any( Function ),
				uCase: jasmine.any( Function ),
				lCase: jasmine.any( Function ),
				strStarts: jasmine.any( Function ),
				strEnds: jasmine.any( Function ),
				contains: jasmine.any( Function ),
				strBefore: jasmine.any( Function ),
				strAfter: jasmine.any( Function ),
				encodeForUri: jasmine.any( Function ),
				concat: jasmine.any( Function ),
				langMatches: jasmine.any( Function ),
				regex: jasmine.any( Function ),
				replace: jasmine.any( Function ),
				abs: jasmine.any( Function ),
				round: jasmine.any( Function ),
				ceil: jasmine.any( Function ),
				floor: jasmine.any( Function ),
				rand: jasmine.any( Function ),
				now: jasmine.any( Function ),
				year: jasmine.any( Function ),
				month: jasmine.any( Function ),
				day: jasmine.any( Function ),
				hours: jasmine.any( Function ),
				minutes: jasmine.any( Function ),
				seconds: jasmine.any( Function ),
				timezone: jasmine.any( Function ),
				tz: jasmine.any( Function ),
				md5: jasmine.any( Function ),
				sha1: jasmine.any( Function ),
				sha256: jasmine.any( Function ),
				sha384: jasmine.any( Function ),
				sha512: jasmine.any( Function ),
				custom: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "FunctionsBuilder.bound", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.bound ).toBeDefined();
			expect( builder.bound ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function with variable", () => {
			const variable = triplesBuilder.var( "foo" );

			const expression = builder.bound( variable );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "BOUND( ?foo )" )
		} );

		it( "should create function with string variable", () => {
			const expression = builder.bound( "foo" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "BOUND( ?foo )" )
		} );

	} );

	describe( "FunctionsBuilder.if", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.if ).toBeDefined();
			expect( builder.if ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function with triples", () => {
			const expression = builder.if( builder.bound( "foo" ), triplesBuilder.resource( "ex:resource"), triplesBuilder.literal( false ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "IF( BOUND( ?foo ), ex:resource, false )" )
		} );

		it( "should create function with natives", () => {
			const expression = builder.if( builder.bound( "foo" ), "ex:resource", false );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "IF( BOUND( ?foo ), ex:resource, false )" )
		} );

	} );

	describe( "FunctionsBuilder.coalesce", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.coalesce ).toBeDefined();
			expect( builder.coalesce ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function with triples & natives", () => {
			const expression = builder.coalesce( builder.bound( "foo" ), triplesBuilder.resource( "ex:resource-1"), "ex:resource-2", false, triplesBuilder.literal( "value" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "COALESCE( BOUND( ?foo ), ex:resource-1, ex:resource-2, false, \"value\" )" )
		} );

	} );

} );