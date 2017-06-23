import * as StringLiteralModule from "./StringLiteral";
import StringLiteral from "./StringLiteral";

import { Identifier } from "./Identifier";
import {
	Token,
	TokenFormat,
} from "./Token";
import { LeftSymbol } from "./LeftSymbol";
import { NewLineSymbol } from "./NewLineSymbol";
import { NumberLiteral } from "./NumberLiteral";
import { Operator } from "./Operator";
import { RightSymbol } from "./RightSymbol";

describe( "Module Tokens/StringLiteral", ():void => {

	it( "Exists", ():void => {
		expect( StringLiteralModule ).toBeDefined();
		expect( StringLiteralModule ).toEqual( jasmine.any( Object ) );
	} );

	describe( "Class StringLiteral", ():void => {

		it( "Exists", ():void => {
			expect( StringLiteral ).toBeDefined();
			expect( StringLiteral ).toEqual( jasmine.any( Function ) );
			expect( StringLiteral ).toBe( StringLiteralModule.StringLiteral );
		} );

		it( "Constructor", ():void => {
			let stringLiteral:StringLiteral = new StringLiteral( "something" );

			expect( stringLiteral ).toBeDefined();
			expect( stringLiteral ).toEqual( jasmine.any( StringLiteral ) );
			expect( stringLiteral ).toEqual( jasmine.any( Token ) );
		} );

		describe( "StringLiteral.getTokenValue()", ():void => {

			it( "Without nextToken always add space", ():void => {
				let stringLiteral:StringLiteral;
				let value:string;

				// Compact format
				stringLiteral = new StringLiteral( "value" );
				value = stringLiteral.getTokenValue( TokenFormat.COMPACT );
				expect( value ).toBe( "value " );

				stringLiteral = new StringLiteral( "value-2" );
				value = stringLiteral.getTokenValue( TokenFormat.COMPACT );
				expect( value ).toBe( "value-2 " );

				// Pretty format
				stringLiteral = new StringLiteral( "value" );
				value = stringLiteral.getTokenValue( TokenFormat.PRETTY );
				expect( value ).toBe( "value " );

				stringLiteral = new StringLiteral( "value-2" );
				value = stringLiteral.getTokenValue( TokenFormat.PRETTY );
				expect( value ).toBe( "value-2 " );
			} );

			describe( "With PRETTY format", ():void => {

				it( "Add new line when next is a Identifier", ():void => {
					let stringLiteral:StringLiteral;
					let nextToken:Token;
					let value:string;


					// Add new line

					// nextToken an Identifier
					stringLiteral = new StringLiteral( "value" );
					nextToken = new Identifier( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value\n" );


					// Not add new line

					// nextToken a LeftSymbol
					stringLiteral = new StringLiteral( "value" );
					nextToken = new LeftSymbol( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value\n" );

					// nextToken a NewLineSymbol
					stringLiteral = new StringLiteral( "value" );
					nextToken = new NewLineSymbol( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value\n" );

					// nextToken a NumberLiteral
					stringLiteral = new StringLiteral( "value" );
					nextToken = new NumberLiteral( 1 );
					value = stringLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value\n" );

					// nextToken an Operator
					stringLiteral = new StringLiteral( "value" );
					nextToken = new Operator( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value\n" );

					// nextToken a RightSymbol
					stringLiteral = new StringLiteral( "value" );
					nextToken = new RightSymbol( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value\n" );

					// nextToken a StringLiteral
					stringLiteral = new StringLiteral( "value" );
					nextToken = new StringLiteral( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value\n" );
				} );

				it( "Add a new line when next is a close multi line collection (NewLineSymbol with value: ')')", ():void => {
					let stringLiteral:StringLiteral;
					let nextToken:Token;
					let value:string;


					// Add new line

					// nextToken a NewLineSymbol
					stringLiteral = new StringLiteral( "value" );
					nextToken = new NewLineSymbol( ")" );
					value = stringLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value\n" );


					// nextToken an Identifier, tested the previous test


					// Not add new line

					// nextToken a LeftSymbol
					stringLiteral = new StringLiteral( "value" );
					nextToken = new LeftSymbol( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value\n" );

					// nextToken a NewLineSymbol
					stringLiteral = new StringLiteral( "value" );
					nextToken = new NewLineSymbol( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value\n" );

					// nextToken a NumberLiteral
					stringLiteral = new StringLiteral( "value" );
					nextToken = new NumberLiteral( 1 );
					value = stringLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value\n" );

					// nextToken an Operator
					stringLiteral = new StringLiteral( "value" );
					nextToken = new Operator( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value\n" );

					// nextToken a RightSymbol
					stringLiteral = new StringLiteral( "value" );
					nextToken = new RightSymbol( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value\n" );

					// nextToken a StringLiteral
					stringLiteral = new StringLiteral( "value" );
					nextToken = new StringLiteral( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value\n" );
				} );

				it( "Add nothing when next is an Operator", ():void => {
					let stringLiteral:StringLiteral;
					let nextToken:Token;
					let value:string;


					// Add nothing

					// nextToken an Operator
					stringLiteral = new StringLiteral( "value" );
					nextToken = new Operator( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value" );


					// Not add nothing

					// nextToken an Identifier
					stringLiteral = new StringLiteral( "value" );
					nextToken = new Identifier( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value" );

					// nextToken a LeftSymbol
					stringLiteral = new StringLiteral( "value" );
					nextToken = new LeftSymbol( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value" );

					// nextToken a NewLineSymbol
					stringLiteral = new StringLiteral( "value" );
					nextToken = new NewLineSymbol( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value" );

					// nextToken a NumberLiteral
					stringLiteral = new StringLiteral( "value" );
					nextToken = new NumberLiteral( 1 );
					value = stringLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value" );

					// nextToken a RightSymbol, tested in the next test

					// nextToken a StringLiteral
					stringLiteral = new StringLiteral( "value" );
					nextToken = new StringLiteral( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value" );
				} );

				it( "Add nothing when next is a RightSymbol but not a close single collection symbol (RightSymbol with value: ')')", ():void => {
					let stringLiteral:StringLiteral;
					let nextToken:Token;
					let value:string;


					// Add nothing

					// nextToken a RightSymbol
					stringLiteral = new StringLiteral( "value" );
					nextToken = new RightSymbol( "nextValue" );
					value = stringLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value" );


					// nextToken an Operator, tested in the previous test


					// Not add nothing

					// nextToken a RightSymbol
					stringLiteral = new StringLiteral( "value" );
					nextToken = new RightSymbol( ")" );
					value = stringLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value" );

					// nextToken an Identifier
					stringLiteral = new StringLiteral( "value" );
					nextToken = new Identifier( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value" );

					// nextToken a LeftSymbol
					stringLiteral = new StringLiteral( "value" );
					nextToken = new LeftSymbol( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value" );

					// nextToken a NewLineSymbol
					stringLiteral = new StringLiteral( "value" );
					nextToken = new NewLineSymbol( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value" );

					// nextToken a NumberLiteral
					stringLiteral = new StringLiteral( "value" );
					nextToken = new NumberLiteral( 1 );
					value = stringLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value" );

					// nextToken a StringLiteral
					stringLiteral = new StringLiteral( "value" );
					nextToken = new StringLiteral( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value" );
				} );

				it( "Add a space for the rest of the tokens", ():void => {
					let stringLiteral:StringLiteral;
					let nextToken:Token;
					let value:string;


					// Add space

					// nextToken a LeftSymbol
					stringLiteral = new StringLiteral( "value" );
					nextToken = new LeftSymbol( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value " );

					// nextToken a NewLineSymbol
					stringLiteral = new StringLiteral( "value" );
					nextToken = new NewLineSymbol( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value " );

					// nextToken a NumberLiteral
					stringLiteral = new StringLiteral( "value" );
					nextToken = new NumberLiteral( 1 );
					value = stringLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value " );

					// nextToken a StringLiteral
					stringLiteral = new StringLiteral( "value" );
					nextToken = new StringLiteral( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value " );


					// Not add a space

					// nextToken an Identifier
					stringLiteral = new StringLiteral( "value" );
					nextToken = new Identifier( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value " );

					// nextToken an Operator
					stringLiteral = new StringLiteral( "value" );
					nextToken = new Operator( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value " );

					// nextToken a RightSymbol
					stringLiteral = new StringLiteral( "value" );
					nextToken = new RightSymbol( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value " );
				} );

			} );

			describe( "With COMPACT format", ():void => {

				it( "Add a space when next is an Identifier and a StringLiteral", ():void => {
					let stringLiteral:StringLiteral;
					let nextToken:Token;
					let value:string;


					// Add space

					// nextToken an Identifier
					stringLiteral = new StringLiteral( "value" );
					nextToken = new Identifier( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value " );

					// nextToken a StringLiteral
					stringLiteral = new StringLiteral( "value" );
					nextToken = new StringLiteral( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value " );


					// Not add space

					// nextToken a LeftSymbol
					stringLiteral = new StringLiteral( "value" );
					nextToken = new LeftSymbol( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).not.toBe( "value " );

					// nextToken a NewLineSymbol
					stringLiteral = new StringLiteral( "value" );
					nextToken = new NewLineSymbol( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).not.toBe( "value " );

					// nextToken a NumberLiteral
					stringLiteral = new StringLiteral( "value" );
					nextToken = new NumberLiteral( 1 );
					value = stringLiteral.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).not.toBe( "value " );

					// nextToken an Operator
					stringLiteral = new StringLiteral( "value" );
					nextToken = new Operator( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).not.toBe( "value " );

					// nextToken a RightSymbol
					stringLiteral = new StringLiteral( "value" );
					nextToken = new RightSymbol( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).not.toBe( "value " );
				} );

				it( "Add nothing to the rest of the tokens", ():void => {
					let stringLiteral:StringLiteral;
					let nextToken:Token;
					let value:string;


					// Add nothing

					// nextToken a LeftSymbol
					stringLiteral = new StringLiteral( "value" );
					nextToken = new LeftSymbol( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value" );

					// nextToken a NewLineSymbol
					stringLiteral = new StringLiteral( "value" );
					nextToken = new NewLineSymbol( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value" );

					// nextToken a NumberLiteral
					stringLiteral = new StringLiteral( "value" );
					nextToken = new NumberLiteral( 1 );
					value = stringLiteral.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value" );

					// nextToken an Operator
					stringLiteral = new StringLiteral( "value" );
					nextToken = new Operator( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value" );

					// nextToken a RightSymbol
					stringLiteral = new StringLiteral( "value" );
					nextToken = new RightSymbol( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value" );


					// Not add nothing

					// nextToken an Identifier
					stringLiteral = new StringLiteral( "value" );
					nextToken = new Identifier( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).not.toBe( "value" );

					// nextToken a StringLiteral
					stringLiteral = new StringLiteral( "value" );
					nextToken = new StringLiteral( "nextToken" );
					value = stringLiteral.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).not.toBe( "value" );
				} );

			} );

		} );

	} );

} );
