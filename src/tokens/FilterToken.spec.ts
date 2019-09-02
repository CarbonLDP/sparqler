import { BracketedExpressionToken } from "./BracketedExpressionToken";
import { FilterToken } from "./FilterToken";
import { IRIRefToken } from "./IRIRefToken";
import { UnaryOperationToken } from "./UnaryOperationToken";
import { VariableToken } from "./VariableToken";


describe( "FilterToken", ():void => {

	it( "should exists", ():void => {
		expect( FilterToken ).toBeDefined();
		expect( FilterToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "FilterToken.constructor", ():void => {

		it( "should be instantiable", ():void => {
			const token:FilterToken = new FilterToken( new BracketedExpressionToken( new IRIRefToken( "" ) ) );

			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( FilterToken ) );
		} );

		it( "should assign the provided constraint", ():void => {
			const constraint = new BracketedExpressionToken( new IRIRefToken( "" ) );
			const token:FilterToken = new FilterToken( constraint );
			expect( token.constraint ).toBe( constraint );
		} );

		it( "should assign `filter` as token name", ():void => {
			const token:FilterToken = new FilterToken( new BracketedExpressionToken( new IRIRefToken( "" ) ) );
			expect( token.token ).toBe( "filter" );
		} );

	} );

	describe( "FilterToken.toString", ():void => {

		it( "should exists", ():void => {
			expect( FilterToken.prototype.toString ).toBeDefined();
			expect( FilterToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );

		it( "should compact print the SPARQL FILTER statement", ():void => {
			const token:FilterToken = new FilterToken( new BracketedExpressionToken( new UnaryOperationToken( "!", new VariableToken( "foo" ) ) ) );
			expect( token.toString() ).toBe( "FILTER(!?foo)" );
		} );

		it( "should pretty print the SPARQL FILTER statement", ():void => {
			const token:FilterToken = new FilterToken( new BracketedExpressionToken( new UnaryOperationToken( "!", new VariableToken( "foo" ) ) ) );
			expect( token.toString( 0 ) ).toBe( "FILTER( ! ?foo )" );
		} );

	} );

} );
