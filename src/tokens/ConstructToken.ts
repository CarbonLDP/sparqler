import {
	PatternToken,
	TripleToken,
} from "sparqler/tokens";
import { TokenNode } from "sparqler/tokens/TokenNode";

export class ConstructToken implements TokenNode {
	readonly token:"construct" = "construct";
	readonly triples:TripleToken[];
	readonly patterns:PatternToken[];

	constructor() {
		this.triples = [];
		this.patterns = [];
	}

	addTriple( ...triple:TripleToken[] ):this {
		this.triples.push( ...triple );
		return this;
	}

	addPattern( ...patterns:PatternToken[] ):this {
		this.patterns.push( ...patterns );
		return this;
	}

	toString():string {
		return `CONSTRUCT { ${ this.triples.join( ". " ) } } WHERE { ${ this.patterns.join( ". " ) } }`;
	}
}
