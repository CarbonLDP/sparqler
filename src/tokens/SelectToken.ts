import { CommonSelectToken } from "./CommonSelectToken";
import { FromToken } from "./FromToken";


export class SelectToken extends CommonSelectToken {
	readonly token:"select" = "select";

	readonly dataset?:FromToken;

	constructor( modifier?:"DISTINCT" | "REDUCED", dataset?:FromToken ) {
		super( modifier );

		this.dataset = dataset;
	}


	toString():string {
		let query:string = super.toString();

		if( this.dataset ) query += ` ${ this.dataset }`;

		query += ` ${ this.where }`;

		if( this.modifiers.length ) query += ` ${ this.modifiers.join( " " ) }`;

		return query;
	}
}
