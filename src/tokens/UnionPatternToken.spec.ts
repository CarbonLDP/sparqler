import { GroupPatternToken } from "./GroupPatternToken";
import { PropertyToken } from "./PropertyToken";
import { SubjectToken } from "./SubjectToken";
import { UnionPatternToken } from "./UnionPatternToken";
import { VariableToken } from "./VariableToken";


describe( "UnionPatternToken", ():void => {

	it( "should exists", ():void => {
		expect( UnionPatternToken ).toBeDefined();
		expect( UnionPatternToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "UnionPatternToken.constructor", ():void => {

		it( "should be instantiable", ():void => {
			const token:UnionPatternToken = new UnionPatternToken();

			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( UnionPatternToken ) );
		} );

		it( "should initialize the patterns", ():void => {
			const token:UnionPatternToken = new UnionPatternToken();
			expect( token.groupPatterns ).toEqual( [] );
		} );

		it( "should assign `unionPattern` as token name", ():void => {
			const token:UnionPatternToken = new UnionPatternToken();
			expect( token.token ).toBe( "unionPattern" );
		} );

	} );

	describe( "UnionPatternToken.toString", ():void => {

		it( "should exists", ():void => {
			expect( UnionPatternToken.prototype.toString ).toBeDefined();
			expect( UnionPatternToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return the SPARQL empty statement", ():void => {
			const token:UnionPatternToken = new UnionPatternToken();
			expect( token.toString() ).toBe( "" );
		} );

		it( "should return the pretty SPARQL empty statement", ():void => {
			const token:UnionPatternToken = new UnionPatternToken();
			expect( token.toString( 0 ) ).toBe( "" );
		} );

		it( "should return the SPARQL statement with single group", ():void => {
			const token:UnionPatternToken = new UnionPatternToken();
			token.groupPatterns.push( new GroupPatternToken() );

			expect( token.toString() ).toBe( "{}" );
		} );

		it( "should return the pretty SPARQL statement with single group", ():void => {
			const token:UnionPatternToken = new UnionPatternToken();
			token.groupPatterns.push( new GroupPatternToken() );

			expect( token.toString( 0 ) ).toBe( "{}" );
		} );

		it( "should return the SPARQL statement with single group with patterns", ():void => {
			const token:UnionPatternToken = new UnionPatternToken();
			token.groupPatterns.push( new GroupPatternToken()
				.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
					.addProperty( new PropertyToken( "a" )
						.addObject( new VariableToken( "obj1" ) ),
					),
				)
				.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
					.addProperty( new PropertyToken( "a" )
						.addObject( new VariableToken( "obj1" ) ),
					),
				)
			);

			expect( token.toString() ).toBe( "{ " +
				"" + "?subj1 a ?obj1. " +
				"" + "?subj1 a ?obj1 " +
				"}"
			);
		} );

		it( "should return the pretty SPARQL statement with single group with patterns", ():void => {
			const token:UnionPatternToken = new UnionPatternToken();
			token.groupPatterns.push( new GroupPatternToken()
				.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
					.addProperty( new PropertyToken( "a" )
						.addObject( new VariableToken( "obj1" ) ),
					),
				)
				.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
					.addProperty( new PropertyToken( "a" )
						.addObject( new VariableToken( "obj1" ) ),
					),
				)
			);

			expect( token.toString( 0 ) ).toBe( "{\n" +
				"    ?subj1 a ?obj1.\n" +
				"    ?subj1 a ?obj1\n" +
				"}"
			);
		} );

		it( "should return the SPARQL statement with groups with patterns", ():void => {
			const token:UnionPatternToken = new UnionPatternToken();
			token.groupPatterns.push( new GroupPatternToken()
				.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
					.addProperty( new PropertyToken( "a" )
						.addObject( new VariableToken( "obj1" ) ),
					),
				)
				.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
					.addProperty( new PropertyToken( "a" )
						.addObject( new VariableToken( "obj1" ) ),
					),
				)
			);
			token.groupPatterns.push( new GroupPatternToken()
				.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
					.addProperty( new PropertyToken( "a" )
						.addObject( new VariableToken( "obj1" ) ),
					),
				)
				.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
					.addProperty( new PropertyToken( "a" )
						.addObject( new VariableToken( "obj1" ) ),
					),
				)
			);

			expect( token.toString() ).toBe( "{ " +
				"" + "?subj1 a ?obj1. " +
				"" + "?subj1 a ?obj1 " +
				"} UNION { " +
				"" + "?subj1 a ?obj1. " +
				"" + "?subj1 a ?obj1 " +
				"}"
			);
		} );

		it( "should return the pretty SPARQL statement with groups with patterns", ():void => {
			const token:UnionPatternToken = new UnionPatternToken();
			token.groupPatterns.push( new GroupPatternToken()
				.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
					.addProperty( new PropertyToken( "a" )
						.addObject( new VariableToken( "obj1" ) ),
					),
				)
				.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
					.addProperty( new PropertyToken( "a" )
						.addObject( new VariableToken( "obj1" ) ),
					),
				)
			);
			token.groupPatterns.push( new GroupPatternToken()
				.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
					.addProperty( new PropertyToken( "a" )
						.addObject( new VariableToken( "obj1" ) ),
					),
				)
				.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
					.addProperty( new PropertyToken( "a" )
						.addObject( new VariableToken( "obj1" ) ),
					),
				)
			);

			expect( token.toString( 0 ) ).toBe( "{\n" +
				"    ?subj1 a ?obj1.\n" +
				"    ?subj1 a ?obj1\n" +
				"} UNION {\n" +
				"    ?subj1 a ?obj1.\n" +
				"    ?subj1 a ?obj1\n" +
				"}"
			);
		} );

	} );

} );

