import { Container } from "../../core/containers/Container";

import { Expression } from "../../expressions/Expression";
import { _expressionTransformerFn } from "../../expressions/fns/utils";

import { SupportedNativeTypes } from "../../SupportedNativeTypes";

import { BracketedExpressionToken } from "../../tokens/BracketedExpressionToken";
import { ConstraintToken } from "../../tokens/ConstraintToken";
import { ExpressionToken } from "../../tokens/ExpressionToken";


export const _constraintTransformer = ( container:Container<any> ) =>
	( value:SupportedNativeTypes | Expression | ExpressionToken ):ConstraintToken => {
		const preToken = _expressionTransformerFn( container )( value );

		if( preToken.token === "bracketedExpression" || preToken.token === "function" )
			return preToken;

		return new BracketedExpressionToken( preToken );
	};
