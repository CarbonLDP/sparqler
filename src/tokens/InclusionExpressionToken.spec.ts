import { ExpressionListToken } from "./ExpressionListToken";
import { InclusionExpressionToken } from "./InclusionExpressionToken";
import { VariableToken } from "./VariableToken";


describe( "InclusionExpressionToken", ():void => {

	it( "should exists", ():void => {
		expect( InclusionExpressionToken ).toBeDefined();
		expect( InclusionExpressionToken ).toEqual( jasmine.any( Function ) );
	} );


	describe( "InclusionExpressionToken.constructor", ():void => {

		it( "should exists", ():void => {
			const token:InclusionExpressionToken = new InclusionExpressionToken( new VariableToken( "foo" ), "IN", new ExpressionListToken() );
			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( InclusionExpressionToken ) );
		} );


		it( "should initialize the expression", ():void => {
			const expression = new VariableToken( "foo" );
			const token:InclusionExpressionToken = new InclusionExpressionToken( expression, "IN", new ExpressionListToken() );
			expect( token.expression ).toBe( expression );
		} );

		it( "should initialize the operation", ():void => {
			const operation = "IN";
			const token:InclusionExpressionToken = new InclusionExpressionToken( new VariableToken( "foo" ), operation, new ExpressionListToken() );
			expect( token.operation ).toBe( operation );
		} );

		it( "should initialize the operation", ():void => {
			const list = new ExpressionListToken();
			const token:InclusionExpressionToken = new InclusionExpressionToken( new VariableToken( "foo" ), "IN", list );
			expect( token.list ).toBe( list );
		} );

	} );


	describe( "InclusionExpressionToken.toString", ():void => {

		it( "should override default", ():void => {
			expect( InclusionExpressionToken.prototype.toString ).toBeDefined();
			expect( InclusionExpressionToken.prototype.toString ).not.toBe( Object.prototype.toString );
		} );


		it( "should compact print empty", ():void => {
			const token:InclusionExpressionToken = new InclusionExpressionToken( new VariableToken( "foo" ), "IN", new ExpressionListToken( [] ) );
			expect( token.toString() ).toBe( "?foo IN ()" );
		} );

		it( "should pretty print empty", ():void => {
			const token:InclusionExpressionToken = new InclusionExpressionToken( new VariableToken( "foo" ), "IN", new ExpressionListToken( [] ) );
			expect( token.toString( 0 ) ).toBe( "?foo IN ()" );
		} );


		it( "should compact print with multiple expressions", ():void => {
			const token:InclusionExpressionToken = new InclusionExpressionToken( new VariableToken( "foo" ), "IN", new ExpressionListToken( [ new VariableToken( "bar" ), new VariableToken( "baz" ) ] ) );
			expect( token.toString() ).toBe( "?foo IN (?bar,?baz)" );
		} );

		it( "should pretty print with multiple expressions", ():void => {
			const token:InclusionExpressionToken = new InclusionExpressionToken( new VariableToken( "foo" ), "IN", new ExpressionListToken( [ new VariableToken( "bar" ), new VariableToken( "baz" ) ] ) );
			expect( token.toString( 0 ) ).toBe( "?foo IN ( ?bar, ?baz )" );
		} );

	} );

} );
