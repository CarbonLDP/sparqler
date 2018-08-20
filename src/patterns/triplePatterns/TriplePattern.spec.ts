import { Container } from "../../data/Container";
import { IRIResolver } from "../../data/IRIResolver";

import { IRIRefToken } from "../../tokens/IRIRefToken";
import { SubjectToken } from "../../tokens/SubjectToken";
import { TripleToken } from "../../tokens/TripleToken";

import { TriplePattern } from "./TriplePattern";


describe( "TriplePattern", () => {

	it( "should exists", () => {
		expect( TriplePattern ).toBeDefined();
		expect( TriplePattern ).toEqual( jasmine.any( Object ) );
	} );

	let container:Container<TripleToken<any>>;
	beforeEach( () => {
		container = new Container( {
			iriResolver: new IRIResolver(),
			targetToken: new SubjectToken( new IRIRefToken( "" ) )
		} )
	} );


	describe( "TriplePattern.createFrom", () => {

		it( "should exists", () => {
			expect( TriplePattern.createFrom ).toBeDefined();
			expect( TriplePattern.createFrom ).toEqual( jasmine.any( Function ) );
		} );


		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const triplePattern:TriplePattern<any> = TriplePattern
				.createFrom( container, myObject );

			expect( myObject ).toBe( triplePattern );
		} );

		it( "should create a TriplePattern object", () => {
			const triplePattern:TriplePattern<any> = TriplePattern
				.createFrom( container, {} );

			expect( triplePattern ).toEqual( {
				getPattern: jasmine.any( Function ),
			} );
		} );

	} );

} );
