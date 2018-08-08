import { GroupPatternToken } from "./GroupPatternToken";
import * as Module from "./OptionalToken";
import { OptionalToken } from "./OptionalToken";
import { PatternToken } from "./PatternToken";
import { PropertyToken } from "./PropertyToken";
import { SubjectToken } from "./SubjectToken";
import { VariableToken } from "./VariableToken";


describe( "Module OptionalToken", ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	describe( "OptionalToken", ():void => {

		it( "should exists", ():void => {
			expect( OptionalToken ).toBeDefined();
			expect( OptionalToken ).toEqual( jasmine.any( Function ) );
		} );

		describe( "OptionalToken.constructor", ():void => {

			it( "should be instantiable", ():void => {
				const token:OptionalToken = new OptionalToken();

				expect( token ).toBeDefined();
				expect( token ).toEqual( jasmine.any( OptionalToken ) );
			} );

			it( "should initialize the patterns", ():void => {
				const token:OptionalToken = new OptionalToken();
				expect( token.groupPattern ).toEqual( jasmine.any( GroupPatternToken ) );
			} );

			it( "should assign `optional` as token name", ():void => {
				const token:OptionalToken = new OptionalToken();
				expect( token.token ).toBe( "optional" );
			} );

		} );

		describe( "OptionalToken.addPattern", ():void => {

			it( "should exists", ():void => {
				expect( OptionalToken.prototype.addPattern ).toBeDefined();
				expect( OptionalToken.prototype.addPattern ).toEqual( jasmine.any( Function ) );
			} );

			it( "should add single pattern", ():void => {
				const token:OptionalToken = new OptionalToken();

				const pattern:PatternToken = new SubjectToken( new VariableToken( "pattern" ) );
				token.addPattern( pattern );

				expect( token.groupPattern.patterns ).toEqual( [ pattern ] );
			} );

			it( "should add multiple patterns", ():void => {
				const token:OptionalToken = new OptionalToken();

				const pattern1:PatternToken = new SubjectToken( new VariableToken( "pattern" ) );
				const pattern2:PatternToken = new OptionalToken();
				token.addPattern( pattern1, pattern2 );

				expect( token.groupPattern.patterns ).toEqual( [ pattern1, pattern2 ] );
			} );

			it( "should append patterns", ():void => {
				const token:OptionalToken = new OptionalToken();

				const firstPattern:PatternToken = new SubjectToken( new VariableToken( "pattern" ) );
				token.addPattern( firstPattern );

				const newPattern:PatternToken = new OptionalToken();
				token.addPattern( newPattern );

				expect( token.groupPattern.patterns ).toEqual( [ firstPattern, newPattern ] );
			} );

			it( "should return itself", ():void => {
				const token:OptionalToken = new OptionalToken();

				const pattern:PatternToken = new OptionalToken();
				const returned:OptionalToken = token.addPattern( pattern );

				expect( returned ).toBe( token );
			} );

		} );

		describe( "OptionalToken.toString", ():void => {

			it( "should exists", ():void => {
				expect( OptionalToken.prototype.toString ).toBeDefined();
				expect( OptionalToken.prototype.toString ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return the SPARQL empty optional statement", ():void => {
				const token:OptionalToken = new OptionalToken();
				expect( token.toString() ).toBe( "OPTIONAL {}" );
			} );

			it( "should return the pretty SPARQL empty optional statement", ():void => {
				const token:OptionalToken = new OptionalToken();
				expect( token.toString( 0 ) ).toBe( "OPTIONAL {}" );
			} );

			it( "should return the SPARQL optional statement with patterns", ():void => {
				const token:OptionalToken = new OptionalToken()
					.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
						.addPredicate( new PropertyToken( "a" )
							.addObject( new VariableToken( "obj1" ) ),
						),
					)
					.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
						.addPredicate( new PropertyToken( "a" )
							.addObject( new VariableToken( "obj1" ) ),
						),
					)
				;

				expect( token.toString() ).toBe( "" +
					"OPTIONAL { " +
					"" + "?subj1 a ?obj1. " +
					"" + "?subj1 a ?obj1 " +
					"}"
				);
			} );

			it( "should return the pretty SPARQL optional statement with patterns", ():void => {
				const token:OptionalToken = new OptionalToken()
					.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
						.addPredicate( new PropertyToken( "a" )
							.addObject( new VariableToken( "obj1" ) ),
						),
					)
					.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
						.addPredicate( new PropertyToken( "a" )
							.addObject( new VariableToken( "obj1" ) ),
						),
					)
				;

				expect( token.toString( 0 ) ).toBe( "" +
					"OPTIONAL {\n" +
					"    ?subj1 a ?obj1.\n" +
					"    ?subj1 a ?obj1\n" +
					"}"
				);
			} );

		} );

	} );

} );
