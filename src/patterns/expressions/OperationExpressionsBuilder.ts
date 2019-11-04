import { Container } from "../../core/containers/Container";

import { AdditiveOperationToken } from "../../tokens/AdditiveOperationToken";
import { ConditionalAndExpressionToken } from "../../tokens/ConditionalAndExpressionToken";
import { ConditionalAndOperationToken } from "../../tokens/ConditionalAndOperationToken";
import { ConditionalOrOperationToken } from "../../tokens/ConditionalOrOperationToken";
import { MultiplicativeExpressionToken } from "../../tokens/MultiplicativeExpressionToken";
import { MultiplicativeOperationToken } from "../../tokens/MultiplicativeOperationToken";
import { NumericExpressionToken } from "../../tokens/NumericExpressionToken";
import { RelationalExpressionToken } from "../../tokens/RelationalExpressionToken";
import { RelationalOperationToken } from "../../tokens/RelationalOperationToken";
import { UnaryExpressionToken } from "../../tokens/UnaryExpressionToken";

import { SupportedNativeTypes } from "../SupportedNativeTypes";

import { Expression } from "./Expression";
import { getBinaryOperationFn, getInclusionFn, getUnaryOperationFn } from "./fns/operationFn";


/**
 * Builder for operation expressions.
 */
export interface OperationExpressionsBuilder {
	/**
	 * Creates an operation {@link Expression} that returns logical ORs
	 * between the {@param leftExpression} and every {@param restExpressions}.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-logical-or
	 * for more information.
	 *
	 * @param leftExpression - Left expression for the logical OR
	 * @param restExpressions - Expressions to construct a logical OR with the previous expression.
	 */
	or( leftExpression:Expression | SupportedNativeTypes, ...restExpressions:(Expression | SupportedNativeTypes)[] ):Expression;
	/**
	 * Creates an operation {@link Expression} that returns logical ANDs
	 * between the {@param leftExpression} and every {@param restExpressions}.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-logical-and
	 * for more information.
	 *
	 * @param leftExpression - Left expression for the logical AND
	 * @param restExpressions - Expressions to construct a logical AND with the previous expression.
	 */
	and( leftExpression:Expression | SupportedNativeTypes, ...restExpressions:(Expression | SupportedNativeTypes)[] ):Expression;

	/**
	 * Creates an operation {@link Expression} that returns `true` if
	 * {@param leftExpression} and {@param rightExpression} are the same RDF term.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-RDFterm-equal
	 * for more information.
	 *
	 * @param leftExpression - Left expression to be compared against the {@param rightExpression}
	 * @param rightExpression - Right expression to be compared against the {@param leftExpression}.
	 */
	equals( leftExpression:Expression | SupportedNativeTypes, rightExpression:Expression | SupportedNativeTypes ):Expression;
	/**
	 * Creates an operation {@link Expression} that returns `true` if
	 * {@param leftExpression} and {@param rightExpression} are NOT the same RDF term.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-RDFterm-equal
	 * for more information.
	 *
	 * @param leftExpression - Left expression to be compared against the {@param rightExpression}
	 * @param rightExpression - Right expression to be compared against the {@param leftExpression}.
	 */
	notEquals( leftExpression:Expression | SupportedNativeTypes, rightExpression:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an operation {@link Expression} that returns `true` if
	 * {@param leftExpression} is less than the {@param rightExpression}.
	 *
	 * See the table *SPARQL Binary Operators* on
	 * https://www.w3.org/TR/sparql11-query/#OperatorMapping for more information.
	 *
	 * @param leftExpression - Left expression to be compared against the {@param rightExpression}
	 * @param rightExpression - Right expression to be compared against the {@param leftExpression}.
	 */
	lt( leftExpression:Expression | SupportedNativeTypes, rightExpression:Expression | SupportedNativeTypes ):Expression;
	/**
	 * Creates an operation {@link Expression} that returns `true` if
	 * {@param leftExpression} is less or equal than the {@param rightExpression}.
	 *
	 * See the table *SPARQL Binary Operators* on
	 * https://www.w3.org/TR/sparql11-query/#OperatorMapping for more information.
	 *
	 * @param leftExpression - Left expression to be compared against the {@param rightExpression}
	 * @param rightExpression - Right expression to be compared against the {@param leftExpression}.
	 */
	lte( leftExpression:Expression | SupportedNativeTypes, rightExpression:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an operation {@link Expression} that returns `true` if
	 * {@param leftExpression} is greater than the {@param rightExpression}.
	 *
	 * See the table *SPARQL Binary Operators* on
	 * https://www.w3.org/TR/sparql11-query/#OperatorMapping for more information.
	 *
	 * @param leftExpression - Left expression to be compared against the {@param rightExpression}
	 * @param rightExpression - Right expression to be compared against the {@param leftExpression}.
	 */
	gt( leftExpression:Expression | SupportedNativeTypes, rightExpression:Expression | SupportedNativeTypes ):Expression;
	/**
	 * Creates an operation {@link Expression} that returns `true` if
	 * {@param leftExpression} is greater or equal than the {@param rightExpression}.
	 *
	 * See the table *SPARQL Binary Operators* on
	 * https://www.w3.org/TR/sparql11-query/#OperatorMapping for more information.
	 *
	 * @param leftExpression - Left expression to be compared against the {@param rightExpression}
	 * @param rightExpression - Right expression to be compared against the {@param leftExpression}.
	 */
	gte( leftExpression:Expression | SupportedNativeTypes, rightExpression:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an operation {@link Expression} that returns true whether
	 * the {@param leftExpression} is equal to any of the {@param rightExpressions} values.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-in
	 * for more information.
	 *
	 * @param leftExpression - Left expression to test against the {@param rightExpressions}.
	 * @param rightExpressions - Expressions to compare its values against {@param leftExpression}.
	 */
	in( leftExpression:Expression | SupportedNativeTypes, ...rightExpressions:(Expression | SupportedNativeTypes)[] ):Expression;
	/**
	 * Creates an operation {@link Expression} that returns true whether
	 * the {@param leftExpression} is NOT equal to any of the {@param rightExpressions} values.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-in
	 * for more information.
	 *
	 * @param leftExpression - Left expression to test against the {@param rightExpressions}.
	 * @param rightExpressions - Expressions to compare its values against {@param leftExpression}.
	 */
	notIn( leftExpression:Expression | SupportedNativeTypes, ...rightExpressions:(Expression | SupportedNativeTypes)[] ):Expression;

	/**
	 * Creates an operation {@link Expression} that returns the arithmetic sum
	 * between the {@param leftExpression} and every {@param restExpressions}.
	 *
	 * See the table *SPARQL Binary Operators* on
	 * https://www.w3.org/TR/sparql11-query/#OperatorMapping for more information.
	 *
	 * @param leftExpression - Left expression for the arithmetic sum
	 * @param restExpressions - Expressions to construct an arithmetic sum with the previous expression.
	 */
	add( leftExpression:Expression | SupportedNativeTypes, ...restExpressions:(Expression | SupportedNativeTypes)[] ):Expression;
	/**
	 * Creates an operation {@link Expression} that returns the arithmetic difference
	 * between the {@param leftExpression} and every {@param restExpressions}.
	 *
	 * See the table *SPARQL Binary Operators* on
	 * https://www.w3.org/TR/sparql11-query/#OperatorMapping for more information.
	 *
	 * @param leftExpression - Left expression for the arithmetic difference
	 * @param restExpressions - Expressions to construct an arithmetic difference with the previous expression.
	 */
	subtract( leftExpression:Expression | SupportedNativeTypes, ...restExpressions:(Expression | SupportedNativeTypes)[] ):Expression;

	/**
	 * Creates an operation {@link Expression} that returns the arithmetic product
	 * between the {@param leftExpression} and every {@param restExpressions}.
	 *
	 * See the table *SPARQL Binary Operators* on
	 * https://www.w3.org/TR/sparql11-query/#OperatorMapping for more information.
	 *
	 * @param leftExpression - Left expression for the arithmetic product
	 * @param restExpressions - Expressions to construct an arithmetic product with the previous expression.
	 */
	multiply( leftExpression:Expression | SupportedNativeTypes, ...restExpressions:(Expression | SupportedNativeTypes)[] ):Expression;
	/**
	 * Creates an operation {@link Expression} that returns the arithmetic quotient
	 * between the {@param leftExpression} and every {@param restExpressions}.
	 *
	 * See the table *SPARQL Binary Operators* on
	 * https://www.w3.org/TR/sparql11-query/#OperatorMapping for more information.
	 *
	 * @param leftExpression - Left expression for the arithmetic quotient
	 * @param restExpressions - Expressions to construct an arithmetic quotient with the previous expression.
	 */
	divide( leftExpression:Expression | SupportedNativeTypes, ...restExpressions:(Expression | SupportedNativeTypes)[] ):Expression;

	/**
	 * Creates an operation {@link Expression} that returns true
	 * if the effective boolean value of the {@param expression} is false.
	 *
	 * See the table *SPARQL Unary Operators* on
	 * https://www.w3.org/TR/sparql11-query/#OperatorMapping for more information.
	 *
	 * @param expression - Expression to return the inverse effective boolean value.
	 */
	not( expression:Expression | SupportedNativeTypes ):Expression;
	/**
	 * Creates an operation {@link Expression} that returns the numeric
	 * {@param expression} with its sing unchanged.
	 *
	 * See the table *SPARQL Unary Operators* on
	 * https://www.w3.org/TR/sparql11-query/#OperatorMapping for more information.
	 *
	 * @param expression - Numeric expression to return with the sign unchanged.
	 */
	plus( expression:Expression | SupportedNativeTypes ):Expression;
	/**
	 * Creates an operation {@link Expression} that returns the numeric
	 * {@param expression} with its sing reversed.
	 *
	 * See the table *SPARQL Unary Operators* on
	 * https://www.w3.org/TR/sparql11-query/#OperatorMapping for more information.
	 *
	 * @param expression - Numeric expression to return with the sign reversed.
	 */
	minus( expression:Expression | SupportedNativeTypes ):Expression;
}


/**
 * Constant with the utils for {@link OperationExpressionsBuilder} objects.
 */
export const OperationExpressionsBuilder:{
	/**
	 * Factory function that allows to crete a {@link OperationExpressionsBuilder}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link OperationExpressionsBuilder} statement.
	 * @param object The base base from where to create the
	 * {@link OperationExpressionsBuilder} statement.
	 *
	 * @return The {@link OperationExpressionsBuilder} statement created from the
	 * {@param object} provided.
	 */
	createFrom<O extends object>( container:Container<undefined>, object:O ):O & OperationExpressionsBuilder;
} = {
	createFrom<O extends object>( container:Container<undefined>, object:O ):O & OperationExpressionsBuilder {
		return Object.assign( object, {
			or: getBinaryOperationFn( Expression.createFrom, container, ConditionalOrOperationToken, ConditionalAndExpressionToken.is, "||" ),
			and: getBinaryOperationFn( Expression.createFrom, container, ConditionalAndOperationToken, RelationalExpressionToken.is, "&&" ),
			equals: getBinaryOperationFn( Expression.createFrom, container, RelationalOperationToken, NumericExpressionToken.is, "=", true ),
			notEquals: getBinaryOperationFn( Expression.createFrom, container, RelationalOperationToken, NumericExpressionToken.is, "!=", true ),
			lt: getBinaryOperationFn( Expression.createFrom, container, RelationalOperationToken, NumericExpressionToken.is, "<", true ),
			lte: getBinaryOperationFn( Expression.createFrom, container, RelationalOperationToken, NumericExpressionToken.is, "<=", true ),
			gt: getBinaryOperationFn( Expression.createFrom, container, RelationalOperationToken, NumericExpressionToken.is, ">", true ),
			gte: getBinaryOperationFn( Expression.createFrom, container, RelationalOperationToken, NumericExpressionToken.is, ">=", true ),
			in: getInclusionFn( Expression.createFrom, container, "IN" ),
			notIn: getInclusionFn( Expression.createFrom, container, "NOT IN" ),
			add: getBinaryOperationFn( Expression.createFrom, container, AdditiveOperationToken, MultiplicativeExpressionToken.is, "+" ),
			subtract: getBinaryOperationFn( Expression.createFrom, container, AdditiveOperationToken, MultiplicativeExpressionToken.is, "-" ),
			multiply: getBinaryOperationFn( Expression.createFrom, container, MultiplicativeOperationToken, UnaryExpressionToken.is, "*" ),
			divide: getBinaryOperationFn( Expression.createFrom, container, MultiplicativeOperationToken, UnaryExpressionToken.is, "/" ),
			not: getUnaryOperationFn( Expression.createFrom, container, "!" ),
			plus: getUnaryOperationFn( Expression.createFrom, container, "+" ),
			minus: getUnaryOperationFn( Expression.createFrom, container, "-" ),
		} )
	},
};