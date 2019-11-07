import { Container } from "../core/containers/Container";
import { Factory } from "../core/factories/Factory";

import { SubSelectPattern } from "./clausePatterns/SubSelectPattern";
import { Expression } from "./expressions/Expression";
import { ExpressionsBuilder } from "./expressions/ExpressionsBuilder";
import { MinusPattern } from "./notTriplePatterns/MinusPattern";
import { NotTriplePatternsBuilder } from "./notTriplePatterns/NotTriplePatternsBuilder";
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
	 * _Conflict with {@link NotTriplePatternsBuilder#minus `NotTriplePattersBuilder.minus`}_
	 * See {@link OperationExpressionsBuilder#minus `OperationExpressionsBuilder.minus`} for the original method.
	 *
	 * @param expression - Numeric expression to return with the sign reversed.
	 */
	//TODO: Fix link syntax
	minus( expression:Expression | SupportedNativeTypes ):Expression;
	/**
	 * Creates a {@link MinusPattern} for the patterns specified
	 * which will be excluded from the query.
	 *
	 * _Conflict with {@link OperationExpressionsBuilder#minus `OperationExpressionsBuilder.minus`}_
	 * See {@link NotTriplePatternsBuilder#minus `NotTriplePattersBuilder.minus`} for the original method.
	 *
	 * @param patterns The patterns to be enclosed in a minus
	 * group.
	 */
	//TODO: Fix link syntax
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
		const patternBuilder = Factory.createFrom(
			TriplePatternsBuilder.createFrom,
			NotTriplePatternsBuilder.createFrom
		)( container, object );

		const _patternSupper = Object.assign( {}, patternBuilder );

		const fullBuilder = Factory.createFrom(
			SubSelectPattern.createFrom,
			PathsBuilder.createFrom,
			ExpressionsBuilder.createFrom,
			OrderBuilder.createFrom,
		)( container, patternBuilder );

		const _expressionSupper = Object.assign( {}, fullBuilder );

		return Object.assign( fullBuilder, {
			minus: ( expressionOrPattens:Expression | SupportedNativeTypes | Pattern | Pattern[] ) => {
				if( typeof expressionOrPattens === "object" && (
					Array.isArray( expressionOrPattens ) ||
					"getPattern" in expressionOrPattens
				) ) return _patternSupper.minus( expressionOrPattens );

				return _expressionSupper.minus( expressionOrPattens );
			},
		} );
	},
};
