import { spyContainers } from "../../../test/spies/clones";

import { GroupClause } from "../../clauses/GroupClause";

import { Container } from "../../data/Container";
import { IRIResolver } from "../../data/IRIResolver";


import { GroupPatternToken } from "../../tokens/GroupPatternToken";
import { SubSelectToken } from "../../tokens/SubSelectToken";
import { WhereToken } from "../../tokens/WhereToken";

import { FinishPattern } from "./FinishPattern";
import { SubWherePattern } from "./SubWherePattern";


describe( "SubWherePattern", () => {

	it( "should exists", () => {
		expect( SubWherePattern ).toBeDefined();
		expect( SubWherePattern ).toEqual( jasmine.any( Object ) );
	} );

	let container:Container<SubSelectToken>;
	beforeEach( () => {
		container = new Container( {
			iriResolver: new IRIResolver(),
			targetToken: new SubSelectToken(),
		} );

		spyContainers.install();
	} );

	afterEach( () => {
		spyContainers.uninstall();
	} );


	describe( "SubWherePattern.createFrom", () => {

		it( "should exists", () => {
			expect( SubWherePattern.createFrom ).toBeDefined();
			expect( SubWherePattern.createFrom ).toEqual( jasmine.any( Function ) );
		} );

		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const whereClause:SubWherePattern = SubWherePattern
				.createFrom( container, myObject );

			expect( myObject ).toBe( whereClause );
		} );


		it( "should create a SubWherePattern object", () => {
			const whereClause:SubWherePattern = SubWherePattern
				.createFrom( container, {} );

			expect( whereClause ).toEqual( {
				where: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "SubWherePattern.where", () => {

		let whereClause:SubWherePattern;
		beforeEach( () => {
			whereClause = SubWherePattern
				.createFrom( container, {} );
		} );

		class MockPatternToken extends GroupPatternToken {
			readonly label:string;

			constructor( label:string ) {
				super();
				this.label = label;
			}
		}


		it( "should not mutate container token", () => {
			whereClause.where( { getPattern: () => new MockPatternToken( "the pattern 01" ) } );
			expect( container.targetToken.where )
				.toEqual( new WhereToken() );
		} );

		it( "should return a GroupClause & FinishClause object", () => {
			const groupClause:GroupClause<FinishPattern> & FinishPattern = whereClause
				.where( [] );

			expect( groupClause ).toEqual( {
				groupBy: jasmine.any( Function ),

				orderBy: jasmine.any( Function ),

				having: jasmine.any( Function ),

				limit: jasmine.any( Function ),
				offset: jasmine.any( Function ),

				values: jasmine.any( Function ),

				toCompactString: jasmine.any( Function ),
				toPrettyString: jasmine.any( Function ),
				toString: jasmine.any( Function ),

				getPattern: jasmine.any( Function ),
			} );
		} );


		it( "should add new WHERE token", () => {
			whereClause.where( [] );

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken.where )
				.toEqual( jasmine.any( WhereToken ) );
			expect( newContainer.targetToken.where )
				.not.toBe( container.targetToken.where );
		} );


		it( "should add single Pattern", () => {
			whereClause.where( { getPattern: () => new MockPatternToken( "the single pattern" ) } );

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken.where.groupPattern.patterns )
				.toContain( new MockPatternToken( "the single pattern" ) );
		} );

		it( "should add multiple Pattern", () => {
			whereClause.where( [
				{ getPattern: () => new MockPatternToken( "the pattern 01" ) },
				{ getPattern: () => new MockPatternToken( "the pattern 02" ) },
				{ getPattern: () => new MockPatternToken( "the pattern 03" ) },
			] );

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken.where.groupPattern.patterns )
				.toContain( new MockPatternToken( "the pattern 01" ) );
			expect( newContainer.targetToken.where.groupPattern.patterns )
				.toContain( new MockPatternToken( "the pattern 02" ) );
			expect( newContainer.targetToken.where.groupPattern.patterns )
				.toContain( new MockPatternToken( "the pattern 03" ) );
		} );

	} );

} );

