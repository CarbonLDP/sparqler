import { ConstraintToken } from "./ConstraintToken";
import { ExplicitOrderConditionToken } from "./ExplicitOrderConditionToken";
import { TokenNode } from "./TokenNode";
import { VariableToken } from "./VariableToken";


/**
 * The token of the `GROUP BY` statement.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rGroupClause}
 */
export class OrderToken implements TokenNode {
	readonly token:"order" = "order";

	readonly conditions:(ExplicitOrderConditionToken | ConstraintToken | VariableToken)[];

	constructor( conditions:(ExplicitOrderConditionToken | ConstraintToken | VariableToken)[] ) {
		this.conditions = conditions;
	}

	toString( spaces?:number ):string {
		const conditionsStr = this.conditions
			.map( _ => _.toString( spaces ) )
			.join( " " );

		return `ORDER BY ${ conditionsStr }`;
	}
}
