import { GroupClause } from "../../clauses/GroupClause";
import { Container } from "../../core/containers/Container";
import { cloneElement } from "../../core/containers/utils";

import { SubSelectToken } from "../../tokens/SubSelectToken";
import { WhereToken } from "../../tokens/WhereToken";

import { Pattern } from "../Pattern";
import { FinishPattern } from "./FinishPattern";


/**
 * Interface with the methods available to make a WHERE statement of
 * a sub-query.
 */
export interface WherePattern {
	/**
	 * Sets the graph patterns the sub-query should match to retrieve the
	 * sub-solutions data.
	 *
	 * @param patterns Patterns the sub-query should match.
	 *
	 * @returns Object with the methods to keep constructing the
	 * sub-query.
	 */
	where( patterns:Pattern | Pattern[] ):GroupClause<FinishPattern> & FinishPattern;
}


/**
 * Function that creates the {@link WherePattern.where} function.
 *
 * @param container The container with the query data of the statement.
 *
 * @returns The {@link WherePattern.where} function.
 *
 * @private
 */
function getWhereFn( container:Container<SubSelectToken> ):WherePattern[ "where" ] {
	return ( patterns:Pattern | Pattern[] ) => {
		const where:WhereToken = new WhereToken();
		patterns = Array.isArray( patterns ) ? patterns : [ patterns ];
		where.groupPattern.patterns.push( ...patterns.map( x => x._getPattern() ) );

		const targetToken:SubSelectToken = cloneElement( container.targetToken, { where } );
		const newContainer = cloneElement( container, { targetToken } );

		const groupClause:GroupClause<FinishPattern> = GroupClause.createFrom( FinishPattern.createFrom, newContainer, {} );
		return FinishPattern.createFrom( newContainer, groupClause );
	};
}


/**
 * Constant with the utils for {@link WherePattern} objects.
 */
export const WherePattern:{

	/**
	 * Factory function that allows to crete a {@link WherePattern}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link WherePattern} statement.
	 * @param object The base base from where to create the
	 * {@link WherePattern} statement.
	 *
	 * @return The {@link WherePattern} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<SubSelectToken>, O extends object>( container:C, object:O ):O & WherePattern;
} = {
	createFrom<C extends Container<SubSelectToken>, O extends object>( container:C, object:O ):O & WherePattern {
		return Object.assign( object, {
			where: getWhereFn( container ),
		} );
	},
};
