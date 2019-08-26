import { spyContainers } from "../../test/spies/clones";

import { Container } from "../core/containers/Container";
import { IRIResolver } from "../core/iri/IRIResolver";

import { HavingToken } from "../tokens/HavingToken";
import { QueryToken } from "../tokens/QueryToken";
import { SelectToken } from "../tokens/SelectToken";

import { FinishClause } from "./FinishClause";
import { HavingClause } from "./HavingClause";
import { OrderClause } from "./OrderClause";


describe( "HavingClause", () => {

	it( "should exists", () => {
		expect( HavingClause ).toBeDefined();
		expect( HavingClause ).toEqual( jasmine.any( Object ) );
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


	describe( "HavingClause.createFrom", () => {

		it( "should exists", () => {
			expect( HavingClause.createFrom ).toBeDefined();
			expect( HavingClause.createFrom ).toEqual( jasmine.any( Function ) );
		} );

		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const havingClause:HavingClause<FinishClause> = HavingClause
				.createFrom( FinishClause.createFrom, container, myObject );

			expect( myObject ).toBe( havingClause );
		} );


		it( "should create a HavingClause object", () => {
			const havingClause:HavingClause<FinishClause> = HavingClause
				.createFrom( FinishClause.createFrom, container, {} );

			expect( havingClause ).toEqual( {
				// Self methods
				having: jasmine.any( Function ),

				// Inherited methods
				orderBy: jasmine.any( Function ),

				limit: jasmine.any( Function ),
				offset: jasmine.any( Function ),

				values: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "HavingClause.having", () => {

		let havingClause:HavingClause<FinishClause>;
		beforeEach( () => {
			havingClause = HavingClause
				.createFrom( FinishClause.createFrom, container, {} );
		} );

		it( "should not mutate container token", () => {
			havingClause.having( "" );
			expect( container.targetToken.queryClause.modifiers )
				.toEqual( [] );
		} );

		it( "should return a HavingClause & FinishClause object", () => {
			const orderClause:OrderClause<FinishClause> & FinishClause = havingClause
				.having( "" );

			expect( orderClause ).toEqual( {
				orderBy: jasmine.any( Function ),

				limit: jasmine.any( Function ),
				offset: jasmine.any( Function ),

				values: jasmine.any( Function ),

				toCompactString: jasmine.any( Function ),
				toPrettyString: jasmine.any( Function ),
				toString: jasmine.any( Function ),
				debug: jasmine.any( Function ),
			} );
		} );


		it( "should add HAVING token", () => {
			havingClause.having( "" );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause.modifiers )
				.toContain( jasmine.any( HavingToken ) );
		} );

		it( "should add HAVING token with the condition", () => {
			havingClause.having( "raw condition" );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause.modifiers )
				.toContain( new HavingToken( "raw condition" ) );
		} );

	} );

} );
