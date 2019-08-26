import { Container } from "../data/Container";
import { IRIResolver } from "../data/IRIResolver";

import { IRIRefToken } from "../tokens/IRIRefToken";
import { IRIToken } from "../tokens/IRIToken";


import { Path } from "./Path";


describe( "Path", () => {

	it( "should exists", () => {
		expect( Path ).toBeDefined();
		expect( Path ).toEqual( jasmine.any( Object ) );
	} );

	let container:Container<IRIToken>;
	beforeEach( () => {
		container = new Container( {
			iriResolver: new IRIResolver(),
			targetToken: new IRIRefToken( "resource/" ),
		} );
	} );


	describe( "Path.createFrom", () => {

		it( "should exists", () => {
			expect( Path.createFrom ).toBeDefined();
			expect( Path.createFrom ).toEqual( jasmine.any( Function ) );
		} );

		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const finishPattern:Path<IRIToken> = Path
				.createFrom( container, myObject );

			expect( myObject ).toBe( finishPattern );
		} );


		it( "should create a Path object", () => {
			const finishPattern:Path<IRIToken> = Path
				.createFrom( container, {} );

			expect( finishPattern ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "Path.getPath", () => {

		let path:Path<IRIToken>;
		beforeEach( () => {
			path = Path.createFrom( container, {} );
		} );

		it( "should return targetToken", () => {
			const token:IRIToken = path.getPath();
			expect( token ).toBe( container.targetToken );
		} );

	} );

} );
