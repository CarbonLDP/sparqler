import { BracketedExpressionToken } from "./BracketedExpressionToken";
import { ExplicitOrderConditionToken } from "./ExplicitOrderConditionToken";
import { OrderToken } from "./OrderToken";
import { UnaryOperationToken } from "./UnaryOperationToken";
import { VariableToken } from "./VariableToken";


describe( "OrderToken", ():void => {

	it( "should exists", ():void => {
		expect( OrderToken ).toBeDefined();
		expect( OrderToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "OrderToken.constructor", ():void => {

		it( "should be instantiable", ():void => {
			const token:OrderToken = new OrderToken( [] );
			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( OrderToken ) );
		} );

		it( "should assign the conditions", ():void => {
			const conditions:OrderToken[ "conditions" ] = [];
			const token:OrderToken = new OrderToken( conditions );
			expect( token.conditions ).toBe( conditions );
		} );

		it( "should assign the token name", ():void => {
			const token:OrderToken = new OrderToken( [] );
			expect( token.token ).toBe( "order" );
		} );

	} );

	describe( "OrderToken.toString", ():void => {

		it( "should exists", ():void => {
			expect( OrderToken.prototype.toString ).toBeDefined();
			expect( OrderToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );


		it( "should print the SPARQL statement with Variable", ():void => {
			const token:OrderToken = new OrderToken( [ new VariableToken( "foo" ) ] );
			expect( token.toString() ).toBe( "ORDER BY ?foo" );
		} );

		it( "should compact print the SPARQL statement with Expression", ():void => {
			const token:OrderToken = new OrderToken( [ new BracketedExpressionToken( new UnaryOperationToken( "!", new VariableToken( "foo" ) ) ) ] );
			expect( token.toString() ).toBe( "ORDER BY (!?foo)" );
		} );

		it( "should pretty print the SPARQL statement with Expression", ():void => {
			const token:OrderToken = new OrderToken( [ new BracketedExpressionToken( new UnaryOperationToken( "!", new VariableToken( "foo" ) ) ) ] );
			expect( token.toString( 0 ) ).toBe( "ORDER BY ( ! ?foo )" );
		} );

		it( "should compact print the SPARQL statement with explicit order", ():void => {
			const token:OrderToken = new OrderToken( [ new ExplicitOrderConditionToken( "DESC", new BracketedExpressionToken( new UnaryOperationToken( "!", new VariableToken( "foo" ) ) ) ) ] );
			expect( token.toString() ).toBe( "ORDER BY DESC (!?foo)" );
		} );

		it( "should pretty print the SPARQL statement with explicit order", ():void => {
			const token:OrderToken = new OrderToken( [ new ExplicitOrderConditionToken( "DESC", new BracketedExpressionToken( new UnaryOperationToken( "!", new VariableToken( "foo" ) ) ) ) ] );
			expect( token.toString( 0 ) ).toBe( "ORDER BY DESC ( ! ?foo )" );
		} );

	} );

} );
