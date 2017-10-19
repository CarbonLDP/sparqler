import { TokenNode } from "./TokenNode";

export class BlankNodeToken implements TokenNode {
	readonly token:"blankNode" = "blankNode";
	readonly label?:string;

	constructor( label?:string ) {
		if( ! label ) return;
		this.label = label;
	}

	toString():string {
		if( this.label ) return this.label;
		return `[]`;
	}
}
