import { ExpressionToken } from "./ExpressionToken";
import { TokenNode } from "./TokenNode";


/**
 * Token that represents the binary operations for expressions.
 */
export abstract class BinaryOperationToken<T extends string, W extends ExpressionToken> implements TokenNode {
	abstract readonly token:string;

	readonly operator:T;
	readonly operands:W[];

	constructor( operator:T, operand:W ) {
		this.operator = operator;
		this.operands = [ operand ];
	}


	addOperand( operand:W ):this {
		this.operands.push( operand );
		return this;
	}

	toString( spaces?:number ):string {
		const separator = spaces !== undefined
			? " " : "";

		let strToken = this.operands[ 0 ].toString( spaces );

		for( let index = 1, length = this.operands.length; index < length; ++index ) {
			strToken += separator + this.operator + separator +
				this.operands[ index ].toString( spaces )
		}

		return strToken;
	}
}
