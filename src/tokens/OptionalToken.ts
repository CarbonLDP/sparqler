import { PatternToken } from "./";
import { TokenNode } from "./TokenNode";
import { joinPatterns } from "./utils";

export class OptionalToken implements TokenNode {
	readonly token:"optional" = "optional";
	readonly patterns:PatternToken[];

	constructor() {
		this.patterns = [];
	}

	addPattern( ...pattern:PatternToken[] ):this {
		this.patterns.push( ...pattern );
		return this;
	}

	toString():string {
		return `OPTIONAL { ${ joinPatterns( this.patterns ) } }`;
	}
}
