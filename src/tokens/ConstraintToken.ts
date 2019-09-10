import { BracketedExpressionToken } from "./BracketedExpressionToken";
import { FunctionToken } from "./FunctionToken";


/**
 * Alias that represents a constraint.
 * @see https://www.w3.org/TR/sparql11-query/#rConstraint
 */
export type ConstraintToken = BracketedExpressionToken | FunctionToken;
