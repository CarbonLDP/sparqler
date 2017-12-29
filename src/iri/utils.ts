import { Token } from "../tokens/Token";
import { StringLiteral } from "../tokens/StringLiteral";
import {
	OPEN_IRI,
	CLOSE_IRI,
} from "../patterns/tokens";

export function isAbsolute( iri:string ):boolean {
	return iri.indexOf( ":" ) !== - 1;
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

const bNodeRegex:RegExp = /^_:/;

export function isBNodeLabel( label:string ):boolean {
	return bNodeRegex.test( label );
}

const prefixRegex:RegExp = /([A-Za-z](([A-Za-z_\-0-9]|\.)*[A-Za-z_\-0-9])?)?:/;
const softPrefixRegex:RegExp = /^(?!_:)[^]*?:/;
const prefixNormalizeRegex:RegExp = /([_~.\-!$&'|()*+,;=/?#@%])/g;

export function isPrefixed( iri:string ):boolean {
	return softPrefixRegex.test( iri ) && ! hasProtocol( iri );
}

export function getPrefixedParts( iri:string ):[ string, string ] {
	let parts:RegExpExecArray = prefixRegex.exec( iri );
	if( parts === null || hasProtocol( iri ) ) return null;

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
