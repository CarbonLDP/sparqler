import { Container } from "../core/containers/Container";
import { Factory } from "../core/factories/Factory";

import { OffsetToken } from "../tokens/OffsetToken";
import { QueryClauseToken } from "../tokens/QueryClauseToken";
import { QueryToken } from "../tokens/QueryToken";
import { SubSelectToken } from "../tokens/SubSelectToken";

import { cloneSolutionModifierContainer } from "./SolutionModifierClause";


/**
 * Interface with the methods available to make a OFFSET statement.
 */
export interface OffsetClause<T extends object> {
	/**
	 * Set the offset of results the query should return from.
	 *
	 * @param offset The number to be applied as offset.
	 * @returns A OffsetClause or the FinishClause/SubFinishClause depending
	 * if the limit method has been called before or not.
	 */
	offset( offset:number ):T;
}

/**
 * Function that creates the {@link OffsetClause.offset} function.
 *
 * @param genericFactory The factory for the generic {@link FinishClause}
 * that the {@link OffsetClause} receives.
 * @param container The container with the query data of the statement.
 *
 * @returns The {@link OffsetClause.offset} function.
 *
 * @private
 */
function getOffsetFn<C extends Container<QueryToken<QueryClauseToken> | SubSelectToken>, T extends object>( genericFactory:Factory<C, T>, container:C ):OffsetClause<T>[ "offset" ] {
	return ( offset:number ) => {
		const token:OffsetToken = new OffsetToken( offset );

		const newContainer:C = cloneSolutionModifierContainer( container, token );
		return genericFactory( newContainer, {} );
	};
}

/**
 * Constant with the utils for {@link OffsetClause} objects.
 */
export const OffsetClause:{
	/**
	 * Factory function that allows to crete a {@link OffsetClause}
	 * from the {@param object} provided.
	 *
	 * @param genericFactory The factory to create the generic finish
	 * of the {@link OffsetClause} statement.
	 * @param container The related container with the data for the
	 * {@link OffsetClause} statement.
	 * @param object The base base from where to create the
	 * {@link OffsetClause} statement.
	 *
	 * @return The {@link OffsetClause} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<QueryToken<QueryClauseToken> | SubSelectToken>, T extends object, O extends object>( genericFactory:Factory<C, T>, container:C, object:O ):O & OffsetClause<T>;
} = {
	createFrom<C extends Container<QueryToken<QueryClauseToken> | SubSelectToken>, T extends object, O extends object>( genericFactory:Factory<C, T>, container:C, object:O ):O & OffsetClause<T> {
		return Object.assign( object, {
			offset: getOffsetFn( genericFactory, container ),
		} );
	},
};