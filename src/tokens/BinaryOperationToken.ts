import { ExpressionToken } from "./ExpressionToken";
import { TokenNode } from "./TokenNode";


/**
 * Token that represents the binary operations for expressions.
 */
export abstract class BinaryOperationToken<T extends ExpressionToken, O extends string> implements TokenNode {
	abstract readonly token:string;

	readonly expression:T;

	readonly operations:O[];
	readonly expressions:T[];

	constructor( expression:T ) {
		this.expression = expression;

		this.operations = [];
		this.expressions = [];
	}


	addOperation( expression:T, operation:O ):this {
		this.expressions.push( expression );
		this.operations.push( operation );

		return this;
	}

	toString( spaces?:number ):string {
		const separator = spaces !== undefined
			? " " : "";

		let strToken = this.expression.toString( spaces );

		for( let index = 0, length = this.expressions.length; index < length; ++index ) {
			strToken += separator +
				this.operations[ index ] + separator +
				this.expressions[ index ].toString( spaces )
		}

		return strToken;
	}
}
