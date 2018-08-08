import { Container } from "../data/Container";
import { Factory } from "../data/Factory";

import { OrderToken } from "../tokens/OrderToken";
import { QueryClauseToken } from "../tokens/QueryClauseToken";
import { QueryToken } from "../tokens/QueryToken";
import { SubSelectToken } from "../tokens/SubSelectToken";

import { FinishClause } from "./FinishClause";
import { LimitOffsetClause } from "./LimitOffsetClause";
import { cloneSolutionModifierContainer } from "./SolutionModifierClause";


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
 * @todo
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
 * @todo
 */
export const OrderClause:{
	createFrom<C extends Container<QueryToken<QueryClauseToken> | SubSelectToken>, T extends FinishClause, O extends object>( genericFactory:Factory<typeof container, T>, container:C, object:O ):O & OrderClause<T>;
} = {
	createFrom<C extends Container<QueryToken<QueryClauseToken> | SubSelectToken>, T extends FinishClause, O extends object>( genericFactory:Factory<typeof container, T>, container:C, object:O ):O & OrderClause<T> {
		return LimitOffsetClause.createFrom( genericFactory, container, Object.assign( object, {
			orderBy: getOrderByFn( genericFactory, container ),
		} ) );
	}
};
