import { Container } from "../core/containers/Container";
import { Factory } from "../core/factories/Factory";

import { LimitToken } from "../tokens/LimitToken";
import { QueryClauseToken } from "../tokens/QueryClauseToken";
import { QueryToken } from "../tokens/QueryToken";
import { SubSelectToken } from "../tokens/SubSelectToken";

import { cloneSolutionModifierContainer } from "./SolutionModifierClause";


/**
 * Interface with the methods available to make a LIMIT statement.
 */
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
 * Function that creates the {@link LimitClause.limit} function.
 *
 * @param genericFactory The factory for the generic {@link FinishClause}
 * that the {@link LimitClause} receives.
 * @param container The container with the query data of the statement.
 *
 * @returns The {@link LimitClause.limit} function.
 *
 * @private
 */
function getLimitFn<C extends Container<QueryToken<QueryClauseToken> | SubSelectToken>, T extends object>( genericFactory:Factory<C, T>, container:C ):LimitClause<T>[ "limit" ] {
	return ( limit:number ) => {
		const token:LimitToken = new LimitToken( limit );

		const newContainer:C = cloneSolutionModifierContainer( container, token );
		return genericFactory( newContainer, {} );
	};
}


/**
 * Constant with the utils for {@link LimitClause} objects.
 */
export const LimitClause:{
	/**
	 * Factory function that allows to crete a {@link LimitClause}
	 * from the {@param object} provided.
	 *
	 * @param genericFactory The factory to create the generic finish
	 * of the {@link LimitClause} statement.
	 * @param container The related container with the data for the
	 * {@link LimitClause} statement.
	 * @param object The base base from where to create the
	 * {@link LimitClause} statement.
	 *
	 * @return The {@link LimitClause} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<QueryToken<QueryClauseToken> | SubSelectToken>, T extends object, O extends object>( genericFactory:Factory<C, T>, container:C, object:O ):O & LimitClause<T>;
} = {
	createFrom( genericFactory, container, object ) {
		return Object.assign( object, {
			limit: getLimitFn( genericFactory, container ),
		} );
	},
};
