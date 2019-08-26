import { Container } from "../../../core/containers/Container";
import { isAbsolute, isBNodeLabel } from "../../../core/iri/utils";
import { _getBaseTransformer, _transformNatives } from "../../../core/transformers";

import { SupportedNativeTypes } from "../../../SupportedNativeTypes";

import { BlankNodeToken } from "../../../tokens/BlankNodeToken";
import { ObjectToken } from "../../../tokens/ObjectToken";

import { TripleSubject } from "../TripleSubject";


export const _subjectTransformerFn = ( container:Container<any> ) => _getBaseTransformer<"getSubject", TripleSubject<ObjectToken>>
	( "getSubject" )
	( ( value:SupportedNativeTypes ) =>
		typeof value === "string" && isAbsolute( value )
			? isBNodeLabel( value )
				? new BlankNodeToken( value )
				: container.iriResolver.resolve( value )
			: _transformNatives( value )
	)
;