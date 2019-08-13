import { BinaryOperationToken } from "./BinaryOperationToken";
import { ConditionalAndOperationToken } from "./ConditionalAndOperationToken";
import { VariableToken } from "./VariableToken";


describe( "ConditionalAndOperationToken", ():void => {

	it( "should exists", ():void => {
		expect( ConditionalAndOperationToken ).toBeDefined();
		expect( ConditionalAndOperationToken ).toEqual( jasmine.any( Function ) );
	} );


	describe( "ConditionalAndOperationToken.constructor", ():void => {

		it( "should exists", ():void => {
			const token:ConditionalAndOperationToken = new ConditionalAndOperationToken( new VariableToken( "foo" ) );
			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( ConditionalAndOperationToken ) );
		} );


		it( "should extends BinaryOperationToken", ():void => {
			const token:ConditionalAndOperationToken = new ConditionalAndOperationToken( new VariableToken( "foo" ) );
			expect( token ).toEqual( jasmine.any( BinaryOperationToken ) );
		} );

	} );


	describe( "ConditionalAndOperationToken.addOperation", () => {

		it( "should exist", () => {
			expect( ConditionalAndOperationToken.prototype.addOperation ).toBeDefined();
			expect( ConditionalAndOperationToken.prototype.addOperation ).toEqual( jasmine.any( Function ) );
		} );


		it( "should add operation", () => {
			const token = new ConditionalAndOperationToken( new VariableToken( "foo" ) );

			token.addOperation( new VariableToken( "bar" ) );
			expect( token.operations ).toEqual( [ "&&" ] );
			expect( token.expressions ).toEqual( [ new VariableToken( "bar" ) ] );
		} );

		it( "should return self", () => {
			const token = new ConditionalAndOperationToken( new VariableToken( "foo" ) );

			const returned = token.addOperation( new VariableToken( "bar" ) );
			expect( returned ).toBe( token );
		} );

		it( "should add multiple operations", () => {
			const token = new ConditionalAndOperationToken( new VariableToken( "foo" ) );

			token.addOperation( new VariableToken( "bar" ) );
			token.addOperation( new VariableToken( "baz" ) );

			expect( token.operations ).toEqual( [ "&&", "&&" ] );
			expect( token.expressions ).toEqual( [ new VariableToken( "bar" ), new VariableToken( "baz" ) ] );
		} );

	} );

} );
