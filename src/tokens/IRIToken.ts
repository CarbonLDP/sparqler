import { TokenNode } from "./TokenNode";


/**
 * The token of the IRI term.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rIRIREF}
 */
export class IRIToken implements TokenNode {
	readonly token:"iri" = "iri";
	readonly value:string;

	constructor( value:string ) {
		this.value = value;
	}

	toString( spaces?:number ):string {
		return `<${ this.value }>`;
	}
}
