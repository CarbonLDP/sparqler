import * as IdentifierModule from "./Identifier";
import Identifier from "./Identifier";
import {
	Token,
	TokenFormat
} from "./Token";
import { LeftSymbol } from "./LeftSymbol";
import { RightSymbol } from "./RightSymbol";
import { NewLineSymbol } from "./NewLineSymbol";
import { NumberLiteral } from "./NumberLiteral";
import { Operator } from "./Operator";
import { StringLiteral } from "./StringLiteral";

describe( "Module Tokens/Identifier", ():void => {

	it( "Exists", ():void => {
		expect( IdentifierModule ).toBeDefined();
		expect( IdentifierModule ).toEqual( jasmine.any( Object ) );
	} );

	describe( "Class Identifier", ():void => {

		it( "Exists", ():void => {
			expect( Identifier ).toBeDefined();
			expect( Identifier ).toEqual( jasmine.any( Function ) );
			expect( Identifier ).toBe( IdentifierModule.Identifier );
		} );

		it( "Constructor", ():void => {
			let identifier:Identifier = new Identifier( "something" );

			expect( identifier ).toBeDefined();
			expect( identifier ).toEqual( jasmine.any( Identifier ) );
			expect( identifier ).toEqual( jasmine.any( Token ) );
		} );

		describe( "Identifier.getTokenValue()", ():void => {

			it( "Without nextToken always add space", ():void => {
				let identifier:Identifier;
				let value:string;

				// Compact format
				identifier = new Identifier( "identifier" );
				value = identifier.getTokenValue( TokenFormat.COMPACT );
				expect( value ).toBe( "identifier " );

				identifier = new Identifier( "identifier-2" );
				value = identifier.getTokenValue( TokenFormat.COMPACT );
				expect( value ).toBe( "identifier-2 " );

				// Pretty format
				identifier = new Identifier( "identifier" );
				value = identifier.getTokenValue( TokenFormat.PRETTY );
				expect( value ).toBe( "identifier " );

				identifier = new Identifier( "identifier-2" );
				value = identifier.getTokenValue( TokenFormat.PRETTY );
				expect( value ).toBe( "identifier-2 " );
			} );

			describe( "With PRETTY format", ():void => {

				it( "Always add space except when identifier is `UNION`", ():void => {
					let identifier:Identifier;
					let nextToken:Token;
					let value:string;

					// nextToken an Identifier
					identifier = new Identifier( "identifier" );
					nextToken = new Identifier( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "identifier " );

					identifier = new Identifier( "UNION" );
					nextToken = new Identifier( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "UNION " );

					// nextToken an LeftSymbol
					identifier = new Identifier( "identifier" );
					nextToken = new LeftSymbol( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "identifier " );

					identifier = new Identifier( "UNION" );
					nextToken = new LeftSymbol( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "UNION " );

					// nextToken an NewLineSymbol
					identifier = new Identifier( "identifier" );
					nextToken = new NewLineSymbol( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "identifier " );

					identifier = new Identifier( "UNION" );
					nextToken = new NewLineSymbol( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "UNION " );

					// nextToken an NumberLiteral
					identifier = new Identifier( "identifier" );
					nextToken = new NumberLiteral( 1 );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "identifier " );

					identifier = new Identifier( "UNION" );
					nextToken = new NumberLiteral( 1 );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "UNION " );

					// nextToken an Operator
					identifier = new Identifier( "identifier" );
					nextToken = new Operator( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "identifier " );

					identifier = new Identifier( "UNION" );
					nextToken = new Operator( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "UNION " );

					// nextToken an RightSymbol
					identifier = new Identifier( "identifier" );
					nextToken = new RightSymbol( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "identifier " );

					identifier = new Identifier( "UNION" );
					nextToken = new RightSymbol( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "UNION " );

					// nextToken an StringLiteral
					identifier = new Identifier( "identifier" );
					nextToken = new StringLiteral( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "identifier " );

					identifier = new Identifier( "UNION" );
					nextToken = new StringLiteral( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "UNION " );

					// nextToken an StringLiteral
					identifier = new Identifier( "identifier" );
					nextToken = new StringLiteral( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "identifier " );

					identifier = new Identifier( "UNION" );
					nextToken = new StringLiteral( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "UNION " );
				} );

				it( "When `UNION` add new line", ():void => {
					let identifier:Identifier;
					let nextToken:Token;
					let value:string;

					// nextToken an Identifier
					identifier = new Identifier( "UNION" );
					nextToken = new Identifier( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "UNION\n" );

					// nextToken an LeftSymbol
					identifier = new Identifier( "UNION" );
					nextToken = new LeftSymbol( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "UNION\n" );

					// nextToken an NewLineSymbol
					identifier = new Identifier( "UNION" );
					nextToken = new NewLineSymbol( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "UNION\n" );

					// nextToken an NumberLiteral
					identifier = new Identifier( "UNION" );
					nextToken = new NumberLiteral( 1 );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "UNION\n" );

					// nextToken an Operator
					identifier = new Identifier( "UNION" );
					nextToken = new Operator( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "UNION\n" );

					// nextToken an RightSymbol
					identifier = new Identifier( "UNION" );
					nextToken = new RightSymbol( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "UNION\n" );

					// nextToken an StringLiteral
					identifier = new Identifier( "UNION" );
					nextToken = new StringLiteral( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "UNION\n" );

					// nextToken an StringLiteral
					identifier = new Identifier( "UNION" );
					nextToken = new StringLiteral( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "UNION\n" );
				} );

			} );

			describe( "With COMPACT format", ():void => {

				it( "Add a space when a string type ( Identifier and StringLiteral )", ():void => {
					let identifier:Identifier;
					let nextToken:Token;
					let value:string;

					// Add Space

					// nextToken an Identifier
					identifier = new Identifier( "identifierValue" );
					nextToken = new Identifier( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "identifierValue " );

					// nextToken an StringLiteral
					identifier = new Identifier( "identifierValue" );
					nextToken = new StringLiteral( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "identifierValue " );

					// Not add space

					// nextToken an LeftSymbol
					identifier = new Identifier( "identifierValue" );
					nextToken = new LeftSymbol( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).not.toBe( "identifierValue " );

					// nextToken an NewLineSymbol
					identifier = new Identifier( "identifierValue" );
					nextToken = new NewLineSymbol( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).not.toBe( "identifierValue " );

					// nextToken an NumberLiteral
					identifier = new Identifier( "identifierValue" );
					nextToken = new NumberLiteral( 1 );
					value = identifier.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).not.toBe( "identifierValue " );

					// nextToken an Operator
					identifier = new Identifier( "identifierValue" );
					nextToken = new Operator( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).not.toBe( "identifierValue " );

					// nextToken an RightSymbol
					identifier = new Identifier( "identifierValue" );
					nextToken = new RightSymbol( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).not.toBe( "identifierValue " );
				} );

				it( "Add nothing for the other tokens", ():void => {
					let identifier:Identifier;
					let nextToken:Token;
					let value:string;

					// Add nothing

					// nextToken an LeftSymbol
					identifier = new Identifier( "identifierValue" );
					nextToken = new LeftSymbol( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "identifierValue" );

					// nextToken an NewLineSymbol
					identifier = new Identifier( "identifierValue" );
					nextToken = new NewLineSymbol( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "identifierValue" );

					// nextToken an NumberLiteral
					identifier = new Identifier( "identifierValue" );
					nextToken = new NumberLiteral( 1 );
					value = identifier.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "identifierValue" );

					// nextToken an Operator
					identifier = new Identifier( "identifierValue" );
					nextToken = new Operator( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "identifierValue" );

					// nextToken an RightSymbol
					identifier = new Identifier( "identifierValue" );
					nextToken = new RightSymbol( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "identifierValue" );

					// Not add nothing

					// nextToken an Identifier
					identifier = new Identifier( "identifierValue" );
					nextToken = new Identifier( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).not.toBe( "identifierValue" );

					// nextToken an StringLiteral
					identifier = new Identifier( "identifierValue" );
					nextToken = new StringLiteral( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).not.toBe( "identifierValue" );
				} );

			} );

		} );

	} );

} );
