import { Container } from "sparqler/data/Container";
import { cloneElement } from "sparqler/data/utils";
import { SubSelectToken } from "sparqler/tokens/SubSelectToken";
import { WhereToken } from "sparqler/tokens/WhereToken";
import { GroupClause } from "../../clauses/GroupClause";
import { Pattern } from "../Pattern";
import { FinishPattern } from "./FinishPattern";


/**
 * Interface with the methods available to make a WHERE statement of
 * a sub-query.
 */
export interface SubWherePattern {
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
 * Function that creates the {@link SubWherePattern.where} function.
 *
 * @param container The container with the query data of the statement.
 *
 * @returns The {@link SubWherePattern.where} function.
 *
 * @private
 */
function getWhereFn( container:Container<SubSelectToken> ):SubWherePattern[ "where" ] {
	return ( patterns:Pattern | Pattern[] ) => {
		const where:WhereToken = new WhereToken();
		patterns = Array.isArray( patterns ) ? patterns : [ patterns ];
		where.groupPattern.patterns.push( ...patterns.map( x => x.getPattern() ) );

		const targetToken:SubSelectToken = cloneElement( container.targetToken, { where } );
		const newContainer = cloneElement( container, { targetToken } );

		const groupClause:GroupClause<FinishPattern> = GroupClause.createFrom( FinishPattern.createFrom, newContainer, {} );
		return FinishPattern.createFrom( newContainer, groupClause );
	};
}


/**
 * Constant with the utils for {@link SubWherePattern} objects.
 */
export const SubWherePattern:{

	/**
	 * Factory function that allows to crete a {@link SubWherePattern}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link SubWherePattern} statement.
	 * @param object The base base from where to create the
	 * {@link SubWherePattern} statement.
	 *
	 * @return The {@link SubWherePattern} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<SubSelectToken>, O extends object>( container:C, object:O ):O & SubWherePattern;
} = {
	createFrom<C extends Container<SubSelectToken>, O extends object>( container:C, object:O ):O & SubWherePattern {
		return Object.assign( object, {
			where: getWhereFn( container ),
		} );
	},
};