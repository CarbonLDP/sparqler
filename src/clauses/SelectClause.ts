import { Container } from "../data/Container";
import { Factory } from "../data/Factory";
import { cloneElement } from "../data/utils";

import { QueryToken } from "../tokens/QueryToken";
import { SelectToken } from "../tokens/SelectToken";
import { VariableToken } from "../tokens/VariableToken";

import { FinishClause } from "./FinishClause";
import { FromClause } from "./FromClause";


/**
 * Interface with the methods available to make a SELECT query.
 */
export interface SelectClause<T extends FinishClause> {
	/**
	 * Set a list of variables to be retrieved by the query.
	 *
	 * @param variables The list of variables.
	 * IF no variable is provided, the behaviour will be the same
	 * as {@link SelectClause.selectAll}
	 * @returns Object with the methods to keep constructing the query.
	 */
	select( ...variables:string[] ):FromClause<T>;

	/**
	 * Set a list of variables to be retrieved by the query ensuring no
	 * repetitions in the set of solutions.
	 *
	 * @param variables The list of variables.
	 * IF no variable is provided, the behaviour will be the same
	 * as {@link SelectClause.selectAllDistinct}
	 * @returns Object with the methods to keep constructing the query.
	 */
	selectDistinct( ...variables:string[] ):FromClause<T>;

	/**
	 * Set a list of variables to be retrieved by the query permitting
	 * eliminations of non-distinct solutions, but not ensuring a set of
	 * unique ones.
	 *
	 * @param variables The list of variables.
	 * IF no variable is provided, the behaviour will be the same
	 * as {@link SelectClause.selectAllReduced}
	 * @returns Object with the methods to keep constructing the query.
	 */
	selectReduced( ...variables:string[] ):FromClause<T>;

	/**
	 * Set that the query must return all the solutions for the variables
	 * used in the where pattern matching.
	 *
	 * @returns Object with the methods to keep constructing the query.
	 */
	selectAll():FromClause<T>;

	/**
	 * Set that the query must return all the solutions for the variables
	 * used in the where pattern matching, ensuring there is not
	 * duplicated solutions.
	 *
	 * @returns Object with the methods to keep constructing the query.
	 */
	selectAllDistinct():FromClause<T>;

	/**
	 * Set that the query must return all the solutions for the variables
	 * used in the where pattern matching, permitting eliminations of
	 * non-distinct solutions, but not ensuring a set of unique ones.
	 *
	 * @returns Object with the methods to keep constructing the query.
	 */
	selectAllReduced():FromClause<T>;
}


/**
 * Function that creates a generic {@link SelectClause.select} function.
 * This function is used to create all the methods for the {@link SelectClause}
 *
 * @param genericFactory The factory for the generic {@link FinishClause}
 * that the {@link SelectClause} receives.
 * @param container The container with the query data for the statement.
 * @param modifier The optional modifier of the SELECT queries.
 *
 * @returns A generic "select" function that shares the {@link SelectClause.select} signature.
 * It behaviour depends of the {@param modifier} set.
 *
 * @private
 */
function getSelectFn<C extends Container<QueryToken>, T extends FinishClause>( genericFactory:Factory<Container<QueryToken<SelectToken>>, T>, container:C, modifier?:"DISTINCT" | "REDUCED" ):SelectClause<T>[ "select" ] {
	return ( ...variables:string[] ) => {
		const queryClause:SelectToken = new SelectToken( modifier );
		if( variables.length ) queryClause.addVariable( ...variables.map( x => new VariableToken( x ) ) );

		const queryToken:QueryToken<SelectToken> = cloneElement( container.targetToken, { queryClause } );
		const newContainer:Container<QueryToken<SelectToken>> = new Container( {
			iriResolver: container.iriResolver,
			targetToken: queryToken,
		} );

		return FromClause.createFrom( genericFactory, newContainer, {} );
	};
}


/**
 * Constant with the utils for {@link SelectClause} objects.
 */
export const SelectClause:{
	/**
	 * Factory function that allows to crete a {@link SelectClause}
	 * from the {@param object} provided.
	 *
	 * @param genericFactory The factory to create the generic finish
	 * of the {@link SelectClause} statement.
	 * @param container The related container with the data for the
	 * {@link SelectClause} statement.
	 * @param object The base base from where to create the
	 * {@link SelectClause} statement.
	 *
	 * @return The {@link SelectClause} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<QueryToken>, T extends FinishClause, O extends object>( genericFactory:Factory<Container<QueryToken<SelectToken>>, T>, container:C, object:O ):O & SelectClause<T>;
} = {
	createFrom<C extends Container<QueryToken>, T extends FinishClause, O extends object>( genericFactory:Factory<Container<QueryToken<SelectToken>>, T>, container:C, object:O ):O & SelectClause<T> {
		return Object.assign( object, {
			select: getSelectFn( genericFactory, container ),
			selectDistinct: getSelectFn( genericFactory, container, "DISTINCT" ),
			selectReduced: getSelectFn( genericFactory, container, "REDUCED" ),
			selectAll: () => getSelectFn( genericFactory, container )(),
			selectAllDistinct: () => getSelectFn( genericFactory, container, "DISTINCT" )(),
			selectAllReduced: () => getSelectFn( genericFactory, container, "REDUCED" )(),
		} );
	},
};