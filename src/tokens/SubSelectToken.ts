import { CommonSelectToken } from "./CommonSelectToken";
import { addSpaces, getIndentation, getSeparator, INDENTATION_SPACES } from "./printing";
import { ValuesToken } from "./ValuesToken";


export class SubSelectToken extends CommonSelectToken {
	readonly token:"subSelect" = "subSelect";

	readonly values?:ValuesToken;

	constructor( modifier?:"DISTINCT" | "REDUCED", values?:ValuesToken ) {
		super( modifier );

		this.values = values;
	}


	toString( spaces?:number ):string {
		const subSpaces:number | undefined = addSpaces( spaces, INDENTATION_SPACES );
		const subIndent:string = getIndentation( subSpaces );
		const separator:string = getSeparator( spaces );

		let query:string = super.toString( spaces ) + separator +
			subIndent + this.where.toString( subSpaces );

		if( this.modifiers.length ) query += separator + this.modifiers
			.map( x => subIndent + x )
			.join( separator );

		if( this.values ) query += separator + subIndent + this.values;

		const indent:string = getIndentation( spaces );
		return "{" + separator + subIndent +
			query + separator +
			indent + "}";
	}
}
