import * as NumberLiteralModule from "./NumberLiteral";
import NumberLiteral from "./NumberLiteral";

import { Identifier } from "./Identifier";
import {
	Token,
	TokenFormat,
} from "./Token";
import { LeftSymbol } from "./LeftSymbol";
import { NewLineSymbol } from "./NewLineSymbol";
import { Operator } from "./Operator";
import { StringLiteral } from "./StringLiteral";
import { RightSymbol } from "./RightSymbol";

describe( "Module Tokens/NumberLiteral", ():void => {

	it( "Exists", ():void => {
		expect( NumberLiteralModule ).toBeDefined();
		expect( NumberLiteralModule ).toEqual( jasmine.any( Object ) );
	} );

	describe( "Class NumberLiteral", ():void => {

		it( "Exists", ():void => {
			expect( NumberLiteral ).toBeDefined();
			expect( NumberLiteral ).toEqual( jasmine.any( Function ) );
			expect( NumberLiteral ).toBe( NumberLiteralModule.NumberLiteral );
		} );

		it( "Constructor", ():void => {
			let numberLiteral:NumberLiteral = new NumberLiteral( 1 );

			expect( numberLiteral ).toBeDefined();
			expect( numberLiteral ).toEqual( jasmine.any( NumberLiteral ) );
			expect( numberLiteral ).toEqual( jasmine.any( Token ) );
		} );

		describe( "NumberLiteral.getTokenValue()", ():void => {

			it( "Without nextToken always add space", ():void => {
				let numberLiteral:NumberLiteral;
				let value:string;

				// Compact format
				numberLiteral = new NumberLiteral( 1 );
				value = numberLiteral.getTokenValue( TokenFormat.COMPACT );
				expect( value ).toBe( "1 " );

				numberLiteral = new NumberLiteral( 2 );
				value = numberLiteral.getTokenValue( TokenFormat.COMPACT );
				expect( value ).toBe( "2 " );

				// Pretty format
				numberLiteral = new NumberLiteral( 1 );
				value = numberLiteral.getTokenValue( TokenFormat.PRETTY );
				expect( value ).toBe( "1 " );

				numberLiteral = new NumberLiteral( 2 );
				value = numberLiteral.getTokenValue( TokenFormat.PRETTY );
				expect( value ).toBe( "2 " );
			} );

			describe( "With PRETTY format", ():void => {

				it( "Add new line when next is a NumberLiteral", ():void => {
					let numberLiteral:NumberLiteral;
					let nextToken:Token;
					let value:string;


					// Add new line

					// nextToken an Identifier
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new Identifier( "nextToken" );
					value = numberLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "1\n" );


					// Not add new line

					// nextToken an LeftSymbol
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new LeftSymbol( "nextToken" );
					value = numberLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "1\n" );

					// nextToken an NewLineSymbol
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new NewLineSymbol( "nextToken" );
					value = numberLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "1\n" );

					// nextToken an NumberLiteral
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new NumberLiteral( 1 );
					value = numberLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "1\n" );

					// nextToken an Operator
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new Operator( "nextToken" );
					value = numberLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "1\n" );

					// nextToken an RightSymbol
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new RightSymbol( "nextToken" );
					value = numberLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "1\n" );

					// nextToken an StringLiteral
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new StringLiteral( "nextToken" );
					value = numberLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "1\n" );
				} );

				it( "Add nothing when next is an Operator or RightSymbol", ():void => {
					let numberLiteral:NumberLiteral;
					let nextToken:Token;
					let value:string;


					// Add nothing

					// nextToken an Operator
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new Operator( "nextToken" );
					value = numberLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "1" );

					// nextToken an RightSymbol
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new RightSymbol( "nextToken" );
					value = numberLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "1" );

					// Not add nothing

					// nextToken an Identifier
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new Identifier( "nextToken" );
					value = numberLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "1" );

					// nextToken an LeftSymbol
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new LeftSymbol( "nextToken" );
					value = numberLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "1" );

					// nextToken an NewLineSymbol
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new NewLineSymbol( "nextToken" );
					value = numberLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "1" );

					// nextToken an NumberLiteral
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new NumberLiteral( 1 );
					value = numberLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "1" );

					// nextToken an StringLiteral
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new StringLiteral( "nextToken" );
					value = numberLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "1" );
				} );

				it( "Add a space to the rest of the tokens", ():void => {
					let numberLiteral:NumberLiteral;
					let nextToken:Token;
					let value:string;


					// Add space

					// nextToken an LeftSymbol
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new LeftSymbol( "nextToken" );
					value = numberLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "1 " );

					// nextToken an NewLineSymbol
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new NewLineSymbol( "nextToken" );
					value = numberLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "1 " );

					// nextToken an NumberLiteral
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new NumberLiteral( 1 );
					value = numberLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "1 " );

					// nextToken an StringLiteral
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new StringLiteral( "nextToken" );
					value = numberLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "1 " );


					// Not add space

					// nextToken an Identifier
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new Identifier( "nextToken" );
					value = numberLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "1 " );

					// nextToken an Operator
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new Operator( "nextToken" );
					value = numberLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "1 " );

					// nextToken an RightSymbol
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new RightSymbol( "nextToken" );
					value = numberLiteral.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "1 " );
				} );

			} );

			describe( "With COMPACT format", ():void => {

				it( "Add space when next is a NumberLiteral", ():void => {
					let numberLiteral:NumberLiteral;
					let nextToken:Token;
					let value:string;


					// Add space

					// nextToken an NumberLiteral
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new NumberLiteral( 1 );
					value = numberLiteral.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "1 " );


					// Not add space

					// nextToken an Identifier
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new Identifier( "nextToken" );
					value = numberLiteral.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).not.toBe( "1 " );

					// nextToken an LeftSymbol
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new LeftSymbol( "nextToken" );
					value = numberLiteral.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).not.toBe( "1 " );

					// nextToken an NewLineSymbol
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new NewLineSymbol( "nextToken" );
					value = numberLiteral.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).not.toBe( "1 " );

					// nextToken an Operator
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new Operator( "nextToken" );
					value = numberLiteral.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).not.toBe( "1 " );

					// nextToken an RightSymbol
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new RightSymbol( "nextToken" );
					value = numberLiteral.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).not.toBe( "1 " );

					// nextToken an StringLiteral
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new StringLiteral( "nextToken" );
					value = numberLiteral.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).not.toBe( "1 " );
				} );

				it( "Add nothing to the rest of the tokens", ():void => {
					let numberLiteral:NumberLiteral;
					let nextToken:Token;
					let value:string;


					// Add nothing

					// nextToken an Identifier
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new Identifier( "nextToken" );
					value = numberLiteral.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "1" );

					// nextToken an LeftSymbol
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new LeftSymbol( "nextToken" );
					value = numberLiteral.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "1" );

					// nextToken an NewLineSymbol
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new NewLineSymbol( "nextToken" );
					value = numberLiteral.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "1" );

					// nextToken an Operator
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new Operator( "nextToken" );
					value = numberLiteral.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "1" );

					// nextToken an RightSymbol
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new RightSymbol( "nextToken" );
					value = numberLiteral.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "1" );

					// nextToken an StringLiteral
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new StringLiteral( "nextToken" );
					value = numberLiteral.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "1" );


					// Not add nothing

					// nextToken an NumberLiteral
					numberLiteral = new NumberLiteral( 1 );
					nextToken = new NumberLiteral( 1 );
					value = numberLiteral.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).not.toBe( "1" );
				} );

			} );

		} );

	} );

} );
