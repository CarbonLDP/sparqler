import { AssigmentToken } from "./AssigmentToken";
import { ConstraintToken } from "./ConstraintToken";
import { TokenNode } from "./TokenNode";
import { VariableToken } from "./VariableToken";


/**
 * The token of the `GROUP BY` statement.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rGroupClause}
 */
export class GroupToken implements TokenNode {
	readonly token:"group" = "group";

	readonly conditions:(ConstraintToken | AssigmentToken | VariableToken)[];

	constructor( conditions:(ConstraintToken | AssigmentToken | VariableToken)[] ) {
		this.conditions = conditions;
	}


	toString( spaces?:number ):string {
		const conditionsStr = this.conditions
			.map( _ => _.toString( spaces ) )
			.join( " " );

		return `GROUP BY ${ conditionsStr }`;
	}
}
