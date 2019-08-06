import { FunctionToken } from "./FunctionToken";
import { IRIToken } from "./IRIToken";
import { LiteralToken } from "./LiteralToken";
import { RDFLiteralToken } from "./RDFLiteralToken";
import { VariableToken } from "./VariableToken";


// TODO: Add `BracketedExpression`
/**
 * Alias with the tokens that comprehends all the kinds of primary expressions.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rPrimaryExpression}
 */
export type PrimaryExpressionToken = FunctionToken | VariableToken | IRIToken | RDFLiteralToken | LiteralToken;
