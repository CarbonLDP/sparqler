import { Container } from "../../../core/containers/Container";
import { isAbsolute } from "../../../core/iri/utils";
import { _getBaseTransformer, _transformNatives } from "../../../core/transformers";

import { ExpressionToken } from "../../../tokens/ExpressionToken";

import { SupportedNativeTypes } from "../../SupportedNativeTypes";

import { Expression } from "../Expression";


export type SupportedTypes = Expression | SupportedNativeTypes | ExpressionToken;


export const _expressionTransformerFn = ( container:Container<any> ) =>
	_getBaseTransformer<"_getExpression", Expression>
	( "_getExpression" )
	( ( value:SupportedNativeTypes ) =>
		typeof value === "string" && isAbsolute( value )
			? container.iriResolver.resolve( value )
			: _transformNatives( value )
	)
;
