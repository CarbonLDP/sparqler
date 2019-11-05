import { TokenNode } from "../../tokens/TokenNode";

import { IRIResolver } from "../iri/IRIResolver";

import { Container } from "./Container";


describe( "Container", () => {

	it( "should exists", ():void => {
		expect( Container ).toBeDefined();
		expect( Container ).toEqual( jasmine.any( Function ) );
	} );

	describe( "Container.constructor", () => {

		it( "should be instantiable", () => {
			const container:Container<undefined> = new Container( {
				iriResolver: new IRIResolver(),
				targetToken: void 0,
			} );

			expect( container ).toEqual( jasmine.any( Container ) );
		} );

		it( "should be a read only object", ():void => {
			const container:Container<undefined> & { something?:any } = new Container( {
				iriResolver: new IRIResolver(),
				targetToken: void 0,
			} );

			expect( () => container.something = null ).toThrowError( /extensible/ );
		} );


		it( "should assign the iriResolver", () => {
			const iriResolver:IRIResolver = new IRIResolver();

			const container:Container<undefined> = new Container( {
				iriResolver: iriResolver,
				targetToken: void 0,
			} );

			expect( container.iriResolver ).toBe( iriResolver );
		} );

		it( "should assign the undefined targetToken", () => {
			const container:Container<undefined> = new Container( {
				iriResolver: new IRIResolver(),
				targetToken: void 0,
			} );

			expect( container.targetToken ).toBeUndefined();
		} );

		it( "should assign the undefined targetToken", () => {
			const targetToken:TokenNode = { token: "none" };

			const container:Container<TokenNode> = new Container( {
				iriResolver: new IRIResolver(),
				targetToken: targetToken,
			} );

			expect( container.targetToken ).toBe( targetToken );
		} );

	} );

} );
