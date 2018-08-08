import { TokenNode } from "./TokenNode";
import { VariableToken } from "./VariableToken";


/**
 * @todo
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
