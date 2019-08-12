import { BinaryOperationToken } from "./BinaryOperationToken";
import { ExpressionToken } from "./ExpressionToken";
import { VariableToken } from "./VariableToken";


describe( "BinaryOperationToken", ():void => {

	it( "should exists", ():void => {
		expect( BinaryOperationToken ).toBeDefined();
		expect( BinaryOperationToken ).toEqual( jasmine.any( Function ) );
	} );

	class MockBinaryOperationToken extends BinaryOperationToken<ExpressionToken, string> {
		readonly token:string = "mock";
	}


	describe( "BinaryOperationToken.constructor", ():void => {

		it( "should exists", ():void => {
			const token = new MockBinaryOperationToken( new VariableToken( "foo" ) );
			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( BinaryOperationToken ) );
		} );


		it( "should initialize expression", ():void => {
			const expression = new VariableToken( "foo" );
			const token = new MockBinaryOperationToken( expression );
			expect( token.expression ).toBe( expression );
		} );

		it( "should initialize operations", ():void => {
			const token = new MockBinaryOperationToken( new VariableToken( "foo" ) );
			expect( token.operations ).toEqual( [] );
		} );

		it( "should initialize expressions", ():void => {
			const token = new MockBinaryOperationToken( new VariableToken( "foo" ) );
			expect( token.expressions ).toEqual( [] );
		} );

	} );


	describe( "BinaryOperationToken.addOperation", () => {

		it( "should exist", () => {
			expect( BinaryOperationToken.prototype.addOperation ).toBeDefined();
			expect( BinaryOperationToken.prototype.addOperation ).toEqual( jasmine.any( Function ) );
		} );


		it( "should add operation", () => {
			const token = new MockBinaryOperationToken( new VariableToken( "foo" ) );

			token.addOperation( new VariableToken( "bar" ), "/" );
			expect( token.operations ).toEqual( [ "/" ] );
			expect( token.expressions ).toEqual( [ new VariableToken( "bar" ) ] );
		} );

		it( "should return self", () => {
			const token = new MockBinaryOperationToken( new VariableToken( "foo" ) );

			const returned = token.addOperation( new VariableToken( "bar" ), "/" );
			expect( returned ).toBe( token );
		} );

		it( "should add multiple operation", () => {
			const token = new MockBinaryOperationToken( new VariableToken( "foo" ) );

			token.addOperation( new VariableToken( "bar" ), "/" );
			token.addOperation( new VariableToken( "baz" ), "*" );

			expect( token.operations ).toEqual( [ "/", "*" ] );
			expect( token.expressions ).toEqual( [ new VariableToken( "bar" ), new VariableToken( "baz" ) ] );
		} );

	} );


	describe( "BinaryOperationToken.toString", ():void => {

		it( "should override default", ():void => {
			expect( BinaryOperationToken.prototype.toString ).toBeDefined();
			expect( BinaryOperationToken.prototype.toString ).not.toBe( Object.prototype.toString );
		} );


		it( "should compact print empty", ():void => {
			const token = new MockBinaryOperationToken( new VariableToken( "foo" ) );
			expect( token.toString() ).toBe( "?foo" );
		} );

		it( "should pretty print empty", ():void => {
			const token = new MockBinaryOperationToken( new VariableToken( "foo" ) );
			expect( token.toString( 0 ) ).toBe( "?foo" );
		} );


		it( "should compact print with multiple operations", ():void => {
			const token = new MockBinaryOperationToken( new VariableToken( "foo" ) )
				.addOperation( new VariableToken( "bar" ), "/" )
				.addOperation( new VariableToken( "baz" ), "*" );


			expect( token.toString() ).toBe( "?foo/?bar*?baz" );
		} );

		it( "should pretty print with multiple operations", ():void => {
			const token = new MockBinaryOperationToken( new VariableToken( "foo" ) )
				.addOperation( new VariableToken( "bar" ), "/" )
				.addOperation( new VariableToken( "baz" ), "*" );


			expect( token.toString( 0 ) ).toBe( "?foo / ?bar * ?baz" );
		} );

	} );

} );
