import { GroupPatternToken } from "./GroupPatternToken";
import { TokenNode } from "./TokenNode";


/**
 * The token of the `MINUS` statement.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rMinusGraphPattern}
 */
export class MinusPatternToken implements TokenNode {
	readonly token:"minusPattern" = "minusPattern";

	readonly groupPattern:GroupPatternToken;

	constructor() {
		this.groupPattern = new GroupPatternToken();
	}


	toString( spaces?:number ):string {
		return `MINUS ${ this.groupPattern.toString( spaces ) }`;
	}
}