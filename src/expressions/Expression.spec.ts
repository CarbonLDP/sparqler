import { Container } from "../data/Container";
import { IRIResolver } from "../data/IRIResolver";
import { TriplePatternsBuilder } from "../patterns/triplePatterns/TriplePatternsBuilder";

import { SupportedNativeTypes } from "../SupportedNativeTypes";

import { VariableToken } from "../tokens/VariableToken";

import { XSD } from "../utils/XSD";

import { Expression } from "./Expression";
import { ExpressionsBuilder } from "./ExpressionsBuilder";


type GenericFn = ( ...expressions:(Expression | SupportedNativeTypes)[] ) => Expression;

describe( "Expression", () => {

	it( "should exists", () => {
		expect( Expression ).toBeDefined();
		expect( Expression ).toEqual( jasmine.any( Object ) );
	} );

	let container:Container<VariableToken>;
	let triplesBuilder:TriplePatternsBuilder;
	let expressionsBuilder:ExpressionsBuilder;
	beforeEach( () => {
		const iriResolver:IRIResolver = new IRIResolver();
		iriResolver.prefixes.set( "ex", false );

		container = new Container( {
			iriResolver,
			targetToken: new VariableToken( "foo" ),
		} );

		const generalContainer = new Container( {
			iriResolver,
			targetToken: void 0,
		} );
		triplesBuilder = TriplePatternsBuilder
			.createFrom( generalContainer, {} );

		expressionsBuilder = ExpressionsBuilder
			.createFrom( generalContainer, {} )
	} );


	describe( "Expression.createFrom", () => {

		it( "should exists", () => {
			expect( Expression.createFrom ).toBeDefined();
			expect( Expression.createFrom ).toEqual( jasmine.any( Function ) );
		} );

		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const finishPattern:Expression = Expression
				.createFrom( container, myObject );

			expect( myObject ).toBe( finishPattern );
		} );


		it( "should create a Expression object", () => {
			const finishPattern:Expression = Expression
				.createFrom( container, {} );

			expect( finishPattern ).toEqual( {
				if: jasmine.any( Function ),
				coalesce: jasmine.any( Function ),
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
				count: jasmine.any( Function ),
				countDistinct: jasmine.any( Function ),
				sum: jasmine.any( Function ),
				sumDistinct: jasmine.any( Function ),
				avg: jasmine.any( Function ),
				avgDistinct: jasmine.any( Function ),
				min: jasmine.any( Function ),
				minDistinct: jasmine.any( Function ),
				max: jasmine.any( Function ),
				maxDistinct: jasmine.any( Function ),
				groupConcat: jasmine.any( Function ),
				groupConcatDistinct: jasmine.any( Function ),
				sample: jasmine.any( Function ),
				sampleDistinct: jasmine.any( Function ),
				or: jasmine.any( Function ),
				and: jasmine.any( Function ),
				equals: jasmine.any( Function ),
				notEquals: jasmine.any( Function ),
				lt: jasmine.any( Function ),
				lte: jasmine.any( Function ),
				gt: jasmine.any( Function ),
				gte: jasmine.any( Function ),
				in: jasmine.any( Function ),
				notIn: jasmine.any( Function ),
				add: jasmine.any( Function ),
				subtract: jasmine.any( Function ),
				multiply: jasmine.any( Function ),
				divide: jasmine.any( Function ),
				not: jasmine.any( Function ),
				plus: jasmine.any( Function ),
				minus: jasmine.any( Function ),

				as: jasmine.any( Function ),

				getExpression: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "Expression.getExpression", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression.createFrom( container, {} );
		} );

		it( "should return targetToken", () => {
			const token = expression.getExpression();
			expect( token ).toBe( container.targetToken );
		} );

	} );


	describe( "Expression.as", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression.createFrom( container, {} );
		} );


		it( "should create assigment with string variable", () => {
			const token = expression.as( "bar" );
			expect( token.getProjection().toString() ).toBe( `(?foo AS ?bar)` );
		} );

		it( "should create assigment with object variable", () => {
			const token = expression.as( triplesBuilder.var( "bar" ) );
			expect( token.getProjection().toString() ).toBe( `(?foo AS ?bar)` );
		} );

	} );


	describe( "Expression.if", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.if ).toBeDefined();
			expect( expression.if ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using expression & triples", () => {
			const returned = expression.if( triplesBuilder.resource( "ex:resource" ), triplesBuilder.literal( false ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "IF( ?foo, ex:resource, false )" );
		} );

		it( "should create function using expression & natives", () => {
			const returned = expression.if( "ex:resource", false );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "IF( ?foo, ex:resource, false )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.if as GenericFn)( "ex:resource", false, "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "IF( ?foo, ex:resource, false )" );
		} );

	} );

	describe( "Expression.coalesce", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.coalesce ).toBeDefined();
			expect( expression.coalesce ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using expression, triples & natives", () => {
			const returned = expression.coalesce( triplesBuilder.resource( "ex:resource-1" ), "ex:resource-2", false, triplesBuilder.literal( "value" ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "COALESCE( ?foo, ex:resource-1, ex:resource-2, false, \"value\" )" );
		} );

	} );

	describe( "Expression.sameTerm", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.sameTerm ).toBeDefined();
			expect( expression.sameTerm ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const returned = expression.sameTerm( triplesBuilder.literal( "value" ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "sameTerm( ?foo, \"value\" )" );
		} );

		it( "should create function using natives", () => {
			const returned = expression.sameTerm( "value" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "sameTerm( ?foo, \"value\" )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.sameTerm as GenericFn)( "value", "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "sameTerm( ?foo, \"value\" )" );
		} );

	} );

	describe( "Expression.isIRI", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.isIRI ).toBeDefined();
			expect( expression.isIRI ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create", () => {
			const returned = expression.isIRI();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "isIRI( ?foo )" );
		} );

		it( "should not add extra parameters", () => {
			const returned = (expression.isIRI as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "isIRI( ?foo )" );
		} );

	} );

	describe( "Expression.isURI", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.isURI ).toBeDefined();
			expect( expression.isURI ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.isURI();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "isURI( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.isURI as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "isURI( ?foo )" );
		} );

	} );

	describe( "Expression.isBlank", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.isBlank ).toBeDefined();
			expect( expression.isBlank ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.isBlank();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "isBLANK( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.isBlank as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "isBLANK( ?foo )" );
		} );

	} );

	describe( "Expression.isLiteral", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.isLiteral ).toBeDefined();
			expect( expression.isLiteral ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.isLiteral();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "isLITERAL( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.isLiteral as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "isLITERAL( ?foo )" );
		} );

	} );

	describe( "Expression.isNumeric", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.isNumeric ).toBeDefined();
			expect( expression.isNumeric ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.isNumeric();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "isNUMERIC( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.isNumeric as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "isNUMERIC( ?foo )" );
		} );

	} );

	describe( "Expression.str", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.str ).toBeDefined();
			expect( expression.str ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.str();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "STR( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.str as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "STR( ?foo )" );
		} );

	} );

	describe( "Expression.lang", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.lang ).toBeDefined();
			expect( expression.lang ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using natives", () => {
			const returned = expression.lang();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "LANG( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.lang as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "LANG( ?foo )" );
		} );

	} );

	describe( "Expression.datatype", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.datatype ).toBeDefined();
			expect( expression.datatype ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using natives", () => {
			const returned = expression.datatype();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "DATATYPE( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.datatype as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "DATATYPE( ?foo )" );
		} );

	} );

	describe( "Expression.iri", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.iri ).toBeDefined();
			expect( expression.iri ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.iri();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "IRI( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.iri as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "IRI( ?foo )" );
		} );

	} );

	describe( "Expression.uri", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.uri ).toBeDefined();
			expect( expression.uri ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.uri();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "URI( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.uri as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "URI( ?foo )" );
		} );

	} );

	describe( "Expression.bnode", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.bnode ).toBeDefined();
			expect( expression.bnode ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using natives", () => {
			const returned = expression.bnode();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "BNODE( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.bnode as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "BNODE( ?foo )" );
		} );

	} );

	describe( "Expression.strDT", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.strDT ).toBeDefined();
			expect( expression.strDT ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const returned = expression.strDT( triplesBuilder.resource( XSD.integer ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "STRDT( ?foo, <http://www.w3.org/2001/XMLSchema#integer> )" );
		} );

		it( "should create function using natives", () => {
			const returned = expression.strDT( XSD.integer );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "STRDT( ?foo, <http://www.w3.org/2001/XMLSchema#integer> )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.strDT as GenericFn)( XSD.integer, "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "STRDT( ?foo, <http://www.w3.org/2001/XMLSchema#integer> )" );
		} );

	} );

	describe( "Expression.strLang", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.strLang ).toBeDefined();
			expect( expression.strLang ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const returned = expression.strLang( triplesBuilder.literal( "en" ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "STRLANG( ?foo, \"en\" )" );
		} );

		it( "should create function using natives", () => {
			const returned = expression.strLang( "en" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "STRLANG( ?foo, \"en\" )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.strLang as GenericFn)( "en", "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "STRLANG( ?foo, \"en\" )" );
		} );

	} );

	describe( "Expression.strLen", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.strLen ).toBeDefined();
			expect( expression.strLen ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const returned = expression.strLen();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "STRLEN( ?foo )" );
		} );

		it( "should create function using natives", () => {
			const returned = expression.strLen();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "STRLEN( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.strLen as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "STRLEN( ?foo )" );
		} );

	} );

	describe( "Expression.substr", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.substr ).toBeDefined();
			expect( expression.substr ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const returned = expression.substr( triplesBuilder.literal( 4 ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "SUBSTR( ?foo, 4 )" );
		} );

		it( "should create function with length using triples", () => {
			const returned = expression.substr( triplesBuilder.literal( 4 ), triplesBuilder.literal( 1 ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "SUBSTR( ?foo, 4, 1 )" );
		} );

		it( "should create function using natives", () => {
			const returned = expression.substr( 4 );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "SUBSTR( ?foo, 4 )" );
		} );

		it( "should create function with length using natives", () => {
			const returned = expression.substr( 4, 1 );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "SUBSTR( ?foo, 4, 1 )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.substr as GenericFn)( 4, 1, "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "SUBSTR( ?foo, 4, 1 )" );
		} );

	} );

	describe( "Expression.uCase", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.uCase ).toBeDefined();
			expect( expression.uCase ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.uCase();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "UCASE( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.uCase as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "UCASE( ?foo )" );
		} );

	} );

	describe( "Expression.lCase", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.lCase ).toBeDefined();
			expect( expression.lCase ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.lCase();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "LCASE( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.lCase as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "LCASE( ?foo )" );
		} );

	} );

	describe( "Expression.strStarts", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.strStarts ).toBeDefined();
			expect( expression.strStarts ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const returned = expression.strStarts( triplesBuilder.literal( "hell" ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "STRSTARTS( ?foo, \"hell\" )" );
		} );

		it( "should create function using natives", () => {
			const returned = expression.strStarts( "hell" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "STRSTARTS( ?foo, \"hell\" )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.strStarts as GenericFn)( "hell", "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "STRSTARTS( ?foo, \"hell\" )" );
		} );

	} );

	describe( "Expression.strEnds", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.strEnds ).toBeDefined();
			expect( expression.strEnds ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const returned = expression.strEnds( triplesBuilder.literal( "hell" ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "STRENDS( ?foo, \"hell\" )" );
		} );

		it( "should create function using natives", () => {
			const returned = expression.strEnds( "hell" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "STRENDS( ?foo, \"hell\" )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.strEnds as GenericFn)( "hell", "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "STRENDS( ?foo, \"hell\" )" );
		} );

	} );

	describe( "Expression.contains", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.contains ).toBeDefined();
			expect( expression.contains ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const returned = expression.contains( triplesBuilder.literal( "el" ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "CONTAINS( ?foo, \"el\" )" );
		} );

		it( "should create function using natives", () => {
			const returned = expression.contains( "el" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "CONTAINS( ?foo, \"el\" )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.contains as GenericFn)( "el", "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "CONTAINS( ?foo, \"el\" )" );
		} );

	} );

	describe( "Expression.strBefore", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.strBefore ).toBeDefined();
			expect( expression.strBefore ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const returned = expression.strBefore( triplesBuilder.literal( "el" ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "STRBEFORE( ?foo, \"el\" )" );
		} );

		it( "should create function using natives", () => {
			const returned = expression.strBefore( "el" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "STRBEFORE( ?foo, \"el\" )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.strBefore as GenericFn)( "el", "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "STRBEFORE( ?foo, \"el\" )" );
		} );

	} );

	describe( "Expression.strAfter", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.strAfter ).toBeDefined();
			expect( expression.strAfter ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const returned = expression.strAfter( triplesBuilder.literal( "el" ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "STRAFTER( ?foo, \"el\" )" );
		} );

		it( "should create function using natives", () => {
			const returned = expression.strAfter( "el" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "STRAFTER( ?foo, \"el\" )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.strAfter as GenericFn)( "el", "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "STRAFTER( ?foo, \"el\" )" );
		} );

	} );

	describe( "Expression.encodeForUri", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.encodeForUri ).toBeDefined();
			expect( expression.encodeForUri ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using natives", () => {
			const returned = expression.encodeForUri();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "ENCODE_FOR_URI( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.encodeForUri as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "ENCODE_FOR_URI( ?foo )" );
		} );

	} );

	describe( "Expression.concat", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.concat ).toBeDefined();
			expect( expression.concat ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.concat( "foo", triplesBuilder.literal( "bar" ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "CONCAT( ?foo, \"foo\", \"bar\" )" );
		} );

	} );

	describe( "Expression.langMatches", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.langMatches ).toBeDefined();
			expect( expression.langMatches ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const returned = expression.langMatches( triplesBuilder.literal( "fr" ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "LANGMATCHES( ?foo, \"fr\" )" );
		} );

		it( "should create function using natives", () => {
			const returned = expression.langMatches( "fr" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "LANGMATCHES( ?foo, \"fr\" )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.langMatches as GenericFn)( "fr", "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "LANGMATCHES( ?foo, \"fr\" )" );
		} );

	} );

	describe( "Expression.regex", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.regex ).toBeDefined();
			expect( expression.regex ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const returned = expression.regex( triplesBuilder.literal( "^Foo" ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "REGEX( ?foo, \"^Foo\" )" );
		} );

		it( "should create function with flag using triples", () => {
			const returned = expression.regex( triplesBuilder.literal( "^foo" ), triplesBuilder.literal( "i" ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "REGEX( ?foo, \"^foo\", \"i\" )" );
		} );

		it( "should create function using natives", () => {
			const returned = expression.regex( "^Foo" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "REGEX( ?foo, \"^Foo\" )" );
		} );

		it( "should create function with flag using natives", () => {
			const returned = expression.regex( "^foo", "i" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "REGEX( ?foo, \"^foo\", \"i\" )" );
		} );

		it( "should create function using regex", () => {
			const returned = expression.regex( /^Foo/ );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "REGEX( ?foo, \"^Foo\" )" );
		} );

		it( "should create function using regex with flags", () => {
			const returned = expression.regex( /^foo/i );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "REGEX( ?foo, \"^foo\", \"i\" )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.regex as GenericFn)( "^foo", "i", "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "REGEX( ?foo, \"^foo\", \"i\" )" );
		} );

	} );

	describe( "Expression.replace", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.replace ).toBeDefined();
			expect( expression.replace ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function using triples", () => {
			const returned = expression.replace( triplesBuilder.literal( "r" ), triplesBuilder.literal( "z" ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "REPLACE( ?foo, \"r\", \"z\" )" );
		} );

		it( "should create function with flag using triples", () => {
			const returned = expression.replace( triplesBuilder.literal( "R" ), triplesBuilder.literal( "z" ), triplesBuilder.literal( "i" ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "REPLACE( ?foo, \"R\", \"z\", \"i\" )" );
		} );

		it( "should create function using natives", () => {
			const returned = expression.replace( "r", "z" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "REPLACE( ?foo, \"r\", \"z\" )" );
		} );

		it( "should create function with flag using natives", () => {
			const returned = expression.replace( "R", "z", "i" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "REPLACE( ?foo, \"R\", \"z\", \"i\" )" );
		} );

		it( "should create function using regex", () => {
			const returned = expression.replace( /r/, "z" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "REPLACE( ?foo, \"r\", \"z\" )" );
		} );

		it( "should create function using regex with flags", () => {
			const returned = expression.replace( /R/i, "z" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "REPLACE( ?foo, \"R\", \"z\", \"i\" )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.replace as GenericFn)( "R", "z", "i", "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "REPLACE( ?foo, \"R\", \"z\", \"i\" )" );
		} );

	} );

	describe( "Expression.abs", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.abs ).toBeDefined();
			expect( expression.abs ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.abs();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "ABS( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.abs as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "ABS( ?foo )" );
		} );

	} );

	describe( "Expression.round", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.round ).toBeDefined();
			expect( expression.round ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.round();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "ROUND( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.round as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "ROUND( ?foo )" );
		} );

	} );

	describe( "Expression.ceil", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.ceil ).toBeDefined();
			expect( expression.ceil ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.ceil();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "CEIL( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.ceil as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "CEIL( ?foo )" );
		} );

	} );

	describe( "Expression.floor", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.floor ).toBeDefined();
			expect( expression.floor ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.floor();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "FLOOR( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.floor as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "FLOOR( ?foo )" );
		} );

	} );

	describe( "Expression.year", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.year ).toBeDefined();
			expect( expression.year ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.year();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "YEAR( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.year as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "YEAR( ?foo )" );
		} );

	} );

	describe( "Expression.month", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.month ).toBeDefined();
			expect( expression.month ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.month();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "MONTH( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.month as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "MONTH( ?foo )" );
		} );

	} );

	describe( "Expression.day", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.day ).toBeDefined();
			expect( expression.day ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.day();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "DAY( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.day as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "DAY( ?foo )" );
		} );

	} );

	describe( "Expression.hours", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.hours ).toBeDefined();
			expect( expression.hours ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.hours();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "HOURS( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.hours as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "HOURS( ?foo )" );
		} );

	} );

	describe( "Expression.minutes", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.minutes ).toBeDefined();
			expect( expression.minutes ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.minutes();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "MINUTES( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.minutes as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "MINUTES( ?foo )" );
		} );

	} );

	describe( "Expression.seconds", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.seconds ).toBeDefined();
			expect( expression.seconds ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.seconds();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "SECONDS( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.seconds as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "SECONDS( ?foo )" );
		} );

	} );

	describe( "Expression.timezone", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.timezone ).toBeDefined();
			expect( expression.timezone ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.timezone();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "TIMEZONE( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.timezone as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "TIMEZONE( ?foo )" );
		} );

	} );

	describe( "Expression.tz", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.tz ).toBeDefined();
			expect( expression.tz ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.tz();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "TZ( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.tz as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "TZ( ?foo )" );
		} );

	} );

	describe( "Expression.md5", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.md5 ).toBeDefined();
			expect( expression.md5 ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.md5();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "MD5( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.md5 as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "MD5( ?foo )" );
		} );

	} );

	describe( "Expression.sha1", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.sha1 ).toBeDefined();
			expect( expression.sha1 ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.sha1();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "SHA1( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.sha1 as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "SHA1( ?foo )" );
		} );

	} );

	describe( "Expression.sha256", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.sha256 ).toBeDefined();
			expect( expression.sha256 ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.sha256();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "SHA256( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.sha256 as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "SHA256( ?foo )" );
		} );

	} );

	describe( "Expression.sha384", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.sha384 ).toBeDefined();
			expect( expression.sha384 ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.sha384();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "SHA384( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.sha384 as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "SHA384( ?foo )" );
		} );

	} );

	describe( "Expression.sha512", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.sha512 ).toBeDefined();
			expect( expression.sha512 ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.sha512();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "SHA512( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.sha512 as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "SHA512( ?foo )" );
		} );

	} );

	describe( "Expression.count", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.count ).toBeDefined();
			expect( expression.count ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.count();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "COUNT( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.count as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "COUNT( ?foo )" );
		} );

	} );

	describe( "Expression.countDistinct", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.countDistinct ).toBeDefined();
			expect( expression.countDistinct ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.countDistinct();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "COUNT( DISTINCT ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.countDistinct as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "COUNT( DISTINCT ?foo )" );
		} );

	} );

	describe( "Expression.sum", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.sum ).toBeDefined();
			expect( expression.sum ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.sum();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "SUM( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.sum as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "SUM( ?foo )" );
		} );

	} );

	describe( "Expression.sumDistinct", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.sumDistinct ).toBeDefined();
			expect( expression.sumDistinct ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.sumDistinct();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "SUM( DISTINCT ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.sumDistinct as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "SUM( DISTINCT ?foo )" );
		} );

	} );

	describe( "Expression.avg", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.avg ).toBeDefined();
			expect( expression.avg ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.avg();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "AVG( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.avg as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "AVG( ?foo )" );
		} );

	} );

	describe( "Expression.avgDistinct", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.avgDistinct ).toBeDefined();
			expect( expression.avgDistinct ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.avgDistinct();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "AVG( DISTINCT ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.avgDistinct as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "AVG( DISTINCT ?foo )" );
		} );

	} );

	describe( "Expression.min", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.min ).toBeDefined();
			expect( expression.min ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.min();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "MIN( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.min as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "MIN( ?foo )" );
		} );

	} );

	describe( "Expression.minDistinct", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.minDistinct ).toBeDefined();
			expect( expression.minDistinct ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.minDistinct();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "MIN( DISTINCT ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.minDistinct as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "MIN( DISTINCT ?foo )" );
		} );

	} );

	describe( "Expression.max", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.max ).toBeDefined();
			expect( expression.max ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.max();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "MAX( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.max as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "MAX( ?foo )" );
		} );

	} );

	describe( "Expression.maxDistinct", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.maxDistinct ).toBeDefined();
			expect( expression.maxDistinct ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.maxDistinct();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "MAX( DISTINCT ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.maxDistinct as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "MAX( DISTINCT ?foo )" );
		} );

	} );

	describe( "Expression.groupConcat", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.groupConcat ).toBeDefined();
			expect( expression.groupConcat ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.groupConcat();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "GROUP_CONCAT( ?foo )" );
		} );

		it( "should create function with separator", () => {
			const returned = expression.groupConcat( ", " );
			expect( returned.getExpression().toString( 0 ) ).toEqual( `GROUP_CONCAT( ?foo; SEPARATOR=", " )` );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.groupConcat as GenericFn)( ", ", "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( `GROUP_CONCAT( ?foo; SEPARATOR=", " )` );
		} );

	} );

	describe( "Expression.groupConcatDistinct", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.groupConcatDistinct ).toBeDefined();
			expect( expression.groupConcatDistinct ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.groupConcatDistinct();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "GROUP_CONCAT( DISTINCT ?foo )" );
		} );

		it( "should create function with separator", () => {
			const returned = expression.groupConcatDistinct( ", " );
			expect( returned.getExpression().toString( 0 ) ).toEqual( `GROUP_CONCAT( DISTINCT ?foo; SEPARATOR=", " )` );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.groupConcatDistinct as GenericFn)( ", ", "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( `GROUP_CONCAT( DISTINCT ?foo; SEPARATOR=", " )` );
		} );

	} );

	describe( "Expression.sample", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.sample ).toBeDefined();
			expect( expression.sample ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.sample();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "SAMPLE( ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.sample as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "SAMPLE( ?foo )" );
		} );

	} );

	describe( "Expression.sampleDistinct", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.sampleDistinct ).toBeDefined();
			expect( expression.sampleDistinct ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create function", () => {
			const returned = expression.sampleDistinct();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "SAMPLE( DISTINCT ?foo )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.sampleDistinct as GenericFn)( "extra" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "SAMPLE( DISTINCT ?foo )" );
		} );

	} );


	describe( "Expression.or", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.or ).toBeDefined();
			expect( expression.or ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create operation using expressions", () => {
			const returned = expression.or( triplesBuilder.var( "bar" ), triplesBuilder.var( "baz" ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo || ?bar || ?baz" );
		} );

		it( "should create operation using natives", () => {
			const returned = expression.or( "bar", "baz" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo || \"bar\" || \"baz\"" );
		} );

		it( "should create operation wrapping non supported operations", () => {
			const returned = expression.or( expressionsBuilder.or( triplesBuilder.var( "baz" ), triplesBuilder.var( "qux" ) ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo || ( ?baz || ?qux )" );
		} );

	} );

	describe( "Expression.and", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.and ).toBeDefined();
			expect( expression.and ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create operation using expressions", () => {
			const returned = expression.and( triplesBuilder.var( "bar" ), triplesBuilder.var( "baz" ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo && ?bar && ?baz" );
		} );

		it( "should create operation using natives", () => {
			const returned = expression.and( "bar", "baz" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo && \"bar\" && \"baz\"" );
		} );

		it( "should create operation wrapping non supported operations", () => {
			const returned = expression.and( expressionsBuilder.or( triplesBuilder.var( "baz" ), triplesBuilder.var( "qux" ) ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo && ( ?baz || ?qux )" );
		} );

	} );


	describe( "Expression.equals", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.equals ).toBeDefined();
			expect( expression.equals ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create operation using expressions", () => {
			const returned = expression.equals( triplesBuilder.var( "bar" ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo = ?bar" );
		} );

		it( "should create operation using natives", () => {
			const returned = expression.equals( "bar" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo = \"bar\"" );
		} );

		it( "should create operation wrapping non supported operations", () => {
			const returned = expression.equals( expressionsBuilder.or( triplesBuilder.var( "baz" ), triplesBuilder.var( "qux" ) ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo = ( ?baz || ?qux )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.equals as GenericFn)( "bar", "baz" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo = \"bar\"" );
		} );

	} );

	describe( "Expression.notEquals", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.notEquals ).toBeDefined();
			expect( expression.notEquals ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create operation using expressions", () => {
			const returned = expression.notEquals( triplesBuilder.var( "bar" ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo != ?bar" );
		} );

		it( "should create operation using natives", () => {
			const returned = expression.notEquals( "bar" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo != \"bar\"" );
		} );

		it( "should create operation wrapping non supported operations", () => {
			const returned = expression.notEquals( expressionsBuilder.and( triplesBuilder.var( "baz" ), triplesBuilder.var( "qux" ) ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo != ( ?baz && ?qux )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.notEquals as GenericFn)( "bar", "baz" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo != \"bar\"" );
		} );

	} );

	describe( "Expression.lt", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.lt ).toBeDefined();
			expect( expression.lt ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create operation using expressions", () => {
			const returned = expression.lt( triplesBuilder.var( "bar" ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo < ?bar" );
		} );

		it( "should create operation using natives", () => {
			const returned = expression.lt( "bar" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo < \"bar\"" );
		} );

		it( "should create operation wrapping non supported operations", () => {
			const returned = expression.lt( expressionsBuilder.equals( triplesBuilder.var( "baz" ), triplesBuilder.var( "qux" ) ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo < ( ?baz = ?qux )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.lt as GenericFn)( "bar", "baz" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo < \"bar\"" );
		} );

	} );

	describe( "Expression.lte", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.lte ).toBeDefined();
			expect( expression.lte ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create operation using expressions", () => {
			const returned = expression.lte( triplesBuilder.var( "bar" ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo <= ?bar" );
		} );

		it( "should create operation using natives", () => {
			const returned = expression.lte( "bar" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo <= \"bar\"" );
		} );

		it( "should create operation wrapping non supported operations", () => {
			const returned = expression.lte( expressionsBuilder.notEquals( triplesBuilder.var( "baz" ), triplesBuilder.var( "qux" ) ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo <= ( ?baz != ?qux )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.lte as GenericFn)( "bar", "baz" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo <= \"bar\"" );
		} );

	} );

	describe( "Expression.gt", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.gt ).toBeDefined();
			expect( expression.gt ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create operation using expressions", () => {
			const returned = expression.gt( triplesBuilder.var( "bar" ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo > ?bar" );
		} );

		it( "should create operation using natives", () => {
			const returned = expression.gt( "bar" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo > \"bar\"" );
		} );

		it( "should create operation wrapping non supported operations", () => {
			const returned = expression.gt( expressionsBuilder.lt( triplesBuilder.var( "baz" ), triplesBuilder.var( "qux" ) ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo > ( ?baz < ?qux )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.gt as GenericFn)( "bar", "baz" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo > \"bar\"" );
		} );

	} );

	describe( "Expression.gte", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.gte ).toBeDefined();
			expect( expression.gte ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create operation using expressions", () => {
			const returned = expression.gte( triplesBuilder.var( "bar" ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo >= ?bar" );
		} );

		it( "should create operation using natives", () => {
			const returned = expression.gte( "bar" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo >= \"bar\"" );
		} );

		it( "should create operation wrapping non supported operations", () => {
			const returned = expression.gte( expressionsBuilder.lte( triplesBuilder.var( "baz" ), triplesBuilder.var( "qux" ) ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo >= ( ?baz <= ?qux )" );
		} );


		it( "should not add extra parameters", () => {
			const returned = (expression.gte as GenericFn)( "bar", "baz" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo >= \"bar\"" );
		} );

	} );


	describe( "Expression.in", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.in ).toBeDefined();
			expect( expression.in ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create operation using expressions", () => {
			const returned = expression.in( triplesBuilder.var( "bar" ), triplesBuilder.var( "baz" ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo IN( ?bar, ?baz )" );
		} );

		it( "should create operation using natives", () => {
			const returned = expression.in( "bar", "baz" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo IN( \"bar\", \"baz\" )" );
		} );

		it( "should create operation wrapping non supported operations", () => {
			const returned = expression.in( expressionsBuilder.gt( triplesBuilder.var( "baz" ), triplesBuilder.var( "qux" ) ), true );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo IN( ?baz > ?qux, true )" );
		} );

	} );

	describe( "Expression.notIn", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.notIn ).toBeDefined();
			expect( expression.notIn ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create operation using expressions", () => {
			const returned = expression.notIn( triplesBuilder.var( "bar" ), triplesBuilder.var( "baz" ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo NOT IN( ?bar, ?baz )" );
		} );

		it( "should create operation using natives", () => {
			const returned = expression.notIn( "bar", "baz" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo NOT IN( \"bar\", \"baz\" )" );
		} );

		it( "should create operation wrapping non supported operations", () => {
			const returned = expression.notIn( expressionsBuilder.gt( triplesBuilder.var( "baz" ), triplesBuilder.var( "qux" ) ), true );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo NOT IN( ?baz > ?qux, true )" );
		} );

	} );


	describe( "Expression.add", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.add ).toBeDefined();
			expect( expression.add ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create operation using expressions", () => {
			const returned = expression.add( triplesBuilder.var( "bar" ), triplesBuilder.var( "baz" ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo + ?bar + ?baz" );
		} );

		it( "should create operation using natives", () => {
			const returned = expression.add( "bar", "baz" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo + \"bar\" + \"baz\"" );
		} );

		it( "should create operation wrapping non supported operations", () => {
			const returned = expression.add( expressionsBuilder.gt( triplesBuilder.var( "baz" ), triplesBuilder.var( "qux" ) ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo + ( ?baz > ?qux )" );
		} );

	} );

	describe( "Expression.subtract", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.subtract ).toBeDefined();
			expect( expression.subtract ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create operation using expressions", () => {
			const returned = expression.subtract( triplesBuilder.var( "bar" ), triplesBuilder.var( "baz" ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo - ?bar - ?baz" );
		} );

		it( "should create operation using natives", () => {
			const returned = expression.subtract( "bar", "baz" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo - \"bar\" - \"baz\"" );
		} );

		it( "should create operation wrapping non supported operations", () => {
			const returned = expression.subtract( expressionsBuilder.gte( triplesBuilder.var( "baz" ), triplesBuilder.var( "qux" ) ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo - ( ?baz >= ?qux )" );
		} );

	} );


	describe( "Expression.multiply", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.multiply ).toBeDefined();
			expect( expression.multiply ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create operation using expressions", () => {
			const returned = expression.multiply( triplesBuilder.var( "bar" ), triplesBuilder.var( "baz" ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo * ?bar * ?baz" );
		} );

		it( "should create operation using natives", () => {
			const returned = expression.multiply( "bar", "baz" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo * \"bar\" * \"baz\"" );
		} );

		it( "should create operation wrapping non supported operations", () => {
			const returned = expression.multiply( expressionsBuilder.add( triplesBuilder.var( "baz" ), triplesBuilder.var( "qux" ) ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo * ( ?baz + ?qux )" );
		} );

	} );

	describe( "Expression.divide", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.divide ).toBeDefined();
			expect( expression.divide ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create operation using expressions", () => {
			const returned = expression.divide( triplesBuilder.var( "bar" ), triplesBuilder.var( "baz" ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo / ?bar / ?baz" );
		} );

		it( "should create operation using natives", () => {
			const returned = expression.divide( "bar", "baz" );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo / \"bar\" / \"baz\"" );
		} );

		it( "should create operation wrapping non supported operations", () => {
			const returned = expression.divide( expressionsBuilder.subtract( triplesBuilder.var( "baz" ), triplesBuilder.var( "qux" ) ) );
			expect( returned.getExpression().toString( 0 ) ).toEqual( "?foo / ( ?baz - ?qux )" );
		} );

	} );


	describe( "Expression.not", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.not ).toBeDefined();
			expect( expression.not ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create operation", () => {
			const returned = expression.not();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "! ?foo" );
		} );

	} );

	describe( "Expression.plus", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.plus ).toBeDefined();
			expect( expression.plus ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create operation", () => {
			const returned = expression.plus();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "+ ?foo" );
		} );

	} );

	describe( "Expression.minus", () => {

		let expression:Expression;
		beforeEach( () => {
			expression = Expression
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( expression.minus ).toBeDefined();
			expect( expression.minus ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create operation", () => {
			const returned = expression.minus();
			expect( returned.getExpression().toString( 0 ) ).toEqual( "- ?foo" );
		} );

	} );

} );

