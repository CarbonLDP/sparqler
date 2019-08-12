import { FromToken } from "./FromToken";
import { getSeparator } from "./printing";
import { SharedQueryClauseToken } from "./SharedQueryClauseToken";


/**
 * The token of the `ASK` query statement.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rAskQuery
 */
export class AskToken extends SharedQueryClauseToken {
	readonly token:"ask" = "ask";

	readonly datasets:FromToken[];

	constructor() {
		super();

		this.datasets = [];
	}


	toString( spaces?:number ):string {
		let query:string = "ASK";
		const separator:string = getSeparator( spaces );

		if( this.datasets.length ) query += separator + this.datasets.join( separator );

		query += separator + this.where.toString( spaces );

		if( this.modifiers.length ) query += separator + this.modifiers.join( separator );

		return query;
	}
}
