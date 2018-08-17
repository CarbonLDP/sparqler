import { spyContainers } from "../../test/spies/clones";

import { Container } from "../data/Container";
import { IRIResolver } from "../data/IRIResolver";
import { QueryToken } from "../tokens/QueryToken";
import { SelectToken } from "../tokens/SelectToken";

import { FinishClause } from "./FinishClause";
import { LimitClause } from "./LimitClause";
import { LimitOffsetClause } from "./LimitOffsetClause";
import { OffsetClause } from "./OffsetClause";
import { ValuesClause } from "./ValuesClause";


describe( "LimitOffsetClause", () => {

	it( "should exists", () => {
		expect( LimitOffsetClause ).toBeDefined();
		expect( LimitOffsetClause ).toEqual( jasmine.any( Object ) );
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


	describe( "LimitOffsetClause.createFrom", () => {

		it( "should exists", () => {
			expect( LimitOffsetClause.createFrom ).toBeDefined();
			expect( LimitOffsetClause.createFrom ).toEqual( jasmine.any( Function ) );
		} );

		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const limitOffsetClause:LimitOffsetClause<FinishClause> = LimitOffsetClause
				.createFrom( FinishClause.createFrom, container, myObject );

			expect( myObject ).toBe( limitOffsetClause );
		} );


		it( "should create a LimitOffsetClause object", () => {
			const limitOffsetClause:LimitOffsetClause<FinishClause> = LimitOffsetClause
				.createFrom( FinishClause.createFrom, container, {} );

			expect( limitOffsetClause ).toEqual( {
				// Self methods
				limit: jasmine.any( Function ),
				offset: jasmine.any( Function ),

				// Inherited methods
				values: jasmine.any( Function ),
			} );
		} );

	} );


	let limitOffsetClause:LimitOffsetClause<FinishClause>;
	beforeEach( () => {
		limitOffsetClause = LimitOffsetClause
			.createFrom( FinishClause.createFrom, container, {} );
	} );

	it( "should return a OffsetClause & ValuesClause object when `limit`", () => {
		const returnedClause:
			& OffsetClause<ValuesClause<FinishClause> & FinishClause>
			& ValuesClause<FinishClause>
			& FinishClause = limitOffsetClause
			.limit( 1 );

		expect( returnedClause ).toEqual( {
			offset: jasmine.any( Function ),

			values: jasmine.any( Function ),

			toCompactString: jasmine.any( Function ),
			toPrettyString: jasmine.any( Function ),
			toString: jasmine.any( Function ),
			debug: jasmine.any( Function ),
		} );
	} );

	it( "should return a ValuesClause object when `limit.offset`", () => {
		const returnedClause:
			& ValuesClause<FinishClause>
			& FinishClause = limitOffsetClause
			.limit( 1 )
			.offset( 1 );

		expect( returnedClause ).toEqual( {
			values: jasmine.any( Function ),

			toCompactString: jasmine.any( Function ),
			toPrettyString: jasmine.any( Function ),
			toString: jasmine.any( Function ),
			debug: jasmine.any( Function ),
		} );
	} );


	it( "should return a OffsetClause & ValuesClause object when `offset`", () => {
		const returnedClause:
			& LimitClause<ValuesClause<FinishClause> & FinishClause>
			& ValuesClause<FinishClause>
			& FinishClause = limitOffsetClause
			.offset( 1 );

		expect( returnedClause ).toEqual( {
			limit: jasmine.any( Function ),

			values: jasmine.any( Function ),

			toCompactString: jasmine.any( Function ),
			toPrettyString: jasmine.any( Function ),
			toString: jasmine.any( Function ),
			debug: jasmine.any( Function ),
		} );
	} );

	it( "should return a ValuesClause object when `offset.limit`", () => {
		const returnedClause:
			& ValuesClause<FinishClause>
			& FinishClause = limitOffsetClause
			.offset( 1 )
			.limit( 1 );

		expect( returnedClause ).toEqual( {
			values: jasmine.any( Function ),

			toCompactString: jasmine.any( Function ),
			toPrettyString: jasmine.any( Function ),
			toString: jasmine.any( Function ),
			debug: jasmine.any( Function ),
		} );
	} );

} );
