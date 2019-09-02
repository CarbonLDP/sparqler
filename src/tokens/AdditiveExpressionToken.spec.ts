import { AdditiveExpressionToken } from "./AdditiveExpressionToken";
import { AdditiveOperationToken } from "./AdditiveOperationToken";
import { BracketedExpressionToken } from "./BracketedExpressionToken";
import { ExpressionListToken } from "./ExpressionListToken";
import { FunctionToken } from "./FunctionToken";
import { IRIRefToken } from "./IRIRefToken";
import { MultiplicativeOperationToken } from "./MultiplicativeOperationToken";
import { PrefixedNameToken } from "./PrefixedNameToken";
import { UnaryOperationToken } from "./UnaryOperationToken";
import { VariableToken } from "./VariableToken";


describe( "AdditiveExpressionToken", () => {

	it( "should exist", () => {
		expect( AdditiveExpressionToken ).toBeDefined();
		expect( AdditiveExpressionToken ).toEqual( jasmine.any( Object ) );
	} );


	describe( "AdditiveExpressionToken.is", () => {

		it( "should exist", () => {
			expect( AdditiveExpressionToken.is ).toBeDefined();
			expect( AdditiveExpressionToken.is ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return true when AdditiveOperationToken", () => {
			const returned = AdditiveExpressionToken.is( new AdditiveOperationToken( "+", new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when MultiplicativeOperationToken", () => {
			const returned = AdditiveExpressionToken.is( new MultiplicativeOperationToken( "*", new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when UnaryOperationToken", () => {
			const returned = AdditiveExpressionToken.is( new UnaryOperationToken( "!", new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when BracketedExpressionToken", () => {
			const returned = AdditiveExpressionToken.is( new BracketedExpressionToken( new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when FunctionToken", () => {
			const returned = AdditiveExpressionToken.is( new FunctionToken( "isBlank", new ExpressionListToken( [ new VariableToken( "foo" ) ] ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when VariableToken", () => {
			const returned = AdditiveExpressionToken.is( new VariableToken( "foo" ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when VariableToken", () => {
			const returned = AdditiveExpressionToken.is( new VariableToken( "foo" ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when IRIRefToken", () => {
			const returned = AdditiveExpressionToken.is( new IRIRefToken( "foo" ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when PrefixedNameToken", () => {
			const returned = AdditiveExpressionToken.is( new PrefixedNameToken( "ex", "foo" ) );
			expect( returned ).toBe( true );
		} );

	} );

} );
