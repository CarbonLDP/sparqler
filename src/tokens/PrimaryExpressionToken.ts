import { FunctionToken } from "./FunctionToken";
import { VariableOrTermToken } from "./VariableOrTermToken";

// TODO: Add `BrackettedExpression`
export type PrimaryExpressionToken = FunctionToken | VariableOrTermToken;
