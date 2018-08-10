import { Container } from "../data/Container";
import { Factory } from "../data/Factory";

import { HavingToken } from "../tokens/HavingToken";
import { QueryClauseToken } from "../tokens/QueryClauseToken";
import { QueryToken } from "../tokens/QueryToken";
import { SubSelectToken } from "../tokens/SubSelectToken";

import { FinishClause } from "./FinishClause";
import { OrderClause } from "./OrderClause";
import { cloneSolutionModifierContainer } from "./SolutionModifierClause";


/**
 * Interface with the methods available to make a HAVING statement.
 */
export interface HavingClause<T extends FinishClause> extends OrderClause<T> {
	/**
	 * Set a condition to filter the sequence of solutions the query will
	 * retrieve.
	 *
	 * Notice: The current version of SPARQLER does not evaluate the condition
	 * for possible errors
	 *
	 * @param rawCondition Raw condition to be applied for the solutions filtering.
	 * @returns Object with the methods to keep constructing the query.
	 */
	// TODO: create having condition expressions
	having( rawCondition:string ):OrderClause<T> & T;
}


/**
 * Function that creates the {@link HavingClause.having} function.
 *
 * @param genericFactory The factory for the generic {@link FinishClause}
 * that the {@link HavingClause} receives.
 * @param container The container with the query data of the statement.
 *
 * @returns The {@link HavingClause.having} function.
 *
 * @private
 */
function getHavingFn<C extends Container<QueryToken<QueryClauseToken> | SubSelectToken>, T extends FinishClause>( genericFactory:Factory<C, T>, container:C ):HavingClause<T>[ "having" ] {
	return ( rawCondition:string ) => {
		const token:HavingToken = new HavingToken( rawCondition );
		const newContainer = cloneSolutionModifierContainer( container, token );

		const orderClause:OrderClause<T> = OrderClause.createFrom( genericFactory, newContainer, {} );
		return genericFactory( newContainer, orderClause );
	}
}


/**
 * Constant with the utils for {@link HavingClause} objects.
 */
export const HavingClause:{
	/**
	 * Factory function that allows to crete a {@link HavingClause}
	 * from the {@param object} provided.
	 *
	 * @param genericFactory The factory to create the generic finish
	 * of the {@link HavingClause} statement.
	 * @param container The related container with the data for the
	 * {@link HavingClause} statement.
	 * @param object The base base from where to create the
	 * {@link HavingClause} statement.
	 *
	 * @return The {@link HavingClause} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<QueryToken<QueryClauseToken> | SubSelectToken>, T extends FinishClause, O extends object>( genericFactory:Factory<typeof container, T>, container:C, object:O ):O & HavingClause<T>;
} = {
	createFrom<C extends Container<QueryToken<QueryClauseToken> | SubSelectToken>, T extends FinishClause, O extends object>( genericFactory:Factory<typeof container, T>, container:C, object:O ):O & HavingClause<T> {
		return OrderClause.createFrom( genericFactory, container, Object.assign( object, {
			having: getHavingFn( genericFactory, container ),
		} ) );
	},
};
