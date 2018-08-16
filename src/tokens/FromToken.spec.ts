import { PrefixedNameToken } from "sparqler/tokens/PrefixedNameToken";
import { FromToken } from "./FromToken";
import { IRIToken } from "./IRIToken";

describe( "FromToken", () => {

	it( "should exists", () => {
		expect( FromToken ).toBeDefined();
		expect( FromToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "FromToken.constructor", () => {

		it( "should be instantiable", ():void => {
			const token:FromToken = new FromToken( new IRIToken( "resource/" ) );

			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( FromToken ) );
		} );

		it( "should assign false if no named specified", ():void => {
			const token:FromToken = new FromToken( new IRIToken( "resource/" ) );
			expect( token.named ).toBe( false );
		} );

		it( "should assign named if specified", ():void => {
			const token:FromToken = new FromToken( new IRIToken( "resource/" ), true );
			expect( token.named ).toBe( true );
		} );

		it( "should assign `from` as token name", ():void => {
			const token:FromToken = new FromToken( new IRIToken( "resource/" ) );
			expect( token.token ).toBe( "from" );
		} );

	} );

	describe( "FromToken.toString", () => {

		it( "should exists", () => {
			expect( FromToken.prototype.toString ).toBeDefined();
			expect( FromToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );

		it( "should print the SPARQL FROM statement from IRI", () => {
			const token:FromToken = new FromToken( new IRIToken( "resource/" ) );
			expect( token.toString() ).toEqual( "FROM <resource/>" );
		} );

		it( "should print the SPARQL FROM statement from prefixed name", () => {
			const token:FromToken = new FromToken( new PrefixedNameToken( "ex", "resource" ) );
			expect( token.toString() ).toEqual( "FROM ex:resource" );
		} );

		it( "should print the SPARQL FROM NAMED statement from IRI", () => {
			const token:FromToken = new FromToken( new IRIToken( "resource/" ), true );
			expect( token.toString() ).toEqual( "FROM NAMED <resource/>" );
		} );

		it( "should print the SPARQL FROM NAMED statement from prefixed name", () => {
			const token:FromToken = new FromToken( new PrefixedNameToken( "ex", "resource" ), true );
			expect( token.toString() ).toEqual( "FROM NAMED ex:resource" );
		} );

	} );

} );
