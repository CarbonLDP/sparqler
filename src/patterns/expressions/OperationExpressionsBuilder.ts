import { Container } from "../../data/Container";
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


export interface OperationExpressionsBuilder {
	or( expression:Expression | SupportedNativeTypes, ...restExpressions:(Expression | SupportedNativeTypes)[] ):Expression;
	and( expression:Expression | SupportedNativeTypes, ...restExpressions:(Expression | SupportedNativeTypes)[] ):Expression;

	equals( leftExpressions:Expression | SupportedNativeTypes, rightExpressions:Expression | SupportedNativeTypes ):Expression;
	notEquals( leftExpressions:Expression | SupportedNativeTypes, rightExpressions:Expression | SupportedNativeTypes ):Expression;

	lt( leftExpressions:Expression | SupportedNativeTypes, rightExpressions:Expression | SupportedNativeTypes ):Expression;
	lte( leftExpressions:Expression | SupportedNativeTypes, rightExpressions:Expression | SupportedNativeTypes ):Expression;

	gt( leftExpressions:Expression | SupportedNativeTypes, rightExpressions:Expression | SupportedNativeTypes ):Expression;
	gte( leftExpressions:Expression | SupportedNativeTypes, rightExpressions:Expression | SupportedNativeTypes ):Expression;

	in( expression:Expression | SupportedNativeTypes, ...restExpressions:(Expression | SupportedNativeTypes)[] ):Expression;
	notIn( expression:Expression | SupportedNativeTypes, ...restExpressions:(Expression | SupportedNativeTypes)[] ):Expression;

	add( expression:Expression | SupportedNativeTypes, ...restExpressions:(Expression | SupportedNativeTypes)[] ):Expression;
	subtract( expression:Expression | SupportedNativeTypes, ...restExpressions:(Expression | SupportedNativeTypes)[] ):Expression;

	multiply( expression:Expression | SupportedNativeTypes, ...restExpressions:(Expression | SupportedNativeTypes)[] ):Expression;
	divide( expression:Expression | SupportedNativeTypes, ...restExpressions:(Expression | SupportedNativeTypes)[] ):Expression;

	not( expression:Expression | SupportedNativeTypes ):Expression;
	plus( expression:Expression | SupportedNativeTypes ):Expression;
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
			or: getBinaryOperationFn( container, ConditionalOrOperationToken, ConditionalAndExpressionToken.is, "||" ),
			and: getBinaryOperationFn( container, ConditionalAndOperationToken, RelationalExpressionToken.is, "&&" ),
			equals: getBinaryOperationFn( container, RelationalOperationToken, NumericExpressionToken.is, "=", true ),
			notEquals: getBinaryOperationFn( container, RelationalOperationToken, NumericExpressionToken.is, "!=", true ),
			lt: getBinaryOperationFn( container, RelationalOperationToken, NumericExpressionToken.is, "<", true ),
			lte: getBinaryOperationFn( container, RelationalOperationToken, NumericExpressionToken.is, "<=", true ),
			gt: getBinaryOperationFn( container, RelationalOperationToken, NumericExpressionToken.is, ">", true ),
			gte: getBinaryOperationFn( container, RelationalOperationToken, NumericExpressionToken.is, ">=", true ),
			add: getBinaryOperationFn( container, AdditiveOperationToken, MultiplicativeExpressionToken.is, "+" ),
			in: getInclusionFn( container, "IN" ),
			notIn: getInclusionFn( container, "NOT IN" ),
			subtract: getBinaryOperationFn( container, AdditiveOperationToken, MultiplicativeExpressionToken.is, "-" ),
			multiply: getBinaryOperationFn( container, MultiplicativeOperationToken, UnaryExpressionToken.is, "*" ),
			divide: getBinaryOperationFn( container, MultiplicativeOperationToken, UnaryExpressionToken.is, "/" ),
			not: getUnaryOperationFn( container, "!" ),
			plus: getUnaryOperationFn( container, "+" ),
			minus: getUnaryOperationFn( container, "-" ),
		} )
	},
};