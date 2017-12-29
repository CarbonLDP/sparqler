import * as TriplesSubjectModule from "./TriplesSubject";
import TriplesSubject from "./TriplesSubject";

import {
	TriplesSameSubjectMore,
	GraphPattern,
} from "../interfaces";
import { Token } from "../../tokens/Token";
import { TriplesPattern } from "./TriplesPattern";
import { NewLineSymbol } from "../../tokens/NewLineSymbol";
import * as ObjectPattern from "../../utils/ObjectPattern";
import { IRIResolver } from "sparqler/iri";

describe( "Module TriplesPattern/TriplesSubject", ():void => {

	it( "Exists", ():void => {
		expect( TriplesSubjectModule ).toBeDefined();
		expect( TriplesSubjectModule ).toEqual( jasmine.any( Object ) );
	} );

	describe( "Class TriplesSubject", ():void => {

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

		class MockTriplesSubject extends TriplesSubject { elementTokens:Token[] = []; }

		it( "Exists", ():void => {
			expect( TriplesSubject ).toBeDefined();
			expect( TriplesSubject ).toEqual( jasmine.any( Function ) );
			expect( TriplesSubject ).toBe( TriplesSubjectModule.TriplesSubject );
		} );

		it( "Is a TriplePattern", ():void => {
			let pattern:TriplesSubject = new MockTriplesSubject( resolver );
			expect( pattern ).toBeDefined();
			expect( pattern ).toEqual( jasmine.any( TriplesSubject ) );
			expect( pattern ).toEqual( jasmine.any( TriplesPattern ) );
		} );

		it( "Self tokens are not implemented in this abstract class", ():void => {
			let pattern:TriplesSubject;

			// The mock class implements the self tokens as an empty array

			pattern = new MockTriplesSubject( resolver );
			expect( pattern.getSelfTokens() ).toEqual( [] );

			pattern = new MockTriplesSubject( resolver );
			expect( pattern.getSelfTokens() ).toEqual( [] );
		} );

		it( "getPattern(), get only the triples tokens", ():void => {
			spyOn( ObjectPattern, "serialize" ).and.callFake( ( element ):Token[] => {
				return [ new MockToken( element ) ];
			} );

			let pattern:TriplesSameSubjectMore<GraphPattern> & GraphPattern;

			pattern = new MockTriplesSubject( resolver )
				.has( "some-iri", "something" )
			;
			expect( pattern.getPattern() ).toEqual( [
				new MockToken( "some-iri" ), new MockToken( "something" ),
			] );

			pattern = new MockTriplesSubject( resolver )
				.has( "some-iri", "something" )
				.and( "middle-iri-1", "thing-1" )
				.and( "middle-iri-2", [ "thing-2-1", "thing-2-2", "thing-2-3" ] )
				.and( "last-iri", "anything" )
			;
			expect( pattern.getPattern() ).toEqual( [
				new MockToken( "some-iri" ), new MockToken( "something" ), new NewLineSymbol( ";" ),
				new MockToken( "middle-iri-1" ), new MockToken( "thing-1" ), new NewLineSymbol( ";" ),
				new MockToken( "middle-iri-2" ), new MockToken( "thing-2-1" ), new NewLineSymbol( "," ), new MockToken( "thing-2-2" ), new NewLineSymbol( "," ), new MockToken( "thing-2-3" ), new NewLineSymbol( ";" ),
				new MockToken( "last-iri" ), new MockToken( "anything" ),
			] );
		} );

	} );

} );
