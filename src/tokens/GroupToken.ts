import { AssigmentToken } from "./AssigmentToken";
import { BracketedExpressionToken } from "./BracketedExpressionToken";
import { FunctionToken } from "./FunctionToken";
import { TokenNode } from "./TokenNode";
import { VariableToken } from "./VariableToken";


/**
 * The token of the `GROUP BY` statement.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rGroupClause}
 */
export class GroupToken implements TokenNode {
	readonly token:"group" = "group";

	readonly conditions:(FunctionToken | BracketedExpressionToken | AssigmentToken | VariableToken)[];

	constructor( conditions:(FunctionToken | BracketedExpressionToken | AssigmentToken | VariableToken)[] ) {
		this.conditions = conditions;
	}


	toString( spaces?:number ):string {
		const conditionsStr = this.conditions
			.map( _ => _.toString( spaces ) )
			.join( " " );

		return `GROUP BY ${ conditionsStr }`;
	}
}
