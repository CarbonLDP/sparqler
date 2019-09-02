import { BinaryOperationToken } from "./BinaryOperationToken";
import { ValueLogicalToken } from "./ValueLogicalToken";


/**
 * Token that represents the conditional AND operations for expressions.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rConditionalAndExpression
 */
export class ConditionalAndOperationToken extends BinaryOperationToken<"&&", ValueLogicalToken> {
	readonly token:"conditionalAndOperation" = "conditionalAndOperation";
}
