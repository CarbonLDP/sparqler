import { IRIResolver } from "sparqler/iri";
import {
	LeftSymbol,
	Operator,
	RightSymbol,
	StringLiteral,
	Token,
} from "sparqler/tokens";


describe( "IRIResolver", ():void => {

	it( "should exists", ():void => {
		expect( IRIResolver ).toBeDefined();
		expect( IRIResolver ).toEqual( jasmine.any( Function ) );
	} );

	it( "should have respective methods", ():void => {
		const iriResolver:IRIResolver = new IRIResolver();
		expect( iriResolver ).toEqual( jasmine.objectContaining( {
			resolve: jasmine.any( Function ),
		} ) );
	} );

	it( "should create IRI tokens", ():void => {
		const iriResolver:IRIResolver = new IRIResolver();
		const tokens:Token[] = iriResolver.resolve( "http://example.com/resource/" );
		expect( tokens ).toEqual( [
			new LeftSymbol( "<" ),
			new StringLiteral( "http://example.com/resource/" ),
			new RightSymbol( ">" ),
		] );
	} );

	it( "should throw error if prefix does not exists", ():void => {
		(() => {
			const iriResolver:IRIResolver = new IRIResolver();
			expect( () => iriResolver.resolve( "ex:resource" ) ).toThrowError( "The used prefix has not been declared" );
		})();

		(() => {
			const iriResolver:IRIResolver = new IRIResolver();
			iriResolver._prefixes.set( "ex", false );
			expect( () => iriResolver.resolve( "another:resource" ) ).toThrowError( "The used prefix has not been declared" );
		})();
	} );

	it( "should create prefix tokens and mark them as used", ():void => {
		(() => {
			const iriResolver:IRIResolver = new IRIResolver();
			iriResolver._prefixes.set( "ex", false );
			iriResolver._prefixes.set( "another", true );

			const tokens:Token[] = iriResolver.resolve( "ex:resource" );
			expect( tokens ).toEqual( [
				new StringLiteral( "ex" ),
				new Operator( ":" ),
				new StringLiteral( "resource" ),
			] );
			expect( iriResolver._prefixes.get( "ex" ) ).toBe( true );
			expect( iriResolver._prefixes.get( "another" ) ).toBe( true );
		})();

		(() => {
			const iriResolver:IRIResolver = new IRIResolver();
			iriResolver._prefixes.set( "ex", false );
			iriResolver._prefixes.set( "another", true );

			const tokens:Token[] = iriResolver.resolve( "another:resource" );
			expect( tokens ).toEqual( [
				new StringLiteral( "another" ),
				new Operator( ":" ),
				new StringLiteral( "resource" ),
			] );
			expect( iriResolver._prefixes.get( "ex" ) ).toBe( false );
			expect( iriResolver._prefixes.get( "another" ) ).toBe( true );
		})();
	} );

	it( "should resolve relative IRIs if vocabulary is specified", ():void => {
		// No vocabulary is present in the IRIResolver
		(() => {
			const iriResolver:IRIResolver = new IRIResolver();
			const tokens:Token[] = iriResolver.resolve( "relative-iri", true );
			expect( tokens ).toEqual( [
				new LeftSymbol( "<" ),
				new StringLiteral( "relative-iri" ),
				new RightSymbol( ">" ),
			] );
		})();

		// With vocabulary set in the IRIResolver
		(() => {
			const iriResolver:IRIResolver = new IRIResolver( null, "http://example.com/ns#" );

			const tokens:Token[] = iriResolver.resolve( "relative-iri", true );
			expect( tokens ).toEqual( [
				new LeftSymbol( "<" ),
				new StringLiteral( "http://example.com/ns#relative-iri" ),
				new RightSymbol( ">" ),
			] );
		})();

		// With vocabulary set in the IRIResolver but specify to not used it
		(() => {
			const iriResolver:IRIResolver = new IRIResolver( null, "http://example.com/ns#" );

			const tokens:Token[] = iriResolver.resolve( "relative-iri", false );
			expect( tokens ).toEqual( [
				new LeftSymbol( "<" ),
				new StringLiteral( "relative-iri" ),
				new RightSymbol( ">" ),
			] );
		})();
	} );

} );
