import { IRIRefToken } from "../../tokens/IRIRefToken";
import { PrefixedNameToken } from "../../tokens/PrefixedNameToken";

import { IRIResolver } from "./IRIResolver";


describe( "IRIResolver", () => {

	it( "should exists", () => {
		expect( IRIResolver ).toBeDefined();
		expect( IRIResolver ).toEqual( jasmine.any( Function ) );
	} );

	it( "should have respective methods", () => {
		const iriResolver:IRIResolver = new IRIResolver();
		expect( iriResolver ).toEqual( jasmine.objectContaining<IRIResolver>( {
			resolve: jasmine.any( Function ),
		} ) );
	} );


	describe( "IRIResolver.resolve", () => {

		it( "should create IRI token", () => {
			const iriResolver:IRIResolver = new IRIResolver();

			const token:IRIRefToken | PrefixedNameToken = iriResolver.resolve( "http://example.com/resource/" );
			expect( token ).toEqual( new IRIRefToken( "http://example.com/resource/" ) );
		} );


		it( "should throw error if blank node", () => {
			const iriResolver:IRIResolver = new IRIResolver();
			expect( () => iriResolver.resolve( "_:b0" ) ).toThrowError( `The blank node label "_:b0" is an invalid argument.` );
		} );

		it( "should throw error if prefix does not exists", () => {
			const iriResolver:IRIResolver = new IRIResolver();
			expect( () => iriResolver.resolve( "ex:resource" ) ).toThrowError( `The prefix "ex" has not been declared.` );
		} );

		it( "should not throw error if prefix does exists", () => {
			const iriResolver:IRIResolver = new IRIResolver();
			iriResolver.prefixes.set( "ex", false );
			expect( () => iriResolver.resolve( "ex:resource" ) ).not.toThrowError( "The used prefix has not been declared" );
		} );

		it( "should create Prefixed Name token", () => {
			const iriResolver:IRIResolver = new IRIResolver();
			iriResolver.prefixes.set( "ex", false );

			const token:IRIRefToken | PrefixedNameToken = iriResolver.resolve( "ex:resource" );
			expect( token ).toEqual( new PrefixedNameToken( "ex", "resource" ) );
		} );

		it( "should mark prefix as used when prefixed name", () => {
			const iriResolver:IRIResolver = new IRIResolver();
			iriResolver.prefixes.set( "ex", false );
			iriResolver.prefixes.set( "another", false );

			iriResolver.resolve( "ex:resource" );
			expect( iriResolver.prefixes ).toEqual( new Map( [
				[ "ex", true ],
				[ "another", false ],
			] ) );
		} );

		it( "should maintain prefix as used when prefixed name", () => {
			const iriResolver:IRIResolver = new IRIResolver();
			iriResolver.prefixes.set( "ex", true );
			iriResolver.prefixes.set( "another", false );

			iriResolver.resolve( "ex:resource" );
			expect( iriResolver.prefixes ).toEqual( new Map( [
				[ "ex", true ],
				[ "another", false ],
			] ) );
		} );


		it( "should NOT resolve relative IRIs if vocabulary is requested BUT not vocab set", () => {
			const iriResolver:IRIResolver = new IRIResolver();

			const token:IRIRefToken | PrefixedNameToken = iriResolver
				.resolve( "relative-iri", true );

			expect( token ).toEqual( new IRIRefToken( "relative-iri" ) );
		} );

		it( "should resolve relative IRIs if vocabulary is requested AND has vocab set", () => {
			const iriResolver:IRIResolver = new IRIResolver( void 0, "http://example.com/ns#" );

			const token:IRIRefToken | PrefixedNameToken = iriResolver
				.resolve( "relative-iri", true );

			expect( token ).toEqual( new IRIRefToken( "http://example.com/ns#relative-iri" ) );
		} );

		it( "should NOT resolve relative IRIs if vocabulary explicitly NOT requested AND has vocab set", () => {
			const iriResolver:IRIResolver = new IRIResolver( void 0, "http://example.com/ns#" );

			const token:IRIRefToken | PrefixedNameToken = iriResolver
				.resolve( "relative-iri", false );

			expect( token ).toEqual( new IRIRefToken( "relative-iri" ) );
		} );

		it( "should NOT resolve relative IRIs if NO vocabulary requested AND has vocab set", () => {
			const iriResolver:IRIResolver = new IRIResolver( void 0, "http://example.com/ns#" );

			const token:IRIRefToken | PrefixedNameToken = iriResolver
				.resolve( "relative-iri" );

			expect( token ).toEqual( new IRIRefToken( "relative-iri" ) );
		} );

	} );

} );
