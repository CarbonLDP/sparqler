import * as Module from "./OrderToken";
import { OrderToken } from "./OrderToken";

import { VariableToken } from "./VariableToken";

describe( "Module OrderToken", ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	describe( "OrderToken", ():void => {

		it( "should exists", ():void => {
			expect( OrderToken ).toBeDefined();
			expect( OrderToken ).toEqual( jasmine.any( Function ) );
		} );

		describe( "OrderToken.constructor", ():void => {

			it( "should be instantiable", ():void => {
				const token:OrderToken = new OrderToken( null );
				expect( token ).toBeDefined();
				expect( token ).toEqual( jasmine.any( OrderToken ) );
			} );

			it( "should assign the condition string", ():void => {
				const token:OrderToken = new OrderToken( "the condition" );
				expect( token.condition ).toBe( "the condition" );
			} );

			it( "should assign the condition variable", ():void => {
				const variable:VariableToken = new VariableToken( "var" );
				const token:OrderToken = new OrderToken( variable );
				expect( token.condition ).toBe( variable );
			} );

			it( "should not assign flow order if no provided", ():void => {
				const token:OrderToken = new OrderToken( null );
				expect( token.flow ).toBeUndefined();
			} );

			it( "should assign the flow provided", ():void => {
				const token1:OrderToken = new OrderToken( null, "ASC" );
				expect( token1.flow ).toBe( "ASC" );

				const token2:OrderToken = new OrderToken( null, "DESC" );
				expect( token2.flow ).toBe( "DESC" );
			} );

			it( "should assign `order` as token name", ():void => {
				const token:OrderToken = new OrderToken( null );
				expect( token.token ).toBe( "order" );
			} );

		} );

		describe( "OrderToken.toString", ():void => {

			it( "should exists", ():void => {
				expect( OrderToken.prototype.toString ).toBeDefined();
				expect( OrderToken.prototype.toString ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return the SPARQL order statement when no flor order", ():void => {
				const token:OrderToken = new OrderToken( new VariableToken( "var" ) );
				expect( token.toString() ).toBe( "ORDER BY ?var" );
			} );

			it( "should return the SPARQL order statement with ascending order", ():void => {
				const token:OrderToken = new OrderToken( new VariableToken( "var" ), "ASC" );
				expect( token.toString() ).toBe( "ORDER BY ASC( ?var )" );
			} );

			it( "should return the SPARQL order statement with descending order", ():void => {
				const token:OrderToken = new OrderToken( new VariableToken( "var" ), "DESC" );
				expect( token.toString() ).toBe( "ORDER BY DESC( ?var )" );
			} );

		} );

	} );

} );
