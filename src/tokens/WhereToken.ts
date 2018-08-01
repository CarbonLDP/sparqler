import { GroupPatternToken } from "./GroupPatternToken";
import { TokenNode } from "./TokenNode";


export class WhereToken implements TokenNode {
	token:"where" = "where";

	readonly groupPattern:GroupPatternToken;

	constructor() {
		this.groupPattern = new GroupPatternToken();
	}


	toString():string {
		return `WHERE ${ this.groupPattern }`;
	}
}
