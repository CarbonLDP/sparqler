import { AdditiveOperationToken } from "./AdditiveOperationToken";
import { BracketedExpressionToken } from "./BracketedExpressionToken";
import { ConditionalAndOperationToken } from "./ConditionalAndOperationToken";
import { ExpressionListToken } from "./ExpressionListToken";
import { FunctionToken } from "./FunctionToken";
import { InclusionExpressionToken } from "./InclusionExpressionToken";
import { IRIRefToken } from "./IRIRefToken";
import { MultiplicativeOperationToken } from "./MultiplicativeOperationToken";
import { PrefixedNameToken } from "./PrefixedNameToken";
import { RelationalOperationToken } from "./RelationalOperationToken";
import { UnaryOperationToken } from "./UnaryOperationToken";
import { ConditionalAndExpressionToken } from "./ConditionalAndExpressionToken";
import { VariableToken } from "./VariableToken";


describe( "ConditionalAndExpressionToken", () => {

	it( "should exist", () => {
		expect( ConditionalAndExpressionToken ).toBeDefined();
		expect( ConditionalAndExpressionToken ).toEqual( jasmine.any( Object ) );
	} );


	describe( "ConditionalAndExpressionToken.is", () => {

		it( "should exist", () => {
			expect( ConditionalAndExpressionToken.is ).toBeDefined();
			expect( ConditionalAndExpressionToken.is ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return true when ConditionalAndOperationToken", () => {
			const returned = ConditionalAndExpressionToken.is( new ConditionalAndOperationToken( "&&", new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when InclusionExpressionToken", () => {
			const returned = ConditionalAndExpressionToken.is( new InclusionExpressionToken( "IN", new VariableToken( "foo" ), [] ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when RelationalOperationToken", () => {
			const returned = ConditionalAndExpressionToken.is( new RelationalOperationToken( "=", new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when AdditiveOperationToken", () => {
			const returned = ConditionalAndExpressionToken.is( new AdditiveOperationToken( "+", new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when MultiplicativeOperationToken", () => {
			const returned = ConditionalAndExpressionToken.is( new MultiplicativeOperationToken( "*", new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when UnaryOperationToken", () => {
			const returned = ConditionalAndExpressionToken.is( new UnaryOperationToken( "!", new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when BracketedExpressionToken", () => {
			const returned = ConditionalAndExpressionToken.is( new BracketedExpressionToken( new VariableToken( "foo" ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when FunctionToken", () => {
			const returned = ConditionalAndExpressionToken.is( new FunctionToken( "isBlank", new ExpressionListToken( [ new VariableToken( "foo" ) ] ) ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when VariableToken", () => {
			const returned = ConditionalAndExpressionToken.is( new VariableToken( "foo" ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when VariableToken", () => {
			const returned = ConditionalAndExpressionToken.is( new VariableToken( "foo" ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when IRIRefToken", () => {
			const returned = ConditionalAndExpressionToken.is( new IRIRefToken( "foo" ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when PrefixedNameToken", () => {
			const returned = ConditionalAndExpressionToken.is( new PrefixedNameToken( "ex", "foo" ) );
			expect( returned ).toBe( true );
		} );

	} );

} );
