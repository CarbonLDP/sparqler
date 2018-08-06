import { Container2 } from "../data/Container2";
import { Factory } from "../data/Factory";

import { HavingToken } from "../tokens/HavingToken";
import { QueryToken } from "../tokens/QueryToken";
import { SubSelectToken } from "../tokens/SubSelectToken";

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
function getHavingFn<C extends Container2<QueryToken | SubSelectToken>, T extends FinishClause | SubFinishClause>( genericFactory:Factory<C, T>, container:C ):HavingClause<T>[ "having" ] {
	return ( rawCondition:string ) => {
		const token:HavingToken = new HavingToken( rawCondition );
		const newContainer = cloneSolutionModifierContainer( container, token );

		const orderClause:OrderClause<T> = OrderClause.createFrom( genericFactory, newContainer, {} );
		return genericFactory( newContainer, orderClause );
	}
}


/**
 * @todo
 */
export const HavingClause = {
	createFrom<C extends Container2<QueryToken | SubSelectToken>, T extends FinishClause | SubFinishClause, O extends object>( genericFactory:Factory<typeof container, T>, container:C, object:O ):O & HavingClause<T> {
		return OrderClause.createFrom( genericFactory, container, Object.assign( object, {
			having: getHavingFn( genericFactory, container ),
		} ) );
	},
};
