import { Container } from "../core/containers/Container";
import { Factory } from "../core/factories/Factory";
import { _is } from "../core/transformers";

import { Expression } from "../patterns/expressions/Expression";
import { Projectable } from "../patterns/expressions/Projectable";
import { OrderCondition } from "../patterns/orders/OrderCondition";
import { PatternBuilder } from "../patterns/PatternBuilder";
import { SupportedNativeTypes } from "../patterns/SupportedNativeTypes";

import { OrderToken } from "../tokens/OrderToken";
import { QueryClauseToken } from "../tokens/QueryClauseToken";
import { QueryToken } from "../tokens/QueryToken";
import { SubSelectToken } from "../tokens/SubSelectToken";

import { FinishClause } from "./FinishClause";
import { _constraintTransformer } from "./fns/utils";
import { LimitOffsetClause } from "./LimitOffsetClause";
import { cloneSolutionModifierContainer } from "./SolutionModifierClause";


/**
 * Interface with the methods available to make a ORDER BY statement.
 */
export interface OrderClause<T extends FinishClause> extends LimitOffsetClause<T> {
	/**
	 * Set conditions to be used as the order of the sequence of solutions the
	 * query will retrieve.
	 *
	 * @param condition First required condition to be applied to the solutions order.
	 * @param restConditions Optional conditions to also be applied to the solutions order.
	 *
	 * @returns Object with the methods to keep constructing the query.
	 */
	orderBy( condition:Expression | OrderCondition | SupportedNativeTypes, ...restConditions:(Expression | OrderCondition | SupportedNativeTypes)[] ):LimitOffsetClause<T> & T;
	/**
	 * Set conditions to be used as the order of the sequence of solutions the
	 * query will retrieve.
	 *
	 * @param conditionsFn Function that create the conditions to be applied
	 * to the solutions order.
	 *
	 * @returns Object with the methods to keep constructing the query.
	 */
	orderBy( conditionsFn:( builder:PatternBuilder ) => (Expression | OrderCondition | SupportedNativeTypes) | (Expression | OrderCondition | SupportedNativeTypes)[] ):LimitOffsetClause<T> & T;
}


type SupportedTypes = Expression | OrderCondition | SupportedNativeTypes;


/**
 * Function that creates the {@link OrderClause.orderBy} function.
 *
 * @param genericFactory The factory for the generic {@link FinishClause}
 * that the {@link OrderClause} receives.
 * @param container The container with the query data of the statement.
 *
 * @returns The {@link OrderClause.orderBy} function.
 *
 * @private
 */
function getOrderByFn<C extends Container<QueryToken<QueryClauseToken> | SubSelectToken>, T extends FinishClause>( genericFactory:Factory<C, T>, container:C ):OrderClause<T>[ "orderBy" ] {
	return ( conditionOrFn:SupportedTypes | (( builder:PatternBuilder ) => SupportedTypes | SupportedTypes[]), ...restConditions:SupportedTypes[] ) => {
		const targetToken:OrderToken = new OrderToken( [] );
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

		const baseTransformer = _constraintTransformer( newContainer );
		const transformer = ( condition:SupportedTypes ) => {
			if( _is<Projectable>( condition, "getProjection" ) ) {
				const projection = condition.getProjection();
				if( projection.token === "variable" ) return projection;
			}

			return _is<OrderCondition>( condition, "getOrderCondition" )
				? condition.getOrderCondition()
				: baseTransformer( condition );
		};

		restConditions.forEach( condition => {
			let conditionToken = transformer( condition );
			targetToken.conditions.push( conditionToken );
		} );

		const limitOffsetClause:LimitOffsetClause<T> = LimitOffsetClause.createFrom( genericFactory, newContainer, {} );
		return genericFactory( newContainer, limitOffsetClause );
	};
}


/**
 * Constant with the utils for {@link OrderClause} objects.
 */
export const OrderClause:{
	/**
	 * Factory function that allows to crete a {@link OrderClause}
	 * from the {@param object} provided.
	 *
	 * @param genericFactory The factory to create the generic finish
	 * of the {@link OrderClause} statement.
	 * @param container The related container with the data for the
	 * {@link OrderClause} statement.
	 * @param object The base base from where to create the
	 * {@link OrderClause} statement.
	 *
	 * @return The {@link OrderClause} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<QueryToken<QueryClauseToken> | SubSelectToken>, T extends FinishClause, O extends object>( genericFactory:Factory<typeof container, T>, container:C, object:O ):O & OrderClause<T>;
} = {
	createFrom<C extends Container<QueryToken<QueryClauseToken> | SubSelectToken>, T extends FinishClause, O extends object>( genericFactory:Factory<typeof container, T>, container:C, object:O ):O & OrderClause<T> {
		return LimitOffsetClause.createFrom( genericFactory, container, Object.assign( object, {
			orderBy: getOrderByFn( genericFactory, container ),
		} ) );
	}
};
