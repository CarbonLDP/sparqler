import { HavingToken } from "../tokens/HavingToken";
import { QueryToken } from "../tokens/QueryToken";
import { SubSelectToken } from "../tokens/SubSelectToken";

import { ClauseFactory } from "./ClauseFactory";
import { Container2 } from "./Container2";
import { FinishClause } from "./FinishClause";
import { SubFinishClause } from "./interfaces";
import { OrderClause } from "./OrderClause";
import { cloneSolutionModifierContainer } from "./SolutionModifierClause";


export interface HavingClause<T extends FinishClause | SubFinishClause> extends OrderClause<T> {
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
 * @todo
 */
function getHavingFn<C extends Container2<QueryToken | SubSelectToken>, T extends FinishClause | SubFinishClause>( genericFactory:ClauseFactory<C, T>, container:C ):HavingClause<T>[ "having" ] {
	return ( rawCondition:string ) => {
		const token:HavingToken = new HavingToken( rawCondition );
		const newContainer = cloneSolutionModifierContainer( container, token );

		const orderClause:OrderClause<T> = OrderClause.create( genericFactory, newContainer, {} );
		return genericFactory( newContainer, orderClause );
	}
}


/**
 * @todo
 */
export const HavingClause = {
	create<C extends Container2<QueryToken | SubSelectToken>, T extends FinishClause | SubFinishClause, O extends object>( genericFactory:ClauseFactory<typeof container, T>, container:C, object:O ):O & HavingClause<T> {
		return OrderClause.create( genericFactory, container, Object.assign( object, {
			having: getHavingFn( genericFactory, container ),
		} ) );
	},
};
