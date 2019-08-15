import { Container } from "../../../data/Container";
import { cloneElement } from "../../../data/utils";
import { BinaryOperationToken } from "../../../tokens/BinaryOperationToken";
import { BracketedExpressionToken } from "../../../tokens/BracketedExpressionToken";
import { ExpressionToken } from "../../../tokens/ExpressionToken";
import { InclusionExpressionToken } from "../../../tokens/InclusionExpressionToken";
import { NumericExpressionToken } from "../../../tokens/NumericExpressionToken";
import { PrimaryExpressionToken } from "../../../tokens/PrimaryExpressionToken";
import { UnaryOperationToken } from "../../../tokens/UnaryOperationToken";
import { SupportedNativeTypes } from "../../SupportedNativeTypes";
import { Expression } from "../Expression";
import { _getTransformer } from "../utils";


type SupportedParameter = Expression | SupportedNativeTypes | ExpressionToken;


const _expressionTransformerFn =
	_getTransformer<Expression>( "getExpression" );

const _getOperandTransformerFn =
	<T extends ExpressionToken>
	( isValid:( value:ExpressionToken ) => value is T ) =>
		( container:Container<any> ) => {
			const transformer = _expressionTransformerFn( container );

			return ( operand:SupportedParameter ) => {
				const token = transformer( operand );

				return isValid( token ) ? token
					: new BracketedExpressionToken( token ) as T;
			}
		}
;


export function getUnaryOperationFn(
	container:Container<ExpressionToken | undefined>,
	operator:UnaryOperationToken["operator"],
) {
	const transformer = _getOperandTransformerFn( PrimaryExpressionToken.is )( container );

	const operationFn = ( expression:SupportedParameter ) => {
		const operand = transformer( expression );
		const targetToken = new UnaryOperationToken( operator, operand );

		const newContainer:Container<UnaryOperationToken> =
			cloneElement( container, { targetToken } );

		return Expression.createFrom( newContainer, {} );
	};

	return container.targetToken
		? () => operationFn( container.targetToken! )
		: operationFn;
}


type BinaryExpressionToken<W extends ExpressionToken, E extends ExpressionToken> = E extends BinaryOperationToken<any, W> ? E : never;

export function getBinaryOperationFn<T extends string, W extends ExpressionToken, B extends BinaryExpressionToken<W, ExpressionToken>>(
	container:Container<ExpressionToken | undefined>,
	TokenClass:new( operator:T, operand:W ) => B,
	isValid:( value:ExpressionToken ) => value is W,
	operator:T,
	limit?:true,
) {
	const transformer = _getOperandTransformerFn<W>( isValid )( container );

	const operationFn = ( leftExpression:SupportedParameter, ...restExpression:SupportedParameter[] ) => {
		const leftOperand = transformer( leftExpression );
		const targetToken = new TokenClass( operator, leftOperand );

		if( limit ) restExpression =
			restExpression.slice( 0, 1 );

		restExpression
			.map( transformer )
			.forEach( targetToken.addOperand, targetToken );

		const newContainer:Container<B> =
			cloneElement( container, { targetToken } );

		return Expression.createFrom( newContainer, {} );
	};

	return container.targetToken
		? ( operand:SupportedParameter ) => operationFn( container.targetToken!, operand )
		: operationFn;
}

export function getInclusionFn(
	container:Container<ExpressionToken | undefined>,
	operator:InclusionExpressionToken["operator"],
) {
	const transformer = _getOperandTransformerFn( NumericExpressionToken.is )( container );

	const operationFn = ( expression:SupportedParameter, ...expressions:SupportedParameter[] ) => {
		const operand = transformer( expression );
		const operands = expressions.map( transformer );

		const targetToken = new InclusionExpressionToken( operator, operand, operands );

		const newContainer:Container<InclusionExpressionToken> =
			cloneElement( container, { targetToken } );

		return Expression.createFrom( newContainer, {} );
	};

	return container.targetToken
		? ( ...expressions:SupportedParameter[] ) => operationFn( container.targetToken!, ...expressions )
		: operationFn;
}
