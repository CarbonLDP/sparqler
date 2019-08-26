import { spyContainers } from "../../test/spies/clones";

import { Container } from "../core/containers/Container";
import { IRIResolver } from "../core/iri/IRIResolver";

import { LimitToken } from "../tokens/LimitToken";
import { QueryToken } from "../tokens/QueryToken";
import { SelectToken } from "../tokens/SelectToken";

import { FinishClause } from "./FinishClause";
import { LimitClause } from "./LimitClause";


describe( "LimitClause", () => {

	it( "should exists", () => {
		expect( LimitClause ).toBeDefined();
		expect( LimitClause ).toEqual( jasmine.any( Object ) );
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


	describe( "LimitClause.createFrom", () => {

		it( "should exists", () => {
			expect( LimitClause.createFrom ).toBeDefined();
			expect( LimitClause.createFrom ).toEqual( jasmine.any( Function ) );
		} );

		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const limitClause:LimitClause<FinishClause> = LimitClause
				.createFrom( FinishClause.createFrom, container, myObject );

			expect( myObject ).toBe( limitClause );
		} );


		it( "should create a LimitClause object", () => {
			const limitClause:LimitClause<FinishClause> = LimitClause
				.createFrom( FinishClause.createFrom, container, {} );

			expect( limitClause ).toEqual( {
				limit: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "LimitClause.limit", () => {

		let limitClause:LimitClause<{ the:string }>;
		beforeEach( () => {
			limitClause = LimitClause
				.createFrom( ( _, object ) => Object.assign( object, { the: "generic" } ), container, {} );
		} );

		it( "should not mutate container token", () => {
			limitClause.limit( 1 );
			expect( container.targetToken.queryClause.modifiers )
				.toEqual( [] );
		} );

		it( "should return the generic factory object", () => {
			const genericClause:{ the:string } = limitClause
				.limit( 1 );

			expect( genericClause ).toEqual( {
				the: "generic",
			} );
		} );


		it( "should add LIMIT token", () => {
			limitClause.limit( 1 );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause.modifiers )
				.toContain( jasmine.any( LimitToken ) );
		} );

		it( "should add LIMIT token with the condition", () => {
			limitClause.limit( 10 );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause.modifiers )
				.toContain( new LimitToken( 10 ) );
		} );

	} );

} );
