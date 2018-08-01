import { TokenNode } from "./TokenNode";


export class HavingToken implements TokenNode {
	readonly token:"having" = "having";

	readonly rawCondition:string;

	constructor( rawCondition:string ) {
		this.rawCondition = rawCondition;
	}


	toString():string {
		return `HAVING ${ this.rawCondition }`;
	}
}
