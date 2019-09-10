import { BracketedExpressionToken } from "./BracketedExpressionToken";
import { ExpressionListToken } from "./ExpressionListToken";
import { FunctionToken } from "./FunctionToken";
import { IRIRefToken } from "./IRIRefToken";
import { PrefixedNameToken } from "./PrefixedNameToken";
import { PrimaryExpressionToken } from "./PrimaryExpressionToken";
import { UnaryExpressionToken } from "./UnaryExpressionToken";
import { UnaryOperationToken } from "./UnaryOperationToken";
import { VariableToken } from "./VariableToken";


describe( "UnaryExpressionToken", () => {

	it( "should exist", () => {
		expect( UnaryExpressionToken ).toBeDefined();
		expect( UnaryExpressionToken ).toEqual( jasmine.any( Object ) );
	} );


	describe( "UnaryExpressionToken.is", () => {

		it( "should exist", () => {
			expect( UnaryExpressionToken.is ).toBeDefined();
			expect( UnaryExpressionToken.is ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return true when UnaryOperationToken", () => {
			const returned = UnaryExpressionToken.is( new UnaryOperationToken( "!", new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when BracketedExpressionToken", () => {
			const returned = UnaryExpressionToken.is( new BracketedExpressionToken( new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when FunctionToken", () => {
			const returned = UnaryExpressionToken.is( new FunctionToken( "isBlank", new ExpressionListToken( [ new VariableToken( "foo" ) ] ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when VariableToken", () => {
			const returned = UnaryExpressionToken.is( new VariableToken( "foo" ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when VariableToken", () => {
			const returned = UnaryExpressionToken.is( new VariableToken( "foo" ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when IRIRefToken", () => {
			const returned = UnaryExpressionToken.is( new IRIRefToken( "foo" ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when PrefixedNameToken", () => {
			const returned = UnaryExpressionToken.is( new PrefixedNameToken( "ex", "foo" ) );
			expect( returned ).toBe( true );
		} );

	} );

} );
