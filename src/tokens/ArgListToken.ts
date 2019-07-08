import { ExpressionToken } from "./ExpressionToken";
import { TokenNode } from "./TokenNode";

const DISTINCT = "DISTINCT" as const;

export class ArgListToken implements TokenNode {
	readonly token:"argList" = "argList";

	readonly expressions:ExpressionToken[];
	readonly distinct:boolean;

	constructor( expressions:ExpressionToken[], distinct:boolean = false ) {
		this.expressions = expressions;
		this.distinct = distinct;
	}

	toString( spaces?:number ):string {
		const separator = spaces !== undefined
			? " " : "";

		let tokenStr:string = "(" + separator;

		if( this.distinct )
			tokenStr += DISTINCT;

		tokenStr += this.expressions
			.join( "," + separator );

		return tokenStr + separator + ")";
	}
}
