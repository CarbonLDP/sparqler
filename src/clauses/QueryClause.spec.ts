import { spyContainers } from "../../test/spies/clones";

import { IRIResolver } from "../data/IRIResolver";
import { QueryUnitContainer } from "../data/QueryUnitContainer";

import { BaseToken } from "../tokens/BaseToken";
import { IRIRefToken } from "../tokens/IRIRefToken";
import { PrefixToken } from "../tokens/PrefixToken";
import { QueryToken } from "../tokens/QueryToken";

import { FinishClause } from "./FinishClause";
import { QueryClause } from "./QueryClause";
import { SelectClause } from "./SelectClause";


describe( "QueryClause", () => {

	let container:QueryUnitContainer<FinishClause, FinishClause>;
	beforeEach( () => {
		container = new QueryUnitContainer( {
			iriResolver: new IRIResolver(),
			targetToken: new QueryToken( void 0 ),
			selectFinishClauseFactory: FinishClause.createFrom,
			askFinishClauseFactory: FinishClause.createFrom,
		} );

		spyContainers.install();
	} );

	afterEach( () => {
		spyContainers.uninstall();
	} );


	describe( "QueryClause.createFrom", () => {

		it( "should exists", ():void => {
			expect( QueryClause.createFrom ).toBeDefined();
			expect( QueryClause.createFrom ).toEqual( jasmine.any( Function ) );
		} );

		it( "should extend the object provided", ():void => {
			const myObject:{} = {};
			const queryClause:QueryClause<FinishClause, FinishClause> = QueryClause.createFrom( container, myObject );

			expect( myObject ).toBe( queryClause );
		} );


		it( "should create a QueryClause object", ():void => {
			const queryClause:QueryClause<FinishClause, FinishClause> = QueryClause.createFrom( container, {} );

			expect( queryClause ).toEqual( {
				// Self methods
				base: jasmine.any( Function ),
				vocab: jasmine.any( Function ),
				prefix: jasmine.any( Function ),

				// Inherited methods
				select: jasmine.any( Function ),
				selectDistinct: jasmine.any( Function ),
				selectReduced: jasmine.any( Function ),
				selectAll: jasmine.any( Function ),
				selectAllDistinct: jasmine.any( Function ),
				selectAllReduced: jasmine.any( Function ),

				ask: jasmine.any( Function ),
			} );
		} );

		it( "should create SelectClause with the SELECT finisher", () => {
			const spy:jasmine.Spy = spyOn( SelectClause, "createFrom" )
				.and.callThrough();

			const object:{} = { the: "object" };
			QueryClause.createFrom( container, object );
			expect( spy ).toHaveBeenCalledWith( container.selectFinishClauseFactory, container, object );
		} );

	} );


	describe( "QueryClause.base", () => {

		let queryClause:QueryClause<FinishClause, FinishClause>;
		beforeEach( () => {
			queryClause = QueryClause.createFrom( container, {} );
		} );


		it( "should return a QueryClause object", () => {
			const returnedObject:QueryClause<FinishClause, FinishClause> = queryClause.base( "http://example.com/base/" );
			expect( returnedObject ).toEqual( {
				base: jasmine.any( Function ),
				vocab: jasmine.any( Function ),
				prefix: jasmine.any( Function ),

				select: jasmine.any( Function ),
				selectDistinct: jasmine.any( Function ),
				selectReduced: jasmine.any( Function ),
				selectAll: jasmine.any( Function ),
				selectAllDistinct: jasmine.any( Function ),
				selectAllReduced: jasmine.any( Function ),

				ask: jasmine.any( Function ),
			} );
		} );

		it( "should not mutate container token", () => {
			queryClause.base( "http://example.com/base/" );
			expect( container.targetToken.prologues ).toEqual( [] );
		} );


		it( "should add BASE token", () => {
			queryClause.base( "http://example.com/base/" );

			const newContainer:QueryUnitContainer<FinishClause, FinishClause> = spyContainers.getLast();
			expect( newContainer.targetToken.prologues )
				.toContain( new BaseToken( new IRIRefToken( "http://example.com/base/" ) ) );
		} );

		it( "should append BASE tokens", () => {
			queryClause
				.base( "http://example.com/base/" )
				.base( "http://example.com/another/" );

			const newContainer:QueryUnitContainer<FinishClause, FinishClause> = spyContainers.getLast();

			expect( newContainer.targetToken.prologues )
				.toContain( new BaseToken( new IRIRefToken( "http://example.com/base/" ) ) );
			expect( newContainer.targetToken.prologues )
				.toContain( new BaseToken( new IRIRefToken( "http://example.com/another/" ) ) );
		} );

	} );

	describe( "QueryClause.vocab", () => {

		let queryClause:QueryClause<FinishClause, FinishClause>;
		beforeEach( () => {
			queryClause = QueryClause.createFrom( container, {} );
		} );


		it( "should return a QueryClause object", () => {
			const returnedObject:QueryClause<FinishClause, FinishClause> = queryClause.vocab( "http://example.com/vocab#" );
			expect( returnedObject ).toEqual( {
				base: jasmine.any( Function ),
				vocab: jasmine.any( Function ),
				prefix: jasmine.any( Function ),

				select: jasmine.any( Function ),
				selectDistinct: jasmine.any( Function ),
				selectReduced: jasmine.any( Function ),
				selectAll: jasmine.any( Function ),
				selectAllDistinct: jasmine.any( Function ),
				selectAllReduced: jasmine.any( Function ),

				ask: jasmine.any( Function ),
			} );
		} );

		it( "should not mutate current container", () => {
			queryClause.vocab( "http://example.com/vocab#" );
			expect( container.iriResolver.vocab ).toBeUndefined();
		} );


		it( "should store the vocab in the IRIResolver", () => {
			queryClause.vocab( "http://example.com/vocab#" );

			const newContainer:QueryUnitContainer<FinishClause, FinishClause> = spyContainers.getLast();
			expect( newContainer.iriResolver.vocab ).toBe( "http://example.com/vocab#" );
		} );

	} );

	describe( "QueryClause.prefix", () => {

		let queryClause:QueryClause<FinishClause, FinishClause>;
		beforeEach( () => {
			queryClause = QueryClause.createFrom( container, {} );
		} );

		it( "should return a QueryClause object", () => {
			const returnedObject:QueryClause<FinishClause, FinishClause> = queryClause.prefix( "ex", "http://example.com/prefix#" );
			expect( returnedObject ).toEqual( {
				base: jasmine.any( Function ),
				vocab: jasmine.any( Function ),
				prefix: jasmine.any( Function ),

				select: jasmine.any( Function ),
				selectDistinct: jasmine.any( Function ),
				selectReduced: jasmine.any( Function ),
				selectAll: jasmine.any( Function ),
				selectAllDistinct: jasmine.any( Function ),
				selectAllReduced: jasmine.any( Function ),

				ask: jasmine.any( Function ),
			} );
		} );

		it( "should not mutate current container", () => {
			queryClause.prefix( "ex", "http://example.com/prefix#" );
			expect( container.targetToken.prologues ).toEqual( [] );
		} );


		it( "should store prefix as unused in IRIResolver", () => {
			queryClause.prefix( "ex", "http://example.com/prefix#" );

			const newContainer:QueryUnitContainer<FinishClause, FinishClause> = spyContainers.getLast();
			expect( newContainer.iriResolver.prefixes ).toEqual( new Map( [
				[ "ex", false ],
			] ) );
		} );

		it( "should maintain existing prefix in IRIResolver", () => {
			const newQueryClause = queryClause.prefix( "ex", "http://example.com/prefix#" );

			newQueryClause.prefix( "ex", "http://example.com/another-prefix#" );
			const newContainer:QueryUnitContainer<FinishClause, FinishClause> = spyContainers.getLast();
			expect( newContainer.iriResolver.prefixes ).toEqual( new Map( [
				[ "ex", false ],
			] ) );
		} );

		it( "should construct PREFIX tokens", () => {
			queryClause.prefix( "ex", "http://example.com/prefix#" );

			const newContainer:QueryUnitContainer<FinishClause, FinishClause> = spyContainers.getLast();
			expect( newContainer.targetToken.prologues )
				.toContain( new PrefixToken( "ex", new IRIRefToken( "http://example.com/prefix#" ) ) );
		} );

		it( "should replace existing prefix in tokens", () => {
			queryClause
				.prefix( "ex", "http://example.com/prefix#" )
				.prefix( "ex", "http://example.com/another#" );

			const newContainer:QueryUnitContainer<FinishClause, FinishClause> = spyContainers.getLast();
			expect( newContainer.targetToken.prologues )
				.not.toContain( new PrefixToken( "ex", new IRIRefToken( "http://example.com/prefix#" ) ) );
			expect( newContainer.targetToken.prologues )
				.toContain( new PrefixToken( "ex", new IRIRefToken( "http://example.com/another#" ) ) );
		} );

	} );

} );


