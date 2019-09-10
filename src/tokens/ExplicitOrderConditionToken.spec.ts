import { BracketedExpressionToken } from "./BracketedExpressionToken";
import { ExplicitOrderConditionToken } from "./ExplicitOrderConditionToken";
import { UnaryOperationToken } from "./UnaryOperationToken";
import { VariableToken } from "./VariableToken";


describe( "ExplicitOrderConditionToken", ():void => {

	it( "should exists", ():void => {
		expect( ExplicitOrderConditionToken ).toBeDefined();
		expect( ExplicitOrderConditionToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "ExplicitOrderConditionToken.constructor", ():void => {

		it( "should be instantiable", ():void => {
			const token:ExplicitOrderConditionToken = new ExplicitOrderConditionToken( "ASC", new BracketedExpressionToken( new VariableToken( "foo" ) ) );

			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( ExplicitOrderConditionToken ) );
		} );

		it( "should assign the provided flow", ():void => {
			const token:ExplicitOrderConditionToken = new ExplicitOrderConditionToken( "ASC", new BracketedExpressionToken( new VariableToken( "foo" ) ) );
			expect( token.flow ).toBe( "ASC" );
		} );

		it( "should assign the provided condition", ():void => {
			const condition = new BracketedExpressionToken( new VariableToken( "foo" ) );
			const token:ExplicitOrderConditionToken = new ExplicitOrderConditionToken( "ASC", condition );
			expect( token.condition ).toBe( condition );
		} );

		it( "should assign the token name", ():void => {
			const token:ExplicitOrderConditionToken = new ExplicitOrderConditionToken( "ASC", new BracketedExpressionToken( new VariableToken( "foo" ) ) );
			expect( token.token ).toBe( "explicitOrderCondition" );
		} );

	} );

	describe( "ExplicitOrderConditionToken.toString", ():void => {

		it( "should exists", ():void => {
			expect( ExplicitOrderConditionToken.prototype.toString ).toBeDefined();
			expect( ExplicitOrderConditionToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );


		it( "should compact print the SPARQL statement with Expression", ():void => {
			const token:ExplicitOrderConditionToken = new ExplicitOrderConditionToken( "ASC", new BracketedExpressionToken( new UnaryOperationToken( "!", new VariableToken( "foo" ) ) ) );
			expect( token.toString() ).toBe( "ASC (!?foo)" );
		} );

		it( "should pretty print the SPARQL statement with Expression", ():void => {
			const token:ExplicitOrderConditionToken = new ExplicitOrderConditionToken( "DESC", new BracketedExpressionToken( new UnaryOperationToken( "!", new VariableToken( "foo" ) ) ) );
			expect( token.toString( 0 ) ).toBe( "DESC ( ! ?foo )" );
		} );

	} );

} );
