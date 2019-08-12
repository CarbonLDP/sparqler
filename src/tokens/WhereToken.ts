import { GroupPatternToken } from "./GroupPatternToken";
import { TokenNode } from "./TokenNode";


/**
 * The token for `WHERE` statements.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rWhereClause
 */
export class WhereToken implements TokenNode {
	token:"where" = "where";

	readonly groupPattern:GroupPatternToken;

	constructor() {
		this.groupPattern = new GroupPatternToken();
	}


	toString( spaces?:number ):string {
		const identifier:string = spaces === void 0 ? "" : "WHERE ";
		return identifier + this.groupPattern.toString( spaces );
	}
}
