import {
	PatternToken,
	SolutionModifier,
} from "./";
import { TokenNode } from "./TokenNode";
import { joinPatterns } from "./utils";
import { VariableToken } from "./VariableToken";

export class SelectToken implements TokenNode {
	readonly token:"select" = "select";
	readonly variables:VariableToken[];
	readonly patterns:PatternToken[];
	readonly modifiers:SolutionModifier[];

	constructor() {
		this.variables = [];
		this.patterns = [];
		this.modifiers = [];
	}

	addVariable( ...variables:VariableToken[] ):this {
		this.variables.push( ...variables );
		return this;
	}

	addPattern( ...patterns:PatternToken[] ):this {
		this.patterns.push( ...patterns );
		return this;
	}

	addModifier( ...modifier:SolutionModifier[] ):this {
		this.modifiers.push( ...modifier );
		return this;
	}

	toString():string {
		let query:string = `SELECT ${ this.variables.join( " " ) } WHERE { ${ joinPatterns( this.patterns ) } }`;
		if( this.modifiers.length ) query += ` ${ this.modifiers.join( " " ) }`;

		return query;
	}
}
