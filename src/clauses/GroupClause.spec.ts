import { spyContainers } from "../../test/spies/clones";

import { Container } from "../data/Container";
import { IRIResolver } from "../data/IRIResolver";

import { GroupToken } from "../tokens/GroupToken";
import { QueryToken } from "../tokens/QueryToken";
import { SelectToken } from "../tokens/SelectToken";

import { FinishClause } from "./FinishClause";
import { GroupClause } from "./GroupClause";
import { HavingClause } from "./HavingClause";


describe( "GroupClause", () => {

	it( "should exists", () => {
		expect( GroupClause ).toBeDefined();
		expect( GroupClause ).toEqual( jasmine.any( Object ) );
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


	describe( "GroupClause.createFrom", () => {

		it( "should exists", () => {
			expect( GroupClause.createFrom ).toBeDefined();
			expect( GroupClause.createFrom ).toEqual( jasmine.any( Function ) );
		} );

		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const groupClause:GroupClause<FinishClause> = GroupClause
				.createFrom( FinishClause.createFrom, container, myObject );

			expect( myObject ).toBe( groupClause );
		} );


		it( "should create a GroupClause object", () => {
			const groupClause:GroupClause<FinishClause> = GroupClause
				.createFrom( FinishClause.createFrom, container, {} );

			expect( groupClause ).toEqual( {
				// Self methods
				groupBy: jasmine.any( Function ),

				// Inherited methods
				having: jasmine.any( Function ),

				orderBy: jasmine.any( Function ),

				limit: jasmine.any( Function ),
				offset: jasmine.any( Function ),

				values: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "GroupClause.groupBy", () => {

		let groupClause:GroupClause<FinishClause>;
		beforeEach( () => {
			groupClause = GroupClause
				.createFrom( FinishClause.createFrom, container, {} );
		} );

		it( "should not mutate container token", () => {
			groupClause.groupBy( "" );
			expect( container.targetToken.queryClause.modifiers )
				.toEqual( [] );
		} );

		it( "should return a GroupClause & FinishClause object", () => {
			const havingClause:HavingClause<FinishClause> & FinishClause = groupClause
				.groupBy( "" );

			expect( havingClause ).toEqual( {
				orderBy: jasmine.any( Function ),

				having: jasmine.any( Function ),

				limit: jasmine.any( Function ),
				offset: jasmine.any( Function ),

				values: jasmine.any( Function ),

				toCompactString: jasmine.any( Function ),
				toPrettyString: jasmine.any( Function ),
				toString: jasmine.any( Function ),
			} );
		} );


		it( "should add GROUP BY token", () => {
			groupClause.groupBy( "" );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause.modifiers )
				.toContain( jasmine.any( GroupToken ) );
		} );

		it( "should add GROUP BY token with the condition", () => {
			groupClause.groupBy( "raw condition" );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause.modifiers )
				.toContain( new GroupToken( "raw condition" ) );
		} );

	} );

} );
