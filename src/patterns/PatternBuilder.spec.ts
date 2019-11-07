import { MockPattern } from "../../test/mocks/MockPattern";
import { MockPatternToken } from "../../test/mocks/MockPatternToken";
import { spyContainers } from "../../test/spies/clones";
import { Container } from "../core/containers/Container";
import { IRIResolver } from "../core/iri/IRIResolver";
import { MinusPatternToken } from "../tokens/MinusPatternToken";
import { NotTriplePattern } from "./notTriplePatterns/NotTriplePattern";

import { PatternBuilder } from "./PatternBuilder";


describe( "PatternBuilder", ():void => {

	let iriResolver:IRIResolver;
	let container:Container<undefined>;
	beforeEach( () => {
		iriResolver = new IRIResolver();
		iriResolver.prefixes.set( "ex", false );

		container = new Container( {
			iriResolver: iriResolver,
			targetToken: void 0,
		} );
	} );

	it( "should exists", ():void => {
		expect( PatternBuilder ).toBeDefined();
		expect( PatternBuilder ).toEqual( jasmine.any( Object ) );
	} );


	describe( "PatternBuilder.createFrom", () => {

		it( "should exists", () => {
			expect( PatternBuilder.createFrom ).toBeDefined();
			expect( PatternBuilder.createFrom ).toEqual( jasmine.any( Function ) );
		} );

		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const finishPattern:PatternBuilder = PatternBuilder
				.createFrom( container, myObject );

			expect( myObject ).toBe( finishPattern );
		} );


		it( "should create a PatternBuilder object", () => {
			const finishPattern:PatternBuilder = PatternBuilder
				.createFrom( container, {} );

			expect( finishPattern ).toEqual( {
				resource: jasmine.any( Function ),
				var: jasmine.any( Function ),
				literal: jasmine.any( Function ),

				collection: jasmine.any( Function ),
				blankNode: jasmine.any( Function ),


				undefined: "UNDEF",

				graph: jasmine.any( Function ),
				group: jasmine.any( Function ),
				union: jasmine.any( Function ),
				optional: jasmine.any( Function ),
				service: jasmine.any( Function ),
				serviceSilent: jasmine.any( Function ),

				filter: jasmine.any( Function ),
				bind: jasmine.any( Function ),
				values: jasmine.any( Function ),


				select: jasmine.any( Function ),
				selectDistinct: jasmine.any( Function ),
				selectReduced: jasmine.any( Function ),
				selectAll: jasmine.any( Function ),
				selectAllDistinct: jasmine.any( Function ),
				selectAllReduced: jasmine.any( Function ),


				path: jasmine.any( Function ),


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
				count: jasmine.any( Function ),
				countDistinct: jasmine.any( Function ),
				countAll: jasmine.any( Function ),
				countAllDistinct: jasmine.any( Function ),
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
				add: jasmine.any( Function ),
				in: jasmine.any( Function ),
				notIn: jasmine.any( Function ),
				subtract: jasmine.any( Function ),
				multiply: jasmine.any( Function ),
				divide: jasmine.any( Function ),
				not: jasmine.any( Function ),
				plus: jasmine.any( Function ),


				// Mixed
				minus: jasmine.any( Function ),


				asc: jasmine.any( Function ),
				desc: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "PatternBuilder.minus", () => {

		describe( "When NotTriplePatternsBuilder", () => {


			let builder:PatternBuilder;
			beforeEach( () => {
				builder = PatternBuilder
					.createFrom( container, {} );

				spyContainers.install();
			} );

			afterEach( () => {
				spyContainers.uninstall();
			} );

			it( "should exists", () => {
				expect( builder.minus ).toBeDefined();
				expect( builder.minus ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return not triple pattern", () => {
				const spy:jasmine.Spy = spyOn( NotTriplePattern, "createFrom" )
					.and.callThrough();

				const returned = builder.minus( [] );
				expect( returned ).toBe( spy.calls.mostRecent().returnValue );
			} );


			it( "should create pattern with OptionalToken", () => {
				builder.minus( [] );

				type TheContainer = Container<MinusPatternToken>;
				const newContainer:TheContainer = spyContainers.getLast();

				expect( newContainer ).toEqual( jasmine.objectContaining<TheContainer>( {
					targetToken: new MinusPatternToken(),
				} ) )
			} );


			it( "should add the pattern to the token", () => {
				builder.minus( new MockPattern( "minus pattern" ) );

				type TheContainer = Container<MinusPatternToken>;
				const newContainer:TheContainer = spyContainers.getLast();

				expect( newContainer.targetToken.groupPattern.patterns )
					.toContain( new MockPatternToken( "minus pattern" ) );
			} );

			it( "should add the patterns to the token", () => {
				builder.minus( [
					new MockPattern( "minus pattern 1" ),
					new MockPattern( "minus pattern 2" ),
					new MockPattern( "minus pattern 3" ),
				] );

				type TheContainer = Container<MinusPatternToken>;
				const newContainer:TheContainer = spyContainers.getLast();

				expect( newContainer.targetToken.groupPattern.patterns )
					.toContain( new MockPatternToken( "minus pattern 1" ) );
				expect( newContainer.targetToken.groupPattern.patterns )
					.toContain( new MockPatternToken( "minus pattern 2" ) );
				expect( newContainer.targetToken.groupPattern.patterns )
					.toContain( new MockPatternToken( "minus pattern 2" ) );
			} );

		} );


		describe( "When OperationExpressionsBuilder", () => {

			let builder:PatternBuilder;
			beforeEach( () => {
				builder = PatternBuilder
					.createFrom( container, {} );
			} );

			it( "should exists", () => {
				expect( builder.minus ).toBeDefined();
				expect( builder.minus ).toEqual( jasmine.any( Function ) );
			} );


			it( "should create operation using single expression", () => {
				const expression = builder.minus( builder.var( "foo" ) );
				expect( expression.getExpression().toString( 0 ) ).toEqual( "- ?foo" );
			} );

			it( "should create operation using single native", () => {
				const expression = builder.minus( "foo" );
				expect( expression.getExpression().toString( 0 ) ).toEqual( "- \"foo\"" );
			} );

			it( "should create operation wrapping non supported single operation", () => {
				const expression = builder.minus( builder.plus( builder.var( "foo" ) ) );
				expect( expression.getExpression().toString( 0 ) ).toEqual( "- ( + ?foo )" );
			} );

		} );

	} );

} );
