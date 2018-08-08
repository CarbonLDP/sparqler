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

		let query:string = this.prologues
			.map( prologue => {
				// TODO: Remove new line separator when resolved https://community.stardog.com/t/error-with-inline-sparql-base/1200
				if( prologue.token === "base" )
					return prologue + "\n";
				return prologue + separator;
			} )
			.join( "" );

		if( this.queryClause ) query += this.queryClause.toString( spaces );

		if( this.values ) query += separator + this.values.toString( spaces );

		return query;
	}
}
