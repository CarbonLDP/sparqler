import { CommonSelectToken } from "./CommonSelectToken";
import { ValuesToken } from "./ValuesToken";


export class SubSelectToken extends CommonSelectToken {
	readonly token:"subSelect" = "subSelect";

	readonly values?:ValuesToken;

	constructor( modifier?:"DISTINCT" | "REDUCED", values?:ValuesToken ) {
		super( modifier );

		this.values = values;
	}


	toString():string {
		let query:string = super.toString();

		query += ` ${ this.where }`;

		if( this.modifiers.length ) query += ` ${ this.modifiers.join( " " ) }`;
		if( this.values ) query += ` ${ this.values }`;

		return `{ ${ query } }`;
	}
}
