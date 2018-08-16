import { BooleanToken } from "./BooleanToken";
import { IRIToken } from "./IRIToken";
import { LanguageToken } from "./LanguageToken";
import { LiteralToken } from "./LiteralToken";
import { NumberToken } from "./NumberToken";
import { PrefixedNameToken } from "./PrefixedNameToken";
import { StringToken } from "./StringToken";


describe( "LiteralToken", ():void => {

	it( "should exists", ():void => {
		expect( LiteralToken ).toBeDefined();
		expect( LiteralToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "LiteralToken.constructor", () => {

		it( "should be instantiable", ():void => {
			const token = new LiteralToken( "literal" );

			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( LiteralToken ) );
		} );

		it( "should allow no construct parameters", ():void => {
			const token = new LiteralToken();

			expect( token ).toBeDefined();
			expect( token.value ).toBeUndefined();
		} );

		it( "should parse number value", ():void => {
			const helper = ( value:number ) => {
				const token = new LiteralToken( value );
				expect( token.value ).toEqual( jasmine.any( NumberToken ) );
			};

			helper( 0 );
			helper( 1 );
			helper( 10.01 );
		} );

		it( "should parse boolean value", ():void => {
			const helper = ( value:boolean ) => {
				const token = new LiteralToken( value );
				expect( token.value ).toEqual( jasmine.any( BooleanToken ) );
			};

			helper( true );
			helper( false );
		} );

		it( "should parse string value", ():void => {
			const helper = ( value:string ) => {
				const token = new LiteralToken( value );
				expect( token.value ).toEqual( jasmine.any( StringToken ) );
			};

			helper( "" );
			helper( "string" );
			helper( "a bit larger string" );
		} );

		it( "should assign the `literal` as token name", ():void => {
			const helper = ( tag:string | boolean | number ) => {
				const token = new LiteralToken( tag );
				expect( token.token ).toBe( "literal" );
			};

			helper( "string" );
			helper( 1 );
			helper( 1.5 );
			helper( true );
		} );

	} );

	describe( "LiteralToken.setValue", ():void => {

		it( "should exists", ():void => {
			expect( LiteralToken.prototype.setValue ).toBeDefined();
			expect( LiteralToken.prototype.setValue ).toEqual( jasmine.any( Function ) );
		} );

		it( "should replace existing", ():void => {
			const helper = ( value1:string | number | boolean | undefined, value2:string | number | boolean ) => {
				const token:LiteralToken = new LiteralToken( value1 );
				const oldValue:StringToken | BooleanToken | NumberToken = token.value!;

				token.setValue( value2 );
				expect( token.value ).not.toEqual( oldValue );
			};

			helper( void 0, 2 );
			helper( void 0, "string" );
			helper( void 0, true );

			helper( 1, 2 );
			helper( 1, "string" );
			helper( 1, true );

			helper( "string1", "string2" );
			helper( "string", 1 );
			helper( "string", true );

			helper( true, false );
			helper( true, 1 );
			helper( true, "string" );
		} );

		it( "should not replace if the same contains the same", ():void => {
			const helper = ( value1:string | number | boolean, value2:string | number | boolean ) => {
				const token:LiteralToken = new LiteralToken( value1 );
				const oldValue:StringToken | BooleanToken | NumberToken = token.value!;

				token.setValue( value2 );
				expect( token.value ).toBe( oldValue );
			};

			helper( 1, 1 );
			helper( 10.01, 10.01 );
			helper( "string", "string" );
			helper( true, true );
		} );

	} );

	describe( "LiteralToken.setType", ():void => {

		it( "should exists", ():void => {
			expect( LiteralToken.prototype.setType ).toBeDefined();
			expect( LiteralToken.prototype.setType ).toEqual( jasmine.any( Function ) );
		} );

		it( "should throw error if no value is already defined", ():void => {
			const helper = ( type:string ) => () => {
				const token:LiteralToken = new LiteralToken();
				token.setType( type );
			};

			expect( helper( "xsd:string" ) ).toThrowError( "Must set a value before a type." );
			expect( helper( "http://example.com/types#string" ) ).toThrowError( "Must set a value before a type." );
		} );

		it( "should non-string values be transformed to string", ():void => {
			const helper = ( value:number | boolean, type:string ) => {
				const token:LiteralToken = new LiteralToken( value );
				expect( token.value ).not.toEqual( jasmine.any( StringToken ) );

				token.setType( type );
				expect( token.value ).toEqual( jasmine.any( StringToken ) );
			};

			helper( 1, "xsd:string" );
			helper( 10.01, "xsd:string" );
			helper( true, "xsd:string" );
			helper( false, "xsd:string" );
		} );

		it( "should not affect value when is already a string", ():void => {
			const helper = ( value:string, type:string ) => {
				const token:LiteralToken = new LiteralToken( value );
				expect( token.value ).toEqual( jasmine.any( StringToken ) );
				const currentValue:StringToken = token.value as StringToken;

				token.setType( type );
				expect( token.value ).toEqual( jasmine.any( StringToken ) );
				expect( token.value ).toBe( currentValue );
			};

			helper( "", "xsd:string" );
			helper( "string", "xsd:string" );
			helper( "a larger string", "xsd:string" );
		} );

		it( "should set a PrefixedName token when a prefixed is provided", ():void => {
			const helper = ( type:string, namespace:string, localName:string ) => {
				const token:LiteralToken = new LiteralToken( "string" );

				token.setType( type );
				expect( token.type ).toEqual( jasmine.any( PrefixedNameToken ) );

				const typeToken:PrefixedNameToken = token.type as PrefixedNameToken;
				expect( typeToken.namespace ).toBe( namespace );
				expect( typeToken.localName ).toBe( localName );
			};

			helper( "xsd:string", "xsd", "string" );
			helper( "prefixNamespace:prefixLocalName", "prefixNamespace", "prefixLocalName" );
		} );

		it( "should set a IRI token when a iri is provided", ():void => {
			const helper = ( type:string ) => {
				const token:LiteralToken = new LiteralToken( "string" );

				token.setType( type );
				expect( token.type ).toEqual( jasmine.any( IRIToken ) );

				const typeToken:IRIToken = token.type as IRIToken;
				expect( typeToken.value ).toBe( type );
			};

			helper( "http://www.w3.org/2001/XMLSchema#string" );
			helper( "http://example.com/types#string" );
		} );

	} );

	describe( "LiteralToken.setLanguage", ():void => {

		it( "should exists", ():void => {
			expect( LiteralToken.prototype.setLanguage ).toBeDefined();
			expect( LiteralToken.prototype.setLanguage ).toEqual( jasmine.any( Function ) );
		} );

		it( "should throw error if no value is already defined", ():void => {
			const helper = ( lang:string ) => () => {
				const token:LiteralToken = new LiteralToken();
				token.setLanguage( lang );
			};

			expect( helper( "en" ) ).toThrowError( "Non-string value can't have a language." );
			expect( helper( "en-US" ) ).toThrowError( "Non-string value can't have a language." );
		} );

		it( "should throw error if has a non-string value", ():void => {
			const helper = ( value:number | boolean, lang:string ) => () => {
				const token:LiteralToken = new LiteralToken( value );
				token.setLanguage( lang );
			};

			expect( helper( 1, "en" ) ).toThrowError( "Non-string value can't have a language." );
			expect( helper( 10.01, "en-US" ) ).toThrowError( "Non-string value can't have a language." );
			expect( helper( true, "es" ) ).toThrowError( "Non-string value can't have a language." );
		} );

		it( "should remove the type", ():void => {
			const helper = ( lang:string ) => {
				const token:LiteralToken = new LiteralToken( "literal" );
				token.setType( "xsd:string" );
				expect( token.type ).toBeDefined();

				token.setLanguage( lang );
				expect( token.type ).toBeUndefined();
			};

			helper( "en" );
			helper( "en-US" );
		} );

		it( "should set a Language token", ():void => {
			const helper = ( lang:string ) => {
				const token:LiteralToken = new LiteralToken( "literal" );

				token.setLanguage( lang );
				expect( token.language ).toEqual( jasmine.any( LanguageToken ) );
			};

			helper( "en" );
			helper( "en-US" );
		} );

	} );

	describe( "LiteralToken.toString", ():void => {

		it( "should override toString method", ():void => {
			const token:LiteralToken = new LiteralToken();

			expect( token.toString ).toBeDefined();
			expect( token.toString ).not.toBe( Object.prototype.toString );
		} );

		it( "should return the basic number literal", ():void => {
			const helper = ( value:number ) => {
				const token = new LiteralToken( value );
				return token.toString();
			};
			expect( helper( 1 ) ).toBe( "1" );
			expect( helper( 10.01 ) ).toBe( "10.01" );
		} );

		it( "should return the basic boolean literal", ():void => {
			const helper = ( value:boolean ) => {
				const token = new LiteralToken( value );
				return token.toString();
			};
			expect( helper( true ) ).toBe( "true" );
			expect( helper( false ) ).toBe( "false" );
		} );

		it( "should return the basic string literal", ():void => {
			const helper = ( value:string ) => {
				const token = new LiteralToken( value );
				return token.toString();
			};
			expect( helper( "" ) ).toBe( `""` );
			expect( helper( "string" ) ).toBe( `"string"` );
			expect( helper( "a bit larger string" ) ).toBe( `"a bit larger string"` );
		} );

		it( "should return the string with language", ():void => {
			const helper = ( value:string, lang:string ) => {
				const token = new LiteralToken( value );
				token.setLanguage( lang );
				return token.toString();
			};
			expect( helper( "", "en" ) ).toBe( `""@en` );
			expect( helper( "string", "en-US" ) ).toBe( `"string"@en-US` );
			expect( helper( "a bit larger string", "es" ) ).toBe( `"a bit larger string"@es` );
		} );

		it( "should return the string with type", ():void => {
			const helper = ( value:string, type:string ) => {
				const token = new LiteralToken( value );
				token.setType( type );
				return token.toString();
			};
			expect( helper( "string", "xsd:string" ) ).toBe( `"string"^^xsd:string` );
			expect( helper( "string", "http://example.com/types#string" ) ).toBe( `"string"^^<http://example.com/types#string>` );
		} );

	} );

} );
