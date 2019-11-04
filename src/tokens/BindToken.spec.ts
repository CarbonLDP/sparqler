import { AssigmentToken } from "./AssigmentToken";
import { BindToken } from "./BindToken";
import { IRIRefToken } from "./IRIRefToken";
import { UnaryOperationToken } from "./UnaryOperationToken";
import { VariableToken } from "./VariableToken";


describe( "BindToken", ():void => {

	it( "should exists", ():void => {
		expect( BindToken ).toBeDefined();
		expect( BindToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "BindToken.constructor", ():void => {

		it( "should be instantiable", ():void => {
			const token:BindToken = new BindToken( new AssigmentToken( new IRIRefToken( "" ), new VariableToken( "var" ) ) );
			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( BindToken ) );
		} );

		it( "should should init the assigment", ():void => {
			const assigment = new AssigmentToken( new IRIRefToken( "" ), new VariableToken( "var" ) );
			const token:BindToken = new BindToken( assigment );
			expect( token.assigment ).toBe( assigment );
		} );

		it( "should assign `bind` as token name", ():void => {
			const token:BindToken = new BindToken( new AssigmentToken( new IRIRefToken( "" ), new VariableToken( "var" ) ) );
			expect( token.token ).toBe( "bind" );
		} );

	} );

	describe( "BindToken.toString", ():void => {

		it( "should exists", ():void => {
			expect( BindToken.prototype.toString ).toBeDefined();
			expect( BindToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return compact SPARQL BIND", ():void => {
			expect( new BindToken(
				new AssigmentToken(
					new UnaryOperationToken( "!", new VariableToken( "foo" ) ),
					new VariableToken( "bar" )
				),
			).toString() ).toBe( "BIND(!?foo AS ?bar)" );
		} );


		it( "should return the SPARQL BIND when string statement", ():void => {
			expect( new BindToken(
				new AssigmentToken(
					new UnaryOperationToken( "!", new VariableToken( "foo" ) ),
					new VariableToken( "bar" )
				),
			).toString( 0 ) ).toBe( "BIND(! ?foo AS ?bar)" );
		} );

	} );

} );
