import { AskToken } from "./AskToken";
import { FromToken } from "./FromToken";
import { IRIRefToken } from "./IRIRefToken";
import { LimitToken } from "./LimitToken";
import { OffsetToken } from "./OffsetToken";
import { OptionalToken } from "./OptionalToken";
import { PrefixedNameToken } from "./PrefixedNameToken";
import { PropertyToken } from "./PropertyToken";
import { SubjectToken } from "./SubjectToken";
import { VariableToken } from "./VariableToken";
import { WhereToken } from "./WhereToken";


describe( "AskToken", ():void => {

	it( "should exists", ():void => {
		expect( AskToken ).toBeDefined();
		expect( AskToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "AskToken.constructor", ():void => {

		it( "should be instantiable", ():void => {
			const token:AskToken = new AskToken();
			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( AskToken ) );
		} );

		it( "should initialize datasets", ():void => {
			const token:AskToken = new AskToken();
			expect( token.datasets ).toEqual( [] );
		} );

		it( "should initialize where", ():void => {
			const token:AskToken = new AskToken();
			expect( token.where ).toEqual( jasmine.any( WhereToken ) );
		} );

		it( "should initialize modifiers", ():void => {
			const token:AskToken = new AskToken();
			expect( token.modifiers ).toEqual( [] );
		} );

		it( "should assign `ask` as token name", ():void => {
			expect( new AskToken().token ).toBe( "ask" );
		} );

	} );

	describe( "AskToken.toString", ():void => {

		it( "should exists", ():void => {
			expect( AskToken.prototype.toString ).toBeDefined();
			expect( AskToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );

		it( "should print the base SPARQL select", ():void => {
			const token:AskToken = new AskToken();

			expect( token.toString() ).toEqual( "ASK {}" );
		} );

		it( "should print the pretty base SPARQL select", ():void => {
			const token:AskToken = new AskToken();

			expect( token.toString( 0 ) ).toEqual( "ASK\nWHERE {}" );
		} );

		it( "should print the SPARQL select with datasets", ():void => {
			const token:AskToken = new AskToken();
			token.datasets.push(
				new FromToken( new IRIRefToken( "resource/" ) ),
				new FromToken( new PrefixedNameToken( "ex:resource" ) ),
			);

			expect( token.toString() ).toEqual( "ASK" +
				" " +
				"FROM <resource/> " +
				"FROM ex:resource " +
				"{}",
			);
		} );

		it( "should print the pretty SPARQL select with datasets", ():void => {
			const token:AskToken = new AskToken();
			token.datasets.push(
				new FromToken( new IRIRefToken( "resource/" ) ),
				new FromToken( new PrefixedNameToken( "ex:resource" ) ),
			);

			expect( token.toString( 0 ) ).toEqual( "ASK" +
				"\n" +
				"FROM <resource/>\n" +
				"FROM ex:resource\n" +
				"WHERE {}",
			);
		} );

		it( "should print the SPARQL select with patterns", ():void => {
			const token:AskToken = new AskToken()
				.addPattern( new SubjectToken( new VariableToken( "subj" ) )
					.addPredicate( new PropertyToken( "a" )
						.addObject( new PrefixedNameToken( "ex:Resource" ) ),
					),
				)
				.addPattern( new OptionalToken()
					.addPattern( new SubjectToken( new VariableToken( "subj" ) )
						.addPredicate( new PropertyToken( "a" )
							.addObject( new VariableToken( "obj" ) ),
						),
					),
				)
			;

			expect( token.toString() ).toEqual( "" +
				"ASK " +
				"{ " +
				"" + "?subj a ex:Resource. " +
				"" + "OPTIONAL { ?subj a ?obj } " +
				"}",
			);
		} );

		it( "should print the pretty SPARQL select with patterns", ():void => {
			const token:AskToken = new AskToken()
				.addPattern( new SubjectToken( new VariableToken( "subj" ) )
					.addPredicate( new PropertyToken( "a" )
						.addObject( new PrefixedNameToken( "ex:Resource" ) ),
					),
				)
				.addPattern( new OptionalToken()
					.addPattern( new SubjectToken( new VariableToken( "subj" ) )
						.addPredicate( new PropertyToken( "a" )
							.addObject( new VariableToken( "obj" ) ),
						),
					),
				)
			;

			expect( token.toString( 0 ) ).toEqual( "" +
				"ASK\n" +
				"WHERE {\n" +
				"    ?subj a ex:Resource.\n" +
				"    OPTIONAL { ?subj a ?obj }\n" +
				"}",
			);
		} );

		it( "should print the SPARQL select with modifiers", ():void => {
			const token:AskToken = new AskToken()
				.addModifier( new LimitToken( 10 ) )
				.addModifier( new OffsetToken( 0 ) )
			;

			expect( token.toString() ).toEqual( "" +
				"ASK " +
				"{} " +
				"LIMIT 10 " +
				"OFFSET 0",
			);
		} );

		it( "should print the pretty SPARQL select with modifiers", ():void => {
			const token:AskToken = new AskToken()
				.addModifier( new LimitToken( 10 ) )
				.addModifier( new OffsetToken( 0 ) )
			;

			expect( token.toString( 0 ) ).toEqual( "" +
				"ASK\n" +
				"WHERE {}\n" +
				"LIMIT 10\n" +
				"OFFSET 0",
			);
		} );

	} );

} );
