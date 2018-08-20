import { IRIRefToken } from "./IRIRefToken";
import { LanguageToken } from "./LanguageToken";
import { PrefixedNameToken } from "./PrefixedNameToken";
import { RDFLiteralToken } from "./RDFLiteralToken";


describe( "RDFLiteralToken", ():void => {

	it( "should exists", ():void => {
		expect( RDFLiteralToken ).toBeDefined();
		expect( RDFLiteralToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "RDFLiteralToken.constructor", () => {

		it( "should be instantiable", ():void => {
			const token = new RDFLiteralToken( "literal" );

			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( RDFLiteralToken ) );
		} );

		it( "should store value", ():void => {
			const token = new RDFLiteralToken( "value" );
			expect( token.value ).toEqual( "value" );
		} );

		it( "should store IRI type", ():void => {
			const token = new RDFLiteralToken( "value", new IRIRefToken( "type/" ) );
			expect( token.type ).toEqual( new IRIRefToken( "type/" ) );
		} );

		it( "should store prefixed name type", ():void => {
			const token = new RDFLiteralToken( "value", new PrefixedNameToken( "ex", "type" ) );
			expect( token.type ).toEqual( new PrefixedNameToken( "ex", "type" ) );
		} );

		it( "should store language tag", ():void => {
			const token = new RDFLiteralToken( "value", new LanguageToken( "en" ) );
			expect( token.language ).toEqual( new LanguageToken( "en" ) );
		} );

		it( "should assign the `literal` as token name", ():void => {
			const token = new RDFLiteralToken( "value" );
			expect( token.token ).toBe( "literal" );
		} );

	} );

	describe( "RDFLiteralToken.toString", ():void => {

		it( "should override toString method", ():void => {
			const token:RDFLiteralToken = new RDFLiteralToken( "" );

			expect( token.toString ).toBeDefined();
			expect( token.toString ).not.toBe( Object.prototype.toString );
		} );

		it( "should return the basic literal", ():void => {
			const token = new RDFLiteralToken( "value" );
			expect( token.toString() ).toBe( `"value"` );
		} );

		it( "should return the string with language", ():void => {
			const token = new RDFLiteralToken( "value", new LanguageToken( "en" ) );
			expect( token.toString() ).toBe( `"value"@en` );
		} );

		it( "should return the string with type", ():void => {
			const type = new PrefixedNameToken( "xsd:string" );
			const token = new RDFLiteralToken( "value", type );
			expect( token.toString() ).toBe( `"value"^^xsd:string` );
		} );

	} );

} );

