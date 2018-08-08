import { getTokenContainerString } from "./printing";
import { PropertyToken } from "./PropertyToken";
import { TokenNode } from "./TokenNode";


/**
 * @todo
 */
export class BlankNodePropertyToken implements TokenNode {
	readonly token:"blankNodeProperty" = "blankNodeProperty";

	readonly properties:PropertyToken[];

	constructor() {
		this.properties = [];
	}


	toString( spaces?:number ):string {
		return getTokenContainerString( {
			spaces,
			tags: { open: "[", close: "]" },
			tokensSeparator: ";",
			tokens: this.properties,
		} );
	}
}
