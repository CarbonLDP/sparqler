import { BracketedExpressionToken } from "./BracketedExpressionToken";
import { ExpressionListToken } from "./ExpressionListToken";
import { FunctionToken } from "./FunctionToken";
import { IRIRefToken } from "./IRIRefToken";
import { MultiplicativeExpressionToken } from "./MultiplicativeExpressionToken";
import { MultiplicativeOperationToken } from "./MultiplicativeOperationToken";
import { PrefixedNameToken } from "./PrefixedNameToken";
import { UnaryOperationToken } from "./UnaryOperationToken";
import { VariableToken } from "./VariableToken";


describe( "MultiplicativeExpressionToken", () => {

	it( "should exist", () => {
		expect( MultiplicativeExpressionToken ).toBeDefined();
		expect( MultiplicativeExpressionToken ).toEqual( jasmine.any( Object ) );
	} );


	describe( "MultiplicativeExpressionToken.is", () => {

		it( "should exist", () => {
			expect( MultiplicativeExpressionToken.is ).toBeDefined();
			expect( MultiplicativeExpressionToken.is ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return true when MultiplicativeOperationToken", () => {
			const returned = MultiplicativeExpressionToken.is( new MultiplicativeOperationToken( "*", new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when UnaryOperationToken", () => {
			const returned = MultiplicativeExpressionToken.is( new UnaryOperationToken( "!", new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when BracketedExpressionToken", () => {
			const returned = MultiplicativeExpressionToken.is( new BracketedExpressionToken( new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when FunctionToken", () => {
			const returned = MultiplicativeExpressionToken.is( new FunctionToken( "isBlank", new ExpressionListToken( [ new VariableToken( "foo" ) ] ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when VariableToken", () => {
			const returned = MultiplicativeExpressionToken.is( new VariableToken( "foo" ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when VariableToken", () => {
			const returned = MultiplicativeExpressionToken.is( new VariableToken( "foo" ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when IRIRefToken", () => {
			const returned = MultiplicativeExpressionToken.is( new IRIRefToken( "foo" ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when PrefixedNameToken", () => {
			const returned = MultiplicativeExpressionToken.is( new PrefixedNameToken( "ex", "foo" ) );
			expect( returned ).toBe( true );
		} );

	} );

} );
