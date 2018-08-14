import { Container } from "../../data/Container";
import { IRIResolver } from "../../data/IRIResolver";

import { IRIToken } from "../../tokens/IRIToken";
import { SubjectToken } from "../../tokens/SubjectToken";
import { TripleToken } from "../../tokens/TripleToken";

import { TriplePattern } from "./TriplePattern";


describe( "TriplePattern", () => {

	it( "should exists", () => {
		expect( TriplePattern ).toBeDefined();
		expect( TriplePattern ).toEqual( jasmine.any( Object ) );
	} );

	let iriResolver:IRIResolver;
	beforeEach( () => {
		iriResolver = new IRIResolver();
	} );


	describe( "TriplePattern.createFrom", () => {

		it( "should exists", () => {
			expect( TriplePattern.createFrom ).toBeDefined();
			expect( TriplePattern.createFrom ).toEqual( jasmine.any( Function ) );
		} );


		let container:Container<TripleToken<any>>;
		beforeEach( () => {
			container = new Container( {
				iriResolver,
				targetToken: new SubjectToken( new IRIToken( "" ) )
			} )
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
				getSubject: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "TriplePattern.getSubject", () => {

		it( "should exists", () => {
			const container:Container<TripleToken<any>> = new Container( {
				iriResolver,
				targetToken: new SubjectToken( new IRIToken( "" ) )
			} );

			const triplePattern:TriplePattern<any> = TriplePattern
				.createFrom( container, {} );

			expect( triplePattern.getSubject ).toBeDefined();
			expect( triplePattern.getSubject ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return subject from the TripleToken", () => {
			const subject:IRIToken = new IRIToken( "" );
			const container:Container<TripleToken<any>> = new Container( {
				iriResolver,
				targetToken: new SubjectToken( subject )
			} );


			const triplePattern:TriplePattern<any> = TriplePattern
				.createFrom( container, {} );

			const returned = triplePattern.getSubject();
			expect( returned ).toBe( subject );
		} );

	} );

} );
