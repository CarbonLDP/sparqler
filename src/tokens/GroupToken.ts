import { TokenNode } from "./TokenNode";


export class GroupToken implements TokenNode {
	readonly token:"group" = "group";

	readonly rawCondition:string;

	constructor( rawCondition:string ) {
		this.rawCondition = rawCondition;
	}


	toString():string {
		return `GROUP BY ${ this.rawCondition }`;
	}
}
