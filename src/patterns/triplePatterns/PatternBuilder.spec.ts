import { spyContainers } from "../../../test/spies/clones";

import { Container } from "../../data/Container";
import { Factory } from "../../data/Factory";
import { IRIResolver } from "../../data/IRIResolver";

import { BlankNodePropertyToken } from "../../tokens/BlankNodePropertyToken";
import { IRIToken } from "../../tokens/IRIToken";
import { PropertyToken } from "../../tokens/PropertyToken";
import { SubjectToken } from "../../tokens/SubjectToken";
import { TripleToken } from "../../tokens/TripleToken";
import { VariableToken } from "../../tokens/VariableToken";

import { PropertyBuilder, PropertyBuilderMore } from "./PropertyBuilder";
import { Resource } from "./Resource";
import { TripleSubject } from "./TripleSubject";
import { Variable } from "./Variable";


describe( "PropertyBuilder", () => {

	it( "should exists", () => {
		expect( PropertyBuilder ).toBeDefined();
		expect( PropertyBuilder ).toEqual( jasmine.any( Object ) );
	} );

	let genericFactory:Factory<any, { generic:boolean }>;
	let container:Container<TripleToken | BlankNodePropertyToken>;
	beforeEach( () => {
		genericFactory = ( container1, object ) => Object.assign( object, {
			generic: true,
		} );

		const vocab:string = "https://example.com/ns#";

		const iriResolver:IRIResolver = new IRIResolver( undefined, vocab );
		iriResolver.prefixes.set( "ex", false );

		container = new Container( {
			iriResolver,
			targetToken: new SubjectToken( new IRIToken( "" ) )
		} );

		spyContainers.install();
	} );

	afterEach( () => {
		spyContainers.uninstall();
	} );

	function getVariable( name:string ):Variable {
		return TripleSubject.createFrom( new Container( {
			iriResolver: container.iriResolver,
			targetToken: new SubjectToken( new VariableToken( name ) ),
		} ), {} );
	}

	function getResource( iri:string ):Resource {
		return TripleSubject.createFrom( new Container( {
			iriResolver: container.iriResolver,
			targetToken: new SubjectToken( new IRIToken( iri ) ),
		} ), {} );
	}


	describe( "PropertyBuilder.createFrom", () => {

		it( "should exists", () => {
			expect( PropertyBuilder.createFrom ).toBeDefined();
			expect( PropertyBuilder.createFrom ).toEqual( jasmine.any( Function ) );
		} );


		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const triplePattern:PropertyBuilder<any> = PropertyBuilder
				.createFrom( genericFactory, container, myObject );

			expect( myObject ).toBe( triplePattern );
		} );

		it( "should create a PropertyBuilder object", () => {
			const triplePattern:PropertyBuilder<{ generic:boolean }> = PropertyBuilder
				.createFrom( genericFactory, container, {} );

			expect( triplePattern ).toEqual( {
				has: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "PropertyBuilder.has", () => {

		let triplePattern:PropertyBuilder<{ generic:boolean }>;
		beforeEach( () => {
			triplePattern = PropertyBuilder
				.createFrom( genericFactory, container, {} );
		} );

		it( "should exists", () => {
			expect( triplePattern.has ).toBeDefined();
			expect( triplePattern.has ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return the PropertyBuilderMore", () => {
			const returned = triplePattern.has( "", [] );

			expect( returned ).toEqual( {
				and: jasmine.any( Function ),

				// Generic
				generic: true,
			} );
		} );


		it( "should add the property Variable", () => {
			const variables:Variable = getVariable( "var" );
			triplePattern.has( variables, [] );

			const newContainer:Container<TripleToken | BlankNodePropertyToken> = spyContainers.getLast();
			expect( newContainer.targetToken.properties ).toContain( jasmine.objectContaining<PropertyToken>( {
				token: "property",
				verb: new VariableToken( "var" ),
			} ) );
		} );

		it( "should add the property Resource", () => {
			const resource:Resource = getResource( "resource/" );
			triplePattern.has( resource, [] );

			const newContainer:Container<TripleToken | BlankNodePropertyToken> = spyContainers.getLast();
			expect( newContainer.targetToken.properties ).toContain( jasmine.objectContaining<PropertyToken>( {
				token: "property",
				verb: new IRIToken( "resource/" ),
			} ) );
		} );

		it( "should add the property `a`", () => {
			triplePattern.has( "a", [] );

			const newContainer:Container<TripleToken | BlankNodePropertyToken> = spyContainers.getLast();
			expect( newContainer.targetToken.properties ).toContain( jasmine.objectContaining<PropertyToken>( {
				token: "property",
				verb: "a",
			} ) );
		} );

		it( "should add simple property name", () => {
			triplePattern.has( "property", [] );

			const newContainer:Container<TripleToken | BlankNodePropertyToken> = spyContainers.getLast();
			expect( newContainer.targetToken.properties ).toContain( jasmine.objectContaining<PropertyToken>( {
				token: "property",
				verb: "<https://example.com/ns#property>" as "a",
			} ) );
		} );

		it( "should add IRI tag property path", () => {
			triplePattern.has( "<https://example.com/ns#property>", [] );

			const newContainer:Container<TripleToken | BlankNodePropertyToken> = spyContainers.getLast();
			expect( newContainer.targetToken.properties ).toContain( jasmine.objectContaining<PropertyToken>( {
				token: "property",
				verb: "<https://example.com/ns#property>" as "a",
			} ) );
		} );

		it( "should set used prefix when property path", () => {
			triplePattern.has( "ex:property", [] );

			const newContainer:Container<TripleToken | BlankNodePropertyToken> = spyContainers.getLast();
			expect( newContainer.iriResolver.prefixes ).toEqual( new Map( [
				[ "ex", true ],
			] ) );
		} );

		it( "should parse when alternative path", () => {
			triplePattern.has( "iri|another-iri", [] );

			const newContainer:Container<TripleToken | BlankNodePropertyToken> = spyContainers.getLast();
			expect( newContainer.targetToken.properties ).toContain( jasmine.objectContaining<PropertyToken>( {
				token: "property",
				verb: "<https://example.com/ns#iri>|<https://example.com/ns#another-iri>" as "a",
			} ) );
		} );

		it( "should parse when sequence path", () => {
			triplePattern.has( "iri/another-iri", [] );

			const newContainer:Container<TripleToken | BlankNodePropertyToken> = spyContainers.getLast();
			expect( newContainer.targetToken.properties ).toContain( jasmine.objectContaining<PropertyToken>( {
				token: "property",
				verb: "<https://example.com/ns#iri>/<https://example.com/ns#another-iri>" as "a",
			} ) );
		} );

		it( "should parse when inverse path", () => {
			triplePattern.has( "^iri", [] );

			const newContainer:Container<TripleToken | BlankNodePropertyToken> = spyContainers.getLast();
			expect( newContainer.targetToken.properties ).toContain( jasmine.objectContaining<PropertyToken>( {
				token: "property",
				verb: "^<https://example.com/ns#iri>" as "a",
			} ) );
		} );

		it( "should parse when path with optional mod", () => {
			triplePattern.has( "iri?", [] );

			const newContainer:Container<TripleToken | BlankNodePropertyToken> = spyContainers.getLast();
			expect( newContainer.targetToken.properties ).toContain( jasmine.objectContaining<PropertyToken>( {
				token: "property",
				verb: "<https://example.com/ns#iri>?" as "a",
			} ) );
		} );

		it( "should parse when path with any number of mod", () => {
			triplePattern.has( "iri*", [] );

			const newContainer:Container<TripleToken | BlankNodePropertyToken> = spyContainers.getLast();
			expect( newContainer.targetToken.properties ).toContain( jasmine.objectContaining<PropertyToken>( {
				token: "property",
				verb: "<https://example.com/ns#iri>*" as "a",
			} ) );
		} );

		it( "should parse when path with more than once mod", () => {
			triplePattern.has( "iri+", [] );

			const newContainer:Container<TripleToken | BlankNodePropertyToken> = spyContainers.getLast();
			expect( newContainer.targetToken.properties ).toContain( jasmine.objectContaining<PropertyToken>( {
				token: "property",
				verb: "<https://example.com/ns#iri>+" as "a",
			} ) );
		} );

		it( "should parse when path with negative mod", () => {
			triplePattern.has( "!iri", [] );

			const newContainer:Container<TripleToken | BlankNodePropertyToken> = spyContainers.getLast();
			expect( newContainer.targetToken.properties ).toContain( jasmine.objectContaining<PropertyToken>( {
				token: "property",
				verb: "!<https://example.com/ns#iri>" as "a",
			} ) );
		} );

	} );

} );

describe( "PropertyBuilderMore", () => {

	it( "should exists", () => {
		expect( PropertyBuilderMore ).toBeDefined();
		expect( PropertyBuilderMore ).toEqual( jasmine.any( Object ) );
	} );

	let genericFactory:Factory<any, { generic:boolean }>;
	let container:Container<TripleToken | BlankNodePropertyToken>;
	beforeEach( () => {
		genericFactory = ( container1, object ) => Object.assign( object, {
			generic: true,
		} );

		const vocab:string = "https://example.com/ns#";

		const iriResolver:IRIResolver = new IRIResolver( undefined, vocab );
		iriResolver.prefixes.set( "ex", false );

		container = new Container( {
			iriResolver,
			targetToken: new SubjectToken( new IRIToken( "" ) )
		} );

		spyContainers.install();
	} );

	afterEach( () => {
		spyContainers.uninstall();
	} );

	function getVariable( name:string ):Variable {
		return TripleSubject.createFrom( new Container( {
			iriResolver: container.iriResolver,
			targetToken: new SubjectToken( new VariableToken( name ) ),
		} ), {} );
	}

	function getResource( iri:string ):Resource {
		return TripleSubject.createFrom( new Container( {
			iriResolver: container.iriResolver,
			targetToken: new SubjectToken( new IRIToken( iri ) ),
		} ), {} );
	}


	describe( "PropertyBuilderMore.createFrom", () => {

		it( "should exists", () => {
			expect( PropertyBuilderMore.createFrom ).toBeDefined();
			expect( PropertyBuilderMore.createFrom ).toEqual( jasmine.any( Function ) );
		} );


		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const triplePattern:PropertyBuilderMore<{ generic:boolean }> = PropertyBuilderMore
				.createFrom( genericFactory, container, myObject );

			expect( myObject ).toBe( triplePattern );
		} );

		it( "should create a PropertyBuilderMore object", () => {
			const triplePattern:PropertyBuilderMore<{ generic:boolean }> = PropertyBuilderMore
				.createFrom( genericFactory, container, {} );

			expect( triplePattern ).toEqual( {
				and: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "PropertyBuilderMore.and", () => {

		let triplePattern:PropertyBuilderMore<{ generic:boolean }>;
		beforeEach( () => {
			triplePattern = PropertyBuilderMore
				.createFrom( genericFactory, container, {} );
		} );

		it( "should exists", () => {
			expect( triplePattern.and ).toBeDefined();
			expect( triplePattern.and ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return the PropertyBuilderMore", () => {
			const returned = triplePattern.and( "", [] );

			expect( returned ).toEqual( {
				and: jasmine.any( Function ),

				// Generic
				generic: true,
			} );
		} );


		it( "should add the property Variable", () => {
			const variables:Variable = getVariable( "var" );
			triplePattern.and( variables, [] );

			const newContainer:Container<TripleToken | BlankNodePropertyToken> = spyContainers.getLast();
			expect( newContainer.targetToken.properties ).toContain( jasmine.objectContaining<PropertyToken>( {
				token: "property",
				verb: new VariableToken( "var" ),
			} ) );
		} );

		it( "should add the property Resource", () => {
			const resource:Resource = getResource( "resource/" );
			triplePattern.and( resource, [] );

			const newContainer:Container<TripleToken | BlankNodePropertyToken> = spyContainers.getLast();
			expect( newContainer.targetToken.properties ).toContain( jasmine.objectContaining<PropertyToken>( {
				token: "property",
				verb: new IRIToken( "resource/" ),
			} ) );
		} );

		it( "should add the property `a`", () => {
			triplePattern.and( "a", [] );

			const newContainer:Container<TripleToken | BlankNodePropertyToken> = spyContainers.getLast();
			expect( newContainer.targetToken.properties ).toContain( jasmine.objectContaining<PropertyToken>( {
				token: "property",
				verb: "a",
			} ) );
		} );

		it( "should add simple property name", () => {
			triplePattern.and( "property", [] );

			const newContainer:Container<TripleToken | BlankNodePropertyToken> = spyContainers.getLast();
			expect( newContainer.targetToken.properties ).toContain( jasmine.objectContaining<PropertyToken>( {
				token: "property",
				verb: "<https://example.com/ns#property>" as "a",
			} ) );
		} );

		it( "should add IRI tag property path", () => {
			triplePattern.and( "<https://example.com/ns#property>", [] );

			const newContainer:Container<TripleToken | BlankNodePropertyToken> = spyContainers.getLast();
			expect( newContainer.targetToken.properties ).toContain( jasmine.objectContaining<PropertyToken>( {
				token: "property",
				verb: "<https://example.com/ns#property>" as "a",
			} ) );
		} );

		it( "should set used prefix when property path", () => {
			triplePattern.and( "ex:property", [] );

			const newContainer:Container<TripleToken | BlankNodePropertyToken> = spyContainers.getLast();
			expect( newContainer.iriResolver.prefixes ).toEqual( new Map( [
				[ "ex", true ],
			] ) );
		} );

		it( "should parse when alternative path", () => {
			triplePattern.and( "iri|another-iri", [] );

			const newContainer:Container<TripleToken | BlankNodePropertyToken> = spyContainers.getLast();
			expect( newContainer.targetToken.properties ).toContain( jasmine.objectContaining<PropertyToken>( {
				token: "property",
				verb: "<https://example.com/ns#iri>|<https://example.com/ns#another-iri>" as "a",
			} ) );
		} );

		it( "should parse when sequence path", () => {
			triplePattern.and( "iri/another-iri", [] );

			const newContainer:Container<TripleToken | BlankNodePropertyToken> = spyContainers.getLast();
			expect( newContainer.targetToken.properties ).toContain( jasmine.objectContaining<PropertyToken>( {
				token: "property",
				verb: "<https://example.com/ns#iri>/<https://example.com/ns#another-iri>" as "a",
			} ) );
		} );

		it( "should parse when inverse path", () => {
			triplePattern.and( "^iri", [] );

			const newContainer:Container<TripleToken | BlankNodePropertyToken> = spyContainers.getLast();
			expect( newContainer.targetToken.properties ).toContain( jasmine.objectContaining<PropertyToken>( {
				token: "property",
				verb: "^<https://example.com/ns#iri>" as "a",
			} ) );
		} );

		it( "should parse when path with optional mod", () => {
			triplePattern.and( "iri?", [] );

			const newContainer:Container<TripleToken | BlankNodePropertyToken> = spyContainers.getLast();
			expect( newContainer.targetToken.properties ).toContain( jasmine.objectContaining<PropertyToken>( {
				token: "property",
				verb: "<https://example.com/ns#iri>?" as "a",
			} ) );
		} );

		it( "should parse when path with any number of mod", () => {
			triplePattern.and( "iri*", [] );

			const newContainer:Container<TripleToken | BlankNodePropertyToken> = spyContainers.getLast();
			expect( newContainer.targetToken.properties ).toContain( jasmine.objectContaining<PropertyToken>( {
				token: "property",
				verb: "<https://example.com/ns#iri>*" as "a",
			} ) );
		} );

		it( "should parse when path with more than once mod", () => {
			triplePattern.and( "iri+", [] );

			const newContainer:Container<TripleToken | BlankNodePropertyToken> = spyContainers.getLast();
			expect( newContainer.targetToken.properties ).toContain( jasmine.objectContaining<PropertyToken>( {
				token: "property",
				verb: "<https://example.com/ns#iri>+" as "a",
			} ) );
		} );

		it( "should parse when path with negative mod", () => {
			triplePattern.and( "!iri", [] );

			const newContainer:Container<TripleToken | BlankNodePropertyToken> = spyContainers.getLast();
			expect( newContainer.targetToken.properties ).toContain( jasmine.objectContaining<PropertyToken>( {
				token: "property",
				verb: "!<https://example.com/ns#iri>" as "a",
			} ) );
		} );

	} );

} );
