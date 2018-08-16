import { SharedSelectToken } from "./SharedSelectToken";
import { FromToken } from "./FromToken";
import { getSeparator } from "./printing";


/**
 * The token of the `SELECT` query statement.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rSelectQuery}
 */
export class SelectToken extends SharedSelectToken {
	readonly token:"select" = "select";

	readonly dataset?:FromToken;

	constructor( modifier?:"DISTINCT" | "REDUCED", dataset?:FromToken ) {
		super( modifier );

		this.dataset = dataset;
	}


	toString( spaces?:number ):string {
		let query:string = super.toString( spaces );
		const separator:string = getSeparator( spaces );

		if( this.dataset ) query += separator + this.dataset;

		query += separator + this.where.toString( spaces );

		if( this.modifiers.length ) query += separator + this.modifiers.join( separator );

		return query;
	}
}
