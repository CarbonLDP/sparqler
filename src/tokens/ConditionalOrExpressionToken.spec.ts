import { AdditiveOperationToken } from "./AdditiveOperationToken";
import { BracketedExpressionToken } from "./BracketedExpressionToken";
import { ConditionalAndOperationToken } from "./ConditionalAndOperationToken";
import { ConditionalOrOperationToken } from "./ConditionalOrOperationToken";
import { ExpressionListToken } from "./ExpressionListToken";
import { FunctionToken } from "./FunctionToken";
import { InclusionExpressionToken } from "./InclusionExpressionToken";
import { IRIRefToken } from "./IRIRefToken";
import { MultiplicativeOperationToken } from "./MultiplicativeOperationToken";
import { PrefixedNameToken } from "./PrefixedNameToken";
import { RelationalOperationToken } from "./RelationalOperationToken";
import { UnaryOperationToken } from "./UnaryOperationToken";
import { ConditionalOrExpressionToken } from "./ConditionalOrExpressionToken";
import { VariableToken } from "./VariableToken";


describe( "ConditionalOrExpressionToken", () => {

	it( "should exist", () => {
		expect( ConditionalOrExpressionToken ).toBeDefined();
		expect( ConditionalOrExpressionToken ).toEqual( jasmine.any( Object ) );
	} );


	describe( "ConditionalOrExpressionToken.is", () => {

		it( "should exist", () => {
			expect( ConditionalOrExpressionToken.is ).toBeDefined();
			expect( ConditionalOrExpressionToken.is ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return true when ConditionalOrOperationToken", () => {
			const returned = ConditionalOrExpressionToken.is( new ConditionalOrOperationToken( "||", new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when ConditionalAndOperationToken", () => {
			const returned = ConditionalOrExpressionToken.is( new ConditionalAndOperationToken( "&&", new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when InclusionExpressionToken", () => {
			const returned = ConditionalOrExpressionToken.is( new InclusionExpressionToken( "IN", new VariableToken( "foo" ), [] ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when RelationalOperationToken", () => {
			const returned = ConditionalOrExpressionToken.is( new RelationalOperationToken( "=", new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when AdditiveOperationToken", () => {
			const returned = ConditionalOrExpressionToken.is( new AdditiveOperationToken( "+", new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when MultiplicativeOperationToken", () => {
			const returned = ConditionalOrExpressionToken.is( new MultiplicativeOperationToken( "*", new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when UnaryOperationToken", () => {
			const returned = ConditionalOrExpressionToken.is( new UnaryOperationToken( "!", new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when BracketedExpressionToken", () => {
			const returned = ConditionalOrExpressionToken.is( new BracketedExpressionToken( new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when FunctionToken", () => {
			const returned = ConditionalOrExpressionToken.is( new FunctionToken( "isBlank", new ExpressionListToken( [ new VariableToken( "foo" ) ] ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when VariableToken", () => {
			const returned = ConditionalOrExpressionToken.is( new VariableToken( "foo" ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when VariableToken", () => {
			const returned = ConditionalOrExpressionToken.is( new VariableToken( "foo" ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when IRIRefToken", () => {
			const returned = ConditionalOrExpressionToken.is( new IRIRefToken( "foo" ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when PrefixedNameToken", () => {
			const returned = ConditionalOrExpressionToken.is( new PrefixedNameToken( "ex", "foo" ) );
			expect( returned ).toBe( true );
		} );

	} );

} );
