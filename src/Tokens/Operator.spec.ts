import * as OperatorModule from "./Operator";
import Operator from "./Operator";

import { Identifier } from "./Identifier";
import {
	Token,
	TokenFormat,
} from "./Token";
import { LeftSymbol } from "./LeftSymbol";
import { NewLineSymbol } from "./NewLineSymbol";
import { NumberLiteral } from "./NumberLiteral";
import { StringLiteral } from "./StringLiteral";
import { RightSymbol } from "./RightSymbol";

fdescribe( "Module Tokens/Operator", ():void => {

	it( "Exists", ():void => {
		expect( OperatorModule ).toBeDefined();
		expect( OperatorModule ).toEqual( jasmine.any( Object ) );
	} );

	describe( "Class Operator", ():void => {

		it( "Exists", ():void => {
			expect( Operator ).toBeDefined();
			expect( Operator ).toEqual( jasmine.any( Function ) );
			expect( Operator ).toBe( OperatorModule.Operator );
		} );

		it( "Constructor", ():void => {
			let operator:Operator = new Operator( "something" );

			expect( operator ).toBeDefined();
			expect( operator ).toEqual( jasmine.any( Operator ) );
			expect( operator ).toEqual( jasmine.any( Token ) );
		} );

		describe( "Operator.getTokenValue()", ():void => {

			it( "Without nextToken always add space", ():void => {
				let newLineSymbol:Operator;
				let value:string;

				// Compact format
				newLineSymbol = new Operator( "value" );
				value = newLineSymbol.getTokenValue( TokenFormat.COMPACT );
				expect( value ).toBe( "value " );

				newLineSymbol = new Operator( "value-2" );
				value = newLineSymbol.getTokenValue( TokenFormat.COMPACT );
				expect( value ).toBe( "value-2 " );

				// Pretty format
				newLineSymbol = new Operator( "value" );
				value = newLineSymbol.getTokenValue( TokenFormat.PRETTY );
				expect( value ).toBe( "value " );

				newLineSymbol = new Operator( "value-2" );
				value = newLineSymbol.getTokenValue( TokenFormat.PRETTY );
				expect( value ).toBe( "value-2 " );
			} );

			describe( "With PRETTY format", ():void => {

				it( "Always add nothing", ():void => {
					let operator:Operator;
					let nextToken:Token;
					let value:string;


					// Add nothing

					// nextToken an Identifier
					operator = new Operator( "value" );
					nextToken = new Identifier( "nextToken" );
					value = operator.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value" );

					// nextToken an LeftSymbol
					operator = new Operator( "value" );
					nextToken = new LeftSymbol( "nextToken" );
					value = operator.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value" );

					// nextToken an NewLineSymbol
					operator = new Operator( "value" );
					nextToken = new NewLineSymbol( "nextToken" );
					value = operator.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value" );

					// nextToken an NumberLiteral
					operator = new Operator( "value" );
					nextToken = new NumberLiteral( 1 );
					value = operator.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value" );

					// nextToken an Operator
					operator = new Operator( "value" );
					nextToken = new Operator( "nextToken" );
					value = operator.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value" );

					// nextToken an RightSymbol
					operator = new Operator( "value" );
					nextToken = new RightSymbol( "nextToken" );
					value = operator.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value" );

					// nextToken an StringLiteral
					operator = new Operator( "value" );
					nextToken = new StringLiteral( "nextToken" );
					value = operator.getTokenValue( TokenFormat.PRETTY, nextToken );
					expect( value ).toBe( "value" );
				} );

			} );

			describe( "With COMPACT format", ():void => {

				it( "Always add nothing", ():void => {
					let operator:Operator;
					let nextToken:Token;
					let value:string;


					// Add nothing

					// nextToken an Identifier
					operator = new Operator( "value" );
					nextToken = new Identifier( "nextToken" );
					value = operator.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value" );

					// nextToken an LeftSymbol
					operator = new Operator( "value" );
					nextToken = new LeftSymbol( "nextToken" );
					value = operator.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value" );

					// nextToken an NewLineSymbol
					operator = new Operator( "value" );
					nextToken = new NewLineSymbol( "nextToken" );
					value = operator.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value" );

					// nextToken an NumberLiteral
					operator = new Operator( "value" );
					nextToken = new NumberLiteral( 1 );
					value = operator.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value" );

					// nextToken an Operator
					operator = new Operator( "value" );
					nextToken = new Operator( "nextToken" );
					value = operator.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value" );

					// nextToken an RightSymbol
					operator = new Operator( "value" );
					nextToken = new RightSymbol( "nextToken" );
					value = operator.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value" );

					// nextToken an StringLiteral
					operator = new Operator( "value" );
					nextToken = new StringLiteral( "nextToken" );
					value = operator.getTokenValue( TokenFormat.COMPACT, nextToken );
					expect( value ).toBe( "value" );
				} );

			} );

		} );

	} );

} );
