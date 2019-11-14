import { MockPattern } from "../../../test/mocks/MockPattern";
import { MockPatternToken } from "../../../test/mocks/MockPatternToken";
import { spyContainers } from "../../../test/spies/clones";

import { Container } from "../../core/containers/Container";
import { IRIResolver } from "../../core/iri/IRIResolver";

import { GroupPatternToken } from "../../tokens/GroupPatternToken";
import { UnionPatternToken } from "../../tokens/UnionPatternToken";

import { UnionPattern } from "./UnionPattern";


describe( "UnionPattern", () => {

	it( "should exists", () => {
		expect( UnionPattern ).toBeDefined();
		expect( UnionPattern ).toEqual( jasmine.any( Object ) );
	} );

	let container:Container<UnionPatternToken>;
	beforeEach( () => {
		container = new Container( {
			iriResolver: new IRIResolver(),
			targetToken: new UnionPatternToken()
		} );

		spyContainers.install();
	} );

	afterEach( () => {
		spyContainers.uninstall();
	} );


	describe( "UnionPattern.createFrom", () => {

		it( "should exists", () => {
			expect( UnionPattern.createFrom ).toBeDefined();
			expect( UnionPattern.createFrom ).toEqual( jasmine.any( Function ) );
		} );


		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const triplePattern:UnionPattern = UnionPattern
				.createFrom( container, myObject );

			expect( myObject ).toBe( triplePattern );
		} );

		it( "should create a UnionPattern object", () => {
			const triplePattern:UnionPattern = UnionPattern
				.createFrom( container, {} );

			expect( triplePattern ).toEqual( {
				and: jasmine.any( Function ),

				// Inherit
				_getPattern: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "UnionPattern.and", () => {

		let pattern:UnionPattern;
		beforeEach( () => {
			pattern = UnionPattern.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( pattern.and ).toBeDefined();
			expect( pattern.and ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return a UnionPattern", () => {
			const returned:UnionPattern = pattern.and( [] );
			expect( returned ).toEqual( {
				and: jasmine.any( Function ),

				_getPattern: jasmine.any( Function ),
			} )
		} );


		it( "should create a UnionToken", () => {
			pattern.and( [] );

			const newContainer:Container<UnionPatternToken> = spyContainers.getLast();
			expect( newContainer.targetToken ).toEqual( jasmine.any( UnionPatternToken ) );
		} );

		it( "should add the previous data to the union", () => {
			container.targetToken.groupPatterns.push(
				new GroupPatternToken()
					.addPattern( new MockPatternToken( "previous pattern 1" ) )
					.addPattern( new MockPatternToken( "previous pattern 2" ) )
					.addPattern( new MockPatternToken( "previous pattern 3" ) )
			);

			pattern.and( [] );

			const newContainer:Container<UnionPatternToken> = spyContainers.getLast();
			expect( newContainer.targetToken.groupPatterns )
				.toContain( new GroupPatternToken()
					.addPattern( new MockPatternToken( "previous pattern 1" ) )
					.addPattern( new MockPatternToken( "previous pattern 2" ) )
					.addPattern( new MockPatternToken( "previous pattern 3" ) )
				);
		} );

		it( "should not mutate previous data", () => {
			pattern.and( new MockPattern( "the single pattern" ) );

			expect( container.targetToken.groupPatterns )
				.toEqual( [] )
		} );

		it( "should add single pattern to the union", () => {
			pattern.and( new MockPattern( "the single pattern" ) );

			const newContainer:Container<UnionPatternToken> = spyContainers.getLast();

			expect( newContainer.targetToken.groupPatterns )
				.toContain( new GroupPatternToken()
					.addPattern( new MockPatternToken( "the single pattern" ) )
				)
		} );

		it( "should add multiple pattern to the union", () => {
			pattern.and( [
				new MockPattern( "the pattern 1" ),
				new MockPattern( "the pattern 2" ),
				new MockPattern( "the pattern 3" ),
			] );

			const newContainer:Container<UnionPatternToken> = spyContainers.getLast();

			expect( newContainer.targetToken.groupPatterns )
				.toContain( new GroupPatternToken()
					.addPattern( new MockPatternToken( "the pattern 1" ) )
					.addPattern( new MockPatternToken( "the pattern 2" ) )
					.addPattern( new MockPatternToken( "the pattern 3" ) )
				)
		} );

	} );

} );
