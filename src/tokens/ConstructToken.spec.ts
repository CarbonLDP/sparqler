import {
	PatternToken,
	} from "sparqler/PatternToken";
import { IRIToken } from "sparqler/tokens/IRIToken";
import { LimitToken } from "sparqler/tokens/LimitToken";
import { OffsetToken } from "sparqler/tokens/OffsetToken";
import { OptionalToken } from "sparqler/tokens/OptionalToken";
import { PredicateToken } from "sparqler/tokens/PredicateToken";
import { PrefixedNameToken } from "sparqler/tokens/PrefixedNameToken";
import { SolutionModifierToken } from "sparqler/tokens/SolutionModifierToken";
import { SubjectToken } from "sparqler/tokens/SubjectToken";
import { VariableToken } from "sparqler/tokens/VariableToken";

import * as Module from "./ConstructToken";
import { ConstructToken } from "./ConstructToken";

describe( "Module ConstructToken", ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	describe( "ConstructToken", ():void => {

		it( "should exists", ():void => {
			expect( ConstructToken ).toBeDefined();
			expect( ConstructToken ).toEqual( jasmine.any( Function ) );
		} );

		describe( "ConstructToken.constructor", ():void => {

			it( "should be instantiable", ():void => {
				const token:ConstructToken = new ConstructToken();
				expect( token ).toBeDefined();
				expect( token ).toEqual( jasmine.any( ConstructToken ) );
			} );

			it( "should initialize triples", ():void => {
				const token:ConstructToken = new ConstructToken();
				expect( token.triples ).toEqual( [] );
			} );

			it( "should initialize patterns", ():void => {
				const token:ConstructToken = new ConstructToken();
				expect( token.where ).toEqual( [] );
			} );

			it( "should initialize modifiers", ():void => {
				const token:ConstructToken = new ConstructToken();
				expect( token.modifiers ).toEqual( [] );
			} );

			it( "should assign `construct` as token name", ():void => {
				expect( new ConstructToken().token ).toBe( "construct" );
				expect( new ConstructToken().token ).toBe( "construct" );
			} );

		} );

		describe( "ConstructToken.addTriple", ():void => {

			it( "should exists", ():void => {
				expect( ConstructToken.prototype.addTriple ).toBeDefined();
				expect( ConstructToken.prototype.addTriple ).toEqual( jasmine.any( Function ) );
			} );

			it( "should add single triple", ():void => {
				const token:ConstructToken = new ConstructToken();

				const triple:SubjectToken = new SubjectToken( new VariableToken( "triple" ) );
				token.addTriple( triple );

				expect( token.triples ).toEqual( [ triple ] );
			} );

			it( "should add multiple triples", ():void => {
				const token:ConstructToken = new ConstructToken();

				const triple1:SubjectToken = new SubjectToken( new VariableToken( "triple1" ) );
				const triple2:SubjectToken = new SubjectToken( new IRIToken( "triple2" ) );
				token.addTriple( triple1, triple2 );

				expect( token.triples ).toEqual( [ triple1, triple2 ] );
			} );

			it( "should append triples added", ():void => {
				const token:ConstructToken = new ConstructToken();

				const firstTriple:SubjectToken = new SubjectToken( new VariableToken( "first_triple" ) );
				token.addTriple( firstTriple );

				const newTriple:SubjectToken = new SubjectToken( new VariableToken( "new_triple" ) );
				token.addTriple( newTriple );

				expect( token.triples ).toEqual( [ firstTriple, newTriple ] );
			} );

			it( "should return itself", ():void => {
				const token:ConstructToken = new ConstructToken();

				const triple:SubjectToken = new SubjectToken( new VariableToken( "triple" ) );
				const returnedValue:ConstructToken = token.addTriple( triple );

				expect( returnedValue ).toBe( token );
			} );

		} );

		describe( "ConstructToken.addPattern", ():void => {

			it( "should exists", ():void => {
				expect( ConstructToken.prototype.addPattern ).toBeDefined();
				expect( ConstructToken.prototype.addPattern ).toEqual( jasmine.any( Function ) );
			} );

			it( "should add single pattern", ():void => {
				const token:ConstructToken = new ConstructToken();

				const pattern:PatternToken = new SubjectToken( new VariableToken( "pattern" ) );
				token.addPattern( pattern );

				expect( token.where ).toEqual( [ pattern ] );
			} );

			it( "should add multiple patterns", ():void => {
				const token:ConstructToken = new ConstructToken();

				const pattern1:PatternToken = new SubjectToken( new VariableToken( "pattern" ) );
				const pattern2:PatternToken = new OptionalToken();
				token.addPattern( pattern1, pattern2 );

				expect( token.where ).toEqual( [ pattern1, pattern2 ] );
			} );

			it( "should append patterns", ():void => {
				const token:ConstructToken = new ConstructToken();

				const firstPattern:PatternToken = new SubjectToken( new VariableToken( "pattern" ) );
				token.addPattern( firstPattern );

				const newPattern:PatternToken = new OptionalToken();
				token.addPattern( newPattern );

				expect( token.where ).toEqual( [ firstPattern, newPattern ] );
			} );

			it( "should return itself", ():void => {
				const token:ConstructToken = new ConstructToken();

				const pattern:PatternToken = new OptionalToken();
				const returned:ConstructToken = token.addPattern( pattern );

				expect( returned ).toBe( token );
			} );

		} );

		describe( "ConstructToken.addModifier", ():void => {

			it( "should exists", ():void => {
				expect( ConstructToken.prototype.addModifier ).toBeDefined();
				expect( ConstructToken.prototype.addModifier ).toEqual( jasmine.any( Function ) );
			} );

			it( "should add single modifier", ():void => {
				const token:ConstructToken = new ConstructToken();

				const modifier:SolutionModifierToken = new LimitToken( 10 );
				token.addModifier( modifier );

				expect( token.modifiers ).toEqual( [ modifier ] );
			} );

			it( "should add multiple modifiers", ():void => {
				const token:ConstructToken = new ConstructToken();

				const modifier1:SolutionModifierToken = new LimitToken( 10 );
				const modifier2:SolutionModifierToken = new OffsetToken( 0 );
				token.addModifier( modifier1, modifier2 );

				expect( token.modifiers ).toEqual( [ modifier1, modifier2 ] );
			} );

			it( "should append modifiers", ():void => {
				const token:ConstructToken = new ConstructToken();

				const firstModifier:SolutionModifierToken = new LimitToken( 10 );
				token.addModifier( firstModifier );

				const newModifier:SolutionModifierToken = new OffsetToken( 0 );
				token.addModifier( newModifier );

				expect( token.modifiers ).toEqual( [ firstModifier, newModifier ] );
			} );

			it( "should return itself", ():void => {
				const token:ConstructToken = new ConstructToken();

				const modifier:SolutionModifierToken = new LimitToken( 10 );
				const returned:ConstructToken = token.addModifier( modifier );

				expect( returned ).toBe( token );
			} );

		} );

		describe( "ConstructToken.toString", ():void => {

			it( "should exists", ():void => {
				expect( ConstructToken.prototype.toString ).toBeDefined();
				expect( ConstructToken.prototype.toString ).toEqual( jasmine.any( Function ) );
			} );

			it( "should print the SPARQL construct without modifiers", ():void => {
				const token:ConstructToken = new ConstructToken()
					.addTriple( new SubjectToken( new VariableToken( "subj1" ) )
						.addPredicate( new PredicateToken( "a" )
							.addObject( new VariableToken( "obj1" ) ),
						),
					)
					.addTriple( new SubjectToken( new VariableToken( "subj1" ) )
						.addPredicate( new PredicateToken( new PrefixedNameToken( "ex", "property" ) )
							.addObject( new VariableToken( "obj2" ) ),
						),
					)
					.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
						.addPredicate( new PredicateToken( "a" )
							.addObject( new PrefixedNameToken( "ex:Resource" ) ),
						),
					)
					.addPattern( new OptionalToken()
						.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
							.addPredicate( new PredicateToken( "a" )
								.addObject( new VariableToken( "obj1" ) ),
							),
						),
					)
					.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
						.addPredicate( new PredicateToken( new PrefixedNameToken( "ex", "property" ) )
							.addObject( new VariableToken( "obj2" ) ),
						),
					)
				;

				expect( token.toString() ).toEqual( "" +
					"CONSTRUCT { " +
					"" + "?subj1 a ?obj1. " +
					"" + "?subj1 ex:property ?obj2 " +
					"} " +
					"WHERE { " +
					"" + "?subj1 a ex:Resource. " +
					"" + "OPTIONAL { " +
					"" + "" + "?subj1 a ?obj1 " +
					"" + "}. " +
					"" + "?subj1 ex:property ?obj2 " +
					"}",
				);
			} );

			it( "should print the SPARQL construct with modifiers", ():void => {
				const token:ConstructToken = new ConstructToken()
					.addTriple( new SubjectToken( new VariableToken( "subj1" ) )
						.addPredicate( new PredicateToken( "a" )
							.addObject( new VariableToken( "obj1" ) ),
						),
					)
					.addTriple( new SubjectToken( new VariableToken( "subj1" ) )
						.addPredicate( new PredicateToken( new PrefixedNameToken( "ex", "property" ) )
							.addObject( new VariableToken( "obj2" ) ),
						),
					)
					.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
						.addPredicate( new PredicateToken( "a" )
							.addObject( new PrefixedNameToken( "ex:Resource" ) ),
						),
					)
					.addPattern( new OptionalToken()
						.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
							.addPredicate( new PredicateToken( "a" )
								.addObject( new VariableToken( "obj1" ) ),
							),
						),
					)
					.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
						.addPredicate( new PredicateToken( new PrefixedNameToken( "ex", "property" ) )
							.addObject( new VariableToken( "obj2" ) ),
						),
					)
					.addModifier( new LimitToken( 10 ) )
					.addModifier( new OffsetToken( 0 ) )
				;

				expect( token.toString() ).toEqual( "" +
					"CONSTRUCT { " +
					"" + "?subj1 a ?obj1. " +
					"" + "?subj1 ex:property ?obj2 " +
					"} " +
					"WHERE { " +
					"" + "?subj1 a ex:Resource. " +
					"" + "OPTIONAL { " +
					"" + "" + "?subj1 a ?obj1 " +
					"" + "}. " +
					"" + "?subj1 ex:property ?obj2 " +
					"} " +
					"LIMIT 10 " +
					"OFFSET 0",
				);
			} );

		} );

	} );

} );
