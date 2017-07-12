import * as LeftSymbolModule from "./LeftSymbol";
import LeftSymbol from "./LeftSymbol";

import { Identifier } from "./Identifier";
import {
	Token,
	TokenFormat,
} from "./Token";
import { RightSymbol } from "./RightSymbol";
import { NewLineSymbol } from "./NewLineSymbol";
import { NumberLiteral } from "./NumberLiteral";
import { Operator } from "./Operator";
import { StringLiteral } from "./StringLiteral";

describe( "Module Tokens/LeftSymbol", ():void => {

	it( "Exists", ():void => {
		expect( LeftSymbolModule ).toBeDefined();
		expect( LeftSymbolModule ).toEqual( jasmine.any( Object ) );
	} );

	describe( "Class LeftSymbol", ():void => {

		it( "Exists", ():void => {
			expect( LeftSymbol ).toBeDefined();
			expect( LeftSymbol ).toEqual( jasmine.any( Function ) );
			expect( LeftSymbol ).toBe( LeftSymbolModule.LeftSymbol );
		} );

		it( "Constructor", ():void => {
			let leftSymbol:LeftSymbol = new LeftSymbol( "something" );

			expect( leftSymbol ).toBeDefined();
			expect( leftSymbol ).toEqual( jasmine.any( LeftSymbol ) );
			expect( leftSymbol ).toEqual( jasmine.any( Token ) );
		} );

		describe( "LeftSymbol.getTokenValue()", ():void => {

			it( "should add nothing if next token is undefined", ():void => {
				let leftSymbol:LeftSymbol;
				let value:string;

				// Compact format
				leftSymbol = new LeftSymbol( "value" );
				value = leftSymbol.getTokenValue( TokenFormat.COMPACT );
				expect( value ).toBe( "value" );

				leftSymbol = new LeftSymbol( "value-2" );
				value = leftSymbol.getTokenValue( TokenFormat.COMPACT );
				expect( value ).toBe( "value-2" );

				// Pretty format
				leftSymbol = new LeftSymbol( "value" );
				value = leftSymbol.getTokenValue( TokenFormat.PRETTY );
				expect( value ).toBe( "value" );

				leftSymbol = new LeftSymbol( "value-2" );
				value = leftSymbol.getTokenValue( TokenFormat.PRETTY );
				expect( value ).toBe( "value-2" );
			} );

			describe( "With PRETTY format", ():void => {

				it( "Add a space when next is an Identifier or an LeftSymbol", ():void => {
					let leftSymbol:LeftSymbol;
					let nextToken:Token;
					let value:string;


					// Add space

					// nextToken an Identifier
					leftSymbol = new LeftSymbol( "value" );
					nextToken = new Identifier( "nextToken" );
					value = leftSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value " );

					// nextToken a LeftSymbol
					leftSymbol = new LeftSymbol( "value" );
					nextToken = new LeftSymbol( "nextToken" );
					value = leftSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value " );


					// Not add an space

					// nextToken a NewLineSymbol
					leftSymbol = new LeftSymbol( "value" );
					nextToken = new NewLineSymbol( "nextToken" );
					value = leftSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value " );

					// nextToken a NumberLiteral
					leftSymbol = new LeftSymbol( "value" );
					nextToken = new NumberLiteral( 1 );
					value = leftSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value " );

					// nextToken an Operator
					leftSymbol = new LeftSymbol( "value" );
					nextToken = new Operator( "nextToken" );
					value = leftSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value " );

					// nextToken a RightSymbol
					leftSymbol = new LeftSymbol( "value" );
					nextToken = new RightSymbol( "nextToken" );
					value = leftSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value " );

					// nextToken a StringLiteral
					leftSymbol = new LeftSymbol( "value" );
					nextToken = new StringLiteral( "nextToken" );
					value = leftSymbol.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value " );
				} );

				it( "Add nothing to the rest of the tokens", ():void => {
					let identifier:LeftSymbol;
					let nextToken:Token;
					let value:string;


					// Add nothing

					// nextToken a NewLineSymbol
					identifier = new LeftSymbol( "value" );
					nextToken = new NewLineSymbol( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value" );

					// nextToken a NumberLiteral
					identifier = new LeftSymbol( "value" );
					nextToken = new NumberLiteral( 1 );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value" );

					// nextToken an Operator
					identifier = new LeftSymbol( "value" );
					nextToken = new Operator( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value" );

					// nextToken a RightSymbol
					identifier = new LeftSymbol( "value" );
					nextToken = new RightSymbol( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value" );

					// nextToken a StringLiteral
					identifier = new LeftSymbol( "value" );
					nextToken = new StringLiteral( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value" );


					// Not add nothing

					// nextToken an Identifier
					identifier = new LeftSymbol( "value" );
					nextToken = new Identifier( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value" );

					// nextToken a LeftSymbol
					identifier = new LeftSymbol( "value" );
					nextToken = new LeftSymbol( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).not.toBe( "value" );
				} );

			} );

			describe( "With COMPACT format", ():void => {

				it( "Always add nothing", ():void => {
					let identifier:LeftSymbol;
					let nextToken:Token;
					let value:string;

					// Add nothing

					// nextToken an Identifier
					identifier = new LeftSymbol( "value" );
					nextToken = new Identifier( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value" );

					// nextToken a LeftSymbol
					identifier = new LeftSymbol( "value" );
					nextToken = new LeftSymbol( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value" );

					// nextToken a NewLineSymbol
					identifier = new LeftSymbol( "value" );
					nextToken = new NewLineSymbol( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value" );

					// nextToken a NumberLiteral
					identifier = new LeftSymbol( "value" );
					nextToken = new NumberLiteral( 1 );
					value = identifier.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value" );

					// nextToken an Operator
					identifier = new LeftSymbol( "value" );
					nextToken = new Operator( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value" );

					// nextToken a RightSymbol
					identifier = new LeftSymbol( "value" );
					nextToken = new RightSymbol( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value" );

					// nextToken a StringLiteral
					identifier = new LeftSymbol( "value" );
					nextToken = new StringLiteral( "nextToken" );
					value = identifier.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value" );
				} );

			} );

		} );

	} );

} );
