import { spyContainers } from "../../test/spies/clones";

import { Container } from "../core/containers/Container";
import { IRIResolver } from "../core/iri/IRIResolver";

import { FromToken } from "../tokens/FromToken";
import { IRIRefToken } from "../tokens/IRIRefToken";
import { PrefixedNameToken } from "../tokens/PrefixedNameToken";
import { QueryToken } from "../tokens/QueryToken";
import { SelectToken } from "../tokens/SelectToken";

import { FinishClause } from "./FinishClause";
import { FromClause } from "./FromClause";
import { WhereClause } from "./WhereClause";


describe( "FromClause", () => {

	it( "should exists", () => {
		expect( FromClause ).toBeDefined();
		expect( FromClause ).toEqual( jasmine.any( Object ) );
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


	describe( "FromClause.createFrom", () => {

		it( "should exists", () => {
			expect( FromClause.createFrom ).toBeDefined();
			expect( FromClause.createFrom ).toEqual( jasmine.any( Function ) );
		} );

		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const fromClause:FromClause<FinishClause> = FromClause
				.createFrom( FinishClause.createFrom, container, myObject );

			expect( myObject ).toBe( fromClause );
		} );


		it( "should create a FromClause object", () => {
			const fromClause:FromClause<FinishClause> = FromClause
				.createFrom( FinishClause.createFrom, container, {} );

			expect( fromClause ).toEqual( {
				from: jasmine.any( Function ),
				fromNamed: jasmine.any( Function ),

				// Inherit from WhereClause
				where: jasmine.any( Function ),
			} );
		} );

		it( "should call WhereClause factory", () => {
			const spy:jasmine.Spy = spyOn( WhereClause, "createFrom" )
				.and.callThrough();

			const object:{} = { the: "object" };
			FromClause
				.createFrom( FinishClause.createFrom, container, object );

			expect( spy )
				.toHaveBeenCalledWith( FinishClause.createFrom, container, object );
		} );

	} );


	describe( "FromClause.from", () => {

		let fromClause:FromClause<FinishClause>;
		beforeEach( () => {
			fromClause = FromClause
				.createFrom( FinishClause.createFrom, container, {} );
		} );

		it( "should not mutate container token", () => {
			fromClause.from( "" );
			expect( container.targetToken.queryClause.datasets ).toEqual( [] );
		} );

		it( "should return a FromClause object", () => {
			const subFromClause:FromClause<FinishClause> = fromClause.from( "" );
			expect( subFromClause ).toEqual( {
				from: jasmine.any( Function ),
				fromNamed: jasmine.any( Function ),

				where: jasmine.any( Function ),
			} );
		} );


		it( "should add FROM token", () => {
			fromClause.from( "" );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause.datasets )
				.toContain( jasmine.any( FromToken ) );
		} );

		it( "should add FROM token with the IRI", () => {
			fromClause.from( "https://example.com/" );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause.datasets )
				.toContain( new FromToken( new IRIRefToken( "https://example.com/" ) ) )
		} );

		it( "should add FROM token with the Prefixed Name", () => {
			fromClause.from( "ex:resource/" );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause.datasets )
				.toContain( new FromToken( new PrefixedNameToken( "ex", "resource/" ) ) )
		} );

		it( "should set used prefixed when Prefixed Name", () => {
			fromClause.from( "ex:resource/" );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.iriResolver.prefixes )
				.toEqual( new Map( [
					[ "ex", true ],
				] ) );
		} );

		it( "should append FROM tokens", () => {
			fromClause
				.from( "https://example.com/" )
				.from( "ex:resource/" );


			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause.datasets )
				.toContain( new FromToken( new IRIRefToken( "https://example.com/" ) ) );
			expect( newContainer.targetToken.queryClause.datasets )
				.toContain( new FromToken( new PrefixedNameToken( "ex", "resource/" ) ) );
		} );

	} );

	describe( "FromClause.fromNamed", () => {

		let fromClause:FromClause<FinishClause>;
		beforeEach( () => {
			fromClause = FromClause
				.createFrom( FinishClause.createFrom, container, {} );
		} );

		it( "should not mutate container token", () => {
			fromClause.fromNamed( "" );
			expect( container.targetToken.queryClause.datasets ).toEqual( [] );
		} );

		it( "should return a FromClause object", () => {
			const subFromClause:FromClause<FinishClause> = fromClause.fromNamed( "" );
			expect( subFromClause ).toEqual( {
				from: jasmine.any( Function ),
				fromNamed: jasmine.any( Function ),

				where: jasmine.any( Function ),
			} );
		} );


		it( "should add FROM token", () => {
			fromClause.fromNamed( "" );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause.datasets )
				.toContain( jasmine.any( FromToken ) );
		} );

		it( "should add FROM NAMED token with the IRI", () => {
			fromClause.fromNamed( "https://example.com/" );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause.datasets )
				.toContain( new FromToken( new IRIRefToken( "https://example.com/" ), true ) )
		} );

		it( "should add FROM NAMED token with the Prefixed Name", () => {
			fromClause.fromNamed( "ex:resource/" );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause.datasets )
				.toContain( new FromToken( new PrefixedNameToken( "ex", "resource/" ), true ) )
		} );

		it( "should set used prefixed when Prefixed Name", () => {
			fromClause.fromNamed( "ex:resource/" );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.iriResolver.prefixes )
				.toEqual( new Map( [
					[ "ex", true ],
				] ) );
		} );

		it( "should append FROM tokens", () => {
			fromClause
				.fromNamed( "https://example.com/" )
				.fromNamed( "ex:resource/" );


			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause.datasets )
				.toContain( new FromToken( new IRIRefToken( "https://example.com/" ), true ) );
			expect( newContainer.targetToken.queryClause.datasets )
				.toContain( new FromToken( new PrefixedNameToken( "ex", "resource/" ), true ) );
		} );

	} );

} );

