import { BracketedExpressionToken } from "./BracketedExpressionToken";
import { TokenNode } from "./TokenNode";


/**
 * Token of the order condition with an specific flow.
 * @see https://www.w3.org/TR/sparql11-query/#rOrderCondition
 */
export class ExplicitOrderConditionToken implements TokenNode {
	readonly token:"explicitOrderCondition" = "explicitOrderCondition";

	readonly flow:"ASC" | "DESC";
	readonly condition:BracketedExpressionToken;

	constructor( flow:"ASC" | "DESC", condition:BracketedExpressionToken ) {
		this.flow = flow;
		this.condition = condition;
	}


	toString( spaces?:number ):string {
		return this.flow + " " + this.condition.toString( spaces );
	}

}
