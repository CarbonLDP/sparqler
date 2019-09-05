import { BracketedExpressionToken } from "./BracketedExpressionToken";
import { HavingToken } from "./HavingToken";
import { UnaryOperationToken } from "./UnaryOperationToken";
import { VariableToken } from "./VariableToken";


describe( "HavingToken", ():void => {

	it( "should exists", ():void => {
		expect( HavingToken ).toBeDefined();
		expect( HavingToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "HavingToken.constructor", ():void => {

		it( "should be instantiable", ():void => {
			const token:HavingToken = new HavingToken( [] );

			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( HavingToken ) );
		} );

		it( "should assign the provided condition", ():void => {
			const conditions:HavingToken[ "conditions" ] = [];
			const token:HavingToken = new HavingToken( conditions );
			expect( token.conditions ).toBe( conditions );
		} );

		it( "should assign `having` as token name", ():void => {
			expect( new HavingToken( [] ).token ).toBe( "having" );
		} );

	} );

	describe( "HavingToken.toString", ():void => {

		it( "should exists", ():void => {
			expect( HavingToken.prototype.toString ).toBeDefined();
			expect( HavingToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );


		it( "should compact print the SPARQL statement with Expression", ():void => {
			const token:HavingToken = new HavingToken( [ new BracketedExpressionToken( new UnaryOperationToken( "!", new VariableToken( "foo" ) ) ) ] );
			expect( token.toString() ).toBe( "HAVING (!?foo)" );
		} );

		it( "should pretty print the SPARQL statement with Expression", ():void => {
			const token:HavingToken = new HavingToken( [ new BracketedExpressionToken( new UnaryOperationToken( "!", new VariableToken( "foo" ) ) ) ] );
			expect( token.toString( 0 ) ).toBe( "HAVING ( ! ?foo )" );
		} );

	} );

} );
