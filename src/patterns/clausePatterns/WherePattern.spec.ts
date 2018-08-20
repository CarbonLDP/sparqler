import { MockPattern } from "../../../test/mocks/MockPattern";
import { MockPatternToken } from "../../../test/mocks/MockPatternToken";
import { spyContainers } from "../../../test/spies/clones";

import { GroupClause } from "../../clauses/GroupClause";

import { Container } from "../../data/Container";
import { IRIResolver } from "../../data/IRIResolver";
import { SubSelectToken } from "../../tokens/SubSelectToken";
import { WhereToken } from "../../tokens/WhereToken";

import { FinishPattern } from "./FinishPattern";
import { WherePattern } from "./WherePattern";


describe( "WherePattern", () => {

	it( "should exists", () => {
		expect( WherePattern ).toBeDefined();
		expect( WherePattern ).toEqual( jasmine.any( Object ) );
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


	describe( "WherePattern.createFrom", () => {

		it( "should exists", () => {
			expect( WherePattern.createFrom ).toBeDefined();
			expect( WherePattern.createFrom ).toEqual( jasmine.any( Function ) );
		} );

		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const wherePattern:WherePattern = WherePattern
				.createFrom( container, myObject );

			expect( myObject ).toBe( wherePattern );
		} );


		it( "should create a WherePattern object", () => {
			const wherePattern:WherePattern = WherePattern
				.createFrom( container, {} );

			expect( wherePattern ).toEqual( {
				where: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "WherePattern.where", () => {

		let wherePattern:WherePattern;
		beforeEach( () => {
			wherePattern = WherePattern
				.createFrom( container, {} );
		} );


		it( "should not mutate container token", () => {
			wherePattern.where( new MockPattern( "the pattern 01" ) );
			expect( container.targetToken.where )
				.toEqual( new WhereToken() );
		} );

		it( "should return a GroupClause & FinishClause object", () => {
			const groupClause:GroupClause<FinishPattern> & FinishPattern = wherePattern
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
			wherePattern.where( [] );

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken.where )
				.toEqual( jasmine.any( WhereToken ) );
			expect( newContainer.targetToken.where )
				.not.toBe( container.targetToken.where );
		} );


		it( "should add single Pattern", () => {
			wherePattern.where( new MockPattern( "the single pattern" ) );

			const newContainer:Container<SubSelectToken> = spyContainers.getLast();
			expect( newContainer.targetToken.where.groupPattern.patterns )
				.toContain( new MockPatternToken( "the single pattern" ) );
		} );

		it( "should add multiple Pattern", () => {
			wherePattern.where( [
				new MockPattern( "the pattern 01" ),
				new MockPattern( "the pattern 02" ),
				new MockPattern( "the pattern 03" ),
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

