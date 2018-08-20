import { ConstructToken } from "./ConstructToken";
import { IRIRefToken } from "./IRIRefToken";
import { LimitToken } from "./LimitToken";
import { OffsetToken } from "./OffsetToken";
import { OptionalToken } from "./OptionalToken";
import { PrefixedNameToken } from "./PrefixedNameToken";
import { PropertyToken } from "./PropertyToken";
import { SubjectToken } from "./SubjectToken";
import { VariableToken } from "./VariableToken";
import { WhereToken } from "./WhereToken";


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

		it( "should initialize where", ():void => {
			const token:ConstructToken = new ConstructToken();
			expect( token.where ).toEqual( jasmine.any( WhereToken ) );
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
			const triple2:SubjectToken = new SubjectToken( new IRIRefToken( "triple2" ) );
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

	describe( "ConstructToken.toString", ():void => {

		it( "should exists", ():void => {
			expect( ConstructToken.prototype.toString ).toBeDefined();
			expect( ConstructToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );

		it( "should print the SPARQL construct without modifiers", ():void => {
			const token:ConstructToken = new ConstructToken()
				.addTriple( new SubjectToken( new VariableToken( "subj1" ) )
					.addProperty( new PropertyToken( "a" )
						.addObject( new VariableToken( "obj1" ) ),
					),
				)
				.addTriple( new SubjectToken( new VariableToken( "subj1" ) )
					.addProperty( new PropertyToken( new PrefixedNameToken( "ex", "property" ) )
						.addObject( new VariableToken( "obj2" ) ),
					),
				)
				.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
					.addProperty( new PropertyToken( "a" )
						.addObject( new PrefixedNameToken( "ex:Resource" ) ),
					),
				)
				.addPattern( new OptionalToken()
					.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
						.addProperty( new PropertyToken( "a" )
							.addObject( new VariableToken( "obj1" ) ),
						),
					),
				)
				.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
					.addProperty( new PropertyToken( new PrefixedNameToken( "ex", "property" ) )
						.addObject( new VariableToken( "obj2" ) ),
					),
				)
			;

			expect( token.toString() ).toEqual( "" +
				"CONSTRUCT { " +
				"" + "?subj1 a ?obj1. " +
				"" + "?subj1 ex:property ?obj2 " +
				"} { " +
				"" + "?subj1 a ex:Resource. " +
				"" + "OPTIONAL { ?subj1 a ?obj1 } " +
				"" + "?subj1 ex:property ?obj2 " +
				"}",
			);
		} );

		it( "should print the pretty SPARQL construct without modifiers", ():void => {
			const token:ConstructToken = new ConstructToken()
				.addTriple( new SubjectToken( new VariableToken( "subj1" ) )
					.addProperty( new PropertyToken( "a" )
						.addObject( new VariableToken( "obj1" ) ),
					),
				)
				.addTriple( new SubjectToken( new VariableToken( "subj1" ) )
					.addProperty( new PropertyToken( new PrefixedNameToken( "ex", "property" ) )
						.addObject( new VariableToken( "obj2" ) ),
					),
				)
				.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
					.addProperty( new PropertyToken( "a" )
						.addObject( new PrefixedNameToken( "ex:Resource" ) ),
					),
				)
				.addPattern( new OptionalToken()
					.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
						.addProperty( new PropertyToken( "a" )
							.addObject( new VariableToken( "obj1" ) ),
						),
					),
				)
				.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
					.addProperty( new PropertyToken( new PrefixedNameToken( "ex", "property" ) )
						.addObject( new VariableToken( "obj2" ) ),
					),
				)
			;

			expect( token.toString( 0 ) ).toEqual( "" +
				"CONSTRUCT {\n" +
				"    ?subj1 a ?obj1.\n" +
				"    ?subj1 ex:property ?obj2\n" +
				"}\n" +
				"WHERE {\n" +
				"    ?subj1 a ex:Resource.\n" +
				"    OPTIONAL { ?subj1 a ?obj1 }\n" +
				"    ?subj1 ex:property ?obj2\n" +
				"}",
			);
		} );

		it( "should print the SPARQL construct with modifiers", ():void => {
			const token:ConstructToken = new ConstructToken()
				.addTriple( new SubjectToken( new VariableToken( "subj1" ) )
					.addProperty( new PropertyToken( "a" )
						.addObject( new VariableToken( "obj1" ) ),
					),
				)
				.addTriple( new SubjectToken( new VariableToken( "subj1" ) )
					.addProperty( new PropertyToken( new PrefixedNameToken( "ex", "property" ) )
						.addObject( new VariableToken( "obj2" ) ),
					),
				)
				.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
					.addProperty( new PropertyToken( "a" )
						.addObject( new PrefixedNameToken( "ex:Resource" ) ),
					),
				)
				.addPattern( new OptionalToken()
					.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
						.addProperty( new PropertyToken( "a" )
							.addObject( new VariableToken( "obj1" ) ),
						),
					),
				)
				.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
					.addProperty( new PropertyToken( new PrefixedNameToken( "ex", "property" ) )
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
				"} { " +
				"" + "?subj1 a ex:Resource. " +
				"" + "OPTIONAL { ?subj1 a ?obj1 } " +
				"" + "?subj1 ex:property ?obj2 " +
				"} " +
				"LIMIT 10 " +
				"OFFSET 0",
			);
		} );

		it( "should print the pretty SPARQL construct with modifiers", ():void => {
			const token:ConstructToken = new ConstructToken()
				.addTriple( new SubjectToken( new VariableToken( "subj1" ) )
					.addProperty( new PropertyToken( "a" )
						.addObject( new VariableToken( "obj1" ) ),
					),
				)
				.addTriple( new SubjectToken( new VariableToken( "subj1" ) )
					.addProperty( new PropertyToken( new PrefixedNameToken( "ex", "property" ) )
						.addObject( new VariableToken( "obj2" ) ),
					),
				)
				.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
					.addProperty( new PropertyToken( "a" )
						.addObject( new PrefixedNameToken( "ex:Resource" ) ),
					),
				)
				.addPattern( new OptionalToken()
					.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
						.addProperty( new PropertyToken( "a" )
							.addObject( new VariableToken( "obj1" ) ),
						),
					),
				)
				.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
					.addProperty( new PropertyToken( new PrefixedNameToken( "ex", "property" ) )
						.addObject( new VariableToken( "obj2" ) ),
					),
				)
				.addModifier( new LimitToken( 10 ) )
				.addModifier( new OffsetToken( 0 ) )
			;

			expect( token.toString( 0 ) ).toEqual( "" +
				"CONSTRUCT {\n" +
				"    ?subj1 a ?obj1.\n" +
				"    ?subj1 ex:property ?obj2\n" +
				"}\n" +
				"WHERE {\n" +
				"    ?subj1 a ex:Resource.\n" +
				"    OPTIONAL { ?subj1 a ?obj1 }\n" +
				"    ?subj1 ex:property ?obj2\n" +
				"}\n" +
				"LIMIT 10\n" +
				"OFFSET 0",
			);
		} );

	} );

} );