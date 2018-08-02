import { VariableOrIRI } from "./VariableOrIRI";
import { GroupPatternToken } from "./GroupPatternToken";
import { PatternToken } from "./PatternToken";
import { TokenNode } from "./TokenNode";


export class GraphToken implements TokenNode {
	readonly token:"graph" = "graph";

	readonly graph:VariableOrIRI;
	readonly groupPattern:GroupPatternToken;

	constructor( graph:VariableOrIRI ) {
		this.graph = graph;
		this.groupPattern = new GroupPatternToken();
	}


	addPattern( ...pattern:PatternToken[] ):this {
		this.groupPattern.patterns.push( ...pattern );
		return this;
	}


	toString():string {
		return `GRAPH ${ this.graph } ${ this.groupPattern }`;
	}
}
