import { Container } from "../data/Container";
import { Factory } from "../data/Factory";

import { OrderToken } from "../tokens/OrderToken";
import { QueryClauseToken } from "../tokens/QueryClauseToken";
import { QueryToken } from "../tokens/QueryToken";
import { SubSelectToken } from "../tokens/SubSelectToken";

import { FinishClause } from "./FinishClause";
import { LimitOffsetClause } from "./LimitOffsetClause";
import { cloneSolutionModifierContainer } from "./SolutionModifierClause";


/**
 * Interface with the methods available to make a ORDER BY statement.
 */
export interface OrderClause<T extends FinishClause> extends LimitOffsetClause<T> {
	/**
	 * Set a condition to be used as the order of the sequence of solutions the
	 * query will retrieve.
	 *
	 * Notice: The current version of SPARQLER does not evaluate the condition
	 * for possible errors.
	 *
	 * @param rawCondition Raw condition to be applied for the solutions order.
	 * @returns Object with the methods to keep constructing the query.
	 */
	// TODO: create order condition expressions
	orderBy( rawCondition:string ):LimitOffsetClause<T> & T;
}

/**
 * Function that creates the {@link OrderClause.orderBy} function.
 *
 * @param genericFactory The factory for the generic {@link FinishClause}
 * that the {@link OrderClause} receives.
 * @param container The container with the query data of the statement.
 *
 * @returns The {@link OrderClause.orderBy} function.
 *
 * @private
 */
function getOrderByFn<C extends Container<QueryToken<QueryClauseToken> | SubSelectToken>, T extends FinishClause>( genericFactory:Factory<C, T>, container:C ):OrderClause<T>[ "orderBy" ] {
	return ( rawCondition:string ) => {
		const token:OrderToken = new OrderToken( rawCondition );
		const newContainer = cloneSolutionModifierContainer( container, token );

		const limitOffsetClause:LimitOffsetClause<T> = LimitOffsetClause.createFrom( genericFactory, newContainer, {} );
		return genericFactory( newContainer, limitOffsetClause );
	};
}


/**
 * Constant with the utils for {@link OrderClause} objects.
 */
export const OrderClause:{
	/**
	 * Factory function that allows to crete a {@link OrderClause}
	 * from the {@param object} provided.
	 *
	 * @param genericFactory The factory to create the generic finish
	 * of the {@link OrderClause} statement.
	 * @param container The related container with the data for the
	 * {@link OrderClause} statement.
	 * @param object The base base from where to create the
	 * {@link OrderClause} statement.
	 *
	 * @return The {@link OrderClause} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<QueryToken<QueryClauseToken> | SubSelectToken>, T extends FinishClause, O extends object>( genericFactory:Factory<typeof container, T>, container:C, object:O ):O & OrderClause<T>;
} = {
	createFrom<C extends Container<QueryToken<QueryClauseToken> | SubSelectToken>, T extends FinishClause, O extends object>( genericFactory:Factory<typeof container, T>, container:C, object:O ):O & OrderClause<T> {
		return LimitOffsetClause.createFrom( genericFactory, container, Object.assign( object, {
			orderBy: getOrderByFn( genericFactory, container ),
		} ) );
	}
};
