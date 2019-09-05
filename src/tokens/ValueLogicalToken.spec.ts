import { AdditiveOperationToken } from "./AdditiveOperationToken";
import { BracketedExpressionToken } from "./BracketedExpressionToken";
import { ExpressionListToken } from "./ExpressionListToken";
import { FunctionToken } from "./FunctionToken";
import { InclusionExpressionToken } from "./InclusionExpressionToken";
import { IRIRefToken } from "./IRIRefToken";
import { MultiplicativeOperationToken } from "./MultiplicativeOperationToken";
import { PrefixedNameToken } from "./PrefixedNameToken";
import { RelationalOperationToken } from "./RelationalOperationToken";
import { UnaryOperationToken } from "./UnaryOperationToken";
import { ValueLogicalToken } from "./ValueLogicalToken";
import { VariableToken } from "./VariableToken";


describe( "ValueLogicalToken", () => {

	it( "should exist", () => {
		expect( ValueLogicalToken ).toBeDefined();
		expect( ValueLogicalToken ).toEqual( jasmine.any( Object ) );
	} );


	describe( "ValueLogicalToken.is", () => {

		it( "should exist", () => {
			expect( ValueLogicalToken.is ).toBeDefined();
			expect( ValueLogicalToken.is ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return true when InclusionExpressionToken", () => {
			const returned = ValueLogicalToken.is( new InclusionExpressionToken( "IN", new VariableToken( "foo" ), [] ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when RelationalOperationToken", () => {
			const returned = ValueLogicalToken.is( new RelationalOperationToken( "=", new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when AdditiveOperationToken", () => {
			const returned = ValueLogicalToken.is( new AdditiveOperationToken( "+", new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when MultiplicativeOperationToken", () => {
			const returned = ValueLogicalToken.is( new MultiplicativeOperationToken( "*", new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when UnaryOperationToken", () => {
			const returned = ValueLogicalToken.is( new UnaryOperationToken( "!", new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when BracketedExpressionToken", () => {
			const returned = ValueLogicalToken.is( new BracketedExpressionToken( new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when FunctionToken", () => {
			const returned = ValueLogicalToken.is( new FunctionToken( "isBlank", new ExpressionListToken( [ new VariableToken( "foo" ) ] ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when VariableToken", () => {
			const returned = ValueLogicalToken.is( new VariableToken( "foo" ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when VariableToken", () => {
			const returned = ValueLogicalToken.is( new VariableToken( "foo" ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when IRIRefToken", () => {
			const returned = ValueLogicalToken.is( new IRIRefToken( "foo" ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when PrefixedNameToken", () => {
			const returned = ValueLogicalToken.is( new PrefixedNameToken( "ex", "foo" ) );
			expect( returned ).toBe( true );
		} );

	} );

} );
