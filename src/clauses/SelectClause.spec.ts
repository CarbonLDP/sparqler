import { spyContainers } from "../../test/spies/Container";

import { Container } from "../data/Container";
import { IRIResolver } from "../data/IRIResolver";

import { QueryToken } from "../tokens/QueryToken";
import { SelectToken } from "../tokens/SelectToken";
import { VariableToken } from "../tokens/VariableToken";

import { FinishClause } from "./FinishClause";
import { FromClause } from "./FromClause";
import { SelectClause } from "./SelectClause";


describe( "SelectClause", () => {

	it( "should exists", () => {
		expect( SelectClause ).toBeDefined();
		expect( SelectClause ).toEqual( jasmine.any( Object ) );
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


	describe( "SelectClause.createFrom", () => {

		it( "should exists", () => {
			expect( SelectClause.createFrom ).toBeDefined();
			expect( SelectClause.createFrom ).toEqual( jasmine.any( Function ) );
		} );

		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const selectClause:SelectClause<FinishClause> = SelectClause
				.createFrom( FinishClause.createFrom, container, myObject );

			expect( myObject ).toBe( selectClause );
		} );


		it( "should create a SelectClause object", () => {
			const selectClause:SelectClause<FinishClause> = SelectClause
				.createFrom( FinishClause.createFrom, container, {} );

			expect( selectClause ).toEqual( {
				select: jasmine.any( Function ),
				selectDistinct: jasmine.any( Function ),
				selectReduced: jasmine.any( Function ),
				selectAll: jasmine.any( Function ),
				selectAllDistinct: jasmine.any( Function ),
				selectAllReduced: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "SelectClause.select", () => {

		let selectClause:SelectClause<FinishClause>;
		beforeEach( () => {
			selectClause = SelectClause
				.createFrom( FinishClause.createFrom, container, {} );
		} );

		it( "should not mutate container token", () => {
			selectClause.select();
			expect( container.targetToken.queryClause ).toBeUndefined();
		} );

		it( "should return a FromClause object", () => {
			const fromClause:FromClause<FinishClause> = selectClause.select();
			expect( fromClause ).toEqual( {
				from: jasmine.any( Function ),
				fromNamed: jasmine.any( Function ),

				where: jasmine.any( Function ),
			} );
		} );


		it( "should add SELECT token", () => {
			selectClause.select();

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause )
				.toEqual( jasmine.any( SelectToken ) );
		} );

		it( "should add empty SELECT when no token", () => {
			selectClause.select();

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause )
				.toEqual( new SelectToken() )
		} );

		it( "should add SELECT with a variable", () => {
			selectClause.select( "a" );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause.variables )
				.toContain( new VariableToken( "a" ) );
		} );

		it( "should add SELECT with three variable", () => {
			selectClause.select( "a", "b", "c" );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause.variables )
				.toContain( new VariableToken( "a" ) );
			expect( newContainer.targetToken.queryClause.variables )
				.toContain( new VariableToken( "b" ) );
			expect( newContainer.targetToken.queryClause.variables )
				.toContain( new VariableToken( "c" ) );
		} );

	} );

	describe( "SelectClause.selectDistinct", () => {

		let selectClause:SelectClause<FinishClause>;
		beforeEach( () => {
			selectClause = SelectClause
				.createFrom( FinishClause.createFrom, container, {} );
		} );

		it( "should not mutate container token", () => {
			selectClause.selectDistinct();
			expect( container.targetToken.queryClause ).toBeUndefined();
		} );

		it( "should return a FromClause object", () => {
			const fromClause:FromClause<FinishClause> = selectClause.selectDistinct();
			expect( fromClause ).toEqual( {
				from: jasmine.any( Function ),
				fromNamed: jasmine.any( Function ),

				where: jasmine.any( Function ),
			} );
		} );


		it( "should add SELECT token", () => {
			selectClause.selectDistinct();

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause )
				.toEqual( jasmine.any( SelectToken ) );
		} );

		it( "should add SELECT token with DISTINCT", () => {
			selectClause.selectDistinct();

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause )
				.toEqual( new SelectToken( "DISTINCT" ) );
		} );

		it( "should add SELECT with a variable", () => {
			selectClause.selectDistinct( "a" );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause.variables )
				.toContain( new VariableToken( "a" ) );
		} );

		it( "should add SELECT with three variable", () => {
			selectClause.selectDistinct( "a", "b", "c" );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause.variables )
				.toContain( new VariableToken( "a" ) );
			expect( newContainer.targetToken.queryClause.variables )
				.toContain( new VariableToken( "b" ) );
			expect( newContainer.targetToken.queryClause.variables )
				.toContain( new VariableToken( "c" ) );
		} );

	} );

	describe( "SelectClause.selectReduced", () => {

		let selectClause:SelectClause<FinishClause>;
		beforeEach( () => {
			selectClause = SelectClause
				.createFrom( FinishClause.createFrom, container, {} );
		} );

		it( "should not mutate container token", () => {
			selectClause.selectReduced();
			expect( container.targetToken.queryClause ).toBeUndefined();
		} );

		it( "should return a FromClause object", () => {
			const fromClause:FromClause<FinishClause> = selectClause.selectReduced();
			expect( fromClause ).toEqual( {
				from: jasmine.any( Function ),
				fromNamed: jasmine.any( Function ),

				where: jasmine.any( Function ),
			} );
		} );


		it( "should add SELECT token", () => {
			selectClause.selectReduced();

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause )
				.toEqual( jasmine.any( SelectToken ) );
		} );

		it( "should add SELECT token with DISTINCT", () => {
			selectClause.selectReduced();

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause )
				.toEqual( new SelectToken( "REDUCED" ) );
		} );

		it( "should add SELECT with a variable", () => {
			selectClause.selectReduced( "a" );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause.variables )
				.toContain( new VariableToken( "a" ) );
		} );

		it( "should add SELECT with three variable", () => {
			selectClause.selectReduced( "a", "b", "c" );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause.variables )
				.toContain( new VariableToken( "a" ) );
			expect( newContainer.targetToken.queryClause.variables )
				.toContain( new VariableToken( "b" ) );
			expect( newContainer.targetToken.queryClause.variables )
				.toContain( new VariableToken( "c" ) );
		} );

	} );


	describe( "SelectClause.selectAll", () => {

		let selectClause:SelectClause<FinishClause>;
		beforeEach( () => {
			selectClause = SelectClause
				.createFrom( FinishClause.createFrom, container, {} );
		} );

		it( "should not mutate container token", () => {
			selectClause.selectAll();
			expect( container.targetToken.queryClause ).toBeUndefined();
		} );

		it( "should return a FromClause object", () => {
			const fromClause:FromClause<FinishClause> = selectClause.selectAll();
			expect( fromClause ).toEqual( {
				from: jasmine.any( Function ),
				fromNamed: jasmine.any( Function ),

				where: jasmine.any( Function ),
			} );
		} );


		it( "should add SELECT token", () => {
			selectClause.selectAll();

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause )
				.toEqual( jasmine.any( SelectToken ) );
		} );

		it( "should add empty SELECT when no token", () => {
			selectClause.selectAll();

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause )
				.toEqual( new SelectToken() )
		} );

		it( "should ignore variables", () => {
			selectClause.selectAll.call( null, "a", "b" );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause.variables )
				.toEqual( [] );
		} );

	} );

	describe( "SelectClause.selectAllDistinct", () => {

		let selectClause:SelectClause<FinishClause>;
		beforeEach( () => {
			selectClause = SelectClause
				.createFrom( FinishClause.createFrom, container, {} );
		} );

		it( "should not mutate container token", () => {
			selectClause.selectAllDistinct();
			expect( container.targetToken.queryClause ).toBeUndefined();
		} );

		it( "should return a FromClause object", () => {
			const fromClause:FromClause<FinishClause> = selectClause.selectAllDistinct();
			expect( fromClause ).toEqual( {
				from: jasmine.any( Function ),
				fromNamed: jasmine.any( Function ),

				where: jasmine.any( Function ),
			} );
		} );


		it( "should add SELECT token", () => {
			selectClause.selectAllDistinct();

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause )
				.toEqual( jasmine.any( SelectToken ) );
		} );

		it( "should add SELECT token with DISTINCT", () => {
			selectClause.selectAllDistinct();

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause )
				.toEqual( new SelectToken( "DISTINCT" ) );
		} );

		it( "should ignore variables", () => {
			selectClause.selectAllDistinct.call( null, "a", "b" );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause.variables )
				.toEqual( [] );
		} );

	} );

	describe( "SelectClause.selectAllReduced", () => {

		let selectClause:SelectClause<FinishClause>;
		beforeEach( () => {
			selectClause = SelectClause
				.createFrom( FinishClause.createFrom, container, {} );
		} );

		it( "should not mutate container token", () => {
			selectClause.selectAllReduced();
			expect( container.targetToken.queryClause ).toBeUndefined();
		} );

		it( "should return a FromClause object", () => {
			const fromClause:FromClause<FinishClause> = selectClause.selectAllReduced();
			expect( fromClause ).toEqual( {
				from: jasmine.any( Function ),
				fromNamed: jasmine.any( Function ),

				where: jasmine.any( Function ),
			} );
		} );


		it( "should add SELECT token", () => {
			selectClause.selectAllReduced();

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause )
				.toEqual( jasmine.any( SelectToken ) );
		} );

		it( "should add SELECT token with DISTINCT", () => {
			selectClause.selectAllReduced();

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause )
				.toEqual( new SelectToken( "REDUCED" ) );
		} );

		it( "should ignore variables", () => {
			selectClause.selectAllReduced.call( null, "a", "b" );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause.variables )
				.toEqual( [] );
		} );

	} );

} );
