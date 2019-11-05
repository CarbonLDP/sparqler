import { _getBaseTransformer } from "../core/transformers";

import { Projectable } from "../patterns/expressions/Projectable";

import { VariableToken } from "../tokens/VariableToken";


export const _assigmentTransformer = _getBaseTransformer<"getProjection", Projectable>
	( "getProjection" )
	( value => {
		if( typeof value !== "string" ) throw new Error( "Invalid argument" );
		return new VariableToken( value )
	} )
;

