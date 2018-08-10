import { spyContainers } from "../../../test/spies/Container";

import { Container } from "../../data/Container";
import { IRIResolver } from "../../data/IRIResolver";

import { SubSelectToken } from "../../tokens/SubSelectToken";
import { TokenNode } from "../../tokens/TokenNode";
import { VariableToken } from "../../tokens/VariableToken";

import { SubSelectPattern } from "./SubSelectPattern";
import { SubWherePattern } from "./SubWherePattern";


describe( "SubSelectPattern", () => {

	it( "should exists", () => {
		expect( SubSelectPattern ).toBeDefined();
		expect( SubSelectPattern ).toEqual( jasmine.any( Object ) );
	} );

	let container:Container<TokenNode>;
	beforeEach( () => {
		container = new Container( {
			iriResolver: new IRIResolver(),
			targetToken: { token: "none" },
		} );

		spyContainers.install();
	} );

	afterEach( () => {
		spyContainers.uninstall();
	} );


	describe( "SubSelectPattern.createFrom", () => {

		it( "should exists", () => {
			expect( SubSelectPattern.createFrom ).toBeDefined();
			expect( SubSelectPattern.createFrom ).toEqual( jasmine.any( Function ) );
		} );

		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const selectPattern:SubSelectPattern = SubSelectPattern
				.createFrom( container, myObject );

			expect( myObject ).toBe( selectPattern );
		} );


		it( "should create a SubSelectPattern object", () => {
			const selectPattern:SubSelectPattern = SubSelectPattern
				.createFrom( container, {} );

			expect( selectPattern ).toEqual( {
				select: jasmine.any( Function ),
				selectDistinct: jasmine.any( Function ),
				selectReduced: jasmine.any( Function ),
				selectAll: jasmine.any( Function ),
				selectAllDistinct: jasmine.any( Function ),
				selectAllReduced: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "SubSelectPattern.select", () => {

		let selectPattern:SubSelectPattern;
		beforeEach( () => {
			selectPattern = SubSelectPattern
				.createFrom( container, {} );
		} );

		it( "should not mutate container token", () => {
			selectPattern.select();
			expect( container.targetToken ).toEqual( { token: "none" } );
		} );

		it( "should return a SubWherePattern object", () => {
			const wherePattern:SubWherePattern = selectPattern.select();
			expect( wherePattern ).toEqual( {
				where: jasmine.any( Function ),
			} );
		} );


		it( "should add SELECT token", () => {
			selectPattern.select();

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken )
				.toEqual( jasmine.any( SubSelectToken ) );
		} );

		it( "should add empty SELECT when no token", () => {
			selectPattern.select();

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken )
				.toEqual( new SubSelectToken() )
		} );

		it( "should add SELECT with a variable", () => {
			selectPattern.select( "a" );

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken.variables )
				.toContain( new VariableToken( "a" ) );
		} );

		it( "should add SELECT with three variable", () => {
			selectPattern.select( "a", "b", "c" );

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken.variables )
				.toContain( new VariableToken( "a" ) );
			expect( newContainer.targetToken.variables )
				.toContain( new VariableToken( "b" ) );
			expect( newContainer.targetToken.variables )
				.toContain( new VariableToken( "c" ) );
		} );

	} );

	describe( "SubSelectPattern.selectDistinct", () => {

		let selectPattern:SubSelectPattern;
		beforeEach( () => {
			selectPattern = SubSelectPattern
				.createFrom( container, {} );
		} );

		it( "should not mutate container token", () => {
			selectPattern.selectDistinct();
			expect( container.targetToken ).toEqual( { token: "none" } );
		} );

		it( "should return a SubWherePattern object", () => {
			const wherePattern:SubWherePattern = selectPattern.selectDistinct();
			expect( wherePattern ).toEqual( {
				where: jasmine.any( Function ),
			} );
		} );


		it( "should add SELECT token", () => {
			selectPattern.selectDistinct();

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken )
				.toEqual( jasmine.any( SubSelectToken ) );
		} );

		it( "should add SELECT token with DISTINCT", () => {
			selectPattern.selectDistinct();

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken )
				.toEqual( new SubSelectToken( "DISTINCT" ) );
		} );

		it( "should add SELECT with a variable", () => {
			selectPattern.selectDistinct( "a" );

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken.variables )
				.toContain( new VariableToken( "a" ) );
		} );

		it( "should add SELECT with three variable", () => {
			selectPattern.selectDistinct( "a", "b", "c" );

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken.variables )
				.toContain( new VariableToken( "a" ) );
			expect( newContainer.targetToken.variables )
				.toContain( new VariableToken( "b" ) );
			expect( newContainer.targetToken.variables )
				.toContain( new VariableToken( "c" ) );
		} );

	} );

	describe( "SubSelectPattern.selectReduced", () => {

		let selectPattern:SubSelectPattern;
		beforeEach( () => {
			selectPattern = SubSelectPattern
				.createFrom( container, {} );
		} );

		it( "should not mutate container token", () => {
			selectPattern.selectReduced();
			expect( container.targetToken ).toEqual( { token: "none" } );
		} );

		it( "should return a SubWherePattern object", () => {
			const wherePattern:SubWherePattern = selectPattern.selectReduced();
			expect( wherePattern ).toEqual( {
				where: jasmine.any( Function ),
			} );
		} );


		it( "should add SELECT token", () => {
			selectPattern.selectReduced();

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken )
				.toEqual( jasmine.any( SubSelectToken ) );
		} );

		it( "should add SELECT token with DISTINCT", () => {
			selectPattern.selectReduced();

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken )
				.toEqual( new SubSelectToken( "REDUCED" ) );
		} );

		it( "should add SELECT with a variable", () => {
			selectPattern.selectReduced( "a" );

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken.variables )
				.toContain( new VariableToken( "a" ) );
		} );

		it( "should add SELECT with three variable", () => {
			selectPattern.selectReduced( "a", "b", "c" );

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken.variables )
				.toContain( new VariableToken( "a" ) );
			expect( newContainer.targetToken.variables )
				.toContain( new VariableToken( "b" ) );
			expect( newContainer.targetToken.variables )
				.toContain( new VariableToken( "c" ) );
		} );

	} );


	describe( "SubSelectPattern.selectAll", () => {

		let selectPattern:SubSelectPattern;
		beforeEach( () => {
			selectPattern = SubSelectPattern
				.createFrom( container, {} );
		} );

		it( "should not mutate container token", () => {
			selectPattern.selectAll();
			expect( container.targetToken ).toEqual( { token: "none" } );
		} );

		it( "should return a SubWherePattern object", () => {
			const wherePattern:SubWherePattern = selectPattern.selectAll();
			expect( wherePattern ).toEqual( {
				where: jasmine.any( Function ),
			} );
		} );


		it( "should add SELECT token", () => {
			selectPattern.selectAll();

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken )
				.toEqual( jasmine.any( SubSelectToken ) );
		} );

		it( "should add empty SELECT when no token", () => {
			selectPattern.selectAll();

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken )
				.toEqual( new SubSelectToken() )
		} );

		it( "should ignore variables", () => {
			selectPattern.selectAll.call( null, "a", "b" );

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken.variables )
				.toEqual( [] );
		} );

	} );

	describe( "SubSelectPattern.selectAllDistinct", () => {

		let selectPattern:SubSelectPattern;
		beforeEach( () => {
			selectPattern = SubSelectPattern
				.createFrom( container, {} );
		} );

		it( "should not mutate container token", () => {
			selectPattern.selectAllDistinct();
			expect( container.targetToken ).toEqual( { token: "none" } );
		} );

		it( "should return a SubWherePattern object", () => {
			const wherePattern:SubWherePattern = selectPattern.selectAllDistinct();
			expect( wherePattern ).toEqual( {
				where: jasmine.any( Function ),
			} );
		} );


		it( "should add SELECT token", () => {
			selectPattern.selectAllDistinct();

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken )
				.toEqual( jasmine.any( SubSelectToken ) );
		} );

		it( "should add SELECT token with DISTINCT", () => {
			selectPattern.selectAllDistinct();

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken )
				.toEqual( new SubSelectToken( "DISTINCT" ) );
		} );

		it( "should ignore variables", () => {
			selectPattern.selectAllDistinct.call( null, "a", "b" );

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken.variables )
				.toEqual( [] );
		} );

	} );

	describe( "SubSelectPattern.selectAllReduced", () => {

		let selectPattern:SubSelectPattern;
		beforeEach( () => {
			selectPattern = SubSelectPattern
				.createFrom( container, {} );
		} );

		it( "should not mutate container token", () => {
			selectPattern.selectAllReduced();
			expect( container.targetToken ).toEqual( { token: "none" } );
		} );

		it( "should return a SubWherePattern object", () => {
			const wherePattern:SubWherePattern = selectPattern.selectAllReduced();
			expect( wherePattern ).toEqual( {
				where: jasmine.any( Function ),
			} );
		} );


		it( "should add SELECT token", () => {
			selectPattern.selectAllReduced();

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken )
				.toEqual( jasmine.any( SubSelectToken ) );
		} );

		it( "should add SELECT token with DISTINCT", () => {
			selectPattern.selectAllReduced();

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken )
				.toEqual( new SubSelectToken( "REDUCED" ) );
		} );

		it( "should ignore variables", () => {
			selectPattern.selectAllReduced.call( null, "a", "b" );

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken.variables )
				.toEqual( [] );
		} );

	} );

} );
