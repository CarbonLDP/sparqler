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


	toString( spaces?:number ):string {
		return this
			.groupPatterns
			.map( x => x.toString( spaces ) )
			.join( ` UNION ` )
			;
	}
}
