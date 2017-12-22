import { IRIResolver } from "../../iri/IRIResolver";
import { Identifier } from "../../tokens/Identifier";
import { LeftSymbol } from "../../tokens/LeftSymbol";
import { NewLineSymbol } from "../../tokens/NewLineSymbol";
import { RightSymbol } from "../../tokens/RightSymbol";
import { Token } from "../../tokens/Token";
import * as ObjectPattern from "../../utils/ObjectPattern";
import { MultipleValuesPattern } from "../interfaces";
import {
	Literal,
	NumericLiteral,
	RDFLiteral,
} from "../triples/Literals";
import { Variable } from "../triples/Variable";
import { NotTriplesPattern } from "./NotTriplesPattern";
import * as ValuesPatternModule from "./ValuesPattern";
import ValuesPattern from "./ValuesPattern";

describe( "Module ValuesPattern", ():void => {

	it( "Exists", ():void => {
		expect( ValuesPatternModule ).toBeDefined();
		expect( ValuesPatternModule ).toEqual( jasmine.any( Object ) );
	} );

	describe( "Class ValuePattern", ():void => {

		it( "Exists", ():void => {
			expect( ValuesPattern ).toBeDefined();
			expect( ValuesPattern ).toEqual( jasmine.any( Function ) );
			expect( ValuesPattern ).toBe( ValuesPatternModule.ValuesPattern );
		} );

		it( "Empty DataBlock, ValuesPattern()", ():void => {
			let resolver:IRIResolver = new IRIResolver();

			class MockToken extends Token {
				protected getPrettySeparator():string {
					return " ";
				}

				protected getCompactSeparator():string {
					return " ";
				}
			}

			class MockVar extends Variable {
				private name:string;

				constructor( name:string ) {
					super( resolver, name );
					this.name = name;
				}

				getSelfTokens():Token[] {
					return [ new MockToken( this.name ) ];
				}
			}

			let pattern:ValuesPattern;
			let tokens:Token[];

			// Empty variables

			pattern = new ValuesPattern( resolver, [] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( ValuesPattern ) );

			// Test the constructed tokens
			tokens = pattern.getPattern();
			expect( tokens ).toEqual( jasmine.any( Array ) );
			expect( tokens ).toEqual( [
				new Identifier( "VALUES" ),
				new LeftSymbol( "(" ),
				new RightSymbol( ")" ),
				new NewLineSymbol( "{" ),
				new NewLineSymbol( "}" ),
			] );

			// One variable

			pattern = new ValuesPattern( resolver, [ new MockVar( "one" ) ] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( ValuesPattern ) );

			// Test the constructed tokens

			tokens = pattern.getPattern();
			expect( tokens ).toEqual( jasmine.any( Array ) );
			expect( tokens ).toEqual( [
				new Identifier( "VALUES" ),
				new MockToken( "one" ),
				new LeftSymbol( "{" ),
				new RightSymbol( "}" ),
			] );

			// Multiple variables

			pattern = new ValuesPattern( resolver, [
				new MockVar( "a" ),
				new MockVar( "b" ),
				new MockVar( "c" ),
				new MockVar( "d" ),
				new MockVar( "e" ),
			] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( ValuesPattern ) );

			// Test the constructed tokens
			tokens = pattern.getPattern();
			expect( tokens ).toEqual( jasmine.any( Array ) );
			expect( tokens ).toEqual( [
				new Identifier( "VALUES" ),
				new LeftSymbol( "(" ),
				new MockToken( "a" ),
				new MockToken( "b" ),
				new MockToken( "c" ),
				new MockToken( "d" ),
				new MockToken( "e" ),
				new RightSymbol( ")" ),
				new NewLineSymbol( "{" ),
				new NewLineSymbol( "}" ),
			] );
		} );

		it( "Single DataBlock, ValuesPattern().has()", ():void => {
			let resolver:IRIResolver = new IRIResolver();

			class MockToken extends Token {
				protected getPrettySeparator():string {
					return " ";
				}

				protected getCompactSeparator():string {
					return " ";
				}
			}

			class MockVar extends Variable {
				private name:string;

				constructor( name:string ) {
					super( resolver, name );
					this.name = name;
				}

				getSelfTokens():Token[] {
					return [ new MockToken( this.name ) ];
				}
			}

			let pattern:NotTriplesPattern;
			let tokens:Token[];
			let literals:Literal[];
			let serializeSpy:jasmine.Spy = spyOn( ObjectPattern, "serialize" ).and.callFake( ( element ):Token[] => {
				return [ new MockToken( "element" ) ];
			} );

			// Empty variables

			// Empty variable must have empty value
			serializeSpy.calls.reset();
			pattern = new ValuesPattern( resolver, [] )
				.has();

			expect( serializeSpy ).toHaveBeenCalledTimes( 0 );

			// Test the constructed tokens
			tokens = pattern.getPattern();
			expect( tokens ).toEqual( jasmine.any( Array ) );
			expect( tokens ).toEqual( [
				new Identifier( "VALUES" ),
				new LeftSymbol( "(" ),
				new RightSymbol( ")" ),
				new NewLineSymbol( "{" ),
				new LeftSymbol( "(" ),
				new RightSymbol( ")" ),
				new NewLineSymbol( "}" ),
			] );

			// The number of values differ from the number of variables, throw error
			serializeSpy.calls.reset();
			expect( () => new ValuesPattern( resolver, [] )
				.has( "something" ),
			).toThrowError( "InvalidArgumentError: The number of variables and values are different." );
			expect( serializeSpy ).toHaveBeenCalledTimes( 0 );

			// The number of values differ from the number of variables, throw error
			serializeSpy.calls.reset();
			expect( () => new ValuesPattern( resolver, [] )
				.has( "something", "else" ),
			).toThrowError( "InvalidArgumentError: The number of variables and values are different." );
			expect( serializeSpy ).toHaveBeenCalledTimes( 0 );

			// One variable

			// Single value
			serializeSpy.calls.reset();
			pattern = new ValuesPattern( resolver, [ new MockVar( "one" ) ] )
				.has( "something" );

			expect( serializeSpy ).toHaveBeenCalledTimes( 1 );
			expect( serializeSpy ).toHaveBeenCalledWith( "something" );

			// Test the constructed tokens
			tokens = pattern.getPattern();
			expect( tokens ).toEqual( jasmine.any( Array ) );
			expect( tokens ).toEqual( [
				new Identifier( "VALUES" ),
				new MockToken( "one" ),
				new LeftSymbol( "{" ),
				new MockToken( "element" ),
				new RightSymbol( "}" ),
			] );

			// The number of values differ from the number of variables, throw error
			serializeSpy.calls.reset();
			expect( () => new ValuesPattern( resolver, [ new MockVar( "one" ) ] )
				.has( "something", "else" ),
			).toThrowError( "InvalidArgumentError: The number of variables and values are different." );
			expect( serializeSpy ).toHaveBeenCalledTimes( 0 );

			// The number of values differ from the number of variables, throw error
			serializeSpy.calls.reset();
			literals = [ new RDFLiteral( resolver, "yes" ), new NumericLiteral( resolver, 1 ) ];
			expect( () => new ValuesPattern( resolver, [ new MockVar( "one" ) ] )
				.has( "something", 1, true, ...literals ),
			).toThrowError( "InvalidArgumentError: The number of variables and values are different." );
			expect( serializeSpy ).toHaveBeenCalledTimes( 0 );

			// Multiple variables

			// The number of values differ from the number of variables, throw error
			serializeSpy.calls.reset();
			expect( () => new ValuesPattern( resolver, [
					new MockVar( "a" ),
					new MockVar( "b" ),
					new MockVar( "c" ),
					new MockVar( "d" ),
					new MockVar( "e" ),
				] )
					.has( "something" ),
			).toThrowError( "InvalidArgumentError: The number of variables and values are different." );
			expect( serializeSpy ).toHaveBeenCalledTimes( 0 );

			// The number of values differ from the number of variables, throw error
			serializeSpy.calls.reset();
			expect( () => new ValuesPattern( resolver, [
					new MockVar( "a" ),
					new MockVar( "b" ),
					new MockVar( "c" ),
					new MockVar( "d" ),
					new MockVar( "e" ),
				] )
					.has(),
			).toThrowError( "InvalidArgumentError: The number of variables and values are different." );
			expect( serializeSpy ).toHaveBeenCalledTimes( 0 );

			// The number of values differ from the number of variables, throw error
			serializeSpy.calls.reset();
			expect( () => new ValuesPattern( resolver, [
					new MockVar( "a" ),
					new MockVar( "b" ),
					new MockVar( "c" ),
					new MockVar( "d" ),
					new MockVar( "e" ),
				] )
					.has( 1, 2, 3, 4, 5, 6 ),
			).toThrowError( "InvalidArgumentError: The number of variables and values are different." );
			expect( serializeSpy ).toHaveBeenCalledTimes( 0 );

			// Same number of values
			serializeSpy.calls.reset();
			literals = [ new RDFLiteral( resolver, "yes" ), new NumericLiteral( resolver, 1 ) ];
			pattern = new ValuesPattern( resolver, [
				new MockVar( "a" ),
				new MockVar( "b" ),
				new MockVar( "c" ),
				new MockVar( "d" ),
				new MockVar( "e" ),
			] )
				.has( "something", 1, true, ...literals );

			expect( serializeSpy ).toHaveBeenCalledTimes( 5 );
			expect( serializeSpy ).toHaveBeenCalledWith( "something" );
			expect( serializeSpy ).toHaveBeenCalledWith( 1 );
			expect( serializeSpy ).toHaveBeenCalledWith( true );
			expect( serializeSpy ).toHaveBeenCalledWith( literals[ 0 ] );
			expect( serializeSpy ).toHaveBeenCalledWith( literals[ 1 ] );

			// Test the constructed tokens
			tokens = pattern.getPattern();
			expect( tokens ).toEqual( jasmine.any( Array ) );
			expect( tokens ).toEqual( [
				new Identifier( "VALUES" ),
				new LeftSymbol( "(" ),
				new MockToken( "a" ),
				new MockToken( "b" ),
				new MockToken( "c" ),
				new MockToken( "d" ),
				new MockToken( "e" ),
				new RightSymbol( ")" ),
				new NewLineSymbol( "{" ),
				new LeftSymbol( "(" ),
				new MockToken( "element" ),
				new MockToken( "element" ),
				new MockToken( "element" ),
				new MockToken( "element" ),
				new MockToken( "element" ),
				new RightSymbol( ")" ),
				new NewLineSymbol( "}" ),
			] );
		} );

		it( "Multiple DataBlock, ValuesPattern().has().and()", ():void => {
			let resolver:IRIResolver = new IRIResolver();

			class MockToken extends Token {
				protected getPrettySeparator():string {
					return " ";
				}

				protected getCompactSeparator():string {
					return " ";
				}
			}

			class MockVar extends Variable {
				private name:string;

				constructor( name:string ) {
					super( resolver, name );
					this.name = name;
				}

				getSelfTokens():Token[] {
					return [ new MockToken( this.name ) ];
				}
			}

			let pattern:NotTriplesPattern;
			let tokens:Token[];
			let literals:Literal[];
			let serializeSpy:jasmine.Spy = spyOn( ObjectPattern, "serialize" ).and.callFake( ( element ):Token[] => {
				return [ new MockToken( "element" ) ];
			} );

			// Empty variables

			// Empty variable must have empty values, 1
			serializeSpy.calls.reset();
			pattern = new ValuesPattern( resolver, [] )
				.has()
				.and();

			expect( serializeSpy ).toHaveBeenCalledTimes( 0 );

			// Test the constructed tokens
			tokens = pattern.getPattern();
			expect( tokens ).toEqual( jasmine.any( Array ) );
			expect( tokens ).toEqual( [
				new Identifier( "VALUES" ),
				new LeftSymbol( "(" ),
				new RightSymbol( ")" ),
				new NewLineSymbol( "{" ),
				new LeftSymbol( "(" ), new RightSymbol( ")" ),
				new LeftSymbol( "(" ), new RightSymbol( ")" ),
				new NewLineSymbol( "}" ),
			] );

			// Empty variable must have empty values, 2
			serializeSpy.calls.reset();
			pattern = new ValuesPattern( resolver, [] )
				.has()
				.and()
				.and()
				.and();

			expect( serializeSpy ).toHaveBeenCalledTimes( 0 );

			// Test the constructed tokens
			tokens = pattern.getPattern();
			expect( tokens ).toEqual( jasmine.any( Array ) );
			expect( tokens ).toEqual( [
				new Identifier( "VALUES" ),
				new LeftSymbol( "(" ),
				new RightSymbol( ")" ),
				new NewLineSymbol( "{" ),
				new LeftSymbol( "(" ), new RightSymbol( ")" ),
				new LeftSymbol( "(" ), new RightSymbol( ")" ),
				new LeftSymbol( "(" ), new RightSymbol( ")" ),
				new LeftSymbol( "(" ), new RightSymbol( ")" ),
				new NewLineSymbol( "}" ),
			] );

			// The number of values differ from the number of variables, throw error
			serializeSpy.calls.reset();
			expect( () => new ValuesPattern( resolver, [] )
				.has()
				.and( "something" ),
			).toThrowError( "InvalidArgumentError: The number of variables and values are different." );
			expect( serializeSpy ).toHaveBeenCalledTimes( 0 );

			// The number of values differ from the number of variables, throw error
			serializeSpy.calls.reset();
			expect( () => new ValuesPattern( resolver, [] )
				.has()
				.and()
				.and()
				.and( "something", "else" ),
			).toThrowError( "InvalidArgumentError: The number of variables and values are different." );
			expect( serializeSpy ).toHaveBeenCalledTimes( 0 );

			// The number of values differ from the number of variables, throw error
			serializeSpy.calls.reset();
			expect( () => new ValuesPattern( resolver, [] )
				.has()
				.and()
				.and( "something" )
				.and( "something", "else" ),
			).toThrowError( "InvalidArgumentError: The number of variables and values are different." );
			expect( serializeSpy ).toHaveBeenCalledTimes( 0 );

			// One variable

			// Single value
			serializeSpy.calls.reset();
			pattern = new ValuesPattern( resolver, [ new MockVar( "one" ) ] )
				.has( "no-important" )
				.and( "something" );

			expect( serializeSpy ).toHaveBeenCalledTimes( 2 );
			expect( serializeSpy ).toHaveBeenCalledWith( "no-important" );
			expect( serializeSpy ).toHaveBeenCalledWith( "something" );

			// Test the constructed tokens
			tokens = pattern.getPattern();
			expect( tokens ).toEqual( jasmine.any( Array ) );
			expect( tokens ).toEqual( [
				new Identifier( "VALUES" ),
				new MockToken( "one" ),
				new LeftSymbol( "{" ),
				new MockToken( "element" ),
				new MockToken( "element" ),
				new RightSymbol( "}" ),
			] );

			// The number of values differ from the number of variables, throw error
			serializeSpy.calls.reset();
			expect( () => ( new ValuesPattern( resolver, [ new MockVar( "one" ) ] ) as MultipleValuesPattern )
				.has( "no-important" )
				.and( "something", "wrong" ),
			).toThrowError( "InvalidArgumentError: The number of variables and values are different." );
			expect( serializeSpy ).toHaveBeenCalledTimes( 1 );

			// The number of values differ from the number of variables, throw error
			serializeSpy.calls.reset();
			literals = [ new RDFLiteral( resolver, "yes" ), new NumericLiteral( resolver, 1 ) ];
			expect( () => ( new ValuesPattern( resolver, [ new MockVar( "one" ) ] ) as MultipleValuesPattern )
				.has( "no-important" )
				.and( "no-important" )
				.and( "no-important" )
				.and( "something", "wrong", 1, true, ...literals ),
			).toThrowError( "InvalidArgumentError: The number of variables and values are different." );
			expect( serializeSpy ).toHaveBeenCalledTimes( 3 );

			// Multiple variables

			// The number of values differ from the number of variables, throw error
			serializeSpy.calls.reset();
			expect( () => ( new ValuesPattern( resolver, [
					new MockVar( "a" ),
					new MockVar( "b" ),
					new MockVar( "c" ),
					new MockVar( "d" ),
					new MockVar( "e" ),
				] ) as MultipleValuesPattern )
					.has( "no-important", "no-important", "no-important", "no-important", "no-important" )
					.and(),
			).toThrowError( "InvalidArgumentError: The number of variables and values are different." );
			expect( serializeSpy ).toHaveBeenCalledTimes( 5 );

			// The number of values differ from the number of variables, throw error
			serializeSpy.calls.reset();
			expect( () => ( new ValuesPattern( resolver, [
					new MockVar( "a" ),
					new MockVar( "b" ),
					new MockVar( "c" ),
					new MockVar( "d" ),
					new MockVar( "e" ),
				] ) as MultipleValuesPattern )
					.has( "no-important", "no-important", "no-important", "no-important", "no-important" )
					.and( "wrong" ),
			).toThrowError( "InvalidArgumentError: The number of variables and values are different." );
			expect( serializeSpy ).toHaveBeenCalledTimes( 5 );

			// The number of values differ from the number of variables, throw error
			serializeSpy.calls.reset();
			expect( () => ( new ValuesPattern( resolver, [
					new MockVar( "a" ),
					new MockVar( "b" ),
					new MockVar( "c" ),
					new MockVar( "d" ),
					new MockVar( "e" ),
				] ) as MultipleValuesPattern )
					.has( "no-important", "no-important", "no-important", "no-important", "no-important" )
					.and( "no-important", "no-important", "no-important", "no-important", "no-important" )
					.and( "no-important", "no-important", "no-important", "no-important", "no-important" )
					.and( "something", "wrong" ),
			).toThrowError( "InvalidArgumentError: The number of variables and values are different." );
			expect( serializeSpy ).toHaveBeenCalledTimes( 15 );

			// The number of values differ from the number of variables, throw error
			serializeSpy.calls.reset();
			expect( () => new ValuesPattern( resolver, [
					new MockVar( "a" ),
					new MockVar( "b" ),
					new MockVar( "c" ),
					new MockVar( "d" ),
					new MockVar( "e" ),
				] )
					.has( "no-important", "no-important", "no-important", "no-important", "no-important" )
					.and( "no-important", "no-important", "no-important", "no-important", "no-important" )
					.and( 1, 2, 3, 4, 5, 6 ),
			).toThrowError( "InvalidArgumentError: The number of variables and values are different." );
			expect( serializeSpy ).toHaveBeenCalledTimes( 10 );

			// Same number of values
			serializeSpy.calls.reset();
			literals = [ new RDFLiteral( resolver, "yes" ), new NumericLiteral( resolver, 1 ) ];
			pattern = new ValuesPattern( resolver, [
				new MockVar( "a" ),
				new MockVar( "b" ),
				new MockVar( "c" ),
				new MockVar( "d" ),
				new MockVar( "e" ),
			] )
				.has( "no-important", "no-important", "no-important", "no-important", "no-important" )
				.and( "no-important", "no-important", "no-important", "no-important", "no-important" )
				.and( "something", 1, true, ...literals );

			expect( serializeSpy ).toHaveBeenCalledTimes( 15 );
			expect( serializeSpy ).toHaveBeenCalledWith( "no-important" );
			expect( serializeSpy ).toHaveBeenCalledWith( "something" );
			expect( serializeSpy ).toHaveBeenCalledWith( 1 );
			expect( serializeSpy ).toHaveBeenCalledWith( true );
			expect( serializeSpy ).toHaveBeenCalledWith( literals[ 0 ] );
			expect( serializeSpy ).toHaveBeenCalledWith( literals[ 1 ] );

			// Test the constructed tokens
			tokens = pattern.getPattern();
			expect( tokens ).toEqual( jasmine.any( Array ) );
			expect( tokens ).toEqual( [
				new Identifier( "VALUES" ),
				new LeftSymbol( "(" ),
				new MockToken( "a" ),
				new MockToken( "b" ),
				new MockToken( "c" ),
				new MockToken( "d" ),
				new MockToken( "e" ),
				new RightSymbol( ")" ),
				new NewLineSymbol( "{" ),
				new LeftSymbol( "(" ),
				new MockToken( "element" ), new MockToken( "element" ), new MockToken( "element" ), new MockToken( "element" ), new MockToken( "element" ),
				new RightSymbol( ")" ),
				new LeftSymbol( "(" ),
				new MockToken( "element" ), new MockToken( "element" ), new MockToken( "element" ), new MockToken( "element" ), new MockToken( "element" ),
				new RightSymbol( ")" ),
				new LeftSymbol( "(" ),
				new MockToken( "element" ), new MockToken( "element" ), new MockToken( "element" ), new MockToken( "element" ), new MockToken( "element" ),
				new RightSymbol( ")" ),
				new NewLineSymbol( "}" ),
			] );
		} );

	} );

} );