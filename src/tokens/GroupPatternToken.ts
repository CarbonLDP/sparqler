import { PatternToken } from "./PatternToken";
import { getTokenContainerString } from "./printing";
import { TokenNode } from "./TokenNode";


export class GroupPatternToken implements TokenNode {
	token:"groupPattern" = "groupPattern";

	readonly patterns:PatternToken[];

	constructor() {
		this.patterns = [];
	}


	addPattern( ...patterns:PatternToken[] ):this {
		this.patterns.push( ...patterns );
		return this;
	}


	toString( spaces?:number ):string {
		return getTokenContainerString( {
			spaces,
			tags: { open: "{", close: "}" },
			tokensSeparator: ".",
			tokens: this.patterns,
		} );
	}
}
