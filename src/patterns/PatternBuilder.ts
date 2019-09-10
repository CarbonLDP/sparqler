import { Container } from "../core/containers/Container";
import { Factory } from "../core/factories/Factory";

import { SubSelectPattern } from "./clausePatterns/SubSelectPattern";
import { Expression } from "./expressions/Expression";
import { ExpressionsBuilder } from "./expressions/ExpressionsBuilder";
import { getUnaryOperationFn } from "./expressions/fns/operationFn";
import { MinusPattern } from "./notTriplePatterns/MinusPattern";
import { getMinusFn, NotTriplePatternsBuilder } from "./notTriplePatterns/NotTriplePatternsBuilder";
import { OrderBuilder } from "./orders/OrderBuilder";
import { PathsBuilder } from "./paths/PathsBuilder";
import { Pattern } from "./Pattern";
import { SupportedNativeTypes } from "./SupportedNativeTypes";
import { TriplePatternsBuilder } from "./triplePatterns/TriplePatternsBuilder";


// TODO: Rename to PatternsBuilder
/**
 * Helper builder for generate patters.
 */
export interface PatternBuilder extends TriplePatternsBuilder, NotTriplePatternsBuilder, SubSelectPattern, PathsBuilder, ExpressionsBuilder, OrderBuilder {
	/**
	 * Creates an operation {@link Expression} that returns the numeric
	 * {@param expression} with its sing reversed.
	 *
	 * _Conflict with {@link NotTriplePatternsBuilder.minus}_
	 * See {@link OperationExpressionsBuilder.minus} for the original method.
	 *
	 * @param expression - Numeric expression to return with the sign reversed.
	 */
	minus( expression:Expression | SupportedNativeTypes ):Expression;
	/**
	 * Creates a {@link MinusPattern} for the patterns specified
	 * which will be excluded from the query.
	 *
	 * _Conflict with {@link OperationExpressionsBuilder.minus}_
	 * See {@link NotTriplePatternsBuilder.minus} for the original method.
	 *
	 * @param patterns The patterns to be enclosed in a minus
	 * group.
	 */
	minus( patterns:Pattern | Pattern[] ):MinusPattern;
}


/**
 * Constant with the utils for {@link PatternBuilder} objects.
 */
export const PatternBuilder:{
	/**
	 * Factory function that allows to crete a {@link PatternBuilder}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link PatternBuilder} statement.
	 * @param object The base base from where to create the
	 * {@link PatternBuilder} statement.
	 *
	 * @return The {@link PatternBuilder} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<undefined>, O extends object>( container:C, object:O ):O & PatternBuilder;
} = {
	createFrom<C extends Container<undefined>, O extends object>( container:C, object:O ):O & PatternBuilder {
		return Factory.createFrom(
			TriplePatternsBuilder.createFrom,
			NotTriplePatternsBuilder.createFrom,
			SubSelectPattern.createFrom,
			PathsBuilder.createFrom,
			ExpressionsBuilder.createFrom,
			OrderBuilder.createFrom,
		)( container, Object.assign( object, {
			minus: ( expressionOrPattens:Expression | SupportedNativeTypes | Pattern | Pattern[] ) => {
				if(
					typeof expressionOrPattens === "object" &&
					(
						Array.isArray( expressionOrPattens ) ||
						"getPattern" in expressionOrPattens
					)
				)
					return getMinusFn( container )( expressionOrPattens );

				return getUnaryOperationFn( Expression.createFrom, container, "-" )( expressionOrPattens );
			},
		} ) );
	},
};