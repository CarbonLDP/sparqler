import { SupportedNativeTypes } from "../../SupportedNativeTypes";

import { ExpressionToken } from "../../tokens/ExpressionToken";

import { _getTransformer } from "../../utils/transformers";

import { Expression } from "../Expression";


export type SupportedTypes = Expression | SupportedNativeTypes | ExpressionToken;


export const _expressionTransformerFn =
	_getTransformer<"getExpression", Expression>( "getExpression" );
