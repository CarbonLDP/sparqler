import { TokenNode } from "./TokenNode";


export class HavingToken implements TokenNode {
	readonly token:"having" = "having";

	readonly rawCondition:string;

	constructor( rawCondition:string ) {
		this.rawCondition = rawCondition;
	}


	toString( spaces?:number ):string {
		return `HAVING ${ this.rawCondition }`;
	}
}
