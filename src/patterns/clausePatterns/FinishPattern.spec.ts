import { spyContainers } from "../../../test/spies/clones";

import { Container } from "../../data/Container";
import { IRIResolver } from "../../data/IRIResolver";

import { SubSelectToken } from "../../tokens/SubSelectToken";

import { FinishPattern } from "./FinishPattern";


describe( "FinishPattern", () => {

	it( "should exists", () => {
		expect( FinishPattern ).toBeDefined();
		expect( FinishPattern ).toEqual( jasmine.any( Object ) );
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


	describe( "FinishPattern.createFrom", () => {

		it( "should exists", () => {
			expect( FinishPattern.createFrom ).toBeDefined();
			expect( FinishPattern.createFrom ).toEqual( jasmine.any( Function ) );
		} );

		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const finishPattern:FinishPattern = FinishPattern
				.createFrom( container, myObject );

			expect( myObject ).toBe( finishPattern );
		} );


		it( "should create a FinishPattern object", () => {
			const finishPattern:FinishPattern = FinishPattern
				.createFrom( container, {} );

			expect( finishPattern ).toEqual( {
				getPattern: jasmine.any( Function ),

				toCompactString: jasmine.any( Function ),
				toPrettyString: jasmine.any( Function ),
				toString: jasmine.any( Function ),
			} );
		} );

	} );

} );


