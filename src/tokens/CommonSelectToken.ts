import { CommonQueryClauseToken } from "./CommonQueryClauseToken";
import { VariableToken } from "./VariableToken";


export abstract class CommonSelectToken extends CommonQueryClauseToken {
	abstract readonly token:string;

	readonly modifier?:"DISTINCT" | "REDUCED";
	readonly variables:VariableToken[];

	protected constructor( modifier?:"DISTINCT" | "REDUCED" ) {
		super();

		this.modifier = modifier;
		this.variables = [];
	}


	addVariable( ...variables:VariableToken[] ):this {
		this.variables.push( ...variables );
		return this;
	}


	toString( spaces?:number ):string {
		let query:string = `SELECT`;

		if( this.modifier ) query += ` ${ this.modifier }`;

		query += this.variables.length ?
			` ${ this.variables.join( " " ) }` :
			" *";

		return query;
	}
}
