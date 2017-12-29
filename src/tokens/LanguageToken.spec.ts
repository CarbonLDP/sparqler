import * as Module from "./LanguageToken";
import { LanguageToken } from "./LanguageToken";

describe( "Module LanguageToken", ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	describe( "LanguageToken", ():void => {

		it( "should exists", ():void => {
			expect( LanguageToken ).toBeDefined();
			expect( LanguageToken ).toEqual( jasmine.any( Function ) );
		} );

		it( "should construct", ():void => {
			const token = new LanguageToken( "language" );

			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( LanguageToken ) );
		} );

		it( "should validate language tag", ():void => {
			const helper = ( tag:string ) => () => new LanguageToken( tag );

			expect( helper( "valid" ) ).not.toThrowError();
			expect( helper( "va-lid" ) ).not.toThrowError();
			expect( helper( "va-lid-valid" ) ).not.toThrowError();
			expect( helper( "x" ) ).not.toThrowError();
			expect( helper( "x-x" ) ).not.toThrowError();

			expect( helper( "@invalid" ) ).toThrowError( "Invalid language tag." );
			expect( helper( "invalid-" ) ).toThrowError( "Invalid language tag." );
			expect( helper( "-invalid" ) ).toThrowError( "Invalid language tag." );
			expect( helper( "-" ) ).toThrowError( "Invalid language tag." );
			expect( helper( "" ) ).toThrowError( "Invalid language tag." );
		} );

		it( "should store the language tag", ():void => {
			const helper = ( tag:string ) => {
				const token = new LanguageToken( tag );
				expect( token.tag ).toBe( tag );
			};

			helper( "en" );
			helper( "en-US" );
		} );

		it( "should assign the `language` as token name", ():void => {
			const helper = ( tag:string ) => {
				const token = new LanguageToken( tag );
				expect( token.token ).toBe( "language" );
			};

			helper( "en" );
			helper( "en-US" );
		} );

		describe( "LanguageToken.toString", ():void => {

			it( "should override toString method", ():void => {
				const token:LanguageToken = new LanguageToken( "en" );

				expect( token.toString ).toBeDefined();
				expect( token.toString ).not.toBe( Object.prototype.toString );
			} );

			it( "should return the SPARQL language tag", ():void => {
				const helper = ( tag:string ) => {
					const token = new LanguageToken( tag );
					return token.toString();
				};
				expect( helper( "en" ) ).toBe( "@en" );
				expect( helper( "en-US" ) ).toBe( "@en-US" );
			} );

		} );

	} );

} );
