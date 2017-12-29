import {
	PatternToken,
	VariableOrIRI,
} from "sparqler/tokens";
import { TokenNode } from "sparqler/tokens/TokenNode";
import { joinPatterns } from "sparqler/tokens/utils";

export class GraphToken implements TokenNode {
	readonly token:"graph" = "graph";
	readonly graph:VariableOrIRI;
	readonly patterns:PatternToken[];

	constructor( graph:VariableOrIRI ) {
		this.graph = graph;
		this.patterns = [];
	}

	addPattern( ...pattern:PatternToken[] ):this {
		this.patterns.push( ...pattern );
		return this;
	}

	toString():string {
		return `GRAPH ${ this.graph } { ${ joinPatterns( this.patterns ) } }`;
	}
}
