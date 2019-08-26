import { _assigmentTransformer } from "../../clauses/utils";

import { Container } from "../../data/Container";

import { Projectable } from "../../expressions/Projectable";

import { SubSelectToken } from "../../tokens/SubSelectToken";

import { WherePattern } from "./WherePattern";


/**
 * Interface with the methods available to make a sub-SELECT query.
 */
export interface SubSelectPattern {
	/**
	 * Set a list of variables and/or assignments to be retrieved by the sub-query.
	 *
	 * @param projections The list of variables and/or assignments.
	 * IF no variable is provided, the behaviour will be the same
	 * as {@link SubSelectPattern.selectAll}
	 *
	 * @returns Object with the methods to keep constructing the
	 * sub-query.
	 */
	select( ...projections:(string | Projectable)[] ):WherePattern;

	/**
	 * Set a list of variables and/or assignments to be retrieved by the sub-query
	 * ensuring no repetitions in the set of solutions.
	 *
	 * @param projections The list of variables and/or assignments.
	 * IF no variable is provided, the behaviour will be the same
	 * as {@link SubSelectPattern.selectAllDistinct}
	 *
	 * @returns Object with the methods to keep constructing the
	 * sub-query.
	 */
	selectDistinct( ...projections:(string | Projectable)[] ):WherePattern;

	/**
	 * Set a list of variables and/or assignments to be retrieved by the sub-query
	 * permitting eliminations of non-distinct solutions, but not
	 * ensuring a set of unique ones.
	 *
	 * @param projections The list of variables and/or assignments.
	 * IF no variable is provided, the behaviour will be the same
	 * as {@link SubSelectPattern.selectAllReduced}
	 *
	 * @returns Object with the methods to keep constructing the
	 * sub-query.
	 */
	selectReduced( ...projections:(string | Projectable)[] ):WherePattern;

	/**
	 * Set that the sub-query must return all the solutions for the
	 * variables used in the where pattern matching.
	 *
	 * @returns Object with the methods to keep constructing the
	 * sub-query.
	 */
	selectAll():WherePattern;

	/**
	 * Set that the sub-query must return all the solutions for the
	 * variables used in the where pattern matching, ensuring there
	 * is not duplicated solutions.
	 *
	 * @returns Object with the methods to keep constructing the
	 * sub-query.
	 */
	selectAllDistinct():WherePattern;

	/**
	 * Set that the sub-query must return all the solutions for the
	 * variables used in the where pattern matching, permitting
	 * eliminations of non-distinct solutions, but not ensuring a set
	 * of unique ones.
	 *
	 * @returns Object with the methods to keep constructing the
	 * sub-query.
	 */
	selectAllReduced():WherePattern;
}


/**
 * Function that creates a generic {@link SubSelectPattern.select} function.
 * This function is used to create all the methods for the {@link SubSelectPattern}
 *
 * @param container The container with the query data for the statement.
 * @param modifier The optional modifier of the SELECT queries.
 * @param limit Optional flag to limit arguments to none.
 *
 * @returns A generic "select" function that shares the
 * {@link SubSelectPattern.select} signature. It behaviour depends of
 * the {@param modifier} set.
 *
 * @private
 */
function getSelectFn( container:Container<undefined>, modifier?:"DISTINCT" | "REDUCED", limit?:true ):SubSelectPattern[ "select" ] {
	return ( ...projections:(string | Projectable)[] ) => {
		const targetToken:SubSelectToken = new SubSelectToken( modifier );

		// Add tokens when is not limited (ALL)
		if( !limit && projections.length )
			targetToken.addProjection( ...projections.map( _assigmentTransformer ) );

		const newContainer:Container<SubSelectToken> = new Container( {
			iriResolver: container.iriResolver,
			targetToken
		} );
		return WherePattern.createFrom( newContainer, {} );
	};
}


/**
 * Constant with the utils for {@link SubSelectPattern} objects.
 */
export const SubSelectPattern:{
	/**
	 * Factory function that allows to crete a {@link SubSelectPattern}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link SubSelectPattern} statement.
	 * @param object The base base from where to create the
	 * {@link SubSelectPattern} statement.
	 *
	 * @return The {@link SubSelectPattern} statement created from the
	 * {@param object} provided.
	 */
	createFrom<O extends object>( container:Container<undefined>, object:O ):O & SubSelectPattern;
} = {
	createFrom<O extends object>( container:Container<undefined>, object:O ):O & SubSelectPattern {
		return Object.assign( object, {
			select: getSelectFn( container ),
			selectDistinct: getSelectFn( container, "DISTINCT" ),
			selectReduced: getSelectFn( container, "REDUCED" ),
			selectAll: () => getSelectFn( container )(),
			selectAllDistinct: () => getSelectFn( container, "DISTINCT" )(),
			selectAllReduced: () => getSelectFn( container, "REDUCED" )(),
		} );
	},
};
