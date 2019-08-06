import { ExpressionToken } from "./ExpressionToken";
import { TokenNode } from "./TokenNode";


const DISTINCT = "DISTINCT " as const;

/**
 * Token that represents the expression list in a build-in function and
 * the argument list in a custom function.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rExpressionList}
 * @see {@link https://www.w3.org/TR/sparql11-query/#rArgList}
 */
export class ExpressionListToken implements TokenNode {
	readonly token:"expressionList" = "expressionList";

	readonly expressions:ExpressionToken[];
	readonly distinct:boolean;

	constructor( expressions:ExpressionToken[], distinct:boolean = false ) {
		this.expressions = expressions;
		this.distinct = distinct;
	}

	toString( spaces?:number ):string {
		if( !this.expressions.length ) return "()";

		const separator = spaces !== undefined
			? " " : "";

		let tokenStr:string = "(" + separator;

		if( this.distinct )
			tokenStr += DISTINCT;

		tokenStr += this.expressions
			.map( _ => _.toString( spaces ) )
			.join( "," + separator );

		return tokenStr + separator + ")";
	}
}
