import * as NewLineSymbolModule from "./NewLineSymbol";
import NewLineSymbol from "./NewLineSymbol";

import { Identifier } from "./Identifier";
import {
	Token,
	TokenFormat,
} from "./Token";
import { RightSymbol } from "./RightSymbol";
import { LeftSymbol } from "./LeftSymbol";
import { NumberLiteral } from "./NumberLiteral";
import { Operator } from "./Operator";
import { StringLiteral } from "./StringLiteral";

describe( "Module Tokens/NewLineSymbol", ():void => {

	it( "Exists", ():void => {
		expect( NewLineSymbolModule ).toBeDefined();
		expect( NewLineSymbolModule ).toEqual( jasmine.any( Object ) );
	} );

	describe( "Class NewLineSymbol", ():void => {

		it( "Exists", ():void => {
			expect( NewLineSymbol ).toBeDefined();
			expect( NewLineSymbol ).toEqual( jasmine.any( Function ) );
			expect( NewLineSymbol ).toBe( NewLineSymbolModule.NewLineSymbol );
		} );

		it( "Constructor", ():void => {
			let newLineSymbol:NewLineSymbol = new NewLineSymbol( "something" );

			expect( newLineSymbol ).toBeDefined();
			expect( newLineSymbol ).toEqual( jasmine.any( NewLineSymbol ) );
			expect( newLineSymbol ).toEqual( jasmine.any( Token ) );
		} );

		describe( "NewLineSymbol.getTokenValue()", ():void => {

			it( "should add nothing if next token is undefined", ():void => {
				let newLineSymbol:NewLineSymbol;
				let value:string;

				// Compact format
				newLineSymbol = new NewLineSymbol( "value" );
				value = newLineSymbol.getTokenValue( TokenFormat.COMPACT );
				expect( value ).toBe( "value" );

				newLineSymbol = new NewLineSymbol( "value-2" );
				value = newLineSymbol.getTokenValue( TokenFormat.COMPACT );
				expect( value ).toBe( "value-2" );

				// Pretty format
				newLineSymbol = new NewLineSymbol( "value" );
				value = newLineSymbol.getTokenValue( TokenFormat.PRETTY );
				expect( value ).toBe( "value" );

				newLineSymbol = new NewLineSymbol( "value-2" );
				value = newLineSymbol.getTokenValue( TokenFormat.PRETTY );
				expect( value ).toBe( "value-2" );
			} );

			describe( "With PRETTY format", ():void => {

				it( "Add a space when next is a separator for triples (NewLineSymbol with a value: '.', ';' or ',')", ():void => {
					let newLineSymbol:NewLineSymbol;
					let nextToken:Token;
					let value:string;


					// Add space

					// nextToken an Identifier
					newLineSymbol = new NewLineSymbol( "value" );
					nextToken = new NewLineSymbol( "." );
					value = newLineSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value " );

					newLineSymbol = new NewLineSymbol( "value" );
					nextToken = new NewLineSymbol( ";" );
					value = newLineSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value " );

					newLineSymbol = new NewLineSymbol( "value" );
					nextToken = new NewLineSymbol( "," );
					value = newLineSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value " );


					// Not add an space

					// nextToken a NewLineSymbol
					newLineSymbol = new NewLineSymbol( "value" );
					nextToken = new NewLineSymbol( "nextToken" );
					value = newLineSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value " );

					// nextToken an Identifier
					newLineSymbol = new NewLineSymbol( "value" );
					nextToken = new Identifier( "nextToken" );
					value = newLineSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value " );

					// nextToken a LeftSymbol
					newLineSymbol = new NewLineSymbol( "value" );
					nextToken = new LeftSymbol( "nextToken" );
					value = newLineSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value " );

					// nextToken a NumberLiteral
					newLineSymbol = new NewLineSymbol( "value" );
					nextToken = new NumberLiteral( 1 );
					value = newLineSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value " );

					// nextToken an Operator
					newLineSymbol = new NewLineSymbol( "value" );
					nextToken = new Operator( "nextToken" );
					value = newLineSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value " );

					// nextToken a RightSymbol
					newLineSymbol = new NewLineSymbol( "value" );
					nextToken = new RightSymbol( "nextToken" );
					value = newLineSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value " );

					// nextToken a StringLiteral
					newLineSymbol = new NewLineSymbol( "value" );
					nextToken = new StringLiteral( "nextToken" );
					value = newLineSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value " );
				} );

				it( "Add new line to the rest of the tokens", ():void => {
					let identifier:NewLineSymbol;
					let nextToken:Token;
					let value:string;


					// Add new line

					// nextToken an Identifier
					identifier = new NewLineSymbol( "value" );
					nextToken = new Identifier( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value\n" );

					// nextToken a LeftSymbol
					identifier = new NewLineSymbol( "value" );
					nextToken = new LeftSymbol( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value\n" );

					// nextToken a NewLineSymbol
					identifier = new NewLineSymbol( "value" );
					nextToken = new NewLineSymbol( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value\n" );

					// nextToken a NumberLiteral
					identifier = new NewLineSymbol( "value" );
					nextToken = new NumberLiteral( 1 );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value\n" );

					// nextToken an Operator
					identifier = new NewLineSymbol( "value" );
					nextToken = new Operator( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value\n" );

					// nextToken a RightSymbol
					identifier = new NewLineSymbol( "value" );
					nextToken = new RightSymbol( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value\n" );

					// nextToken a StringLiteral
					identifier = new NewLineSymbol( "value" );
					nextToken = new StringLiteral( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value\n" );
				} );

			} );

			describe( "With COMPACT format", ():void => {

				it( "Always add nothing", ():void => {
					let identifier:NewLineSymbol;
					let nextToken:Token;
					let value:string;

					// Add nothing

					// nextToken an Identifier
					identifier = new NewLineSymbol( "value" );
					nextToken = new Identifier( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value" );

					// nextToken a LeftSymbol
					identifier = new NewLineSymbol( "value" );
					nextToken = new LeftSymbol( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value" );

					// nextToken a NewLineSymbol
					identifier = new NewLineSymbol( "value" );
					nextToken = new NewLineSymbol( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value" );

					// nextToken a NumberLiteral
					identifier = new NewLineSymbol( "value" );
					nextToken = new NumberLiteral( 1 );
					value = identifier.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value" );

					// nextToken an Operator
					identifier = new NewLineSymbol( "value" );
					nextToken = new Operator( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value" );

					// nextToken a RightSymbol
					identifier = new NewLineSymbol( "value" );
					nextToken = new RightSymbol( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value" );

					// nextToken a StringLiteral
					identifier = new NewLineSymbol( "value" );
					nextToken = new StringLiteral( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value" );
				} );

			} );

		} );

	} );

} );
