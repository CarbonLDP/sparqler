import { AdditiveOperationToken } from "./AdditiveOperationToken";
import { BracketedExpressionToken } from "./BracketedExpressionToken";
import { ConditionalAndOperationToken } from "./ConditionalAndOperationToken";
import { ConditionalOrOperationToken } from "./ConditionalOrOperationToken";
import { ExpressionListToken } from "./ExpressionListToken";
import { ExpressionToken } from "./ExpressionToken";
import { FunctionToken } from "./FunctionToken";
import { InclusionExpressionToken } from "./InclusionExpressionToken";
import { IRIRefToken } from "./IRIRefToken";
import { MultiplicativeOperationToken } from "./MultiplicativeOperationToken";
import { PrefixedNameToken } from "./PrefixedNameToken";
import { RelationalOperationToken } from "./RelationalOperationToken";
import { UnaryOperationToken } from "./UnaryOperationToken";
import { VariableToken } from "./VariableToken";


describe( "ExpressionToken", () => {

	it( "should exist", () => {
		expect( ExpressionToken ).toBeDefined();
		expect( ExpressionToken ).toEqual( jasmine.any( Object ) );
	} );


	describe( "ExpressionToken.is", () => {

		it( "should exist", () => {
			expect( ExpressionToken.is ).toBeDefined();
			expect( ExpressionToken.is ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return true when ConditionalOrOperationToken", () => {
			const returned = ExpressionToken.is( new ConditionalOrOperationToken( "||", new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when ConditionalAndOperationToken", () => {
			const returned = ExpressionToken.is( new ConditionalAndOperationToken( "&&", new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when InclusionExpressionToken", () => {
			const returned = ExpressionToken.is( new InclusionExpressionToken( "IN", new VariableToken( "foo" ), [] ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when RelationalOperationToken", () => {
			const returned = ExpressionToken.is( new RelationalOperationToken( "=", new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when AdditiveOperationToken", () => {
			const returned = ExpressionToken.is( new AdditiveOperationToken( "+", new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when MultiplicativeOperationToken", () => {
			const returned = ExpressionToken.is( new MultiplicativeOperationToken( "*", new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when UnaryOperationToken", () => {
			const returned = ExpressionToken.is( new UnaryOperationToken( "!", new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when BracketedExpressionToken", () => {
			const returned = ExpressionToken.is( new BracketedExpressionToken( new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when FunctionToken", () => {
			const returned = ExpressionToken.is( new FunctionToken( "isBlank", new ExpressionListToken( [ new VariableToken( "foo" ) ] ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when VariableToken", () => {
			const returned = ExpressionToken.is( new VariableToken( "foo" ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when VariableToken", () => {
			const returned = ExpressionToken.is( new VariableToken( "foo" ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when IRIRefToken", () => {
			const returned = ExpressionToken.is( new IRIRefToken( "foo" ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when PrefixedNameToken", () => {
			const returned = ExpressionToken.is( new PrefixedNameToken( "ex", "foo" ) );
			expect( returned ).toBe( true );
		} );

	} );

} );
