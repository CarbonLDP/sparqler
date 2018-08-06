import { Container2 } from "../data/Container2";

import { LiteralToken } from "../tokens/LiteralToken";
import { ObjectToken } from "../tokens/ObjectToken";
import { TermToken } from "../tokens/TermToken";
import { TokenNode } from "../tokens/TokenNode";
import { VariableToken } from "../tokens/VariableToken";

import * as XSD from "../utils/XSD";

import { SupportedNativeTypes } from "./SupportedNativeTypes";
import { TriplePattern } from "./triplePatterns/TriplePattern";


export function convertValue( value:"UNDEF" ):"UNDEF";
export function convertValue<T extends TriplePattern<any> | SupportedNativeTypes>( value:T ):T extends TriplePattern<infer TOKEN> ? TOKEN : LiteralToken;
export function convertValue( value:SupportedNativeTypes | TriplePattern<VariableToken | TermToken> ):ObjectToken | "UNDEF" {
	if( value instanceof Date )
		return new LiteralToken( value.toISOString() )
			.setType( XSD.dateTime );

	if( typeof value === "object" )
		return value.getSubject();

	if( typeof value === "string" ) {
		if( value === "UNDEF" ) return value;
		return new LiteralToken( value );
	}

	return new LiteralToken( value );
}


const PATH_OPERATORS:string[] = [ "|", "/", "^", "?", "*", "+", "!", "(", ")" ];

// TODO: Remove `a` and Implement Path tokens
export function _resolvePath( container:Container2<TokenNode>, propertyPath:string ):"a" {
	const parsedPath:string = propertyPath
		.split( /(<.*?>)/ )
		.reduce( ( array:string[], part:string ) => {
			// Is an IRI
			if( part.startsWith( "<" ) ) {
				array.push( part );
			}

			// Everything else
			else {
				array.push( ...part.split( /([|/^?*+!()])/ ) )
			}

			return array;
		}, [] )
		.map( ( part:string ) => {
			if( ! part ) return;

			// Operators
			if( PATH_OPERATORS.indexOf( part ) !== - 1 ) {
				return part;
			}

			// "a" keyword
			else if( part === "a" ) {
				return part;
			}

			// IRI or prefix
			else {
				// Remove IRI tags
				if( part.startsWith( "<" ) && part.endsWith( ">" ) ) part = part.slice( 1, - 1 );

				// Register prefix it prefixed
				return container.iriResolver.resolve( part, true );
			}
		} )
		.join( "" );

	return parsedPath as "a";
}