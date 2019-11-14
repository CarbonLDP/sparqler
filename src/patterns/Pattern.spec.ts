import { Container } from "../core/containers/Container";
import { IRIResolver } from "../core/iri/IRIResolver";

import { GroupPatternToken } from "../tokens/GroupPatternToken";
import { PatternToken } from "../tokens/PatternToken";

import { Pattern } from "./Pattern";


describe( "Pattern", () => {

	it( "should exists", () => {
		expect( Pattern ).toBeDefined();
		expect( Pattern ).toEqual( jasmine.any( Object ) );
	} );

	let container:Container<PatternToken>;
	beforeEach( () => {
		container = new Container( {
			iriResolver: new IRIResolver(),
			targetToken: new GroupPatternToken()
		} )
	} );


	describe( "Pattern.createFrom", () => {

		it( "should exists", () => {
			expect( Pattern.createFrom ).toBeDefined();
			expect( Pattern.createFrom ).toEqual( jasmine.any( Function ) );
		} );


		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const triplePattern:Pattern<any> = Pattern
				.createFrom( container, myObject );

			expect( myObject ).toBe( triplePattern );
		} );

		it( "should create a Pattern object", () => {
			const triplePattern:Pattern<any> = Pattern
				.createFrom( container, {} );

			expect( triplePattern ).toEqual( {
				_getPattern: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "Pattern.getPattern", () => {

		let pattern:Pattern;
		beforeEach( () => {
			pattern = Pattern.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( pattern._getPattern ).toBeDefined();
			expect( pattern._getPattern ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return the targetToken", () => {
			const returned = pattern._getPattern();
			expect( returned ).toBe( container.targetToken );
		} );

	} );

} );
