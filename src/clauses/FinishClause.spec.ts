import { spyContainers } from "../../test/spies/clones";

import { Container } from "../core/containers/Container";
import { IRIResolver } from "../core/iri/IRIResolver";

import { QueryToken } from "../tokens/QueryToken";
import { SelectToken } from "../tokens/SelectToken";

import { FinishClause } from "./FinishClause";


describe( "FinishClause", () => {

	it( "should exists", () => {
		expect( FinishClause ).toBeDefined();
		expect( FinishClause ).toEqual( jasmine.any( Object ) );
	} );

	let container:Container<QueryToken<SelectToken>>;
	beforeEach( () => {
		const iriResolver:IRIResolver = new IRIResolver();
		iriResolver.prefixes.set( "ex", false );

		container = new Container( {
			iriResolver,
			targetToken: new QueryToken( new SelectToken() ),
		} );

		spyContainers.install();
	} );

	afterEach( () => {
		spyContainers.uninstall();
	} );


	describe( "FinishClause.createFrom", () => {

		it( "should exists", () => {
			expect( FinishClause.createFrom ).toBeDefined();
			expect( FinishClause.createFrom ).toEqual( jasmine.any( Function ) );
		} );

		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const finishClause:FinishClause = FinishClause
				.createFrom( container, myObject );

			expect( myObject ).toBe( finishClause );
		} );


		it( "should create a FinishClause object", () => {
			const finishClause:FinishClause = FinishClause
				.createFrom( container, {} );

			expect( finishClause ).toEqual( {
				toCompactString: jasmine.any( Function ),
				toPrettyString: jasmine.any( Function ),
				toString: jasmine.any( Function ),

				debug: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "FinishClause.toCompactString", () => {

		let finishClause:FinishClause;
		beforeEach( () => {
			finishClause = FinishClause
				.createFrom( container, {} );
		} );

		it( "should call token pretty print", () => {
			const spy:jasmine.Spy = spyOn( container.targetToken, "toString" )
				.and.callThrough();

			finishClause.toCompactString();
			expect( spy ).toHaveBeenCalledWith();
		} );

	} );

	describe( "FinishClause.toPrettyString", () => {

		let finishClause:FinishClause;
		beforeEach( () => {
			finishClause = FinishClause
				.createFrom( container, {} );
		} );

		it( "should call token pretty print", () => {
			const spy:jasmine.Spy = spyOn( container.targetToken, "toString" )
				.and.callThrough();

			finishClause.toPrettyString();
			expect( spy ).toHaveBeenCalledWith( 0 );
		} );

	} );

	describe( "FinishClause.toString", () => {

		let finishClause:FinishClause;
		beforeEach( () => {
			finishClause = FinishClause
				.createFrom( container, {} );
		} );

		it( "should call token pretty print", () => {
			const spy:jasmine.Spy = spyOn( container.targetToken, "toString" )
				.and.callThrough();

			finishClause.toString();
			expect( spy ).toHaveBeenCalledWith( 0 );
		} );

	} );


	describe( "FinishClause.debug", () => {

		let finishClause:FinishClause;
		beforeEach( () => {
			finishClause = FinishClause
				.createFrom( container, {} );
		} );

		it( "should return same clause", () => {
			const returned:FinishClause = finishClause.debug( () => {} );
			expect( returned ).toBe( finishClause );
		} );

		it( "should call fn with the same clause and the container", () => {
			const spy:jasmine.Spy = jasmine.createSpy();
			finishClause.debug( spy );

			expect( spy ).toHaveBeenCalledWith( finishClause, container );
		} );

	} );

} );
