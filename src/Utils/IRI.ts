import { Token } from "../Tokens/Token";
import { LeftSymbol } from "../Tokens/LeftSymbol";
import { StringLiteral } from "../Tokens/StringLiteral";
import { RightSymbol } from "../Tokens/RightSymbol";
import {
	OPEN_IRI,
	CLOSE_IRI
} from "../Tokens";
export function isAbsolute( iri:string ):boolean {
	return iri.indexOf( ":" ) !== - 1
}

export function hasProtocol( iri:string ):boolean {
	return iri.indexOf( "://" ) !== - 1;
}

export function isRelative( iri:string ):boolean {
	return ! isAbsolute( iri );
}

export function isIRI( iri:string ):boolean {
	return hasProtocol( iri ) || ! isAbsolute( iri );
}


let prefixRegex:RegExp = /([A-Za-z](([A-Za-z_\-0-9]|\.)*[A-Za-z_\-0-9])?)?:/;
let prefixNormalizeRegex:RegExp = /([_~.\-!$&'|()*+,;=/?#@%])/;

export function isPrefixed( iri:string ):boolean {
	return iri.match( prefixRegex ) && ! hasProtocol( iri );
}

export function getPrefixedParts( iri:string ):[ string, string ] {
	let parts:RegExpExecArray = prefixRegex.exec( iri );
	if( parts === null ) return null;

	let prefix:string = parts[ 1 ] || "";
	let local:string = iri.substr( prefix.length + 1 ).replace( prefixNormalizeRegex, "\\$1" );

	return [
		prefix,
		local,
	];
}

/**
 * Check if the provided is an IRI to surround it with '<>'.
 * @param iri String to check.
 * @param vocab Optional parameter that indicates the vocab to resolve relative IRIs.
 * @returns {string}
 */
export function resolve( iri:string, vocab?:string ):Token[] {
	let tokens:Token[] = [ new StringLiteral( iri ) ];

	if( isIRI( iri ) ) {
		if( isRelative( iri ) && vocab )
			iri = vocab + iri;
		tokens = [ OPEN_IRI, new StringLiteral( iri ), CLOSE_IRI ];
	}

	return tokens;
}
