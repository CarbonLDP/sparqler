import { GroupPatternToken } from "sparqler/tokens/GroupPatternToken";
import { TokenNode } from "sparqler/tokens/TokenNode";

export class MinusPatternToken implements TokenNode {
	readonly token:"minusPattern" = "minusPattern";

	readonly groupPattern:GroupPatternToken;

	constructor() {
		this.groupPattern = new GroupPatternToken();
	}


	toString():string {
		return `MINUS ${ this.groupPattern }`;
	}
}