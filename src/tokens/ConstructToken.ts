import { SharedQueryClauseToken } from "./SharedQueryClauseToken";
import { getSeparator, getTokenContainerString } from "./printing";
import { TripleToken } from "./TripleToken";


/**
 * The token of the `CONSTRUCT` query statement.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rConstructQuery}
 */
export class ConstructToken extends SharedQueryClauseToken {
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
