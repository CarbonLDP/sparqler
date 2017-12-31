import { TokenNode } from "./TokenNode";

export class LimitToken implements TokenNode {
	readonly token:"limit" = "limit";
	readonly value:number;

	constructor( value:number ) {
		this.value = value;
	}

	toString():string {
		return `LIMIT ${ this.value }`;
	}
}
