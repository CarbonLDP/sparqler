import { _getBaseTransformer, _transformNatives } from "../../core/transformers";
import { Expression } from "../../expressions/Expression";

import { SupportedNativeTypes } from "../../SupportedNativeTypes";

import { BracketedExpressionToken } from "../../tokens/BracketedExpressionToken";
import { ConstraintToken } from "../../tokens/ConstraintToken";
import { ExpressionToken } from "../../tokens/ExpressionToken";


const __preConditionTransformer = _getBaseTransformer<"getExpression", Expression>
	( "getExpression" )
	( _transformNatives )
;

export const _conditionTransformer = ( value:SupportedNativeTypes | Expression | ExpressionToken ):ConstraintToken => {
	const preToken = __preConditionTransformer( value );

	if( preToken.token === "bracketedExpression" || preToken.token === "function" )
		return preToken;

	return new BracketedExpressionToken( preToken );
};
