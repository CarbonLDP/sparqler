import { Container } from "../data/Container";
import { Factory } from "../data/Factory";
import { cloneElement } from "../data/utils";
import { AskToken } from "../tokens/AskToken";

import { QueryToken } from "../tokens/QueryToken";

import { FinishClause } from "./FinishClause";
import { FromClause } from "./FromClause";


/**
 * Interface with the methods available to make a ASK query.
 */
export interface AskClause<T extends FinishClause> {
	/**
	 * Set that the query will ask for a pattern matching.
	 */
	ask():FromClause<T>;
}


/**
 * Function that creates a {@link AskClause.ask} function.
 *
 * @param genericFactory The factory for the generic {@link FinishClause}
 * that the {@link AskClause} receives.
 * @param container The container with the query data for the statement.
 *
 * @private
 */
function getSelectFn<C extends Container<QueryToken>, T extends FinishClause>( genericFactory:Factory<Container<QueryToken<AskToken>>, T>, container:C ):AskClause<T>[ "ask" ] {
	return () => {
		const queryClause:AskToken = new AskToken();

		const queryToken:QueryToken<AskToken> = cloneElement( container.targetToken, { queryClause } );
		const newContainer:Container<QueryToken<AskToken>> = new Container( {
			iriResolver: container.iriResolver,
			targetToken: queryToken,
		} );

		return FromClause.createFrom( genericFactory, newContainer, {} );
	};
}


/**
 * Constant with the utils for {@link AskClause} objects.
 */
export const AskClause:{
	/**
	 * Factory function that allows to crete a {@link AskClause}
	 * from the {@param object} provided.
	 *
	 * @param genericFactory The factory to create the generic finish
	 * of the {@link AskClause} statement.
	 * @param container The related container with the data for the
	 * {@link AskClause} statement.
	 * @param object The base base from where to create the
	 * {@link AskClause} statement.
	 *
	 * @return The {@link AskClause} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<QueryToken>, T extends FinishClause, O extends object>( genericFactory:Factory<Container<QueryToken<AskToken>>, T>, container:C, object:O ):O & AskClause<T>;
} = {
	createFrom<C extends Container<QueryToken>, T extends FinishClause, O extends object>( genericFactory:Factory<Container<QueryToken<AskToken>>, T>, container:C, object:O ):O & AskClause<T> {
		return Object.assign( object, {
			ask: getSelectFn( genericFactory, container ),
		} );
	},
};