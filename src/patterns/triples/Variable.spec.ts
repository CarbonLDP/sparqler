import * as VariableModule from "./Variable";
import Variable from "./Variable";

import {
	TriplesSameSubjectMore,
	GraphPattern,
} from "../interfaces";
import { Token } from "../../tokens/Token";
import { TriplesPattern } from "./TriplesPattern";
import { NewLineSymbol } from "../../tokens/NewLineSymbol";
import * as ObjectPattern from "../../utils/ObjectPattern";
import { LeftSymbol } from "../../tokens/LeftSymbol";
import { StringLiteral } from "../../tokens/StringLiteral";
import { IRIResolver } from "sparqler/iri/IRIResolver";

describe( "Module TriplesPattern/Variable", ():void => {

	it( "Exists", ():void => {
		expect( VariableModule ).toBeDefined();
		expect( VariableModule ).toEqual( jasmine.any( Object ) );
	} );

	describe( "Class Variable", ():void => {

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
			expect( Variable ).toBeDefined();
			expect( Variable ).toEqual( jasmine.any( Function ) );
			expect( Variable ).toBe( VariableModule.Variable );
		} );

		it( "Is a TriplePattern", ():void => {
			let resource:Variable = new Variable( resolver, "name" );
			expect( resource ).toBeDefined();
			expect( resource ).toEqual( jasmine.any( Variable ) );
			expect( resource ).toEqual( jasmine.any( TriplesPattern ) );
		} );

		it( "The self tokens are the variable symbol (?) and its name", ():void => {
			let resource:Variable;

			resource = new Variable( resolver, "name" );
			expect( resource.getSelfTokens() ).toEqual( [
				new LeftSymbol( "?" ),
				new StringLiteral( "name" ),
			] );

			resource = new Variable( resolver, "another-name" );
			expect( resource.getSelfTokens() ).toEqual( [
				new LeftSymbol( "?" ),
				new StringLiteral( "another-name" ),
			] );

			resource = new Variable( resolver, "last-name" );
			expect( resource.getSelfTokens() ).toEqual( [
				new LeftSymbol( "?" ),
				new StringLiteral( "last-name" ),
			] );
		} );

		it( "getPattern(), get the complete triple pattern", ():void => {
			spyOn( ObjectPattern, "serialize" ).and.callFake( ( element ):Token[] => {
				return [ new MockToken( element ) ];
			} );

			let pattern:TriplesSameSubjectMore<GraphPattern> & GraphPattern;

			pattern = new Variable( resolver, "name" )
				.has( "some-iri", "something" )
			;
			expect( pattern.getPattern() ).toEqual( [
				new LeftSymbol( "?" ), new StringLiteral( "name" ),
				new MockToken( "some-iri" ), new MockToken( "something" ),
			] );

			pattern = new Variable( resolver, "another-name" )
				.has( "some-iri", "something" )
				.and( "middle-iri-1", "thing-1" )
				.and( "middle-iri-2", [ "thing-2-1", "thing-2-2", "thing-2-3" ] )
				.and( "last-iri", "anything" )
			;
			expect( pattern.getPattern() ).toEqual( [
				new LeftSymbol( "?" ), new StringLiteral( "another-name" ),
				new MockToken( "some-iri" ), new MockToken( "something" ), new NewLineSymbol( ";" ),
				new MockToken( "middle-iri-1" ), new MockToken( "thing-1" ), new NewLineSymbol( ";" ),
				new MockToken( "middle-iri-2" ), new MockToken( "thing-2-1" ), new NewLineSymbol( "," ), new MockToken( "thing-2-2" ), new NewLineSymbol( "," ), new MockToken( "thing-2-3" ), new NewLineSymbol( ";" ),
				new MockToken( "last-iri" ), new MockToken( "anything" ),
			] );
		} );

	} );

} );
