import { Container } from "../../core/containers/Container";
import { cloneElement } from "../../core/containers/utils";

import { BracketedExpressionToken } from "../../tokens/BracketedExpressionToken";
import { ExplicitOrderConditionToken } from "../../tokens/ExplicitOrderConditionToken";
import { TokenNode } from "../../tokens/TokenNode";

import { Expression } from "../expressions/Expression";
import { _expressionTransformerFn } from "../expressions/fns/utils";

import { SupportedNativeTypes } from "../SupportedNativeTypes";

import { OrderCondition } from "./OrderCondition";


/**
 * Builder that lets you construct an object that sets a specific order
 * in a condition to be used in {@link OrderClause#orderBy}.
 */
export interface OrderBuilder {
	/**
	 * Sets the condition to have an ascending order.
	 *
	 * @param condition Condition to be in ascending order.
	 */
	asc( condition:Expression | SupportedNativeTypes ):OrderCondition;
	/**
	 * Sets the condition to have an descending order.
	 *
	 * @param condition Condition to be in descending order.
	 */
	desc( condition:Expression | SupportedNativeTypes ):OrderCondition;
}


const getOrderFn = ( container:Container<TokenNode | undefined>, flow:"ASC" | "DESC" ) => {
	const transformer = _expressionTransformerFn( container );

	return ( condition:Expression | SupportedNativeTypes ) => {
		let expression = transformer( condition );
		if( expression.token !== "bracketedExpression" ) expression = new BracketedExpressionToken( expression );

		const targetToken = new ExplicitOrderConditionToken( flow, expression );
		const newContainer:Container<ExplicitOrderConditionToken> = cloneElement( container, { targetToken } );

		return OrderCondition.createFrom( newContainer, {} );
	}
};


/**
 * Constant with the utils for {@link OrderBuilder} objects.
 */
export const OrderBuilder:{
	/**
	 * Factory function that allows to crete a {@link OrderBuilder}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link OrderBuilder} statement.
	 * @param object The base base from where to create the
	 * {@link OrderBuilder} statement.
	 *
	 * @return The {@link OrderBuilder} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<any>, O extends object>( container:C, object:O ):O & OrderBuilder;
} = {
	createFrom<C extends Container<any>, O extends object>( container:C, object:O ):O & OrderBuilder {
		return Object.assign( object, {
			asc: getOrderFn( container, "ASC" ),
			desc: getOrderFn( container, "DESC" ),
		} );
	},
};
