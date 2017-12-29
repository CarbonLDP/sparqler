import { TokenNode } from "./TokenNode";

const LABEL_REGEX:RegExp = /^_:[A-Za-z0-9_]([A-Za-z0-9_\-.]*[A-Za-z0-9_\-])?$/;

export class BlankNodeToken implements TokenNode {
	readonly token:"blankNode" = "blankNode";
	readonly label?:string;

	constructor( label?:string ) {
		if( ! label ) return;
		if( ! LABEL_REGEX.test( label ) ) throw new Error( "Invalid blank node label." );
		this.label = label;
	}

	toString():string {
		if( this.label ) return this.label;
		return `[]`;
	}
}
