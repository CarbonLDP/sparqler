import { spyContainers } from "../../../test/spies/Container";

import { Container } from "../../core/containers/Container";
import { IRIResolver } from "../../core/iri/IRIResolver";
import { AssigmentToken } from "../../tokens/AssigmentToken";
import { ExpressionListToken } from "../../tokens/ExpressionListToken";
import { FunctionToken } from "../../tokens/FunctionToken";

import { SubSelectToken } from "../../tokens/SubSelectToken";
import { VariableToken } from "../../tokens/VariableToken";

import { ValuesBuilder } from "../../ValuesBuilder";

import { SubSelectPattern } from "./SubSelectPattern";
import { WherePattern } from "./WherePattern";


describe( "SubSelectPattern", () => {

	it( "should exists", () => {
		expect( SubSelectPattern ).toBeDefined();
		expect( SubSelectPattern ).toEqual( jasmine.any( Object ) );
	} );

	let container:Container<undefined>;
	let builder:ValuesBuilder;
	beforeEach( () => {
		container = new Container( {
			iriResolver: new IRIResolver(),
			targetToken: void 0,
		} );

		builder = ValuesBuilder.createFrom( container, {} );

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

		it( "should return a SubWherePattern object", () => {
			const wherePattern:WherePattern = selectPattern.select();
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

		it( "should add SELECT with a string variable", () => {
			selectPattern.select( "a" );

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken.projections )
				.toContain( new VariableToken( "a" ) );
		} );

		it( "should add SELECT with three string variable", () => {
			selectPattern.select( "a", "b", "c" );

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken.projections )
				.toContain( new VariableToken( "a" ) );
			expect( newContainer.targetToken.projections )
				.toContain( new VariableToken( "b" ) );
			expect( newContainer.targetToken.projections )
				.toContain( new VariableToken( "c" ) );
		} );

		it( "should add SELECT with three object variable", () => {
			selectPattern.select( builder.var( "a" ), builder.var( "b" ), builder.var( "c" ) );

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken.projections )
				.toContain( new VariableToken( "a" ) );
			expect( newContainer.targetToken.projections )
				.toContain( new VariableToken( "b" ) );
			expect( newContainer.targetToken.projections )
				.toContain( new VariableToken( "c" ) );
		} );

		it( "should add SELECT with an assignment", () => {
			selectPattern.select( builder.count( builder.var( "foo" ) ).as( builder.var( "bar" ) ) );

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken.projections )
				.toContain( new AssigmentToken(
					new FunctionToken(
						"COUNT",
						new ExpressionListToken( [ new VariableToken( "foo" ) ] )
					),
					new VariableToken( "bar" )
				) );
		} );

	} );

	describe( "SubSelectPattern.selectDistinct", () => {

		let selectPattern:SubSelectPattern;
		beforeEach( () => {
			selectPattern = SubSelectPattern
				.createFrom( container, {} );
		} );

		it( "should return a SubWherePattern object", () => {
			const wherePattern:WherePattern = selectPattern.selectDistinct();
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
			expect( newContainer.targetToken.projections )
				.toContain( new VariableToken( "a" ) );
		} );

		it( "should add SELECT with three variable", () => {
			selectPattern.selectDistinct( "a", "b", "c" );

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken.projections )
				.toContain( new VariableToken( "a" ) );
			expect( newContainer.targetToken.projections )
				.toContain( new VariableToken( "b" ) );
			expect( newContainer.targetToken.projections )
				.toContain( new VariableToken( "c" ) );
		} );

	} );

	describe( "SubSelectPattern.selectReduced", () => {

		let selectPattern:SubSelectPattern;
		beforeEach( () => {
			selectPattern = SubSelectPattern
				.createFrom( container, {} );
		} );

		it( "should return a SubWherePattern object", () => {
			const wherePattern:WherePattern = selectPattern.selectReduced();
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
			expect( newContainer.targetToken.projections )
				.toContain( new VariableToken( "a" ) );
		} );

		it( "should add SELECT with three variable", () => {
			selectPattern.selectReduced( "a", "b", "c" );

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken.projections )
				.toContain( new VariableToken( "a" ) );
			expect( newContainer.targetToken.projections )
				.toContain( new VariableToken( "b" ) );
			expect( newContainer.targetToken.projections )
				.toContain( new VariableToken( "c" ) );
		} );

	} );


	describe( "SubSelectPattern.selectAll", () => {

		let selectPattern:SubSelectPattern;
		beforeEach( () => {
			selectPattern = SubSelectPattern
				.createFrom( container, {} );
		} );

		it( "should return a SubWherePattern object", () => {
			const wherePattern:WherePattern = selectPattern.selectAll();
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

		it( "should ignore projections", () => {
			selectPattern.selectAll.call<any, any, any>( null, "a", "b" );

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken.projections )
				.toEqual( [] );
		} );

	} );

	describe( "SubSelectPattern.selectAllDistinct", () => {

		let selectPattern:SubSelectPattern;
		beforeEach( () => {
			selectPattern = SubSelectPattern
				.createFrom( container, {} );
		} );

		it( "should return a SubWherePattern object", () => {
			const wherePattern:WherePattern = selectPattern.selectAllDistinct();
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

		it( "should ignore projections", () => {
			selectPattern.selectAllDistinct.call<any, any, any>( null, "a", "b" );

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken.projections )
				.toEqual( [] );
		} );

	} );

	describe( "SubSelectPattern.selectAllReduced", () => {

		let selectPattern:SubSelectPattern;
		beforeEach( () => {
			selectPattern = SubSelectPattern
				.createFrom( container, {} );
		} );

		it( "should return a SubWherePattern object", () => {
			const wherePattern:WherePattern = selectPattern.selectAllReduced();
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

		it( "should ignore projections", () => {
			selectPattern.selectAllReduced.call<any, any, any>( null, "a", "b" );

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken.projections )
				.toEqual( [] );
		} );

	} );

} );
