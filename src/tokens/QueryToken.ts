import { BaseToken } from "./BaseToken";
import { PrefixToken } from "./PrefixToken";
import { QueryClauseToken } from "./QueryClauseToken";
import { TokenNode } from "./TokenNode";
import { ValuesToken } from "./ValuesToken";


export class QueryToken implements TokenNode {
	readonly token:"query" = "query";

	readonly prologues:(BaseToken | PrefixToken)[];
	readonly queryClause:QueryClauseToken;
	readonly values?:ValuesToken;

	constructor( query:QueryClauseToken, values?:ValuesToken ) {
		this.prologues = [];
		this.queryClause = query;
		this.values = values;
	}


	addPrologues( ...prologues:(BaseToken | PrefixToken)[] ):this {
		this.prologues.push( ...prologues );
		return this;
	}


	toString():string {
		let query:string = this.prologues.join( " " );
		if( this.prologues.length ) query += " ";

		query += this.queryClause;

		if( this.values ) query += ` ${ this.values }`;

		return query;
	}
}
