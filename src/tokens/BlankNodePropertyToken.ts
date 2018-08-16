import { getTokenContainerString } from "./printing";
import { PropertyToken } from "./PropertyToken";
import { TokenNode } from "./TokenNode";


/**
 * The generic token of a blank node property list.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rBlankNodePropertyList}
 * @see {@link https://www.w3.org/TR/sparql11-query/#rBlankNodePropertyListPath}
 */
export class BlankNodePropertyToken implements TokenNode {
	readonly token:"blankNodeProperty" = "blankNodeProperty";

	readonly properties:PropertyToken[];

	constructor() {
		this.properties = [];
	}


	addProperty( property:PropertyToken ):this {
		this.properties.push( property );
		return this;
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
