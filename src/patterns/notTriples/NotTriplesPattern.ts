import { GraphPattern } from "../interfaces";
import { Token } from "../../tokens/Token";

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
