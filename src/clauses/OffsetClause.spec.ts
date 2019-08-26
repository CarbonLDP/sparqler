import { spyContainers } from "../../test/spies/clones";

import { Container } from "../core/containers/Container";
import { IRIResolver } from "../core/iri/IRIResolver";

import { OffsetToken } from "../tokens/OffsetToken";
import { QueryToken } from "../tokens/QueryToken";
import { SelectToken } from "../tokens/SelectToken";

import { FinishClause } from "./FinishClause";
import { OffsetClause } from "./OffsetClause";


describe( "OffsetClause", () => {

	it( "should exists", () => {
		expect( OffsetClause ).toBeDefined();
		expect( OffsetClause ).toEqual( jasmine.any( Object ) );
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


	describe( "OffsetClause.createFrom", () => {

		it( "should exists", () => {
			expect( OffsetClause.createFrom ).toBeDefined();
			expect( OffsetClause.createFrom ).toEqual( jasmine.any( Function ) );
		} );

		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const offsetClause:OffsetClause<FinishClause> = OffsetClause
				.createFrom( FinishClause.createFrom, container, myObject );

			expect( myObject ).toBe( offsetClause );
		} );


		it( "should create a OffsetClause object", () => {
			const offsetClause:OffsetClause<FinishClause> = OffsetClause
				.createFrom( FinishClause.createFrom, container, {} );

			expect( offsetClause ).toEqual( {
				offset: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "OffsetClause.offset", () => {

		let offsetClause:OffsetClause<{ the:string }>;
		beforeEach( () => {
			offsetClause = OffsetClause
				.createFrom( ( _, object ) => Object.assign( object, { the: "generic" } ), container, {} );
		} );

		it( "should not mutate container token", () => {
			offsetClause.offset( 1 );
			expect( container.targetToken.queryClause.modifiers )
				.toEqual( [] );
		} );

		it( "should return the generic factory object", () => {
			const genericClause:{ the:string } = offsetClause
				.offset( 1 );

			expect( genericClause ).toEqual( {
				the: "generic",
			} );
		} );


		it( "should add OFFSET token", () => {
			offsetClause.offset( 1 );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause.modifiers )
				.toContain( jasmine.any( OffsetToken ) );
		} );

		it( "should add OFFSET token with the condition", () => {
			offsetClause.offset( 10 );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause.modifiers )
				.toContain( new OffsetToken( 10 ) );
		} );

	} );

} );
