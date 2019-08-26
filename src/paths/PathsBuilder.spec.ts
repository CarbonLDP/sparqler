import { spyContainers } from "../../test/spies/FluentPathContainer";

import { Container } from "../core/containers/Container";
import { IRIResolver } from "../core/iri/IRIResolver";

import { IRIRefToken } from "../tokens/IRIRefToken";
import { IRIToken } from "../tokens/IRIToken";
import { PathToken } from "../tokens/PathToken";

import { Resource } from "../patterns/triplePatterns/Resource";

import { Path } from "./Path";
import { PathsBuilder } from "./PathsBuilder";


describe( "PathsBuilder", () => {

	it( "should exists", () => {
		expect( PathsBuilder ).toBeDefined();
		expect( PathsBuilder ).toEqual( jasmine.any( Object ) );
	} );

	let container:Container<undefined>;
	beforeEach( () => {
		container = new Container( {
			iriResolver: new IRIResolver(),
			targetToken: void 0,
		} );

		spyContainers.install();
	} );

	afterEach( () => {
		spyContainers.uninstall();
	} );


	describe( "PathsBuilder.createFrom", () => {

		it( "should exists", () => {
			expect( PathsBuilder.createFrom ).toBeDefined();
			expect( PathsBuilder.createFrom ).toEqual( jasmine.any( Function ) );
		} );

		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const builder:PathsBuilder = PathsBuilder
				.createFrom( container, myObject );

			expect( myObject ).toBe( builder );
		} );


		it( "should create a PathsBuilder object", () => {
			const builder:PathsBuilder = PathsBuilder
				.createFrom( container, {} );

			expect( builder ).toEqual( {
				path: jasmine.any( Function ),
			} );
		} );

	} );


	function createResource( iri:string ):Resource {
		return Resource.createFrom( new Container( {
			iriResolver: container.iriResolver,
			targetToken: new IRIRefToken( iri ),
		} ), {} );
	}

	function createMockPath<T extends PathToken>( token:T ):Path<T> {
		const pathContainer:Container<T> = new Container( {
			iriResolver: container.iriResolver,
			targetToken: token,
		} );
		return Path.createFrom( pathContainer, {} );
	}


	describe( "PathsBuilder.path", () => {

		let builder:PathsBuilder;
		beforeEach( () => {
			builder = PathsBuilder.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.path ).toBeDefined();
			expect( builder.path ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return Path from Resource", () => {
			const path = builder.path( createResource( "resource/" ) );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),

				subPath: jasmine.any( Function ),
				or: jasmine.any( Function ),
				then: jasmine.any( Function ),
				inverse: jasmine.any( Function ),
				negated: jasmine.any( Function ),
				oneOrNone: jasmine.any( Function ),
				zeroOrMore: jasmine.any( Function ),
				onceOrMore: jasmine.any( Function ),
			} );
		} );

		it( "should return Path from property string", () => {
			const path = builder.path( "resource/" );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),

				subPath: jasmine.any( Function ),
				or: jasmine.any( Function ),
				then: jasmine.any( Function ),
				inverse: jasmine.any( Function ),
				negated: jasmine.any( Function ),
				oneOrNone: jasmine.any( Function ),
				zeroOrMore: jasmine.any( Function ),
				onceOrMore: jasmine.any( Function ),
			} );
		} );

		it( "should return Path from keyword a", () => {
			const path = builder.path( "a" );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),

				subPath: jasmine.any( Function ),
				or: jasmine.any( Function ),
				then: jasmine.any( Function ),
				inverse: jasmine.any( Function ),
				negated: jasmine.any( Function ),
				oneOrNone: jasmine.any( Function ),
				zeroOrMore: jasmine.any( Function ),
				onceOrMore: jasmine.any( Function ),
			} );
		} );


		it( "should create Path from Resource's IRIToken", () => {
			builder.path( createResource( "resource/" ) );

			const container:Container<IRIToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new IRIRefToken( "resource/" ) );
		} );

		it( "should create Path from string IRIToken", () => {
			builder.path( "resource/" );

			const container:Container<IRIToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new IRIRefToken( "resource/" ) );
		} );

		it( "should create Path from keyword a", () => {
			builder.path( "a" );

			const container:Container<"a"> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( "a" );
		} );


		it( "should provide PathBuilder when function", () => {
			const spy:jasmine.Spy = jasmine.createSpy();

			builder.path( spy );
			expect( spy ).toHaveBeenCalledWith( {
				subPath: jasmine.any( Function ),

				alternatives: jasmine.any( Function ),
				sequences: jasmine.any( Function ),

				inverse: jasmine.any( Function ),
				negated: jasmine.any( Function ),

				oneOrNone: jasmine.any( Function ),
				zeroOrMore: jasmine.any( Function ),
				onceOrMore: jasmine.any( Function ),
			} );
		} );

		it( "should return the Path constructed", () => {
			const path = createMockPath( new IRIRefToken( "path-resource/" ) );
			const spy:jasmine.Spy = jasmine.createSpy().and.returnValue( path );

			const returned = builder.path( spy );
			expect( returned ).toBe( path );
		} );

	} );

} );
