import { UnaryOperationToken } from "./UnaryOperationToken";
import { VariableToken } from "./VariableToken";


describe( "UnaryOperationToken", ():void => {

	it( "should exists", ():void => {
		expect( UnaryOperationToken ).toBeDefined();
		expect( UnaryOperationToken ).toEqual( jasmine.any( Function ) );
	} );


	describe( "UnaryOperationToken.constructor", ():void => {

		it( "should exists", ():void => {
			const token:UnaryOperationToken = new UnaryOperationToken( new VariableToken( "foo" ), "!" );
			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( UnaryOperationToken ) );
		} );


		it( "should initialize expression", ():void => {
			const expression = new VariableToken( "foo" );
			const token:UnaryOperationToken = new UnaryOperationToken( expression, "!" );
			expect( token.expression ).toBe( expression );
		} );

		it( "should initialize operation", ():void => {
			const token:UnaryOperationToken = new UnaryOperationToken( new VariableToken( "foo" ), "!" );
			expect( token.operation ).toBe( "!" );
		} );

	} );


	describe( "UnaryOperationToken.toString", ():void => {

		it( "should override default", ():void => {
			expect( UnaryOperationToken.prototype.toString ).toBeDefined();
			expect( UnaryOperationToken.prototype.toString ).not.toBe( Object.prototype.toString );
		} );

		it( "should compact print", ():void => {
			const token:UnaryOperationToken = new UnaryOperationToken( new VariableToken( "foo" ), "!" );
			expect( token.toString() ).toBe( "!?foo" );
		} );

		it( "should pretty print", ():void => {
			const token:UnaryOperationToken = new UnaryOperationToken( new VariableToken( "foo" ), "!" );
			expect( token.toString( 0 ) ).toBe( "! ?foo" );
		} );

	} );

} );
