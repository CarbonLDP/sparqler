import * as PatternBuilderModule from "./PatternBuilder";
import PatternBuilder from "./PatternBuilder";

import {
	SingleValuesPattern,
	MultipleValuesPattern,
} from "./interfaces";
import { StringLiteral } from "../tokens/StringLiteral";
import { Resource } from "./triples/Resource";
import { Variable } from "./triples/Variable";
import {
	Literal,
	RDFLiteral,
	NumericLiteral,
	BooleanLiteral,
} from "./triples/Literals";
import { Collection } from "./triples/Collection";
import { BlankNode } from "./triples/BlankNode";
import { NotTriplesPattern } from "./notTriples/NotTriplesPattern";
import { Identifier } from "../tokens/Identifier";
import { LeftSymbol } from "../tokens/LeftSymbol";
import { RightSymbol } from "../tokens/RightSymbol";
import { Token } from "../tokens/Token";
import { NewLineSymbol } from "../tokens/NewLineSymbol";
import { IRIResolver } from "sparqler/iri/IRIResolver";
import { ValuesPattern } from "sparqler/patterns/notTriples";

describe( "Module PatternBuilder", ():void => {

	it( "Exists", ():void => {
		expect( PatternBuilderModule ).toBeDefined();
		expect( PatternBuilderModule ).toEqual( jasmine.any( Object ) );
	} );

	describe( "Class PatternBuilder", ():void => {

		let resolver:IRIResolver;
		beforeEach( ():void => {
			resolver = new class extends IRIResolver {
				resolve( iri:string ):Token[] {
					return [ new StringLiteral( iri ) ];
				}
			};
		} );

		it( "Exists", ():void => {
			expect( PatternBuilder ).toBeDefined();
			expect( PatternBuilder ).toEqual( jasmine.any( Function ) );
			expect( PatternBuilder ).toBe( PatternBuilderModule.PatternBuilder );
		} );

		it( "Constructor", ():void => {
			let builder:PatternBuilder = new PatternBuilder( resolver );

			expect( builder ).toBeDefined();
			expect( builder ).toEqual( jasmine.any( PatternBuilder ) );
		} );

		it( "Implements Builders", ():void => {
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
			let builder:PatternBuilder = new PatternBuilder( resolver );

			let resource:Resource = builder.resource( "http://example.com/" );
			expect( resource ).toBeDefined();
			expect( resource ).toEqual( jasmine.any( Resource ) );
		} );

		it( "PatternBuilder.var()", ():void => {
			let builder:PatternBuilder = new PatternBuilder( resolver );

			let variable:Variable = builder.var( "name" );
			expect( variable ).toBeDefined();
			expect( variable ).toEqual( jasmine.any( Variable ) );
		} );

		it( "PatternBuilder.literal()", ():void => {
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
			let builder:PatternBuilder = new PatternBuilder( resolver );
			let pattern:NotTriplesPattern;

			// Usage with an IRI parameter

			// Empty patterns
			pattern = builder.graph( "http://example.com/resource/", [] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
				new Identifier( "GRAPH" ), new StringLiteral( "http://example.com/resource/" ),
				new LeftSymbol( "{" ),
				new RightSymbol( "}" ),
			] );

			// Single pattern
			pattern = builder.graph( "http://example.com/resource/", { getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] } );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
				new Identifier( "GRAPH" ), new StringLiteral( "http://example.com/resource/" ),
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ),
				new MockToken( "token-2" ),
				new RightSymbol( "}" ),
			] );

			// Single pattern in an array
			pattern = builder.graph( "http://example.com/resource/", [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
			] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
				new Identifier( "GRAPH" ), new StringLiteral( "http://example.com/resource/" ),
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ),
				new MockToken( "token-2" ),
				new RightSymbol( "}" ),
			] );

			// Multiple patterns
			pattern = builder.graph( "http://example.com/resource/", [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
				{ getPattern: () => [ new MockToken( "token-3" ), new MockToken( "token-4" ) ] },
			] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
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
			pattern = builder.graph( new MockVar(), [] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
				new Identifier( "GRAPH" ), new MockToken( "variable" ),
				new LeftSymbol( "{" ),
				new RightSymbol( "}" ),
			] );

			// Single pattern
			pattern = builder.graph( new MockVar(), { getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] } );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
				new Identifier( "GRAPH" ), new MockToken( "variable" ),
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ),
				new MockToken( "token-2" ),
				new RightSymbol( "}" ),
			] );

			// Single pattern in an array
			pattern = builder.graph( new MockVar(), [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
			] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
				new Identifier( "GRAPH" ), new MockToken( "variable" ),
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ),
				new MockToken( "token-2" ),
				new RightSymbol( "}" ),
			] );

			// Multiple patterns
			pattern = builder.graph( new MockVar(), [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
				{ getPattern: () => [ new MockToken( "token-3" ), new MockToken( "token-4" ) ] },
			] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
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
			let builder:PatternBuilder = new PatternBuilder( resolver );
			let pattern:NotTriplesPattern;

			// Empty pattern
			pattern = builder.optional( [] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
				new Identifier( "OPTIONAL" ),
				new LeftSymbol( "{" ),
				new RightSymbol( "}" ),
			] );

			// Single pattern
			pattern = builder.optional( { getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] } );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
				new Identifier( "OPTIONAL" ),
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
			] );

			// Single pattern in an array
			pattern = builder.optional( [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
			] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
				new Identifier( "OPTIONAL" ),
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
			] );

			// Multiple patterns
			pattern = builder.optional( [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
				{ getPattern: () => [ new MockToken( "token-3" ), new MockToken( "token-4" ) ] },
			] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
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
			let builder:PatternBuilder = new PatternBuilder( resolver );
			let pattern:NotTriplesPattern;

			// Empty patterns
			pattern = builder.union( [], [] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
				new LeftSymbol( "{" ),
				new RightSymbol( "}" ),
				new Identifier( "UNION" ),
				new LeftSymbol( "{" ),
				new RightSymbol( "}" ),
			] );

			// Empty and single pattern
			pattern = builder.union( [], { getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] } );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
				new LeftSymbol( "{" ),
				new RightSymbol( "}" ),
				new Identifier( "UNION" ),
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
			] );

			// Empty and single pattern in an array
			pattern = builder.union( [], [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
			] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
				new LeftSymbol( "{" ),
				new RightSymbol( "}" ),
				new Identifier( "UNION" ),
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
			] );

			// Empty and multiple patterns
			pattern = builder.union( [], [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
				{ getPattern: () => [ new MockToken( "token-3" ), new MockToken( "token-4" ) ] },
			] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
				new LeftSymbol( "{" ),
				new RightSymbol( "}" ),
				new Identifier( "UNION" ),
				new NewLineSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ), new NewLineSymbol( "." ),
				new MockToken( "token-3" ), new MockToken( "token-4" ),
				new NewLineSymbol( "}" ),
			] );

			// Single and empty pattern
			pattern = builder.union( { getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] }, [] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
				new Identifier( "UNION" ),
				new LeftSymbol( "{" ),
				new RightSymbol( "}" ),
			] );

			// Singles patterns
			pattern = builder.union(
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
			);
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
				new Identifier( "UNION" ),
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
			] );

			// Single pattern and single pattern in an array
			pattern = builder.union( { getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] }, [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
			] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
				new Identifier( "UNION" ),
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
			] );

			// Empty and multiple patterns
			pattern = builder.union( { getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] }, [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
				{ getPattern: () => [ new MockToken( "token-3" ), new MockToken( "token-4" ) ] },
			] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
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
			pattern = builder.union( [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
			], [] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
				new Identifier( "UNION" ),
				new LeftSymbol( "{" ),
				new RightSymbol( "}" ),
			] );

			// Single pattern in array and single pattern
			pattern = builder.union( [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
			], { getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] } );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
				new Identifier( "UNION" ),
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
			] );

			// Single pattern in array and single pattern in an array
			pattern = builder.union( [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
			], [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
			] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
				new Identifier( "UNION" ),
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
			] );

			// Single pattern in array and multiple patterns
			pattern = builder.union( [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
			], [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
				{ getPattern: () => [ new MockToken( "token-3" ), new MockToken( "token-4" ) ] },
			] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
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
			pattern = builder.union( [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
				{ getPattern: () => [ new MockToken( "token-3" ), new MockToken( "token-4" ) ] },
			], [] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
				new NewLineSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ), new NewLineSymbol( "." ),
				new MockToken( "token-3" ), new MockToken( "token-4" ),
				new NewLineSymbol( "}" ),
				new Identifier( "UNION" ),
				new LeftSymbol( "{" ),
				new RightSymbol( "}" ),
			] );

			// Multiple patterns and single pattern
			pattern = builder.union( [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
				{ getPattern: () => [ new MockToken( "token-3" ), new MockToken( "token-4" ) ] },
			], { getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] } );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
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
			pattern = builder.union( [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
				{ getPattern: () => [ new MockToken( "token-3" ), new MockToken( "token-4" ) ] },
			], [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
			] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
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
			pattern = builder.union( [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
				{ getPattern: () => [ new MockToken( "token-3" ), new MockToken( "token-4" ) ] },
			], [
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
				{ getPattern: () => [ new MockToken( "token-3" ), new MockToken( "token-4" ) ] },
			] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
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
			let builder:PatternBuilder = new PatternBuilder( resolver );
			let pattern:NotTriplesPattern;

			// Single pattern
			pattern = builder.minus( { getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] } );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
				new Identifier( "MINUS" ),
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
			] );

			// Multiple patterns, 1
			pattern = builder.minus(
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
				{ getPattern: () => [ new MockToken( "token-3" ), new MockToken( "token-4" ) ] },
			);
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
				new Identifier( "MINUS" ),
				new NewLineSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ), new NewLineSymbol( "." ),
				new MockToken( "token-3" ), new MockToken( "token-4" ),
				new NewLineSymbol( "}" ),
			] );

			// Multiple patterns, 2
			pattern = builder.minus(
				{ getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] },
				{ getPattern: () => [ new MockToken( "token-3" ), new MockToken( "token-4" ) ] },
				{ getPattern: () => [ new MockToken( "token-5" ), new MockToken( "token-6" ) ] },
				{ getPattern: () => [ new MockToken( "token-7" ), new MockToken( "token-8" ) ] },
			);
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
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
			let pattern:SingleValuesPattern | MultipleValuesPattern;
			let vars:Variable | Variable[];
			let tokens:MockToken[];

			// Single variables
			vars = new MockVar( "first" );
			pattern = builder.values( vars );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( ValuesPattern ) );

			tokens = [ vars as Variable ].reduce( ( x, _ ) => x.concat( _.getSelfTokens() ), [] );
			expect( pattern.getPattern() ).toEqual( jasmine.arrayContaining( tokens ) as any );

			// Multiple variables, 1
			vars = [ new MockVar( "first" ), new MockVar( "second" ) ];
			pattern = builder.values( ...vars );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( ValuesPattern ) );

			tokens = vars.reduce( ( x, _ ) => x.concat( _.getSelfTokens() ), [] );
			expect( pattern.getPattern() ).toEqual( jasmine.arrayContaining( tokens ) as any );

			// Multiple variables, 2
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

			tokens = vars.reduce( ( x, _ ) => x.concat( _.getSelfTokens() ), [] );
			expect( pattern.getPattern() ).toEqual( jasmine.arrayContaining( tokens ) as any );
		} );

	} );

} );
