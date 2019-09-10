import { MockPattern } from "../../test/mocks/MockPattern";
import { MockPatternToken } from "../../test/mocks/MockPatternToken";
import { spyContainers } from "../../test/spies/clones";

import { Container } from "../core/containers/Container";
import { IRIResolver } from "../core/iri/IRIResolver";

import { PatternBuilder } from "../patterns/PatternBuilder";
import { QueryToken } from "../tokens/QueryToken";
import { SelectToken } from "../tokens/SelectToken";
import { WhereToken } from "../tokens/WhereToken";

import { FinishClause } from "./FinishClause";
import { GroupClause } from "./GroupClause";
import { WhereClause } from "./WhereClause";


describe( "WhereClause", () => {

	it( "should exists", () => {
		expect( WhereClause ).toBeDefined();
		expect( WhereClause ).toEqual( jasmine.any( Object ) );
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


	describe( "WhereClause.createFrom", () => {

		it( "should exists", () => {
			expect( WhereClause.createFrom ).toBeDefined();
			expect( WhereClause.createFrom ).toEqual( jasmine.any( Function ) );
		} );

		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const whereClause:WhereClause<FinishClause> = WhereClause
				.createFrom( FinishClause.createFrom, container, myObject );

			expect( myObject ).toBe( whereClause );
		} );


		it( "should create a WhereClause object", () => {
			const whereClause:WhereClause<FinishClause> = WhereClause
				.createFrom( FinishClause.createFrom, container, {} );

			expect( whereClause ).toEqual( {
				where: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "WhereClause.where", () => {

		let whereClause:WhereClause<FinishClause>;
		beforeEach( () => {
			whereClause = WhereClause
				.createFrom( FinishClause.createFrom, container, {} );
		} );

		it( "should not mutate container token", () => {
			whereClause.where( _ => _.group( [] ) );
			expect( container.targetToken.queryClause.where )
				.toEqual( new WhereToken() );
		} );

		it( "should return a GroupClause & FinishClause object", () => {
			const groupClause:GroupClause<FinishClause> & FinishClause = whereClause
				.where( () => [] );

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
				debug: jasmine.any( Function ),
			} );
		} );


		it( "should provide PatternBuilder", () => {
			const spy:jasmine.Spy = jasmine.createSpy()
				.and.returnValue( [] );

			whereClause.where( spy );
			expect( spy ).toHaveBeenCalledWith( jasmine.objectContaining<PatternBuilder>( {
				var: jasmine.any( Function ),
				resource: jasmine.any( Function ),

				graph: jasmine.any( Function ),
				bind: jasmine.any( Function ),

				select: jasmine.any( Function ),
			} ) );
		} );

		it( "should add WHERE token", () => {
			whereClause.where( () => [] );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause.where )
				.toEqual( jasmine.any( WhereToken ) );
		} );


		it( "should add single Pattern", () => {
			whereClause.where( () => new MockPattern( "the single pattern" ) );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause.where.groupPattern.patterns )
				.toContain( new MockPatternToken( "the single pattern" ) );
		} );

		it( "should add multiple Pattern", () => {
			whereClause.where( () => [
				new MockPattern( "the pattern 01" ),
				new MockPattern( "the pattern 02" ),
				new MockPattern( "the pattern 03" ),
			] );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause.where.groupPattern.patterns )
				.toContain( new MockPatternToken( "the pattern 01" ) );
			expect( newContainer.targetToken.queryClause.where.groupPattern.patterns )
				.toContain( new MockPatternToken( "the pattern 02" ) );
			expect( newContainer.targetToken.queryClause.where.groupPattern.patterns )
				.toContain( new MockPatternToken( "the pattern 03" ) );
		} );

	} );

} );
