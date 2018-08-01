import { QueryClauseToken } from "../tokens/QueryClauseToken";
import { QueryToken } from "../tokens/QueryToken";
import { SolutionModifierToken } from "../tokens/SolutionModifierToken";
import { SubSelectToken } from "../tokens/SubSelectToken";

import { Container2 } from "./Container2";
import { cloneElement } from "./utils";


export function cloneSolutionModifierContainer<C extends Container2<QueryToken | SubSelectToken>>( container:C, token:SolutionModifierToken ):C {
	const targetToken:QueryToken | SubSelectToken = container.targetToken.token === "query" ?
		_cloneFromQuery( container.targetToken, token ) :
		_cloneFromClause( container.targetToken, token );

	return cloneElement( container, { targetToken } as any );
}

function _cloneFromClause<T extends QueryClauseToken | SubSelectToken>( this:void, clauseToken:T, token:SolutionModifierToken ):T {
	const modifiers:SolutionModifierToken[] = clauseToken.modifiers.concat( token );
	return cloneElement( clauseToken, { modifiers } as any );
}

function _cloneFromQuery( this:void, queryToken:QueryToken, token:SolutionModifierToken ):QueryToken {
	const queryClause:QueryClauseToken = _cloneFromClause( queryToken.queryClause, token );
	return cloneElement( queryToken, { queryClause } );
}
