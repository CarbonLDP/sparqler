import { Container } from "../data/Container";
import { Factory } from "../data/Factory";
import { IRIResolver } from "../data/IRIResolver";
import { cloneElement } from "../data/utils";

import { Pattern } from "../patterns/Pattern";
import { PatternBuilder2 } from "../patterns/PatternBuilder2";

import { PatternToken } from "../tokens/PatternToken";
import { QueryClauseToken } from "../tokens/QueryClauseToken";
import { QueryToken } from "../tokens/QueryToken";
import { WhereToken } from "../tokens/WhereToken";

import { FinishClause } from "./FinishClause";
import { GroupClause } from "./GroupClause";


/**
 * Interface with the methods available to make a WHERE statement.
 */
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


function _getPatterns( iriResolver:IRIResolver, patternFunction:( builder:PatternBuilder2 ) => Pattern | Pattern[] ):PatternToken[] {
	const patternOrPatterns:Pattern | Pattern[] = patternFunction( PatternBuilder2.create( iriResolver ) );
	const patterns:Pattern[] = Array.isArray( patternOrPatterns ) ? patternOrPatterns : [ patternOrPatterns ];

	return patterns.map( x => x.getPattern() );
}

/**
 * Function that creates the {@link WhereClause.where} function.
 *
 * @param genericFactory The factory for the generic {@link FinishClause}
 * that the {@link WhereClause} receives.
 * @param container The container with the query data of the statement.
 *
 * @returns The {@link WhereClause.where} function.
 *
 * @private
 */
function getWhereFn<C extends Container<QueryToken<QueryClauseToken>>, T extends FinishClause>( genericFactory:Factory<C, T>, container:C ):WhereClause<T>[ "where" ] {
	return ( patternFunction:( builder:PatternBuilder2 ) => Pattern | Pattern[] ) => {
		const iriResolver:IRIResolver = new IRIResolver( container.iriResolver );
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
 * Constant with the utils for {@link WhereClause} objects.
 */
export const WhereClause:{
	/**
	 * Factory function that allows to crete a {@link WhereClause}
	 * from the {@param object} provided.
	 *
	 * @param genericFactory The factory to create the generic finish
	 * of the {@link WhereClause} statement.
	 * @param container The related container with the data for the
	 * {@link WhereClause} statement.
	 * @param object The base base from where to create the
	 * {@link WhereClause} statement.
	 *
	 * @return The {@link WhereClause} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<QueryToken<QueryClauseToken>>, T extends FinishClause, O extends object>( genericFactory:Factory<typeof container, T>, container:C, object:O ):O & WhereClause<T>
} = {
	createFrom<C extends Container<QueryToken<QueryClauseToken>>, T extends FinishClause, O extends object>( genericFactory:Factory<typeof container, T>, container:C, object:O ):O & WhereClause<T> {
		return Object.assign( object, {
			where: getWhereFn( genericFactory, container ),
		} );
	},
};
