import { IRIToken } from "./IRIToken";
import { PrefixedNameToken } from "./PrefixedNameToken";
import { TokenNode } from "./TokenNode";


export class FromToken implements TokenNode {
	readonly token:"from" = "from";

	readonly named:boolean;
	readonly source:IRIToken | PrefixedNameToken;

	constructor( source:IRIToken | PrefixedNameToken, named:boolean = false ) {
		this.source = source;
		this.named = named;
	}

	toString( spaces?:number ):string {
		let str:string = `FROM `;

		if( this.named ) str += `NAMED `;

		return str + this.source;
	}
}
