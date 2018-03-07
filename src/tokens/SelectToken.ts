import {
	PatternToken,
	SolutionModifier,
} from "sparqler/tokens";
import { TokenNode } from "sparqler/tokens/TokenNode";
import { VariableToken } from "sparqler/tokens/VariableToken";
import { joinPatterns } from "sparqler/tokens/utils";

export class SelectToken implements TokenNode {
	readonly token:"select" = "select";
	readonly modifier?:"DISTINCT" | "REDUCED";
	readonly variables:VariableToken[];
	readonly patterns:PatternToken[];
	readonly modifiers:SolutionModifier[];

	constructor( modifier?:"DISTINCT" | "REDUCED" ) {
		this.modifier = modifier;

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
