import * as CollectionModule from "./Collection";
import Collection from "./Collection";

import {
	IRIResolver,
	TriplesSameSubjectMore,
	TriplesNodePattern
} from "../interfaces";
import { Token } from "../../tokens/Token";
import { TriplesPattern } from "./TriplesPattern";
import { NewLineSymbol } from "../../tokens/NewLineSymbol";
import * as ObjectPattern from "../../utils/ObjectPattern";
import { LeftSymbol } from "../../tokens/LeftSymbol";
import { RightSymbol } from "../../tokens/RightSymbol";

describe( "Module TriplesPattern/Collection", ():void => {

	it( "Exists", ():void => {
		expect( CollectionModule ).toBeDefined();
		expect( CollectionModule ).toEqual( jasmine.any( Object ) );
	} );

	describe( "Class Collection", ():void => {

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
				return [ new MockToken( iri ) ];
			}
		};

		it( "Exists", ():void => {
			expect( Collection ).toBeDefined();
			expect( Collection ).toEqual( jasmine.any( Function ) );
			expect( Collection ).toBe( CollectionModule.Collection );
		} );

		it( "Is a TriplePattern", ():void => {
			let blankNode:Collection = new Collection( resolver, [] );
			expect( blankNode ).toBeDefined();
			expect( blankNode ).toEqual( jasmine.any( Collection ) );
			expect( blankNode ).toEqual( jasmine.any( TriplesPattern ) );
		} );

		it( "Correctly implements a TriplesNodePattern", ():void => {
			spyOn( ObjectPattern, "serialize" ).and.callFake( ( element ):Token[] => {
				return [ new MockToken( element ) ];
			} );

			let blankNode:Collection;

			blankNode = new Collection( resolver, [] );
			expect( "getSelfTokens" in blankNode ).toBe( true );
			expect( blankNode.getSelfTokens ).toEqual( jasmine.any( Function ) );

			expect( "getPattern" in blankNode ).toBe( true );
			expect( blankNode.getPattern ).toEqual( jasmine.any( Function ) );
		} );

		it( "Correctly implements a TriplePattern<TriplesNodePattern>", ():void => {
			spyOn( ObjectPattern, "serialize" ).and.callFake( ( element ):Token[] => {
				return [ new MockToken( element ) ];
			} );
			let pattern:TriplesSameSubjectMore<TriplesNodePattern> & TriplesNodePattern;

			pattern = new Collection( resolver, [] ).has( "iri", "anything" );

			expect( "getSelfTokens" in pattern ).toBe( true );
			expect( pattern.getSelfTokens ).toEqual( jasmine.any( Function ) );

			expect( "getPattern" in pattern ).toBe( true );
			expect( pattern.getPattern ).toEqual( jasmine.any( Function ) );
		} );

		it( "Simple values construct a single line collection tokens", ():void => {
			let spySerialize:jasmine.Spy = spyOn( ObjectPattern, "serialize" ).and.callFake( ( element ):Token[] => {
				return [ new MockToken( element + "" ) ];
			} );

			let collection:Collection;

			// Simple values
			spySerialize.calls.reset();
			collection = new Collection( resolver, [ "something" ] );
			expect( collection.getSelfTokens() ).toEqual( [
				new LeftSymbol( "(" ), new MockToken( "something" ), new RightSymbol( ")" ),
			] );
			expect( spySerialize ).toHaveBeenCalledTimes( 1 );
			expect( spySerialize ).toHaveBeenCalledWith( "something" );

			spySerialize.calls.reset();
			collection = new Collection( resolver, [ 1 ] );
			expect( collection.getSelfTokens() ).toEqual( [
				new LeftSymbol( "(" ), new MockToken( "1" ), new RightSymbol( ")" ),
			] );
			expect( spySerialize ).toHaveBeenCalledTimes( 1 );
			expect( spySerialize ).toHaveBeenCalledWith( 1 );

			spySerialize.calls.reset();
			collection = new Collection( resolver, [ false ] );
			expect( collection.getSelfTokens() ).toEqual( [
				new LeftSymbol( "(" ), new MockToken( "false" ), new RightSymbol( ")" ),
			] );
			expect( spySerialize ).toHaveBeenCalledTimes( 1 );
			expect( spySerialize ).toHaveBeenCalledWith( false );

			// Multiple values
			spySerialize.calls.reset();
			collection = new Collection( resolver, [ "something-1", "something-2" ] );
			expect( collection.getSelfTokens() ).not.toEqual( [
				new LeftSymbol( "(" ), new MockToken( "something-1" ), new MockToken( "something-2" ), new RightSymbol( ")" ),
			] );
			expect( spySerialize ).toHaveBeenCalledTimes( 2 );
			expect( spySerialize ).toHaveBeenCalledWith( "something-1" );
			expect( spySerialize ).toHaveBeenCalledWith( "something-2" );
		} );

		it( "Multiple values gets a multi-line collection tokens", ():void => {
			let spySerialize:jasmine.Spy = spyOn( ObjectPattern, "serialize" ).and.callFake( ( element ):Token[] => {
				return [ new MockToken( element + "" ) ];
			} );

			let collection:Collection;

			spySerialize.calls.reset();
			collection = new Collection( resolver, [ "something-1", "something-2" ] );
			expect( collection.getSelfTokens() ).toEqual( [
				new NewLineSymbol( "(" ),
				new MockToken( "something-1" ), new NewLineSymbol( "" ),
				new MockToken( "something-2" ),
				new NewLineSymbol( ")" ),
			] );
			expect( spySerialize ).toHaveBeenCalledTimes( 2 );
			expect( spySerialize ).toHaveBeenCalledWith( "something-1" );
			expect( spySerialize ).toHaveBeenCalledWith( "something-2" );

			spySerialize.calls.reset();
			collection = new Collection( resolver, [ "something-1", "something-2", true, 10.01 ] );
			expect( collection.getSelfTokens() ).toEqual( [
				new NewLineSymbol( "(" ),
				new MockToken( "something-1" ), new NewLineSymbol( "" ),
				new MockToken( "something-2" ), new NewLineSymbol( "" ),
				new MockToken( "true" ), new NewLineSymbol( "" ),
				new MockToken( "10.01" ),
				new NewLineSymbol( ")" ),
			] );
			expect( spySerialize ).toHaveBeenCalledTimes( 4 );
			expect( spySerialize ).toHaveBeenCalledWith( "something-1" );
			expect( spySerialize ).toHaveBeenCalledWith( "something-2" );
			expect( spySerialize ).toHaveBeenCalledWith( true );
			expect( spySerialize ).toHaveBeenCalledWith( 10.01 );
		} );

		it( "Single multi-line value gets a multi-line collection tokens", ():void => {
			// Mock multi-line tokens
			let spySerialize:jasmine.Spy = spyOn( ObjectPattern, "serialize" ).and.callFake( ( element ):Token[] => {
				if( element === "same-property-separator" )
					return [ new MockToken( element ), new NewLineSymbol( "," ), new MockToken( element ) ];
				else if( element === "same-subject-separator" )
					return [ new MockToken( element ), new NewLineSymbol( ";" ), new MockToken( element ) ];
				else if( element === "collection" )
					return [ new MockToken( element ), new NewLineSymbol( "" ), new MockToken( element ) ];
				return [ new MockToken( element ) ];
			} );

			let collection:Collection;

			spySerialize.calls.reset();
			collection = new Collection( resolver, [ "same-property-separator" ] );
			expect( collection.getSelfTokens() ).toEqual( [
				new NewLineSymbol( "(" ),
				new MockToken( "same-property-separator" ), new NewLineSymbol( "," ), new MockToken( "same-property-separator" ),
				new NewLineSymbol( ")" ),
			] );
			expect( spySerialize ).toHaveBeenCalledTimes( 1 );
			expect( spySerialize ).toHaveBeenCalledWith( "same-property-separator" );

			spySerialize.calls.reset();
			collection = new Collection( resolver, [ "same-subject-separator" ] );
			expect( collection.getSelfTokens() ).toEqual( [
				new NewLineSymbol( "(" ),
				new MockToken( "same-subject-separator" ), new NewLineSymbol( ";" ), new MockToken( "same-subject-separator" ),
				new NewLineSymbol( ")" ),
			] );
			expect( spySerialize ).toHaveBeenCalledTimes( 1 );
			expect( spySerialize ).toHaveBeenCalledWith( "same-subject-separator" );

			spySerialize.calls.reset();
			collection = new Collection( resolver, [ "collection" ] );
			expect( collection.getSelfTokens() ).toEqual( [
				new NewLineSymbol( "(" ),
				new MockToken( "collection" ), new NewLineSymbol( "" ), new MockToken( "collection" ),
				new NewLineSymbol( ")" ),
			] );
			expect( spySerialize ).toHaveBeenCalledTimes( 1 );
			expect( spySerialize ).toHaveBeenCalledWith( "collection" );
		} );

		it( "getPattern(), concat the element and triples pattern", ():void => {
			spyOn( ObjectPattern, "serialize" ).and.callFake( ( element ):Token[] => {
				return [ new MockToken( element ) ];
			} );

			let collection:Collection;

			collection = new Collection( resolver, [] );
			collection[ "elementTokens" ] = [ new MockToken( "element-token-1" ), new MockToken( "element-token-2" ) ];
			collection[ "patternTokens" ] = [ new MockToken( "pattern-token-1" ), new MockToken( "pattern-token-2" ) ];
			expect( collection.getPattern() ).toEqual( [
				new MockToken( "element-token-1" ), new MockToken( "element-token-2" ),
				new MockToken( "pattern-token-1" ), new MockToken( "pattern-token-2" ),
			] );

			collection = new Collection( resolver, [] );
			collection[ "elementTokens" ] = [ new MockToken( "element-token" ) ];
			collection[ "patternTokens" ] = [ new MockToken( "pattern-token-1" ), new MockToken( "pattern-token-2" ), new MockToken( "pattern-token-3" ) ];
			expect( collection.getPattern() ).toEqual( [
				new MockToken( "element-token" ),
				new MockToken( "pattern-token-1" ), new MockToken( "pattern-token-2" ), new MockToken( "pattern-token-3" ),
			] );
		} );

	} );

} );
