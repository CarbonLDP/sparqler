import { ArgListToken } from "./ArgListToken";
import { GroupPatternToken } from "./GroupPatternToken";
import { IRIToken } from "./IRIToken";
import { TokenNode } from "./TokenNode";


/**
 * Token that represents the build-in and custom functions in SPARQL.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rBuiltInCall}
 * @see {@link https://www.w3.org/TR/sparql11-query/#ririOrFunction}
 */
export class FunctionToken implements TokenNode {
	readonly token:"function" = "function";

	readonly name:string | IRIToken;
	readonly argsOrPatterns:ArgListToken | GroupPatternToken;

	constructor( name:string | IRIToken, argsOrPatterns:ArgListToken | GroupPatternToken ) {
		this.name = name;
		this.argsOrPatterns = argsOrPatterns;
	}

	toString( spaces?:number ):string {
		return this.name.toString( spaces ) +
			this.argsOrPatterns.toString( spaces );
	}
}
