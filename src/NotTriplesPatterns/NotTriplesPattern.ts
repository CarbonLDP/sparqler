import { GraphPattern } from "../Patterns";
import { Token } from "../Tokens/Token";

export class NotTriplesPattern implements GraphPattern {

	protected patternTokens:Token[];

	constructor( tokens:Token[] ) {
		this.patternTokens = tokens;
	}

	getPattern():Token[] {
		return this.patternTokens;
	}

}

export default NotTriplesPattern;
