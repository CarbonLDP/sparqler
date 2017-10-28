import { PatternToken } from "sparqler/tokens";
import { TokenNode } from "sparqler/tokens/TokenNode";

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
		return `OPTIONAL { ${ this.patterns.join( ". " ) } }`;
	}
}
