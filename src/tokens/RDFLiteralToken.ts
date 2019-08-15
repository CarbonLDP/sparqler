import { IRIToken } from "./IRIToken";
import { LanguageToken } from "./LanguageToken";
import { LiteralToken } from "./LiteralToken";


/**
 * The token of the RDF Literal term.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rRDFLiteral}
 */
export class RDFLiteralToken extends LiteralToken {
	readonly type?:IRIToken;
	readonly language?:LanguageToken;

	constructor( value:string, type?:IRIToken );
	constructor( value:string, language?:LanguageToken );
	constructor( value:string, typeOrLanguage?:IRIToken | LanguageToken ) {
		super( value );

		if( !typeOrLanguage ) return;


		if( typeOrLanguage.token === "language" ) {
			this.language = typeOrLanguage;
		} else {
			this.type = typeOrLanguage;
		}
	}

	toString( spaces?:number ):string {
		const value:string = super.toString();

		if( this.language ) return value + this.language;
		if( this.type ) return `${ value }^^${ this.type }`;

		return value;
	}

}
