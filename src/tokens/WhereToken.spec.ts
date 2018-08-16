import { GroupPatternToken } from "./GroupPatternToken";
import { PropertyToken } from "./PropertyToken";
import { SubjectToken } from "./SubjectToken";
import { VariableToken } from "./VariableToken";
import { WhereToken } from "./WhereToken";


describe( "WhereToken", ():void => {

	it( "should exists", ():void => {
		expect( WhereToken ).toBeDefined();
		expect( WhereToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "WhereToken.constructor", ():void => {

		it( "should be instantiable", ():void => {
			const token:WhereToken = new WhereToken();

			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( WhereToken ) );
		} );

		it( "should initialize the patterns", ():void => {
			const token:WhereToken = new WhereToken();
			expect( token.groupPattern ).toEqual( jasmine.any( GroupPatternToken ) );
		} );

		it( "should assign `where` as token name", ():void => {
			const token:WhereToken = new WhereToken();
			expect( token.token ).toBe( "where" );
		} );

	} );

	describe( "WhereToken.toString", ():void => {

		it( "should exists", ():void => {
			expect( WhereToken.prototype.toString ).toBeDefined();
			expect( WhereToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return the SPARQL empty statement", ():void => {
			const token:WhereToken = new WhereToken();
			expect( token.toString() ).toBe( "{}" );
		} );

		it( "should return the pretty SPARQL empty statement", ():void => {
			const token:WhereToken = new WhereToken();
			expect( token.toString( 0 ) ).toBe( "WHERE {}" );
		} );

		it( "should return the SPARQL statement with patterns", ():void => {
			const token:WhereToken = new WhereToken();
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

			expect( token.toString() ).toBe( "{ " +
				"" + "?subj1 a ?obj1. " +
				"" + "?subj1 a ?obj1 " +
				"}"
			);
		} );

		it( "should return the pretty SPARQL statement with patterns", ():void => {
			const token:WhereToken = new WhereToken();
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
				"WHERE {\n" +
				"    ?subj1 a ?obj1.\n" +
				"    ?subj1 a ?obj1\n" +
				"}"
			);
		} );

	} );

} );
