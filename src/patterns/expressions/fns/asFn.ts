import { Container } from "../../../core/containers/Container";
import { cloneElement } from "../../../core/containers/utils";

import { AssigmentToken } from "../../../tokens/AssigmentToken";
import { ExpressionToken } from "../../../tokens/ExpressionToken";
import { VariableToken } from "../../../tokens/VariableToken";

import { Variable } from "../../triplePatterns/Variable";

import { Projectable } from "../Projectable";


export function getAsFn(
	container:Container<ExpressionToken>,
) {
	return ( variable:string | Variable | VariableToken ) => {
		if( typeof variable === "string" )
			variable = new VariableToken( variable );
		else if( "_getSubject" in variable ) {
			variable = variable._getSubject();
		}

		const targetToken = new AssigmentToken( container.targetToken, variable );
		const newContainer:Container<AssigmentToken> = cloneElement( container, { targetToken } );

		return Projectable.createFrom( newContainer, {} );
	}
}
