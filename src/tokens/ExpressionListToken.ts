import { ExpressionToken } from "./ExpressionToken";
import { TokenNode } from "./TokenNode";


const DISTINCT = "DISTINCT " as const;
const SEPARATOR = "; SEPARATOR=" as const;


/**
 * Token that represents the expression list in a build-in function and
 * the argument list in a custom function.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rExpressionList}
 * @see {@link https://www.w3.org/TR/sparql11-query/#rArgList}
 */
export class ExpressionListToken implements TokenNode {
	readonly token:"expressionList" = "expressionList";

	readonly expressions?:ExpressionToken[];
	readonly distinct:boolean;
	readonly separator?:string;

	constructor( expressions?:ExpressionToken[], distinct:boolean = false, separator?:string ) {
		this.expressions = expressions;
		this.distinct = distinct;
		this.separator = separator;
	}

	toString( spaces?:number ):string {
		if( this.expressions && !this.expressions.length ) return "()";

		const separator = spaces !== undefined
			? " " : "";

		let tokenStr:string = "(" + separator;

		if( this.distinct ) {
			tokenStr += DISTINCT;
		}

		if( this.expressions ) {
			tokenStr += this.expressions
				.map( _ => _.toString( spaces ) )
				.join( "," + separator );
		} else {
			tokenStr += "*";
		}

		if( this.separator ) {
			tokenStr += SEPARATOR +
				JSON.stringify( this.separator );
		}

		return tokenStr + separator + ")";
	}
}
