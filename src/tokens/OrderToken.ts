import { TokenNode } from "./TokenNode";
import { VariableToken } from "./VariableToken";


/**
 * The token of the `GROUP BY` statement.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rGroupClause
 */
export class OrderToken implements TokenNode {
	readonly token:"order" = "order";
	readonly condition:VariableToken | string;
	readonly flow?:string;

	constructor( condition:VariableToken | string, flow?:"ASC" | "DESC" ) {
		this.condition = condition;
		if( flow ) this.flow = flow;
	}

	toString( spaces?:number ):string {
		return "ORDER BY " + (this.flow ?
			`${ this.flow }( ${ this.condition } )` :
			`${ this.condition }`);
	}
}
