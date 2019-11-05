import { Container } from "../../../core/containers/Container";
import { isAbsolute } from "../../../core/iri/utils";
import { _getBaseTransformer, _transformNatives } from "../../../core/transformers";

import { IRIToken } from "../../../tokens/IRIToken";
import { LiteralToken } from "../../../tokens/LiteralToken";
import { RDFLiteralToken } from "../../../tokens/RDFLiteralToken";

import { SupportedNativeTypes } from "../../SupportedNativeTypes";

import { TripleSubject } from "../../triplePatterns/TripleSubject";


export const _valuesTransformerFn = ( container:Container<any> ) => _getBaseTransformer<"getSubject", TripleSubject<IRIToken | RDFLiteralToken | LiteralToken>>
	( "getSubject" )
	( ( value:SupportedNativeTypes ) =>
		value === "UNDEF"
			? value
			: value === "string" && isAbsolute( value )
				? container.iriResolver.resolve( value )
				: _transformNatives( value )
	)
;
