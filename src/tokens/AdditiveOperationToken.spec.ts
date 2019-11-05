import { AdditiveOperationToken } from "./AdditiveOperationToken";
import { BinaryOperationToken } from "./BinaryOperationToken";
import { VariableToken } from "./VariableToken";


describe( "AdditiveOperationToken", ():void => {

	it( "should exists", ():void => {
		expect( AdditiveOperationToken ).toBeDefined();
		expect( AdditiveOperationToken ).toEqual( jasmine.any( Function ) );
	} );


	describe( "AdditiveOperationToken.constructor", ():void => {

		it( "should exists", ():void => {
			const token:AdditiveOperationToken = new AdditiveOperationToken( "+", new VariableToken( "foo" ) );
			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( AdditiveOperationToken ) );
		} );


		it( "should extends BinaryOperationToken", ():void => {
			const token:AdditiveOperationToken = new AdditiveOperationToken( "+", new VariableToken( "foo" ) );
			expect( token ).toEqual( jasmine.any( BinaryOperationToken ) );
		} );

	} );

} );
