import { FromToken } from "./FromToken";
import { getSeparator } from "./printing";
import { SharedSelectToken } from "./SharedSelectToken";


/**
 * The token of the `SELECT` query statement.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rSelectQuery
 */
export class SelectToken extends SharedSelectToken {
	readonly token:"select" = "select";

	readonly datasets:FromToken[];

	constructor( modifier?:"DISTINCT" | "REDUCED" ) {
		super( modifier );

		this.datasets = [];
	}


	toString( spaces?:number ):string {
		let query:string = super.toString( spaces );
		const separator:string = getSeparator( spaces );

		if( this.datasets.length ) query += separator + this.datasets.join( separator );

		query += separator + this.where.toString( spaces );

		if( this.modifiers.length ) query += separator + this.modifiers.join( separator );

		return query;
	}
}
