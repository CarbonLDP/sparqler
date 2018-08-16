import { GroupPatternToken } from "./GroupPatternToken";
import { MinusPatternToken } from "./MinusPatternToken";
import { PropertyToken } from "./PropertyToken";
import { SubjectToken } from "./SubjectToken";
import { VariableToken } from "./VariableToken";


describe( "MinusPatternToken", ():void => {

	it( "should exists", ():void => {
		expect( MinusPatternToken ).toBeDefined();
		expect( MinusPatternToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "MinusPatternToken.constructor", ():void => {

		it( "should be instantiable", ():void => {
			const token:MinusPatternToken = new MinusPatternToken();

			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( MinusPatternToken ) );
		} );

		it( "should initialize the groupPattern", ():void => {
			const token:MinusPatternToken = new MinusPatternToken();
			expect( token.groupPattern ).toEqual( jasmine.any( GroupPatternToken ) );
		} );

		it( "should assign `minusPattern` as token name", ():void => {
			const token:MinusPatternToken = new MinusPatternToken();
			expect( token.token ).toBe( "minusPattern" );
		} );

	} );

	describe( "MinusPatternToken.toString", ():void => {

		it( "should exists", ():void => {
			expect( MinusPatternToken.prototype.toString ).toBeDefined();
			expect( MinusPatternToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return the SPARQL empty graph statement", ():void => {
			const token:MinusPatternToken = new MinusPatternToken();
			expect( token.toString() ).toBe( "MINUS {}" );
		} );

		it( "should return the pretty SPARQL empty graph statement", ():void => {
			const token:MinusPatternToken = new MinusPatternToken();
			expect( token.toString( 0 ) ).toBe( "MINUS {}" );
		} );

		it( "should return the SPARQL graph statement with pattern", ():void => {
			const token:MinusPatternToken = new MinusPatternToken();
			token.groupPattern
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
				"MINUS { " +
				"" + "?subj1 a ?obj1. " +
				"" + "?subj1 a ?obj1 " +
				"}"
			);
		} );

		it( "should return the pretty SPARQL graph statement with pattern", ():void => {
			const token:MinusPatternToken = new MinusPatternToken();
			token.groupPattern
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
				"MINUS {\n" +
				"    ?subj1 a ?obj1.\n" +
				"    ?subj1 a ?obj1\n" +
				"}"
			);
		} );

	} );

} );
