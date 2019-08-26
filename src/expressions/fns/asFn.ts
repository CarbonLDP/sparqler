import { Container } from "../../data/Container";
import { cloneElement } from "../../data/utils";

import { Variable } from "../../patterns/triplePatterns/Variable";

import { AssigmentToken } from "../../tokens/AssigmentToken";
import { ExpressionToken } from "../../tokens/ExpressionToken";
import { VariableToken } from "../../tokens/VariableToken";

import { Projectable } from "../Projectable";


export function getAsFn(
	container:Container<ExpressionToken>,
) {
	return ( variable:string | Variable | VariableToken ) => {
		if( typeof variable === "string" )
			variable = new VariableToken( variable );
		else if( "getSubject" in variable ) {
			variable = variable.getSubject();
		}

		const targetToken = new AssigmentToken( container.targetToken, variable );
		const newContainer:Container<AssigmentToken> = cloneElement( container, { targetToken } );

		return Projectable.createFrom( newContainer, {} );
	}
}
