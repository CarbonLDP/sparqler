import { TokenNode } from "./TokenNode";
import { VariableToken } from "./VariableToken";

export class OrderToken implements TokenNode {
	readonly token:"order" = "order";
	readonly condition:VariableToken | string;
	readonly flow?:string;

	constructor( condition:VariableToken | string, flow?:"ASC" | "DESC" ) {
		this.condition = condition;
		if( flow ) this.flow = flow;
	}

	toString():string {
		return "ORDER BY " + ( this.flow ?
			`${ this.flow }( ${ this.condition } )` :
			`${ this.condition }` );
	}
}
