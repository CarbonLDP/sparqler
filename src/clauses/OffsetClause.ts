import { OffsetToken } from "../tokens/OffsetToken";
import { QueryToken } from "../tokens/QueryToken";
import { SubSelectToken } from "../tokens/SubSelectToken";

import { ClauseFactory } from "./ClauseFactory";
import { Container2 } from "./Container2";
import { cloneSolutionModifierContainer } from "./SolutionModifierClause";


export interface OffsetClause<T extends object> {
	/**
	 * Set the offset of results the query should return from.
	 *
	 * @param offset The number to be applied as offset.
	 * @returns A LimitClause or the FinishClause/SubFinishClause depending
	 * if the limit method has been called before or not.
	 */
	offset( offset:number ):T;
}


/**
 * @todo
 */
function getOffsetFn<C extends Container2<QueryToken | SubSelectToken>, T extends object>( genericFactory:ClauseFactory<C, T>, container:C ):OffsetClause<T>[ "offset" ] {
	return ( offset:number ) => {
		const token:OffsetToken = new OffsetToken( offset );

		const newContainer:C = cloneSolutionModifierContainer( container, token );
		return genericFactory( newContainer, {} );
	};
}


export const OffsetClause = {
	create<C extends Container2<QueryToken | SubSelectToken>, T extends object, O extends object>( genericFactory:ClauseFactory<C, T>, container:C, object:O ):O & OffsetClause<T> {
		return Object.assign( object, {
			offset: getOffsetFn( genericFactory, container ),
		} );
	},
};