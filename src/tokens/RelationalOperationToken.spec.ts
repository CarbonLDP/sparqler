import { BinaryOperationToken } from "./BinaryOperationToken";
import { RelationalOperationToken } from "./RelationalOperationToken";
import { VariableToken } from "./VariableToken";


describe( "RelationalOperationToken", ():void => {

	it( "should exists", ():void => {
		expect( RelationalOperationToken ).toBeDefined();
		expect( RelationalOperationToken ).toEqual( jasmine.any( Function ) );
	} );


	describe( "RelationalOperationToken.constructor", ():void => {

		it( "should exists", ():void => {
			const token:RelationalOperationToken = new RelationalOperationToken( "=", new VariableToken( "foo" ) );
			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( RelationalOperationToken ) );
		} );


		it( "should extends BinaryOperationToken", ():void => {
			const token:RelationalOperationToken = new RelationalOperationToken( "=", new VariableToken( "foo" ) );
			expect( token ).toEqual( jasmine.any( BinaryOperationToken ) );
		} );

	} );


	describe( "RelationalOperationToken.addOperand", () => {

		it( "should exist", () => {
			expect( RelationalOperationToken.prototype.addOperand ).toBeDefined();
			expect( RelationalOperationToken.prototype.addOperand ).toEqual( jasmine.any( Function ) );
		} );


		it( "should add operation", () => {
			const token = new RelationalOperationToken( "=", new VariableToken( "foo" ) );

			token.addOperand( new VariableToken( "bar" ) );
			expect( token.operands ).toEqual( [ new VariableToken( "foo" ), new VariableToken( "bar" ) ] );
		} );

		it( "should return self", () => {
			const token = new RelationalOperationToken( "=", new VariableToken( "foo" ) );

			const returned = token.addOperand( new VariableToken( "bar" ) );
			expect( returned ).toBe( token );
		} );

		it( "should replace operation", () => {
			const token = new RelationalOperationToken( "=", new VariableToken( "foo" ) );

			token.addOperand( new VariableToken( "bar" ) );
			token.addOperand( new VariableToken( "baz" ) );

			expect( token.operands ).toEqual( [ new VariableToken( "foo" ), new VariableToken( "baz" ) ] );
		} );

	} );

} );
