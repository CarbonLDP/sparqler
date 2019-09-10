import { BracketedExpressionToken } from "./BracketedExpressionToken";
import { LiteralToken } from "./LiteralToken";


describe( "BracketedExpressionToken", ():void => {

	it( "should exists", ():void => {
		expect( BracketedExpressionToken ).toBeDefined();
		expect( BracketedExpressionToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "BracketedExpressionToken.constructor", ():void => {

		it( "should initialize expression", ():void => {
			const expression = new LiteralToken( "literal" );
			const token:BracketedExpressionToken = new BracketedExpressionToken( expression );
			expect( token.expression ).toBe( expression );
		} );

	} );

	describe( "BracketedExpressionToken.toString", ():void => {

		it( "should override default", ():void => {
			expect( BracketedExpressionToken.prototype.toString ).toBeDefined();
			expect( BracketedExpressionToken.prototype.toString ).not.toBe( Object.prototype.toString );
		} );


		it( "should compact print", ():void => {
			const token:BracketedExpressionToken = new BracketedExpressionToken( new LiteralToken( "literal" ) );
			expect( token.toString() ).toBe( `("literal")` );
		} );

		it( "should pretty print", ():void => {
			const token:BracketedExpressionToken = new BracketedExpressionToken( new LiteralToken( "literal" ) );
			expect( token.toString( 0 ) ).toBe( `( "literal" )` );
		} );

	} );

} );


