import * as RightSymbolModule from "./RightSymbol";
import RightSymbol from "./RightSymbol";

import { Identifier } from "./Identifier";
import {
	Token,
	TokenFormat,
} from "./Token";
import { LeftSymbol } from "./LeftSymbol";
import { NewLineSymbol } from "./NewLineSymbol";
import { NumberLiteral } from "./NumberLiteral";
import { StringLiteral } from "./StringLiteral";
import { Operator } from "./Operator";

describe( "Module Tokens/RightSymbol", ():void => {

	it( "Exists", ():void => {
		expect( RightSymbolModule ).toBeDefined();
		expect( RightSymbolModule ).toEqual( jasmine.any( Object ) );
	} );

	describe( "Class RightSymbol", ():void => {

		it( "Exists", ():void => {
			expect( RightSymbol ).toBeDefined();
			expect( RightSymbol ).toEqual( jasmine.any( Function ) );
			expect( RightSymbol ).toBe( RightSymbolModule.RightSymbol );
		} );

		it( "Constructor", ():void => {
			let rightSymbol:RightSymbol = new RightSymbol( "something" );

			expect( rightSymbol ).toBeDefined();
			expect( rightSymbol ).toEqual( jasmine.any( RightSymbol ) );
			expect( rightSymbol ).toEqual( jasmine.any( Token ) );
		} );

		describe( "RightSymbol.getTokenValue()", ():void => {

			it( "Without nextToken always add space", ():void => {
				let rightSymbol:RightSymbol;
				let value:string;

				// Compact format
				rightSymbol = new RightSymbol( "value" );
				value = rightSymbol.getTokenValue( TokenFormat.COMPACT );
				expect( value ).toBe( "value" );

				rightSymbol = new RightSymbol( "value-2" );
				value = rightSymbol.getTokenValue( TokenFormat.COMPACT );
				expect( value ).toBe( "value-2" );

				// Pretty format
				rightSymbol = new RightSymbol( "value" );
				value = rightSymbol.getTokenValue( TokenFormat.PRETTY );
				expect( value ).toBe( "value" );

				rightSymbol = new RightSymbol( "value-2" );
				value = rightSymbol.getTokenValue( TokenFormat.PRETTY );
				expect( value ).toBe( "value-2" );
			} );

			describe( "With PRETTY format", ():void => {

				it( "Add a new line when next is an Identifier, but not an 'UNDEF' Identifier", ():void => {
					let rightSymbol:RightSymbol;
					let nextToken:Token;
					let value:string;


					// Add new line

					// nextToken an Identifier
					rightSymbol = new RightSymbol( "value" );
					nextToken = new Identifier( "nextToken" );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value\n" );


					// Not add new line

					// nextToken an 'UNDEF' Identifier
					rightSymbol = new RightSymbol( "value" );
					nextToken = new Identifier( "UNDEF" );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value\n" );

					// nextToken a LeftSymbol
					rightSymbol = new RightSymbol( "value" );
					nextToken = new LeftSymbol( "nextToken" );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value\n" );

					// nextToken a NewLineSymbol
					rightSymbol = new RightSymbol( "value" );
					nextToken = new NewLineSymbol( "nextToken" );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value\n" );

					// nextToken a NumberLiteral
					rightSymbol = new RightSymbol( "value" );
					nextToken = new NumberLiteral( 1 );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value\n" );

					// nextToken an Operator
					rightSymbol = new RightSymbol( "value" );
					nextToken = new Operator( "nextToken" );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value\n" );

					// nextToken a RightSymbol
					rightSymbol = new RightSymbol( "value" );
					nextToken = new RightSymbol( "nextToken" );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value\n" );

					// nextToken a StringLiteral
					rightSymbol = new RightSymbol( "value" );
					nextToken = new StringLiteral( "nextToken" );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value\n" );
				} );

				it( "Add new line when next is a close multiple symbol (NewLineSymbol with the value: '}', ']', or ')')", ():void => {
					let rightSymbol:RightSymbol;
					let nextToken:Token;
					let value:string;

					// nextToken an Identifier, tested in previous test


					// Add new line

					// nextToken a multiple line block symbol
					rightSymbol = new RightSymbol( "value" );
					nextToken = new NewLineSymbol( "}" );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value\n" );

					// nextToken a multiple line blank node symbol
					rightSymbol = new RightSymbol( "value" );
					nextToken = new NewLineSymbol( "]" );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value\n" );

					// nextToken a multiple line collection symbol
					rightSymbol = new RightSymbol( "value" );
					nextToken = new NewLineSymbol( ")" );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value\n" );

					// Not add new line


					// nextToken a LeftSymbol
					rightSymbol = new RightSymbol( "value" );
					nextToken = new LeftSymbol( "nextToken" );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value\n" );

					// nextToken a NewLineSymbol
					rightSymbol = new RightSymbol( "value" );
					nextToken = new NewLineSymbol( "nextToken" );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value\n" );

					// nextToken a NumberLiteral
					rightSymbol = new RightSymbol( "value" );
					nextToken = new NumberLiteral( 1 );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value\n" );

					// nextToken an Operator
					rightSymbol = new RightSymbol( "value" );
					nextToken = new Operator( "nextToken" );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value\n" );

					// nextToken a RightSymbol
					rightSymbol = new RightSymbol( "value" );
					nextToken = new RightSymbol( "nextToken" );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value\n" );

					// nextToken a StringLiteral
					rightSymbol = new RightSymbol( "value" );
					nextToken = new StringLiteral( "nextToken" );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value\n" );
				} );

				it( "Add a new line when next is a LeftSymbol that open a single collection: '('", ():void => {
					let rightSymbol:RightSymbol;
					let nextToken:Token;
					let value:string;

					// nextToken an Identifier, tested in previous test


					// Add new line

					// nextToken a LeftSymbol
					rightSymbol = new RightSymbol( "value" );
					nextToken = new LeftSymbol( "(" );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value\n" );


					// Add nothing

					// nextToken a LeftSymbol
					rightSymbol = new RightSymbol( "value" );
					nextToken = new LeftSymbol( "nextToken" );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value\n" );

					// nextToken a NewLineSymbol
					rightSymbol = new RightSymbol( "value" );
					nextToken = new NewLineSymbol( "nextToken" );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value\n" );

					// nextToken a NumberLiteral
					rightSymbol = new RightSymbol( "value" );
					nextToken = new NumberLiteral( 1 );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value\n" );

					// nextToken an Operator
					rightSymbol = new RightSymbol( "value" );
					nextToken = new Operator( "nextToken" );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value\n" );

					// nextToken a RightSymbol
					rightSymbol = new RightSymbol( "value" );
					nextToken = new RightSymbol( "nextToken" );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value\n" );

					// nextToken a StringLiteral
					rightSymbol = new RightSymbol( "value" );
					nextToken = new StringLiteral( "nextToken" );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value\n" );
				} );

				it( "Add nothing when next is a Operator", ():void => {
					let rightSymbol:RightSymbol;
					let nextToken:Token;
					let value:string;


					// Add nothing

					// nextToken an Operator
					rightSymbol = new RightSymbol( "value" );
					nextToken = new Operator( "nextToken" );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value" );


					// Not add nothing

					// nextToken an Identifier
					rightSymbol = new RightSymbol( "value" );
					nextToken = new Identifier( "nextToken" );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value" );

					// nextToken a LeftSymbol
					rightSymbol = new RightSymbol( "value" );
					nextToken = new LeftSymbol( "nextToken" );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value" );

					// nextToken a NewLineSymbol
					rightSymbol = new RightSymbol( "value" );
					nextToken = new NewLineSymbol( "nextToken" );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value" );

					// nextToken a NumberLiteral
					rightSymbol = new RightSymbol( "value" );
					nextToken = new NumberLiteral( 1 );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value" );

					// nextToken a RightSymbol
					rightSymbol = new RightSymbol( "value" );
					nextToken = new RightSymbol( "nextToken" );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value" );

					// nextToken a StringLiteral
					rightSymbol = new RightSymbol( "value" );
					nextToken = new StringLiteral( "nextToken" );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value" );
				} );

				it( "Add a space for the rest of the tokens", ():void => {
					let rightSymbol:RightSymbol;
					let nextToken:Token;
					let value:string;


					// Add space

					// nextToken a LeftSymbol
					rightSymbol = new RightSymbol( "value" );
					nextToken = new LeftSymbol( "nextToken" );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value " );

					// nextToken a NewLineSymbol
					rightSymbol = new RightSymbol( "value" );
					nextToken = new NewLineSymbol( "nextToken" );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value " );

					// nextToken a NumberLiteral
					rightSymbol = new RightSymbol( "value" );
					nextToken = new NumberLiteral( 1 );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value " );

					// nextToken a RightSymbol
					rightSymbol = new RightSymbol( "value" );
					nextToken = new RightSymbol( "nextToken" );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value " );

					// nextToken a StringLiteral
					rightSymbol = new RightSymbol( "value" );
					nextToken = new StringLiteral( "nextToken" );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value " );


					// Not add space

					// nextToken an Identifier
					rightSymbol = new RightSymbol( "value" );
					nextToken = new Identifier( "nextToken" );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value " );

					// nextToken an Operator
					rightSymbol = new RightSymbol( "value" );
					nextToken = new Operator( "nextToken" );
					value = rightSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value " );
				} );

			} );

			describe( "With COMPACT format", ():void => {

				it( "Always add nothing", ():void => {
					let rightSymbol:RightSymbol;
					let nextToken:Token;
					let value:string;


					// Add nothing

					// nextToken an Identifier
					rightSymbol = new RightSymbol( "value" );
					nextToken = new Identifier( "nextToken" );
					value = rightSymbol.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value" );

					// nextToken a LeftSymbol
					rightSymbol = new RightSymbol( "value" );
					nextToken = new LeftSymbol( "nextToken" );
					value = rightSymbol.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value" );

					// nextToken a NewLineSymbol
					rightSymbol = new RightSymbol( "value" );
					nextToken = new NewLineSymbol( "nextToken" );
					value = rightSymbol.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value" );

					// nextToken a NumberLiteral
					rightSymbol = new RightSymbol( "value" );
					nextToken = new NumberLiteral( 1 );
					value = rightSymbol.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value" );

					// nextToken an Operator
					rightSymbol = new RightSymbol( "value" );
					nextToken = new Operator( "nextToken" );
					value = rightSymbol.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value" );

					// nextToken a RightSymbol
					rightSymbol = new RightSymbol( "value" );
					nextToken = new RightSymbol( "nextToken" );
					value = rightSymbol.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value" );

					// nextToken a StringLiteral
					rightSymbol = new RightSymbol( "value" );
					nextToken = new StringLiteral( "nextToken" );
					value = rightSymbol.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value" );
				} );

			} );

		} );

	} );

} );
