import { ExpressionToken } from "./ExpressionToken";
import { InclusionExpressionToken } from "./InclusionExpressionToken";
import { VariableToken } from "./VariableToken";


describe( "InclusionExpressionToken", ():void => {

	it( "should exists", ():void => {
		expect( InclusionExpressionToken ).toBeDefined();
		expect( InclusionExpressionToken ).toEqual( jasmine.any( Function ) );
	} );


	describe( "InclusionExpressionToken.constructor", ():void => {

		it( "should exists", ():void => {
			const token:InclusionExpressionToken = new InclusionExpressionToken( "IN", new VariableToken( "foo" ), [] );
			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( InclusionExpressionToken ) );
		} );


		it( "should initialize the operation", ():void => {
			const operation = "IN";
			const token:InclusionExpressionToken = new InclusionExpressionToken( operation, new VariableToken( "foo" ), [] );
			expect( token.operator ).toBe( operation );
		} );

		it( "should initialize the operand", ():void => {
			const operand = new VariableToken( "foo" );
			const token:InclusionExpressionToken = new InclusionExpressionToken( "IN", operand, [] );
			expect( token.operand ).toBe( operand );
		} );

		it( "should initialize the expression list", ():void => {
			const expressions:ExpressionToken[] = [];
			const token:InclusionExpressionToken = new InclusionExpressionToken( "IN", new VariableToken( "foo" ), expressions );
			expect( token.expressionList.expressions ).toBe( expressions );
		} );

	} );


	describe( "InclusionExpressionToken.toString", ():void => {

		it( "should override default", ():void => {
			expect( InclusionExpressionToken.prototype.toString ).toBeDefined();
			expect( InclusionExpressionToken.prototype.toString ).not.toBe( Object.prototype.toString );
		} );


		it( "should compact print empty", ():void => {
			const token:InclusionExpressionToken = new InclusionExpressionToken( "IN", new VariableToken( "foo" ), [] );
			expect( token.toString() ).toBe( "?foo IN ()" );
		} );

		it( "should pretty print empty", ():void => {
			const token:InclusionExpressionToken = new InclusionExpressionToken( "IN", new VariableToken( "foo" ), [] );
			expect( token.toString( 0 ) ).toBe( "?foo IN ()" );
		} );


		it( "should compact print with multiple expressions", ():void => {
			const token:InclusionExpressionToken = new InclusionExpressionToken( "IN", new VariableToken( "foo" ), [ new VariableToken( "bar" ), new VariableToken( "baz" ) ] );
			expect( token.toString() ).toBe( "?foo IN (?bar,?baz)" );
		} );

		it( "should pretty print with multiple expressions", ():void => {
			const token:InclusionExpressionToken = new InclusionExpressionToken( "IN", new VariableToken( "foo" ), [ new VariableToken( "bar" ), new VariableToken( "baz" ) ] );
			expect( token.toString( 0 ) ).toBe( "?foo IN ( ?bar, ?baz )" );
		} );

	} );

} );
