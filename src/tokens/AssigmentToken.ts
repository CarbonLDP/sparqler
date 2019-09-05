import { ExpressionToken } from "./ExpressionToken";
import { TokenNode } from "./TokenNode";
import { VariableToken } from "./VariableToken";


/**
 * Token that encapsulates the assigment of a expression into a variable.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rSelectClause}
 * @see {@link https://www.w3.org/TR/sparql11-query/#rBind}
 * @see {@link https://www.w3.org/TR/sparql11-query/#rGroupCondition}
 */
export class AssigmentToken implements TokenNode {
	readonly token:"assigment" = "assigment";

	readonly expression:ExpressionToken;
	readonly variable:VariableToken;

	constructor( expression:ExpressionToken, variable:VariableToken ) {
		this.expression = expression;
		this.variable = variable;
	}

	toString( spaces?:number ):string {
		return `(${ this.expression.toString( spaces ) } AS ${ this.variable.toString( spaces ) })`;
	}
}
