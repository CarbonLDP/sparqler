import { Container } from "../../data/Container";

import { SubSelectToken } from "../../tokens/SubSelectToken";
import { VariableToken } from "../../tokens/VariableToken";

import { WherePattern } from "./WherePattern";


/**
 * Interface with the methods available to make a sub-SELECT query.
 */
export interface SubSelectPattern {
	/**
	 * Set a list of variables to be retrieved by the sub-query.
	 *
	 * @param variables The list of variables.
	 * IF no variable is provided, the behaviour will be the same
	 * as {@link SubSelectPattern.selectAll}
	 *
	 * @returns Object with the methods to keep constructing the
	 * sub-query.
	 */
	select( ...variables:string[] ):WherePattern;

	/**
	 * Set a list of variables to be retrieved by the sub-query
	 * ensuring no repetitions in the set of solutions.
	 *
	 * @param variables The list of variables.
	 * IF no variable is provided, the behaviour will be the same
	 * as {@link SubSelectPattern.selectAllDistinct}
	 *
	 * @returns Object with the methods to keep constructing the
	 * sub-query.
	 */
	selectDistinct( ...variables:string[] ):WherePattern;

	/**
	 * Set a list of variables to be retrieved by the sub-query
	 * permitting eliminations of non-distinct solutions, but not
	 * ensuring a set of unique ones.
	 *
	 * @param variables The list of variables.
	 * IF no variable is provided, the behaviour will be the same
	 * as {@link SubSelectPattern.selectAllReduced}
	 *
	 * @returns Object with the methods to keep constructing the
	 * sub-query.
	 */
	selectReduced( ...variables:string[] ):WherePattern;

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
 *
 * @returns A generic "select" function that shares the
 * {@link SubSelectPattern.select} signature. It behaviour depends of
 * the {@param modifier} set.
 *
 * @private
 */
function getSelectFn( container:Container<undefined>, modifier?:"DISTINCT" | "REDUCED" ):SubSelectPattern[ "select" ] {
	return ( ...variables:string[] ) => {
		const targetToken:SubSelectToken = new SubSelectToken( modifier );
		if( variables.length ) targetToken.addVariable( ...variables.map( x => new VariableToken( x ) ) );

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
