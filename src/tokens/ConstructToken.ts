import { TripleToken } from "sparqler/tokens";
import { CommonQueryClauseToken } from "./CommonQueryClauseToken";


export class ConstructToken extends CommonQueryClauseToken {
	readonly token:"construct" = "construct";

	readonly triples:TripleToken[];

	constructor() {
		super();

		this.triples = [];
	}


	addTriple( ...triple:TripleToken[] ):this {
		this.triples.push( ...triple );
		return this;
	}


	toString():string {
		let query:string = `CONSTRUCT { ${ this.triples.join( ". " ) } } ${ this.where }`;

		if( this.modifiers.length ) query += ` ${ this.modifiers.join( " " ) }`;

		return query;
	}
}
