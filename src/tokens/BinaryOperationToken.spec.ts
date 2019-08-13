import { BinaryOperationToken } from "./BinaryOperationToken";
import { ExpressionToken } from "./ExpressionToken";
import { VariableToken } from "./VariableToken";


describe( "BinaryOperationToken", ():void => {

	it( "should exists", ():void => {
		expect( BinaryOperationToken ).toBeDefined();
		expect( BinaryOperationToken ).toEqual( jasmine.any( Function ) );
	} );

	class MockBinaryOperationToken extends BinaryOperationToken<string, ExpressionToken> {
		readonly token:string = "mock";
	}


	describe( "BinaryOperationToken.constructor", ():void => {

		it( "should exists", ():void => {
			const token = new MockBinaryOperationToken( "/", new VariableToken( "foo" ) );
			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( BinaryOperationToken ) );
		} );


		it( "should initialize operands", ():void => {
			const expression = new VariableToken( "foo" );
			const token = new MockBinaryOperationToken( "/", expression );
			expect( token.operands ).toEqual( [ expression ] );
		} );

		it( "should initialize operator", ():void => {
			const token = new MockBinaryOperationToken( "/", new VariableToken( "foo" ) );
			expect( token.operator ).toEqual( "/", );
		} );

	} );


	describe( "BinaryOperationToken.addOperand", () => {

		it( "should exist", () => {
			expect( BinaryOperationToken.prototype.addOperand ).toBeDefined();
			expect( BinaryOperationToken.prototype.addOperand ).toEqual( jasmine.any( Function ) );
		} );


		it( "should add operand", () => {
			const token = new MockBinaryOperationToken( "/", new VariableToken( "foo" ) );

			token.addOperand( new VariableToken( "bar" ) );
			expect( token.operands ).toEqual( [ new VariableToken( "foo" ), new VariableToken( "bar" ) ] );
		} );

		it( "should return self", () => {
			const token = new MockBinaryOperationToken( "/", new VariableToken( "foo" ) );

			const returned = token.addOperand( new VariableToken( "bar" ) );
			expect( returned ).toBe( token );
		} );

		it( "should add multiple operand", () => {
			const token = new MockBinaryOperationToken( "/", new VariableToken( "foo" ) );

			token.addOperand( new VariableToken( "bar" ) );
			token.addOperand( new VariableToken( "baz" ) );

			expect( token.operands ).toEqual( [ new VariableToken( "foo" ), new VariableToken( "bar" ), new VariableToken( "baz" ) ] );
		} );

	} );


	describe( "BinaryOperationToken.toString", ():void => {

		it( "should override default", ():void => {
			expect( BinaryOperationToken.prototype.toString ).toBeDefined();
			expect( BinaryOperationToken.prototype.toString ).not.toBe( Object.prototype.toString );
		} );


		it( "should compact print empty", ():void => {
			const token = new MockBinaryOperationToken( "/", new VariableToken( "foo" ) );
			expect( token.toString() ).toBe( "?foo" );
		} );

		it( "should pretty print empty", ():void => {
			const token = new MockBinaryOperationToken( "/", new VariableToken( "foo" ) );
			expect( token.toString( 0 ) ).toBe( "?foo" );
		} );


		it( "should compact print with multiple operations", ():void => {
			const token = new MockBinaryOperationToken( "/", new VariableToken( "foo" ) )
				.addOperand( new VariableToken( "bar" ) )
				.addOperand( new VariableToken( "baz" ) );


			expect( token.toString() ).toBe( "?foo/?bar/?baz" );
		} );

		it( "should pretty print with multiple operations", ():void => {
			const token = new MockBinaryOperationToken( "/", new VariableToken( "foo" ) )
				.addOperand( new VariableToken( "bar" ) )
				.addOperand( new VariableToken( "baz" ) );


			expect( token.toString( 0 ) ).toBe( "?foo / ?bar / ?baz" );
		} );

	} );

} );
