import { IRIToken } from "./IRIToken";
import { TokenNode } from "./TokenNode";


/**
 * The token of the `FROM` statement.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rDatasetClause
 */
export class FromToken implements TokenNode {
	readonly token:"from" = "from";

	readonly named:boolean;
	readonly source:IRIToken;

	constructor( source:IRIToken, named:boolean = false ) {
		this.source = source;
		this.named = named;
	}

	toString( spaces?:number ):string {
		let str:string = `FROM `;

		if( this.named ) str += `NAMED `;

		return str + this.source;
	}
}
