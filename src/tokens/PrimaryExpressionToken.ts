import { FunctionToken } from "./FunctionToken";
import { IRIToken } from "./IRIToken";
import { LiteralToken } from "./LiteralToken";
import { RDFLiteralToken } from "./RDFLiteralToken";
import { VariableToken } from "./VariableToken";

// TODO: Add `BracketedExpression`
export type PrimaryExpressionToken = FunctionToken | VariableToken | IRIToken | RDFLiteralToken | LiteralToken;
