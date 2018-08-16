import { GroupPatternToken } from "./GroupPatternToken";
import { OptionalToken } from "./OptionalToken";
import { PatternToken } from "./PatternToken";
import { PropertyToken } from "./PropertyToken";
import { SubjectToken } from "./SubjectToken";
import { VariableToken } from "./VariableToken";


describe( "GroupPatternToken", ():void => {

	it( "should exists", ():void => {
		expect( GroupPatternToken ).toBeDefined();
		expect( GroupPatternToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "GroupPatternToken.constructor", ():void => {

		it( "should be instantiable", ():void => {
			const token:GroupPatternToken = new GroupPatternToken();

			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( GroupPatternToken ) );
		} );

		it( "should initialize the patterns", ():void => {
			const token:GroupPatternToken = new GroupPatternToken();
			expect( token.patterns ).toEqual( [] );
		} );

		it( "should assign `groupPattern` as token name", ():void => {
			const token:GroupPatternToken = new GroupPatternToken();
			expect( token.token ).toBe( "groupPattern" );
		} );

	} );

	describe( "GroupPatternToken.addPattern", ():void => {

		it( "should exists", ():void => {
			expect( GroupPatternToken.prototype.addPattern ).toBeDefined();
			expect( GroupPatternToken.prototype.addPattern ).toEqual( jasmine.any( Function ) );
		} );

		it( "should add single pattern", ():void => {
			const token:GroupPatternToken = new GroupPatternToken();

			const pattern:PatternToken = new SubjectToken( new VariableToken( "pattern" ) );
			token.addPattern( pattern );

			expect( token.patterns ).toEqual( [ pattern ] );
		} );

		it( "should add multiple patterns", ():void => {
			const token:GroupPatternToken = new GroupPatternToken();

			const pattern1:PatternToken = new SubjectToken( new VariableToken( "pattern" ) );
			const pattern2:PatternToken = new OptionalToken();
			token.addPattern( pattern1, pattern2 );

			expect( token.patterns ).toEqual( [ pattern1, pattern2 ] );
		} );

		it( "should append patterns", ():void => {
			const token:GroupPatternToken = new GroupPatternToken();

			const firstPattern:PatternToken = new SubjectToken( new VariableToken( "pattern" ) );
			token.addPattern( firstPattern );

			const newPattern:PatternToken = new OptionalToken();
			token.addPattern( newPattern );

			expect( token.patterns ).toEqual( [ firstPattern, newPattern ] );
		} );

		it( "should return itself", ():void => {
			const token:GroupPatternToken = new GroupPatternToken();
			const returned:GroupPatternToken = token.addPattern();

			expect( returned ).toBe( token );
		} );

	} );

	describe( "GroupPatternToken.toString", ():void => {

		it( "should exists", ():void => {
			expect( GroupPatternToken.prototype.toString ).toBeDefined();
			expect( GroupPatternToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return the SPARQL empty group statement", ():void => {
			const token:GroupPatternToken = new GroupPatternToken();
			expect( token.toString() ).toBe( "{}" );
		} );

		it( "should return the pretty SPARQL empty group statement", ():void => {
			const token:GroupPatternToken = new GroupPatternToken();
			expect( token.toString( 0 ) ).toBe( "{}" );
		} );

		it( "should return the SPARQL group statement with pattern", ():void => {
			const token:GroupPatternToken = new GroupPatternToken()
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
				"{ " +
				"" + "?subj1 a ?obj1. " +
				"" + "?subj1 a ?obj1 " +
				"}"
			);
		} );

		it( "should return the pretty SPARQL group statement with pattern", ():void => {
			const token:GroupPatternToken = new GroupPatternToken()
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
				"{\n" +
				"    ?subj1 a ?obj1.\n" +
				"    ?subj1 a ?obj1\n" +
				"}"
			);
		} );

	} );

} );
