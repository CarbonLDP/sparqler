import * as Module from "./LimitToken";
import { LimitToken } from "./LimitToken";

describe( "Module LimitToken", ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	describe( "LimitToken", ():void => {

		it( "should exists", ():void => {
			expect( LimitToken ).toBeDefined();
			expect( LimitToken ).toEqual( jasmine.any( Function ) );
		} );

		describe( "LimitToken.constructor", ():void => {

			it( "should be instantiable", ():void => {
				const token:LimitToken = new LimitToken( null );
				expect( token ).toBeDefined();
				expect( token ).toEqual( jasmine.any( LimitToken ) );
			} );

			it( "should assign the provided value", ():void => {
				const token:LimitToken = new LimitToken( 10 );
				expect( token.value ).toBe( 10 );
			} );

			it( "should assign `limit` as token name", ():void => {
				const token:LimitToken = new LimitToken( 10 );
				expect( token.token ).toBe( "limit" );
			} );

		} );

		describe( "LimitToken.toString", ():void => {

			it( "should exists", ():void => {
				expect( LimitToken.prototype.toString ).toBeDefined();
				expect( LimitToken.prototype.toString ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return the SPARQL limit statement", ():void => {
				const token:LimitToken = new LimitToken( 10 );
				expect( token.toString() ).toBe( "LIMIT 10" );
			} );

		} );

	} );

} );
