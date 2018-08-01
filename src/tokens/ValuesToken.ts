import { IRIToken } from "./IRIToken";
import { LiteralToken } from "./LiteralToken";
import { PrefixedNameToken } from "./PrefixedNameToken";
import { TokenNode } from "./TokenNode";
import { VariableToken } from "./VariableToken";


export class ValuesToken implements TokenNode {
	readonly token:"values" = "values";

	readonly variables:VariableToken[];
	readonly values:(IRIToken | PrefixedNameToken | LiteralToken | "UNDEF")[][];

	constructor() {
		this.variables = [];
		this.values = [];
	}


	addValues( variable:VariableToken, ...values:(IRIToken | PrefixedNameToken | LiteralToken | "UNDEF")[] ):this {
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
