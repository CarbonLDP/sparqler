import { BinaryOperationToken } from "./BinaryOperationToken";
import { ValueLogicalToken } from "./ValueLogicalToken";


/**
 * Token that represents the conditional OR operations for expressions.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rConditionalOrExpression}
 */
export class ConditionalOrOperationToken extends BinaryOperationToken<ValueLogicalToken, "||"> {
	readonly token:"conditionalOrOperation" = "conditionalOrOperation";

	addOperation( expression:ValueLogicalToken ):this {
		return super.addOperation( expression, "||" );
	}
}
