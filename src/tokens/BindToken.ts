import { TokenNode } from "./TokenNode";
import { VariableToken } from "./VariableToken";


/**
 * The token of the `BIND` statement.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rBind
 */
export class BindToken implements TokenNode {
	readonly token:"bind" = "bind";

	readonly expression:string;
	readonly variable:VariableToken;

	constructor( expression:string, variable:VariableToken ) {
		this.expression = expression;
		this.variable = variable;
	}


	toString( spaces?:number ):string {
		return `BIND(${ this.expression } AS ${ this.variable })`;
	}
}
