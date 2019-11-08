import { MockPattern } from "../../../test/mocks/MockPattern";
import { MockPatternToken } from "../../../test/mocks/MockPatternToken";
import { spyContainers } from "../../../test/spies/clones";

import { Container } from "../../core/containers/Container";
import { IRIResolver } from "../../core/iri/IRIResolver";

import { GroupPatternToken } from "../../tokens/GroupPatternToken";
import { UnionPatternToken } from "../../tokens/UnionPatternToken";

import { GroupPattern } from "./GroupPattern";
import { UnionPattern } from "./UnionPattern";


describe( "GroupPattern", () => {

	it( "should exists", () => {
		expect( GroupPattern ).toBeDefined();
		expect( GroupPattern ).toEqual( jasmine.any( Object ) );
	} );

	let container:Container<GroupPatternToken>;
	beforeEach( () => {
		container = new Container( {
			iriResolver: new IRIResolver(),
			targetToken: new GroupPatternToken()
		} );

		spyContainers.install();
	} );

	afterEach( () => {
		spyContainers.uninstall();
	} );


	describe( "GroupPattern.createFrom", () => {

		it( "should exists", () => {
			expect( GroupPattern.createFrom ).toBeDefined();
			expect( GroupPattern.createFrom ).toEqual( jasmine.any( Function ) );
		} );


		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const triplePattern:GroupPattern = GroupPattern
				.createFrom( container, myObject );

			expect( myObject ).toBe( triplePattern );
		} );

		it( "should create a GroupPattern object", () => {
			const triplePattern:GroupPattern = GroupPattern
				.createFrom( container, {} );

			expect( triplePattern ).toEqual( {
				union: jasmine.any( Function ),

				// Inherit
				_getPattern: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "GroupPattern.union", () => {

		let pattern:GroupPattern;
		beforeEach( () => {
			pattern = GroupPattern.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( pattern.union ).toBeDefined();
			expect( pattern.union ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return a UnionPattern", () => {
			const returned:UnionPattern = pattern.union( [] );
			expect( returned ).toEqual( {
				and: jasmine.any( Function ),

				_getPattern: jasmine.any( Function ),
			} )
		} );


		it( "should create a UnionToken", () => {
			pattern.union( [] );

			const newContainer:Container<UnionPatternToken> = spyContainers.getLast();
			expect( newContainer.targetToken ).toEqual( jasmine.any( UnionPatternToken ) );
		} );

		it( "should add the group data to the union", () => {
			container.targetToken.addPattern()
				.addPattern( new MockPatternToken( "the pattern 1" ) )
				.addPattern( new MockPatternToken( "the pattern 2" ) )
				.addPattern( new MockPatternToken( "the pattern 3" ) )
			;

			pattern.union( [] );

			const newContainer:Container<UnionPatternToken> = spyContainers.getLast();

			expect( newContainer.targetToken.groupPatterns )
				.toContain( container.targetToken )
		} );

		it( "should add single pattern to the union", () => {
			pattern.union( new MockPattern( "the single pattern" ) );

			const newContainer:Container<UnionPatternToken> = spyContainers.getLast();

			expect( newContainer.targetToken.groupPatterns )
				.toContain( new GroupPatternToken()
					.addPattern( new MockPatternToken( "the single pattern" ) )
				)
		} );

		it( "should add multiple pattern to the union", () => {
			pattern.union( [
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
