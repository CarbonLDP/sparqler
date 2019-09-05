import { BracketedExpressionToken } from "./BracketedExpressionToken";
import { ExpressionListToken } from "./ExpressionListToken";
import { FunctionToken } from "./FunctionToken";
import { IRIRefToken } from "./IRIRefToken";
import { PrefixedNameToken } from "./PrefixedNameToken";
import { PrimaryExpressionToken } from "./PrimaryExpressionToken";
import { VariableToken } from "./VariableToken";


describe( "PrimaryExpressionToken", () => {

	it( "should exist", () => {
		expect( PrimaryExpressionToken ).toBeDefined();
		expect( PrimaryExpressionToken ).toEqual( jasmine.any( Object ) );
	} );


	describe( "PrimaryExpressionToken.is", () => {

		it( "should exist", () => {
			expect( PrimaryExpressionToken.is ).toBeDefined();
			expect( PrimaryExpressionToken.is ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return true when BracketedExpressionToken", () => {
			const returned = PrimaryExpressionToken.is( new BracketedExpressionToken( new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when FunctionToken", () => {
			const returned = PrimaryExpressionToken.is( new FunctionToken( "isBlank", new ExpressionListToken( [ new VariableToken( "foo" ) ] ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when VariableToken", () => {
			const returned = PrimaryExpressionToken.is( new VariableToken( "foo" ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when VariableToken", () => {
			const returned = PrimaryExpressionToken.is( new VariableToken( "foo" ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when IRIRefToken", () => {
			const returned = PrimaryExpressionToken.is( new IRIRefToken( "foo" ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when PrefixedNameToken", () => {
			const returned = PrimaryExpressionToken.is( new PrefixedNameToken( "ex", "foo" ) );
			expect( returned ).toBe( true );
		} );

	} );

} );
