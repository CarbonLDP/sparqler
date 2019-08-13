import { BinaryOperationToken } from "./BinaryOperationToken";
import { MultiplicativeOperationToken } from "./MultiplicativeOperationToken";
import { VariableToken } from "./VariableToken";


describe( "MultiplicativeOperationToken", ():void => {

	it( "should exists", ():void => {
		expect( MultiplicativeOperationToken ).toBeDefined();
		expect( MultiplicativeOperationToken ).toEqual( jasmine.any( Function ) );
	} );


	describe( "MultiplicativeOperationToken.constructor", ():void => {

		it( "should exists", ():void => {
			const token:MultiplicativeOperationToken = new MultiplicativeOperationToken( "*", new VariableToken( "foo" ) );
			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( MultiplicativeOperationToken ) );
		} );


		it( "should extends BinaryOperationToken", ():void => {
			const token:MultiplicativeOperationToken = new MultiplicativeOperationToken( "*", new VariableToken( "foo" ) );
			expect( token ).toEqual( jasmine.any( BinaryOperationToken ) );
		} );

	} );

} );
