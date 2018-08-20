import { FilterToken } from "./FilterToken";


describe( "FilterToken", ():void => {

	it( "should exists", ():void => {
		expect( FilterToken ).toBeDefined();
		expect( FilterToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "FilterToken.constructor", ():void => {

		it( "should be instantiable", ():void => {
			const token:FilterToken = new FilterToken( "" );

			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( FilterToken ) );
		} );

		it( "should assign the provided constraint", ():void => {
			const token:FilterToken = new FilterToken( "the constraint" );
			expect( token.constraint ).toBe( "the constraint" );
		} );

		it( "should assign `filter` as token name", ():void => {
			expect( new FilterToken( "" ).token ).toBe( "filter" );
		} );

	} );

	describe( "FilterToken.toString", ():void => {

		it( "should exists", ():void => {
			expect( FilterToken.prototype.toString ).toBeDefined();
			expect( FilterToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );

		it( "should print the SPARQL filter statement", ():void => {
			const token:FilterToken = new FilterToken( "?var = 1" );
			expect( token.toString() ).toBe( "FILTER( ?var = 1 )" );
		} );

	} );

} );
