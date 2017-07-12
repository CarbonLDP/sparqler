import * as ResourceModule from "./Resource";
import Resource from "./Resource";

import {
	TriplesSameSubjectMore,
	GraphPattern
} from "../interfaces";
import { Token } from "../../tokens/Token";
import { TriplesPattern } from "./TriplesPattern";
import { NewLineSymbol } from "../../tokens/NewLineSymbol";
import * as ObjectPattern from "../../utils/ObjectPattern";
import { IRIResolver } from "sparqler/iri";

describe( "Module TriplesPattern/Resource", ():void => {

	it( "Exists", ():void => {
		expect( ResourceModule ).toBeDefined();
		expect( ResourceModule ).toEqual( jasmine.any( Object ) );
	} );

	describe( "Class Resource", ():void => {

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
			resolver = new class extends IRIResolver {
				resolve( iri:string ):Token[] {
					return [ new MockToken( iri ) ];
				}
			};
		} );

		it( "Exists", ():void => {
			expect( Resource ).toBeDefined();
			expect( Resource ).toEqual( jasmine.any( Function ) );
			expect( Resource ).toBe( ResourceModule.Resource );
		} );

		it( "Is a TriplePattern", ():void => {
			let resource:Resource = new Resource( resolver, "iri" );
			expect( resource ).toBeDefined();
			expect( resource ).toEqual( jasmine.any( Resource ) );
			expect( resource ).toEqual( jasmine.any( TriplesPattern ) );
		} );

		it( "The self tokens are the resolved IRI", ():void => {
			let resource:Resource;
			let resolverSpy:jasmine.Spy = spyOn( resolver, "resolve" ).and.callThrough();

			resolverSpy.calls.reset();
			resource = new Resource( resolver, "iri" );
			expect( resolverSpy ).toHaveBeenCalledTimes( 1 );
			expect( resolverSpy ).toHaveBeenCalledWith( "iri" );
			expect( resource.getSelfTokens() ).toEqual( [
				new MockToken( "iri" ),
			] );

			resolverSpy.calls.reset();
			resource = new Resource( resolver, "another-iri" );
			expect( resolverSpy ).toHaveBeenCalledTimes( 1 );
			expect( resolverSpy ).toHaveBeenCalledWith( "another-iri" );
			expect( resource.getSelfTokens() ).toEqual( [
				new MockToken( "another-iri" ),
			] );

			resolverSpy.calls.reset();
			resource = new Resource( resolver, "last-iri" );
			expect( resolverSpy ).toHaveBeenCalledTimes( 1 );
			expect( resolverSpy ).toHaveBeenCalledWith( "last-iri" );
			expect( resource.getSelfTokens() ).toEqual( [
				new MockToken( "last-iri" ),
			] );
		} );

		it( "getPattern(), get the complete triple pattern", ():void => {
			spyOn( ObjectPattern, "serialize" ).and.callFake( ( element ):Token[] => {
				return [ new MockToken( element ) ];
			} );

			let pattern:TriplesSameSubjectMore<GraphPattern> & GraphPattern;

			pattern = new Resource( resolver, "iri" )
				.has( "some-iri", "something" )
			;
			expect( pattern.getPattern() ).toEqual( [
				new MockToken( "iri" ),
				new MockToken( "some-iri" ), new MockToken( "something" ),
			] );

			pattern = new Resource( resolver, "iri" )
				.has( "some-iri", "something" )
				.and( "middle-iri-1", "thing-1" )
				.and( "middle-iri-2", [ "thing-2-1", "thing-2-2", "thing-2-3" ] )
				.and( "last-iri", "anything" )
			;
			expect( pattern.getPattern() ).toEqual( [
				new MockToken( "iri" ),
				new MockToken( "some-iri" ), new MockToken( "something" ), new NewLineSymbol( ";" ),
				new MockToken( "middle-iri-1" ), new MockToken( "thing-1" ), new NewLineSymbol( ";" ),
				new MockToken( "middle-iri-2" ), new MockToken( "thing-2-1" ), new NewLineSymbol( "," ), new MockToken( "thing-2-2" ), new NewLineSymbol( "," ), new MockToken( "thing-2-3" ), new NewLineSymbol( ";" ),
				new MockToken( "last-iri" ), new MockToken( "anything" ),
			] );
		} );

	} );

} );
