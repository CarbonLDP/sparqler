import { Container } from "../../data/Container";

import { SubSelectToken } from "../../tokens/SubSelectToken";
import { TokenNode } from "../../tokens/TokenNode";
import { VariableToken } from "../../tokens/VariableToken";

import { SubWherePattern } from "./SubWherePattern";


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
	select( ...variables:string[] ):SubWherePattern;

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
	selectDistinct( ...variables:string[] ):SubWherePattern;

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
	selectReduced( ...variables:string[] ):SubWherePattern;

	/**
	 * Set that the sub-query must return all the solutions for the
	 * variables used in the where pattern matching.
	 *
	 * @returns Object with the methods to keep constructing the
	 * sub-query.
	 */
	selectAll():SubWherePattern;

	/**
	 * Set that the sub-query must return all the solutions for the
	 * variables used in the where pattern matching, ensuring there
	 * is not duplicated solutions.
	 *
	 * @returns Object with the methods to keep constructing the
	 * sub-query.
	 */
	selectAllDistinct():SubWherePattern;

	/**
	 * Set that the sub-query must return all the solutions for the
	 * variables used in the where pattern matching, permitting
	 * eliminations of non-distinct solutions, but not ensuring a set
	 * of unique ones.
	 *
	 * @returns Object with the methods to keep constructing the
	 * sub-query.
	 */
	selectAllReduced():SubWherePattern;
}


/**
 * Function that creates a generic {@link SubSelectClause.select} function.
 * This function is used to create all the methods for the {@link SubSelectClause}
 *
 * @param container The container with the query data for the statement.
 * @param modifier The optional modifier of the SELECT queries.
 *
 * @returns A generic "select" function that shares the
 * {@link SubSelectClause.select} signature. It behaviour depends of
 * the {@param modifier} set.
 *
 * @private
 */
function getSelectFn<C extends Container<TokenNode>>( container:C, modifier?:"DISTINCT" | "REDUCED" ):SubSelectPattern[ "select" ] {
	return ( ...variables:string[] ) => {
		const targetToken:SubSelectToken = new SubSelectToken( modifier );
		if( variables.length ) targetToken.addVariable( ...variables.map( x => new VariableToken( x ) ) );

		const newContainer:Container<SubSelectToken> = new Container( {
			iriResolver: container.iriResolver,
			targetToken
		} );
		return SubWherePattern.createFrom( newContainer, {} );
	};
}


/**
 * Constant with the utils for {@link SubSelectClause} objects.
 */
export const SubSelectPattern:{
	/**
	 * Factory function that allows to crete a {@link SubSelectClause}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link SubSelectClause} statement.
	 * @param object The base base from where to create the
	 * {@link SubSelectClause} statement.
	 *
	 * @return The {@link SubSelectClause} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<TokenNode>, O extends object>( container:C, object:O ):O & SubSelectPattern;
} = {
	createFrom<C extends Container<TokenNode>, O extends object>( container:C, object:O ):O & SubSelectPattern {
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
