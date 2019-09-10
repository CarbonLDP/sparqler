import { ExpressionListToken } from "./ExpressionListToken";
import { FunctionToken } from "./FunctionToken";
import { UnaryOperationToken } from "./UnaryOperationToken";
import { VariableToken } from "./VariableToken";

describe( "FunctionToken", () => {

	it( "should exist", () => {
		expect( FunctionToken ).toBeDefined();
		expect( FunctionToken ).toEqual( jasmine.any( Function ) );
	} );


	describe( "FunctionToken.constructor", () => {

		it( "should be instantiable", () => {
			const token = new FunctionToken( "STR", new ExpressionListToken( [] ) );
			expect( token ).toEqual( jasmine.any( FunctionToken ) );
		} );


		it( "should init the name", () => {
			const token = new FunctionToken( "STR", new ExpressionListToken( [] ) );
			expect( token.name ).toBe( "STR" );
		} );

		it( "should init the listOrPatterns", () => {
			const listOrPatterns = new ExpressionListToken( [] );
			const token = new FunctionToken( "STR", listOrPatterns );
			expect( token.listOrPatterns ).toBe( listOrPatterns );
		} );

	} );

	describe( "FunctionToken.toString", () => {

		it( "should exists", () => {
			expect( FunctionToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );


		it( "should init the name", () => {
			const token = new FunctionToken( "STR", new ExpressionListToken( [] ) );
			expect( token.name ).toBe( "STR" );
		} );

		it( "should return compact SPARQL function", () => {
			const token = new FunctionToken( "STR", new ExpressionListToken( [ new UnaryOperationToken( "!", new VariableToken( "foo" ) ) ] ) );
			expect( token.toString() ).toBe( "STR(!?foo)" );
		} );

		it( "should return pretty SPARQL function", () => {
			const token = new FunctionToken( "STR", new ExpressionListToken( [ new UnaryOperationToken( "!", new VariableToken( "foo" ) ) ] ) );
			expect( token.toString( 0 ) ).toBe( "STR( ! ?foo )" );
		} );

	} );

} );
