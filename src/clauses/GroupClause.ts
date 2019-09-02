import { Container } from "../core/containers/Container";
import { Factory } from "../core/factories/Factory";
import { _is } from "../core/transformers";

import { Expression } from "../patterns/expressions/Expression";
import { Projectable } from "../patterns/expressions/Projectable";

import { GeneralBuilder } from "../GeneralBuilder";
import { SupportedNativeTypes } from "../patterns/SupportedNativeTypes";

import { GroupToken } from "../tokens/GroupToken";
import { QueryClauseToken } from "../tokens/QueryClauseToken";
import { QueryToken } from "../tokens/QueryToken";
import { SubSelectToken } from "../tokens/SubSelectToken";

import { FinishClause } from "./FinishClause";
import { _constraintTransformer } from "./fns/utils";
import { HavingClause } from "./HavingClause";
import { cloneSolutionModifierContainer } from "./SolutionModifierClause";


/**
 * Interface with the methods available to make a GROUP BY statement.
 */
export interface GroupClause<T extends FinishClause> extends HavingClause<T> {
	/**
	 * Set the conditions to divide the solutions returned by the query
	 * into one or more groups.
	 *
	 * @param condition First required condition to be applied to the solutions grouping.
	 * @param restConditions Optional conditions to also be applied to the solutions grouping.
	 *
	 * @returns Object with the methods to keep constructing the query.
	 */
	groupBy( condition:Expression | Projectable | SupportedNativeTypes, ...restConditions:(Expression | Projectable | SupportedNativeTypes)[] ):HavingClause<T> & T;
	/**
	 * Set the conditions to divide the solutions returned by the query
	 * into one or more groups.
	 *
	 * @param conditionsFn Function that create the conditions to be applied
	 * to the solutions grouping.
	 *
	 * @returns Object with the methods to keep constructing the query.
	 */
	groupBy( conditionsFn:( builder:GeneralBuilder ) => (Expression | Projectable | SupportedNativeTypes) | (Expression | Projectable | SupportedNativeTypes)[] ):HavingClause<T> & T;
}


type SupportedTypes = Expression | Projectable | SupportedNativeTypes;

/**
 * Function that creates the {@link GroupClause.groupBy} function.
 *
 * @param genericFactory The factory for the generic {@link FinishClause}
 * that the {@link GroupClause} receives.
 * @param container The container with the query data of the statement.
 *
 * @returns The {@link GroupClause.groupBy} function.
 *
 * @private
 */
function getGroupByFn<C extends Container<QueryToken<QueryClauseToken> | SubSelectToken>, T extends FinishClause>( genericFactory:Factory<C, T>, container:C ):GroupClause<T>[ "groupBy" ] {
	return ( conditionOrFn:SupportedTypes | (( builder:GeneralBuilder ) => SupportedTypes | SupportedTypes[]), ...restConditions:SupportedTypes[] ) => {
		const targetToken:GroupToken = new GroupToken( [] );
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
			const conditionToken = _is<Projectable>( condition, "getProjection" )
				? condition.getProjection()
				: transformer( condition );

			targetToken.conditions.push( conditionToken );
		} );

		const havingClause:HavingClause<T> = HavingClause.createFrom( genericFactory, newContainer, {} );
		return genericFactory( newContainer, havingClause );
	}
}


/**
 * Constant with the utils for {@link GroupClause} objects.
 */
export const GroupClause:{
	/**
	 * Factory function that allows to crete a {@link GroupClause}
	 * from the {@param object} provided.
	 *
	 * @param genericFactory The factory to create the generic finish
	 * of the {@link GroupClause} statement.
	 * @param container The related container with the data for the
	 * {@link GroupClause} statement.
	 * @param object The base base from where to create the
	 * {@link GroupClause} statement.
	 *
	 * @return The {@link GroupClause} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<SubSelectToken | QueryToken<QueryClauseToken>>, T extends FinishClause, O extends object>( genericFactory:Factory<typeof container, T>, container:C, object:O ):O & GroupClause<T>;
} = {
	createFrom<C extends Container<SubSelectToken | QueryToken<QueryClauseToken>>, T extends FinishClause, O extends object>( genericFactory:Factory<typeof container, T>, container:C, object:O ):O & GroupClause<T> {
		return HavingClause.createFrom( genericFactory, container, Object.assign( object, {
			groupBy: getGroupByFn( genericFactory, container ),
		} ) );
	},
};
