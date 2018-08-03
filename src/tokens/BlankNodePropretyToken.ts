import { PropertyToken } from "./PropertyToken";
import { TokenNode } from "./TokenNode";


/**
 * @todo
 */
export class BlankNodePropretyToken implements TokenNode {
	readonly token:"blankNodeTriple" = "blankNodeTriple";

	readonly properties:PropertyToken[];

	constructor() {
		this.properties = [];
	}


	toString():string {
		if( ! this.properties.length ) return "[]";
		return `[ ${ this.properties.join( "; " ) } ]`;
	}
}
