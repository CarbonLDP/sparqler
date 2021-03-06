import { FromToken } from "./FromToken";
import { IRIRefToken } from "./IRIRefToken";
import { LimitToken } from "./LimitToken";
import { OffsetToken } from "./OffsetToken";
import { OptionalToken } from "./OptionalToken";
import { PatternToken } from "./PatternToken";
import { PrefixedNameToken } from "./PrefixedNameToken";
import { PropertyToken } from "./PropertyToken";
import { SelectToken } from "./SelectToken";
import { SolutionModifierToken } from "./SolutionModifierToken";
import { SubjectToken } from "./SubjectToken";
import { VariableToken } from "./VariableToken";
import { WhereToken } from "./WhereToken";


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

		it( "should initialize projections", ():void => {
			const token:SelectToken = new SelectToken();
			expect( token.projections ).toEqual( [] );
		} );

		it( "should initialize datasets", ():void => {
			const token:SelectToken = new SelectToken();
			expect( token.datasets ).toEqual( [] );
		} );

		it( "should initialize where", ():void => {
			const token:SelectToken = new SelectToken();
			expect( token.where ).toEqual( jasmine.any( WhereToken ) );
		} );

		it( "should initialize modifiers", ():void => {
			const token:SelectToken = new SelectToken();
			expect( token.modifiers ).toEqual( [] );
		} );

		it( "should assign `select` as token name", ():void => {
			expect( new SelectToken().token ).toBe( "select" );
		} );

	} );

	describe( "SelectToken.addProjection", ():void => {

		it( "should exists", ():void => {
			expect( SelectToken.prototype.addProjection ).toBeDefined();
			expect( SelectToken.prototype.addProjection ).toEqual( jasmine.any( Function ) );
		} );

		it( "should add single triple", ():void => {
			const token:SelectToken = new SelectToken();

			const variable:VariableToken = new VariableToken( "var" );
			token.addProjection( variable );

			expect( token.projections ).toEqual( [ variable ] );
		} );

		it( "should add multiple triples", ():void => {
			const token:SelectToken = new SelectToken();

			const variable1:VariableToken = new VariableToken( "var1" );
			const variable2:VariableToken = new VariableToken( "var2" );
			token.addProjection( variable1, variable2 );

			expect( token.projections ).toEqual( [ variable1, variable2 ] );
		} );

		it( "should append triples added", ():void => {
			const token:SelectToken = new SelectToken();

			const firstVariable:VariableToken = new VariableToken( "first_var" );
			token.addProjection( firstVariable );

			const newVariable:VariableToken = new VariableToken( "new_var" );
			token.addProjection( newVariable );

			expect( token.projections ).toEqual( [ firstVariable, newVariable ] );
		} );

		it( "should return itself", ():void => {
			const token:SelectToken = new SelectToken();

			const variable:VariableToken = new VariableToken( "var" );
			const returnedValue:SelectToken = token.addProjection( variable );

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

			expect( token.where.groupPattern.patterns ).toEqual( [ pattern ] );
		} );

		it( "should add multiple patterns", ():void => {
			const token:SelectToken = new SelectToken();

			const pattern1:PatternToken = new SubjectToken( new VariableToken( "pattern" ) );
			const pattern2:PatternToken = new OptionalToken();
			token.addPattern( pattern1, pattern2 );

			expect( token.where.groupPattern.patterns ).toEqual( [ pattern1, pattern2 ] );
		} );

		it( "should append patterns", ():void => {
			const token:SelectToken = new SelectToken();

			const firstPattern:PatternToken = new SubjectToken( new VariableToken( "pattern" ) );
			token.addPattern( firstPattern );

			const newPattern:PatternToken = new OptionalToken();
			token.addPattern( newPattern );

			expect( token.where.groupPattern.patterns ).toEqual( [ firstPattern, newPattern ] );
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

			const modifier:SolutionModifierToken = new LimitToken( 10 );
			token.addModifier( modifier );

			expect( token.modifiers ).toEqual( [ modifier ] );
		} );

		it( "should add multiple modifiers", ():void => {
			const token:SelectToken = new SelectToken();

			const modifier1:SolutionModifierToken = new LimitToken( 10 );
			const modifier2:SolutionModifierToken = new OffsetToken( 0 );
			token.addModifier( modifier1, modifier2 );

			expect( token.modifiers ).toEqual( [ modifier1, modifier2 ] );
		} );

		it( "should append modifiers", ():void => {
			const token:SelectToken = new SelectToken();

			const firstModifier:SolutionModifierToken = new LimitToken( 10 );
			token.addModifier( firstModifier );

			const newModifier:SolutionModifierToken = new OffsetToken( 0 );
			token.addModifier( newModifier );

			expect( token.modifiers ).toEqual( [ firstModifier, newModifier ] );
		} );

		it( "should return itself", ():void => {
			const token:SelectToken = new SelectToken();

			const modifier:SolutionModifierToken = new LimitToken( 10 );
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

			expect( token.toString() ).toEqual( "SELECT * {}" );
		} );

		it( "should print the pretty base SPARQL select", ():void => {
			const token:SelectToken = new SelectToken();

			expect( token.toString( 0 ) ).toEqual( "SELECT *\nWHERE {}" );
		} );

		it( "should print the base SPARQL select with modifier `DISTINCT`", ():void => {
			const token:SelectToken = new SelectToken( "DISTINCT" );

			expect( token.toString() ).toEqual( "SELECT DISTINCT * {}" );
		} );

		it( "should print the pretty base SPARQL select with modifier `DISTINCT`", ():void => {
			const token:SelectToken = new SelectToken( "DISTINCT" );

			expect( token.toString( 0 ) ).toEqual( "SELECT DISTINCT *\nWHERE {}" );
		} );

		it( "should print the base SPARQL select with modifier `REDUCED`", ():void => {
			const token:SelectToken = new SelectToken( "REDUCED" );

			expect( token.toString() ).toEqual( "SELECT REDUCED * {}" );
		} );

		it( "should print the pretty base SPARQL select with modifier `REDUCED`", ():void => {
			const token:SelectToken = new SelectToken( "REDUCED" );

			expect( token.toString( 0 ) ).toEqual( "SELECT REDUCED *\nWHERE {}" );
		} );

		it( "should print the SPARQL select with projections", ():void => {
			const token:SelectToken = new SelectToken()
				.addProjection( new VariableToken( "subj" ) )
				.addProjection( new VariableToken( "obj" ) )
			;

			expect( token.toString() ).toEqual( "" +
				"SELECT ?subj ?obj " +
				"{}",
			);
		} );

		it( "should print the pretty SPARQL select with projections", ():void => {
			const token:SelectToken = new SelectToken()
				.addProjection( new VariableToken( "subj" ) )
				.addProjection( new VariableToken( "obj" ) )
			;

			expect( token.toString( 0 ) ).toEqual( "" +
				"SELECT ?subj ?obj\n" +
				"WHERE {}",
			);
		} );

		it( "should print the SPARQL select with datasets", ():void => {
			const token:SelectToken = new SelectToken();
			token.datasets.push(
				new FromToken( new IRIRefToken( "resource/" ) ),
				new FromToken( new PrefixedNameToken( "ex:resource" ) ),
			);

			expect( token.toString() ).toEqual( "" +
				"SELECT * " +
				"FROM <resource/> " +
				"FROM ex:resource " +
				"{}",
			);
		} );

		it( "should print the pretty SPARQL select with datasets", ():void => {
			const token:SelectToken = new SelectToken();
			token.datasets.push(
				new FromToken( new IRIRefToken( "resource/" ) ),
				new FromToken( new PrefixedNameToken( "ex:resource" ) ),
			);

			expect( token.toString( 0 ) ).toEqual( "" +
				"SELECT *\n" +
				"FROM <resource/>\n" +
				"FROM ex:resource\n" +
				"WHERE {}",
			);
		} );

		it( "should print the SPARQL select with patterns", ():void => {
			const token:SelectToken = new SelectToken()
				.addPattern( new SubjectToken( new VariableToken( "subj" ) )
					.addProperty( new PropertyToken( "a" )
						.addObject( new PrefixedNameToken( "ex:Resource" ) ),
					),
				)
				.addPattern( new OptionalToken()
					.addPattern( new SubjectToken( new VariableToken( "subj" ) )
						.addProperty( new PropertyToken( "a" )
							.addObject( new VariableToken( "obj" ) ),
						),
					),
				)
			;

			expect( token.toString() ).toEqual( "" +
				"SELECT * " +
				"{ " +
				"" + "?subj a ex:Resource. " +
				"" + "OPTIONAL { ?subj a ?obj } " +
				"}",
			);
		} );

		it( "should print the pretty SPARQL select with patterns", ():void => {
			const token:SelectToken = new SelectToken()
				.addPattern( new SubjectToken( new VariableToken( "subj" ) )
					.addProperty( new PropertyToken( "a" )
						.addObject( new PrefixedNameToken( "ex:Resource" ) ),
					),
				)
				.addPattern( new OptionalToken()
					.addPattern( new SubjectToken( new VariableToken( "subj" ) )
						.addProperty( new PropertyToken( "a" )
							.addObject( new VariableToken( "obj" ) ),
						),
					),
				)
			;

			expect( token.toString( 0 ) ).toEqual( "" +
				"SELECT *\n" +
				"WHERE {\n" +
				"    ?subj a ex:Resource.\n" +
				"    OPTIONAL { ?subj a ?obj }\n" +
				"}",
			);
		} );

		it( "should print the SPARQL select with modifiers", ():void => {
			const token:SelectToken = new SelectToken()
				.addModifier( new LimitToken( 10 ) )
				.addModifier( new OffsetToken( 0 ) )
			;

			expect( token.toString() ).toEqual( "" +
				"SELECT * " +
				"{} " +
				"LIMIT 10 " +
				"OFFSET 0",
			);
		} );

		it( "should print the pretty SPARQL select with modifiers", ():void => {
			const token:SelectToken = new SelectToken()
				.addModifier( new LimitToken( 10 ) )
				.addModifier( new OffsetToken( 0 ) )
			;

			expect( token.toString( 0 ) ).toEqual( "" +
				"SELECT *\n" +
				"WHERE {}\n" +
				"LIMIT 10\n" +
				"OFFSET 0",
			);
		} );

	} );

} );
