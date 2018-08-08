import { TokenNode } from "./TokenNode";

const LANGUAGE_REGEX:RegExp = /^[a-zA-Z]+(-[a-zA-Z0-9]+)*$/;

export function isLanguageTag( tag:string ):boolean {
	return LANGUAGE_REGEX.test( tag );
}

export class LanguageToken implements TokenNode {
	readonly token:"language" = "language";
	readonly tag:string;

	constructor( tag:string ) {
		if( ! isLanguageTag( tag ) ) throw new Error( "Invalid language tag." );
		this.tag = tag;
	}

	toString( spaces?:number ):string {
		return `@${ this.tag }`;
	}
}
