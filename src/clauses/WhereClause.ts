import { Container2 } from "../data/Container2";
import { Factory } from "../data/Factory";
import { IRIResolver2 } from "../data/IRIResolver2";
import { cloneElement } from "../data/utils";

import { Pattern } from "../patterns/Pattern";
import { PatternBuilder2 } from "../patterns/PatternBuilder2";

import { PatternToken } from "../tokens/PatternToken";
import { QueryToken } from "../tokens/QueryToken";
import { WhereToken } from "../tokens/WhereToken";

import { FinishClause } from "./FinishClause";
import { GroupClause } from "./GroupClause";


export interface WhereClause<T extends FinishClause> {
	/**
	 * Specifies the graph patterns the query should match to retrieve
	 * the solutions results.
	 *
	 * This pattern are created by a pattern constructor function that
	 * receives a {@link PatternBuilder2} which is a class that exposes
	 * the possible elements and configurations the patterns chan have.
	 *
	 * @param patternFunction Function that retrieves a pattern or an
	 * array of patterns to match.
	 * @returns Object with the methods to keep constructing the query.
	 */
	where( patternFunction:( builder:PatternBuilder2 ) => Pattern | Pattern[] ):GroupClause<T> & T;
}

function _getPatterns( iriResolver:IRIResolver2, patternFunction:( builder:PatternBuilder2 ) => Pattern | Pattern[] ):PatternToken[] {
	const patternOrPatterns:Pattern | Pattern[] = patternFunction( PatternBuilder2.create( iriResolver ) );
	const patterns:Pattern[] = Array.isArray( patternOrPatterns ) ? patternOrPatterns : [ patternOrPatterns ];

	return patterns.map( x => x.getPattern() );
}

/**
 * @todo
 */
function getWhereFn<C extends Container2<QueryToken>, T extends FinishClause>( genericFactory:Factory<C, T>, container:C ):WhereClause<T>[ "where" ] {
	return ( patternFunction:( builder:PatternBuilder2 ) => Pattern | Pattern[] ) => {
		const iriResolver:IRIResolver2 = new IRIResolver2( container.iriResolver );
		const patterns:PatternToken[] = _getPatterns( iriResolver, patternFunction );

		const query = cloneElement( container.targetToken.queryClause, { where: new WhereToken() } )
			.addPattern( ...patterns );

		const queryToken:QueryToken = cloneElement( container.targetToken, { queryClause: query } );
		const newContainer = cloneElement( container, { iriResolver, targetToken: queryToken } as Partial<C> );

		const groupClause:GroupClause<T> = GroupClause.createFrom( genericFactory, newContainer, {} );
		return genericFactory( newContainer, groupClause );
	};
}


/**
 * @todo
 */
export const WhereClause = {
	createFrom<C extends Container2<QueryToken>, T extends FinishClause, O extends object>( genericFactory:Factory<typeof container, T>, container:C, object:O ):O & WhereClause<T> {
		return Object.assign( object, {
			where: getWhereFn( genericFactory, container ),
		} );
	},
};
