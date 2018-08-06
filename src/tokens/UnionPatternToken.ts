import { GroupPatternToken } from "./GroupPatternToken";
import { TokenNode } from "./TokenNode";


/**
 * @todo
 */
export class UnionPatternToken implements TokenNode {
	readonly token:"unionPattern" = "unionPattern";

	readonly groupPatterns:GroupPatternToken[];

	constructor() {
		this.groupPatterns = [];
	}


	toString():string {
		return this
			.groupPatterns
			.join( `UNION ` )
			;
	}
}
