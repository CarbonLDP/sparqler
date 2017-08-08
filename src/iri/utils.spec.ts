import * as Utils from "./utils";

import { LeftSymbol } from "../tokens/LeftSymbol";
import { RightSymbol } from "../tokens/RightSymbol";
import { StringLiteral } from "../tokens/StringLiteral";

describe( "Module Utils", ():void => {

	it( "Exists", ():void => {
		expect( Utils ).toBeDefined();
		expect( Utils ).toEqual( jasmine.any( Object ) );
	} );

	describe( "isAbsolute()", ():void => {

		it( "Exists", ():void => {
			expect( Utils.isAbsolute ).toBeDefined();
			expect( Utils.isAbsolute ).toEqual( jasmine.any( Function ) );
		} );

		it( "String with any protocol is absolute", ():void => {
			expect( Utils.isAbsolute( "http://example.com/" ) ).toBe( true );
			expect( Utils.isAbsolute( "http://example.com/part-of-the/iri" ) ).toBe( true );
			expect( Utils.isAbsolute( "https://example.com/" ) ).toBe( true );
			expect( Utils.isAbsolute( "ftp://example.com/" ) ).toBe( true );
			expect( Utils.isAbsolute( "any-protocol://example.com/" ) ).toBe( true );
		} );

		it( "Prefixed string is absolute", ():void => {
			expect( Utils.isAbsolute( "prefix:path" ) ).toBe( true );
			expect( Utils.isAbsolute( "another-prefix:path/part-of-the/path" ) ).toBe( true );
			expect( Utils.isAbsolute( "last-prefix:path/" ) ).toBe( true );
		} );

		it( "Relative string is not absolute", ():void => {
			expect( Utils.isAbsolute( "relative-iri" ) ).toBe( false );
			expect( Utils.isAbsolute( "/another-relative-iri" ) ).toBe( false );
			expect( Utils.isAbsolute( "relative-iri-2/" ) ).toBe( false );
			expect( Utils.isAbsolute( "/another-relative-iri-2/" ) ).toBe( false );
			expect( Utils.isAbsolute( "" ) ).toBe( false );
		} );

	} );

	describe( "hasProtocol()", ():void => {

		it( "Exists", ():void => {
			expect( Utils.hasProtocol ).toBeDefined();
			expect( Utils.hasProtocol ).toEqual( jasmine.any( Function ) );
		} );

		it( "String with any type of protocol", ():void => {
			expect( Utils.hasProtocol( "http://example.com/" ) ).toBe( true );
			expect( Utils.hasProtocol( "http://example.com/part-of-the/iri" ) ).toBe( true );
			expect( Utils.hasProtocol( "https://example.com/" ) ).toBe( true );
			expect( Utils.hasProtocol( "ftp://example.com/" ) ).toBe( true );
			expect( Utils.hasProtocol( "any-protocol://example.com/" ) ).toBe( true );
		} );

		it( "Relative string has no protocol", ():void => {
			expect( Utils.hasProtocol( "relative-iri" ) ).toBe( false );
			expect( Utils.hasProtocol( "relative-iri/" ) ).toBe( false );
			expect( Utils.hasProtocol( "/another-relative-iri" ) ).toBe( false );
			expect( Utils.hasProtocol( "/another-relative-iri/" ) ).toBe( false );
			expect( Utils.hasProtocol( "" ) ).toBe( false );
		} );

		it( "Prefixed string has no protocol", ():void => {
			expect( Utils.hasProtocol( "prefix:path" ) ).toBe( false );
			expect( Utils.hasProtocol( "another-prefix:path/part-of-the/path" ) ).toBe( false );
			expect( Utils.hasProtocol( "last-prefix:path/" ) ).toBe( false );
		} );

	} );

	describe( "isRelative()", ():void => {

		it( "Exists", ():void => {
			expect( Utils.isRelative ).toBeDefined();
			expect( Utils.isRelative ).toEqual( jasmine.any( Function ) );
		} );

		it( "Relative string", ():void => {
			expect( Utils.isRelative( "relative-iri" ) ).toBe( true );
			expect( Utils.isRelative( "relative-iri/" ) ).toBe( true );
			expect( Utils.isRelative( "/another-relative-iri" ) ).toBe( true );
			expect( Utils.isRelative( "/another-relative-iri/" ) ).toBe( true );
			expect( Utils.isRelative( "" ) ).toBe( true );
		} );

		it( "String with any protocol is not relative", ():void => {
			expect( Utils.isRelative( "http://example.com/" ) ).toBe( false );
			expect( Utils.isRelative( "http://example.com/part-of-the/iri" ) ).toBe( false );
			expect( Utils.isRelative( "https://example.com/" ) ).toBe( false );
			expect( Utils.isRelative( "ftp://example.com/" ) ).toBe( false );
			expect( Utils.isRelative( "any-protocol://example.com/" ) ).toBe( false );
		} );

		it( "Prefixed string is not relative", ():void => {
			expect( Utils.isRelative( "prefix:path" ) ).toBe( false );
			expect( Utils.isRelative( "another-prefix:path/part-of-the/path" ) ).toBe( false );
			expect( Utils.isRelative( "last-prefix:path/" ) ).toBe( false );
		} );

	} );

	describe( "isIRI()", ():void => {

		it( "Exists", ():void => {
			expect( Utils.isIRI ).toBeDefined();
			expect( Utils.isIRI ).toEqual( jasmine.any( Function ) );
		} );

		it( "String with a protocol is an IRI", ():void => {
			expect( Utils.isIRI( "http://example.com/" ) ).toBe( true );
			expect( Utils.isIRI( "http://example.com/part-of-the/iri" ) ).toBe( true );
			expect( Utils.isIRI( "https://example.com/" ) ).toBe( true );
			expect( Utils.isIRI( "ftp://example.com/" ) ).toBe( true );
			expect( Utils.isIRI( "any-protocol://example.com/" ) ).toBe( true );
		} );

		it( "Relative string is an IRI", ():void => {
			expect( Utils.isIRI( "relative-iri" ) ).toBe( true );
			expect( Utils.isIRI( "relative-iri/" ) ).toBe( true );
			expect( Utils.isIRI( "/another-relative-iri" ) ).toBe( true );
			expect( Utils.isIRI( "/another-relative-iri/" ) ).toBe( true );
			expect( Utils.isIRI( "" ) ).toBe( true );
		} );

		it( "String with a prefix is NOT a strict SPARQL IRI", ():void => {
			expect( Utils.isIRI( "prefix:path" ) ).toBe( false );
			expect( Utils.isIRI( "another-prefix:path/part-of-the/path" ) ).toBe( false );
			expect( Utils.isIRI( "last-prefix:path/" ) ).toBe( false );
		} );

	} );

	describe( "isPrefixed()", ():void => {

		it( "Exists", ():void => {
			expect( Utils.isPrefixed ).toBeDefined();
			expect( Utils.isPrefixed ).toEqual( jasmine.any( Function ) );
		} );

		it( "Absolute is not prefixed", ():void => {
			expect( Utils.isPrefixed( "http://example.com/" ) ).toBe( false );
			expect( Utils.isPrefixed( "http://example.com/part-of-the/iri" ) ).toBe( false );
			expect( Utils.isPrefixed( "https://example.com/" ) ).toBe( false );
			expect( Utils.isPrefixed( "ftp://example.com/" ) ).toBe( false );
			expect( Utils.isPrefixed( "any-protocol://example.com/" ) ).toBe( false );
		} );

		it( "Relative is not prefixed", ():void => {
			expect( Utils.isPrefixed( "relative-iri" ) ).toBe( false );
			expect( Utils.isPrefixed( "relative-iri/" ) ).toBe( false );
			expect( Utils.isPrefixed( "/another-relative-iri" ) ).toBe( false );
			expect( Utils.isPrefixed( "/another-relative-iri/" ) ).toBe( false );
			expect( Utils.isPrefixed( "" ) ).toBe( false );
		} );

		it( "A relative prefix is prefixed", ():void => {
			expect( Utils.isPrefixed( ":has-a-relative/prefix" ) ).toBe( true );
			expect( Utils.isPrefixed( ":path" ) ).toBe( true );
		} );

		it( "Any valid prefix is prefixed", ():void => {
			expect( Utils.isPrefixed( "prefix:path" ) ).toBe( true );
			expect( Utils.isPrefixed( "another-prefix:path/part-of-the/path" ) ).toBe( true );
			expect( Utils.isPrefixed( "last-prefix:path/" ) ).toBe( true );
			expect( Utils.isPrefixed( "prefix:" ) ).toBe( true );
		} );

	} );

	describe( "getPrefixedParts()", ():void => {

		it( "Exists", ():void => {
			expect( Utils.getPrefixedParts ).toBeDefined();
			expect( Utils.getPrefixedParts ).toEqual( jasmine.any( Function ) );
		} );

		it( "If relative or absolute IRI, returns null", ():void => {
			expect( Utils.getPrefixedParts( "relative-iri" ) ).toBeNull();
			expect( Utils.getPrefixedParts( "relative-iri/" ) ).toBeNull();
			expect( Utils.getPrefixedParts( "/another-relative-iri" ) ).toBeNull();
			expect( Utils.getPrefixedParts( "/another-relative-iri/" ) ).toBeNull();
			expect( Utils.getPrefixedParts( "" ) ).toBeNull();

			expect( Utils.getPrefixedParts( "http://example.com/" ) ).toBeNull();
			expect( Utils.getPrefixedParts( "http://example.com/part-of-the/iri" ) ).toBeNull();
			expect( Utils.getPrefixedParts( "any-protocol://example.com/" ) ).toBeNull();
		} );

		it( "Prefixed string returns the prefix an the path in the array", ():void => {
			expect( Utils.getPrefixedParts( "prefix:path" ) ).toEqual( [
				"prefix",
				"path",
			] );
			expect( Utils.getPrefixedParts( "another-prefix:path/part-of-the/path" ) ).toEqual( [
				"another-prefix",
				"path\\/part\\-of\\-the\\/path",
			] );
			expect( Utils.getPrefixedParts( "last-prefix:path/" ) ).toEqual( [
				"last-prefix",
				"path\\/",
			] );
			expect( Utils.getPrefixedParts( "prefix:" ) ).toEqual( [
				"prefix",
				""
			] );
		} );

		it( "Every special character in the path is normalized", ():void => {
			expect( Utils.getPrefixedParts( ":path_" )[ 1 ] ).toBe( "path\\_" );
			expect( Utils.getPrefixedParts( ":path~" )[ 1 ] ).toBe( "path\\~" );
			expect( Utils.getPrefixedParts( ":path." )[ 1 ] ).toBe( "path\\." );
			expect( Utils.getPrefixedParts( ":path-" )[ 1 ] ).toBe( "path\\-" );
			expect( Utils.getPrefixedParts( ":path!" )[ 1 ] ).toBe( "path\\!" );
			expect( Utils.getPrefixedParts( ":path$" )[ 1 ] ).toBe( "path\\$" );
			expect( Utils.getPrefixedParts( ":path&" )[ 1 ] ).toBe( "path\\&" );
			expect( Utils.getPrefixedParts( ":path'" )[ 1 ] ).toBe( "path\\'" );
			expect( Utils.getPrefixedParts( ":path(" )[ 1 ] ).toBe( "path\\(" );
			expect( Utils.getPrefixedParts( ":path)" )[ 1 ] ).toBe( "path\\)" );
			expect( Utils.getPrefixedParts( ":path*" )[ 1 ] ).toBe( "path\\*" );
			expect( Utils.getPrefixedParts( ":path+" )[ 1 ] ).toBe( "path\\+" );
			expect( Utils.getPrefixedParts( ":path," )[ 1 ] ).toBe( "path\\," );
			expect( Utils.getPrefixedParts( ":path;" )[ 1 ] ).toBe( "path\\;" );
			expect( Utils.getPrefixedParts( ":path=" )[ 1 ] ).toBe( "path\\=" );
			expect( Utils.getPrefixedParts( ":path/" )[ 1 ] ).toBe( "path\\/" );
			expect( Utils.getPrefixedParts( ":path?" )[ 1 ] ).toBe( "path\\?" );
			expect( Utils.getPrefixedParts( ":path#" )[ 1 ] ).toBe( "path\\#" );
			expect( Utils.getPrefixedParts( ":path@" )[ 1 ] ).toBe( "path\\@" );
			expect( Utils.getPrefixedParts( ":path%" )[ 1 ] ).toBe( "path\\%" );
		} );

	} );

	describe( "resolve()", ():void => {

		it( "Exists", ():void => {
			expect( Utils.resolve ).toBeDefined();
			expect( Utils.resolve ).toEqual( jasmine.any( Function ) );
		} );

		it( "IRIs are resolved adding the open and close symbols", ():void => {
			expect( Utils.resolve( "http://example.com/" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "http://example.com/" ), new RightSymbol( ">" ),
			] );

			expect( Utils.resolve( "https://example.com/" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "https://example.com/" ), new RightSymbol( ">" ),
			] );

			expect( Utils.resolve( "http://example.com/part-of-the/iri" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "http://example.com/part-of-the/iri" ), new RightSymbol( ">" ),
			] );

			expect( Utils.resolve( "https://example.com/" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "https://example.com/" ), new RightSymbol( ">" ),
			] );

			expect( Utils.resolve( "ftp://example.com/" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "ftp://example.com/" ), new RightSymbol( ">" ),
			] );

			expect( Utils.resolve( "any-protocol://example.com/" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "any-protocol://example.com/" ), new RightSymbol( ">" ),
			] );

			expect( Utils.resolve( "relative-iri" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "relative-iri" ), new RightSymbol( ">" ),
			] );

			expect( Utils.resolve( "relative-iri/" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "relative-iri/" ), new RightSymbol( ">" ),
			] );

			expect( Utils.resolve( "/another-relative-iri" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "/another-relative-iri" ), new RightSymbol( ">" ),
			] );

			expect( Utils.resolve( "/another-relative-iri/" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "/another-relative-iri/" ), new RightSymbol( ">" ),
			] );

			expect( Utils.resolve( "" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "" ), new RightSymbol( ">" ),
			] );
		} );

		it( "Absolute IRI and set to be resolved with the vocabulary does nothing different", ():void => {
			expect( Utils.resolve( "http://example.com/", "http://example.com/vocabulary#" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "http://example.com/" ), new RightSymbol( ">" ),
			] );

			expect( Utils.resolve( "https://example.com/", "http://example.com/vocabulary#" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "https://example.com/" ), new RightSymbol( ">" ),
			] );

			expect( Utils.resolve( "http://example.com/part-of-the/iri", "http://example.com/vocabulary#" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "http://example.com/part-of-the/iri" ), new RightSymbol( ">" ),
			] );

			expect( Utils.resolve( "https://example.com/", "http://example.com/vocabulary#" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "https://example.com/" ), new RightSymbol( ">" ),
			] );

			expect( Utils.resolve( "ftp://example.com/", "http://example.com/vocabulary#" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "ftp://example.com/" ), new RightSymbol( ">" ),
			] );

			expect( Utils.resolve( "any-protocol://example.com/", "http://example.com/vocabulary#" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "any-protocol://example.com/" ), new RightSymbol( ">" ),
			] );
		} );

		it( "Relative IRI set to be resolved with the vocabulary append it to the string literal", ():void => {
			expect( Utils.resolve( "relative-iri", "http://example.com/vocabulary#" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "http://example.com/vocabulary#relative-iri" ), new RightSymbol( ">" ),
			] );

			expect( Utils.resolve( "relative-iri/", "http://example.com/vocabulary#" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "http://example.com/vocabulary#relative-iri/" ), new RightSymbol( ">" ),
			] );

			expect( Utils.resolve( "/another-relative-iri", "http://example.com/vocabulary#" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "http://example.com/vocabulary#/another-relative-iri" ), new RightSymbol( ">" ),
			] );

			expect( Utils.resolve( "/another-relative-iri/", "http://example.com/vocabulary#" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "http://example.com/vocabulary#/another-relative-iri/" ), new RightSymbol( ">" ),
			] );

			expect( Utils.resolve( "", "http://example.com/vocabulary#" ) ).toEqual( [
				new LeftSymbol( "<" ), new StringLiteral( "http://example.com/vocabulary#" ), new RightSymbol( ">" ),
			] );
		} );

		it( "If not an IRI, just creates an StringLiteral", ():void => {
			expect( Utils.resolve( "prefix:path" ) ).toEqual( [
				new StringLiteral( "prefix:path" ),
			] );

			expect( Utils.resolve( "another-prefix:path/part-of-the/path" ) ).toEqual( [
				new StringLiteral( "another-prefix:path/part-of-the/path" ),
			] );

			expect( Utils.resolve( "last-prefix:path/" ) ).toEqual( [
				new StringLiteral( "last-prefix:path/" ),
			] );
		} );

		it( "If not an IRI and to be resolved with the vocabulary, just creates an StringLiteral", ():void => {
			expect( Utils.resolve( "prefix:path", "http://example.com/vocabulary#" ) ).toEqual( [
				new StringLiteral( "prefix:path" ),
			] );

			expect( Utils.resolve( "another-prefix:path/part-of-the/path", "http://example.com/vocabulary#" ) ).toEqual( [
				new StringLiteral( "another-prefix:path/part-of-the/path" ),
			] );

			expect( Utils.resolve( "last-prefix:path/", "http://example.com/vocabulary#" ) ).toEqual( [
				new StringLiteral( "last-prefix:path/" ),
			] );
		} );

	} );

} );
