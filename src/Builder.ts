import { Container } from "./data/Container";
import { Factory } from "./data/Factory";
import { IRIResolver } from "./data/IRIResolver";

import { Expression } from "./expressions/Expression";
import { ExpressionsBuilder } from "./expressions/ExpressionsBuilder";
import { getUnaryOperationFn } from "./expressions/fns/operationFn";

import { PathsBuilder } from "./paths/PathsBuilder";

import { MinusPattern } from "./patterns/notTriplePatterns/MinusPattern";
import { getMinusFn, NotTriplePatternsBuilder } from "./patterns/notTriplePatterns/NotTriplePatternsBuilder";

import { Pattern } from "./patterns/Pattern";
import { PatternBuilder } from "./patterns/PatternBuilder";

import { SupportedNativeTypes } from "./SupportedNativeTypes";


/**
 * Helper builder for generate all the SPARQLER objects.
 */
export interface Builder extends PatternBuilder, PathsBuilder, ExpressionsBuilder {
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
 * Constant with the utils for {@link Builder} objects.
 */
export const Builder:{
	/**
	 * Function that crete a {@link Builder}.
	 *
	 * @param iriResolver The iri resolver that will use the
	 * pattern builder.
	 *
	 * @return The {@link Builder} created.
	 */
	create( iriResolver:IRIResolver ):Builder;
	/**
	 * Factory function that allows to crete a {@link Builder}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link Builder} statement.
	 * @param object The base base from where to create the
	 * {@link Builder} statement.
	 *
	 * @return The {@link Builder} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<undefined>, O extends object>( container:C, object:O ):O & Builder;
} = {
	create( iriResolver:IRIResolver ):Builder {
		const container:Container<undefined> = new Container( {
			iriResolver,
			targetToken: void 0,
		} );

		return Builder
			.createFrom( container, {} );
	},

	createFrom<C extends Container<undefined>, O extends object>( container:C, object:O ):O & Builder {
		return Factory.createFrom(
			PatternBuilder.createFrom,
			PathsBuilder.createFrom,
			ExpressionsBuilder.createFrom,
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
