import {
	PatternToken,
	SolutionModifier,
	TripleToken,
} from "sparqler/tokens";
import { TokenNode } from "sparqler/tokens/TokenNode";
import { joinPatterns } from "sparqler/tokens/utils";

export class ConstructToken implements TokenNode {
	readonly token:"construct" = "construct";
	readonly triples:TripleToken[];
	readonly patterns:PatternToken[];
	readonly modifiers:SolutionModifier[];

	constructor() {
		this.triples = [];
		this.patterns = [];
		this.modifiers = [];
	}

	addTriple( ...triple:TripleToken[] ):this {
		this.triples.push( ...triple );
		return this;
	}

	addPattern( ...patterns:PatternToken[] ):this {
		this.patterns.push( ...patterns );
		return this;
	}

	addModifier( ...modifiers:SolutionModifier[] ):this {
		this.modifiers.push( ...modifiers );
		return this;
	}

	toString():string {
		let query:string = `CONSTRUCT { ${ this.triples.join( ". " ) } } WHERE { ${ joinPatterns( this.patterns ) } }`;
		if( this.modifiers.length ) query += ` ${ this.modifiers.join( " " ) }`;

		return query;
	}
}
