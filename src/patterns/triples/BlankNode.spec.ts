import * as BlankNodeModule from "./BlankNode";
import BlankNode from "./BlankNode";

import {
	TriplesSameSubjectMore,
	TriplesNodePattern,
} from "../interfaces";
import { Token } from "../../tokens/Token";
import { TriplesPattern } from "./TriplesPattern";
import { NewLineSymbol } from "../../tokens/NewLineSymbol";
import * as ObjectPattern from "../../utils/ObjectPattern";
import { LeftSymbol } from "../../tokens/LeftSymbol";
import { RightSymbol } from "../../tokens/RightSymbol";
import { IRIResolver } from "sparqler/iri";

describe( "Module TriplesPattern/BlankNode", ():void => {

	it( "Exists", ():void => {
		expect( BlankNodeModule ).toBeDefined();
		expect( BlankNodeModule ).toEqual( jasmine.any( Object ) );
	} );

	describe( "Class BlankNode", ():void => {

		class MockToken extends Token {
			protected getPrettySeparator():string {
				return " ";
			}

			protected getCompactSeparator():string {
				return " ";
			}
		}

		let resolver:IRIResolver;
		beforeEach( ():void => {
			resolver = new IRIResolver();
		} );

		it( "Exists", ():void => {
			expect( BlankNode ).toBeDefined();
			expect( BlankNode ).toEqual( jasmine.any( Function ) );
			expect( BlankNode ).toBe( BlankNodeModule.BlankNode );
		} );

		it( "Is a TriplePattern", ():void => {
			let blankNode:BlankNode = new BlankNode( resolver );
			expect( blankNode ).toBeDefined();
			expect( blankNode ).toEqual( jasmine.any( BlankNode ) );
			expect( blankNode ).toEqual( jasmine.any( TriplesPattern ) );
		} );

		it( "Correctly implements a TriplePattern<TriplesNodePattern>", ():void => {
			spyOn( ObjectPattern, "serialize" ).and.callFake( ( element ):Token[] => {
				return [ new MockToken( element ) ];
			} );

			let blankNode:BlankNode;
			let pattern:TriplesSameSubjectMore<TriplesNodePattern> & TriplesNodePattern;

			blankNode = new BlankNode( resolver );
			expect( "getSelfTokens" in blankNode ).toBe( true );
			expect( blankNode.getSelfTokens ).toEqual( jasmine.any( Function ) );
			expect( "getPattern" in blankNode ).toBe( false );

			pattern = new BlankNode( resolver ).has( "iri", "anything" );
			expect( "getSelfTokens" in pattern ).toBe( true );
			expect( pattern.getSelfTokens ).toEqual( jasmine.any( Function ) );
			expect( "getPattern" in pattern ).toBe( true );
			expect( pattern.getPattern ).toEqual( jasmine.any( Function ) );
		} );

		it( "Self tokens and pattern tokens are the same", ():void => {
			spyOn( ObjectPattern, "serialize" ).and.callFake( ( element ):Token[] => {
				return [ new MockToken( element ) ];
			} );

			let blankNode:BlankNode;
			let pattern:TriplesSameSubjectMore<TriplesNodePattern> & TriplesNodePattern;

			blankNode = new BlankNode( resolver );
			pattern = blankNode.has( "iri", "some" );
			expect( blankNode.getSelfTokens() ).toEqual( pattern.getPattern() );
			blankNode = new BlankNode( resolver );
			pattern = blankNode.has( "iri", "some" );
			expect( pattern.getSelfTokens() ).toEqual( pattern.getPattern() );

			blankNode = new BlankNode( resolver );
			pattern = blankNode
				.has( "iri-1", "some" )
				.and( "iri-2", "some" )
				.and( "iri-3", "some" )
				.and( "iri-4", "some" )
			;
			expect( blankNode.getSelfTokens() ).toEqual( pattern.getPattern() );
			blankNode = new BlankNode( resolver );
			pattern = blankNode
				.has( "iri-1", "some" )
				.and( "iri-2", "some" )
				.and( "iri-3", "some" )
				.and( "iri-4", "some" )
			;
			expect( pattern.getSelfTokens() ).toEqual( pattern.getPattern() );
		} );

		it( "Simple triples gets a single line blank node tokens", ():void => {
			spyOn( ObjectPattern, "serialize" ).and.callFake( ( element ):Token[] => {
				return [ new MockToken( element ) ];
			} );


			let pattern:TriplesSameSubjectMore<TriplesNodePattern> & TriplesNodePattern;

			pattern = new BlankNode( resolver )
				.has( "some-iri", "something" )
			;
			expect( pattern.getSelfTokens() ).toEqual( [
				new LeftSymbol( "[" ),
				new MockToken( "some-iri" ), new MockToken( "something" ),
				new RightSymbol( "]" ),
			] );

			pattern = new BlankNode( resolver )
				.has( "another-iri", "something-else" )
			;
			expect( pattern.getSelfTokens() ).toEqual( [
				new LeftSymbol( "[" ),
				new MockToken( "another-iri" ), new MockToken( "something-else" ),
				new RightSymbol( "]" ),
			] );

			pattern = new BlankNode( resolver )
				.has( "iri", "something-1" )
				.and( "last-iri", "something-2" )
			;
			expect( pattern.getSelfTokens() ).not.toEqual( [
				new LeftSymbol( "[" ),
				new MockToken( "iri" ), new MockToken( "something-1" ),
				new MockToken( "last-iri" ), new MockToken( "something-2" ),
				new RightSymbol( "]" ),
			] );
		} );

		it( "Multiple or multi-line triples gets a multi line blank node tokens", ():void => {
			spyOn( ObjectPattern, "serialize" ).and.callFake( ( element ):Token[] => {
				return [ new MockToken( element ) ];
			} );

			let pattern:TriplesSameSubjectMore<TriplesNodePattern> & TriplesNodePattern;

			// Multiple simple triples
			pattern = new BlankNode( resolver )
				.has( "some-iri", "something" )
				.and( "last-iri", "anything" )
			;
			expect( pattern.getPattern() ).toEqual( [
				new NewLineSymbol( "[" ),
				new MockToken( "some-iri" ), new MockToken( "something" ), new NewLineSymbol( ";" ),
				new MockToken( "last-iri" ), new MockToken( "anything" ),
				new NewLineSymbol( "]" ),
			] );

			// Single multi-line triple
			pattern = new BlankNode( resolver )
				.has( "middle-iri-2", [ "thing-2-1", "thing-2-2", "thing-2-3" ] )
			;
			expect( pattern.getPattern() ).toEqual( [
				new NewLineSymbol( "[" ),
				new MockToken( "middle-iri-2" ),
				new MockToken( "thing-2-1" ), new NewLineSymbol( "," ),
				new MockToken( "thing-2-2" ), new NewLineSymbol( "," ),
				new MockToken( "thing-2-3" ),
				new NewLineSymbol( "]" ),
			] );

			// Combined
			pattern = new BlankNode( resolver )
				.has( "some-iri", "something" )
				.and( "middle-iri-1", "thing-1" )
				.and( "middle-iri-2", [ "thing-2-1", "thing-2-2", "thing-2-3" ] )
				.and( "last-iri", "anything" )
			;
			expect( pattern.getPattern() ).toEqual( [
				new NewLineSymbol( "[" ),
				new MockToken( "some-iri" ), new MockToken( "something" ), new NewLineSymbol( ";" ),
				new MockToken( "middle-iri-1" ), new MockToken( "thing-1" ), new NewLineSymbol( ";" ),
				new MockToken( "middle-iri-2" ),
				new MockToken( "thing-2-1" ), new NewLineSymbol( "," ),
				new MockToken( "thing-2-2" ), new NewLineSymbol( "," ),
				new MockToken( "thing-2-3" ), new NewLineSymbol( ";" ),
				new MockToken( "last-iri" ), new MockToken( "anything" ),
				new NewLineSymbol( "]" ),
			] );
		} );

	} );

} );
