import * as IRI from "./IRI";

import { LeftSymbol } from "../tokens/LeftSymbol";
import { RightSymbol } from "../tokens/RightSymbol";
import { StringLiteral } from "../tokens/StringLiteral";

describe( "Module IRI", ():void => {

	it( "Exists", ():void => {
		expect( IRI ).toBeDefined();
		expect( IRI ).toEqual( jasmine.any( Object ) );
	} );

	describe( "isAbsolute()", ():void => {

		it( "Exists", ():void => {
			expect( IRI.isAbsolute ).toBeDefined();
			expect( IRI.isAbsolute ).toEqual( jasmine.any( Function ) );
		} );

		it( "String with any protocol is absolute", ():void => {
			expect( IRI.isAbsolute( "http://example.com/" ) ).toBe( true );
			expect( IRI.isAbsolute( "http://example.com/part-of-the/iri" ) ).toBe( true );
			expect( IRI.isAbsolute( "https://example.com/" ) ).toBe( true );
			expect( IRI.isAbsolute( "ftp://example.com/" ) ).toBe( true );
			expect( IRI.isAbsolute( "any-protocol://example.com/" ) ).toBe( true );
		} );

		it( "Prefixed string is absolute", ():void => {
			expect( IRI.isAbsolute( "prefix:path" ) ).toBe( true );
			expect( IRI.isAbsolute( "another-prefix:path/part-of-the/path" ) ).toBe( true );
			expect( IRI.isAbsolute( "last-prefix:path/" ) ).toBe( true );
		} );

		it( "Relative string is not absolute", ():void => {
			expect( IRI.isAbsolute( "relative-iri" ) ).toBe( false );
			expect( IRI.isAbsolute( "/another-relative-iri" ) ).toBe( false );
			expect( IRI.isAbsolute( "relative-iri-2/" ) ).toBe( false );
			expect( IRI.isAbsolute( "/another-relative-iri-2/" ) ).toBe( false );
			expect( IRI.isAbsolute( "" ) ).toBe( false );
		} );

	} );

	describe( "hasProtocol()", ():void => {

		it( "Exists", ():void => {
			expect( IRI.hasProtocol ).toBeDefined();
			expect( IRI.hasProtocol ).toEqual( jasmine.any( Function ) );
		} );

		it( "String with any type of protocol", ():void => {
			expect( IRI.hasProtocol( "http://example.com/" ) ).toBe( true );
			expect( IRI.hasProtocol( "http://example.com/part-of-the/iri" ) ).toBe( true );
			expect( IRI.hasProtocol( "https://example.com/" ) ).toBe( true );
			expect( IRI.hasProtocol( "ftp://example.com/" ) ).toBe( true );
			expect( IRI.hasProtocol( "any-protocol://example.com/" ) ).toBe( true );
		} );

		it( "Relative string has no protocol", ():void => {
			expect( IRI.hasProtocol( "relative-iri" ) ).toBe( false );
			expect( IRI.hasProtocol( "relative-iri/" ) ).toBe( false );
			expect( IRI.hasProtocol( "/another-relative-iri" ) ).toBe( false );
			expect( IRI.hasProtocol( "/another-relative-iri/" ) ).toBe( false );
			expect( IRI.hasProtocol( "" ) ).toBe( false );
		} );

		it( "Prefixed string has no protocol", ():void => {
			expect( IRI.hasProtocol( "prefix:path" ) ).toBe( false );
			expect( IRI.hasProtocol( "another-prefix:path/part-of-the/path" ) ).toBe( false );
			expect( IRI.hasProtocol( "last-prefix:path/" ) ).toBe( false );
		} );

	} );

	describe( "isRelative()", ():void => {

		it( "Exists", ():void => {
			expect( IRI.isRelative ).toBeDefined();
			expect( IRI.isRelative ).toEqual( jasmine.any( Function ) );
		} );

		it( "Relative string", ():void => {
			expect( IRI.isRelative( "relative-iri" ) ).toBe( true );
			expect( IRI.isRelative( "relative-iri/" ) ).toBe( true );
			expect( IRI.isRelative( "/another-relative-iri" ) ).toBe( true );
			expect( IRI.isRelative( "/another-relative-iri/" ) ).toBe( true );
			expect( IRI.isRelative( "" ) ).toBe( true );
		} );

		it( "String with any protocol is not relative", ():void => {
			expect( IRI.isRelative( "http://example.com/" ) ).toBe( false );
			expect( IRI.isRelative( "http://example.com/part-of-the/iri" ) ).toBe( false );
			expect( IRI.isRelative( "https://example.com/" ) ).toBe( false );
			expect( IRI.isRelative( "ftp://example.com/" ) ).toBe( false );
			expect( IRI.isRelative( "any-protocol://example.com/" ) ).toBe( false );
		} );

		it( "Prefixed string is not relative", ():void => {
			expect( IRI.isRelative( "prefix:path" ) ).toBe( false );
			expect( IRI.isRelative( "another-prefix:path/part-of-the/path" ) ).toBe( false );
			expect( IRI.isRelative( "last-prefix:path/" ) ).toBe( false );
		} );

	} );

	describe( "isIRI()", ():void => {

		it( "Exists", ():void => {
			expect( IRI.isIRI ).toBeDefined();
			expect( IRI.isIRI ).toEqual( jasmine.any( Function ) );
		} );

		it( "String with a protocol is an IRI", ():void => {
			expect( IRI.isIRI( "http://example.com/" ) ).toBe( true );
			expect( IRI.isIRI( "http://example.com/part-of-the/iri" ) ).toBe( true );
			expect( IRI.isIRI( "https://example.com/" ) ).toBe( true );
			expect( IRI.isIRI( "ftp://example.com/" ) ).toBe( true );
			expect( IRI.isIRI( "any-protocol://example.com/" ) ).toBe( true );
		} );

		it( "Relative string is an IRI", ():void => {
			expect( IRI.isIRI( "relative-iri" ) ).toBe( true );
			expect( IRI.isIRI( "relative-iri/" ) ).toBe( true );
			expect( IRI.isIRI( "/another-relative-iri" ) ).toBe( true );
			expect( IRI.isIRI( "/another-relative-iri/" ) ).toBe( true );
			expect( IRI.isIRI( "" ) ).toBe( true );
		} );

		it( "String with a prefix is NOT a strict SPARQL IRI", ():void => {
			expect( IRI.isIRI( "prefix:path" ) ).toBe( false );
			expect( IRI.isIRI( "another-prefix:path/part-of-the/path" ) ).toBe( false );
			expect( IRI.isIRI( "last-prefix:path/" ) ).toBe( false );
		} );

	} );

	describe( "isPrefixed()", ():void => {

		it( "Exists", ():void => {
			expect( IRI.isPrefixed ).toBeDefined();
			expect( IRI.isPrefixed ).toEqual( jasmine.any( Function ) );
		} );

		it( "Absolute is not prefixed", ():void => {
			expect( IRI.isPrefixed( "http://example.com/" ) ).toBe( false );
			expect( IRI.isPrefixed( "http://example.com/part-of-the/iri" ) ).toBe( false );
			expect( IRI.isPrefixed( "https://example.com/" ) ).toBe( false );
			expect( IRI.isPrefixed( "ftp://example.com/" ) ).toBe( false );
			expect( IRI.isPrefixed( "any-protocol://example.com/" ) ).toBe( false );
		} );

		it( "Relative is not prefixed", ():void => {
			expect( IRI.isPrefixed( "relative-iri" ) ).toBe( false );
			expect( IRI.isPrefixed( "relative-iri/" ) ).toBe( false );
			expect( IRI.isPrefixed( "/another-relative-iri" ) ).toBe( false );
			expect( IRI.isPrefixed( "/another-relative-iri/" ) ).toBe( false );
			expect( IRI.isPrefixed( "" ) ).toBe( false );
		} );

		it( "A relative prefix is prefixed", ():void => {
			expect( IRI.isPrefixed( ":has-a-relative/prefix" ) ).toBe( true );
			expect( IRI.isPrefixed( ":path" ) ).toBe( true );
		} );

		it( "Any valid prefix is prefixed", ():void => {
			expect( IRI.isPrefixed( "prefix:path" ) ).toBe( true );
			expect( IRI.isPrefixed( "another-prefix:path/part-of-the/path" ) ).toBe( true );
			expect( IRI.isPrefixed( "last-prefix:path/" ) ).toBe( true );
			expect( IRI.isPrefixed( "prefix:" ) ).toBe( true );
		} );

	} );

	describe( "getPrefixedParts()", ():void => {

		it( "Exists", ():void => {
			expect( IRI.getPrefixedParts ).toBeDefined();
			expect( IRI.getPrefixedParts ).toEqual( jasmine.any( Function ) );
		} );

		it( "If relative or absolute IRI, returns null", ():void => {
			expect( IRI.getPrefixedParts( "relative-iri" ) ).toBeNull();
			expect( IRI.getPrefixedParts( "relative-iri/" ) ).toBeNull();
			expect( IRI.getPrefixedParts( "/another-relative-iri" ) ).toBeNull();
			expect( IRI.getPrefixedParts( "/another-relative-iri/" ) ).toBeNull();
			expect( IRI.getPrefixedParts( "" ) ).toBeNull();

			expect( IRI.getPrefixedParts( "http://example.com/" ) ).toBeNull();
			expect( IRI.getPrefixedParts( "http://example.com/part-of-the/iri" ) ).toBeNull();
			expect( IRI.getPrefixedParts( "any-protocol://example.com/" ) ).toBeNull();
		} );

		it( "Prefixed string returns the prefix an the path in the array", ():void => {
			expect( IRI.getPrefixedParts( "prefix:path" ) ).toEqual( [
				"prefix",
				"path",
			] );
			expect( IRI.getPrefixedParts( "another-prefix:path/part-of-the/path" ) ).toEqual( [
				"another-prefix",
				"path\\/part\\-of\\-the\\/path",
			] );
			expect( IRI.getPrefixedParts( "last-prefix:path/" ) ).toEqual( [
				"last-prefix",
				"path\\/",
			] );
			expect( IRI.getPrefixedParts( "prefix:" ) ).toEqual( [
				"prefix",
				""
			] );
		} );

		it( "Every special character in the path is normalized", ():void => {
			expect( IRI.getPrefixedParts( ":path_" )[ 1 ] ).toBe( "path\\_" );
			expect( IRI.getPrefixedParts( ":path~" )[ 1 ] ).toBe( "path\\~" );
			expect( IRI.getPrefixedParts( ":path." )[ 1 ] ).toBe( "path\\." );
			expect( IRI.getPrefixedParts( ":path-" )[ 1 ] ).toBe( "path\\-" );
			expect( IRI.getPrefixedParts( ":path!" )[ 1 ] ).toBe( "path\\!" );
			expect( IRI.getPrefixedParts( ":path$" )[ 1 ] ).toBe( "path\\$" );
			expect( IRI.getPrefixedParts( ":path&" )[ 1 ] ).toBe( "path\\&" );
			expect( IRI.getPrefixedParts( ":path'" )[ 1 ] ).toBe( "path\\'" );
			expect( IRI.getPrefixedParts( ":path(" )[ 1 ] ).toBe( "path\\(" );
			expect( IRI.getPrefixedParts( ":path)" )[ 1 ] ).toBe( "path\\)" );
			expect( IRI.getPrefixedParts( ":path*" )[ 1 ] ).toBe( "path\\*" );
			expect( IRI.getPrefixedParts( ":path+" )[ 1 ] ).toBe( "path\\+" );
			expect( IRI.getPrefixedParts( ":path," )[ 1 ] ).toBe( "path\\," );
			expect( IRI.getPrefixedParts( ":path;" )[ 1 ] ).toBe( "path\\;" );
			expect( IRI.getPrefixedParts( ":path=" )[ 1 ] ).toBe( "path\\=" );
			expect( IRI.getPrefixedParts( ":path/" )[ 1 ] ).toBe( "path\\/" );
			expect( IRI.getPrefixedParts( ":path?" )[ 1 ] ).toBe( "path\\?" );
			expect( IRI.getPrefixedParts( ":path#" )[ 1 ] ).toBe( "path\\#" );
			expect( IRI.getPrefixedParts( ":path@" )[ 1 ] ).toBe( "path\\@" );
			expect( IRI.getPrefixedParts( ":path%" )[ 1 ] ).toBe( "path\\%" );
		} );

	} );

	describe( "resolve()", ():void => {

		it( "Exists", ():void => {
			expect( IRI.resolve ).toBeDefined();
			expect( IRI.resolve ).toEqual( jasmine.any( Function ) );
		} );

		it( "IRIs are resolved adding the open and close symbols", ():void => {
			expect( IRI.resolve( "http://example.com/" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "http://example.com/" ), new RightSymbol( ">" ),
			] );

			expect( IRI.resolve( "https://example.com/" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "https://example.com/" ), new RightSymbol( ">" ),
			] );

			expect( IRI.resolve( "http://example.com/part-of-the/iri" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "http://example.com/part-of-the/iri" ), new RightSymbol( ">" ),
			] );

			expect( IRI.resolve( "https://example.com/" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "https://example.com/" ), new RightSymbol( ">" ),
			] );

			expect( IRI.resolve( "ftp://example.com/" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "ftp://example.com/" ), new RightSymbol( ">" ),
			] );

			expect( IRI.resolve( "any-protocol://example.com/" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "any-protocol://example.com/" ), new RightSymbol( ">" ),
			] );

			expect( IRI.resolve( "relative-iri" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "relative-iri" ), new RightSymbol( ">" ),
			] );

			expect( IRI.resolve( "relative-iri/" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "relative-iri/" ), new RightSymbol( ">" ),
			] );

			expect( IRI.resolve( "/another-relative-iri" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "/another-relative-iri" ), new RightSymbol( ">" ),
			] );

			expect( IRI.resolve( "/another-relative-iri/" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "/another-relative-iri/" ), new RightSymbol( ">" ),
			] );

			expect( IRI.resolve( "" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "" ), new RightSymbol( ">" ),
			] );
		} );

		it( "Absolute IRI and set to be resolved with the vocabulary does nothing different", ():void => {
			expect( IRI.resolve( "http://example.com/", "http://example.com/vocabulary#" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "http://example.com/" ), new RightSymbol( ">" ),
			] );

			expect( IRI.resolve( "https://example.com/", "http://example.com/vocabulary#" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "https://example.com/" ), new RightSymbol( ">" ),
			] );

			expect( IRI.resolve( "http://example.com/part-of-the/iri", "http://example.com/vocabulary#" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "http://example.com/part-of-the/iri" ), new RightSymbol( ">" ),
			] );

			expect( IRI.resolve( "https://example.com/", "http://example.com/vocabulary#" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "https://example.com/" ), new RightSymbol( ">" ),
			] );

			expect( IRI.resolve( "ftp://example.com/", "http://example.com/vocabulary#" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "ftp://example.com/" ), new RightSymbol( ">" ),
			] );

			expect( IRI.resolve( "any-protocol://example.com/", "http://example.com/vocabulary#" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "any-protocol://example.com/" ), new RightSymbol( ">" ),
			] );
		} );

		it( "Relative IRI set to be resolved with the vocabulary append it to the string literal", ():void => {
			expect( IRI.resolve( "relative-iri", "http://example.com/vocabulary#" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "http://example.com/vocabulary#relative-iri" ), new RightSymbol( ">" ),
			] );

			expect( IRI.resolve( "relative-iri/", "http://example.com/vocabulary#" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "http://example.com/vocabulary#relative-iri/" ), new RightSymbol( ">" ),
			] );

			expect( IRI.resolve( "/another-relative-iri", "http://example.com/vocabulary#" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "http://example.com/vocabulary#/another-relative-iri" ), new RightSymbol( ">" ),
			] );

			expect( IRI.resolve( "/another-relative-iri/", "http://example.com/vocabulary#" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "http://example.com/vocabulary#/another-relative-iri/" ), new RightSymbol( ">" ),
			] );

			expect( IRI.resolve( "", "http://example.com/vocabulary#" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "http://example.com/vocabulary#" ), new RightSymbol( ">" ),
			] );
		} );

		it( "If not an IRI, just creates an StringLiteral", ():void => {
			expect( IRI.resolve( "prefix:path" ) ).toEqual( [
				new StringLiteral( "prefix:path" ),
			] );

			expect( IRI.resolve( "another-prefix:path/part-of-the/path" ) ).toEqual( [
				new StringLiteral( "another-prefix:path/part-of-the/path" ),
			] );

			expect( IRI.resolve( "last-prefix:path/" ) ).toEqual( [
				new StringLiteral( "last-prefix:path/" ),
			] );
		} );

		it( "If not an IRI and to be resolved with the vocabulary, just creates an StringLiteral", ():void => {
			expect( IRI.resolve( "prefix:path", "http://example.com/vocabulary#" ) ).toEqual( [
				new StringLiteral( "prefix:path" ),
			] );

			expect( IRI.resolve( "another-prefix:path/part-of-the/path", "http://example.com/vocabulary#" ) ).toEqual( [
				new StringLiteral( "another-prefix:path/part-of-the/path" ),
			] );

			expect( IRI.resolve( "last-prefix:path/", "http://example.com/vocabulary#" ) ).toEqual( [
				new StringLiteral( "last-prefix:path/" ),
			] );
		} );

	} );

} );
