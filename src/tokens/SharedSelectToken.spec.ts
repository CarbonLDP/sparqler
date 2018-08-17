import { LimitToken } from "./LimitToken";
import { OffsetToken } from "./OffsetToken";
import { OptionalToken } from "./OptionalToken";
import { PrefixedNameToken } from "./PrefixedNameToken";
import { PropertyToken } from "./PropertyToken";
import { SharedSelectToken } from "./SharedSelectToken";
import { SubjectToken } from "./SubjectToken";
import { VariableToken } from "./VariableToken";


describe( "SharedSelectToken", ():void => {

	class MockSharedSelectToken extends SharedSelectToken {
		readonly token:"mockShared" = "mockShared";

		constructor( modifier?:SharedSelectToken[ "modifier" ] ) {
			super( modifier );
		}
	}

	it( "should exists", ():void => {
		expect( SharedSelectToken ).toBeDefined();
		expect( SharedSelectToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "SharedSelectToken.constructor", ():void => {

		it( "should be instantiable", ():void => {
			const token:SharedSelectToken = new MockSharedSelectToken();
			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( SharedSelectToken ) );
		} );

		it( "should not assign modifier if not provided", ():void => {
			const token:SharedSelectToken = new MockSharedSelectToken();
			expect( token.modifier ).toBeUndefined();
		} );

		it( "should assign the modifier `DISTINCT`", ():void => {
			const token:SharedSelectToken = new MockSharedSelectToken( "DISTINCT" );
			expect( token.modifier ).toBe( "DISTINCT" );
		} );

		it( "should assign the modifier `REDUCED`", ():void => {
			const token:SharedSelectToken = new MockSharedSelectToken( "REDUCED" );
			expect( token.modifier ).toBe( "REDUCED" );
		} );

		it( "should initialize variables", ():void => {
			const token:SharedSelectToken = new MockSharedSelectToken();
			expect( token.variables ).toEqual( [] );
		} );

	} );

	describe( "SharedSelectToken.addVariable", ():void => {

		it( "should exists", ():void => {
			expect( SharedSelectToken.prototype.addVariable ).toBeDefined();
			expect( SharedSelectToken.prototype.addVariable ).toEqual( jasmine.any( Function ) );
		} );

		it( "should add single triple", ():void => {
			const token:SharedSelectToken = new MockSharedSelectToken();

			const variable:VariableToken = new VariableToken( "var" );
			token.addVariable( variable );

			expect( token.variables ).toEqual( [ variable ] );
		} );

		it( "should add multiple triples", ():void => {
			const token:SharedSelectToken = new MockSharedSelectToken();

			const variable1:VariableToken = new VariableToken( "var1" );
			const variable2:VariableToken = new VariableToken( "var2" );
			token.addVariable( variable1, variable2 );

			expect( token.variables ).toEqual( [ variable1, variable2 ] );
		} );

		it( "should append triples added", ():void => {
			const token:SharedSelectToken = new MockSharedSelectToken();

			const firstVariable:VariableToken = new VariableToken( "first_var" );
			token.addVariable( firstVariable );

			const newVariable:VariableToken = new VariableToken( "new_var" );
			token.addVariable( newVariable );

			expect( token.variables ).toEqual( [ firstVariable, newVariable ] );
		} );

		it( "should return itself", ():void => {
			const token:SharedSelectToken = new MockSharedSelectToken();

			const variable:VariableToken = new VariableToken( "var" );
			const returnedValue:SharedSelectToken = token.addVariable( variable );

			expect( returnedValue ).toBe( token );
		} );

	} );

	describe( "SharedSelectToken.toString", ():void => {

		it( "should exists", ():void => {
			expect( SharedSelectToken.prototype.toString ).toBeDefined();
			expect( SharedSelectToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );

		it( "should print the shared base SPARQL select", ():void => {
			const token:SharedSelectToken = new MockSharedSelectToken();

			expect( token.toString() ).toEqual( "SELECT *" );
		} );

		it( "should print the pretty shared base SPARQL select", ():void => {
			const token:SharedSelectToken = new MockSharedSelectToken();

			expect( token.toString( 0 ) ).toEqual( "SELECT *" );
		} );

		it( "should print the shared base SPARQL select with modifier `DISTINCT`", ():void => {
			const token:SharedSelectToken = new MockSharedSelectToken( "DISTINCT" );

			expect( token.toString() ).toEqual( "SELECT DISTINCT *" );
		} );

		it( "should print the pretty shared base SPARQL select with modifier `DISTINCT`", ():void => {
			const token:SharedSelectToken = new MockSharedSelectToken( "DISTINCT" );

			expect( token.toString( 0 ) ).toEqual( "SELECT DISTINCT *" );
		} );

		it( "should print the shared base SPARQL select with modifier `REDUCED`", ():void => {
			const token:SharedSelectToken = new MockSharedSelectToken( "REDUCED" );

			expect( token.toString() ).toEqual( "SELECT REDUCED *" );
		} );

		it( "should print the pretty shared base SPARQL select with modifier `REDUCED`", ():void => {
			const token:SharedSelectToken = new MockSharedSelectToken( "REDUCED" );

			expect( token.toString( 0 ) ).toEqual( "SELECT REDUCED *" );
		} );

		it( "should print the shared SPARQL select with variables", ():void => {
			const token:SharedSelectToken = new MockSharedSelectToken()
				.addVariable( new VariableToken( "subj" ) )
				.addVariable( new VariableToken( "obj" ) )
			;

			expect( token.toString() ).toEqual( "SELECT ?subj ?obj" );
		} );

		it( "should print the pretty shared SPARQL select with variables", ():void => {
			const token:SharedSelectToken = new MockSharedSelectToken()
				.addVariable( new VariableToken( "subj" ) )
				.addVariable( new VariableToken( "obj" ) )
			;

			expect( token.toString( 0 ) ).toEqual( "SELECT ?subj ?obj" );
		} );

		it( "should print the shared SPARQL select even with patterns", ():void => {
			const token:SharedSelectToken = new MockSharedSelectToken()
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

			expect( token.toString() ).toEqual( "SELECT *" );
		} );

		it( "should print the pretty shared SPARQL select even with patterns", ():void => {
			const token:SharedSelectToken = new MockSharedSelectToken()
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

			expect( token.toString( 0 ) ).toEqual( "SELECT *" );
		} );

		it( "should print the shared SPARQL select even with modifiers", ():void => {
			const token:SharedSelectToken = new MockSharedSelectToken()
				.addModifier( new LimitToken( 10 ) )
				.addModifier( new OffsetToken( 0 ) )
			;

			expect( token.toString() ).toEqual( "SELECT *" );
		} );

		it( "should print the pretty shared SPARQL select even with modifiers", ():void => {
			const token:SharedSelectToken = new MockSharedSelectToken()
				.addModifier( new LimitToken( 10 ) )
				.addModifier( new OffsetToken( 0 ) )
			;

			expect( token.toString( 0 ) ).toEqual( "SELECT *" );
		} );

	} );

} );
