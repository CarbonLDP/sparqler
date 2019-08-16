import { ExpressionToken } from "../../../tokens/ExpressionToken";
import { SupportedNativeTypes } from "../../SupportedNativeTypes";
import { _getTransformer } from "../../utils";
import { Expression } from "../Expression";


export type SupportedTypes = Expression | SupportedNativeTypes | ExpressionToken;


export const _expressionTransformerFn =
	_getTransformer<Expression>( "getExpression" );
