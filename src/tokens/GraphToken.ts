import { VariableOrIRIToken } from "./VariableOrIRIToken";
import { GroupPatternToken } from "./GroupPatternToken";
import { PatternToken } from "./PatternToken";
import { TokenNode } from "./TokenNode";


/**
 * The token of the `GRAPH` statement.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rGraphGraphPattern}
 */
export class GraphToken implements TokenNode {
	readonly token:"graph" = "graph";

	readonly graph:VariableOrIRIToken;
	readonly groupPattern:GroupPatternToken;

	constructor( graph:VariableOrIRIToken ) {
		this.graph = graph;
		this.groupPattern = new GroupPatternToken();
	}


	addPattern( ...pattern:PatternToken[] ):this {
		this.groupPattern.patterns.push( ...pattern );
		return this;
	}


	toString( spaces?:number ):string {
		return `GRAPH ${ this.graph } ${ this.groupPattern.toString( spaces ) }`;
	}
}
