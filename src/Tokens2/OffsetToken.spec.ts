import * as Module from "./OffsetToken";
import { OffsetToken } from "./OffsetToken";

describe( "Module OffsetToken", ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	describe( "OffsetToken", ():void => {

		it( "should exists", ():void => {
			expect( OffsetToken ).toBeDefined();
			expect( OffsetToken ).toEqual( jasmine.any( Function ) );
		} );

		describe( "OffsetToken.constructor", ():void => {

			it( "should be instantiable", ():void => {
				const token:OffsetToken = new OffsetToken( null );
				expect( token ).toBeDefined();
				expect( token ).toEqual( jasmine.any( OffsetToken ) );
			} );

			it( "should assign the provided value", ():void => {
				const token:OffsetToken = new OffsetToken( 10 );
				expect( token.value ).toBe( 10 );
			} );

			it( "should assign `offset` as token name", ():void => {
				const token:OffsetToken = new OffsetToken( 10 );
				expect( token.token ).toBe( "offset" );
			} );

		} );

		describe( "OffsetToken.toString", ():void => {

			it( "should exists", ():void => {
				expect( OffsetToken.prototype.toString ).toBeDefined();
				expect( OffsetToken.prototype.toString ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return the SPARQL offset statement", ():void => {
				const token:OffsetToken = new OffsetToken( 10 );
				expect( token.toString() ).toBe( "OFFSET 10" );
			} );

		} );

	} );

} );
