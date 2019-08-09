import { Container } from "../../data/Container";
import { IRIResolver } from "../../data/IRIResolver";

import { XSD } from "../../utils/XSD";

import { SupportedNativeTypes } from "../SupportedNativeTypes";

import { TriplePatternsBuilder } from "../triplePatterns/TriplePatternsBuilder";

import { Expression } from "./Expression";
import { FunctionExpression } from "./FunctionExpression";
import { FunctionExpressionsBuilder } from "./FunctionExpressionsBuilder";


type GenericFn = ( ...expressions:(Expression | SupportedNativeTypes)[] ) => FunctionExpression;

describe( "FunctionExpressionsBuilder", () => {

	it( "should exists", () => {
		expect( FunctionExpressionsBuilder ).toBeDefined();
		expect( FunctionExpressionsBuilder ).toEqual( jasmine.any( Object ) );
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


	describe( "FunctionExpressionsBuilder.createFrom", () => {

		it( "should exists", () => {
			expect( FunctionExpressionsBuilder.createFrom ).toBeDefined();
			expect( FunctionExpressionsBuilder.createFrom ).toEqual( jasmine.any( Function ) );
		} );

		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const finishPattern:FunctionExpressionsBuilder = FunctionExpressionsBuilder
				.createFrom( container, myObject );

			expect( myObject ).toBe( finishPattern );
		} );


		it( "should create a FunctionExpressionsBuilder object", () => {
			const finishPattern:FunctionExpressionsBuilder = FunctionExpressionsBuilder
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
				customDistinct: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "FunctionExpressionsBuilder.bound", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.bound ).toBeDefined();
			expect( builder.bound ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using variable", () => {
			const variable = triplesBuilder.var( "foo" );

			const expression = builder.bound( variable );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "BOUND( ?foo )" );
		} );

		it( "should create function using string variable", () => {
			const expression = builder.bound( "foo" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "BOUND( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.bound as GenericFn)( "foo", "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "BOUND( ?foo )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.if", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.if ).toBeDefined();
			expect( builder.if ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using expression & triples", () => {
			const expression = builder.if( builder.bound( "foo" ), triplesBuilder.resource( "ex:resource" ), triplesBuilder.literal( false ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "IF( BOUND( ?foo ), ex:resource, false )" );
		} );

		it( "should create function using expression & natives", () => {
			const expression = builder.if( builder.bound( "foo" ), "ex:resource", false );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "IF( BOUND( ?foo ), ex:resource, false )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.if as GenericFn)( builder.bound( "foo" ), "ex:resource", false, "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "IF( BOUND( ?foo ), ex:resource, false )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.coalesce", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.coalesce ).toBeDefined();
			expect( builder.coalesce ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using expression, triples & natives", () => {
			const expression = builder.coalesce( builder.bound( "foo" ), triplesBuilder.resource( "ex:resource-1" ), "ex:resource-2", false, triplesBuilder.literal( "value" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "COALESCE( BOUND( ?foo ), ex:resource-1, ex:resource-2, false, \"value\" )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.exists", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.exists ).toBeDefined();
			expect( builder.exists ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function with empty pattern", () => {
			const expression = builder.exists();
			expect( expression.getExpression().toString( 0 ) ).toEqual( "EXISTS {}" );
		} );

		it( "should create function using single pattern", () => {
			const expression = builder.exists( triplesBuilder.resource( "ex:resource-1" ).has( "ex:property-1", false ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "EXISTS { ex:resource-1 ex:property-1 false }" );
		} );

		it( "should create function using multiple inline pattern", () => {
			const expression = builder.exists(
				triplesBuilder.resource( "ex:resource-1" ).has( "ex:property-1", false ),
				triplesBuilder.resource( "ex:resource-2" ).has( "ex:property-2", "value" )
			);

			expect( expression.getExpression().toString() ).toEqual( "EXISTS { " +
				"ex:resource-1 ex:property-1 false. " +
				"ex:resource-2 ex:property-2 \"value\" " +
				"}" );
		} );

		it( "should create function using multiple array pattern", () => {
			const expression = builder.exists( [
				triplesBuilder.resource( "ex:resource-1" ).has( "ex:property-1", false ),
				triplesBuilder.resource( "ex:resource-2" ).has( "ex:property-2", "value" ),
			] );


			expect( expression.getExpression().toString() ).toEqual( "EXISTS { " +
				"ex:resource-1 ex:property-1 false. " +
				"ex:resource-2 ex:property-2 \"value\" " +
				"}" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.notExists", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.notExists ).toBeDefined();
			expect( builder.notExists ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function with empty pattern", () => {
			const expression = builder.notExists();
			expect( expression.getExpression().toString( 0 ) ).toEqual( "NOT EXISTS {}" );
		} );

		it( "should create function using single pattern", () => {
			const expression = builder.notExists( triplesBuilder.resource( "ex:resource-1" ).has( "ex:property-1", false ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "NOT EXISTS { ex:resource-1 ex:property-1 false }" );
		} );

		it( "should create function using multiple inline pattern", () => {
			const expression = builder.notExists(
				triplesBuilder.resource( "ex:resource-1" ).has( "ex:property-1", false ),
				triplesBuilder.resource( "ex:resource-2" ).has( "ex:property-2", "value" )
			);

			expect( expression.getExpression().toString() ).toEqual( "NOT EXISTS { " +
				"ex:resource-1 ex:property-1 false. " +
				"ex:resource-2 ex:property-2 \"value\" " +
				"}" );
		} );

		it( "should create function using multiple array pattern", () => {
			const expression = builder.notExists( [
				triplesBuilder.resource( "ex:resource-1" ).has( "ex:property-1", false ),
				triplesBuilder.resource( "ex:resource-2" ).has( "ex:property-2", "value" ),
			] );


			expect( expression.getExpression().toString() ).toEqual( "NOT EXISTS { " +
				"ex:resource-1 ex:property-1 false. " +
				"ex:resource-2 ex:property-2 \"value\" " +
				"}" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.sameTerm", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.sameTerm ).toBeDefined();
			expect( builder.sameTerm ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.sameTerm( triplesBuilder.var( "foo" ), triplesBuilder.literal( "value" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "sameTerm( ?foo, \"value\" )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.sameTerm( "foo", "value" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "sameTerm( \"foo\", \"value\" )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.sameTerm as GenericFn)( "foo", "value", "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "sameTerm( \"foo\", \"value\" )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.isIRI", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.isIRI ).toBeDefined();
			expect( builder.isIRI ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.isIRI( triplesBuilder.var( "foo" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "isIRI( ?foo )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.isIRI( "ex:resource" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "isIRI( ex:resource )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.isIRI as GenericFn)( "ex:resource", "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "isIRI( ex:resource )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.isURI", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.isURI ).toBeDefined();
			expect( builder.isURI ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.isURI( triplesBuilder.var( "foo" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "isURI( ?foo )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.isURI( "ex:resource" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "isURI( ex:resource )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.isURI as GenericFn)( "ex:resource", "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "isURI( ex:resource )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.isBlank", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.isBlank ).toBeDefined();
			expect( builder.isBlank ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.isBlank( triplesBuilder.var( "foo" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "isBLANK( ?foo )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.isBlank( "value" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "isBLANK( \"value\" )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.isBlank as GenericFn)( "value", "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "isBLANK( \"value\" )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.isLiteral", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.isLiteral ).toBeDefined();
			expect( builder.isLiteral ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.isLiteral( triplesBuilder.var( "foo" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "isLITERAL( ?foo )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.isLiteral( "value" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "isLITERAL( \"value\" )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.isLiteral as GenericFn)( "value" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "isLITERAL( \"value\" )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.isNumeric", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.isNumeric ).toBeDefined();
			expect( builder.isNumeric ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.isNumeric( triplesBuilder.var( "foo" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "isNUMERIC( ?foo )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.isNumeric( 1.10 );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "isNUMERIC( 1.1 )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.isNumeric as GenericFn)( 1.10, "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "isNUMERIC( 1.1 )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.str", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.str ).toBeDefined();
			expect( builder.str ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.str( triplesBuilder.var( "foo" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "STR( ?foo )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.str( "ex:resource" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "STR( ex:resource )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.str as GenericFn)( "ex:resource", "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "STR( ex:resource )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.lang", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.lang ).toBeDefined();
			expect( builder.lang ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.lang( triplesBuilder.literal( "hello" ).withLanguage( "en" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "LANG( \"hello\"@en )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.lang( "value" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "LANG( \"value\" )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.lang as GenericFn)( "value", "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "LANG( \"value\" )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.datatype", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.datatype ).toBeDefined();
			expect( builder.datatype ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.datatype( triplesBuilder.literal( "1" ).withType( XSD.integer ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "DATATYPE( \"1\"^^<http://www.w3.org/2001/XMLSchema#integer> )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.datatype( "value" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "DATATYPE( \"value\" )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.datatype as GenericFn)( "value", "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "DATATYPE( \"value\" )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.iri", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.iri ).toBeDefined();
			expect( builder.iri ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.iri( triplesBuilder.literal( "ex:resource" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "IRI( \"ex:resource\" )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.iri( "value" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "IRI( \"value\" )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.iri as GenericFn)( "value", "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "IRI( \"value\" )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.uri", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.uri ).toBeDefined();
			expect( builder.uri ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.uri( triplesBuilder.literal( "ex:resource" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "URI( \"ex:resource\" )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.uri( "value" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "URI( \"value\" )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.uri as GenericFn)( "value", "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "URI( \"value\" )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.bnode", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.bnode ).toBeDefined();
			expect( builder.bnode ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.bnode( triplesBuilder.literal( "label" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "BNODE( \"label\" )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.bnode( "label" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "BNODE( \"label\" )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.bnode as GenericFn)( "label", "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "BNODE( \"label\" )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.strDT", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.strDT ).toBeDefined();
			expect( builder.strDT ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.strDT( triplesBuilder.literal( "123" ), triplesBuilder.resource( XSD.integer ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "STRDT( \"123\", <http://www.w3.org/2001/XMLSchema#integer> )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.strDT( "123", XSD.integer );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "STRDT( \"123\", <http://www.w3.org/2001/XMLSchema#integer> )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.strDT as GenericFn)( "123", XSD.integer, "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "STRDT( \"123\", <http://www.w3.org/2001/XMLSchema#integer> )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.strLang", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.strLang ).toBeDefined();
			expect( builder.strLang ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.strLang( triplesBuilder.literal( "hello" ), triplesBuilder.literal( "en" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "STRLANG( \"hello\", \"en\" )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.strLang( "hello", "en" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "STRLANG( \"hello\", \"en\" )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.strLang as GenericFn)( "hello", "en", "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "STRLANG( \"hello\", \"en\" )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.uuid", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.uuid ).toBeDefined();
			expect( builder.uuid ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const expression = builder.uuid();
			expect( expression.getExpression().toString( 0 ) ).toEqual( "UUID()" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.uuid as GenericFn)( "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "UUID()" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.strUUID", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.strUUID ).toBeDefined();
			expect( builder.strUUID ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const expression = builder.strUUID();
			expect( expression.getExpression().toString( 0 ) ).toEqual( "STRUUID()" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.strUUID as GenericFn)( "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "STRUUID()" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.strLen", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.strLen ).toBeDefined();
			expect( builder.strLen ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.strLen( triplesBuilder.literal( "hello" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "STRLEN( \"hello\" )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.strLen( "hello" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "STRLEN( \"hello\" )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.strLen as GenericFn)( "hello", "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "STRLEN( \"hello\" )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.substr", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.substr ).toBeDefined();
			expect( builder.substr ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.substr( triplesBuilder.literal( "hello" ), triplesBuilder.literal( 4 ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "SUBSTR( \"hello\", 4 )" );
		} );

		it( "should create function with length using triples", () => {
			const expression = builder.substr( triplesBuilder.literal( "hello" ), triplesBuilder.literal( 4 ), triplesBuilder.literal( 1 ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "SUBSTR( \"hello\", 4, 1 )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.substr( "hello", 4 );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "SUBSTR( \"hello\", 4 )" );
		} );

		it( "should create function with length using natives", () => {
			const expression = builder.substr( "hello", 4, 1 );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "SUBSTR( \"hello\", 4, 1 )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.substr as GenericFn)( "hello", 4, 1, "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "SUBSTR( \"hello\", 4, 1 )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.uCase", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.uCase ).toBeDefined();
			expect( builder.uCase ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.uCase( triplesBuilder.literal( "hello" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "UCASE( \"hello\" )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.uCase( "hello" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "UCASE( \"hello\" )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.uCase as GenericFn)( "hello", "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "UCASE( \"hello\" )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.lCase", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.lCase ).toBeDefined();
			expect( builder.lCase ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.lCase( triplesBuilder.literal( "hello" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "LCASE( \"hello\" )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.lCase( "hello" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "LCASE( \"hello\" )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.lCase as GenericFn)( "hello", "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "LCASE( \"hello\" )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.strStarts", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.strStarts ).toBeDefined();
			expect( builder.strStarts ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.strStarts( triplesBuilder.literal( "hello" ), triplesBuilder.literal( "hell" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "STRSTARTS( \"hello\", \"hell\" )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.strStarts( "hello", "hell" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "STRSTARTS( \"hello\", \"hell\" )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.strStarts as GenericFn)( "hello", "hell", "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "STRSTARTS( \"hello\", \"hell\" )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.strEnds", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.strEnds ).toBeDefined();
			expect( builder.strEnds ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.strEnds( triplesBuilder.literal( "hello" ), triplesBuilder.literal( "hell" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "STRENDS( \"hello\", \"hell\" )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.strEnds( "hello", "hell" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "STRENDS( \"hello\", \"hell\" )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.strEnds as GenericFn)( "hello", "hell", "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "STRENDS( \"hello\", \"hell\" )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.contains", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.contains ).toBeDefined();
			expect( builder.contains ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.contains( triplesBuilder.literal( "hello" ), triplesBuilder.literal( "el" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "CONTAINS( \"hello\", \"el\" )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.contains( "hello", "el" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "CONTAINS( \"hello\", \"el\" )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.contains as GenericFn)( "hello", "el", "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "CONTAINS( \"hello\", \"el\" )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.strBefore", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.strBefore ).toBeDefined();
			expect( builder.strBefore ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.strBefore( triplesBuilder.literal( "hello" ), triplesBuilder.literal( "el" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "STRBEFORE( \"hello\", \"el\" )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.strBefore( "hello", "el" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "STRBEFORE( \"hello\", \"el\" )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.strBefore as GenericFn)( "hello", "el", "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "STRBEFORE( \"hello\", \"el\" )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.strAfter", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.strAfter ).toBeDefined();
			expect( builder.strAfter ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.strAfter( triplesBuilder.literal( "hello" ), triplesBuilder.literal( "el" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "STRAFTER( \"hello\", \"el\" )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.strAfter( "hello", "el" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "STRAFTER( \"hello\", \"el\" )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.strAfter as GenericFn)( "hello", "el", "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "STRAFTER( \"hello\", \"el\" )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.encodeForUri", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.encodeForUri ).toBeDefined();
			expect( builder.encodeForUri ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.encodeForUri( triplesBuilder.literal( "some value" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "ENCODE_FOR_URI( \"some value\" )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.encodeForUri( "some value" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "ENCODE_FOR_URI( \"some value\" )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.encodeForUri as GenericFn)( "some value", "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "ENCODE_FOR_URI( \"some value\" )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.concat", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.concat ).toBeDefined();
			expect( builder.concat ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.concat( triplesBuilder.literal( "foo" ), triplesBuilder.literal( "bar" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "CONCAT( \"foo\", \"bar\" )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.concat( "foo", "bar" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "CONCAT( \"foo\", \"bar\" )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.langMatches", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.langMatches ).toBeDefined();
			expect( builder.langMatches ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.langMatches( triplesBuilder.literal( "foo" ).withLanguage( "fr-BE" ), triplesBuilder.literal( "fr" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "LANGMATCHES( \"foo\"@fr-BE, \"fr\" )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.langMatches( triplesBuilder.literal( "foo" ).withLanguage( "fr-BE" ), "fr" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "LANGMATCHES( \"foo\"@fr-BE, \"fr\" )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.langMatches as GenericFn)( triplesBuilder.literal( "foo" ).withLanguage( "fr-BE" ), "fr", "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "LANGMATCHES( \"foo\"@fr-BE, \"fr\" )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.regex", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.regex ).toBeDefined();
			expect( builder.regex ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.regex( triplesBuilder.var( "Foo" ), triplesBuilder.literal( "^Foo" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "REGEX( ?Foo, \"^Foo\" )" );
		} );

		it( "should create function with flag using triples", () => {
			const expression = builder.regex( triplesBuilder.var( "Foo" ), triplesBuilder.literal( "^foo" ), triplesBuilder.literal( "i" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "REGEX( ?Foo, \"^foo\", \"i\" )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.regex( triplesBuilder.var( "Foo" ), "^Foo" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "REGEX( ?Foo, \"^Foo\" )" );
		} );

		it( "should create function with flag using natives", () => {
			const expression = builder.regex( triplesBuilder.var( "Foo" ), "^foo", "i" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "REGEX( ?Foo, \"^foo\", \"i\" )" );
		} );

		it( "should create function using regex", () => {
			const expression = builder.regex( triplesBuilder.var( "Foo" ), /^Foo/ );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "REGEX( ?Foo, \"^Foo\" )" );
		} );

		it( "should create function using regex with flags", () => {
			const expression = builder.regex( triplesBuilder.var( "Foo" ), /^foo/i );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "REGEX( ?Foo, \"^foo\", \"i\" )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.regex as GenericFn)( triplesBuilder.var( "Foo" ), "^foo", "i", "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "REGEX( ?Foo, \"^foo\", \"i\" )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.replace", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.replace ).toBeDefined();
			expect( builder.replace ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.replace( triplesBuilder.var( "Bar" ), triplesBuilder.literal( "r" ), triplesBuilder.literal( "z" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "REPLACE( ?Bar, \"r\", \"z\" )" );
		} );

		it( "should create function with flag using triples", () => {
			const expression = builder.replace( triplesBuilder.var( "Bar" ), triplesBuilder.literal( "R" ), triplesBuilder.literal( "z" ), triplesBuilder.literal( "i" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "REPLACE( ?Bar, \"R\", \"z\", \"i\" )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.replace( triplesBuilder.var( "Bar" ), "r", "z" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "REPLACE( ?Bar, \"r\", \"z\" )" );
		} );

		it( "should create function with flag using natives", () => {
			const expression = builder.replace( triplesBuilder.var( "Bar" ), "R", "z", "i" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "REPLACE( ?Bar, \"R\", \"z\", \"i\" )" );
		} );

		it( "should create function using regex", () => {
			const expression = builder.replace( triplesBuilder.var( "Bar" ), /r/, "z" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "REPLACE( ?Bar, \"r\", \"z\" )" );
		} );

		it( "should create function using regex with flags", () => {
			const expression = builder.replace( triplesBuilder.var( "Bar" ), /R/i, "z" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "REPLACE( ?Bar, \"R\", \"z\", \"i\" )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.replace as GenericFn)( triplesBuilder.var( "Bar" ), "R", "z", "i", "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "REPLACE( ?Bar, \"R\", \"z\", \"i\" )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.abs", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.abs ).toBeDefined();
			expect( builder.abs ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.abs( triplesBuilder.literal( -1.5 ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "ABS( -1.5 )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.abs( -1.5 );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "ABS( -1.5 )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.abs as GenericFn)( -1.5, "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "ABS( -1.5 )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.round", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.round ).toBeDefined();
			expect( builder.round ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.round( triplesBuilder.literal( 1.5 ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "ROUND( 1.5 )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.round( 1.5 );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "ROUND( 1.5 )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.round as GenericFn)( 1.5, "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "ROUND( 1.5 )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.ceil", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.ceil ).toBeDefined();
			expect( builder.ceil ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.ceil( triplesBuilder.literal( 1.5 ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "CEIL( 1.5 )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.ceil( 1.5 );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "CEIL( 1.5 )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.ceil as GenericFn)( 1.5, "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "CEIL( 1.5 )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.floor", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.floor ).toBeDefined();
			expect( builder.floor ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.floor( triplesBuilder.literal( 1.5 ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "FLOOR( 1.5 )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.floor( 1.5 );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "FLOOR( 1.5 )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.floor as GenericFn)( 1.5, "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "FLOOR( 1.5 )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.rand", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.rand ).toBeDefined();
			expect( builder.rand ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const expression = builder.rand();
			expect( expression.getExpression().toString( 0 ) ).toEqual( "RAND()" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.rand as GenericFn)( "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "RAND()" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.now", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.now ).toBeDefined();
			expect( builder.now ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const expression = builder.now();
			expect( expression.getExpression().toString( 0 ) ).toEqual( "NOW()" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.now as GenericFn)( "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "NOW()" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.year", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.year ).toBeDefined();
			expect( builder.year ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.year( triplesBuilder.literal( "2011-01-10T14:45:13.815-05:00" ).withType( XSD.dateTime ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "YEAR( \"2011-01-10T14:45:13.815-05:00\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.year( new Date( "2011-01-10T14:45:13.815-05:00" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "YEAR( \"2011-01-10T19:45:13.815Z\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.year as GenericFn)( new Date( "2011-01-10T14:45:13.815-05:00" ), "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "YEAR( \"2011-01-10T19:45:13.815Z\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.month", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.month ).toBeDefined();
			expect( builder.month ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.month( triplesBuilder.literal( "2011-01-10T14:45:13.815-05:00" ).withType( XSD.dateTime ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "MONTH( \"2011-01-10T14:45:13.815-05:00\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.month( new Date( "2011-01-10T14:45:13.815-05:00" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "MONTH( \"2011-01-10T19:45:13.815Z\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.month as GenericFn)( new Date( "2011-01-10T14:45:13.815-05:00" ), "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "MONTH( \"2011-01-10T19:45:13.815Z\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.day", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.day ).toBeDefined();
			expect( builder.day ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.day( triplesBuilder.literal( "2011-01-10T14:45:13.815-05:00" ).withType( XSD.dateTime ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "DAY( \"2011-01-10T14:45:13.815-05:00\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.day( new Date( "2011-01-10T14:45:13.815-05:00" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "DAY( \"2011-01-10T19:45:13.815Z\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.day as GenericFn)( new Date( "2011-01-10T14:45:13.815-05:00" ), "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "DAY( \"2011-01-10T19:45:13.815Z\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.hours", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.hours ).toBeDefined();
			expect( builder.hours ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.hours( triplesBuilder.literal( "2011-01-10T14:45:13.815-05:00" ).withType( XSD.dateTime ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "HOURS( \"2011-01-10T14:45:13.815-05:00\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.hours( new Date( "2011-01-10T14:45:13.815-05:00" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "HOURS( \"2011-01-10T19:45:13.815Z\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.hours as GenericFn)( new Date( "2011-01-10T14:45:13.815-05:00" ), "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "HOURS( \"2011-01-10T19:45:13.815Z\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.minutes", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.minutes ).toBeDefined();
			expect( builder.minutes ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.minutes( triplesBuilder.literal( "2011-01-10T14:45:13.815-05:00" ).withType( XSD.dateTime ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "MINUTES( \"2011-01-10T14:45:13.815-05:00\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.minutes( new Date( "2011-01-10T14:45:13.815-05:00" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "MINUTES( \"2011-01-10T19:45:13.815Z\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.minutes as GenericFn)( new Date( "2011-01-10T14:45:13.815-05:00" ), "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "MINUTES( \"2011-01-10T19:45:13.815Z\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.seconds", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.seconds ).toBeDefined();
			expect( builder.seconds ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.seconds( triplesBuilder.literal( "2011-01-10T14:45:13.815-05:00" ).withType( XSD.dateTime ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "SECONDS( \"2011-01-10T14:45:13.815-05:00\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.seconds( new Date( "2011-01-10T14:45:13.815-05:00" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "SECONDS( \"2011-01-10T19:45:13.815Z\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.seconds as GenericFn)( new Date( "2011-01-10T14:45:13.815-05:00" ), "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "SECONDS( \"2011-01-10T19:45:13.815Z\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.timezone", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.timezone ).toBeDefined();
			expect( builder.timezone ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.timezone( triplesBuilder.literal( "2011-01-10T14:45:13.815-05:00" ).withType( XSD.dateTime ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "TIMEZONE( \"2011-01-10T14:45:13.815-05:00\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.timezone( new Date( "2011-01-10T14:45:13.815-05:00" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "TIMEZONE( \"2011-01-10T19:45:13.815Z\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.timezone as GenericFn)( new Date( "2011-01-10T14:45:13.815-05:00" ), "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "TIMEZONE( \"2011-01-10T19:45:13.815Z\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.tz", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.tz ).toBeDefined();
			expect( builder.tz ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.tz( triplesBuilder.literal( "2011-01-10T14:45:13.815-05:00" ).withType( XSD.dateTime ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "TZ( \"2011-01-10T14:45:13.815-05:00\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.tz( new Date( "2011-01-10T14:45:13.815-05:00" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "TZ( \"2011-01-10T19:45:13.815Z\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.tz as GenericFn)( new Date( "2011-01-10T14:45:13.815-05:00" ), "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "TZ( \"2011-01-10T19:45:13.815Z\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.md5", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.md5 ).toBeDefined();
			expect( builder.md5 ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.md5( triplesBuilder.literal( "abc" ).withType( XSD.string ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "MD5( \"abc\"^^<http://www.w3.org/2001/XMLSchema#string> )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.md5( "abc" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "MD5( \"abc\" )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.md5 as GenericFn)( "abc", "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "MD5( \"abc\" )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.sha1", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.sha1 ).toBeDefined();
			expect( builder.sha1 ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.sha1( triplesBuilder.literal( "abc" ).withType( XSD.string ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "SHA1( \"abc\"^^<http://www.w3.org/2001/XMLSchema#string> )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.sha1( "abc" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "SHA1( \"abc\" )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.sha1 as GenericFn)( "abc", "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "SHA1( \"abc\" )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.sha256", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.sha256 ).toBeDefined();
			expect( builder.sha256 ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.sha256( triplesBuilder.literal( "abc" ).withType( XSD.string ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "SHA256( \"abc\"^^<http://www.w3.org/2001/XMLSchema#string> )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.sha256( "abc" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "SHA256( \"abc\" )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.sha256 as GenericFn)( "abc", "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "SHA256( \"abc\" )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.sha384", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.sha384 ).toBeDefined();
			expect( builder.sha384 ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.sha384( triplesBuilder.literal( "abc" ).withType( XSD.string ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "SHA384( \"abc\"^^<http://www.w3.org/2001/XMLSchema#string> )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.sha384( "abc" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "SHA384( \"abc\" )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.sha384 as GenericFn)( "abc", "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "SHA384( \"abc\" )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.sha512", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.sha512 ).toBeDefined();
			expect( builder.sha512 ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const expression = builder.sha512( triplesBuilder.literal( "abc" ).withType( XSD.string ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "SHA512( \"abc\"^^<http://www.w3.org/2001/XMLSchema#string> )" );
		} );

		it( "should create function using natives", () => {
			const expression = builder.sha512( "abc" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "SHA512( \"abc\" )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.sha512 as GenericFn)( "abc", "extra" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "SHA512( \"abc\" )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.custom", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.custom ).toBeDefined();
			expect( builder.custom ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create empty function with native IRI string", () => {
			const expression = builder.custom( "https://example.com/ns#customFn" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "<https://example.com/ns#customFn>()" );
		} );

		it( "should create empty function with native Prefixed string", () => {
			const expression = builder.custom( "ex:customFn" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "ex:customFn()" );
		} );

		it( "should create empty function with IRI resource", () => {
			const expression = builder.custom( triplesBuilder.resource( "https://example.com/ns#customFn" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "<https://example.com/ns#customFn>()" );
		} );

		it( "should create empty function with Prefixed resource", () => {
			const expression = builder.custom( triplesBuilder.resource( "ex:customFn" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "ex:customFn()" );
		} );

		it( "should create function using two triples", () => {
			const expression = builder.custom( "ex:customFn", triplesBuilder.var( "foo" ), triplesBuilder.literal( "abc" ).withType( XSD.string ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "ex:customFn( ?foo, \"abc\"^^<http://www.w3.org/2001/XMLSchema#string> )" );
		} );

		it( "should create function using two natives", () => {
			const expression = builder.custom( "ex:customFn", "ex:resource", "abc" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "ex:customFn( ex:resource, \"abc\" )" );
		} );

	} );

	describe( "FunctionExpressionsBuilder.customDistinct", () => {

		let builder:FunctionExpressionsBuilder;
		beforeEach( () => {
			builder = FunctionExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.customDistinct ).toBeDefined();
			expect( builder.customDistinct ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create empty function with native IRI string", () => {
			const expression = builder.customDistinct( "https://example.com/ns#customFn" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "<https://example.com/ns#customFn>()" );
		} );

		it( "should create empty function with native Prefixed string", () => {
			const expression = builder.customDistinct( "ex:customFn" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "ex:customFn()" );
		} );

		it( "should create empty function with IRI resource", () => {
			const expression = builder.customDistinct( triplesBuilder.resource( "https://example.com/ns#customFn" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "<https://example.com/ns#customFn>()" );
		} );

		it( "should create empty function with Prefixed resource", () => {
			const expression = builder.customDistinct( triplesBuilder.resource( "ex:customFn" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "ex:customFn()" );
		} );

		it( "should create function using two triples", () => {
			const expression = builder.customDistinct( "ex:customFn", triplesBuilder.var( "foo" ), triplesBuilder.literal( "abc" ).withType( XSD.string ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "ex:customFn( DISTINCT ?foo, \"abc\"^^<http://www.w3.org/2001/XMLSchema#string> )" );
		} );

		it( "should create function using two natives", () => {
			const expression = builder.customDistinct( "ex:customFn", "ex:resource", "abc" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "ex:customFn( DISTINCT ex:resource, \"abc\" )" );
		} );

	} );

} );