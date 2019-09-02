import { BinaryOperationToken } from "./BinaryOperationToken";
import { ConditionalAndExpressionToken } from "./ConditionalAndExpressionToken";


/**
 * Token that represents the conditional OR operations for expressions.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rConditionalOrExpression
 */
export class ConditionalOrOperationToken extends BinaryOperationToken<"||", ConditionalAndExpressionToken> {
	readonly token:"conditionalOrOperation" = "conditionalOrOperation";
}
