import { IRIResolver2 } from "../iri/IRIResolver2";

import { GraphPattern } from "../patterns/interfaces";
import { PatternBuilder } from "../patterns/PatternBuilder";

import { QueryToken } from "../tokens/QueryToken";
import { WhereToken } from "../tokens/WhereToken";

import { ClauseFactory } from "./ClauseFactory";
import { Container2 } from "./Container2";
import { GroupClause } from "./GroupClause";
import { FinishClause } from "./FinishClause";
import { cloneElement } from "./utils";


export interface WhereClause<T extends FinishClause> {
	/**
	 * Specifies the graph patterns the query should match to retrieve
	 * the solutions results.
	 *
	 * This pattern are created by a pattern constructor function that
	 * receives a {@link PatternBuilder} which is a class that exposes
	 * the possible elements and configurations the patterns chan have.
	 *
	 * @param patternFunction Function that retrieves a pattern or an
	 * array of patterns to match.
	 * @returns Object with the methods to keep constructing the query.
	 */
	where( patternFunction:( builder:PatternBuilder ) => GraphPattern | GraphPattern[] ):GroupClause<T> & T;
}


/**
 * @todo
 */
function getWhereFn<C extends Container2<QueryToken>, T extends FinishClause>( genericFactory:ClauseFactory<C, T>, container:C ):WhereClause<T>[ "where" ] {
	return ( patternFunction:( builder:PatternBuilder ) => GraphPattern | GraphPattern[ ] ) => {
		const iriResolver:IRIResolver2 = new IRIResolver2( container.iriResolver );
		const patterns:GraphPattern | GraphPattern[] = patternFunction.call( void 0, new PatternBuilder( iriResolver as any ) );

		// FIXME
		const query = cloneElement( container.targetToken.queryClause, { where: new WhereToken() } )
			.addPattern( ...patterns as any );

		const queryToken:QueryToken = cloneElement( container.targetToken, { queryClause: query } );
		const newContainer = cloneElement( container, { targetToken: queryToken } as Partial<C> );

		const groupClause:GroupClause<T> = GroupClause.create( genericFactory, newContainer, {} );
		return genericFactory( newContainer, groupClause );
	};
}


/**
 * @todo
 */
export const WhereClause = {
	create<C extends Container2<QueryToken>, T extends FinishClause, O extends object>( genericFactory:ClauseFactory<typeof container, T>, container:C, object:O ):O & WhereClause<T> {
		return Object.assign( object, {
			where: getWhereFn( genericFactory, container ),
		} );
	},
};
