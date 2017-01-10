import * as NotTriplesPatternModule from "./NotTriplesPattern";
import NotTriplesPattern from "./NotTriplesPattern";
import { Token } from "../Tokens/Token";

describe( "Module NotTriplesPattern", ():void => {

	it( "Exists", ():void => {
		expect( NotTriplesPatternModule ).toBeDefined();
		expect( NotTriplesPatternModule ).toEqual( jasmine.any( Object ) );
	} );

	describe( "Class NotTriplesPattern", ():void => {

		it( "Exists", ():void => {
			expect( NotTriplesPattern ).toBeDefined();
			expect( NotTriplesPattern ).toEqual( jasmine.any( Function ) );
		} );

		it( "Constructor", ():void => {
			class MockToken extends Token {
				protected getPrettySeparator():string {
					return " ";
				}

				protected getCompactSeparator():string {
					return " ";
				}
			}

			let pattern:NotTriplesPattern;

			// Empty tokens
			pattern = new NotTriplesPattern( [] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );

			// Single tokens
			pattern = new NotTriplesPattern( [ new MockToken( "one" ) ] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );

			// Multiple tokens
			pattern = new NotTriplesPattern( [ new MockToken( "one" ), new MockToken( "second" ), new MockToken( "third" ) ] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
		} );

		it( "NotTriplesPattern.getPattern()", ():void => {
			class MockToken extends Token {
				protected getPrettySeparator():string {
					return " ";
				}

				protected getCompactSeparator():string {
					return " ";
				}
			}

			let pattern:NotTriplesPattern;
			let tokens:Token[];

			// Empty tokens
			pattern = new NotTriplesPattern( [] );
			tokens = pattern.getPattern();
			expect( tokens ).toEqual( jasmine.any( Array ) );
			expect( tokens.length ).toBe( 0 );

			// Single tokens
			pattern = new NotTriplesPattern( [ new MockToken( "one" ) ] );
			tokens = pattern.getPattern();
			expect( tokens ).toEqual( jasmine.any( Array ) );
			expect( tokens.length ).toBe( 1 );
			expect( tokens ).toEqual( [ new MockToken( "one" ) ] );

			// Multiple tokens
			pattern = new NotTriplesPattern( [
				new MockToken( "a" ),
				new MockToken( "e" ),
				new MockToken( "i" ),
				new MockToken( "o" ),
				new MockToken( "u" ),
			] );
			tokens = pattern.getPattern();
			expect( tokens ).toEqual( jasmine.any( Array ) );
			expect( tokens.length ).toBe( 5 );
			expect( tokens ).toEqual( [
				new MockToken( "a" ),
				new MockToken( "e" ),
				new MockToken( "i" ),
				new MockToken( "o" ),
				new MockToken( "u" ),
			] );
		} );

	} );

} );
