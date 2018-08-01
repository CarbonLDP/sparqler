import { PatternToken } from "sparqler/tokens/PatternToken";
import { TokenNode } from "./TokenNode";


export class GroupPatternToken implements TokenNode {
	token:"groupPattern" = "groupPattern";

	readonly patterns:PatternToken[];

	constructor() {
		this.patterns = [];
	}


	toString() {
		return this.patterns.join( ". " );
	}
}
