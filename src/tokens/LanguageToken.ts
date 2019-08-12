import { TokenNode } from "./TokenNode";


/**
 * Regex of a valid language tag
 */
const LANGUAGE_REGEX:RegExp = /^[a-zA-Z]+(-[a-zA-Z0-9]+)*$/;


/**
 * The token of the language tag term.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rLANGTAG
 */
export class LanguageToken implements TokenNode {
	readonly token:"language" = "language";
	readonly tag:string;

	constructor( tag:string ) {
		if( ! LANGUAGE_REGEX.test( tag ) ) throw new Error( `"${ tag }" is an invalid language tag.` );
		this.tag = tag;
	}

	toString( spaces?:number ):string {
		return `@${ this.tag }`;
	}
}
