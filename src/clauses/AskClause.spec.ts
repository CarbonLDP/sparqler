import { spyContainers } from "../../test/spies/Container";

import { Container } from "../core/containers/Container";
import { IRIResolver } from "../core/iri/IRIResolver";

import { AskToken } from "../tokens/AskToken";
import { QueryToken } from "../tokens/QueryToken";
import { AskClause } from "./AskClause";

import { FinishClause } from "./FinishClause";
import { FromClause } from "./FromClause";


describe( "AskClause", () => {

	it( "should exists", () => {
		expect( AskClause ).toBeDefined();
		expect( AskClause ).toEqual( jasmine.any( Object ) );
	} );

	let container:Container<QueryToken>;
	beforeEach( () => {
		container = new Container( {
			iriResolver: new IRIResolver(),
			targetToken: new QueryToken( void 0 ),
		} );

		spyContainers.install();
	} );

	afterEach( () => {
		spyContainers.uninstall();
	} );


	describe( "AskClause.createFrom", () => {

		it( "should exists", () => {
			expect( AskClause.createFrom ).toBeDefined();
			expect( AskClause.createFrom ).toEqual( jasmine.any( Function ) );
		} );

		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const selectClause:AskClause<FinishClause> = AskClause
				.createFrom( FinishClause.createFrom, container, myObject );

			expect( myObject ).toBe( selectClause );
		} );


		it( "should create a AskClause object", () => {
			const selectClause:AskClause<FinishClause> = AskClause
				.createFrom( FinishClause.createFrom, container, {} );

			expect( selectClause ).toEqual( {
				ask: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "AskClause.ask", () => {

		let selectClause:AskClause<FinishClause>;
		beforeEach( () => {
			selectClause = AskClause
				.createFrom( FinishClause.createFrom, container, {} );
		} );

		it( "should not mutate container token", () => {
			selectClause.ask();
			expect( container.targetToken.queryClause ).toBeUndefined();
		} );

		it( "should return a FromClause object", () => {
			const fromClause:FromClause<FinishClause> = selectClause.ask();
			expect( fromClause ).toEqual( {
				from: jasmine.any( Function ),
				fromNamed: jasmine.any( Function ),

				where: jasmine.any( Function ),
			} );
		} );


		it( "should add ASK token", () => {
			selectClause.ask();

			const newContainer:Container<QueryToken<AskToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause )
				.toEqual( jasmine.any( AskToken ) );
		} );

		it( "should add empty ASK", () => {
			selectClause.ask();

			const newContainer:Container<QueryToken<AskToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause )
				.toEqual( new AskToken() )
		} );

	} );

} );
