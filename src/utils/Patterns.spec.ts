import * as Patterns from "./Patterns";

import { Token } from "../tokens/Token";
import { NewLineSymbol } from "../tokens/NewLineSymbol";
import { GraphPattern } from "../patterns/interfaces";
import { Identifier } from "../tokens/Identifier";
import {
	OPEN_SINGLE_BLOCK,
	CLOSE_SINGLE_BLOCK,
	OPEN_MULTI_BLOCK,
	CLOSE_MULTI_BLOCK
} from "../patterns/tokens";

describe( "Module Patterns", ():void => {

	it( "Exists", ():void => {
		expect( Patterns ).toBeDefined();
		expect( Patterns ).toEqual( jasmine.any( Object ) );
	} );
	
	describe( "getBlockTokens()", ():void => {
	
		it( "Exists", ():void => {
			expect( Patterns.getBlockTokens ).toBeDefined();
			expect( Patterns.getBlockTokens ).toEqual( jasmine.any( Function ) );
		} );

		class MockToken extends Token {
			protected getPrettySeparator():string {
				return " ";
			}

			protected getCompactSeparator():string {
				return " ";
			}
		}
		
		it( "If single GraphPattern us multi-line, a multi-block is returned", ():void => {
			let spyIsMultiLine:jasmine.Spy = spyOn( Patterns, "isMultiLine" ).and.returnValue( true );
			let spyGetTokens:jasmine.Spy =  spyOn( Patterns, "getTokens" ).and.returnValues(
				[ new MockToken( "token-1" ), new MockToken( "token-2" ) ],
				[ new MockToken( "token-3" ), new MockToken( "token-4" ) ]
			);

			let pattern:GraphPattern;

			pattern = {
				getPattern: () => [ new MockToken( "ignored-token-1" ), new MockToken( "ignored-token-2" ) ],
			};
			expect( Patterns.getBlockTokens( pattern ) ).toEqual( [
				OPEN_MULTI_BLOCK,
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				CLOSE_MULTI_BLOCK,
			] );
			expect( spyGetTokens ).toHaveBeenCalledWith( pattern );
			expect( spyIsMultiLine ).toHaveBeenCalledWith( [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] );

			pattern = {
				getPattern: () => [ new MockToken( "ignored-token-3" ), new MockToken( "ignored-token-4" ) ],
			};
			expect( Patterns.getBlockTokens( pattern ) ).toEqual( [
				OPEN_MULTI_BLOCK,
				new MockToken( "token-3" ), new MockToken( "token-4" ),
				CLOSE_MULTI_BLOCK,
			] );
			expect( spyGetTokens ).toHaveBeenCalledWith( pattern );
			expect( spyIsMultiLine ).toHaveBeenCalledWith( [ new MockToken( "token-3" ), new MockToken( "token-4" ) ] );
		} );

		it( "If single GraphPattern us multi-line, a multi-block is returned", ():void => {
			let spyIsMultiLine:jasmine.Spy = spyOn( Patterns, "isMultiLine" ).and.returnValue( true );
			let spyGetTokens:jasmine.Spy =  spyOn( Patterns, "getTokens" ).and.returnValues(
				[ new MockToken( "token-1" ), new MockToken( "token-2" ) ],
				[ new MockToken( "token-3" ), new MockToken( "token-4" ) ]
			);

			let patterns:GraphPattern[];

			patterns = [ {
				getPattern: () => [ new MockToken( "ignored-token-1-1" ), new MockToken( "ignored-token-1-2" ) ],
			}, {
				getPattern: () => [ new MockToken( "ignored-token-1-4" ), new MockToken( "ignored-token-1-5" ) ],
			}, ];
			expect( Patterns.getBlockTokens( patterns ) ).toEqual( [
				OPEN_MULTI_BLOCK,
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				CLOSE_MULTI_BLOCK,
			] );
			expect( spyGetTokens ).toHaveBeenCalledWith( patterns );
			expect( spyIsMultiLine ).toHaveBeenCalledWith( [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] );

			patterns = [ {
				getPattern: () => [ new MockToken( "ignored-token-2-1" ), new MockToken( "ignored-token-2-2" ) ],
			}, {
				getPattern: () => [ new MockToken( "ignored-token-2-3" ), new MockToken( "ignored-token-2-4" ) ],
			}, {
				getPattern: () => [ new MockToken( "ignored-token-2-5" ), new MockToken( "ignored-token-2-6" ) ],
			}, ];
			expect( Patterns.getBlockTokens( patterns ) ).toEqual( [
				OPEN_MULTI_BLOCK,
				new MockToken( "token-3" ), new MockToken( "token-4" ),
				CLOSE_MULTI_BLOCK,
			] );
			expect( spyGetTokens ).toHaveBeenCalledWith( patterns );
			expect( spyIsMultiLine ).toHaveBeenCalledWith( [ new MockToken( "token-3" ), new MockToken( "token-4" ) ] );
		} );

		it( "If single GraphPattern us single-line, a single-block is returned", ():void => {
			let spyIsMultiLine:jasmine.Spy = spyOn( Patterns, "isMultiLine" ).and.returnValue( false );
			let spyGetTokens:jasmine.Spy =  spyOn( Patterns, "getTokens" ).and.returnValues(
				[ new MockToken( "token-1" ), new MockToken( "token-2" ) ],
				[ new MockToken( "token-3" ), new MockToken( "token-4" ) ]
			);

			let pattern:GraphPattern;

			pattern = {
				getPattern: () => [ new MockToken( "ignored-token-1" ), new MockToken( "ignored-token-2" ) ],
			};
			expect( Patterns.getBlockTokens( pattern ) ).toEqual( [
				OPEN_SINGLE_BLOCK,
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				CLOSE_SINGLE_BLOCK,
			] );
			expect( spyGetTokens ).toHaveBeenCalledWith( pattern );
			expect( spyIsMultiLine ).toHaveBeenCalledWith( [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] );

			pattern = {
				getPattern: () => [ new MockToken( "ignored-token-3" ), new MockToken( "ignored-token-4" ) ],
			};
			expect( Patterns.getBlockTokens( pattern ) ).toEqual( [
				OPEN_SINGLE_BLOCK,
				new MockToken( "token-3" ), new MockToken( "token-4" ),
				CLOSE_SINGLE_BLOCK,
			] );
			expect( spyGetTokens ).toHaveBeenCalledWith( pattern );
			expect( spyIsMultiLine ).toHaveBeenCalledWith( [ new MockToken( "token-3" ), new MockToken( "token-4" ) ] );
		} );

		it( "If single GraphPattern us single-line, a single-block is returned", ():void => {
			let spyIsMultiLine:jasmine.Spy = spyOn( Patterns, "isMultiLine" ).and.returnValue( false );
			let spyGetTokens:jasmine.Spy =  spyOn( Patterns, "getTokens" ).and.returnValues(
				[ new MockToken( "token-1" ), new MockToken( "token-2" ) ],
				[ new MockToken( "token-3" ), new MockToken( "token-4" ) ]
			);

			let patterns:GraphPattern[];

			patterns = [ {
				getPattern: () => [ new MockToken( "ignored-token-1-1" ), new MockToken( "ignored-token-1-2" ) ],
			}, {
				getPattern: () => [ new MockToken( "ignored-token-1-4" ), new MockToken( "ignored-token-1-5" ) ],
			}, ];
			expect( Patterns.getBlockTokens( patterns ) ).toEqual( [
				OPEN_SINGLE_BLOCK,
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				CLOSE_SINGLE_BLOCK,
			] );
			expect( spyGetTokens ).toHaveBeenCalledWith( patterns );
			expect( spyIsMultiLine ).toHaveBeenCalledWith( [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] );

			patterns = [ {
				getPattern: () => [ new MockToken( "ignored-token-2-1" ), new MockToken( "ignored-token-2-2" ) ],
			}, {
				getPattern: () => [ new MockToken( "ignored-token-2-3" ), new MockToken( "ignored-token-2-4" ) ],
			}, {
				getPattern: () => [ new MockToken( "ignored-token-2-5" ), new MockToken( "ignored-token-2-6" ) ],
			}, ];
			expect( Patterns.getBlockTokens( patterns ) ).toEqual( [
				OPEN_SINGLE_BLOCK,
				new MockToken( "token-3" ), new MockToken( "token-4" ),
				CLOSE_SINGLE_BLOCK,
			] );
			expect( spyGetTokens ).toHaveBeenCalledWith( patterns );
			expect( spyIsMultiLine ).toHaveBeenCalledWith( [ new MockToken( "token-3" ), new MockToken( "token-4" ) ] );
		} );
	
	} );

	describe( "getTokens()", ():void => {

		it( "Exists", ():void => {
			expect( Patterns.getTokens ).toBeDefined();
			expect( Patterns.getTokens ).toEqual( jasmine.any( Function ) );
		} );

		class MockToken extends Token {
			protected getPrettySeparator():string {
				return " ";
			}

			protected getCompactSeparator():string {
				return " ";
			}
		}

		it( "Obtains the pattern tokens of a simple GraphPattern", ():void => {
			let pattern:GraphPattern;
			let spyGetPattern:jasmine.Spy;

			pattern = {
				getPattern: () => [ new MockToken( "pattern-token-1" ), new MockToken( "pattern-token-2" ) ],
			};
			spyGetPattern = spyOn( pattern, "getPattern" ).and.callThrough();
			expect( Patterns.getTokens( pattern ) ).toEqual( [
				new MockToken( "pattern-token-1" ), new MockToken( "pattern-token-2" ),
			] );
			expect( spyGetPattern ).toHaveBeenCalledTimes( 1 );

			pattern = {
				getPattern: () => [ new MockToken( "pattern-token-1" ), new MockToken( "pattern-token-2" ), new MockToken( "pattern-token-3" ), new MockToken( "pattern-token-4" ) ],
			};
			spyGetPattern = spyOn( pattern, "getPattern" ).and.callThrough();
			expect( Patterns.getTokens( pattern ) ).toEqual( [
				new MockToken( "pattern-token-1" ), new MockToken( "pattern-token-2" ), new MockToken( "pattern-token-3" ), new MockToken( "pattern-token-4" ),
			] );
			expect( spyGetPattern ).toHaveBeenCalledTimes( 1 );
		} );

		it( "Obtains the pattern tokens of multiple GraphPattern, adding the graph separator between every GraphPattern", ():void => {
			let patterns:GraphPattern[];
			let spiesGetPattern:jasmine.Spy[];

			// Single GraphPattern in an array
			patterns = [
				{
					getPattern: () => [ new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ) ],
				},
			];
			spiesGetPattern = patterns.map( pattern => spyOn( pattern, "getPattern" ).and.callThrough() );
			expect( Patterns.getTokens( patterns ) ).toEqual( [
				new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ),
			] );
			spiesGetPattern.forEach( spy => {
				expect( spy ).toHaveBeenCalledTimes( 1 );
			} );

			// Multiple GraphPatterns, 1
			patterns = [
				{
					getPattern: () => [ new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ) ],
				},
				{
					getPattern: () => [ new MockToken( "pattern-2-token-1" ), new MockToken( "pattern-2-token-2" ), new MockToken( "pattern-2-token-3" ) ],
				},
			];
			spiesGetPattern = patterns.map( pattern => spyOn( pattern, "getPattern" ).and.callThrough() );
			expect( Patterns.getTokens( patterns ) ).toEqual( [
				new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ), new NewLineSymbol( "." ),
				new MockToken( "pattern-2-token-1" ), new MockToken( "pattern-2-token-2" ), new MockToken( "pattern-2-token-3" ),
			] );
			spiesGetPattern.forEach( spy => {
				expect( spy ).toHaveBeenCalledTimes( 1 );
			} );

			// Multiple GraphPatterns, 2
			patterns = [
				{
					getPattern: () => [ new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ) ],
				},
				{
					getPattern: () => [ new MockToken( "pattern-2-token-1" ), new MockToken( "pattern-2-token-2" ), new MockToken( "pattern-2-token-3" ) ],
				},
				{
					getPattern: () => [ new MockToken( "pattern-3-token-1" ) ],
				},
			];
			spiesGetPattern = patterns.map( pattern => spyOn( pattern, "getPattern" ).and.callThrough() );
			expect( Patterns.getTokens( patterns ) ).toEqual( [
				new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ), new NewLineSymbol( "." ),
				new MockToken( "pattern-2-token-1" ), new MockToken( "pattern-2-token-2" ), new MockToken( "pattern-2-token-3" ), new NewLineSymbol( "." ),
				new MockToken( "pattern-3-token-1" ),
			] );
			spiesGetPattern.forEach( spy => {
				expect( spy ).toHaveBeenCalledTimes( 1 );
			} );
		} );

		it( "If next GraphPattern begins with a Identifier, not graph pattern separator is added between", ():void => {
			let patterns:GraphPattern[];

			patterns = [
				{
					getPattern: () => [ new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ) ],
				},
				{
					getPattern: () => [ new Identifier( "a-identifier" ), new MockToken( "pattern-2-token-2" ), new MockToken( "pattern-2-token-3" ) ],
				},
			];
			expect( Patterns.getTokens( patterns ) ).toEqual( [
				new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ),
				new Identifier( "a-identifier" ), new MockToken( "pattern-2-token-2" ), new MockToken( "pattern-2-token-3" ),
			] );

			patterns = [
				{
					getPattern: () => [ new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ) ],
				},
				{
					getPattern: () => [ new Identifier( "a-identifier" ), new MockToken( "pattern-2-token-2" ), new MockToken( "pattern-2-token-3" ) ],
				},
				{
					getPattern: () => [ new MockToken( "pattern-3-token-1" ), new MockToken( "pattern-3-token-2" ), new MockToken( "pattern-3-token-3" ) ],
				},
			];
			expect( Patterns.getTokens( patterns ) ).toEqual( [
				new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ),
				new Identifier( "a-identifier" ), new MockToken( "pattern-2-token-2" ), new MockToken( "pattern-2-token-3" ), new NewLineSymbol( "." ),
				new MockToken( "pattern-3-token-1" ), new MockToken( "pattern-3-token-2" ), new MockToken( "pattern-3-token-3" ),
			] );

			patterns = [
				{
					getPattern: () => [ new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ) ],
				},
				{
					getPattern: () => [ new MockToken( "pattern-2-token-1" ), new MockToken( "pattern-2-token-2" ), new MockToken( "pattern-2-token-3" ) ],
				},
				{
					getPattern: () => [ new Identifier( "a-identifier" ), new MockToken( "pattern-3-token-2" ), new MockToken( "pattern-3-token-3" ) ],
				},
			];
			expect( Patterns.getTokens( patterns ) ).toEqual( [
				new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ), new NewLineSymbol( "." ),
				new MockToken( "pattern-2-token-1" ), new MockToken( "pattern-2-token-2" ), new MockToken( "pattern-2-token-3" ),
				new Identifier( "a-identifier" ), new MockToken( "pattern-3-token-2" ), new MockToken( "pattern-3-token-3" ),
			] );

			patterns = [
				{
					getPattern: () => [ new MockToken( "pattern-0-token-1" ), new MockToken( "pattern-0-token-2" ), new MockToken( "pattern-0-token-3" ) ],
				},
				{
					getPattern: () => [ new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ) ],
				},
				{
					getPattern: () => [ new MockToken( "pattern-2-token-1" ), new MockToken( "pattern-2-token-2" ), new MockToken( "pattern-2-token-3" ) ],
				},
				{
					getPattern: () => [ new Identifier( "a-identifier" ), new MockToken( "pattern-3-token-2" ), new MockToken( "pattern-3-token-3" ) ],
				},
			];
			expect( Patterns.getTokens( patterns ) ).toEqual( [
				new MockToken( "pattern-0-token-1" ), new MockToken( "pattern-0-token-2" ), new MockToken( "pattern-0-token-3" ), new NewLineSymbol( "." ),
				new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ), new NewLineSymbol( "." ),
				new MockToken( "pattern-2-token-1" ), new MockToken( "pattern-2-token-2" ), new MockToken( "pattern-2-token-3" ),
				new Identifier( "a-identifier" ), new MockToken( "pattern-3-token-2" ), new MockToken( "pattern-3-token-3" ),
			] );
		} );

		it( "If next GraphPattern is a simple block, not graph pattern separator is added between", ():void => {
			let patterns:GraphPattern[];

			patterns = [
				{
					getPattern: () => [ new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ) ],
				},
				{
					getPattern: () => [ OPEN_SINGLE_BLOCK, new MockToken( "pattern-2-token-1" ), CLOSE_SINGLE_BLOCK ],
				},
			];
			expect( Patterns.getTokens( patterns ) ).toEqual( [
				new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ),
				OPEN_SINGLE_BLOCK, new MockToken( "pattern-2-token-1" ), CLOSE_SINGLE_BLOCK,
			] );

			patterns = [
				{
					getPattern: () => [ new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ) ],
				},
				{
					getPattern: () => [ OPEN_SINGLE_BLOCK, new MockToken( "pattern-2-token-1" ), CLOSE_SINGLE_BLOCK ],
				},
				{
					getPattern: () => [ new MockToken( "pattern-3-token-1" ), new MockToken( "pattern-3-token-2" ), new MockToken( "pattern-3-token-3" ) ],
				},
			];
			expect( Patterns.getTokens( patterns ) ).toEqual( [
				new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ),
				OPEN_SINGLE_BLOCK, new MockToken( "pattern-2-token-1" ), CLOSE_SINGLE_BLOCK, /* No separator, testes correctly in the next test */
				new MockToken( "pattern-3-token-1" ), new MockToken( "pattern-3-token-2" ), new MockToken( "pattern-3-token-3" ),
			] );

			patterns = [
				{
					getPattern: () => [ new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ) ],
				},
				{
					getPattern: () => [ new MockToken( "pattern-2-token-1" ), new MockToken( "pattern-2-token-2" ), new MockToken( "pattern-2-token-3" ) ],
				},
				{
					getPattern: () => [ OPEN_SINGLE_BLOCK, new MockToken( "pattern-3-token-1" ), CLOSE_SINGLE_BLOCK ],
				},
			];
			expect( Patterns.getTokens( patterns ) ).toEqual( [
				new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ), new NewLineSymbol( "." ),
				new MockToken( "pattern-2-token-1" ), new MockToken( "pattern-2-token-2" ), new MockToken( "pattern-2-token-3" ),
				OPEN_SINGLE_BLOCK, new MockToken( "pattern-3-token-1" ), CLOSE_SINGLE_BLOCK,
			] );

			patterns = [
				{
					getPattern: () => [ new MockToken( "pattern-0-token-1" ), new MockToken( "pattern-0-token-2" ), new MockToken( "pattern-0-token-3" ) ],
				},
				{
					getPattern: () => [ new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ) ],
				},
				{
					getPattern: () => [ new MockToken( "pattern-2-token-1" ), new MockToken( "pattern-2-token-2" ), new MockToken( "pattern-2-token-3" ) ],
				},
				{
					getPattern: () => [ OPEN_SINGLE_BLOCK, new MockToken( "pattern-3-token-1" ), CLOSE_SINGLE_BLOCK ],
				},
			];
			expect( Patterns.getTokens( patterns ) ).toEqual( [
				new MockToken( "pattern-0-token-1" ), new MockToken( "pattern-0-token-2" ), new MockToken( "pattern-0-token-3" ), new NewLineSymbol( "." ),
				new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ), new NewLineSymbol( "." ),
				new MockToken( "pattern-2-token-1" ), new MockToken( "pattern-2-token-2" ), new MockToken( "pattern-2-token-3" ),
				OPEN_SINGLE_BLOCK, new MockToken( "pattern-3-token-1" ), CLOSE_SINGLE_BLOCK,
			] );
		} );

		it( "If next GraphPattern is a multiple line block, not graph pattern separator is added between", ():void => {
			let patterns:GraphPattern[];

			patterns = [
				{
					getPattern: () => [ new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ) ],
				},
				{
					getPattern: () => [ OPEN_MULTI_BLOCK, new MockToken( "pattern-2-token-1" ), CLOSE_MULTI_BLOCK ],
				},
			];
			expect( Patterns.getTokens( patterns ) ).toEqual( [
				new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ),
				OPEN_MULTI_BLOCK, new MockToken( "pattern-2-token-1" ), CLOSE_MULTI_BLOCK,
			] );

			patterns = [
				{
					getPattern: () => [ new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ) ],
				},
				{
					getPattern: () => [ OPEN_MULTI_BLOCK, new MockToken( "pattern-2-token-1" ), CLOSE_MULTI_BLOCK ],
				},
				{
					getPattern: () => [ new MockToken( "pattern-3-token-1" ), new MockToken( "pattern-3-token-2" ), new MockToken( "pattern-3-token-3" ) ],
				},
			];
			expect( Patterns.getTokens( patterns ) ).toEqual( [
				new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ),
				OPEN_MULTI_BLOCK, new MockToken( "pattern-2-token-1" ), CLOSE_MULTI_BLOCK, /* No separator, testes correctly in the next test */
				new MockToken( "pattern-3-token-1" ), new MockToken( "pattern-3-token-2" ), new MockToken( "pattern-3-token-3" ),
			] );

			patterns = [
				{
					getPattern: () => [ new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ) ],
				},
				{
					getPattern: () => [ new MockToken( "pattern-2-token-1" ), new MockToken( "pattern-2-token-2" ), new MockToken( "pattern-2-token-3" ) ],
				},
				{
					getPattern: () => [ OPEN_MULTI_BLOCK, new MockToken( "pattern-3-token-1" ), CLOSE_MULTI_BLOCK ],
				},
			];
			expect( Patterns.getTokens( patterns ) ).toEqual( [
				new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ), new NewLineSymbol( "." ),
				new MockToken( "pattern-2-token-1" ), new MockToken( "pattern-2-token-2" ), new MockToken( "pattern-2-token-3" ),
				OPEN_MULTI_BLOCK, new MockToken( "pattern-3-token-1" ), CLOSE_MULTI_BLOCK,
			] );

			patterns = [
				{
					getPattern: () => [ new MockToken( "pattern-0-token-1" ), new MockToken( "pattern-0-token-2" ), new MockToken( "pattern-0-token-3" ) ],
				},
				{
					getPattern: () => [ new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ) ],
				},
				{
					getPattern: () => [ new MockToken( "pattern-2-token-1" ), new MockToken( "pattern-2-token-2" ), new MockToken( "pattern-2-token-3" ) ],
				},
				{
					getPattern: () => [ OPEN_MULTI_BLOCK, new MockToken( "pattern-3-token-1" ), CLOSE_MULTI_BLOCK ],
				},
			];
			expect( Patterns.getTokens( patterns ) ).toEqual( [
				new MockToken( "pattern-0-token-1" ), new MockToken( "pattern-0-token-2" ), new MockToken( "pattern-0-token-3" ), new NewLineSymbol( "." ),
				new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ), new NewLineSymbol( "." ),
				new MockToken( "pattern-2-token-1" ), new MockToken( "pattern-2-token-2" ), new MockToken( "pattern-2-token-3" ),
				OPEN_MULTI_BLOCK, new MockToken( "pattern-3-token-1" ), CLOSE_MULTI_BLOCK,
			] );
		} );

		it( "If current GraphPattern is a single block, not graph pattern separator is added between the next GraphPattern", ():void => {
			let patterns:GraphPattern[];

			patterns = [
				{
					getPattern: () => [ OPEN_SINGLE_BLOCK, new MockToken( "pattern-1-token-1" ), CLOSE_SINGLE_BLOCK ],
				},
				{
					getPattern: () => [ new MockToken( "pattern-2-token-1" ), new MockToken( "pattern-2-token-2" ) ],
				},
			];
			expect( Patterns.getTokens( patterns ) ).toEqual( [
				OPEN_SINGLE_BLOCK, new MockToken( "pattern-1-token-1" ), CLOSE_SINGLE_BLOCK,
				new MockToken( "pattern-2-token-1" ), new MockToken( "pattern-2-token-2" ),
			] );
			patterns = [
				{
					getPattern: () => [ new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ) ],
				},
				{
					getPattern: () => [ OPEN_SINGLE_BLOCK, new MockToken( "pattern-2-token-1" ), CLOSE_SINGLE_BLOCK ],
				},
				{
					getPattern: () => [ new MockToken( "pattern-3-token-1" ), new MockToken( "pattern-3-token-2" ), new MockToken( "pattern-3-token-3" ) ],
				},
			];
			expect( Patterns.getTokens( patterns ) ).toEqual( [
				new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ),
				OPEN_SINGLE_BLOCK, new MockToken( "pattern-2-token-1" ), CLOSE_SINGLE_BLOCK,
				new MockToken( "pattern-3-token-1" ), new MockToken( "pattern-3-token-2" ), new MockToken( "pattern-3-token-3" ),
			] );

			patterns = [
				{
					getPattern: () => [ OPEN_SINGLE_BLOCK, new MockToken( "pattern-0-token-1" ), CLOSE_SINGLE_BLOCK ],
				},
				{
					getPattern: () => [ new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ) ],
				},
				{
					getPattern: () => [ new MockToken( "pattern-2-token-1" ), new MockToken( "pattern-2-token-2" ), new MockToken( "pattern-2-token-3" ) ],
				},
			];
			expect( Patterns.getTokens( patterns ) ).toEqual( [
				OPEN_SINGLE_BLOCK, new MockToken( "pattern-0-token-1" ), CLOSE_SINGLE_BLOCK,
				new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ), new NewLineSymbol( "." ),
				new MockToken( "pattern-2-token-1" ), new MockToken( "pattern-2-token-2" ), new MockToken( "pattern-2-token-3" ),
			] );

			patterns = [
				{
					getPattern: () => [ OPEN_SINGLE_BLOCK, new MockToken( "pattern-0-token-1" ), CLOSE_SINGLE_BLOCK ],
				},
				{
					getPattern: () => [ new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ) ],
				},
				{
					getPattern: () => [ new MockToken( "pattern-2-token-1" ), new MockToken( "pattern-2-token-2" ), new MockToken( "pattern-2-token-3" ) ],
				},
				{
					getPattern: () => [ new MockToken( "pattern-3-token-1" ), new MockToken( "pattern-3-token-2" ), new MockToken( "pattern-3-token-3" ) ],
				},
			];
			expect( Patterns.getTokens( patterns ) ).toEqual( [
				OPEN_SINGLE_BLOCK, new MockToken( "pattern-0-token-1" ), CLOSE_SINGLE_BLOCK,
				new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ), new NewLineSymbol( "." ),
				new MockToken( "pattern-2-token-1" ), new MockToken( "pattern-2-token-2" ), new MockToken( "pattern-2-token-3" ), new NewLineSymbol( "." ),
				new MockToken( "pattern-3-token-1" ), new MockToken( "pattern-3-token-2" ), new MockToken( "pattern-3-token-3" ),
			] );
		} );

		it( "If current GraphPattern is a multiple line block, not graph pattern separator is added between the next GraphPattern", ():void => {
			let patterns:GraphPattern[];

			patterns = [
				{
					getPattern: () => [ OPEN_SINGLE_BLOCK, new MockToken( "pattern-1-token-1" ), CLOSE_SINGLE_BLOCK ],
				},
				{
					getPattern: () => [ new MockToken( "pattern-2-token-1" ), new MockToken( "pattern-2-token-2" ) ],
				},
			];
			expect( Patterns.getTokens( patterns ) ).toEqual( [
				OPEN_SINGLE_BLOCK, new MockToken( "pattern-1-token-1" ), CLOSE_SINGLE_BLOCK,
				new MockToken( "pattern-2-token-1" ), new MockToken( "pattern-2-token-2" ),
			] );
			patterns = [
				{
					getPattern: () => [ new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ) ],
				},
				{
					getPattern: () => [ OPEN_SINGLE_BLOCK, new MockToken( "pattern-2-token-1" ), CLOSE_SINGLE_BLOCK ],
				},
				{
					getPattern: () => [ new MockToken( "pattern-3-token-1" ), new MockToken( "pattern-3-token-2" ), new MockToken( "pattern-3-token-3" ) ],
				},
			];
			expect( Patterns.getTokens( patterns ) ).toEqual( [
				new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ),
				OPEN_SINGLE_BLOCK, new MockToken( "pattern-2-token-1" ), CLOSE_SINGLE_BLOCK,
				new MockToken( "pattern-3-token-1" ), new MockToken( "pattern-3-token-2" ), new MockToken( "pattern-3-token-3" ),
			] );

			patterns = [
				{
					getPattern: () => [ OPEN_SINGLE_BLOCK, new MockToken( "pattern-0-token-1" ), CLOSE_SINGLE_BLOCK ],
				},
				{
					getPattern: () => [ new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ) ],
				},
				{
					getPattern: () => [ new MockToken( "pattern-2-token-1" ), new MockToken( "pattern-2-token-2" ), new MockToken( "pattern-2-token-3" ) ],
				},
			];
			expect( Patterns.getTokens( patterns ) ).toEqual( [
				OPEN_SINGLE_BLOCK, new MockToken( "pattern-0-token-1" ), CLOSE_SINGLE_BLOCK,
				new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ), new NewLineSymbol( "." ),
				new MockToken( "pattern-2-token-1" ), new MockToken( "pattern-2-token-2" ), new MockToken( "pattern-2-token-3" ),
			] );

			patterns = [
				{
					getPattern: () => [ OPEN_SINGLE_BLOCK, new MockToken( "pattern-0-token-1" ), CLOSE_SINGLE_BLOCK ],
				},
				{
					getPattern: () => [ new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ) ],
				},
				{
					getPattern: () => [ new MockToken( "pattern-2-token-1" ), new MockToken( "pattern-2-token-2" ), new MockToken( "pattern-2-token-3" ) ],
				},
				{
					getPattern: () => [ new MockToken( "pattern-3-token-1" ), new MockToken( "pattern-3-token-2" ), new MockToken( "pattern-3-token-3" ) ],
				},
			];
			expect( Patterns.getTokens( patterns ) ).toEqual( [
				OPEN_SINGLE_BLOCK, new MockToken( "pattern-0-token-1" ), CLOSE_SINGLE_BLOCK,
				new MockToken( "pattern-1-token-1" ), new MockToken( "pattern-1-token-2" ), new NewLineSymbol( "." ),
				new MockToken( "pattern-2-token-1" ), new MockToken( "pattern-2-token-2" ), new MockToken( "pattern-2-token-3" ), new NewLineSymbol( "." ),
				new MockToken( "pattern-3-token-1" ), new MockToken( "pattern-3-token-2" ), new MockToken( "pattern-3-token-3" ),
			] );
		} );

	} );

	describe( "isMultiLine()", ():void => {

		it( "Exists", ():void => {
			expect( Patterns.isMultiLine ).toBeDefined();
			expect( Patterns.isMultiLine ).toEqual( jasmine.any( Function ) );
		} );

		it( "Normal tokens will return false", ():void => {
			class MockToken extends Token {
				protected getPrettySeparator():string {
					return " ";
				}

				protected getCompactSeparator():string {
					return " ";
				}
			}
			let tokens:Token[];

			tokens = [ new MockToken( "some" ) ];
			expect( Patterns.isMultiLine( tokens ) ).toBe( false );

			tokens = [ new MockToken( "some-1" ), new MockToken( "some-2" ) ];
			expect( Patterns.isMultiLine( tokens ) ).toBe( false );

			tokens = [ new MockToken( "some-1" ), new MockToken( "some-2" ), new MockToken( "some-3" ), new MockToken( "some-4" ) ];
			expect( Patterns.isMultiLine( tokens ) ).toBe( false );
		} );

		it( "Can recognize the tokens that describe a multi-line pattern", ():void => {
			let tokens:Token[];

			// Graph pattern symbol
			tokens = [ new NewLineSymbol( "." ) ];
			expect( Patterns.isMultiLine( tokens ) ).toBe( true );

			// Same subject symbol
			tokens = [ new NewLineSymbol( ";" ) ];
			expect( Patterns.isMultiLine( tokens ) ).toBe( true );

			// Same property symbol
			tokens = [ new NewLineSymbol( "," ) ];
			expect( Patterns.isMultiLine( tokens ) ).toBe( true );

			// Collection values symbol
			tokens = [ new NewLineSymbol( "" ) ];
			expect( Patterns.isMultiLine( tokens ) ).toBe( true );
		} );

		it( "Will return true no matter where the multi-line symbol is", ():void => {
			class MockToken extends Token {
				protected getPrettySeparator():string {
					return " ";
				}

				protected getCompactSeparator():string {
					return " ";
				}
			}
			let tokens:Token[];

			// Unique token
			tokens = [ new NewLineSymbol( "" ) ];
			expect( Patterns.isMultiLine( tokens ) ).toBe( true );

			// First token
			tokens = [ new NewLineSymbol( "" ), new MockToken( "some-1" ), new MockToken( "some-2" ) ];
			expect( Patterns.isMultiLine( tokens ) ).toBe( true );
			tokens = [ new NewLineSymbol( "" ), new MockToken( "some-1" ), new MockToken( "some-2" ), new MockToken( "some-3" ), new MockToken( "some-4" ) ];
			expect( Patterns.isMultiLine( tokens ) ).toBe( true );

			// Last token
			tokens = [ new MockToken( "some-1" ), new MockToken( "some-2" ), new NewLineSymbol( "" ) ];
			expect( Patterns.isMultiLine( tokens ) ).toBe( true );
			tokens = [ new MockToken( "some-1" ), new MockToken( "some-2" ), new MockToken( "some-3" ), new MockToken( "some-4" ), new NewLineSymbol( "" ) ];
			expect( Patterns.isMultiLine( tokens ) ).toBe( true );

			// Somewhere in the middle
			tokens = [ new MockToken( "some-1" ), new NewLineSymbol( "" ), new MockToken( "some-2" ) ];
			expect( Patterns.isMultiLine( tokens ) ).toBe( true );
			tokens = [ new MockToken( "some-1" ), new NewLineSymbol( "" ), new MockToken( "some-2" ), new MockToken( "some-3" ), new MockToken( "some-4" ) ];
			expect( Patterns.isMultiLine( tokens ) ).toBe( true );
			tokens = [ new MockToken( "some-1" ), new MockToken( "some-2" ), new NewLineSymbol( "" ), new MockToken( "some-3" ), new MockToken( "some-4" ) ];
			expect( Patterns.isMultiLine( tokens ) ).toBe( true );
			tokens = [ new MockToken( "some-1" ), new MockToken( "some-2" ), new MockToken( "some-3" ), new NewLineSymbol( "" ), new MockToken( "some-4" ) ];
			expect( Patterns.isMultiLine( tokens ) ).toBe( true );
		} );

	} );

} );
