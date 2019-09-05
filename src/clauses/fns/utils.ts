import { Container } from "../../core/containers/Container";

import { Expression } from "../../patterns/expressions/Expression";
import { _expressionTransformerFn } from "../../patterns/expressions/fns/utils";

import { SupportedNativeTypes } from "../../patterns/SupportedNativeTypes";

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
