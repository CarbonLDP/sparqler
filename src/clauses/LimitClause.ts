import { Container2 } from "../data/Container2";
import { Factory } from "../data/Factory";

import { LimitToken } from "../tokens/LimitToken";
import { QueryToken } from "../tokens/QueryToken";
import { SubSelectToken } from "../tokens/SubSelectToken";

import { cloneSolutionModifierContainer } from "./SolutionModifierClause";


export interface LimitClause<T extends object> {
	/**
	 * Set the limit of results the query should return.
	 *
	 * @param limit The number to be applied as limit.
	 * @returns An OffsetClause or the FinishClause/SubFinishClause depending
	 * if the offset method has been called before or not.
	 */
	limit( limit:number ):T;
}


/**
 * @todo
 */
function getLimitFn<C extends Container2<QueryToken | SubSelectToken>, T extends object>( genericFactory:Factory<C, T>, container:C ):LimitClause<T>[ "limit" ] {
	return ( limit:number ) => {
		const token:LimitToken = new LimitToken( limit );

		const newContainer:C = cloneSolutionModifierContainer( container, token );
		return genericFactory( newContainer, {} );
	};
}


/**
 * @todo
 */
export const LimitClause = {
	createFrom<C extends Container2<QueryToken | SubSelectToken>, T extends object, O extends object>( genericFactory:Factory<C, T>, container:C, object:O ):O & LimitClause<T> {
		return Object.assign( object, {
			limit: getLimitFn( genericFactory, container ),
		} );
	},
};
