import * as TriplesPatternModule from "./TriplesPattern";
import TriplesPattern from "./TriplesPattern";

import {
	GraphPattern,
	TriplesSameSubjectMore,
	ElementPattern,
} from "../interfaces";
import { Token } from "../../tokens/Token";
import * as ObjectPattern from "../../utils/ObjectPattern";
import { Variable } from "./Variable";
import { NewLineSymbol } from "../../tokens/NewLineSymbol";
import { Resource } from "./Resource";
import { IRIResolver } from "sparqler/iri/IRIResolver";

describe( "Module TriplesPattern/TriplesPattern", ():void => {

	it( "Exists", ():void => {
		expect( TriplesPatternModule ).toBeDefined();
		expect( TriplesPatternModule ).toEqual( jasmine.any( Object ) );
	} );

	describe( "Class TriplesPattern", ():void => {

		it( "Exists", ():void => {
			expect( TriplesPattern ).toBeDefined();
			expect( TriplesPattern ).toEqual( jasmine.any( Function ) );
			expect( TriplesPattern ).toBe( TriplesPatternModule.TriplesPattern );
		} );

		it( "Implements ElementPattern and TriplesSameSubject", ():void => {
			let resolver:IRIResolver = new IRIResolver();

			class MockToken extends Token {
				protected getPrettySeparator():string {
					return " ";
				}

				protected getCompactSeparator():string {
					return " ";
				}
			}

			class MockTriplesPattern extends TriplesPattern<GraphPattern> {
				elementTokens:Token[];
			}

			let pattern:TriplesPattern<GraphPattern>;

			pattern = new MockTriplesPattern( resolver );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( TriplesPattern ) );

			// Elements of ElementPattern

			expect( "getSelfTokens" in pattern ).toBe( true );
			expect( pattern.getSelfTokens ).toEqual( jasmine.any( Function ) );


			// Elements of TriplesSameSubject

			expect( "has" in pattern ).toBe( true );
			expect( pattern.has ).toEqual( jasmine.any( Function ) );
		} );

		it( "GraphPattern generic expected to be implemented by its subclasses", ():void => {
			let resolver:IRIResolver = new IRIResolver();

			class MockToken extends Token {
				protected getPrettySeparator():string {
					return " ";
				}

				protected getCompactSeparator():string {
					return " ";
				}
			}

			class MockTriplesPattern extends TriplesPattern<GraphPattern> {
				elementTokens:Token[];
			}

			let pattern:TriplesPattern<GraphPattern>;
			let triplesMore:TriplesSameSubjectMore<GraphPattern> & GraphPattern;

			// Simple pattern block
			pattern = new MockTriplesPattern( resolver );
			triplesMore = pattern.has( "iri", "something" );
			expect( triplesMore.getPattern ).toBeUndefined();

			// Multiple pattern blocks, 1
			pattern = new MockTriplesPattern( resolver );
			triplesMore = pattern
				.has( "iri", "something" )
				.and( "iri", "something-ese" )
			;
			expect( triplesMore.getPattern ).toBeUndefined();

			// Multiple pattern blocks, 2
			pattern = new MockTriplesPattern( resolver );
			triplesMore = pattern
				.has( "iri", "something" )
				.and( "iri", "something-ese" )
				.and( "iri", "something-ese-2" )
				.and( "iri", "something-ese-3" )
				.and( "iri", "last" )
			;
			expect( triplesMore.getPattern ).toBeUndefined();
		} );

		describe( "TriplesPattern.has()", ():void => {
			let resolver:IRIResolver = new IRIResolver();

			class MockToken extends Token {
				protected getPrettySeparator():string {
					return " ";
				}

				protected getCompactSeparator():string {
					return " ";
				}
			}

			class MockTriplesPattern extends TriplesPattern<GraphPattern> {
				elementTokens:Token[];
			}

			it( "Transform the single data to tokens and returns a TriplesSameSubjectMore", ():void => {
				let serializeSpy:jasmine.Spy = spyOn( ObjectPattern, "serialize" ).and.callFake( ( element ):Token[] => {
					return [ new MockToken( "element" ) ];
				} );
				let pattern:TriplesPattern<GraphPattern>;
				let triples:TriplesSameSubjectMore<GraphPattern>;
				let elementPattern:ElementPattern;


				// IRI property

				// String value
				serializeSpy.calls.reset();
				pattern = new MockTriplesPattern( resolver );
				triples = pattern.has( "some:iri", "something" );
				expect( triples ).toBeDefined();

				expect( serializeSpy ).toHaveBeenCalledTimes( 1 );
				expect( serializeSpy ).toHaveBeenCalledWith( "something" );

				// Returns TriplesSameSubject
				expect( "and" in triples ).toBeDefined();
				expect( triples.and ).toEqual( jasmine.any( Function ) );

				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "some:iri" ),
					new MockToken( "element" ),
				] );

				// Number value
				serializeSpy.calls.reset();
				pattern = new MockTriplesPattern( resolver );
				triples = pattern.has( "some:iri", 1.10 );
				expect( triples ).toBeDefined();

				expect( serializeSpy ).toHaveBeenCalledTimes( 1 );
				expect( serializeSpy ).toHaveBeenCalledWith( 1.10 );

				// Returns TriplesSameSubject
				expect( "and" in triples ).toBeDefined();
				expect( triples.and ).toEqual( jasmine.any( Function ) );

				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "some:iri" ),
					new MockToken( "element" ),
				] );

				// ElementPattern value
				serializeSpy.calls.reset();
				pattern = new MockTriplesPattern( resolver );

				elementPattern = { getSelfTokens: () => [ new MockToken( "element-pattern" ) ] };
				triples = pattern.has( "some:iri", <any> elementPattern );
				expect( triples ).toBeDefined();

				expect( serializeSpy ).toHaveBeenCalledTimes( 1 );
				expect( serializeSpy ).toHaveBeenCalledWith( elementPattern );

				// Returns TriplesSameSubject
				expect( "and" in triples ).toBeDefined();
				expect( triples.and ).toEqual( jasmine.any( Function ) );

				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "some:iri" ),
					new MockToken( "element" ),
				] );


				// Variable property

				class MockVar extends Variable {
					constructor() {
						super( resolver, "" );
					}

					getSelfTokens() {
						return [ new MockToken( "the-variable" ) ];
					}
				}

				// String value
				serializeSpy.calls.reset();
				pattern = new MockTriplesPattern( resolver );
				triples = pattern.has( new MockVar(), "something" );
				expect( triples ).toBeDefined();

				expect( serializeSpy ).toHaveBeenCalledTimes( 1 );
				expect( serializeSpy ).toHaveBeenCalledWith( "something" );

				// Returns TriplesSameSubject
				expect( "and" in triples ).toBeDefined();
				expect( triples.and ).toEqual( jasmine.any( Function ) );

				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "the-variable" ),
					new MockToken( "element" ),
				] );

				// Number value
				serializeSpy.calls.reset();
				pattern = new MockTriplesPattern( resolver );
				triples = pattern.has( new MockVar(), 1.10 );
				expect( triples ).toBeDefined();

				expect( serializeSpy ).toHaveBeenCalledTimes( 1 );
				expect( serializeSpy ).toHaveBeenCalledWith( 1.10 );

				// Returns TriplesSameSubject
				expect( "and" in triples ).toBeDefined();
				expect( triples.and ).toEqual( jasmine.any( Function ) );

				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "the-variable" ),
					new MockToken( "element" ),
				] );

				// ElementPattern value
				serializeSpy.calls.reset();
				pattern = new MockTriplesPattern( resolver );

				elementPattern = { getSelfTokens: () => [ new MockToken( "element-pattern" ) ] };
				triples = pattern.has( new MockVar(), <any> elementPattern );
				expect( triples ).toBeDefined();

				expect( serializeSpy ).toHaveBeenCalledTimes( 1 );
				expect( serializeSpy ).toHaveBeenCalledWith( elementPattern );

				// Returns TriplesSameSubject
				expect( "and" in triples ).toBeDefined();
				expect( triples.and ).toEqual( jasmine.any( Function ) );

				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "the-variable" ),
					new MockToken( "element" ),
				] );


				// Resource property

				class MockResource extends Resource {
					constructor() {
						super( resolver, "" );
					}

					getSelfTokens() {
						return [ new MockToken( "the-resource/" ) ];
					}
				}

				// String value
				serializeSpy.calls.reset();
				pattern = new MockTriplesPattern( resolver );
				triples = pattern.has( new MockResource(), "something" );
				expect( triples ).toBeDefined();

				expect( serializeSpy ).toHaveBeenCalledTimes( 1 );
				expect( serializeSpy ).toHaveBeenCalledWith( "something" );

				// Returns TriplesSameSubject
				expect( "and" in triples ).toBeDefined();
				expect( triples.and ).toEqual( jasmine.any( Function ) );

				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "the-resource/" ),
					new MockToken( "element" ),
				] );

				// Number value
				serializeSpy.calls.reset();
				pattern = new MockTriplesPattern( resolver );
				triples = pattern.has( new MockResource(), 1.10 );
				expect( triples ).toBeDefined();

				expect( serializeSpy ).toHaveBeenCalledTimes( 1 );
				expect( serializeSpy ).toHaveBeenCalledWith( 1.10 );

				// Returns TriplesSameSubject
				expect( "and" in triples ).toBeDefined();
				expect( triples.and ).toEqual( jasmine.any( Function ) );

				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "the-resource/" ),
					new MockToken( "element" ),
				] );

				// ElementPattern value
				serializeSpy.calls.reset();
				pattern = new MockTriplesPattern( resolver );

				elementPattern = { getSelfTokens: () => [ new MockToken( "element-pattern" ) ] };
				triples = pattern.has( new MockResource(), <any> elementPattern );
				expect( triples ).toBeDefined();

				expect( serializeSpy ).toHaveBeenCalledTimes( 1 );
				expect( serializeSpy ).toHaveBeenCalledWith( elementPattern );

				// Returns TriplesSameSubject
				expect( "and" in triples ).toBeDefined();
				expect( triples.and ).toEqual( jasmine.any( Function ) );

				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "the-resource/" ),
					new MockToken( "element" ),
				] );
			} );

			it( "Transform the multiple data to tokens and returns a TriplesSameSubjectMore", ():void => {
				let serializeSpy:jasmine.Spy = spyOn( ObjectPattern, "serialize" ).and.callFake( ( element ):Token[] => {
					return [ new MockToken( "element" ) ];
				} );
				let getSelfTokens:Function = () => [ new MockToken( "element-pattern" ) ];

				let pattern:TriplesPattern<GraphPattern>;
				let triples:TriplesSameSubjectMore<GraphPattern>;


				// IRI property

				// String values
				serializeSpy.calls.reset();
				pattern = new MockTriplesPattern( resolver );
				triples = pattern.has( "some:iri", [ "something", "else", "here" ] );
				expect( triples ).toBeDefined();

				expect( serializeSpy ).toHaveBeenCalledTimes( 3 );
				expect( serializeSpy ).toHaveBeenCalledWith( "something" );
				expect( serializeSpy ).toHaveBeenCalledWith( "else" );
				expect( serializeSpy ).toHaveBeenCalledWith( "here" );

				// Returns TriplesSameSubject
				expect( "and" in triples ).toBeDefined();
				expect( triples.and ).toEqual( jasmine.any( Function ) );

				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "some:iri" ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
				] );

				// Multiple values, 1
				serializeSpy.calls.reset();
				pattern = new MockTriplesPattern( resolver );
				triples = pattern.has( "some:iri", [ 1.10, true, "hi" ] );
				expect( triples ).toBeDefined();

				expect( serializeSpy ).toHaveBeenCalledTimes( 3 );
				expect( serializeSpy ).toHaveBeenCalledWith( 1.10 );
				expect( serializeSpy ).toHaveBeenCalledWith( true );
				expect( serializeSpy ).toHaveBeenCalledWith( "hi" );

				// Returns TriplesSameSubject
				expect( "and" in triples ).toBeDefined();
				expect( triples.and ).toEqual( jasmine.any( Function ) );

				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "some:iri" ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
				] );

				// ElementPattern values
				serializeSpy.calls.reset();
				pattern = new MockTriplesPattern( resolver );

				triples = pattern.has( "some:iri", [
					{ getSelfTokens: getSelfTokens } as any,
					{ getSelfTokens: getSelfTokens } as any,
					{ getSelfTokens: getSelfTokens } as any,
				] );
				expect( triples ).toBeDefined();

				expect( serializeSpy ).toHaveBeenCalledTimes( 3 );
				expect( serializeSpy ).toHaveBeenCalledWith( { getSelfTokens: getSelfTokens } );
				expect( serializeSpy ).toHaveBeenCalledWith( { getSelfTokens: getSelfTokens } );
				expect( serializeSpy ).toHaveBeenCalledWith( { getSelfTokens: getSelfTokens } );

				// Returns TriplesSameSubject
				expect( "and" in triples ).toBeDefined();
				expect( triples.and ).toEqual( jasmine.any( Function ) );

				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "some:iri" ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
				] );

				// Multiple values
				serializeSpy.calls.reset();
				pattern = new MockTriplesPattern( resolver );

				triples = pattern.has( "some:iri", [
					{ getSelfTokens: getSelfTokens } as any,
					"hi!",
					{ getSelfTokens: getSelfTokens } as any,
					new Date( 123456 ),
				] );
				expect( triples ).toBeDefined();

				expect( serializeSpy ).toHaveBeenCalledTimes( 4 );
				expect( serializeSpy ).toHaveBeenCalledWith( { getSelfTokens: getSelfTokens } );
				expect( serializeSpy ).toHaveBeenCalledWith( { getSelfTokens: getSelfTokens } );
				expect( serializeSpy ).toHaveBeenCalledWith( "hi!" );
				expect( serializeSpy ).toHaveBeenCalledWith( new Date( 123456 ) );

				// Returns TriplesSameSubject
				expect( "and" in triples ).toBeDefined();
				expect( triples.and ).toEqual( jasmine.any( Function ) );

				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "some:iri" ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
				] );


				// Variable property

				class MockVar extends Variable {
					constructor() {
						super( resolver, "" );
					}

					getSelfTokens():Token[] {
						return [ new MockToken( "the-variable" ) ];
					}
				}

				// String values
				serializeSpy.calls.reset();
				pattern = new MockTriplesPattern( resolver );
				triples = pattern.has( new MockVar(), [ "something", "else", "here" ] );
				expect( triples ).toBeDefined();

				expect( serializeSpy ).toHaveBeenCalledTimes( 3 );
				expect( serializeSpy ).toHaveBeenCalledWith( "something" );
				expect( serializeSpy ).toHaveBeenCalledWith( "else" );
				expect( serializeSpy ).toHaveBeenCalledWith( "here" );

				// Returns TriplesSameSubject
				expect( "and" in triples ).toBeDefined();
				expect( triples.and ).toEqual( jasmine.any( Function ) );

				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "the-variable" ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
				] );

				// Multiple values, 1
				serializeSpy.calls.reset();
				pattern = new MockTriplesPattern( resolver );
				triples = pattern.has( new MockVar(), [ 1.10, true, "hi" ] );
				expect( triples ).toBeDefined();

				expect( serializeSpy ).toHaveBeenCalledTimes( 3 );
				expect( serializeSpy ).toHaveBeenCalledWith( 1.10 );
				expect( serializeSpy ).toHaveBeenCalledWith( true );
				expect( serializeSpy ).toHaveBeenCalledWith( "hi" );

				// Returns TriplesSameSubject
				expect( "and" in triples ).toBeDefined();
				expect( triples.and ).toEqual( jasmine.any( Function ) );

				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "the-variable" ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
				] );

				// ElementPattern values
				serializeSpy.calls.reset();
				pattern = new MockTriplesPattern( resolver );

				triples = pattern.has( new MockVar(), [
					{ getSelfTokens: getSelfTokens } as any,
					{ getSelfTokens: getSelfTokens } as any,
					{ getSelfTokens: getSelfTokens } as any,
				] );
				expect( triples ).toBeDefined();

				expect( serializeSpy ).toHaveBeenCalledTimes( 3 );
				expect( serializeSpy ).toHaveBeenCalledWith( { getSelfTokens: getSelfTokens } );
				expect( serializeSpy ).toHaveBeenCalledWith( { getSelfTokens: getSelfTokens } );
				expect( serializeSpy ).toHaveBeenCalledWith( { getSelfTokens: getSelfTokens } );

				// Returns TriplesSameSubject
				expect( "and" in triples ).toBeDefined();
				expect( triples.and ).toEqual( jasmine.any( Function ) );

				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "the-variable" ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
				] );

				// Multiple values
				serializeSpy.calls.reset();
				pattern = new MockTriplesPattern( resolver );

				triples = pattern.has( new MockVar(), [
					{ getSelfTokens: getSelfTokens } as any,
					"hi!",
					{ getSelfTokens: getSelfTokens } as any,
					new Date( 123456 ),
				] );
				expect( triples ).toBeDefined();

				expect( serializeSpy ).toHaveBeenCalledTimes( 4 );
				expect( serializeSpy ).toHaveBeenCalledWith( { getSelfTokens: getSelfTokens } );
				expect( serializeSpy ).toHaveBeenCalledWith( { getSelfTokens: getSelfTokens } );
				expect( serializeSpy ).toHaveBeenCalledWith( "hi!" );
				expect( serializeSpy ).toHaveBeenCalledWith( new Date( 123456 ) );

				// Returns TriplesSameSubject
				expect( "and" in triples ).toBeDefined();
				expect( triples.and ).toEqual( jasmine.any( Function ) );

				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "the-variable" ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
				] );


				// Resource property

				class MockResource extends Resource {
					constructor() {
						super( resolver, "" );
					}

					getSelfTokens():Token[] {
						return [ new MockToken( "the-resource/" ) ];
					}
				}

				// String values
				serializeSpy.calls.reset();
				pattern = new MockTriplesPattern( resolver );
				triples = pattern.has( new MockResource(), [ "something", "else", "here" ] );
				expect( triples ).toBeDefined();

				expect( serializeSpy ).toHaveBeenCalledTimes( 3 );
				expect( serializeSpy ).toHaveBeenCalledWith( "something" );
				expect( serializeSpy ).toHaveBeenCalledWith( "else" );
				expect( serializeSpy ).toHaveBeenCalledWith( "here" );

				// Returns TriplesSameSubject
				expect( "and" in triples ).toBeDefined();
				expect( triples.and ).toEqual( jasmine.any( Function ) );

				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "the-resource/" ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
				] );

				// Multiple values, 1
				serializeSpy.calls.reset();
				pattern = new MockTriplesPattern( resolver );
				triples = pattern.has( new MockResource(), [ 1.10, true, "hi" ] );
				expect( triples ).toBeDefined();

				expect( serializeSpy ).toHaveBeenCalledTimes( 3 );
				expect( serializeSpy ).toHaveBeenCalledWith( 1.10 );
				expect( serializeSpy ).toHaveBeenCalledWith( true );
				expect( serializeSpy ).toHaveBeenCalledWith( "hi" );

				// Returns TriplesSameSubject
				expect( "and" in triples ).toBeDefined();
				expect( triples.and ).toEqual( jasmine.any( Function ) );

				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "the-resource/" ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
				] );

				// ElementPattern values
				serializeSpy.calls.reset();
				pattern = new MockTriplesPattern( resolver );

				triples = pattern.has( new MockVar(), [
					{ getSelfTokens: getSelfTokens } as any,
					{ getSelfTokens: getSelfTokens } as any,
					{ getSelfTokens: getSelfTokens } as any,
				] );
				expect( triples ).toBeDefined();

				expect( serializeSpy ).toHaveBeenCalledTimes( 3 );
				expect( serializeSpy ).toHaveBeenCalledWith( { getSelfTokens: getSelfTokens } );
				expect( serializeSpy ).toHaveBeenCalledWith( { getSelfTokens: getSelfTokens } );
				expect( serializeSpy ).toHaveBeenCalledWith( { getSelfTokens: getSelfTokens } );

				// Returns TriplesSameSubject
				expect( "and" in triples ).toBeDefined();
				expect( triples.and ).toEqual( jasmine.any( Function ) );

				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "the-variable" ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
				] );

				// Multiple values
				serializeSpy.calls.reset();
				pattern = new MockTriplesPattern( resolver );

				triples = pattern.has( new MockVar(), [
					{ getSelfTokens: getSelfTokens } as any,
					"hi!",
					{ getSelfTokens: getSelfTokens } as any,
					new Date( 123456 ),
				] );
				expect( triples ).toBeDefined();

				expect( serializeSpy ).toHaveBeenCalledTimes( 4 );
				expect( serializeSpy ).toHaveBeenCalledWith( { getSelfTokens: getSelfTokens } );
				expect( serializeSpy ).toHaveBeenCalledWith( { getSelfTokens: getSelfTokens } );
				expect( serializeSpy ).toHaveBeenCalledWith( "hi!" );
				expect( serializeSpy ).toHaveBeenCalledWith( new Date( 123456 ) );

				// Returns TriplesSameSubject
				expect( "and" in triples ).toBeDefined();
				expect( triples.and ).toEqual( jasmine.any( Function ) );

				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "the-variable" ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
				] );
			} );

			it( "Ability to reuse the element to create a new triples pattern", ():void => {
				spyOn( ObjectPattern, "serialize" ).and.callFake( ( value ):Token[] => {
					return [ new MockToken( value ) ];
				} );
				let pattern:TriplesPattern<GraphPattern>;

				// Single values

				pattern = new MockTriplesPattern( resolver );

				// Create first triples pattern
				pattern.has( "iri", "stuff" );
				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "iri" ),
					new MockToken( "stuff" ),
				] );

				// Create new triples pattern
				pattern.has( "new-iri", "new-stuff" );
				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "new-iri" ),
					new MockToken( "new-stuff" ),
				] );


				// Multiple values

				pattern = new MockTriplesPattern( resolver );

				// Create first triples pattern
				pattern.has( "iri", [ "stuff", "more-stuff", "last-stuff" ] );
				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "iri" ),
					new MockToken( "stuff" ),
					new NewLineSymbol( "," ),
					new MockToken( "more-stuff" ),
					new NewLineSymbol( "," ),
					new MockToken( "last-stuff" ),
				] );

				// Create new triples pattern
				pattern.has( "new-iri", [ "new-stuff", "new-last-stuff" ] );
				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "new-iri" ),
					new MockToken( "new-stuff" ),
					new NewLineSymbol( "," ),
					new MockToken( "new-last-stuff" ),
				] );
			} );

		} );

		describe( "TriplesPattern.has().and()", ():void => {
			let resolver:IRIResolver = new IRIResolver();

			class MockToken extends Token {
				protected getPrettySeparator():string {
					return " ";
				}

				protected getCompactSeparator():string {
					return " ";
				}
			}

			class MockTriplesPattern extends TriplesPattern<GraphPattern> {
				elementTokens:Token[];
			}

			it( "Transform the single data to tokens and returns a TriplesSameSubjectMore", ():void => {
				let serializeSpy:jasmine.Spy = spyOn( ObjectPattern, "serialize" ).and.callFake( ( element ):Token[] => {
					return [ new MockToken( "element" ) ];
				} );
				let getSelfTokens:Function = () => [ new MockToken( "element-pattern" ) ];

				let pattern:TriplesPattern<GraphPattern>;
				let triples:TriplesSameSubjectMore<GraphPattern>;


				// IRI property

				// Native values
				serializeSpy.calls.reset();
				pattern = new MockTriplesPattern( resolver );
				triples = pattern
					.has( "some:iri", "something" )
					.and( "another:iri", "something-else" );
				expect( triples ).toBeDefined();

				expect( serializeSpy ).toHaveBeenCalledTimes( 2 );
				expect( serializeSpy ).toHaveBeenCalledWith( "something" );
				expect( serializeSpy ).toHaveBeenCalledWith( "something-else" );

				// Returns TriplesSameSubject
				expect( "and" in triples ).toBeDefined();
				expect( triples.and ).toEqual( jasmine.any( Function ) );

				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "some:iri" ),
					new MockToken( "element" ),
					new NewLineSymbol( ";" ),
					new MockToken( "another:iri" ),
					new MockToken( "element" ),
				] );

				// Multiple values
				serializeSpy.calls.reset();
				pattern = new MockTriplesPattern( resolver );
				triples = pattern
					.has( "some:iri", 1.10 )
					.and( "another:iri", "hi!" )
					.and( "last:iri", { getSelfTokens: getSelfTokens, element: 1 } as any );
				expect( triples ).toBeDefined();

				expect( serializeSpy ).toHaveBeenCalledTimes( 3 );
				expect( serializeSpy ).toHaveBeenCalledWith( 1.10 );
				expect( serializeSpy ).toHaveBeenCalledWith( "hi!" );
				expect( serializeSpy ).toHaveBeenCalledWith( { getSelfTokens: getSelfTokens, element: 1 } );

				// Returns TriplesSameSubject
				expect( "and" in triples ).toBeDefined();
				expect( triples.and ).toEqual( jasmine.any( Function ) );

				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "some:iri" ),
					new MockToken( "element" ),
					new NewLineSymbol( ";" ),
					new MockToken( "another:iri" ),
					new MockToken( "element" ),
					new NewLineSymbol( ";" ),
					new MockToken( "last:iri" ),
					new MockToken( "element" ),
				] );


				// Variable property

				class MockVar extends Variable {
					constructor( private name ) {
						super( resolver, "" );
					}

					getSelfTokens() {
						return [ new MockToken( this.name ) ];
					}
				}

				// Native values
				serializeSpy.calls.reset();
				pattern = new MockTriplesPattern( resolver );
				triples = pattern
					.has( new MockVar( "var" ), "something" )
					.and( new MockVar( "another-var" ), "something-else" );
				expect( triples ).toBeDefined();

				expect( serializeSpy ).toHaveBeenCalledTimes( 2 );
				expect( serializeSpy ).toHaveBeenCalledWith( "something" );
				expect( serializeSpy ).toHaveBeenCalledWith( "something-else" );

				// Returns TriplesSameSubject
				expect( "and" in triples ).toBeDefined();
				expect( triples.and ).toEqual( jasmine.any( Function ) );

				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "var" ),
					new MockToken( "element" ),
					new NewLineSymbol( ";" ),
					new MockToken( "another-var" ),
					new MockToken( "element" ),
				] );

				// Multiple values
				serializeSpy.calls.reset();
				pattern = new MockTriplesPattern( resolver );
				triples = pattern
					.has( new MockVar( "var" ), 1.10 )
					.and( "some:iri", "hi!" )
					.and( new MockVar( "another-var" ), { getSelfTokens: getSelfTokens, element: 1 } as any );
				expect( triples ).toBeDefined();

				expect( serializeSpy ).toHaveBeenCalledTimes( 3 );
				expect( serializeSpy ).toHaveBeenCalledWith( 1.10 );
				expect( serializeSpy ).toHaveBeenCalledWith( "hi!" );
				expect( serializeSpy ).toHaveBeenCalledWith( { getSelfTokens: getSelfTokens, element: 1 } );

				// Returns TriplesSameSubject
				expect( "and" in triples ).toBeDefined();
				expect( triples.and ).toEqual( jasmine.any( Function ) );

				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "var" ),
					new MockToken( "element" ),
					new NewLineSymbol( ";" ),
					new MockToken( "some:iri" ),
					new MockToken( "element" ),
					new NewLineSymbol( ";" ),
					new MockToken( "another-var" ),
					new MockToken( "element" ),
				] );


				// Resource property

				class MockResource extends Variable {
					constructor( private name ) {
						super( resolver, "" );
					}

					getSelfTokens() {
						return [ new MockToken( this.name ) ];
					}
				}

				// Native values
				serializeSpy.calls.reset();
				pattern = new MockTriplesPattern( resolver );
				triples = pattern
					.has( new MockResource( "resource/" ), "something" )
					.and( new MockResource( "another-resource/" ), "something-else" );
				expect( triples ).toBeDefined();

				expect( serializeSpy ).toHaveBeenCalledTimes( 2 );
				expect( serializeSpy ).toHaveBeenCalledWith( "something" );
				expect( serializeSpy ).toHaveBeenCalledWith( "something-else" );

				// Returns TriplesSameSubject
				expect( "and" in triples ).toBeDefined();
				expect( triples.and ).toEqual( jasmine.any( Function ) );

				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "resource/" ),
					new MockToken( "element" ),
					new NewLineSymbol( ";" ),
					new MockToken( "another-resource/" ),
					new MockToken( "element" ),
				] );

				// Multiple values
				serializeSpy.calls.reset();
				pattern = new MockTriplesPattern( resolver );
				triples = pattern
					.has( new MockResource( "resource/" ), 1.10 )
					.and( "some:iri", "hi!" )
					.and( new MockResource( "another-resource/" ), { getSelfTokens: getSelfTokens, element: 1 } as any );
				expect( triples ).toBeDefined();

				expect( serializeSpy ).toHaveBeenCalledTimes( 3 );
				expect( serializeSpy ).toHaveBeenCalledWith( 1.10 );
				expect( serializeSpy ).toHaveBeenCalledWith( "hi!" );
				expect( serializeSpy ).toHaveBeenCalledWith( { getSelfTokens: getSelfTokens, element: 1 } );

				// Returns TriplesSameSubject
				expect( "and" in triples ).toBeDefined();
				expect( triples.and ).toEqual( jasmine.any( Function ) );

				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "resource/" ),
					new MockToken( "element" ),
					new NewLineSymbol( ";" ),
					new MockToken( "some:iri" ),
					new MockToken( "element" ),
					new NewLineSymbol( ";" ),
					new MockToken( "another-resource/" ),
					new MockToken( "element" ),
				] );
			} );

			it( "Transform the multiple data to tokens and returns a TriplesSameSubjectMore", ():void => {
				let serializeSpy:jasmine.Spy = spyOn( ObjectPattern, "serialize" ).and.callFake( ( element ):Token[] => {
					return [ new MockToken( "element" ) ];
				} );
				let getSelfTokens:Function = () => [ new MockToken( "element-pattern" ) ];

				let pattern:TriplesPattern<GraphPattern>;
				let triples:TriplesSameSubjectMore<GraphPattern>;


				// IRI property

				// String values
				serializeSpy.calls.reset();
				pattern = new MockTriplesPattern( resolver );
				triples = pattern
					.has( "some:iri", [ "something", "else", "here" ] )
					.and( "another:iri", [ "another", "thing" ] );
				expect( triples ).toBeDefined();

				expect( serializeSpy ).toHaveBeenCalledTimes( 5 );
				expect( serializeSpy ).toHaveBeenCalledWith( "something" );
				expect( serializeSpy ).toHaveBeenCalledWith( "else" );
				expect( serializeSpy ).toHaveBeenCalledWith( "here" );
				expect( serializeSpy ).toHaveBeenCalledWith( "another" );
				expect( serializeSpy ).toHaveBeenCalledWith( "thing" );

				// Returns TriplesSameSubject
				expect( "and" in triples ).toBeDefined();
				expect( triples.and ).toEqual( jasmine.any( Function ) );

				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "some:iri" ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( ";" ),
					new MockToken( "another:iri" ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
				] );

				// Multiple values
				serializeSpy.calls.reset();
				pattern = new MockTriplesPattern( resolver );
				triples = pattern
					.has( "some:iri", [ 1.10, true, "hi" ] )
					.and( "another:iri", "one-element" )
					.and( "another-more:iri", [ new Date( 123456 ), { getSelfTokens: getSelfTokens, first: true } as any ] )
					.and( "last:iri", [ { getSelfTokens: getSelfTokens, second: true } as any, 1, 2, 3 ] );
				expect( triples ).toBeDefined();

				expect( serializeSpy ).toHaveBeenCalledTimes( 10 );
				expect( serializeSpy ).toHaveBeenCalledWith( 1.10 );
				expect( serializeSpy ).toHaveBeenCalledWith( true );
				expect( serializeSpy ).toHaveBeenCalledWith( "hi" );
				expect( serializeSpy ).toHaveBeenCalledWith( "one-element" );
				expect( serializeSpy ).toHaveBeenCalledWith( new Date( 123456 ) );
				expect( serializeSpy ).toHaveBeenCalledWith( { getSelfTokens: getSelfTokens, first: true } );
				expect( serializeSpy ).toHaveBeenCalledWith( { getSelfTokens: getSelfTokens, second: true } );
				expect( serializeSpy ).toHaveBeenCalledWith( 1 );
				expect( serializeSpy ).toHaveBeenCalledWith( 2 );
				expect( serializeSpy ).toHaveBeenCalledWith( 3 );

				// Returns TriplesSameSubject
				expect( "and" in triples ).toBeDefined();
				expect( triples.and ).toEqual( jasmine.any( Function ) );

				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "some:iri" ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( ";" ),
					new MockToken( "another:iri" ),
					new MockToken( "element" ),
					new NewLineSymbol( ";" ),
					new MockToken( "another-more:iri" ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( ";" ),
					new MockToken( "last:iri" ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
				] );


				// Variable property

				class MockVar extends Variable {
					constructor( private name ) {
						super( resolver, "" );
					}

					getSelfTokens():Token[] {
						return [ new MockToken( this.name ) ];
					}
				}


				// String values
				serializeSpy.calls.reset();
				pattern = new MockTriplesPattern( resolver );
				triples = pattern
					.has( new MockVar( "some-var" ), [ "something", "else", "here" ] )
					.and( new MockVar( "another-var" ), [ "another", "thing" ] );
				expect( triples ).toBeDefined();

				expect( serializeSpy ).toHaveBeenCalledTimes( 5 );
				expect( serializeSpy ).toHaveBeenCalledWith( "something" );
				expect( serializeSpy ).toHaveBeenCalledWith( "else" );
				expect( serializeSpy ).toHaveBeenCalledWith( "here" );
				expect( serializeSpy ).toHaveBeenCalledWith( "another" );
				expect( serializeSpy ).toHaveBeenCalledWith( "thing" );

				// Returns TriplesSameSubject
				expect( "and" in triples ).toBeDefined();
				expect( triples.and ).toEqual( jasmine.any( Function ) );

				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "some-var" ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( ";" ),
					new MockToken( "another-var" ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
				] );

				// Multiple values
				serializeSpy.calls.reset();
				pattern = new MockTriplesPattern( resolver );
				triples = pattern
					.has( "some:iri", [ 1.10, true, "hi" ] )
					.and( "another:iri", "one-element" )
					.and( "another-more:iri", [ new Date( 123456 ), { getSelfTokens: getSelfTokens, first: true } as any ] )
					.and( "last:iri", [ { getSelfTokens: getSelfTokens, second: true } as any, 1, 2, 3 ] );
				expect( triples ).toBeDefined();


				expect( serializeSpy ).toHaveBeenCalledTimes( 10 );
				expect( serializeSpy ).toHaveBeenCalledWith( 1.10 );
				expect( serializeSpy ).toHaveBeenCalledWith( true );
				expect( serializeSpy ).toHaveBeenCalledWith( "hi" );
				expect( serializeSpy ).toHaveBeenCalledWith( "one-element" );
				expect( serializeSpy ).toHaveBeenCalledWith( new Date( 123456 ) );
				expect( serializeSpy ).toHaveBeenCalledWith( { getSelfTokens: getSelfTokens, first: true } );
				expect( serializeSpy ).toHaveBeenCalledWith( { getSelfTokens: getSelfTokens, second: true } );
				expect( serializeSpy ).toHaveBeenCalledWith( 1 );
				expect( serializeSpy ).toHaveBeenCalledWith( 2 );
				expect( serializeSpy ).toHaveBeenCalledWith( 3 );

				// Returns TriplesSameSubject
				expect( "and" in triples ).toBeDefined();
				expect( triples.and ).toEqual( jasmine.any( Function ) );

				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "some:iri" ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( ";" ),
					new MockToken( "another:iri" ),
					new MockToken( "element" ),
					new NewLineSymbol( ";" ),
					new MockToken( "another-more:iri" ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( ";" ),
					new MockToken( "last:iri" ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
				] );


				// Resource property

				class MockResource extends Resource {
					constructor( private name ) {
						super( resolver, "" );
					}

					getSelfTokens():Token[] {
						return [ new MockToken( this.name ) ];
					}
				}


				// String values
				serializeSpy.calls.reset();
				pattern = new MockTriplesPattern( resolver );
				triples = pattern
					.has( new MockResource( "some-resource/" ), [ "something", "else", "here" ] )
					.and( new MockResource( "another-resource/" ), [ "another", "thing" ] );
				expect( triples ).toBeDefined();

				expect( serializeSpy ).toHaveBeenCalledTimes( 5 );
				expect( serializeSpy ).toHaveBeenCalledWith( "something" );
				expect( serializeSpy ).toHaveBeenCalledWith( "else" );
				expect( serializeSpy ).toHaveBeenCalledWith( "here" );
				expect( serializeSpy ).toHaveBeenCalledWith( "another" );
				expect( serializeSpy ).toHaveBeenCalledWith( "thing" );

				// Returns TriplesSameSubject
				expect( "and" in triples ).toBeDefined();
				expect( triples.and ).toEqual( jasmine.any( Function ) );

				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "some-resource/" ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( ";" ),
					new MockToken( "another-resource/" ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
				] );

				// Multiple values
				serializeSpy.calls.reset();
				pattern = new MockTriplesPattern( resolver );
				triples = pattern
					.has( "some:iri", [ 1.10, true, "hi" ] )
					.and( "another:iri", "one-element" )
					.and( "another-more:iri", [ new Date( 123456 ), { getSelfTokens: getSelfTokens, first: true } as any ] )
					.and( "last:iri", [ { getSelfTokens: getSelfTokens, second: true } as any, 1, 2, 3 ] );
				expect( triples ).toBeDefined();


				expect( serializeSpy ).toHaveBeenCalledTimes( 10 );
				expect( serializeSpy ).toHaveBeenCalledWith( 1.10 );
				expect( serializeSpy ).toHaveBeenCalledWith( true );
				expect( serializeSpy ).toHaveBeenCalledWith( "hi" );
				expect( serializeSpy ).toHaveBeenCalledWith( "one-element" );
				expect( serializeSpy ).toHaveBeenCalledWith( new Date( 123456 ) );
				expect( serializeSpy ).toHaveBeenCalledWith( { getSelfTokens: getSelfTokens, first: true } );
				expect( serializeSpy ).toHaveBeenCalledWith( { getSelfTokens: getSelfTokens, second: true } );
				expect( serializeSpy ).toHaveBeenCalledWith( 1 );
				expect( serializeSpy ).toHaveBeenCalledWith( 2 );
				expect( serializeSpy ).toHaveBeenCalledWith( 3 );

				// Returns TriplesSameSubject
				expect( "and" in triples ).toBeDefined();
				expect( triples.and ).toEqual( jasmine.any( Function ) );

				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "some:iri" ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( ";" ),
					new MockToken( "another:iri" ),
					new MockToken( "element" ),
					new NewLineSymbol( ";" ),
					new MockToken( "another-more:iri" ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( ";" ),
					new MockToken( "last:iri" ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
					new NewLineSymbol( "," ),
					new MockToken( "element" ),
				] );
			} );

			it( "Ability to reuse the element to create a new triples pattern", ():void => {
				spyOn( ObjectPattern, "serialize" ).and.callFake( ( value ):Token[] => {
					return [ new MockToken( value ) ];
				} );
				let pattern:TriplesPattern<GraphPattern>;

				// Single values

				pattern = new MockTriplesPattern( resolver );

				// Create first triples pattern
				pattern
					.has( "iri-1", "stuff-1" )
					.and( "iri-2", "stuff-2" )
					.and( "iri-3", "stuff-3" )
				;
				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "iri-1" ),
					new MockToken( "stuff-1" ),
					new NewLineSymbol( ";" ),
					new MockToken( "iri-2" ),
					new MockToken( "stuff-2" ),
					new NewLineSymbol( ";" ),
					new MockToken( "iri-3" ),
					new MockToken( "stuff-3" ),
				] );

				// Create new triples pattern
				pattern
					.has( "new-iri-1", "new-stuff-1" )
					.and( "new-iri-2", "new-stuff-2" )
					.and( "new-iri-3", "new-stuff-3" )
				;
				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "new-iri-1" ),
					new MockToken( "new-stuff-1" ),
					new NewLineSymbol( ";" ),
					new MockToken( "new-iri-2" ),
					new MockToken( "new-stuff-2" ),
					new NewLineSymbol( ";" ),
					new MockToken( "new-iri-3" ),
					new MockToken( "new-stuff-3" ),
				] );


				// Multiple values

				pattern = new MockTriplesPattern( resolver );

				// Create first triples pattern
				pattern
					.has( "iri-1", [ "stuff-1", "more-stuff-1", "last-stuff-1" ] )
					.and( "iri-2", [ "stuff-2", "more-stuff-2", "last-stuff-2" ] )
					.and( "iri-3", "stuff-3" )
				;
				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "iri-1" ),
					new MockToken( "stuff-1" ),
					new NewLineSymbol( "," ),
					new MockToken( "more-stuff-1" ),
					new NewLineSymbol( "," ),
					new MockToken( "last-stuff-1" ),
					new NewLineSymbol( ";" ),
					new MockToken( "iri-2" ),
					new MockToken( "stuff-2" ),
					new NewLineSymbol( "," ),
					new MockToken( "more-stuff-2" ),
					new NewLineSymbol( "," ),
					new MockToken( "last-stuff-2" ),
					new NewLineSymbol( ";" ),
					new MockToken( "iri-3" ),
					new MockToken( "stuff-3" ),
				] );

				// Create new triples pattern
				pattern
					.has( "new-iri-1", [ "new-stuff-1", "new-last-stuff-1" ] )
					.and( "new-iri-2", "new-stuff-2" )
					.and( "new-iri-3", [ "new-stuff-3", "new-more-stuff-3", "new-last-stuff-3" ] )
				;
				expect( pattern[ "patternTokens" ] ).toEqual( [
					new MockToken( "new-iri-1" ),
					new MockToken( "new-stuff-1" ),
					new NewLineSymbol( "," ),
					new MockToken( "new-last-stuff-1" ),
					new NewLineSymbol( ";" ),
					new MockToken( "new-iri-2" ),
					new MockToken( "new-stuff-2" ),
					new NewLineSymbol( ";" ),
					new MockToken( "new-iri-3" ),
					new MockToken( "new-stuff-3" ),
					new NewLineSymbol( "," ),
					new MockToken( "new-more-stuff-3" ),
					new NewLineSymbol( "," ),
					new MockToken( "new-last-stuff-3" ),
				] );
			} );

		} );

	} );

} );
