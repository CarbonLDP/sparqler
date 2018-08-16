import { GroupPatternToken } from "./GroupPatternToken";
import { PatternToken } from "./PatternToken";
import { TokenNode } from "./TokenNode";


/**
 * The token of the `OPTIONAL` statement.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rMinusGraphPattern}
 */
export class OptionalToken implements TokenNode {
	readonly token:"optional" = "optional";

	readonly groupPattern:GroupPatternToken;

	constructor() {
		this.groupPattern = new GroupPatternToken();
	}


	addPattern( ...pattern:PatternToken[] ):this {
		this.groupPattern.patterns.push( ...pattern );
		return this;
	}


	toString( spaces?:number ):string {
		return `OPTIONAL ${ this.groupPattern.toString( spaces ) }`;
	}
}
