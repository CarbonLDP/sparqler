import * as TokenModule from "./Token";
import Token from "./Token";

import { TokenFormat } from "./Token";

describe( "Module Tokens/Token", ():void => {

	it( "Exists", ():void => {
		expect( TokenModule ).toBeDefined();
		expect( TokenModule ).toEqual( jasmine.any( Object ) );
	} );

	describe( "Class Token", ():void => {

		it( "Exists", ():void => {
			expect( Token ).toBeDefined();
			expect( Token ).toEqual( jasmine.any( Function ) );
			expect( Token ).toBe( TokenModule.Token );
		} );

		describe( "Operator.getTokenValue()", ():void => {

			it( "Without nextToken always add space", ():void => {
				class MockToken extends Token {
					protected getPrettySeparator( nextToken:Token ):string {
						return "";
					}

					protected getCompactSeparator( nextToken:Token ):string {
						return "";
					}
				}

				let token:Token;
				let value:string;

				// Compact format
				token = new MockToken( "value" );
				value = token.getTokenValue( TokenFormat.COMPACT );
				expect( value ).toBe( "value " );

				token = new MockToken( "value-2" );
				value = token.getTokenValue( TokenFormat.COMPACT );
				expect( value ).toBe( "value-2 " );

				// Pretty format
				token = new MockToken( "value" );
				value = token.getTokenValue( TokenFormat.PRETTY );
				expect( value ).toBe( "value " );

				token = new MockToken( "value-2" );
				value = token.getTokenValue( TokenFormat.PRETTY );
				expect( value ).toBe( "value-2 " );
			} );

			it( "With pretty format use the separator returned by `getPrettySeparator()`", ():void => {
				class MockToken extends Token {
					protected getPrettySeparator( nextToken:Token ):string {
						return " ";
					}

					protected getCompactSeparator( nextToken:Token ):string {
						return " ";
					}
				}
				class MockToken1 extends Token {
					protected getPrettySeparator( nextToken:Token ):string {
						return "-this-is-the-PRETTY-separator";
					}

					protected getCompactSeparator( nextToken:Token ):string {
						return "-this-is-the-COMPACT-separator";
					}
				}
				class MockToken2 extends Token {
					protected getPrettySeparator( nextToken:Token ):string {
						return "-this-is-another-PRETTY-separator";
					}

					protected getCompactSeparator( nextToken:Token ):string {
						return "-this-is-another-COMPACT-separator";
					}
				}

				let token:Token;
				let nextToken:Token;
				let value:string;

				token = new MockToken1( "value" );
				nextToken = new MockToken( "nextToken" );
				value = token.getTokenValue( TokenFormat.PRETTY, nextToken );
				expect( value ).toBe( "value-this-is-the-PRETTY-separator" );

				token = new MockToken2( "value" );
				nextToken = new MockToken( "nextToken" );
				value = token.getTokenValue( TokenFormat.PRETTY, nextToken );
				expect( value ).toBe( "value-this-is-another-PRETTY-separator" );
			} );

			it( "With compact format use the separator returned by `getCompactSeparator()`", ():void => {
				class MockToken extends Token {
					protected getPrettySeparator( nextToken:Token ):string {
						return " ";
					}

					protected getCompactSeparator( nextToken:Token ):string {
						return " ";
					}
				}
				class MockToken1 extends Token {
					protected getPrettySeparator( nextToken:Token ):string {
						return "-this-is-the-PRETTY-separator";
					}

					protected getCompactSeparator( nextToken:Token ):string {
						return "-this-is-the-COMPACT-separator";
					}
				}
				class MockToken2 extends Token {
					protected getPrettySeparator( nextToken:Token ):string {
						return "-this-is-another-PRETTY-separator";
					}

					protected getCompactSeparator( nextToken:Token ):string {
						return "-this-is-another-COMPACT-separator";
					}
				}

				let token:Token;
				let nextToken:Token;
				let value:string;

				token = new MockToken1( "value" );
				nextToken = new MockToken( "nextToken" );
				value = token.getTokenValue( TokenFormat.COMPACT, nextToken );
				expect( value ).toBe( "value-this-is-the-COMPACT-separator" );

				token = new MockToken2( "value" );
				nextToken = new MockToken( "nextToken" );
				value = token.getTokenValue( TokenFormat.COMPACT, nextToken );
				expect( value ).toBe( "value-this-is-another-COMPACT-separator" );
			} );

			it( "Unknown format will always add an space", ():void => {
				class MockToken extends Token {
					protected getPrettySeparator( nextToken:Token ):string {
						return "not-a-space";
					}

					protected getCompactSeparator( nextToken:Token ):string {
						return "not-a-space";
					}
				}

				let token:Token;
				let nextToken:Token;
				let value:string;

				token = new MockToken( "value" );
				nextToken = new MockToken( "nextToken" );
				value = token.getTokenValue( <any> - 1, nextToken );
				expect( value ).toBe( "value " );

				token = new MockToken( "value" );
				nextToken = new MockToken( "nextToken" );
				value = token.getTokenValue( <any> - 1, nextToken );
				expect( value ).toBe( "value " );
			} );

		} );

	} );

} );