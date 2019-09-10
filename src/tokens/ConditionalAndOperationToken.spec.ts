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
			const token:ConditionalAndOperationToken = new ConditionalAndOperationToken( "&&", new VariableToken( "foo" ) );
			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( ConditionalAndOperationToken ) );
		} );


		it( "should extends BinaryOperationToken", ():void => {
			const token:ConditionalAndOperationToken = new ConditionalAndOperationToken( "&&", new VariableToken( "foo" ) );
			expect( token ).toEqual( jasmine.any( BinaryOperationToken ) );
		} );

	} );

} );
