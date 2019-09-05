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
			const token:ConditionalOrOperationToken = new ConditionalOrOperationToken( "||", new VariableToken( "foo" ) );
			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( ConditionalOrOperationToken ) );
		} );


		it( "should extends BinaryOperationToken", ():void => {
			const token:ConditionalOrOperationToken = new ConditionalOrOperationToken( "||", new VariableToken( "foo" ) );
			expect( token ).toEqual( jasmine.any( BinaryOperationToken ) );
		} );

	} );

} );
