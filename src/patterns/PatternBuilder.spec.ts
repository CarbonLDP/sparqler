import { IRIResolver } from "sparqler/iri";
import {
	MultipleValuesPattern,
	SingleValuesPattern,
} from "sparqler/patterns";
import { NotTriplesPattern } from "sparqler/patterns/notTriples/NotTriplesPattern";
import { ValuesPattern } from "sparqler/patterns/notTriples/ValuesPattern";
import {
	BlankNode,
	BooleanLiteral,
	Collection,
	Literal,
	NumericLiteral,
	RDFLiteral,
	Resource,
	Variable,
} from "sparqler/patterns/triples";
import {
	Identifier,
	LeftSymbol,
	NewLineSymbol,
	RightSymbol,
	StringLiteral,
	Token,
} from "sparqler/tokens";

import DefaultExport, { PatternBuilder } from "./PatternBuilder";
import { SubSelectClause } from "sparqler/clauses";


describe( "PatternBuilder", ():void => {

	let iriResolver:IRIResolver;
	beforeEach( ():void => {
		iriResolver = new class extends IRIResolver {
			resolve( iri:string ):Token[] {
				return [ new StringLiteral( iri ) ];
			}
		};
	} );

	it( "should exists", ():void => {
		expect( PatternBuilder ).toBeDefined();
		expect( PatternBuilder ).toEqual( jasmine.any( Function ) );
	} );

	it( "should be instantiable", ():void => {
		let builder:PatternBuilder = new PatternBuilder( iriResolver );

		expect( builder ).toBeDefined();
		expect( builder ).toEqual( jasmine.any( PatternBuilder ) );
	} );

	it( "should be the default export", ():void => {
		expect( PatternBuilder ).toBe( DefaultExport );
	} );

	it( "should implement all the builders", ():void => {
		let builder:PatternBuilder = new PatternBuilder( iriResolver );

		expect( builder ).toEqual( jasmine.objectContaining( {
			// Properties
			undefined: jasmine.any( String ) as any,

			// Triples patterns
			resource: jasmine.any( Function ),
			var: jasmine.any( Function ),
			literal: jasmine.any( Function ),
			collection: jasmine.any( Function ),
			blankNode: jasmine.any( Function ),

			// Not triples pattern
			graph: jasmine.any( Function ),
			optional: jasmine.any( Function ),
			union: jasmine.any( Function ),
			minus: jasmine.any( Function ),
			values: jasmine.any( Function ),
		} ) );

	} );

	// Test the methods
	describe( "PatternBuilder.resource", ():void => {

		it( "should return a Resource object", ():void => {
			let builder:PatternBuilder = new PatternBuilder( iriResolver );

			let resource:Resource = builder.resource( "http://example.com/" );
			expect( resource ).toBeDefined();
			expect( resource ).toEqual( jasmine.any( Resource ) );
		} );

	} );

	describe( "PatternBuilder.var", ():void => {

		it( "should return a Variable object", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );

			let variable:Variable = builder.var( "name" );
			expect( variable ).toBeDefined();
			expect( variable ).toEqual( jasmine.any( Variable ) );
		} );

	} );

	describe( "PatternBuilder.literal", ():void => {

		it( "should return an RDFLiteral object", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let literal:Literal;

			literal = builder.literal( "something" );
			expect( literal ).toBeDefined();
			expect( literal ).toEqual( jasmine.any( RDFLiteral ) );

			literal = builder.literal( "http://example.com/iri/as/literal" );
			expect( literal ).toBeDefined();
			expect( literal ).toEqual( jasmine.any( RDFLiteral ) );
		} );

		it( "should return a NumericLiteral object", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let literal:Literal;

			literal = builder.literal( 1 );
			expect( literal ).toBeDefined();
			expect( literal ).toEqual( jasmine.any( NumericLiteral ) );

			literal = builder.literal( 731 );
			expect( literal ).toBeDefined();
			expect( literal ).toEqual( jasmine.any( NumericLiteral ) );

			literal = builder.literal( 3.1 );
			expect( literal ).toBeDefined();
			expect( literal ).toEqual( jasmine.any( NumericLiteral ) );
		} );

		it( "should return BooleanLiteral object", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let literal:Literal;

			literal = builder.literal( true );
			expect( literal ).toBeDefined();
			expect( literal ).toEqual( jasmine.any( BooleanLiteral ) );

			literal = builder.literal( false );
			expect( literal ).toBeDefined();
			expect( literal ).toEqual( jasmine.any( BooleanLiteral ) );
		} );

		it( "should throw an Error if invalid type is provided", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );

			expect( () => builder.literal( new Date() as any ) )
				.toThrowError( "No valid value of a literal was provided." );
		} );

	} );

	describe( "PatternBuilder.collection", ():void => {

		it( "should return a Collection object", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let collection:Collection;

			// Normal usage
			collection = builder.collection( "hello", "world", "!!" );
			expect( collection ).toBeDefined();
			expect( collection ).toEqual( jasmine.any( Collection ) );

			collection = builder.collection( 1, true, "hi!" );
			expect( collection ).toBeDefined();
			expect( collection ).toEqual( jasmine.any( Collection ) );
		} );

		it( "should throw Error if no parameter is provided", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );

			expect( () => builder.collection() )
				.toThrowError( "The collection needs at least one value." );
		} );

	} );

	describe( "PatternBuilder.blankNode", ():void => {

		it( "should return a BlankNode object", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let blankNode:BlankNode;

			blankNode = builder.blankNode();
			expect( blankNode ).toBeDefined();
			expect( blankNode ).toEqual( jasmine.any( BlankNode ) );
		} );

	} );

	describe( "PatternBuilder.graph", ():void => {

		class MockToken extends Token {
			// noinspection JSMethodCanBeStatic
			protected getPrettySeparator():string {
				throw new Error( "Method not implemented." );
			}

			// noinspection JSMethodCanBeStatic
			protected getCompactSeparator():string {
				throw new Error( "Method not implemented." );
			}
		}

		class MockVar extends Variable {
			constructor() {
				super( iriResolver, "name" );
			}

			getSelfTokens():Token[] {
				return [ new MockToken( "variable" ) ];
			}
		}

		it( "should accept an IRI and an empty pattern", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let pattern:NotTriplesPattern;

			pattern = builder.graph( "http://example.com/resource/", [] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
				new Identifier( "GRAPH" ), new StringLiteral( "http://example.com/resource/" ),
				new LeftSymbol( "{" ),
				new RightSymbol( "}" ),
			] );
		} );

		it( "should accept an IRI and a single pattern", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let pattern:NotTriplesPattern;

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
		} );

		it( "should accept an IRI and a single pattern in the array", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let pattern:NotTriplesPattern;

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
		} );

		it( "should accept an IRI and multiple patterns in the array", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let pattern:NotTriplesPattern;

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
		} );

		it( "should accept a Variable and an empty pattern", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let pattern:NotTriplesPattern;

			pattern = builder.graph( new MockVar(), [] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
				new Identifier( "GRAPH" ), new MockToken( "variable" ),
				new LeftSymbol( "{" ),
				new RightSymbol( "}" ),
			] );
		} );

		it( "should accept a Variable and a single pattern", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let pattern:NotTriplesPattern;

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
		} );

		it( "should accept a Variable and a single pattern in the array", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let pattern:NotTriplesPattern;

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
		} );

		it( "should accept a Variable and multiple patterns in the array", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let pattern:NotTriplesPattern;

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
	} );

	describe( "PatternBuilder.optional", ():void => {

		class MockToken extends Token {
			// noinspection JSMethodCanBeStatic
			protected getPrettySeparator():string {
				throw new Error( "Method not implemented." );
			}

			// noinspection JSMethodCanBeStatic
			protected getCompactSeparator():string {
				throw new Error( "Method not implemented." );
			}
		}


		it( "should accept an empty pattern", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let pattern:NotTriplesPattern;

			pattern = builder.optional( [] );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
				new Identifier( "OPTIONAL" ),
				new LeftSymbol( "{" ),
				new RightSymbol( "}" ),
			] );
		} );

		it( "should accept a single pattern", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let pattern:NotTriplesPattern;

			pattern = builder.optional( { getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] } );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
				new Identifier( "OPTIONAL" ),
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
			] );
		} );

		it( "should accept an empty pattern in the array", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let pattern:NotTriplesPattern;

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
		} );

		it( "should accept multiple pattern", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let pattern:NotTriplesPattern;

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

	} );

	describe( "PatternBuilder.union", ():void => {

		class MockToken extends Token {
			// noinspection JSMethodCanBeStatic
			protected getPrettySeparator():string {
				throw new Error( "Method not implemented." );
			}

			// noinspection JSMethodCanBeStatic
			protected getCompactSeparator():string {
				throw new Error( "Method not implemented." );
			}
		}

		it( "should accept empty patterns", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let pattern:NotTriplesPattern;

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
		} );

		it( "should accept empty and single patterns", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let pattern:NotTriplesPattern;

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
		} );

		it( "should accept empty and single patterns in an array", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let pattern:NotTriplesPattern;

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
		} );

		it( "should accept empty and multiple patterns", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let pattern:NotTriplesPattern;

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
		} );

		it( "should accept single and empty pattern", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let pattern:NotTriplesPattern;

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
		} );

		it( "should accept singles patterns", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let pattern:NotTriplesPattern;

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
		} );

		it( "should accept single pattern and single pattern in an array", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let pattern:NotTriplesPattern;

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
		} );

		it( "should accept empty and multiple patterns", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let pattern:NotTriplesPattern;

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
		} );

		it( "should accept single pattern in array and empty pattern", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let pattern:NotTriplesPattern;

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
		} );

		it( "should accept single pattern in array and single pattern", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let pattern:NotTriplesPattern;

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
		} );

		it( "should accept single pattern in array and single pattern in an array", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let pattern:NotTriplesPattern;

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
		} );

		it( "should accept single pattern in array and multiple patterns", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let pattern:NotTriplesPattern;

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
		} );

		it( "should accept multiple patterns patterns", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let pattern:NotTriplesPattern;

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
		} );

		it( "should accept multiple patterns and single pattern", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let pattern:NotTriplesPattern;

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
		} );

		it( "should accept multiple patterns and single pattern in an array", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let pattern:NotTriplesPattern;

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
		} );

		it( "should accept multiple patterns", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let pattern:NotTriplesPattern;

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

	} );

	describe( "PatternBuilder.minus", ():void => {

		class MockToken extends Token {
			// noinspection JSMethodCanBeStatic
			protected getPrettySeparator():string {
				throw new Error( "Method not implemented." );
			}

			// noinspection JSMethodCanBeStatic
			protected getCompactSeparator():string {
				throw new Error( "Method not implemented." );
			}
		}

		it( "should accept single pattern", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let pattern:NotTriplesPattern;

			pattern = builder.minus( { getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ] } );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( NotTriplesPattern ) );
			expect( pattern.getPattern() ).toEqual( [
				new Identifier( "MINUS" ),
				new LeftSymbol( "{" ),
				new MockToken( "token-1" ), new MockToken( "token-2" ),
				new RightSymbol( "}" ),
			] );
		} );

		it( "should accept single multiple patterns", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );
			let pattern:NotTriplesPattern;

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

	} );

	describe( "PatternBuilder.values", ():void => {

		class MockToken extends Token {
			// noinspection JSMethodCanBeStatic
			protected getPrettySeparator():string {
				throw new Error( "Method not implemented." );
			}

			// noinspection JSMethodCanBeStatic
			protected getCompactSeparator():string {
				throw new Error( "Method not implemented." );
			}
		}

		class MockVar extends Variable {
			private name:string;

			constructor( name:string ) {
				super( iriResolver, name );
				this.name = name;
			}

			getSelfTokens():Token[] {
				return [ new MockToken( this.name ) ];
			}
		}

		it( "should accept single variables", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );

			const vars:Variable = new MockVar( "first" );
			const pattern:SingleValuesPattern = builder.values( vars );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( ValuesPattern ) );

			const tokens:MockToken[] = vars.getSelfTokens() as MockToken[];
			expect( pattern.getPattern() ).toEqual( jasmine.arrayContaining( tokens ) as any );
		} );

		it( "should accept multiple variables", ():void => {
			const builder:PatternBuilder = new PatternBuilder( iriResolver );

			const vars:Variable[] = [
				new MockVar( "a" ),
				new MockVar( "e" ),
				new MockVar( "i" ),
				new MockVar( "o" ),
				new MockVar( "u" ),
			];
			const pattern:MultipleValuesPattern = builder.values( ...vars );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( ValuesPattern ) );

			const tokens:MockToken[] = vars.reduce( ( x, _ ) => x.concat( _.getSelfTokens() ), [] );
			expect( pattern.getPattern() ).toEqual( jasmine.arrayContaining( tokens ) as any );
		} );

	} );

} );
