import { AdditiveOperationToken } from "./AdditiveOperationToken";
import { BracketedExpressionToken } from "./BracketedExpressionToken";
import { ExpressionListToken } from "./ExpressionListToken";
import { FunctionToken } from "./FunctionToken";
import { IRIRefToken } from "./IRIRefToken";
import { MultiplicativeOperationToken } from "./MultiplicativeOperationToken";
import { NumericExpressionToken } from "./NumericExpressionToken";
import { PrefixedNameToken } from "./PrefixedNameToken";
import { UnaryOperationToken } from "./UnaryOperationToken";
import { VariableToken } from "./VariableToken";


describe( "NumericExpressionToken", () => {

	it( "should exist", () => {
		expect( NumericExpressionToken ).toBeDefined();
		expect( NumericExpressionToken ).toEqual( jasmine.any( Object ) );
	} );


	describe( "NumericExpressionToken.is", () => {

		it( "should exist", () => {
			expect( NumericExpressionToken.is ).toBeDefined();
			expect( NumericExpressionToken.is ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return true when AdditiveOperationToken", () => {
			const returned = NumericExpressionToken.is( new AdditiveOperationToken( "+", new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when MultiplicativeOperationToken", () => {
			const returned = NumericExpressionToken.is( new MultiplicativeOperationToken( "*", new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when UnaryOperationToken", () => {
			const returned = NumericExpressionToken.is( new UnaryOperationToken( "!", new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when BracketedExpressionToken", () => {
			const returned = NumericExpressionToken.is( new BracketedExpressionToken( new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when FunctionToken", () => {
			const returned = NumericExpressionToken.is( new FunctionToken( "isBlank", new ExpressionListToken( [ new VariableToken( "foo" ) ] ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when VariableToken", () => {
			const returned = NumericExpressionToken.is( new VariableToken( "foo" ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when VariableToken", () => {
			const returned = NumericExpressionToken.is( new VariableToken( "foo" ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when IRIRefToken", () => {
			const returned = NumericExpressionToken.is( new IRIRefToken( "foo" ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when PrefixedNameToken", () => {
			const returned = NumericExpressionToken.is( new PrefixedNameToken( "ex", "foo" ) );
			expect( returned ).toBe( true );
		} );

	} );

} );
