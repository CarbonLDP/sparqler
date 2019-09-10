import { Container } from "../../core/containers/Container";
import { IRIResolver } from "../../core/iri/IRIResolver";

import { GroupPatternToken } from "../../tokens/GroupPatternToken";
import { NotTripleToken } from "../../tokens/NotTripleToken";

import { NotTriplePattern } from "./NotTriplePattern";


describe( "NotTriplePattern", () => {

	it( "should exists", () => {
		expect( NotTriplePattern ).toBeDefined();
		expect( NotTriplePattern ).toEqual( jasmine.any( Object ) );
	} );

	let container:Container<NotTripleToken>;
	beforeEach( () => {
		container = new Container( {
			iriResolver: new IRIResolver(),
			targetToken: new GroupPatternToken()
		} )
	} );


	describe( "NotTriplePattern.createFrom", () => {

		it( "should exists", () => {
			expect( NotTriplePattern.createFrom ).toBeDefined();
			expect( NotTriplePattern.createFrom ).toEqual( jasmine.any( Function ) );
		} );


		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const triplePattern:NotTriplePattern<any> = NotTriplePattern
				.createFrom( container, myObject );

			expect( myObject ).toBe( triplePattern );
		} );

		it( "should create a NotTriplePattern object", () => {
			const triplePattern:NotTriplePattern<any> = NotTriplePattern
				.createFrom( container, {} );

			expect( triplePattern ).toEqual( {
				getPattern: jasmine.any( Function ),
			} );
		} );

	} );

} );
