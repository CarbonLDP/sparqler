import { AssigmentToken } from "./AssigmentToken";
import { SharedQueryClauseToken } from "./SharedQueryClauseToken";
import { VariableToken } from "./VariableToken";


/**
 * Abstract class of the shared data of SELECT and SUB-SELECT
 * statements.
 */
export abstract class SharedSelectToken extends SharedQueryClauseToken {
	abstract readonly token:string;

	readonly modifier?:"DISTINCT" | "REDUCED";
	readonly projections:(VariableToken | AssigmentToken)[];

	protected constructor( modifier?:"DISTINCT" | "REDUCED" ) {
		super();

		this.modifier = modifier;
		this.projections = [];
	}


	addProjection( ...projections:(VariableToken | AssigmentToken)[] ):this {
		this.projections.push( ...projections );
		return this;
	}


	toString( spaces?:number ):string {
		let query:string = `SELECT`;

		if( this.modifier ) query += ` ${ this.modifier }`;

		if( this.projections.length ) {
			query += " " + this.projections
				.map( _ => _.toString( spaces ) )
				.join( " " )
		} else {
			query += " *";
		}

		return query;
	}
}
