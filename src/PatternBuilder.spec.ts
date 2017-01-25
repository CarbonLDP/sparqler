import * as PatternBuilderModule from "./PatternBuilder";
import PatternBuilder from "./PatternBuilder";

import {
	IRIResolver,
	SingleValuesPattern,
	MultipleValuesPattern
} from "./Patterns";
import { StringLiteral } from "./Tokens/StringLiteral";
import { Resource } from "./TriplesPatterns/Resource";
import { Variable } from "./TriplesPatterns/Variable";
import {
	Literal,
	RDFLiteral,
	NumericLiteral,
	BooleanLiteral
} from "./TriplesPatterns/Literals";
import { Collection } from "./TriplesPatterns/Collection";
import { BlankNode } from "./TriplesPatterns/BlankNode";
import * as NotTriplesPatternModule from "./NotTriplesPatterns/NotTriplesPattern";
import { NotTriplesPattern } from "./NotTriplesPatterns/NotTriplesPattern";
import { Identifier } from "./Tokens/Identifier";
import { LeftSymbol } from "./Tokens/LeftSymbol";
import { RightSymbol } from "./Tokens/RightSymbol";
import { Token } from "./Tokens/Token";
import { NewLineSymbol } from "./Tokens/NewLineSymbol";
import * as ValuesPatternModule from "./NotTriplesPatterns/ValuesPattern";

describe( "Module PatternBuilder", ():void => {

	it( "Exists", ():void => {
		expect( PatternBuilderModule ).toBeDefined();
		expect( PatternBuilderModule ).toEqual( jasmine.any( Object ) );
	} );

	describe( "Class PatternBuilder", ():void => {

		it( "Exists", ():void => {
			expect( PatternBuilder ).toBeDefined();
			expect( PatternBuilder ).toEqual( jasmine.any( Function ) );
			expect( PatternBuilder ).toBe( PatternBuilderModule.PatternBuilder );
		} );

		it( "Constructor", ():void => {
			let resolver:IRIResolver = {
				_resolveIRI: ( iri:string ) => {
					return [ new StringLiteral( iri ) ];
				}
			};
			let builder:PatternBuilder = new PatternBuilder( resolver );

			expect( builder ).toBeDefined();
			expect( builder ).toEqual( jasmine.any( PatternBuilder ) );
		} );

		it( "Implements Builders", ():void => {
			let resolver:IRIResolver = {
				_resolveIRI: ( iri:string ) => {
					return [ new StringLiteral( iri ) ];
				}
			};
			let builder:PatternBuilder = new PatternBuilder( resolver );

			// Triples patterns

			expect( "resource" in builder ).toBe( true );
			expect( builder.resource ).toEqual( jasmine.any( Function ) );

			expect( "var" in builder ).toBe( true );
			expect( builder.var ).toEqual( jasmine.any( Function ) );

			expect( "literal" in builder ).toBe( true );
			expect( builder.literal ).toEqual( jasmine.any( Function ) );

			expect( "collection" in builder ).toBe( true );
			expect( builder.collection ).toEqual( jasmine.any( Function ) );

			expect( "blankNode" in builder ).toBe( true );
			expect( builder.blankNode ).toEqual( jasmine.any( Function ) );


			// Not triples pattern

			expect( "graph" in builder ).toBe( true );
			expect( builder.graph ).toEqual( jasmine.any( Function ) );

			expect( "optional" in builder ).toBe( true );
			expect( builder.optional ).toEqual( jasmine.any( Function ) );

			expect( "union" in builder ).toBe( true );
			expect( builder.union ).toEqual( jasmine.any( Function ) );

			expect( "minus" in builder ).toBe( true );
			expect( builder.minus ).toEqual( jasmine.any( Function ) );

			expect( "values" in builder ).toBe( true );
			expect( builder.values ).toEqual( jasmine.any( Function ) );

			expect( "undefined" in builder ).toBe( true );
			expect( builder.undefined ).toEqual( jasmine.any( String ) );
		} );

		// Test the methods

		it( "PatternBuilder.resource()", ():void => {
			let resolver:IRIResolver = {
				_resolveIRI: ( iri:string ) => {
					return [ new StringLiteral( iri ) ];
				}
			};
			let builder:PatternBuilder = new PatternBuilder( resolver );

			let resource:Resource = builder.resource( "http://example.com/" );
			expect( resource ).toBeDefined();
			expect( resource ).toEqual( jasmine.any( Resource ) );
		} );

		it( "PatternBuilder.var()", ():void => {
			let resolver:IRIResolver = {
				_resolveIRI: ( iri:string ) => {
					return [ new StringLiteral( iri ) ];
				}
			};
			let builder:PatternBuilder = new PatternBuilder( resolver );

			let variable:Variable = builder.var( "name" );
			expect( variable ).toBeDefined();
			expect( variable ).toEqual( jasmine.any( Variable ) );
		} );

		it( "PatternBuilder.literal()", ():void => {
			let resolver:IRIResolver = {
				_resolveIRI: ( iri:string ) => {
					return [ new StringLiteral( iri ) ];
				}
			};
			let builder:PatternBuilder = new PatternBuilder( resolver );
			let literal:Literal;

			// With string returns an RDFLiteral
			literal = builder.literal( "something" );
			expect( literal ).toBeDefined();
			expect( literal ).toEqual( jasmine.any( RDFLiteral ) );

			literal = builder.literal( "http://example.com/iri/as/literal" );
			expect( literal ).toBeDefined();
			expect( literal ).toEqual( jasmine.any( RDFLiteral ) );

			// With number returns an NumericLiteral
			literal = builder.literal( 1 );
			expect( literal ).toBeDefined();
			expect( literal ).toEqual( jasmine.any( NumericLiteral ) );

			literal = builder.literal( 731 );
			expect( literal ).toBeDefined();
			expect( literal ).toEqual( jasmine.any( NumericLiteral ) );

			literal = builder.literal( 3.1 );
			expect( literal ).toBeDefined();
			expect( literal ).toEqual( jasmine.any( NumericLiteral ) );

			// With number returns an NumericLiteral
			literal = builder.literal( true );
			expect( literal ).toBeDefined();
			expect( literal ).toEqual( jasmine.any( BooleanLiteral ) );

			literal = builder.literal( false );
			expect( literal ).toBeDefined();
			expect( literal ).toEqual( jasmine.any( BooleanLiteral ) );

			// Another type throw an error
			expect( () => builder.literal( <any> new Date() ) ).toThrowError( "InvalidArgumentError: No valid value of a literal was provided." );
		} );

		it( "PatternBuilder.collection()", ():void => {
			let resolver:IRIResolver = {
				_resolveIRI: ( iri:string ) => {
					return [ new StringLiteral( iri ) ];
				}
			};
			let builder:PatternBuilder = new PatternBuilder( resolver );
			let collection:Collection;

			// Normal usage
			collection = builder.collection( "hello", "world", "!!" );
			expect( collection ).toBeDefined();
			expect( collection ).toEqual( jasmine.any( Collection ) );

			collection = builder.collection( 1, true, "hi!" );
			expect( collection ).toBeDefined();
			expect( collection ).toEqual( jasmine.any( Collection ) );

			// Must provide at least one parameter
			expect( () => builder.collection() ).toThrowError( "InvalidArgumentError: The collection needs at least one value." );
		} );

		it( "PatternBuilder.blankNode()", ():void => {
			let resolver:IRIResolver = {
				_resolveIRI: ( iri:string ) => {
					return [ new StringLiteral( iri ) ];
				}
			};
			let builder:PatternBuilder = new PatternBuilder( resolver );
			let blankNode:BlankNode;

			// Normal usage
			blankNode = builder.blankNode();
			expect( blankNode ).toBeDefined();
			expect( blankNode ).toEqual( jasmine.any( BlankNode ) );
		} );

		it( "PatternBuilder.graph()", ():void => {
			class MockToken extends Token {
				protected getPrettySeparator():string {
					return " ";
				}

				protected getCompactSeparator():string {
					return " ";
				}
			}
			let resolver:IRIResolver = {
				_resolveIRI: ( iri:string ) => {
					return [ new StringLiteral( iri ) ];
				}
			};
			let builder:PatternBuilder = new PatternBuilder( resolver );
			let constructorSpy = spyOn( NotTriplesPatternModule, "NotTriplesPattern" ).and.callThrough();
			let pattern:NotTriplesPattern;

			// Usage with an IRI parameter

			// Empty patterns
			pattern = builder.graph( "http://example.com/resource/", [] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( constructorSpy ).toHaveBeenCalledTimes( 1 );
			expect( constructorSpy.calls.mostRecent().args[ 0 ] ).toEqual( [
				new Identifier( "GRAPH" ), new StringLiteral( "http://example.com/resource/" ),
				new LeftSymbol( "{" ),
				new RightSymbol( "}" ),
			] );

			// Single pattern
			constructorSpy.calls.reset();
			pattern = builder.graph( "http://example.com/resource/", { getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] } );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( constructorSpy ).toHaveBeenCalledTimes( 1 );
			expect( constructorSpy.calls.mostRecent().args[ 0 ] ).toEqual( [
				new Identifier( "GRAPH" ), new StringLiteral( "http://example.com/resource/" ),
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ),
				new MockToken( "token-2" ),
				new RightSymbol( "}" ),
			] );

			// Single pattern in an array
			constructorSpy.calls.reset();
			pattern = builder.graph( "http://example.com/resource/", [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] }
			] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( constructorSpy ).toHaveBeenCalledTimes( 1 );
			expect( constructorSpy.calls.mostRecent().args[ 0 ] ).toEqual( [
				new Identifier( "GRAPH" ), new StringLiteral( "http://example.com/resource/" ),
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ),
				new MockToken( "token-2" ),
				new RightSymbol( "}" ),
			] );

			// Multiple patterns
			constructorSpy.calls.reset();
			pattern = builder.graph( "http://example.com/resource/", [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
				{ getPattern: () => [ new MockToken( "token-3" ), new MockToken( "token-4" ) ] },
			] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( constructorSpy ).toHaveBeenCalledTimes( 1 );
			expect( constructorSpy.calls.mostRecent().args[ 0 ] ).toEqual( [
				new Identifier( "GRAPH" ), new StringLiteral( "http://example.com/resource/" ),
				new NewLineSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ), new NewLineSymbol( "." ),
				new MockToken( "token-3" ), new MockToken( "token-4" ),
				new NewLineSymbol( "}" ),
			] );

			// Usage with an VAR parameter

			class MockVar extends Variable {
				constructor() {
					super( resolver, "" );
				}

				getSelfTokens():Token[] {
					return [ new MockToken( "variable" ) ];
				}
			}

			// Empty patterns
			constructorSpy.calls.reset();
			pattern = builder.graph( new MockVar(), [] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( constructorSpy ).toHaveBeenCalledTimes( 1 );
			expect( constructorSpy.calls.mostRecent().args[ 0 ] ).toEqual( [
				new Identifier( "GRAPH" ), new MockToken( "variable" ),
				new LeftSymbol( "{" ),
				new RightSymbol( "}" ),
			] );

			// Single pattern
			constructorSpy.calls.reset();
			pattern = builder.graph( new MockVar(), { getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] } );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( constructorSpy ).toHaveBeenCalledTimes( 1 );
			expect( constructorSpy.calls.mostRecent().args[ 0 ] ).toEqual( [
				new Identifier( "GRAPH" ), new MockToken( "variable" ),
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ),
				new MockToken( "token-2" ),
				new RightSymbol( "}" ),
			] );

			// Single pattern in an array
			constructorSpy.calls.reset();
			pattern = builder.graph( new MockVar(), [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] }
			] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( constructorSpy ).toHaveBeenCalledTimes( 1 );
			expect( constructorSpy.calls.mostRecent().args[ 0 ] ).toEqual( [
				new Identifier( "GRAPH" ), new MockToken( "variable" ),
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ),
				new MockToken( "token-2" ),
				new RightSymbol( "}" ),
			] );

			// Multiple patterns
			constructorSpy.calls.reset();
			pattern = builder.graph( new MockVar(), [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
				{ getPattern: () => [ new MockToken( "token-3" ), new MockToken( "token-4" ) ] },
			] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( constructorSpy ).toHaveBeenCalledTimes( 1 );
			expect( constructorSpy.calls.mostRecent().args[ 0 ] ).toEqual( [
				new Identifier( "GRAPH" ), new MockToken( "variable" ),
				new NewLineSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ), new NewLineSymbol( "." ),
				new MockToken( "token-3" ), new MockToken( "token-4" ),
				new NewLineSymbol( "}" ),
			] );
		} );

		it( "PatternBuilder.optional()", ():void => {
			class MockToken extends Token {
				protected getPrettySeparator():string {
					return " ";
				}

				protected getCompactSeparator():string {
					return " ";
				}
			}
			let resolver:IRIResolver = {
				_resolveIRI: ( iri:string ) => {
					return [ new StringLiteral( iri ) ];
				}
			};
			let builder:PatternBuilder = new PatternBuilder( resolver );
			let constructorSpy = spyOn( NotTriplesPatternModule, "NotTriplesPattern" ).and.callThrough();
			let pattern:NotTriplesPattern;

			// Empty pattern
			constructorSpy.calls.reset();
			pattern = builder.optional( [] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( constructorSpy ).toHaveBeenCalledTimes( 1 );
			expect( constructorSpy.calls.mostRecent().args[ 0 ] ).toEqual( [
				new Identifier( "OPTIONAL" ),
				new LeftSymbol( "{" ),
				new RightSymbol( "}" ),
			] );

			// Single pattern
			constructorSpy.calls.reset();
			pattern = builder.optional( { getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] } );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( constructorSpy ).toHaveBeenCalledTimes( 1 );
			expect( constructorSpy.calls.mostRecent().args[ 0 ] ).toEqual( [
				new Identifier( "OPTIONAL" ),
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
			] );

			// Single pattern in an array
			constructorSpy.calls.reset();
			pattern = builder.optional( [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] }
			] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( constructorSpy ).toHaveBeenCalledTimes( 1 );
			expect( constructorSpy.calls.mostRecent().args[ 0 ] ).toEqual( [
				new Identifier( "OPTIONAL" ),
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
			] );

			// Multiple patterns
			constructorSpy.calls.reset();
			pattern = builder.optional( [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
				{ getPattern: () => [ new MockToken( "token-3" ), new MockToken( "token-4" ) ] },
			] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( constructorSpy ).toHaveBeenCalledTimes( 1 );
			expect( constructorSpy.calls.mostRecent().args[ 0 ] ).toEqual( [
				new Identifier( "OPTIONAL" ),
				new NewLineSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ), new NewLineSymbol( "." ),
				new MockToken( "token-3" ), new MockToken( "token-4" ),
				new NewLineSymbol( "}" ),
			] );
		} );

		it( "PatternBuilder.union()", ():void => {
			class MockToken extends Token {
				protected getPrettySeparator():string {
					return " ";
				}

				protected getCompactSeparator():string {
					return " ";
				}
			}
			let resolver:IRIResolver = {
				_resolveIRI: ( iri:string ) => {
					return [ new StringLiteral( iri ) ];
				}
			};
			let builder:PatternBuilder = new PatternBuilder( resolver );
			let constructorSpy = spyOn( NotTriplesPatternModule, "NotTriplesPattern" ).and.callThrough();
			let pattern:NotTriplesPattern;

			// Empty patterns
			constructorSpy.calls.reset();
			pattern = builder.union( [], [] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( constructorSpy ).toHaveBeenCalledTimes( 1 );
			expect( constructorSpy.calls.mostRecent().args[ 0 ] ).toEqual( [
				new LeftSymbol( "{" ),
				new RightSymbol( "}" ),
				new Identifier( "UNION" ),
				new LeftSymbol( "{" ),
				new RightSymbol( "}" ),
			] );

			// Empty and single pattern
			constructorSpy.calls.reset();
			pattern = builder.union( [], { getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] } );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( constructorSpy ).toHaveBeenCalledTimes( 1 );
			expect( constructorSpy.calls.mostRecent().args[ 0 ] ).toEqual( [
				new LeftSymbol( "{" ),
				new RightSymbol( "}" ),
				new Identifier( "UNION" ),
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
			] );

			// Empty and single pattern in an array
			constructorSpy.calls.reset();
			pattern = builder.union( [], [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] }
			] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( constructorSpy ).toHaveBeenCalledTimes( 1 );
			expect( constructorSpy.calls.mostRecent().args[ 0 ] ).toEqual( [
				new LeftSymbol( "{" ),
				new RightSymbol( "}" ),
				new Identifier( "UNION" ),
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
			] );

			// Empty and multiple patterns
			constructorSpy.calls.reset();
			pattern = builder.union( [], [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
				{ getPattern: () => [ new MockToken( "token-3" ), new MockToken( "token-4" ) ] },
			] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( constructorSpy ).toHaveBeenCalledTimes( 1 );
			expect( constructorSpy.calls.mostRecent().args[ 0 ] ).toEqual( [
				new LeftSymbol( "{" ),
				new RightSymbol( "}" ),
				new Identifier( "UNION" ),
				new NewLineSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ), new NewLineSymbol( "." ),
				new MockToken( "token-3" ), new MockToken( "token-4" ),
				new NewLineSymbol( "}" ),
			] );

			// Single and empty pattern
			constructorSpy.calls.reset();
			pattern = builder.union( { getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] }, [] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( constructorSpy ).toHaveBeenCalledTimes( 1 );
			expect( constructorSpy.calls.mostRecent().args[ 0 ] ).toEqual( [
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
				new Identifier( "UNION" ),
				new LeftSymbol( "{" ),
				new RightSymbol( "}" ),
			] );

			// Singles patterns
			constructorSpy.calls.reset();
			pattern = builder.union(
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
			);
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( constructorSpy ).toHaveBeenCalledTimes( 1 );
			expect( constructorSpy.calls.mostRecent().args[ 0 ] ).toEqual( [
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
				new Identifier( "UNION" ),
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
			] );

			// Single pattern and single pattern in an array
			constructorSpy.calls.reset();
			pattern = builder.union( { getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] }, [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] }
			] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( constructorSpy ).toHaveBeenCalledTimes( 1 );
			expect( constructorSpy.calls.mostRecent().args[ 0 ] ).toEqual( [
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
				new Identifier( "UNION" ),
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
			] );

			// Empty and multiple patterns
			constructorSpy.calls.reset();
			pattern = builder.union( { getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] }, [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
				{ getPattern: () => [ new MockToken( "token-3" ), new MockToken( "token-4" ) ] },
			] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( constructorSpy ).toHaveBeenCalledTimes( 1 );
			expect( constructorSpy.calls.mostRecent().args[ 0 ] ).toEqual( [
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
				new Identifier( "UNION" ),
				new NewLineSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ), new NewLineSymbol( "." ),
				new MockToken( "token-3" ), new MockToken( "token-4" ),
				new NewLineSymbol( "}" ),
			] );

			// Single pattern in array and empty pattern
			constructorSpy.calls.reset();
			pattern = builder.union( [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] }
			], [] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( constructorSpy ).toHaveBeenCalledTimes( 1 );
			expect( constructorSpy.calls.mostRecent().args[ 0 ] ).toEqual( [
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
				new Identifier( "UNION" ),
				new LeftSymbol( "{" ),
				new RightSymbol( "}" ),
			] );

			// Single pattern in array and single pattern
			constructorSpy.calls.reset();
			pattern = builder.union( [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] }
			], { getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] } );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( constructorSpy ).toHaveBeenCalledTimes( 1 );
			expect( constructorSpy.calls.mostRecent().args[ 0 ] ).toEqual( [
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
				new Identifier( "UNION" ),
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
			] );

			// Single pattern in array and single pattern in an array
			constructorSpy.calls.reset();
			pattern = builder.union( [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] }
			], [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] }
			] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( constructorSpy ).toHaveBeenCalledTimes( 1 );
			expect( constructorSpy.calls.mostRecent().args[ 0 ] ).toEqual( [
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
				new Identifier( "UNION" ),
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
			] );

			// Single pattern in array and multiple patterns
			constructorSpy.calls.reset();
			pattern = builder.union( [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] }
			], [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
				{ getPattern: () => [ new MockToken( "token-3" ), new MockToken( "token-4" ) ] },
			] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( constructorSpy ).toHaveBeenCalledTimes( 1 );
			expect( constructorSpy.calls.mostRecent().args[ 0 ] ).toEqual( [
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
				new Identifier( "UNION" ),
				new NewLineSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ), new NewLineSymbol( "." ),
				new MockToken( "token-3" ), new MockToken( "token-4" ),
				new NewLineSymbol( "}" ),
			] );


			// Multiple patterns patterns
			constructorSpy.calls.reset();
			pattern = builder.union( [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
				{ getPattern: () => [ new MockToken( "token-3" ), new MockToken( "token-4" ) ] },
			], [] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( constructorSpy ).toHaveBeenCalledTimes( 1 );
			expect( constructorSpy.calls.mostRecent().args[ 0 ] ).toEqual( [
				new NewLineSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ), new NewLineSymbol( "." ),
				new MockToken( "token-3" ), new MockToken( "token-4" ),
				new NewLineSymbol( "}" ),
				new Identifier( "UNION" ),
				new LeftSymbol( "{" ),
				new RightSymbol( "}" ),
			] );

			// Multiple patterns and single pattern
			constructorSpy.calls.reset();
			pattern = builder.union( [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
				{ getPattern: () => [ new MockToken( "token-3" ), new MockToken( "token-4" ) ] },
			], { getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] } );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( constructorSpy ).toHaveBeenCalledTimes( 1 );
			expect( constructorSpy.calls.mostRecent().args[ 0 ] ).toEqual( [
				new NewLineSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ), new NewLineSymbol( "." ),
				new MockToken( "token-3" ), new MockToken( "token-4" ),
				new NewLineSymbol( "}" ),
				new Identifier( "UNION" ),
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
			] );

			// Multiple patterns and single pattern in an array
			constructorSpy.calls.reset();
			pattern = builder.union( [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
				{ getPattern: () => [ new MockToken( "token-3" ), new MockToken( "token-4" ) ] },
			], [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] }
			] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( constructorSpy ).toHaveBeenCalledTimes( 1 );
			expect( constructorSpy.calls.mostRecent().args[ 0 ] ).toEqual( [
				new NewLineSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ), new NewLineSymbol( "." ),
				new MockToken( "token-3" ), new MockToken( "token-4" ),
				new NewLineSymbol( "}" ),
				new Identifier( "UNION" ),
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
			] );

			// Multiple patterns
			constructorSpy.calls.reset();
			pattern = builder.union( [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
				{ getPattern: () => [ new MockToken( "token-3" ), new MockToken( "token-4" ) ] },
			], [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
				{ getPattern: () => [ new MockToken( "token-3" ), new MockToken( "token-4" ) ] },
			] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( constructorSpy ).toHaveBeenCalledTimes( 1 );
			expect( constructorSpy.calls.mostRecent().args[ 0 ] ).toEqual( [
				new NewLineSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ), new NewLineSymbol( "." ),
				new MockToken( "token-3" ), new MockToken( "token-4" ),
				new NewLineSymbol( "}" ),
				new Identifier( "UNION" ),
				new NewLineSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ), new NewLineSymbol( "." ),
				new MockToken( "token-3" ), new MockToken( "token-4" ),
				new NewLineSymbol( "}" ),
			] );
		} );

		it( "PatternBuilder.minus()", ():void => {
			class MockToken extends Token {
				protected getPrettySeparator():string {
					return " ";
				}

				protected getCompactSeparator():string {
					return " ";
				}
			}
			let resolver:IRIResolver = {
				_resolveIRI: ( iri:string ) => {
					return [ new StringLiteral( iri ) ];
				}
			};
			let builder:PatternBuilder = new PatternBuilder( resolver );
			let constructorSpy = spyOn( NotTriplesPatternModule, "NotTriplesPattern" ).and.callThrough();
			let pattern:NotTriplesPattern;

			// Single pattern
			constructorSpy.calls.reset();
			pattern = builder.minus( { getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] } );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( constructorSpy ).toHaveBeenCalledTimes( 1 );
			expect( constructorSpy.calls.mostRecent().args[ 0 ] ).toEqual( [
				new Identifier( "MINUS" ),
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
			] );

			// Multiple patterns, 1
			constructorSpy.calls.reset();
			pattern = builder.minus(
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
				{ getPattern: () => [ new MockToken( "token-3" ), new MockToken( "token-4" ) ] },
			);
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( constructorSpy ).toHaveBeenCalledTimes( 1 );
			expect( constructorSpy.calls.mostRecent().args[ 0 ] ).toEqual( [
				new Identifier( "MINUS" ),
				new NewLineSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ), new NewLineSymbol( "." ),
				new MockToken( "token-3" ), new MockToken( "token-4" ),
				new NewLineSymbol( "}" ),
			] );

			// Multiple patterns, 2
			constructorSpy.calls.reset();
			pattern = builder.minus(
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
				{ getPattern: () => [ new MockToken( "token-3" ), new MockToken( "token-4" ) ] },
				{ getPattern: () => [ new MockToken( "token-5" ), new MockToken( "token-6" ) ] },
				{ getPattern: () => [ new MockToken( "token-7" ), new MockToken( "token-8" ) ] },
			);
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( constructorSpy ).toHaveBeenCalledTimes( 1 );
			expect( constructorSpy.calls.mostRecent().args[ 0 ] ).toEqual( [
				new Identifier( "MINUS" ),
				new NewLineSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ), new NewLineSymbol( "." ),
				new MockToken( "token-3" ), new MockToken( "token-4" ), new NewLineSymbol( "." ),
				new MockToken( "token-5" ), new MockToken( "token-6" ), new NewLineSymbol( "." ),
				new MockToken( "token-7" ), new MockToken( "token-8" ),
				new NewLineSymbol( "}" ),
			] );
		} );

		it( "PatternBuilder.values()", ():void => {
			let resolver:IRIResolver = {
				_resolveIRI: ( iri:string ) => {
					return [ new StringLiteral( iri ) ];
				}
			};

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

			let builder:PatternBuilder = new PatternBuilder( resolver );
			let ValuesPattern:typeof ValuesPatternModule.ValuesPattern = ValuesPatternModule.ValuesPattern;
			let constructorSpy = spyOn( ValuesPatternModule, "ValuesPattern" ).and.callFake( ( resolver, vars ) => {
				return new ValuesPattern( resolver, vars );
			} );
			let pattern:SingleValuesPattern | MultipleValuesPattern;
			let vars:Variable | Variable[];

			// Single variables
			constructorSpy.calls.reset();
			vars = new MockVar( "first" );
			pattern = builder.values( vars );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( ValuesPattern ) );
			expect( constructorSpy ).toHaveBeenCalledTimes( 1 );
			expect( constructorSpy.calls.mostRecent().args[ 1 ] ).toEqual( [ vars ] );

			// Multiple variables, 1
			constructorSpy.calls.reset();
			vars = [ new MockVar( "first" ), new MockVar( "second" ) ];
			pattern = builder.values( ...vars );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( ValuesPattern ) );
			expect( constructorSpy ).toHaveBeenCalledTimes( 1 );
			expect( constructorSpy.calls.mostRecent().args[ 1 ] ).toEqual( vars );

			// Multiple variables, 2
			constructorSpy.calls.reset();
			vars = [
				new MockVar( "a" ),
				new MockVar( "e" ),
				new MockVar( "i" ),
				new MockVar( "o" ),
				new MockVar( "u" ),
			];
			pattern = builder.values( ...vars );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( ValuesPattern ) );
			expect( constructorSpy ).toHaveBeenCalledTimes( 1 );
			expect( constructorSpy.calls.mostRecent().args[ 1 ] ).toEqual( vars );
		} );

	} );

} );
