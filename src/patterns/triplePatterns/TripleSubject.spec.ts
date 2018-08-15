import { spyContainers } from "../../../test/spies/clones";

import { Container } from "../../data/Container";
import { IRIResolver } from "../../data/IRIResolver";

import { IRIToken } from "../../tokens/IRIToken";
import { SubjectToken } from "../../tokens/SubjectToken";
import { TripleToken } from "../../tokens/TripleToken";

import { TripleSubject } from "./TripleSubject";


describe( "TripleSubject", () => {

	it( "should exists", () => {
		expect( TripleSubject ).toBeDefined();
		expect( TripleSubject ).toEqual( jasmine.any( Object ) );
	} );

	let container:Container<TripleToken<any>>;
	beforeEach( () => {
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
				getSubject: jasmine.any( Function ),

				// Inherit
				has: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "TripleSubject.getSubject", () => {

		it( "should exists", () => {
			const triplePattern:TripleSubject<any> = TripleSubject
				.createFrom( container, {} );

			expect( triplePattern.getSubject ).toBeDefined();
			expect( triplePattern.getSubject ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return subject from the TripleToken", () => {
			const triplePattern:TripleSubject<any> = TripleSubject
				.createFrom( container, {} );

			const returned = triplePattern.getSubject();
			expect( returned ).toBe( container.targetToken.subject );
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