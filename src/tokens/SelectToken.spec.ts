import {
	PatternToken,
	SolutionModifier,
} from "sparqler/tokens";
import { LimitToken } from "sparqler/tokens/LimitToken";
import { OffsetToken } from "sparqler/tokens/OffsetToken";
import { OptionalToken } from "sparqler/tokens/OptionalToken";
import { PredicateToken } from "sparqler/tokens/PredicateToken";
import { PrefixedNameToken } from "sparqler/tokens/PrefixedNameToken";
import { SubjectToken } from "sparqler/tokens/SubjectToken";
import { VariableToken } from "sparqler/tokens/VariableToken";

import * as Module from "./SelectToken";
import { SelectToken } from "./SelectToken";

describe( "Module SelectToken", ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	describe( "SelectToken", ():void => {

		it( "should exists", ():void => {
			expect( SelectToken ).toBeDefined();
			expect( SelectToken ).toEqual( jasmine.any( Function ) );
		} );

		describe( "SelectToken.constructor", ():void => {

			it( "should be instantiable", ():void => {
				const token:SelectToken = new SelectToken();
				expect( token ).toBeDefined();
				expect( token ).toEqual( jasmine.any( SelectToken ) );
			} );

			it( "should not assign modifier if not provided", ():void => {
				const token:SelectToken = new SelectToken();
				expect( token.modifier ).toBeUndefined();
			} );

			it( "should assign the modifier `DISTINCT`", ():void => {
				const token:SelectToken = new SelectToken( "DISTINCT" );
				expect( token.modifier ).toBe( "DISTINCT" );
			} );

			it( "should assign the modifier `REDUCED`", ():void => {
				const token:SelectToken = new SelectToken( "REDUCED" );
				expect( token.modifier ).toBe( "REDUCED" );
			} );

			it( "should initialize variables", ():void => {
				const token:SelectToken = new SelectToken();
				expect( token.variables ).toEqual( [] );
			} );

			it( "should initialize patterns", ():void => {
				const token:SelectToken = new SelectToken();
				expect( token.patterns ).toEqual( [] );
			} );

			it( "should initialize modifiers", ():void => {
				const token:SelectToken = new SelectToken();
				expect( token.modifiers ).toEqual( [] );
			} );

			it( "should assign `select` as token name", ():void => {
				expect( new SelectToken().token ).toBe( "select" );
			} );

		} );

		describe( "SelectToken.addVariable", ():void => {

			it( "should exists", ():void => {
				expect( SelectToken.prototype.addVariable ).toBeDefined();
				expect( SelectToken.prototype.addVariable ).toEqual( jasmine.any( Function ) );
			} );

			it( "should add single triple", ():void => {
				const token:SelectToken = new SelectToken();

				const variable:VariableToken = new VariableToken( "var" );
				token.addVariable( variable );

				expect( token.variables ).toEqual( [ variable ] );
			} );

			it( "should add multiple triples", ():void => {
				const token:SelectToken = new SelectToken();

				const variable1:VariableToken = new VariableToken( "var1" );
				const variable2:VariableToken = new VariableToken( "var2" );
				token.addVariable( variable1, variable2 );

				expect( token.variables ).toEqual( [ variable1, variable2 ] );
			} );

			it( "should append triples added", ():void => {
				const token:SelectToken = new SelectToken();

				const firstVariable:VariableToken = new VariableToken( "first_var" );
				token.addVariable( firstVariable );

				const newVariable:VariableToken = new VariableToken( "new_var" );
				token.addVariable( newVariable );

				expect( token.variables ).toEqual( [ firstVariable, newVariable ] );
			} );

			it( "should return itself", ():void => {
				const token:SelectToken = new SelectToken();

				const variable:VariableToken = new VariableToken( "var" );
				const returnedValue:SelectToken = token.addVariable( variable );

				expect( returnedValue ).toBe( token );
			} );

		} );

		describe( "SelectToken.addPattern", ():void => {

			it( "should exists", ():void => {
				expect( SelectToken.prototype.addPattern ).toBeDefined();
				expect( SelectToken.prototype.addPattern ).toEqual( jasmine.any( Function ) );
			} );

			it( "should add single pattern", ():void => {
				const token:SelectToken = new SelectToken();

				const pattern:PatternToken = new SubjectToken( new VariableToken( "pattern" ) );
				token.addPattern( pattern );

				expect( token.patterns ).toEqual( [ pattern ] );
			} );

			it( "should add multiple patterns", ():void => {
				const token:SelectToken = new SelectToken();

				const pattern1:PatternToken = new SubjectToken( new VariableToken( "pattern" ) );
				const pattern2:PatternToken = new OptionalToken();
				token.addPattern( pattern1, pattern2 );

				expect( token.patterns ).toEqual( [ pattern1, pattern2 ] );
			} );

			it( "should append patterns", ():void => {
				const token:SelectToken = new SelectToken();

				const firstPattern:PatternToken = new SubjectToken( new VariableToken( "pattern" ) );
				token.addPattern( firstPattern );

				const newPattern:PatternToken = new OptionalToken();
				token.addPattern( newPattern );

				expect( token.patterns ).toEqual( [ firstPattern, newPattern ] );
			} );

			it( "should return itself", ():void => {
				const token:SelectToken = new SelectToken();

				const pattern:PatternToken = new OptionalToken();
				const returned:SelectToken = token.addPattern( pattern );

				expect( returned ).toBe( token );
			} );

		} );

		describe( "SelectToken.addModifier", ():void => {

			it( "should exists", ():void => {
				expect( SelectToken.prototype.addModifier ).toBeDefined();
				expect( SelectToken.prototype.addModifier ).toEqual( jasmine.any( Function ) );
			} );

			it( "should add single modifier", ():void => {
				const token:SelectToken = new SelectToken();

				const modifier:SolutionModifier = new LimitToken( 10 );
				token.addModifier( modifier );

				expect( token.modifiers ).toEqual( [ modifier ] );
			} );

			it( "should add multiple modifiers", ():void => {
				const token:SelectToken = new SelectToken();

				const modifier1:SolutionModifier = new LimitToken( 10 );
				const modifier2:SolutionModifier = new OffsetToken( 0 );
				token.addModifier( modifier1, modifier2 );

				expect( token.modifiers ).toEqual( [ modifier1, modifier2 ] );
			} );

			it( "should append modifiers", ():void => {
				const token:SelectToken = new SelectToken();

				const firstModifier:SolutionModifier = new LimitToken( 10 );
				token.addModifier( firstModifier );

				const newModifier:SolutionModifier = new OffsetToken( 0 );
				token.addModifier( newModifier );

				expect( token.modifiers ).toEqual( [ firstModifier, newModifier ] );
			} );

			it( "should return itself", ():void => {
				const token:SelectToken = new SelectToken();

				const modifier:SolutionModifier = new LimitToken( 10 );
				const returned:SelectToken = token.addModifier( modifier );

				expect( returned ).toBe( token );
			} );

		} );

		describe( "SelectToken.toString", ():void => {

			it( "should exists", ():void => {
				expect( SelectToken.prototype.toString ).toBeDefined();
				expect( SelectToken.prototype.toString ).toEqual( jasmine.any( Function ) );
			} );

			it( "should print the base SPARQL select", ():void => {
				const token:SelectToken = new SelectToken();

				expect( token.toString() ).toEqual( "SELECT WHERE {  }" );
			} );

			it( "should print the base SPARQL select with modifier `DISTINCT`", ():void => {
				const token:SelectToken = new SelectToken( "DISTINCT" );

				expect( token.toString() ).toEqual( "SELECT DISTINCT WHERE {  }" );
			} );

			it( "should print the base SPARQL select with modifier `REDUCED`", ():void => {
				const token:SelectToken = new SelectToken( "REDUCED" );

				expect( token.toString() ).toEqual( "SELECT REDUCED WHERE {  }" );
			} );

			it( "should print the SPARQL select with variables", ():void => {
				const token:SelectToken = new SelectToken()
					.addVariable( new VariableToken( "subj" ) )
					.addVariable( new VariableToken( "obj" ) )
				;

				expect( token.toString() ).toEqual( "" +
					"SELECT ?subj ?obj " +
					"WHERE {  }",
				);
			} );

			it( "should print the SPARQL select with patterns", ():void => {
				const token:SelectToken = new SelectToken()
					.addPattern( new SubjectToken( new VariableToken( "subj" ) )
						.addPredicate( new PredicateToken( "a" )
							.addObject( new PrefixedNameToken( "ex:Resource" ) ),
						),
					)
					.addPattern( new OptionalToken()
						.addPattern( new SubjectToken( new VariableToken( "subj" ) )
							.addPredicate( new PredicateToken( "a" )
								.addObject( new VariableToken( "obj" ) ),
							),
						),
					)
				;

				expect( token.toString() ).toEqual( "" +
					"SELECT " +
					"WHERE { " +
					"" + "?subj a ex:Resource. " +
					"" + "OPTIONAL { " +
					"" + "" + "?subj a ?obj " +
					"" + "} " +
					"}",
				);
			} );

			it( "should print the SPARQL select with modifiers", ():void => {
				const token:SelectToken = new SelectToken()
					.addModifier( new LimitToken( 10 ) )
					.addModifier( new OffsetToken( 0 ) )
				;

				expect( token.toString() ).toEqual( "" +
					"SELECT " +
					"WHERE {  } " +
					"LIMIT 10 " +
					"OFFSET 0",
				);
			} );

		} );

	} );

} );
