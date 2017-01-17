import * as LiteralsModule from "./Literals";
import {
	Literal,
	RDFLiteral,
	NumericLiteral,
	BooleanLiteral,
} from "./Literals";

import {
	IRIResolver,
	TriplesSameSubjectMore,
	GraphPattern
} from "../Patterns";
import { Token } from "../Tokens/Token";
import { TriplesPattern } from "./TriplesPattern";
import { NewLineSymbol } from "../Tokens/NewLineSymbol";
import * as ObjectPattern from "../Utils/ObjectPattern";
import { LeftSymbol } from "../Tokens/LeftSymbol";
import { StringLiteral } from "../Tokens/StringLiteral";
import { RightSymbol } from "../Tokens/RightSymbol";
import { Operator } from "../Tokens/Operator";

describe( "Module TriplesPattern/Literals", ():void => {

	it( "Exists", ():void => {
		expect( LiteralsModule ).toBeDefined();
		expect( LiteralsModule ).toEqual( jasmine.any( Object ) );
	} );

	describe( "Class Literal", ():void => {

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

		class MockLiteral extends Literal { elementTokens:Token[] = []; }

		it( "Exists", ():void => {
			expect( Literal ).toBeDefined();
			expect( Literal ).toEqual( jasmine.any( Function ) );
			expect( Literal ).toBe( LiteralsModule.Literal );
		} );

		it( "Is a TriplePattern", ():void => {
			let literal:Literal = new MockLiteral( resolver, "literal" );
			expect( literal ).toBeDefined();
			expect( literal ).toEqual( jasmine.any( Literal ) );
			expect( literal ).toEqual( jasmine.any( TriplesPattern ) );
		} );

		it( "Self tokens to be defined by its children classes", ():void => {
			let literal:Literal;

			// The mock class define the initial self tokens as an empty array

			literal = new MockLiteral( resolver, "literal" );
			expect( literal.getSelfTokens() ).toEqual( [] );

			literal = new MockLiteral( resolver, "another-literal" );
			expect( literal.getSelfTokens() ).toEqual( [] );

			literal = new MockLiteral( resolver, "last-literal" );
			expect( literal.getSelfTokens() ).toEqual( [] );
		} );

		it( "getPattern(), get the triples tokens without self tokens", ():void => {
			spyOn( ObjectPattern, "serialize" ).and.callFake( ( element ):Token[] => {
				return [ new MockToken( element ) ];
			} );

			let pattern:TriplesSameSubjectMore<GraphPattern> & GraphPattern;

			pattern = new MockLiteral( resolver, "literal" )
				.has( "some-iri", "something" )
			;
			expect( pattern.getPattern() ).toEqual( [
				new MockToken( "some-iri" ), new MockToken( "something" ),
			] );

			pattern = new MockLiteral( resolver, "another-literal" )
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

			pattern = new MockLiteral( resolver, 1 )
				.has( "some-iri", "something" )
			;
			expect( pattern.getPattern() ).toEqual( [
				new MockToken( "some-iri" ), new MockToken( "something" ),
			] );

			pattern = new MockLiteral( resolver, 1.5 )
				.has( "some-iri", "something" )
			;
			expect( pattern.getPattern() ).toEqual( [
				new MockToken( "some-iri" ), new MockToken( "something" ),
			] );

			pattern = new MockLiteral( resolver, false )
				.has( "some-iri", "something" )
			;
			expect( pattern.getPattern() ).toEqual( [
				new MockToken( "some-iri" ), new MockToken( "something" ),
			] );
		} );

	} );

	describe( "Class RDFLiteral", ():void => {

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
			expect( RDFLiteral ).toBeDefined();
			expect( RDFLiteral ).toEqual( jasmine.any( Function ) );
			expect( RDFLiteral ).toBe( LiteralsModule.RDFLiteral );
		} );

		it( "Is a Literal", ():void => {
			let literal:RDFLiteral = new RDFLiteral( resolver, "literal" );
			expect( literal ).toBeDefined();
			expect( literal ).toEqual( jasmine.any( RDFLiteral ) );
			expect( literal ).toEqual( jasmine.any( Literal ) );
		} );

		describe( "Self tokens", ():void => {

			it( "Simple RDFLiteral self tokens", ():void => {
				let literal:RDFLiteral;

				literal = new RDFLiteral( resolver, "literal" );
				expect( literal.getSelfTokens() ).toEqual( [
					new LeftSymbol( "\"" ), new StringLiteral( "literal" ), new RightSymbol( "\"" ),
				] );

				literal = new RDFLiteral( resolver, "another-literal" );
				expect( literal.getSelfTokens() ).toEqual( [
					new LeftSymbol( "\"" ), new StringLiteral( "another-literal" ), new RightSymbol( "\"" ),
				] );

				literal = new RDFLiteral( resolver, "last-literal" );
				expect( literal.getSelfTokens() ).toEqual( [
					new LeftSymbol( "\"" ), new StringLiteral( "last-literal" ), new RightSymbol( "\"" ),
				] );
			} );

			it( "Specifying a type calls to ObjectPattern.addType()", ():void => {
				spyOn( ObjectPattern, "addType" ).and.callFake( ( element, type ):Token[] => {
					return [ new MockToken( element ), new MockToken( type ) ];
				} );

				let literal:Literal;

				literal = new RDFLiteral( resolver, "literal" )
					.ofType( "string" );
				expect( literal.getSelfTokens() ).toEqual( [
					new MockToken( "literal" ), new MockToken( "string" ),
				] );

				literal = new RDFLiteral( resolver, "another-literal" )
					.ofType( "another-thing" );
				expect( literal.getSelfTokens() ).toEqual( [
					new MockToken( "another-literal" ), new MockToken( "another-thing" ),
				] );
			} );

			it( "Specifying a language add the symbols of it", ():void => {
				let literal:Literal;

				literal = new RDFLiteral( resolver, "literal" )
					.withLanguage( "en" );
				expect( literal.getSelfTokens() ).toEqual( [
					new LeftSymbol( "\"" ), new StringLiteral( "literal" ), new RightSymbol( "\"" ),
					new Operator( "@" ), new StringLiteral( "en" ),
				] );

				literal = new RDFLiteral( resolver, "another-literal" )
					.withLanguage( "another-language" );
				expect( literal.getSelfTokens() ).toEqual( [
					new LeftSymbol( "\"" ), new StringLiteral( "another-literal" ), new RightSymbol( "\"" ),
					new Operator( "@" ), new StringLiteral( "another-language" ),
				] );
			} );

		} );

		describe( "getPattern()", ():void => {

			it( "Simple RDFLiteral", ():void => {
				spyOn( ObjectPattern, "serialize" ).and.callFake( ( element ):Token[] => {
					return [ new MockToken( element ) ];
				} );

				let pattern:TriplesSameSubjectMore<GraphPattern> & GraphPattern;

				pattern = new RDFLiteral( resolver, "literal" )
					.has( "some-iri", "something" )
				;
				expect( pattern.getPattern() ).toEqual( [
					new LeftSymbol( "\"" ), new StringLiteral( "literal" ), new RightSymbol( "\"" ),
					new MockToken( "some-iri" ), new MockToken( "something" ),
				] );

				pattern = new RDFLiteral( resolver, "another-literal" )
					.has( "some-iri", "something" )
					.and( "middle-iri-1", "thing-1" )
					.and( "middle-iri-2", [ "thing-2-1", "thing-2-2", "thing-2-3" ] )
					.and( "last-iri", "anything" )
				;
				expect( pattern.getPattern() ).toEqual( [
					new LeftSymbol( "\"" ), new StringLiteral( "another-literal" ), new RightSymbol( "\"" ),
					new MockToken( "some-iri" ), new MockToken( "something" ), new NewLineSymbol( ";" ),
					new MockToken( "middle-iri-1" ), new MockToken( "thing-1" ), new NewLineSymbol( ";" ),
					new MockToken( "middle-iri-2" ), new MockToken( "thing-2-1" ), new NewLineSymbol( "," ), new MockToken( "thing-2-2" ), new NewLineSymbol( "," ), new MockToken( "thing-2-3" ), new NewLineSymbol( ";" ),
					new MockToken( "last-iri" ), new MockToken( "anything" ),
				] );
			} );

			it( "Specifying a type", ():void => {
				spyOn( ObjectPattern, "serialize" ).and.callFake( ( element ):Token[] => {
					return [ new MockToken( element ) ];
				} );
				spyOn( ObjectPattern, "addType" ).and.callFake( ( element, type ):Token[] => {
					return [ new MockToken( element ), new MockToken( type ) ];
				} );
				let pattern:TriplesSameSubjectMore<GraphPattern> & GraphPattern;

				pattern = new RDFLiteral( resolver, "literal" )
					.ofType( "string" )
					.has( "some-iri", "something" )
				;
				expect( pattern.getPattern() ).toEqual( [
					new MockToken( "literal" ), new MockToken( "string" ),
					new MockToken( "some-iri" ), new MockToken( "something" ),
				] );

				pattern = new RDFLiteral( resolver, "another-literal" )
					.ofType( "another-thing" )
					.has( "some-iri", "something" )
					.and( "middle-iri-1", "thing-1" )
					.and( "middle-iri-2", [ "thing-2-1", "thing-2-2", "thing-2-3" ] )
					.and( "last-iri", "anything" )
				;
				expect( pattern.getPattern() ).toEqual( [
					new MockToken( "another-literal" ), new MockToken( "another-thing" ),
					new MockToken( "some-iri" ), new MockToken( "something" ), new NewLineSymbol( ";" ),
					new MockToken( "middle-iri-1" ), new MockToken( "thing-1" ), new NewLineSymbol( ";" ),
					new MockToken( "middle-iri-2" ), new MockToken( "thing-2-1" ), new NewLineSymbol( "," ), new MockToken( "thing-2-2" ), new NewLineSymbol( "," ), new MockToken( "thing-2-3" ), new NewLineSymbol( ";" ),
					new MockToken( "last-iri" ), new MockToken( "anything" ),
				] );
			} );

			it( "Specifying a language", ():void => {
				spyOn( ObjectPattern, "serialize" ).and.callFake( ( element ):Token[] => {
					return [ new MockToken( element ) ];
				} );

				let pattern:TriplesSameSubjectMore<GraphPattern> & GraphPattern;

				pattern = new RDFLiteral( resolver, "literal" )
					.withLanguage( "en" )
					.has( "some-iri", "something" )
				;
				expect( pattern.getPattern() ).toEqual( [
					new LeftSymbol( "\"" ), new StringLiteral( "literal" ), new RightSymbol( "\"" ),
					new Operator( "@" ), new StringLiteral( "en" ),
					new MockToken( "some-iri" ), new MockToken( "something" ),
				] );

				pattern = new RDFLiteral( resolver, "another-literal" )
					.withLanguage( "another-language" )
					.has( "some-iri", "something" )
					.and( "middle-iri-1", "thing-1" )
					.and( "middle-iri-2", [ "thing-2-1", "thing-2-2", "thing-2-3" ] )
					.and( "last-iri", "anything" )
				;
				expect( pattern.getPattern() ).toEqual( [
					new LeftSymbol( "\"" ), new StringLiteral( "another-literal" ), new RightSymbol( "\"" ),
					new Operator( "@" ), new StringLiteral( "another-language" ),
					new MockToken( "some-iri" ), new MockToken( "something" ), new NewLineSymbol( ";" ),
					new MockToken( "middle-iri-1" ), new MockToken( "thing-1" ), new NewLineSymbol( ";" ),
					new MockToken( "middle-iri-2" ), new MockToken( "thing-2-1" ), new NewLineSymbol( "," ), new MockToken( "thing-2-2" ), new NewLineSymbol( "," ), new MockToken( "thing-2-3" ), new NewLineSymbol( ";" ),
					new MockToken( "last-iri" ), new MockToken( "anything" ),
				] );
			} );

		} );

	} );

	describe( "Class NumericLiteral", ():void => {

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
			expect( Literal ).toBeDefined();
			expect( Literal ).toEqual( jasmine.any( Function ) );
			expect( Literal ).toBe( LiteralsModule.Literal );
		} );

		it( "Is a TriplePattern", ():void => {
			let literal:NumericLiteral = new NumericLiteral( resolver, 1 );
			expect( literal ).toBeDefined();
			expect( literal ).toEqual( jasmine.any( Literal ) );
			expect( literal ).toEqual( jasmine.any( TriplesPattern ) );
		} );

		it( "Self tokens created by calling to ObjectPatterns.addType()", ():void => {
			spyOn( ObjectPattern, "addType" ).and.callFake( ( element, type ):Token[] => {
				return [ new MockToken( element ), new MockToken( type ) ];
			} );

			let literal:NumericLiteral;

			literal = new NumericLiteral( resolver, 1 );
			expect( literal.getSelfTokens() ).toEqual( [
				new MockToken( "1" ), new MockToken( "integer" ),
			] );

			literal = new NumericLiteral( resolver, 2 );
			expect( literal.getSelfTokens() ).toEqual( [
				new MockToken( "2" ), new MockToken( "integer" ),
			] );

			literal = new NumericLiteral( resolver, 10.01 );
			expect( literal.getSelfTokens() ).toEqual( [
				new MockToken( "10.01" ), new MockToken( "float" ),
			] );

			literal = new NumericLiteral( resolver, 52.0148 );
			expect( literal.getSelfTokens() ).toEqual( [
				new MockToken( "52.0148" ), new MockToken( "float" ),
			] );
		} );

		it( "getPattern(), concat self and triples tokens", ():void => {
			spyOn( ObjectPattern, "addType" ).and.callFake( ( element, type ):Token[] => {
				return [ new MockToken( element ), new MockToken( type ) ];
			} );
			spyOn( ObjectPattern, "serialize" ).and.callFake( ( element ):Token[] => {
				return [ new MockToken( element ) ];
			} );

			let pattern:TriplesSameSubjectMore<GraphPattern> & GraphPattern;

			pattern = new NumericLiteral( resolver, 1 )
				.has( "some-iri", "something" )
			;
			expect( pattern.getPattern() ).toEqual( [
				new MockToken( "1" ), new MockToken( "integer" ),
				new MockToken( "some-iri" ), new MockToken( "something" ),
			] );

			pattern = new NumericLiteral( resolver, 10.01 )
				.has( "some-iri", "something" )
				.and( "middle-iri-1", "thing-1" )
				.and( "middle-iri-2", [ "thing-2-1", "thing-2-2", "thing-2-3" ] )
				.and( "last-iri", "anything" )
			;
			expect( pattern.getPattern() ).toEqual( [
				new MockToken( "10.01" ), new MockToken( "float" ),
				new MockToken( "some-iri" ), new MockToken( "something" ), new NewLineSymbol( ";" ),
				new MockToken( "middle-iri-1" ), new MockToken( "thing-1" ), new NewLineSymbol( ";" ),
				new MockToken( "middle-iri-2" ), new MockToken( "thing-2-1" ), new NewLineSymbol( "," ), new MockToken( "thing-2-2" ), new NewLineSymbol( "," ), new MockToken( "thing-2-3" ), new NewLineSymbol( ";" ),
				new MockToken( "last-iri" ), new MockToken( "anything" ),
			] );
		} );

	} );

	describe( "Class BooleanLiteral", ():void => {

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
			expect( Literal ).toBeDefined();
			expect( Literal ).toEqual( jasmine.any( Function ) );
			expect( Literal ).toBe( LiteralsModule.Literal );
		} );

		it( "Is a TriplePattern", ():void => {
			let literal:BooleanLiteral = new BooleanLiteral( resolver, true );
			expect( literal ).toBeDefined();
			expect( literal ).toEqual( jasmine.any( Literal ) );
			expect( literal ).toEqual( jasmine.any( TriplesPattern ) );
		} );

		it( "Self tokens created by calling to ObjectPatterns.addType()", ():void => {
			spyOn( ObjectPattern, "addType" ).and.callFake( ( element, type ):Token[] => {
				return [ new MockToken( element ), new MockToken( type ) ];
			} );

			let literal:BooleanLiteral;

			literal = new BooleanLiteral( resolver, true );
			expect( literal.getSelfTokens() ).toEqual( [
				new MockToken( "true" ), new MockToken( "boolean" ),
			] );

			literal = new BooleanLiteral( resolver, false );
			expect( literal.getSelfTokens() ).toEqual( [
				new MockToken( "false" ), new MockToken( "boolean" ),
			] );
		} );

		it( "getPattern(), concat self and triples tokens", ():void => {
			spyOn( ObjectPattern, "addType" ).and.callFake( ( element, type ):Token[] => {
				return [ new MockToken( element ), new MockToken( type ) ];
			} );
			spyOn( ObjectPattern, "serialize" ).and.callFake( ( element ):Token[] => {
				return [ new MockToken( element ) ];
			} );

			let pattern:TriplesSameSubjectMore<GraphPattern> & GraphPattern;

			pattern = new BooleanLiteral( resolver, true )
				.has( "some-iri", "something" )
			;
			expect( pattern.getPattern() ).toEqual( [
				new MockToken( "true" ), new MockToken( "boolean" ),
				new MockToken( "some-iri" ), new MockToken( "something" ),
			] );

			pattern = new BooleanLiteral( resolver, false )
				.has( "some-iri", "something" )
				.and( "middle-iri-1", "thing-1" )
				.and( "middle-iri-2", [ "thing-2-1", "thing-2-2", "thing-2-3" ] )
				.and( "last-iri", "anything" )
			;
			expect( pattern.getPattern() ).toEqual( [
				new MockToken( "false" ), new MockToken( "boolean" ),
				new MockToken( "some-iri" ), new MockToken( "something" ), new NewLineSymbol( ";" ),
				new MockToken( "middle-iri-1" ), new MockToken( "thing-1" ), new NewLineSymbol( ";" ),
				new MockToken( "middle-iri-2" ), new MockToken( "thing-2-1" ), new NewLineSymbol( "," ), new MockToken( "thing-2-2" ), new NewLineSymbol( "," ), new MockToken( "thing-2-3" ), new NewLineSymbol( ";" ),
				new MockToken( "last-iri" ), new MockToken( "anything" ),
			] );
		} );

	} );

} );
