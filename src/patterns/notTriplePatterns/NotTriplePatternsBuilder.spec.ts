import { spyContainers } from "../../../test/spies/Container";

import { Container } from "../../data/Container";
import { IRIResolver } from "../../data/IRIResolver";

import { BindToken } from "../../tokens/BindToken";
import { FilterToken } from "../../tokens/FilterToken";
import { GraphToken } from "../../tokens/GraphToken";
import { GroupPatternToken } from "../../tokens/GroupPatternToken";
import { IRIToken } from "../../tokens/IRIToken";
import { MinusPatternToken } from "../../tokens/MinusPatternToken";
import { OptionalToken } from "../../tokens/OptionalToken";
import { PrefixedNameToken } from "../../tokens/PrefixedNameToken";
import { ServicePatternToken } from "../../tokens/ServicePatternToken";
import { SubjectToken } from "../../tokens/SubjectToken";
import { ValuesToken } from "../../tokens/ValuesToken";
import { VariableToken } from "../../tokens/VariableToken";

import { TriplePatternHas } from "../triplePatterns/TriplePatternHas";
import { Variable } from "../triplePatterns/Variable";

import { MultipleValuesPattern } from "./MultipleValuesPattern";
import { NotTriplePattern } from "./NotTriplePattern";
import { NotTriplePatternsBuilder } from "./NotTriplePatternsBuilder";
import { SingleValuesPattern } from "./SingleValuesPattern";


describe( "NotTriplePatternsBuilder", () => {

	it( "should exists", () => {
		expect( NotTriplePatternsBuilder ).toBeDefined();
		expect( NotTriplePatternsBuilder ).toEqual( jasmine.any( Object ) );
	} );

	let container:Container<undefined>;
	beforeEach( () => {
		const iriResolver:IRIResolver = new IRIResolver();
		iriResolver.prefixes.set( "ex", false );

		container = new Container( {
			iriResolver: iriResolver,
			targetToken: void 0,
		} );

		spyContainers.install();
	} );

	afterEach( () => {
		spyContainers.uninstall();
	} );

	function getVariable( name:string ):Variable {
		return TriplePatternHas.createFrom( new Container( {
			iriResolver: container.iriResolver,
			targetToken: new SubjectToken( new VariableToken( name ) ),
		} ), {} );
	}


	describe( "NotTriplePatternsBuilder.createFrom", () => {

		it( "should exists", () => {
			expect( NotTriplePatternsBuilder.createFrom ).toBeDefined();
			expect( NotTriplePatternsBuilder.createFrom ).toEqual( jasmine.any( Function ) );
		} );

		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const finishPattern:NotTriplePatternsBuilder = NotTriplePatternsBuilder
				.createFrom( container, myObject );

			expect( myObject ).toBe( finishPattern );
		} );


		it( "should create a NotTriplePatternsBuilder object", () => {
			const finishPattern:NotTriplePatternsBuilder = NotTriplePatternsBuilder
				.createFrom( container, {} );

			expect( finishPattern ).toEqual( {
				undefined: "UNDEF",

				graph: jasmine.any( Function ),
				group: jasmine.any( Function ),
				optional: jasmine.any( Function ),
				minus: jasmine.any( Function ),
				service: jasmine.any( Function ),
				serviceSilent: jasmine.any( Function ),

				filter: jasmine.any( Function ),
				bind: jasmine.any( Function ),
				values: jasmine.any( Function ),
			} );
		} );

	} );


	class MockPatternToken extends GroupPatternToken {
		readonly label:string;

		constructor( label:string ) {
			super();
			this.label = label;
		}
	}

	describe( "NotTriplePatternsBuilder.graph", () => {

		let builder:NotTriplePatternsBuilder;
		beforeEach( () => {
			builder = NotTriplePatternsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.graph ).toBeDefined();
			expect( builder.graph ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return not triple pattern", () => {
			const spy:jasmine.Spy = spyOn( NotTriplePattern, "createFrom" )
				.and.callThrough();

			const returned = builder.graph( "graph/", [] );
			expect( returned ).toBe( spy.calls.mostRecent().returnValue );
		} );


		it( "should create pattern with IRIToken", () => {
			builder.graph( "graph/", [] );

			type TheContainer = Container<GraphToken>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer ).toEqual( jasmine.objectContaining<TheContainer>( {
				targetToken: new GraphToken( new IRIToken( "graph/" ) ),
			} ) )
		} );

		it( "should create pattern with PrefixedNameToken", () => {
			builder.graph( "ex:graph/", [] );

			type TheContainer = Container<GraphToken>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer ).toEqual( jasmine.objectContaining<TheContainer>( {
				targetToken: new GraphToken( new PrefixedNameToken( "ex", "graph/" ) ),
			} ) );
		} );

		it( "should set used prefix when prefixed name", () => {
			builder.graph( "ex:graph/", [] );

			expect( container.iriResolver.prefixes ).toEqual( new Map( [
				[ "ex", true ],
			] ) )
		} );


		it( "should add the pattern to the token", () => {
			builder.graph( "ex:graph/", {
				getPattern: () => new MockPatternToken( "graph pattern" ),
			} );

			type TheContainer = Container<GraphToken>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer.targetToken.groupPattern.patterns )
				.toContain( new MockPatternToken( "graph pattern" ) );
		} );

		it( "should add the patterns to the token", () => {
			builder.graph( "ex:graph/", [
				{ getPattern: () => new MockPatternToken( "graph pattern 1" ) },
				{ getPattern: () => new MockPatternToken( "graph pattern 2" ) },
				{ getPattern: () => new MockPatternToken( "graph pattern 3" ) },
			] );

			type TheContainer = Container<GraphToken>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer.targetToken.groupPattern.patterns )
				.toContain( new MockPatternToken( "graph pattern 1" ) );
			expect( newContainer.targetToken.groupPattern.patterns )
				.toContain( new MockPatternToken( "graph pattern 2" ) );
			expect( newContainer.targetToken.groupPattern.patterns )
				.toContain( new MockPatternToken( "graph pattern 2" ) );
		} );

	} );

	describe( "NotTriplePatternsBuilder.group", () => {

		let builder:NotTriplePatternsBuilder;
		beforeEach( () => {
			builder = NotTriplePatternsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.group ).toBeDefined();
			expect( builder.group ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return not triple pattern", () => {
			const spy:jasmine.Spy = spyOn( NotTriplePattern, "createFrom" )
				.and.callThrough();

			const returned = builder.group( [] );
			expect( returned ).toBe( spy.calls.mostRecent().returnValue );
		} );


		it( "should create pattern with GroupPatternToken", () => {
			builder.group( [] );

			type TheContainer = Container<GroupPatternToken>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer ).toEqual( jasmine.objectContaining<TheContainer>( {
				targetToken: new GroupPatternToken(),
			} ) )
		} );


		it( "should add the pattern to the token", () => {
			builder.group( {
				getPattern: () => new MockPatternToken( "group pattern" ),
			} );

			type TheContainer = Container<GroupPatternToken>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer.targetToken.patterns )
				.toContain( new MockPatternToken( "group pattern" ) );
		} );

		it( "should add the patterns to the token", () => {
			builder.group( [
				{ getPattern: () => new MockPatternToken( "group pattern 1" ) },
				{ getPattern: () => new MockPatternToken( "group pattern 2" ) },
				{ getPattern: () => new MockPatternToken( "group pattern 3" ) },
			] );

			type TheContainer = Container<GroupPatternToken>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer.targetToken.patterns )
				.toContain( new MockPatternToken( "group pattern 1" ) );
			expect( newContainer.targetToken.patterns )
				.toContain( new MockPatternToken( "group pattern 2" ) );
			expect( newContainer.targetToken.patterns )
				.toContain( new MockPatternToken( "group pattern 2" ) );
		} );

	} );

	describe( "NotTriplePatternsBuilder.optional", () => {

		let builder:NotTriplePatternsBuilder;
		beforeEach( () => {
			builder = NotTriplePatternsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.optional ).toBeDefined();
			expect( builder.optional ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return not triple pattern", () => {
			const spy:jasmine.Spy = spyOn( NotTriplePattern, "createFrom" )
				.and.callThrough();

			const returned = builder.optional( [] );
			expect( returned ).toBe( spy.calls.mostRecent().returnValue );
		} );


		it( "should create pattern with OptionalToken", () => {
			builder.optional( [] );

			type TheContainer = Container<OptionalToken>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer ).toEqual( jasmine.objectContaining<TheContainer>( {
				targetToken: new OptionalToken(),
			} ) )
		} );


		it( "should add the pattern to the token", () => {
			builder.optional( {
				getPattern: () => new MockPatternToken( "optional pattern" ),
			} );

			type TheContainer = Container<OptionalToken>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer.targetToken.groupPattern.patterns )
				.toContain( new MockPatternToken( "optional pattern" ) );
		} );

		it( "should add the patterns to the token", () => {
			builder.optional( [
				{ getPattern: () => new MockPatternToken( "optional pattern 1" ) },
				{ getPattern: () => new MockPatternToken( "optional pattern 2" ) },
				{ getPattern: () => new MockPatternToken( "optional pattern 3" ) },
			] );

			type TheContainer = Container<OptionalToken>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer.targetToken.groupPattern.patterns )
				.toContain( new MockPatternToken( "optional pattern 1" ) );
			expect( newContainer.targetToken.groupPattern.patterns )
				.toContain( new MockPatternToken( "optional pattern 2" ) );
			expect( newContainer.targetToken.groupPattern.patterns )
				.toContain( new MockPatternToken( "optional pattern 2" ) );
		} );

	} );

	describe( "NotTriplePatternsBuilder.minus", () => {

		let builder:NotTriplePatternsBuilder;
		beforeEach( () => {
			builder = NotTriplePatternsBuilder
				.createFrom( container, {} );
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
			builder.minus( {
				getPattern: () => new MockPatternToken( "minus pattern" ),
			} );

			type TheContainer = Container<MinusPatternToken>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer.targetToken.groupPattern.patterns )
				.toContain( new MockPatternToken( "minus pattern" ) );
		} );

		it( "should add the patterns to the token", () => {
			builder.minus( [
				{ getPattern: () => new MockPatternToken( "minus pattern 1" ) },
				{ getPattern: () => new MockPatternToken( "minus pattern 2" ) },
				{ getPattern: () => new MockPatternToken( "minus pattern 3" ) },
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

	describe( "NotTriplePatternsBuilder.service", () => {

		let builder:NotTriplePatternsBuilder;
		beforeEach( () => {
			builder = NotTriplePatternsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.service ).toBeDefined();
			expect( builder.service ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return not triple pattern", () => {
			const spy:jasmine.Spy = spyOn( NotTriplePattern, "createFrom" )
				.and.callThrough();

			const returned = builder.service( "service/", [] );
			expect( returned ).toBe( spy.calls.mostRecent().returnValue );
		} );


		it( "should create pattern with string IRIToken", () => {
			builder.service( "service/", [] );

			type TheContainer = Container<ServicePatternToken>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer ).toEqual( jasmine.objectContaining<TheContainer>( {
				targetToken: new ServicePatternToken( new IRIToken( "service/" ) ),
			} ) )
		} );

		it( "should create pattern with string PrefixedNameToken", () => {
			builder.service( "ex:service/", [] );

			type TheContainer = Container<ServicePatternToken>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer ).toEqual( jasmine.objectContaining<TheContainer>( {
				targetToken: new ServicePatternToken( new PrefixedNameToken( "ex", "service/" ) ),
			} ) );
		} );

		it( "should set used prefix when prefixed name", () => {
			builder.service( "ex:service/", [] );

			expect( container.iriResolver.prefixes ).toEqual( new Map( [
				[ "ex", true ],
			] ) )
		} );

		it( "should create pattern with IRIToken", () => {
			builder.service( { getSubject: () => new IRIToken( "service/" ), has: () => ({}) as any }, [] );

			type TheContainer = Container<ServicePatternToken>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer ).toEqual( jasmine.objectContaining<TheContainer>( {
				targetToken: new ServicePatternToken( new IRIToken( "service/" ) ),
			} ) )
		} );

		it( "should create pattern with VariableToken", () => {
			builder.service( { getSubject: () => new VariableToken( "service" ), has: () => ({}) as any }, [] );

			type TheContainer = Container<ServicePatternToken>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer ).toEqual( jasmine.objectContaining<TheContainer>( {
				targetToken: new ServicePatternToken( new VariableToken( "service" ) ),
			} ) );
		} );


		it( "should add the pattern to the token", () => {
			builder.service( "ex:service/", {
				getPattern: () => new MockPatternToken( "service pattern" ),
			} );

			type TheContainer = Container<ServicePatternToken>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer.targetToken.groupPattern.patterns )
				.toContain( new MockPatternToken( "service pattern" ) );
		} );

		it( "should add the patterns to the token", () => {
			builder.service( "ex:service/", [
				{ getPattern: () => new MockPatternToken( "service pattern 1" ) },
				{ getPattern: () => new MockPatternToken( "service pattern 2" ) },
				{ getPattern: () => new MockPatternToken( "service pattern 3" ) },
			] );

			type TheContainer = Container<ServicePatternToken>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer.targetToken.groupPattern.patterns )
				.toContain( new MockPatternToken( "service pattern 1" ) );
			expect( newContainer.targetToken.groupPattern.patterns )
				.toContain( new MockPatternToken( "service pattern 2" ) );
			expect( newContainer.targetToken.groupPattern.patterns )
				.toContain( new MockPatternToken( "service pattern 2" ) );
		} );

	} );

	describe( "NotTriplePatternsBuilder.serviceSilent", () => {

		let builder:NotTriplePatternsBuilder;
		beforeEach( () => {
			builder = NotTriplePatternsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.serviceSilent ).toBeDefined();
			expect( builder.serviceSilent ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return not triple pattern", () => {
			const spy:jasmine.Spy = spyOn( NotTriplePattern, "createFrom" )
				.and.callThrough();

			const returned = builder.serviceSilent( "service/", [] );
			expect( returned ).toBe( spy.calls.mostRecent().returnValue );
		} );


		it( "should create pattern with string IRIToken", () => {
			builder.serviceSilent( "service/", [] );

			type TheContainer = Container<ServicePatternToken>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer ).toEqual( jasmine.objectContaining<TheContainer>( {
				targetToken: new ServicePatternToken( new IRIToken( "service/" ), "SILENT" ),
			} ) )
		} );

		it( "should create pattern with string PrefixedNameToken", () => {
			builder.serviceSilent( "ex:service/", [] );

			type TheContainer = Container<ServicePatternToken>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer ).toEqual( jasmine.objectContaining<TheContainer>( {
				targetToken: new ServicePatternToken( new PrefixedNameToken( "ex", "service/" ), "SILENT" ),
			} ) );
		} );

		it( "should set used prefix when prefixed name", () => {
			builder.serviceSilent( "ex:service/", [] );

			expect( container.iriResolver.prefixes ).toEqual( new Map( [
				[ "ex", true ],
			] ) )
		} );

		it( "should create pattern with IRIToken", () => {
			builder.serviceSilent( { getSubject: () => new IRIToken( "service/" ), has: () => ({}) as any }, [] );

			type TheContainer = Container<ServicePatternToken>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer ).toEqual( jasmine.objectContaining<TheContainer>( {
				targetToken: new ServicePatternToken( new IRIToken( "service/" ), "SILENT" ),
			} ) )
		} );

		it( "should create pattern with VariableToken", () => {
			builder.serviceSilent( { getSubject: () => new VariableToken( "service" ), has: () => ({}) as any }, [] );

			type TheContainer = Container<ServicePatternToken>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer ).toEqual( jasmine.objectContaining<TheContainer>( {
				targetToken: new ServicePatternToken( new VariableToken( "service" ), "SILENT" ),
			} ) );
		} );


		it( "should add the pattern to the token", () => {
			builder.serviceSilent( "ex:service/", {
				getPattern: () => new MockPatternToken( "service pattern" ),
			} );

			type TheContainer = Container<ServicePatternToken>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer.targetToken.groupPattern.patterns )
				.toContain( new MockPatternToken( "service pattern" ) );
		} );

		it( "should add the patterns to the token", () => {
			builder.serviceSilent( "ex:service/", [
				{ getPattern: () => new MockPatternToken( "service pattern 1" ) },
				{ getPattern: () => new MockPatternToken( "service pattern 2" ) },
				{ getPattern: () => new MockPatternToken( "service pattern 3" ) },
			] );

			type TheContainer = Container<ServicePatternToken>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer.targetToken.groupPattern.patterns )
				.toContain( new MockPatternToken( "service pattern 1" ) );
			expect( newContainer.targetToken.groupPattern.patterns )
				.toContain( new MockPatternToken( "service pattern 2" ) );
			expect( newContainer.targetToken.groupPattern.patterns )
				.toContain( new MockPatternToken( "service pattern 2" ) );
		} );

	} );


	describe( "NotTriplePatternsBuilder.filter", () => {

		let builder:NotTriplePatternsBuilder;
		beforeEach( () => {
			builder = NotTriplePatternsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.filter ).toBeDefined();
			expect( builder.filter ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return not triple pattern", () => {
			const spy:jasmine.Spy = spyOn( NotTriplePattern, "createFrom" )
				.and.callThrough();

			const returned = builder.filter( "?var > 0" );
			expect( returned ).toBe( spy.calls.mostRecent().returnValue );
		} );


		it( "should create pattern with string FilterToken", () => {
			builder.filter( "?var > 0" );

			type TheContainer = Container<FilterToken>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer ).toEqual( jasmine.objectContaining<TheContainer>( {
				targetToken: new FilterToken( "?var > 0" ),
			} ) )
		} );

	} );

	describe( "NotTriplePatternsBuilder.bind", () => {

		let builder:NotTriplePatternsBuilder;
		beforeEach( () => {
			builder = NotTriplePatternsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.bind ).toBeDefined();
			expect( builder.bind ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return not triple pattern", () => {
			const spy:jasmine.Spy = spyOn( NotTriplePattern, "createFrom" )
				.and.callThrough();

			const returned = builder.bind( "?var > 0", "result" );
			expect( returned ).toBe( spy.calls.mostRecent().returnValue );
		} );


		it( "should create pattern with string FilterToken", () => {
			builder.bind( "?var > 0", "result" );

			type TheContainer = Container<BindToken>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer ).toEqual( jasmine.objectContaining<TheContainer>( {
				targetToken: jasmine.any( BindToken ) as any as BindToken,
			} ) )
		} );

		it( "should add the RAW expression", () => {
			builder.bind( "?var > 0", "result" );

			type TheContainer = Container<BindToken>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer.targetToken.expression ).toEqual( "?var > 0" );
		} );

		it( "should add the variable when string", () => {
			builder.bind( "?var > 0", "result" );

			type TheContainer = Container<BindToken>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer.targetToken.variable ).toEqual( new VariableToken( "result" ) );
		} );

		it( "should add the variable when Variable", () => {
			const variable:Variable = getVariable( "result" );
			builder.bind( "?var > 0", variable );

			type TheContainer = Container<BindToken>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer.targetToken.variable ).toEqual( new VariableToken( "result" ) );
		} );

	} );

	describe( "NotTriplePatternsBuilder.values", () => {

		let builder:NotTriplePatternsBuilder;
		beforeEach( () => {
			builder = NotTriplePatternsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.values ).toBeDefined();
			expect( builder.values ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return single values pattern when one variable", () => {
			const spy:jasmine.Spy = spyOn( SingleValuesPattern, "createFrom" )
				.and.callThrough();

			const returned = builder.values( getVariable( "var" ) );
			expect( returned ).toBe( spy.calls.mostRecent().returnValue );
		} );

		it( "should return multiple values pattern when NO variable", () => {
			const spy:jasmine.Spy = spyOn( MultipleValuesPattern, "createFrom" )
				.and.callThrough();

			const returned = builder.values();
			expect( returned ).toBe( spy.calls.mostRecent().returnValue );
		} );

		it( "should return multiple values pattern when multiple variable", () => {
			const spy:jasmine.Spy = spyOn( MultipleValuesPattern, "createFrom" )
				.and.callThrough();

			const returned = builder.values( getVariable( "var1" ), getVariable( "var2" ) );
			expect( returned ).toBe( spy.calls.mostRecent().returnValue );
		} );


		it( "should create token ValuesToken with one variable", () => {
			builder.values( getVariable( "var" ) );

			type TheContainer = Container<ValuesToken>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer.targetToken ).toEqual( new ValuesToken()
				.addVariables( new VariableToken( "var" ) )
			);
		} );

		it( "should create token ValuesToken with NO variable", () => {
			builder.values();

			type TheContainer = Container<ValuesToken>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer.targetToken ).toEqual( new ValuesToken() );
		} );

		it( "should create token ValuesToken with multiple variable", () => {
			builder.values( getVariable( "var1" ), getVariable( "var2" ) );

			type TheContainer = Container<ValuesToken>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer.targetToken ).toEqual( new ValuesToken()
				.addVariables( new VariableToken( "var1" ), new VariableToken( "var2" ) )
			);
		} );

	} );

} );


