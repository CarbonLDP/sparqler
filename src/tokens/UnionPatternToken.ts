import { GroupPatternToken } from "./GroupPatternToken";
import { TokenNode } from "./TokenNode";


/**
 * The token of the `UNION` statement.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rGroupOrUnionGraphPattern}
 */
export class UnionPatternToken implements TokenNode {
	readonly token:"unionPattern" = "unionPattern";

	readonly groupPatterns:GroupPatternToken[];

	constructor() {
		this.groupPatterns = [];
	}


	toString( spaces?:number ):string {
		return this
			.groupPatterns
			.map( x => x.toString( spaces ) )
			.join( ` UNION ` )
			;
	}
}
