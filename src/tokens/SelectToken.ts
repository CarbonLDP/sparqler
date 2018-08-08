import { CommonSelectToken } from "./CommonSelectToken";
import { FromToken } from "./FromToken";
import { getSeparator } from "./printing";


export class SelectToken extends CommonSelectToken {
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
