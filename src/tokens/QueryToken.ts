import { BaseToken } from "./BaseToken";
import { ConstructToken } from "./ConstructToken";
import { PrefixToken } from "./PrefixToken";
import { TokenNode } from "./TokenNode";
import { ValuesToken } from "./ValuesToken";

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
