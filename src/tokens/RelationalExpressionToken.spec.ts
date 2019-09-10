import { AdditiveOperationToken } from "./AdditiveOperationToken";
import { BracketedExpressionToken } from "./BracketedExpressionToken";
import { ExpressionListToken } from "./ExpressionListToken";
import { FunctionToken } from "./FunctionToken";
import { InclusionExpressionToken } from "./InclusionExpressionToken";
import { IRIRefToken } from "./IRIRefToken";
import { MultiplicativeOperationToken } from "./MultiplicativeOperationToken";
import { PrefixedNameToken } from "./PrefixedNameToken";
import { RelationalExpressionToken } from "./RelationalExpressionToken";
import { RelationalOperationToken } from "./RelationalOperationToken";
import { UnaryOperationToken } from "./UnaryOperationToken";
import { VariableToken } from "./VariableToken";


describe( "RelationalExpressionToken", () => {

	it( "should exist", () => {
		expect( RelationalExpressionToken ).toBeDefined();
		expect( RelationalExpressionToken ).toEqual( jasmine.any( Object ) );
	} );


	describe( "RelationalExpressionToken.is", () => {

		it( "should exist", () => {
			expect( RelationalExpressionToken.is ).toBeDefined();
			expect( RelationalExpressionToken.is ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return true when InclusionExpressionToken", () => {
			const returned = RelationalExpressionToken.is( new InclusionExpressionToken( "IN", new VariableToken( "foo" ), [] ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when RelationalOperationToken", () => {
			const returned = RelationalExpressionToken.is( new RelationalOperationToken( "=", new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when AdditiveOperationToken", () => {
			const returned = RelationalExpressionToken.is( new AdditiveOperationToken( "+", new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when MultiplicativeOperationToken", () => {
			const returned = RelationalExpressionToken.is( new MultiplicativeOperationToken( "*", new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when UnaryOperationToken", () => {
			const returned = RelationalExpressionToken.is( new UnaryOperationToken( "!", new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when BracketedExpressionToken", () => {
			const returned = RelationalExpressionToken.is( new BracketedExpressionToken( new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when FunctionToken", () => {
			const returned = RelationalExpressionToken.is( new FunctionToken( "isBlank", new ExpressionListToken( [ new VariableToken( "foo" ) ] ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when VariableToken", () => {
			const returned = RelationalExpressionToken.is( new VariableToken( "foo" ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when VariableToken", () => {
			const returned = RelationalExpressionToken.is( new VariableToken( "foo" ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when IRIRefToken", () => {
			const returned = RelationalExpressionToken.is( new IRIRefToken( "foo" ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when PrefixedNameToken", () => {
			const returned = RelationalExpressionToken.is( new PrefixedNameToken( "ex", "foo" ) );
			expect( returned ).toBe( true );
		} );

	} );

} );
