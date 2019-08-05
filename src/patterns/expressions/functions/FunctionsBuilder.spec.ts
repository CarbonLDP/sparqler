import { Container } from "../../../data/Container";
import { IRIResolver } from "../../../data/IRIResolver";
import { XSD } from "../../../utils/XSD";
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


		it( "should create function using variable", () => {
			const variable = triplesBuilder.var( "foo" );

			const expression = builder.bound( variable );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "BOUND( ?foo )" );
		} );

		it( "should create function using string variable", () => {
			const expression = builder.bound( "foo" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "BOUND( ?foo )" );
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


		it( "should create function using expression & triples", () => {
			const expression = builder.if( builder.bound( "foo" ), triplesBuilder.resource( "ex:resource" ), triplesBuilder.literal( false ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "IF( BOUND( ?foo ), ex:resource, false )" );
		} );

		it( "should create function using expression & natives", () => {
			const expression = builder.if( builder.bound( "foo" ), "ex:resource", false );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "IF( BOUND( ?foo ), ex:resource, false )" );
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


		it( "should create function using expression, triples & natives", () => {
			const expression = builder.coalesce( builder.bound( "foo" ), triplesBuilder.resource( "ex:resource-1" ), "ex:resource-2", false, triplesBuilder.literal( "value" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "COALESCE( BOUND( ?foo ), ex:resource-1, ex:resource-2, false, \"value\" )" );
		} );

	} );

	describe( "FunctionsBuilder.exists", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.exists ).toBeDefined();
			expect( builder.exists ).toEqual( jasmine.any( Function ) );
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

	describe( "FunctionsBuilder.notExists", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.notExists ).toBeDefined();
			expect( builder.notExists ).toEqual( jasmine.any( Function ) );
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

	// TODO: Add tests using expressions

	describe( "FunctionsBuilder.sameTerm", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
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

	} );

	describe( "FunctionsBuilder.isIRI", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
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

	} );

	describe( "FunctionsBuilder.isURI", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
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

	} );

	describe( "FunctionsBuilder.isBlank", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
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

	} );

	describe( "FunctionsBuilder.isLiteral", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
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

	} );

	describe( "FunctionsBuilder.isNumeric", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
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

	} );

	describe( "FunctionsBuilder.str", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
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

	} );

	describe( "FunctionsBuilder.lang", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
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

	} );

	describe( "FunctionsBuilder.datatype", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
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

	} );

	describe( "FunctionsBuilder.iri", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
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

	} );

	describe( "FunctionsBuilder.uri", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
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

	} );

	describe( "FunctionsBuilder.bnode", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
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

	} );

	describe( "FunctionsBuilder.strDT", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
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

	} );

	describe( "FunctionsBuilder.strLang", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
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

	} );

	describe( "FunctionsBuilder.uuid", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.uuid ).toBeDefined();
			expect( builder.uuid ).toEqual( jasmine.any( Function ) );
		} );


		// FIXME: And remove
		xit( "should create function using triples", () => {
			const expression = (builder.uuid as any)( triplesBuilder.literal( "hello" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "UUID( \"hello\", \"en\" )" );
		} );

		it( "should create function", () => {
			const expression = builder.uuid();
			expect( expression.getExpression().toString( 0 ) ).toEqual( "UUID()" );
		} );

	} );

	describe( "FunctionsBuilder.strUUID", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
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

	} );

	describe( "FunctionsBuilder.strLen", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
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

	} );

	describe( "FunctionsBuilder.substr", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
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

	} );

	describe( "FunctionsBuilder.uCase", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
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

	} );

	describe( "FunctionsBuilder.lCase", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
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

	} );

	describe( "FunctionsBuilder.strStarts", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
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

	} );

	describe( "FunctionsBuilder.strEnds", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
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

	} );

	describe( "FunctionsBuilder.contains", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
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

	} );

	describe( "FunctionsBuilder.strBefore", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
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

	} );

	describe( "FunctionsBuilder.strAfter", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
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

	} );

	describe( "FunctionsBuilder.encodeForUri", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
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

	} );

	describe( "FunctionsBuilder.concat", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
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

	describe( "FunctionsBuilder.langMatches", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
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

	} );

	describe( "FunctionsBuilder.regex", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
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

	} );

	describe( "FunctionsBuilder.replace", () => {

		let builder:FunctionsBuilder;
		beforeEach( () => {
			builder = FunctionsBuilder
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

	} );

} );