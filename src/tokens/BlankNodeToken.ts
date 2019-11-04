import { TokenNode } from "./TokenNode";

/**
 * Regex to evaluate a correct blank node label.
 */
const LABEL_REGEX:RegExp = /^_:[A-Za-z0-9_]([A-Za-z0-9_\-.]*[A-Za-z0-9_\-])?$/;


/**
 * The token of a blank node resource.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rBlankNode
 */
export class BlankNodeToken implements TokenNode {
	readonly token:"blankNode" = "blankNode";
	readonly label?:string;

	constructor( label?:string ) {
		if( !label ) return;
		if( !LABEL_REGEX.test( label ) ) throw new Error( "Invalid blank node label." );
		this.label = label;
	}

	toString( spaces?:number ):string {
		if( this.label ) return this.label;
		return `[]`;
	}
}
