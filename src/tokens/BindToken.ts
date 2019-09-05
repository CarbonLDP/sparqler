import { AssigmentToken } from "./AssigmentToken";
import { TokenNode } from "./TokenNode";
import { VariableToken } from "./VariableToken";


/**
 * The token of the `BIND` statement.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rBind}
 */
export class BindToken implements TokenNode {
	readonly token:"bind" = "bind";

	readonly assigment:AssigmentToken;

	constructor( assigment:AssigmentToken ) {
		this.assigment = assigment;
	}


	toString( spaces?:number ):string {
		return `BIND${ this.assigment.toString( spaces ) }`;
	}
}
