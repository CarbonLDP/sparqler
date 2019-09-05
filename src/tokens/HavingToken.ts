import { ConstraintToken } from "./ConstraintToken";
import { TokenNode } from "./TokenNode";


/**
 * The token of the `HAVING` statement.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rHavingClause}
 */
export class HavingToken implements TokenNode {
	readonly token:"having" = "having";

	readonly conditions:ConstraintToken[];

	constructor( conditions:ConstraintToken[] ) {
		this.conditions = conditions;
	}


	toString( spaces?:number ):string {
		const conditionsStr = this.conditions
			.map( _ => _.toString( spaces ) )
			.join( " " );

		return `HAVING ${ conditionsStr }`;
	}
}
