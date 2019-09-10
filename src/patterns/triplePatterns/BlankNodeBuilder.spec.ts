import { spyContainers } from "../../../test/spies/clones";

import { Container } from "../../core/containers/Container";
import { IRIResolver } from "../../core/iri/IRIResolver";

import { BlankNodePropertyToken } from "../../tokens/BlankNodePropertyToken";

import { BlankNodeBuilder } from "./BlankNodeBuilder";


describe( "BlankNodeBuilder", () => {

	it( "should exists", () => {
		expect( BlankNodeBuilder ).toBeDefined();
		expect( BlankNodeBuilder ).toEqual( jasmine.any( Object ) );
	} );

	let container:Container<BlankNodePropertyToken>;
	beforeEach( () => {
		const vocab:string = "https://example.com/ns#";

		const iriResolver:IRIResolver = new IRIResolver( undefined, vocab );
		iriResolver.prefixes.set( "ex", false );

		container = new Container( {
			iriResolver,
			targetToken: new BlankNodePropertyToken()
		} );

		spyContainers.install();
	} );

	afterEach( () => {
		spyContainers.uninstall();
	} );


	describe( "BlankNodeBuilder.createFrom", () => {

		it( "should exists", () => {
			expect( BlankNodeBuilder.createFrom ).toBeDefined();
			expect( BlankNodeBuilder.createFrom ).toEqual( jasmine.any( Function ) );
		} );


		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const triplePattern:BlankNodeBuilder = BlankNodeBuilder
				.createFrom( container, myObject );

			expect( myObject ).toBe( triplePattern );
		} );

		it( "should create a BlankNodeBuilder object", () => {
			const triplePattern:BlankNodeBuilder = BlankNodeBuilder
				.createFrom( container, {} );

			expect( triplePattern ).toEqual( {
				// PropertyBuilder
				has: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "BlankNodeBuilder.has", () => {

		let triplePattern:BlankNodeBuilder;
		beforeEach( () => {
			triplePattern = BlankNodeBuilder
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( triplePattern.has ).toBeDefined();
			expect( triplePattern.has ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return the PropertyBuilderMore", () => {
			const returned = triplePattern.has( "", [] );

			expect( returned ).toEqual( {
				// PropertyBuilderMore
				and: jasmine.any( Function ),
			} );
		} );

	} );

} );
