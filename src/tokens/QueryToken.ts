import { BaseToken } from "sparqler/tokens/BaseToken";
import { ConstructToken } from "sparqler/tokens/ConstructToken";
import { PrefixToken } from "sparqler/tokens/PrefixToken";
import { TokenNode } from "sparqler/tokens/TokenNode";
import { ValuesToken } from "sparqler/tokens/ValuesToken";

export class QueryToken implements TokenNode {
	readonly token:"query" = "query";
	readonly prologues:( BaseToken | PrefixToken )[];
	readonly query:ConstructToken;
	readonly values?:ValuesToken;

	constructor( query:ConstructToken, values?:ValuesToken ) {
		this.prologues = [];
		this.query = query;
		this.values = values;
	}

	addPrologues( ...prologues:( BaseToken | PrefixToken )[] ):this {
		this.prologues.push( ...prologues );
		return this;
	}

	toString():string {
		let query:string = this.prologues.join( " " );
		if( this.prologues.length ) query += " ";

		query += this.query;

		if( this.values ) query += ` ${ this.values }`;

		return query;
	}
}
