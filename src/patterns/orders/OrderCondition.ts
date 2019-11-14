import { Container } from "../../core/containers/Container";

import { ExplicitOrderConditionToken } from "../../tokens/ExplicitOrderConditionToken";


/**
 * Object that sets and specific order for a condition to be used
 * in {@link OrderClause#orderBy}.
 */
export interface OrderCondition {
	_getOrderCondition():ExplicitOrderConditionToken;
}


/**
 * Constant with the utils for {@link OrderCondition} objects.
 */
export const OrderCondition:{
	/**
	 * Factory function that allows to crete a {@link OrderCondition}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link OrderCondition} statement.
	 * @param object The base base from where to create the
	 * {@link OrderCondition} statement.
	 *
	 * @return The {@link OrderCondition} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<ExplicitOrderConditionToken>, O extends object>( container:C, object:O ):O & OrderCondition;
} = {
	createFrom<C extends Container<ExplicitOrderConditionToken>, O extends object>( container:C, object:O ):O & OrderCondition {
		return Object.assign( object, {
			_getOrderCondition: () => container.targetToken,
		} );
	},
};
