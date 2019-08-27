import { _getBaseTransformer, _transformNatives, Transformer } from "../../core/transformers";
import { Expression } from "../../expressions/Expression";

import { SupportedNativeTypes } from "../../SupportedNativeTypes";

import { BracketedExpressionToken } from "../../tokens/BracketedExpressionToken";
import { ExpressionToken } from "../../tokens/ExpressionToken";
import { FunctionToken } from "../../tokens/FunctionToken";


const __preConditionTransformer = _getBaseTransformer<"getExpression", Expression>
	( "getExpression" )
	( _transformNatives )
;

export const _conditionTransformer:Transformer<SupportedNativeTypes | Expression | ExpressionToken, FunctionToken | BracketedExpressionToken> = value => {
	const preToken = __preConditionTransformer( value );

	if( preToken.token === "bracketedExpression" || preToken.token === "function" )
		return preToken;

	return new BracketedExpressionToken( preToken );
};
