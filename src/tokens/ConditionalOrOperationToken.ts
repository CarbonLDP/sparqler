import { BinaryOperationToken } from "./BinaryOperationToken";
import { ConditionalAndExpressionToken } from "./ConditionalAndExpressionToken";
import { ValueLogicalToken } from "./ValueLogicalToken";


/**
 * Token that represents the conditional OR operations for expressions.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rConditionalOrExpression}
 */
export class ConditionalOrOperationToken extends BinaryOperationToken<"||", ConditionalAndExpressionToken> {
	readonly token:"conditionalOrOperation" = "conditionalOrOperation";
}
