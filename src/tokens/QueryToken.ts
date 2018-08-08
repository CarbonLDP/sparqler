import { BaseToken } from "./BaseToken";
import { PrefixToken } from "./PrefixToken";
import { getSeparator } from "./printing";
import { QueryClauseToken } from "./QueryClauseToken";
import { TokenNode } from "./TokenNode";
import { ValuesToken } from "./ValuesToken";


export class QueryToken<T extends QueryClauseToken | undefined = QueryClauseToken | undefined> implements TokenNode {
	readonly token:"query" = "query";

	readonly prologues:(BaseToken | PrefixToken)[];
	readonly queryClause:T;
	readonly values?:ValuesToken;

	constructor( query:T, values?:ValuesToken ) {
		this.prologues = [];
		this.queryClause = query;
		this.values = values;
	}


	addPrologues( ...prologues:(BaseToken | PrefixToken)[] ):this {
		this.prologues.push( ...prologues );
		return this;
	}


	toString( spaces?:number ):string {
		const separator:string = getSeparator( spaces );

		let query:string = this.prologues.join( separator );
		if( this.prologues.length ) query += separator;

		query += this.queryClause.toString( spaces );

		if( this.values ) query += separator + this.values.toString( spaces );

		return query;
	}
}
