import { spyContainers } from "../../../test/spies/clones";

import { Container } from "../../core/containers/Container";
import { IRIResolver } from "../../core/iri/IRIResolver";

import { IRIRefToken } from "../../tokens/IRIRefToken";
import { ObjectToken } from "../../tokens/ObjectToken";

import { TripleSubject } from "./TripleSubject";


describe( "TripleSubject", () => {

	it( "should exists", () => {
		expect( TripleSubject ).toBeDefined();
		expect( TripleSubject ).toEqual( jasmine.any( Object ) );
	} );

	let container:Container<ObjectToken>;
	beforeEach( () => {
		const vocab:string = "https://example.com/ns#";

		const iriResolver:IRIResolver = new IRIResolver( undefined, vocab );
		iriResolver.prefixes.set( "ex", false );

		container = new Container( {
			iriResolver,
			targetToken: new IRIRefToken( "" )
		} );

		spyContainers.install();
	} );

	afterEach( () => {
		spyContainers.uninstall();
	} );


	describe( "TripleSubject.createFrom", () => {

		it( "should exists", () => {
			expect( TripleSubject.createFrom ).toBeDefined();
			expect( TripleSubject.createFrom ).toEqual( jasmine.any( Function ) );
		} );


		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const triplePattern:TripleSubject<any> = TripleSubject
				.createFrom( container, myObject );

			expect( myObject ).toBe( triplePattern );
		} );

		it( "should create a TripleSubject object", () => {
			const triplePattern:TripleSubject<any> = TripleSubject
				.createFrom( container, {} );

			expect( triplePattern ).toEqual( {
				_getSubject: jasmine.any( Function ),

				// Inherit
				has: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "TripleSubject.getSubject", () => {

		it( "should exists", () => {
			const triplePattern:TripleSubject<any> = TripleSubject
				.createFrom( container, {} );

			expect( triplePattern._getSubject ).toBeDefined();
			expect( triplePattern._getSubject ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return the target ObjectToken", () => {
			const triplePattern:TripleSubject<any> = TripleSubject
				.createFrom( container, {} );

			const returned = triplePattern._getSubject();
			expect( returned ).toBe( container.targetToken );
		} );

	} );


	describe( "TripleSubject.has", () => {

		let triplePattern:TripleSubject<any>;
		beforeEach( () => {
			triplePattern = TripleSubject
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( triplePattern.has ).toBeDefined();
			expect( triplePattern.has ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return the TriplePattern & PropertyBuilderMore", () => {
			const returned = triplePattern.has( "", [] );

			expect( returned ).toEqual( {
				// TriplePattern
				getPattern: jasmine.any( Function ),

				// PropertyBuilderMore
				and: jasmine.any( Function ),
			} );
		} );

	} );

} );
