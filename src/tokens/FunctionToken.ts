import { ExpressionListToken } from "./ExpressionListToken";
import { GroupPatternToken } from "./GroupPatternToken";
import { IRIToken } from "./IRIToken";
import { TokenNode } from "./TokenNode";


/**
 * Token that represents the build-in and custom functions.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rBuiltInCall}
 * @see {@link https://www.w3.org/TR/sparql11-query/#ririOrFunction}
 */
export class FunctionToken implements TokenNode {
	readonly token:"function" = "function";

	readonly name:string | IRIToken;
	readonly listOrPatterns:ExpressionListToken | GroupPatternToken;

	constructor( name:string | IRIToken, listOrPatterns:ExpressionListToken | GroupPatternToken ) {
		this.name = name;
		this.listOrPatterns = listOrPatterns;
	}

	toString( spaces?:number ):string {
		return this.name.toString( spaces ) +
			this.listOrPatterns.toString( spaces );
	}
}
