import { VariableOrIRIToken } from "./VariableOrIRIToken";
import { GroupPatternToken } from "./GroupPatternToken";
import { PatternToken } from "./PatternToken";
import { TokenNode } from "./TokenNode";


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
