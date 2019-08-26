import { AssigmentToken } from "./AssigmentToken";
import { IRIRefToken } from "./IRIRefToken";
import { UnaryOperationToken } from "./UnaryOperationToken";
import { VariableToken } from "./VariableToken";


describe( "AssigmentToken", ():void => {

	it( "should exists", ():void => {
		expect( AssigmentToken ).toBeDefined();
		expect( AssigmentToken ).toEqual( jasmine.any( Function ) );
	} );


	describe( "AssigmentToken.constructor", ():void => {

		it( "should be instantiable", ():void => {
			const token:AssigmentToken = new AssigmentToken( new IRIRefToken( "resource/" ), new VariableToken( "var" ) );
			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( AssigmentToken ) );
		} );

		it( "should not init expression", ():void => {
			const expression = new IRIRefToken( "resource/" );
			const token:AssigmentToken = new AssigmentToken( expression, new VariableToken( "var" ) );
			expect( token.expression ).toBe( expression );
		} );

		it( "should not init variable", ():void => {
			const variable = new VariableToken( "var" );
			const token:AssigmentToken = new AssigmentToken( new IRIRefToken( "resource/" ), variable );
			expect( token.variable ).toBe( variable );
		} );


		it( "should assign `select` as token name", ():void => {
			const token:AssigmentToken = new AssigmentToken( new IRIRefToken( "resource/" ), new VariableToken( "var" ) );
			expect( token.token ).toBe( "assigment" );
		} );

	} );


	describe( "AssigmentToken.toString", ():void => {

		it( "should exists", ():void => {
			expect( AssigmentToken.prototype.toString ).toBeDefined();
			expect( AssigmentToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );


		it( "should compact print the assigment", ():void => {
			const expression = new UnaryOperationToken( "!", new IRIRefToken( "resource/" ) );
			const token:AssigmentToken = new AssigmentToken( expression, new VariableToken( "foo" ) );
			expect( token.toString() ).toEqual( "(!<resource/> AS ?foo)" );
		} );

		it( "should pretty print the assigment", ():void => {
			const expression = new UnaryOperationToken( "!", new IRIRefToken( "resource/" ) );
			const token:AssigmentToken = new AssigmentToken( expression, new VariableToken( "foo" ) );
			expect( token.toString( 0 ) ).toEqual( "(! <resource/> AS ?foo)" );
		} );

	} );

} );
