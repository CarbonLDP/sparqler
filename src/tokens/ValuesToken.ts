import { IRIToken } from "sparqler/tokens/IRIToken";
import { LiteralToken } from "sparqler/tokens/LiteralToken";
import { PrefixedNameToken } from "sparqler/tokens/PrefixedNameToken";
import { TokenNode } from "sparqler/tokens/TokenNode";
import { VariableToken } from "sparqler/tokens/VariableToken";

export class ValuesToken implements TokenNode {
	readonly token:"values" = "values";
	readonly variables:VariableToken[];
	readonly values:( IRIToken | PrefixedNameToken | LiteralToken | "UNDEF" )[][];

	constructor() {
		this.variables = [];
		this.values = [];
	}

	addValues( variable:VariableToken, ...values:( IRIToken | PrefixedNameToken | LiteralToken | "UNDEF" )[] ):this {
		this.variables.push( variable );
		this.values.push( values );

		return this;
	}

	toString():string {
		const variables:string = this.variables.length ? this.variables.length === 1 ? this.variables.join( " " ) :
			`( ${ this.variables.join( " " ) } )` : "()";

		const values:any[] = this.variables.length ? this.variables.length === 1 ? this.values[ 0 ] :
			this.values.map( varValues => `( ${ varValues.join( " " ) } )` ) : [ "()" ];

		return `VALUES ${ variables } { ${ values.join( " " ) } }`;
	}
}
