import { BracketedExpressionToken } from "./BracketedExpressionToken";
import { GroupToken } from "./GroupToken";
import { UnaryOperationToken } from "./UnaryOperationToken";
import { VariableToken } from "./VariableToken";


describe( "GroupToken", ():void => {

	it( "should exists", ():void => {
		expect( GroupToken ).toBeDefined();
		expect( GroupToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "GroupToken.constructor", ():void => {

		it( "should be instantiable", ():void => {
			const token:GroupToken = new GroupToken( [] );

			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( GroupToken ) );
		} );

		it( "should assign the provided conditions", ():void => {
			const conditions:GroupToken[ "conditions" ] = [];
			const token:GroupToken = new GroupToken( conditions );
			expect( token.conditions ).toBe( conditions );
		} );

		it( "should assign `group` as token name", ():void => {
			expect( new GroupToken( [] ).token ).toBe( "group" );
		} );

	} );

	describe( "GroupToken.toString", ():void => {

		it( "should exists", ():void => {
			expect( GroupToken.prototype.toString ).toBeDefined();
			expect( GroupToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );


		it( "should print the SPARQL statement with Variable", ():void => {
			const token:GroupToken = new GroupToken( [ new VariableToken( "foo" ) ] );
			expect( token.toString() ).toBe( "GROUP BY ?foo" );
		} );

		it( "should compact print the SPARQL statement with Expression", ():void => {
			const token:GroupToken = new GroupToken( [ new BracketedExpressionToken( new UnaryOperationToken( "!", new VariableToken( "foo" ) ) ) ] );
			expect( token.toString() ).toBe( "GROUP BY (!?foo)" );
		} );

		it( "should pretty print the SPARQL statement with Expression", ():void => {
			const token:GroupToken = new GroupToken( [ new BracketedExpressionToken( new UnaryOperationToken( "!", new VariableToken( "foo" ) ) ) ] );
			expect( token.toString( 0 ) ).toBe( "GROUP BY ( ! ?foo )" );
		} );

	} );

} );
