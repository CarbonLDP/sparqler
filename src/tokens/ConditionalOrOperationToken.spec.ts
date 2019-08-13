import { BinaryOperationToken } from "./BinaryOperationToken";
import { ConditionalOrOperationToken } from "./ConditionalOrOperationToken";
import { VariableToken } from "./VariableToken";


describe( "ConditionalOrOperationToken", ():void => {

	it( "should exists", ():void => {
		expect( ConditionalOrOperationToken ).toBeDefined();
		expect( ConditionalOrOperationToken ).toEqual( jasmine.any( Function ) );
	} );


	describe( "ConditionalOrOperationToken.constructor", ():void => {

		it( "should exists", ():void => {
			const token:ConditionalOrOperationToken = new ConditionalOrOperationToken( new VariableToken( "foo" ) );
			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( ConditionalOrOperationToken ) );
		} );


		it( "should extends BinaryOperationToken", ():void => {
			const token:ConditionalOrOperationToken = new ConditionalOrOperationToken( new VariableToken( "foo" ) );
			expect( token ).toEqual( jasmine.any( BinaryOperationToken ) );
		} );

	} );


	describe( "ConditionalOrOperationToken.addOperation", () => {

		it( "should exist", () => {
			expect( ConditionalOrOperationToken.prototype.addOperation ).toBeDefined();
			expect( ConditionalOrOperationToken.prototype.addOperation ).toEqual( jasmine.any( Function ) );
		} );


		it( "should add operation", () => {
			const token = new ConditionalOrOperationToken( new VariableToken( "foo" ) );

			token.addOperation( new VariableToken( "bar" ) );
			expect( token.operations ).toEqual( [ "||" ] );
			expect( token.expressions ).toEqual( [ new VariableToken( "bar" ) ] );
		} );

		it( "should return self", () => {
			const token = new ConditionalOrOperationToken( new VariableToken( "foo" ) );

			const returned = token.addOperation( new VariableToken( "bar" ) );
			expect( returned ).toBe( token );
		} );

		it( "should add multiple operations", () => {
			const token = new ConditionalOrOperationToken( new VariableToken( "foo" ) );

			token.addOperation( new VariableToken( "bar" ) );
			token.addOperation( new VariableToken( "baz" ) );

			expect( token.operations ).toEqual( [ "||", "||" ] );
			expect( token.expressions ).toEqual( [ new VariableToken( "bar" ), new VariableToken( "baz" ) ] );
		} );

	} );

} );
