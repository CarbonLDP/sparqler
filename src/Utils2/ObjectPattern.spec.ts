import * as ObjectPattern from "./ObjectPattern";

import { LeftSymbol } from "../tokens/LeftSymbol";
import { StringLiteral } from "../tokens/StringLiteral";
import { RightSymbol } from "../tokens/RightSymbol";
import { Identifier } from "../tokens/Identifier";
import { Token } from "../tokens/Token";
import { ElementPattern } from "../patterns/interfaces";
import { Operator } from "../tokens/Operator";
import * as XSD from "./XSD";

describe( "Module ObjectPattern", ():void => {

	it( "Exists", ():void => {
		expect( ObjectPattern ).toBeDefined();
		expect( ObjectPattern ).toEqual( jasmine.any( Object ) );
	} );

	describe( "serialize()", ():void => {

		it( "Exists", ():void => {
			expect( ObjectPattern.serialize ).toBeDefined();
			expect( ObjectPattern.serialize ).toEqual( jasmine.any( Function ) );
		} );

		describe( "Serialize native types", ():void => {

			it( "With String, add the string symbols", ():void => {
				expect( ObjectPattern.serialize( "string" ) ).toEqual( [
					new LeftSymbol( "\"" ), new StringLiteral( "string" ), new RightSymbol( "\"" ),
				] );

				expect( ObjectPattern.serialize( "another-string" ) ).toEqual( [
					new LeftSymbol( "\"" ), new StringLiteral( "another-string" ), new RightSymbol( "\"" ),
				] );

				expect( ObjectPattern.serialize( String( "a-string" ) as string ) ).toEqual( [
					new LeftSymbol( "\"" ), new StringLiteral( "a-string" ), new RightSymbol( "\"" ),
				] );

				expect( ObjectPattern.serialize( new String( "a-string" ) as string ) ).toEqual( [
					new LeftSymbol( "\"" ), new StringLiteral( "a-string" ), new RightSymbol( "\"" ),
				] );
			} );

			it( "If the string is the reserved word 'UNDEF', returns its Identifier", ():void => {
				expect( ObjectPattern.serialize( "UNDEF" ) ).toEqual( [
					new Identifier( "UNDEF" ),
				] );
			} );

			it( "With Number, call to addType()", ():void => {
				class MockToken extends Token {
					protected getPrettySeparator():string {
						return " ";
					}

					protected getCompactSeparator():string {
						return " ";
					}
				}

				let spyAddType:jasmine.Spy = spyOn( ObjectPattern, "addType" ).and.callFake( () => {
					return [ new MockToken( "mock-token" ) ];
				} );

				spyAddType.calls.reset();
				expect( ObjectPattern.serialize( 1 ) ).toEqual( [
					new MockToken( "mock-token" ),
				] );
				expect( spyAddType ).toHaveBeenCalledTimes( 1 );
				expect( spyAddType ).toHaveBeenCalledWith( "1", "integer" );

				spyAddType.calls.reset();
				expect( ObjectPattern.serialize( 1.01 ) ).toEqual( [
					new MockToken( "mock-token" ),
				] );
				expect( spyAddType ).toHaveBeenCalledTimes( 1 );
				expect( spyAddType ).toHaveBeenCalledWith( "1.01", "float" );

				spyAddType.calls.reset();
				expect( ObjectPattern.serialize( Number( 1 ) as number ) ).toEqual( [
					new MockToken( "mock-token" ),
				] );
				expect( spyAddType ).toHaveBeenCalledTimes( 1 );
				expect( spyAddType ).toHaveBeenCalledWith( "1", "integer" );

				spyAddType.calls.reset();
				expect( ObjectPattern.serialize( Number( 1.01 ) as number ) ).toEqual( [
					new MockToken( "mock-token" ),
				] );
				expect( spyAddType ).toHaveBeenCalledTimes( 1 );
				expect( spyAddType ).toHaveBeenCalledWith( "1.01", "float" );

				spyAddType.calls.reset();
				expect( ObjectPattern.serialize( new Number( 1 ) as number ) ).toEqual( [
					new MockToken( "mock-token" ),
				] );
				expect( spyAddType ).toHaveBeenCalledTimes( 1 );
				expect( spyAddType ).toHaveBeenCalledWith( "1", "integer" );

				spyAddType.calls.reset();
				expect( ObjectPattern.serialize( new Number( 1.01 ) as number ) ).toEqual( [
					new MockToken( "mock-token" ),
				] );
				expect( spyAddType ).toHaveBeenCalledTimes( 1 );
				expect( spyAddType ).toHaveBeenCalledWith( "1.01", "float" );
			} );

			it( "With Boolean, call to addType()", ():void => {
				class MockToken extends Token {
					protected getPrettySeparator():string {
						return " ";
					}

					protected getCompactSeparator():string {
						return " ";
					}
				}

				let spyAddType:jasmine.Spy = spyOn( ObjectPattern, "addType" ).and.callFake( () => {
					return [ new MockToken( "mock-token" ) ];
				} );

				spyAddType.calls.reset();
				expect( ObjectPattern.serialize( true ) ).toEqual( [
					new MockToken( "mock-token" ),
				] );
				expect( spyAddType ).toHaveBeenCalledTimes( 1 );
				expect( spyAddType ).toHaveBeenCalledWith( "true", "boolean" );

				spyAddType.calls.reset();
				expect( ObjectPattern.serialize( false ) ).toEqual( [
					new MockToken( "mock-token" ),
				] );
				expect( spyAddType ).toHaveBeenCalledTimes( 1 );
				expect( spyAddType ).toHaveBeenCalledWith( "false", "boolean" );

				spyAddType.calls.reset();
				expect( ObjectPattern.serialize( Boolean( true ) as boolean ) ).toEqual( [
					new MockToken( "mock-token" ),
				] );
				expect( spyAddType ).toHaveBeenCalledTimes( 1 );
				expect( spyAddType ).toHaveBeenCalledWith( "true", "boolean" );

				spyAddType.calls.reset();
				expect( ObjectPattern.serialize( Boolean( false ) as boolean ) ).toEqual( [
					new MockToken( "mock-token" ),
				] );
				expect( spyAddType ).toHaveBeenCalledTimes( 1 );
				expect( spyAddType ).toHaveBeenCalledWith( "false", "boolean" );

				spyAddType.calls.reset();
				expect( ObjectPattern.serialize( new Boolean( true ) as boolean ) ).toEqual( [
					new MockToken( "mock-token" ),
				] );
				expect( spyAddType ).toHaveBeenCalledTimes( 1 );
				expect( spyAddType ).toHaveBeenCalledWith( "true", "boolean" );

				spyAddType.calls.reset();
				expect( ObjectPattern.serialize( new Boolean( false ) as boolean ) ).toEqual( [
					new MockToken( "mock-token" ),
				] );
				expect( spyAddType ).toHaveBeenCalledTimes( 1 );
				expect( spyAddType ).toHaveBeenCalledWith( "false", "boolean" );
			} );

			it( "With Date, get ISO and call to addType()", ():void => {
				class MockToken extends Token {
					protected getPrettySeparator():string {
						return " ";
					}

					protected getCompactSeparator():string {
						return " ";
					}
				}

				let spyAddType:jasmine.Spy = spyOn( ObjectPattern, "addType" ).and.callFake( () => {
					return [ new MockToken( "mock-token" ) ];
				} );

				let date:Date;

				spyAddType.calls.reset();
				date = new Date();
				expect( ObjectPattern.serialize( date ) ).toEqual( [
					new MockToken( "mock-token" ),
				] );
				expect( spyAddType ).toHaveBeenCalledTimes( 1 );
				expect( spyAddType ).toHaveBeenCalledWith( date.toISOString(), "dateTime" );

				spyAddType.calls.reset();
				date = new Date( "2017-01-01T00:00:00Z" );
				expect( ObjectPattern.serialize( date ) ).toEqual( [
					new MockToken( "mock-token" ),
				] );
				expect( spyAddType ).toHaveBeenCalledTimes( 1 );
				expect( spyAddType ).toHaveBeenCalledWith( "2017-01-01T00:00:00.000Z", "dateTime" );
			} );

		} );

		describe( "Serialize ElementPattern", ():void => {

			it( "Calls to `getSelfTokens()`", ():void => {
				class MockToken extends Token {
					protected getPrettySeparator():string {
						return " ";
					}

					protected getCompactSeparator():string {
						return " ";
					}
				}

				let element:ElementPattern;
				let spySelfTokens:jasmine.Spy;

				element = { getSelfTokens: () => [ new MockToken( "element-self-tokens" ) ] };
				spySelfTokens = spyOn( element, "getSelfTokens" ).and.callThrough();
				expect( ObjectPattern.serialize( element ) ).toEqual( [
					new MockToken( "element-self-tokens" ),
				] );
				expect( spySelfTokens ).toHaveBeenCalledTimes( 1 );

				element = { getSelfTokens: () => [ new MockToken( "element-self-tokens" ), new MockToken( "another-element-self-tokens" ) ] };
				spySelfTokens = spyOn( element, "getSelfTokens" ).and.callThrough();
				expect( ObjectPattern.serialize( element ) ).toEqual( [
					new MockToken( "element-self-tokens" ),
					new MockToken( "another-element-self-tokens" ),
				] );
				expect( spySelfTokens ).toHaveBeenCalledTimes( 1 );
			} );

		} );

	} );

	describe( "addType()", ():void => {

		it( "Exists", ():void => {
			expect( ObjectPattern.addType ).toBeDefined();
			expect( ObjectPattern.addType ).toEqual( jasmine.any( Function ) );
		} );

		it( "Get tokens of a XSD type, resolving the relative type declared uin XSD Module", ():void => {
			let types:string[] = Object.keys( XSD ).filter( name => ! ( name === "NAMESPACE" ) );

			for( let type of types ) {
				expect( ObjectPattern.addType( "the-value", type ) ).toEqual( [
					new LeftSymbol( "\"" ), new StringLiteral( "the-value" ), new RightSymbol( "\"" ),
					new Operator( "^^" ), new LeftSymbol( "<" ), new StringLiteral( XSD[ type ] ), new RightSymbol( ">" ),
				] );
			}
		} );

		it( "Get tokens of a custom type", ():void => {
			expect( ObjectPattern.addType( "the-value", "the-type" ) ).toEqual( [
				new LeftSymbol( "\"" ), new StringLiteral( "the-value" ), new RightSymbol( "\"" ),
				new Operator( "^^" ), new LeftSymbol( "<" ), new StringLiteral( "the-type" ), new RightSymbol( ">" ),
			] );

			expect( ObjectPattern.addType( "another-value", "another-type" ) ).toEqual( [
				new LeftSymbol( "\"" ), new StringLiteral( "another-value" ), new RightSymbol( "\"" ),
				new Operator( "^^" ), new LeftSymbol( "<" ), new StringLiteral( "another-type" ), new RightSymbol( ">" ),
			] );
		} );

	} );

} );
