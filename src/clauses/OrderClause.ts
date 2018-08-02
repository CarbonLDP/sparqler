import { FinishClause } from "sparqler/clauses/FinishClause";
import { OrderToken } from "../tokens/OrderToken";
import { QueryToken } from "../tokens/QueryToken";
import { SubSelectToken } from "../tokens/SubSelectToken";

import { ClauseFactory } from "./ClauseFactory";
import { Container2 } from "./Container2";
import { SubFinishClause } from "./interfaces";
import { LimitOffsetClause } from "./LimitOffsetClause";
import { cloneSolutionModifierContainer } from "./SolutionModifierClause";


export interface OrderClause<T extends FinishClause | SubFinishClause> extends LimitOffsetClause<T> {
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
function getOrderByFn<C extends Container2<QueryToken | SubSelectToken>, T extends FinishClause | SubFinishClause>( genericFactory:ClauseFactory<C, T>, container:C ):OrderClause<T>[ "orderBy" ] {
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
export const OrderClause = {
	createFrom<C extends Container2<QueryToken | SubSelectToken>, T extends FinishClause | SubFinishClause, O extends object>( genericFactory:ClauseFactory<typeof container, T>, container:C, object:O ):O & OrderClause<T> {
		return LimitOffsetClause.createFrom( genericFactory, container, Object.assign( object, {
			orderBy: getOrderByFn( genericFactory, container ),
		} ) );
	}
};
