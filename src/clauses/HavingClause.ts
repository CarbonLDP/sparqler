import { Container } from "../core/containers/Container";
import { Factory } from "../core/factories/Factory";

import { Expression } from "../patterns/expressions/Expression";

import { GeneralBuilder } from "../GeneralBuilder";
import { SupportedNativeTypes } from "../patterns/SupportedNativeTypes";

import { HavingToken } from "../tokens/HavingToken";
import { QueryClauseToken } from "../tokens/QueryClauseToken";
import { QueryToken } from "../tokens/QueryToken";
import { SubSelectToken } from "../tokens/SubSelectToken";

import { FinishClause } from "./FinishClause";
import { _constraintTransformer } from "./fns/utils";
import { OrderClause } from "./OrderClause";
import { cloneSolutionModifierContainer } from "./SolutionModifierClause";


/**
 * Interface with the methods available to make a HAVING statement.
 */
export interface HavingClause<T extends FinishClause> extends OrderClause<T> {
	/**
	 * Set the conditions to filter the sequence of solutions the query will
	 * retrieve.
	 *
	 * @param condition First required condition to be applied to the solutions filtering.
	 * @param restConditions Optional conditions to also be applied to the solutions filtering.
	 *
	 * @returns Object with the methods to keep constructing the query.
	 */
	having( condition:Expression | SupportedNativeTypes, ...restConditions:(Expression | SupportedNativeTypes)[] ):OrderClause<T> & T;
	/**
	 * Set the conditions to filter the sequence of solutions the query will
	 * retrieve.
	 *
	 * @param conditionsFn Function that create the conditions to be applied
	 * to the solutions filtering.
	 *
	 * @returns Object with the methods to keep constructing the query.
	 */
	having( conditionsFn:( builder:GeneralBuilder ) => (Expression | SupportedNativeTypes) | (Expression | SupportedNativeTypes)[] ):OrderClause<T> & T;
}


type SupportedTypes = Expression | SupportedNativeTypes;

/**
 * Function that creates the {@link HavingClause.having} function.
 *
 * @param genericFactory The factory for the generic {@link FinishClause}
 * that the {@link HavingClause} receives.
 * @param container The container with the query data of the statement.
 *
 * @returns The {@link HavingClause.having} function.
 *
 * @private
 */
function getHavingFn<C extends Container<QueryToken<QueryClauseToken> | SubSelectToken>, T extends FinishClause>( genericFactory:Factory<C, T>, container:C ):HavingClause<T>[ "having" ] {
	return ( conditionOrFn:SupportedTypes | (( builder:GeneralBuilder ) => SupportedTypes | SupportedTypes[]), ...restConditions:SupportedTypes[] ) => {
		const targetToken:HavingToken = new HavingToken( [] );
		const newContainer = cloneSolutionModifierContainer( container, targetToken );

		if( typeof conditionOrFn === "function" ) {
			// Create conditions from function
			const builder = newContainer.getBuilder();
			const fnConditions = conditionOrFn.call( undefined, builder );
			restConditions = Array.isArray( fnConditions ) ? fnConditions : [ fnConditions ];

		} else if( conditionOrFn ) {
			// Return first condition to array
			restConditions.unshift( conditionOrFn );
		}

		const transformer = _constraintTransformer( newContainer );
		restConditions.forEach( condition => {
			const conditionToken = transformer( condition );
			targetToken.conditions.push( conditionToken );
		} );

		const orderClause:OrderClause<T> = OrderClause.createFrom( genericFactory, newContainer, {} );
		return genericFactory( newContainer, orderClause );
	}
}


/**
 * Constant with the utils for {@link HavingClause} objects.
 */
export const HavingClause:{
	/**
	 * Factory function that allows to crete a {@link HavingClause}
	 * from the {@param object} provided.
	 *
	 * @param genericFactory The factory to create the generic finish
	 * of the {@link HavingClause} statement.
	 * @param container The related container with the data for the
	 * {@link HavingClause} statement.
	 * @param object The base base from where to create the
	 * {@link HavingClause} statement.
	 *
	 * @return The {@link HavingClause} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<QueryToken<QueryClauseToken> | SubSelectToken>, T extends FinishClause, O extends object>( genericFactory:Factory<typeof container, T>, container:C, object:O ):O & HavingClause<T>;
} = {
	createFrom<C extends Container<QueryToken<QueryClauseToken> | SubSelectToken>, T extends FinishClause, O extends object>( genericFactory:Factory<typeof container, T>, container:C, object:O ):O & HavingClause<T> {
		return OrderClause.createFrom( genericFactory, container, Object.assign( object, {
			having: getHavingFn( genericFactory, container ),
		} ) );
	},
};
