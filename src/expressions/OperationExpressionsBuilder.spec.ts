import { Container } from "../data/Container";
import { IRIResolver } from "../data/IRIResolver";

import { TriplePatternsBuilder } from "../patterns/triplePatterns/TriplePatternsBuilder";

import { SupportedNativeTypes } from "../SupportedNativeTypes";

import { Expression } from "./Expression";
import { OperationExpressionsBuilder } from "./OperationExpressionsBuilder";


type GenericFn = ( ...expressions:(Expression | SupportedNativeTypes)[] ) => Expression;

describe( "OperationExpressionsBuilder", () => {

	it( "should exists", () => {
		expect( OperationExpressionsBuilder ).toBeDefined();
		expect( OperationExpressionsBuilder ).toEqual( jasmine.any( Object ) );
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


	describe( "OperationExpressionsBuilder.createFrom", () => {

		it( "should exists", () => {
			expect( OperationExpressionsBuilder.createFrom ).toBeDefined();
			expect( OperationExpressionsBuilder.createFrom ).toEqual( jasmine.any( Function ) );
		} );

		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const returned:OperationExpressionsBuilder = OperationExpressionsBuilder
				.createFrom( container, myObject );

			expect( myObject ).toBe( returned );
		} );


		it( "should create a OperationExpressionsBuilder object", () => {
			const returned:OperationExpressionsBuilder = OperationExpressionsBuilder
				.createFrom( container, {} );

			expect( returned ).toEqual( {
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
				minus: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "OperationExpressionsBuilder.or", () => {

		let builder:OperationExpressionsBuilder;
		beforeEach( () => {
			builder = OperationExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.or ).toBeDefined();
			expect( builder.or ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create operation using single expression", () => {
			const expression = builder.or( triplesBuilder.var( "foo" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "?foo" );
		} );

		it( "should create operation using single native", () => {
			const expression = builder.or( "foo" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "\"foo\"" );
		} );

		it( "should create operation wrapping non supported single operation", () => {
			const expression = builder.or( builder.or( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ) ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "( ?foo || ?bar )" );
		} );


		it( "should create operation using multiple expressions", () => {
			const expression = builder.or( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ), triplesBuilder.var( "baz" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "?foo || ?bar || ?baz" );
		} );

		it( "should create operation using multiple natives", () => {
			const expression = builder.or( "foo", "bar", "baz" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "\"foo\" || \"bar\" || \"baz\"" );
		} );

		it( "should create operation wrapping non supported multiple operations", () => {
			const expression = builder.or( builder.or( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ) ), builder.or( triplesBuilder.var( "baz" ), triplesBuilder.var( "qux" ) ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "( ?foo || ?bar ) || ( ?baz || ?qux )" );
		} );

	} );

	describe( "OperationExpressionsBuilder.and", () => {

		let builder:OperationExpressionsBuilder;
		beforeEach( () => {
			builder = OperationExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.and ).toBeDefined();
			expect( builder.and ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create operation using single expression", () => {
			const expression = builder.and( triplesBuilder.var( "foo" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "?foo" );
		} );

		it( "should create operation using single native", () => {
			const expression = builder.and( "foo" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "\"foo\"" );
		} );

		it( "should create operation wrapping non supported single operation", () => {
			const expression = builder.and( builder.or( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ) ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "( ?foo || ?bar )" );
		} );


		it( "should create operation using multiple expressions", () => {
			const expression = builder.and( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ), triplesBuilder.var( "baz" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "?foo && ?bar && ?baz" );
		} );

		it( "should create operation using multiple natives", () => {
			const expression = builder.and( "foo", "bar", "baz" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "\"foo\" && \"bar\" && \"baz\"" );
		} );

		it( "should create operation wrapping non supported multiple operations", () => {
			const expression = builder.and( builder.or( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ) ), builder.or( triplesBuilder.var( "baz" ), triplesBuilder.var( "qux" ) ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "( ?foo || ?bar ) && ( ?baz || ?qux )" );
		} );

	} );


	describe( "OperationExpressionsBuilder.equals", () => {

		let builder:OperationExpressionsBuilder;
		beforeEach( () => {
			builder = OperationExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.equals ).toBeDefined();
			expect( builder.equals ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create operation using expressions", () => {
			const expression = builder.equals( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "?foo = ?bar" );
		} );

		it( "should create operation using natives", () => {
			const expression = builder.equals( "foo", "bar" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "\"foo\" = \"bar\"" );
		} );

		it( "should create operation wrapping non supported operations", () => {
			const expression = builder.equals( builder.and( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ) ), builder.or( triplesBuilder.var( "baz" ), triplesBuilder.var( "qux" ) ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "( ?foo && ?bar ) = ( ?baz || ?qux )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.equals as GenericFn)( "foo", "bar", "baz" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "\"foo\" = \"bar\"" );
		} );

	} );

	describe( "OperationExpressionsBuilder.notEquals", () => {

		let builder:OperationExpressionsBuilder;
		beforeEach( () => {
			builder = OperationExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.notEquals ).toBeDefined();
			expect( builder.notEquals ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create operation using expressions", () => {
			const expression = builder.notEquals( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "?foo != ?bar" );
		} );

		it( "should create operation using natives", () => {
			const expression = builder.notEquals( "foo", "bar" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "\"foo\" != \"bar\"" );
		} );

		it( "should create operation wrapping non supported operations", () => {
			const expression = builder.notEquals( builder.equals( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ) ), builder.and( triplesBuilder.var( "baz" ), triplesBuilder.var( "qux" ) ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "( ?foo = ?bar ) != ( ?baz && ?qux )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.notEquals as GenericFn)( "foo", "bar", "baz" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "\"foo\" != \"bar\"" );
		} );

	} );

	describe( "OperationExpressionsBuilder.lt", () => {

		let builder:OperationExpressionsBuilder;
		beforeEach( () => {
			builder = OperationExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.lt ).toBeDefined();
			expect( builder.lt ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create operation using expressions", () => {
			const expression = builder.lt( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "?foo < ?bar" );
		} );

		it( "should create operation using natives", () => {
			const expression = builder.lt( "foo", "bar" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "\"foo\" < \"bar\"" );
		} );

		it( "should create operation wrapping non supported operations", () => {
			const expression = builder.lt( builder.notEquals( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ) ), builder.equals( triplesBuilder.var( "baz" ), triplesBuilder.var( "qux" ) ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "( ?foo != ?bar ) < ( ?baz = ?qux )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.lt as GenericFn)( "foo", "bar", "baz" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "\"foo\" < \"bar\"" );
		} );

	} );

	describe( "OperationExpressionsBuilder.lte", () => {

		let builder:OperationExpressionsBuilder;
		beforeEach( () => {
			builder = OperationExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.lte ).toBeDefined();
			expect( builder.lte ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create operation using expressions", () => {
			const expression = builder.lte( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "?foo <= ?bar" );
		} );

		it( "should create operation using natives", () => {
			const expression = builder.lte( "foo", "bar" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "\"foo\" <= \"bar\"" );
		} );

		it( "should create operation wrapping non supported operations", () => {
			const expression = builder.lte( builder.lt( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ) ), builder.notEquals( triplesBuilder.var( "baz" ), triplesBuilder.var( "qux" ) ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "( ?foo < ?bar ) <= ( ?baz != ?qux )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.lte as GenericFn)( "foo", "bar", "baz" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "\"foo\" <= \"bar\"" );
		} );

	} );

	describe( "OperationExpressionsBuilder.gt", () => {

		let builder:OperationExpressionsBuilder;
		beforeEach( () => {
			builder = OperationExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.gt ).toBeDefined();
			expect( builder.gt ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create operation using expressions", () => {
			const expression = builder.gt( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "?foo > ?bar" );
		} );

		it( "should create operation using natives", () => {
			const expression = builder.gt( "foo", "bar" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "\"foo\" > \"bar\"" );
		} );

		it( "should create operation wrapping non supported operations", () => {
			const expression = builder.gt( builder.lte( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ) ), builder.lt( triplesBuilder.var( "baz" ), triplesBuilder.var( "qux" ) ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "( ?foo <= ?bar ) > ( ?baz < ?qux )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.gt as GenericFn)( "foo", "bar", "baz" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "\"foo\" > \"bar\"" );
		} );

	} );

	describe( "OperationExpressionsBuilder.gte", () => {

		let builder:OperationExpressionsBuilder;
		beforeEach( () => {
			builder = OperationExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.gte ).toBeDefined();
			expect( builder.gte ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create operation using expressions", () => {
			const expression = builder.gte( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "?foo >= ?bar" );
		} );

		it( "should create operation using natives", () => {
			const expression = builder.gte( "foo", "bar" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "\"foo\" >= \"bar\"" );
		} );

		it( "should create operation wrapping non supported operations", () => {
			const expression = builder.gte( builder.gt( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ) ), builder.lte( triplesBuilder.var( "baz" ), triplesBuilder.var( "qux" ) ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "( ?foo > ?bar ) >= ( ?baz <= ?qux )" );
		} );


		it( "should not add extra parameters", () => {
			const expression = (builder.gte as GenericFn)( "foo", "bar", "baz" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "\"foo\" >= \"bar\"" );
		} );

	} );


	describe( "OperationExpressionsBuilder.in", () => {

		let builder:OperationExpressionsBuilder;
		beforeEach( () => {
			builder = OperationExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.in ).toBeDefined();
			expect( builder.in ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create operation using single expression", () => {
			const expression = builder.in( triplesBuilder.var( "foo" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "?foo IN()" );
		} );

		it( "should create operation using single native", () => {
			const expression = builder.in( "foo" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "\"foo\" IN()" );
		} );

		it( "should create operation wrapping non supported single operation", () => {
			const expression = builder.in( builder.gte( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ) ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "( ?foo >= ?bar ) IN()" );
		} );


		it( "should create operation using multiple expressions", () => {
			const expression = builder.in( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ), triplesBuilder.var( "baz" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "?foo IN( ?bar, ?baz )" );
		} );

		it( "should create operation using multiple natives", () => {
			const expression = builder.in( "foo", "bar", "baz" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "\"foo\" IN( \"bar\", \"baz\" )" );
		} );

		it( "should create operation wrapping non supported multiple operations", () => {
			const expression = builder.in( builder.gte( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ) ), builder.gt( triplesBuilder.var( "baz" ), triplesBuilder.var( "qux" ) ), true );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "( ?foo >= ?bar ) IN( ?baz > ?qux, true )" );
		} );

	} );

	describe( "OperationExpressionsBuilder.notIn", () => {

		let builder:OperationExpressionsBuilder;
		beforeEach( () => {
			builder = OperationExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.notIn ).toBeDefined();
			expect( builder.notIn ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create operation using single expression", () => {
			const expression = builder.notIn( triplesBuilder.var( "foo" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "?foo NOT IN()" );
		} );

		it( "should create operation using single native", () => {
			const expression = builder.notIn( "foo" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "\"foo\" NOT IN()" );
		} );

		it( "should create operation wrapping non supported single operation", () => {
			const expression = builder.notIn( builder.gte( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ) ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "( ?foo >= ?bar ) NOT IN()" );
		} );


		it( "should create operation using multiple expressions", () => {
			const expression = builder.notIn( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ), triplesBuilder.var( "baz" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "?foo NOT IN( ?bar, ?baz )" );
		} );

		it( "should create operation using multiple natives", () => {
			const expression = builder.notIn( "foo", "bar", "baz" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "\"foo\" NOT IN( \"bar\", \"baz\" )" );
		} );

		it( "should create operation wrapping non supported multiple operations", () => {
			const expression = builder.notIn( builder.gte( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ) ), builder.gt( triplesBuilder.var( "baz" ), triplesBuilder.var( "qux" ) ), true );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "( ?foo >= ?bar ) NOT IN( ?baz > ?qux, true )" );
		} );

	} );


	describe( "OperationExpressionsBuilder.add", () => {

		let builder:OperationExpressionsBuilder;
		beforeEach( () => {
			builder = OperationExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.add ).toBeDefined();
			expect( builder.add ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create operation using single expression", () => {
			const expression = builder.add( triplesBuilder.var( "foo" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "?foo" );
		} );

		it( "should create operation using single native", () => {
			const expression = builder.add( "foo" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "\"foo\"" );
		} );

		it( "should create operation wrapping non supported single operation", () => {
			const expression = builder.add( builder.gte( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ) ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "( ?foo >= ?bar )" );
		} );


		it( "should create operation using multiple expressions", () => {
			const expression = builder.add( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ), triplesBuilder.var( "baz" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "?foo + ?bar + ?baz" );
		} );

		it( "should create operation using multiple natives", () => {
			const expression = builder.add( "foo", "bar", "baz" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "\"foo\" + \"bar\" + \"baz\"" );
		} );

		it( "should create operation wrapping non supported multiple operations", () => {
			const expression = builder.add( builder.gte( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ) ), builder.gt( triplesBuilder.var( "baz" ), triplesBuilder.var( "qux" ) ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "( ?foo >= ?bar ) + ( ?baz > ?qux )" );
		} );

	} );

	describe( "OperationExpressionsBuilder.subtract", () => {

		let builder:OperationExpressionsBuilder;
		beforeEach( () => {
			builder = OperationExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.subtract ).toBeDefined();
			expect( builder.subtract ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create operation using single expression", () => {
			const expression = builder.subtract( triplesBuilder.var( "foo" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "?foo" );
		} );

		it( "should create operation using single native", () => {
			const expression = builder.subtract( "foo" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "\"foo\"" );
		} );

		it( "should create operation wrapping non supported single operation", () => {
			const expression = builder.subtract( builder.add( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ) ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "( ?foo + ?bar )" );
		} );


		it( "should create operation using multiple expressions", () => {
			const expression = builder.subtract( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ), triplesBuilder.var( "baz" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "?foo - ?bar - ?baz" );
		} );

		it( "should create operation using multiple natives", () => {
			const expression = builder.subtract( "foo", "bar", "baz" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "\"foo\" - \"bar\" - \"baz\"" );
		} );

		it( "should create operation wrapping non supported multiple operations", () => {
			const expression = builder.subtract( builder.add( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ) ), builder.gte( triplesBuilder.var( "baz" ), triplesBuilder.var( "qux" ) ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "( ?foo + ?bar ) - ( ?baz >= ?qux )" );
		} );

	} );


	describe( "OperationExpressionsBuilder.multiply", () => {

		let builder:OperationExpressionsBuilder;
		beforeEach( () => {
			builder = OperationExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.multiply ).toBeDefined();
			expect( builder.multiply ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create operation using single expression", () => {
			const expression = builder.multiply( triplesBuilder.var( "foo" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "?foo" );
		} );

		it( "should create operation using single native", () => {
			const expression = builder.multiply( "foo" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "\"foo\"" );
		} );

		it( "should create operation wrapping non supported single operation", () => {
			const expression = builder.multiply( builder.add( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ) ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "( ?foo + ?bar )" );
		} );


		it( "should create operation using multiple expressions", () => {
			const expression = builder.multiply( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ), triplesBuilder.var( "baz" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "?foo * ?bar * ?baz" );
		} );

		it( "should create operation using multiple natives", () => {
			const expression = builder.multiply( "foo", "bar", "baz" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "\"foo\" * \"bar\" * \"baz\"" );
		} );

		it( "should create operation wrapping non supported multiple operations", () => {
			const expression = builder.multiply( builder.subtract( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ) ), builder.add( triplesBuilder.var( "baz" ), triplesBuilder.var( "qux" ) ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "( ?foo - ?bar ) * ( ?baz + ?qux )" );
		} );

	} );

	describe( "OperationExpressionsBuilder.divide", () => {

		let builder:OperationExpressionsBuilder;
		beforeEach( () => {
			builder = OperationExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.divide ).toBeDefined();
			expect( builder.divide ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create operation using single expression", () => {
			const expression = builder.divide( triplesBuilder.var( "foo" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "?foo" );
		} );

		it( "should create operation using single native", () => {
			const expression = builder.divide( "foo" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "\"foo\"" );
		} );

		it( "should create operation wrapping non supported single operation", () => {
			const expression = builder.divide( builder.multiply( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ) ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "( ?foo * ?bar )" );
		} );


		it( "should create operation using multiple expressions", () => {
			const expression = builder.divide( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ), triplesBuilder.var( "baz" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "?foo / ?bar / ?baz" );
		} );

		it( "should create operation using multiple natives", () => {
			const expression = builder.divide( "foo", "bar", "baz" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "\"foo\" / \"bar\" / \"baz\"" );
		} );

		it( "should create operation wrapping non supported multiple operations", () => {
			const expression = builder.divide( builder.multiply( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ) ), builder.subtract( triplesBuilder.var( "baz" ), triplesBuilder.var( "qux" ) ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "( ?foo * ?bar ) / ( ?baz - ?qux )" );
		} );

	} );


	describe( "OperationExpressionsBuilder.not", () => {

		let builder:OperationExpressionsBuilder;
		beforeEach( () => {
			builder = OperationExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.not ).toBeDefined();
			expect( builder.not ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create operation using single expression", () => {
			const expression = builder.not( triplesBuilder.var( "foo" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "! ?foo" );
		} );

		it( "should create operation using single native", () => {
			const expression = builder.not( "foo" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "! \"foo\"" );
		} );

		it( "should create operation wrapping non supported single operation", () => {
			const expression = builder.not( builder.multiply( triplesBuilder.var( "foo" ), triplesBuilder.var( "bar" ) ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "! ( ?foo * ?bar )" );
		} );

	} );

	describe( "OperationExpressionsBuilder.plus", () => {

		let builder:OperationExpressionsBuilder;
		beforeEach( () => {
			builder = OperationExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.plus ).toBeDefined();
			expect( builder.plus ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create operation using single expression", () => {
			const expression = builder.plus( triplesBuilder.var( "foo" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "+ ?foo" );
		} );

		it( "should create operation using single native", () => {
			const expression = builder.plus( "foo" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "+ \"foo\"" );
		} );

		it( "should create operation wrapping non supported single operation", () => {
			const expression = builder.plus( builder.not( triplesBuilder.var( "foo" ) ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "+ ( ! ?foo )" );
		} );

	} );

	describe( "OperationExpressionsBuilder.minus", () => {

		let builder:OperationExpressionsBuilder;
		beforeEach( () => {
			builder = OperationExpressionsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.minus ).toBeDefined();
			expect( builder.minus ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create operation using single expression", () => {
			const expression = builder.minus( triplesBuilder.var( "foo" ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "- ?foo" );
		} );

		it( "should create operation using single native", () => {
			const expression = builder.minus( "foo" );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "- \"foo\"" );
		} );

		it( "should create operation wrapping non supported single operation", () => {
			const expression = builder.minus( builder.plus( triplesBuilder.var( "foo" ) ) );
			expect( expression.getExpression().toString( 0 ) ).toEqual( "- ( + ?foo )" );
		} );

	} );


} );