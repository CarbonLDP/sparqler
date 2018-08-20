import { spyContainers } from "../../../test/spies/Container";

import { Container } from "../../data/Container";
import { IRIResolver } from "../../data/IRIResolver";

import { BlankNodePropertyToken } from "../../tokens/BlankNodePropertyToken";
import { BlankNodeToken } from "../../tokens/BlankNodeToken";
import { CollectionToken } from "../../tokens/CollectionToken";
import { IRIRefToken } from "../../tokens/IRIRefToken";
import { LiteralToken } from "../../tokens/LiteralToken";
import { PrefixedNameToken } from "../../tokens/PrefixedNameToken";
import { PropertyToken } from "../../tokens/PropertyToken";
import { RDFLiteralToken } from "../../tokens/RDFLiteralToken";
import { SubjectToken } from "../../tokens/SubjectToken";
import { TripleToken } from "../../tokens/TripleToken";
import { VariableToken } from "../../tokens/VariableToken";

import { Pattern } from "../Pattern";

import { RDFLiteral } from "./RDFLiteral";
import { TriplePatternsBuilder } from "./TriplePatternsBuilder";
import { TripleSubject } from "./TripleSubject";


describe( "TriplePatternsBuilder", () => {

	it( "should exists", () => {
		expect( TriplePatternsBuilder ).toBeDefined();
		expect( TriplePatternsBuilder ).toEqual( jasmine.any( Object ) );
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


	describe( "TriplePatternsBuilder.createFrom", () => {

		it( "should exists", () => {
			expect( TriplePatternsBuilder.createFrom ).toBeDefined();
			expect( TriplePatternsBuilder.createFrom ).toEqual( jasmine.any( Function ) );
		} );

		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const finishPattern:TriplePatternsBuilder = TriplePatternsBuilder
				.createFrom( container, myObject );

			expect( myObject ).toBe( finishPattern );
		} );


		it( "should create a TriplePatternsBuilder object", () => {
			const finishPattern:TriplePatternsBuilder = TriplePatternsBuilder
				.createFrom( container, {} );

			expect( finishPattern ).toEqual( {
				resource: jasmine.any( Function ),
				var: jasmine.any( Function ),
				literal: jasmine.any( Function ),

				collection: jasmine.any( Function ),
				blankNode: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "TriplePatternsBuilder.resource", () => {

		let builder:TriplePatternsBuilder;
		beforeEach( () => {
			builder = TriplePatternsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.resource ).toBeDefined();
			expect( builder.resource ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return triple pattern", () => {
			const spy:jasmine.Spy = spyOn( TripleSubject, "createFrom" )
				.and.callThrough();

			const returned = builder.resource( "resource/" );
			expect( returned ).toBe( spy.calls.mostRecent().returnValue );
		} );


		it( "should create pattern with IRIToken", () => {
			builder.resource( "resource/" );

			type TheContainer = Container<TripleToken<IRIRefToken>>;
			const newContainer:TheContainer = spyContainers.getLast();
			expect( newContainer ).toEqual( jasmine.objectContaining<TheContainer>( {
				targetToken: new SubjectToken( new IRIRefToken( "resource/" ) ),
			} ) )
		} );

		it( "should create pattern with PrefixedNameToken", () => {
			builder.resource( "ex:resource/" );

			type TheContainer = Container<TripleToken<PrefixedNameToken>>;
			const newContainer:TheContainer = spyContainers.getLast();
			expect( newContainer ).toEqual( jasmine.objectContaining<TheContainer>( {
				targetToken: new SubjectToken( new PrefixedNameToken( "ex", "resource/" ) ),
			} ) );
		} );

		it( "should set used prefix when prefixed name", () => {
			builder.resource( "ex:resource/" );

			expect( container.iriResolver.prefixes ).toEqual( new Map( [
				[ "ex", true ],
			] ) )
		} );

	} );

	describe( "TriplePatternsBuilder.var", () => {

		let builder:TriplePatternsBuilder;
		beforeEach( () => {
			builder = TriplePatternsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.var ).toBeDefined();
			expect( builder.var ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return triple pattern", () => {
			const spy:jasmine.Spy = spyOn( TripleSubject, "createFrom" )
				.and.callThrough();

			const returned = builder.var( "var" );
			expect( returned ).toBe( spy.calls.mostRecent().returnValue );
		} );


		it( "should create pattern with VariableToken", () => {
			builder.var( "var" );

			type TheContainer = Container<TripleToken<VariableToken>>;
			const newContainer:TheContainer = spyContainers.getLast();
			expect( newContainer ).toEqual( jasmine.objectContaining<TheContainer>( {
				targetToken: new SubjectToken( new VariableToken( "var" ) ),
			} ) )
		} );

	} );

	describe( "TriplePatternsBuilder.literal", () => {

		let builder:TriplePatternsBuilder;
		beforeEach( () => {
			builder = TriplePatternsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.literal ).toBeDefined();
			expect( builder.literal ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return triple pattern when string", () => {
			const spy:jasmine.Spy = spyOn( TripleSubject, "createFrom" )
				.and.callThrough();

			const returned = builder.literal( "value" );
			expect( returned ).toBe( spy.calls.mostRecent().returnValue );
		} );

		it( "should return triple pattern when number", () => {
			const spy:jasmine.Spy = spyOn( TripleSubject, "createFrom" )
				.and.callThrough();

			const returned = builder.literal( 100 );
			expect( returned ).toBe( spy.calls.mostRecent().returnValue );
		} );

		it( "should return triple pattern when boolean", () => {
			const spy:jasmine.Spy = spyOn( TripleSubject, "createFrom" )
				.and.callThrough();

			const returned = builder.literal( true );
			expect( returned ).toBe( spy.calls.mostRecent().returnValue );
		} );

		it( "should return RDFLiteral when string", () => {
			const spy:jasmine.Spy = spyOn( RDFLiteral, "createFrom" )
				.and.callThrough();

			const returned = builder.literal( "value" );
			expect( returned ).toBe( spy.calls.mostRecent().returnValue );
		} );


		it( "should create pattern with RDFLiteralToken when string", () => {
			builder.literal( "value" );

			type TheContainer = Container<TripleToken<RDFLiteralToken>>;
			const newContainer:TheContainer = spyContainers.getLast();
			expect( newContainer ).toEqual( jasmine.objectContaining<TheContainer>( {
				targetToken: new SubjectToken( new RDFLiteralToken( "value" ) ),
			} ) )
		} );

		it( "should create pattern with LiteralToken when number", () => {
			builder.literal( 100 );

			type TheContainer = Container<TripleToken<LiteralToken>>;
			const newContainer:TheContainer = spyContainers.getLast();
			expect( newContainer ).toEqual( jasmine.objectContaining<TheContainer>( {
				targetToken: new SubjectToken( new LiteralToken( 100 ) ),
			} ) )
		} );

		it( "should create pattern with LiteralToken when boolean", () => {
			builder.literal( true );

			type TheContainer = Container<TripleToken<LiteralToken>>;
			const newContainer:TheContainer = spyContainers.getLast();
			expect( newContainer ).toEqual( jasmine.objectContaining<TheContainer>( {
				targetToken: new SubjectToken( new LiteralToken( true ) ),
			} ) )
		} );


	} );


	describe( "TriplePatternsBuilder.collection", () => {

		let builder:TriplePatternsBuilder;
		beforeEach( () => {
			builder = TriplePatternsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.collection ).toBeDefined();
			expect( builder.collection ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return triple node pattern", () => {
			const spyTriple:jasmine.Spy = spyOn( TripleSubject, "createFrom" )
				.and.callThrough();
			const spyPattern:jasmine.Spy = spyOn( Pattern, "createFrom" )
				.and.callThrough();

			const returned = builder.collection();
			expect( returned ).toBe( spyTriple.calls.mostRecent().returnValue );
			expect( returned ).toBe( spyPattern.calls.mostRecent().returnValue );
		} );


		it( "should create pattern with CollectionToken", () => {
			builder.collection();

			type TheContainer = Container<TripleToken<CollectionToken>>;
			const newContainer:TheContainer = spyContainers.getLast();
			expect( newContainer ).toEqual( jasmine.objectContaining<TheContainer>( {
				targetToken: new SubjectToken( new CollectionToken() ),
			} ) )
		} );

		it( "should add values to the CollectionToken", () => {
			builder.collection(
				"string",
				100,
				true,
				builder.resource( "resource/" ),
				builder.var( "var" ),
				builder.literal( "another" ),
			);

			type TheContainer = Container<TripleToken<CollectionToken>>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer.targetToken.subject ).toEqual( new CollectionToken()
				.addObject( new LiteralToken( "string" ) )
				.addObject( new LiteralToken( 100 ) )
				.addObject( new LiteralToken( true ) )
				.addObject( new IRIRefToken( "resource/" ) )
				.addObject( new VariableToken( "var" ) )
				.addObject( new RDFLiteralToken( "another" ) )
			)
		} );

	} );

	describe( "TriplePatternsBuilder.blankNode", () => {

		let builder:TriplePatternsBuilder;
		beforeEach( () => {
			builder = TriplePatternsBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.blankNode ).toBeDefined();
			expect( builder.blankNode ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return only triple when label", () => {
			const spyTriple:jasmine.Spy = spyOn( TripleSubject, "createFrom" )
				.and.callThrough();
			const spyPattern:jasmine.Spy = spyOn( Pattern, "createFrom" )
				.and.callThrough();

			const returned = builder.blankNode( "label" );
			expect( returned ).toBe( spyTriple.calls.mostRecent().returnValue );
			expect( spyPattern ).not.toHaveBeenCalled();
		} );

		it( "should return only triple when NO label", () => {
			const spyTriple:jasmine.Spy = spyOn( TripleSubject, "createFrom" )
				.and.callThrough();
			const spyPattern:jasmine.Spy = spyOn( Pattern, "createFrom" )
				.and.callThrough();

			const returned = builder.blankNode();
			expect( returned ).toBe( spyTriple.calls.mostRecent().returnValue );
			expect( spyPattern ).not.toHaveBeenCalled();
		} );

		it( "should return triple node when function", () => {
			const spyTriple:jasmine.Spy = spyOn( TripleSubject, "createFrom" )
				.and.callThrough();
			const spyPattern:jasmine.Spy = spyOn( Pattern, "createFrom" )
				.and.callThrough();

			const returned = builder.blankNode( _ => _.has( "prop", "value" ) );
			expect( returned ).toBe( spyTriple.calls.mostRecent().returnValue );
			expect( returned ).toBe( spyPattern.calls.mostRecent().returnValue );
		} );


		it( "should create pattern with BlankNodeToken when label name", () => {
			builder.blankNode( "label" );

			type TheContainer = Container<TripleToken<BlankNodeToken>>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer ).toEqual( jasmine.objectContaining<TheContainer>( {
				targetToken: new SubjectToken( new BlankNodeToken( "_:label" ) ),
			} ) )
		} );

		it( "should create pattern with BlankNodeToken when complete name", () => {
			builder.blankNode( "_:label" );

			type TheContainer = Container<TripleToken<BlankNodeToken>>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer ).toEqual( jasmine.objectContaining<TheContainer>( {
				targetToken: new SubjectToken( new BlankNodeToken( "_:label" ) ),
			} ) )
		} );

		it( "should create pattern with BlankNodeToken when NO label", () => {
			builder.blankNode();

			type TheContainer = Container<TripleToken<BlankNodeToken>>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer ).toEqual( jasmine.objectContaining<TheContainer>( {
				targetToken: new SubjectToken( new BlankNodeToken() ),
			} ) )
		} );


		it( "should throw error if no properties added when function", () => {
			expect( () => {
				builder.blankNode( _ => _ );
			} ).toThrowError( "At least one property must be specified by the self builder." );
		} );

		it( "should create pattern with BlankNodePropertyToken when function", () => {
			builder.blankNode( _ => _.has( "prop", "value" ) );

			type TheContainer = Container<TripleToken<BlankNodePropertyToken>>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer ).toEqual( jasmine.objectContaining<TheContainer>( {
				targetToken: new SubjectToken( jasmine.any( BlankNodePropertyToken ) as any ),
			} ) )
		} );

		it( "should add properties to the BlankNodePropertyToken when function", () => {
			builder.blankNode( _ => _
				.has( "prop", "value" )
				.and( "prop2", [
					"string",
					100,
					true,
					builder.resource( "resource/" ),
					builder.var( "var" ),
					builder.literal( "another" ),
				] )
			);

			type TheContainer = Container<TripleToken<BlankNodePropertyToken>>;
			const newContainer:TheContainer = spyContainers.getLast();

			expect( newContainer.targetToken.subject ).toEqual( new BlankNodePropertyToken()
				.addProperty( new PropertyToken( "<prop>" as "a" )
					.addObject( new LiteralToken( "value" ) )
				)
				.addProperty( new PropertyToken( "<prop2>" as "a" )
					.addObject( new LiteralToken( "string" ) )
					.addObject( new LiteralToken( 100 ) )
					.addObject( new LiteralToken( true ) )
					.addObject( new IRIRefToken( "resource/" ) )
					.addObject( new VariableToken( "var" ) )
					.addObject( new RDFLiteralToken( "another" ) )
				)
			)
		} );

	} );

} );


