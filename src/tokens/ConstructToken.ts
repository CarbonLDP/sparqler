import { CommonQueryClauseToken } from "./CommonQueryClauseToken";
import { getSeparator, getTokenContainerString } from "./printing";
import { TripleToken } from "./TripleToken";


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


	// TODO: Implement pretty print
	toString( spaces?:number ):string {
		const triples:string = getTokenContainerString( {
			spaces,
			tags: { open: "{", close: "}" },
			tokensSeparator: ".",
			tokens: this.triples,
		} );

		const separator:string = getSeparator( spaces );
		let query:string = `CONSTRUCT ` +
			triples + separator +
			this.where.toString( spaces );

		if( this.modifiers.length ) query += separator + this.modifiers.join( separator );

		return query;
	}
}
