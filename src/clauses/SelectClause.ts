import { QueryToken } from "../tokens/QueryToken";
import { SelectToken } from "../tokens/SelectToken";
import { VariableToken } from "../tokens/VariableToken";

import { ClauseFactory } from "./ClauseFactory";
import { Container2 } from "./Container2";
import { FinishClause } from "./FinishClause";
import { FromClause } from "./FormClause";
import { cloneElement } from "./utils";
import { WhereClause } from "./WhereClause";


/**
 * @todo
 */
export interface SelectClause<T extends FinishClause> {
	/**
	 * Set a list of variables to be retrieved by the query.
	 *
	 * @param variables The list of variables.
	 * @returns Object with the methods to keep constructing the query.
	 */
	select( ...variables:string[] ):FromClause<T>;

	/**
	 * Set a list of variables to be retrieved by the query ensuring no
	 * repetitions in the set of solutions.
	 *
	 * @param variables The list of variables.
	 * @returns Object with the methods to keep constructing the query.
	 */
	selectDistinct( ...variables:string[] ):FromClause<T>;

	/**
	 * Set a list of variables to be retrieved by the query permitting
	 * eliminations of non-distinct solutions, but not ensuring a set of
	 * unique ones.
	 *
	 * @param variables The list of variables.
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
 * @param container The container that is bound to the FromClause methods.
 * is called from.
 * @param modifier The optional modifier of the SELECT queries.
 *
 * @returns A generic "select" function that shares the {@link SelectClause.select} signature.
 * It behaviour depends of the {@param modifier} set.
 *
 * @private
 */
function getSelectFn<C extends Container2<QueryToken>, T extends FinishClause>( genericFactory:ClauseFactory<C, T>, container:C, modifier?:"DISTINCT" | "REDUCED" ):SelectClause<T>[ "select" ] {
	return ( ...variables:string[] ) => {
		if( variables && variables.length === 0 ) throw new Error( "Need to provide al least one variable." );

		const query:SelectToken = new SelectToken( modifier );
		query.addVariable( ...variables.map( x => x === "*" ? x : new VariableToken( x ) ) );

		const queryToken:QueryToken = cloneElement( container.targetToken, { queryClause: query } );
		const newContainer = cloneElement( container, { targetToken: queryToken } as Partial<C> );

		return FromClause.createFrom( genericFactory, newContainer, {} );
	};
}


/**
 * @todo
 */
export const SelectClause = {
	createFrom<C extends Container2<QueryToken>, T extends FinishClause, O extends object>( genericFactory:ClauseFactory<typeof container, T>, container:C, object:O ):O & SelectClause<T> {
		return WhereClause.createFrom( genericFactory, container, Object.assign( object, {
			select: getSelectFn( genericFactory, container ),
			selectDistinct: getSelectFn( genericFactory, container, "DISTINCT" ),
			selectReduced: getSelectFn( genericFactory, container, "REDUCED" ),
			selectAll: () => getSelectFn( genericFactory, container )( "*" ),
			selectAllDistinct: () => getSelectFn( genericFactory, container, "DISTINCT" )( "*" ),
			selectAllReduced: () => getSelectFn( genericFactory, container, "REDUCED" )( "*" ),
		} ) );
	},
};