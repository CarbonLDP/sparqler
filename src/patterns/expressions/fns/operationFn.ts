import { Container } from "../../../data/Container";
import { cloneElement } from "../../../data/utils";

import { BinaryOperationToken } from "../../../tokens/BinaryOperationToken";
import { BracketedExpressionToken } from "../../../tokens/BracketedExpressionToken";
import { ExpressionToken } from "../../../tokens/ExpressionToken";
import { InclusionExpressionToken } from "../../../tokens/InclusionExpressionToken";
import { NumericExpressionToken } from "../../../tokens/NumericExpressionToken";
import { PrimaryExpressionToken } from "../../../tokens/PrimaryExpressionToken";
import { UnaryOperationToken } from "../../../tokens/UnaryOperationToken";

import { Expression } from "../Expression";

import { _expressionTransformerFn, SupportedTypes } from "./utils";


const _getOperandTransformerFn =
	<T extends ExpressionToken>
	( isValid:( value:ExpressionToken ) => value is T ) =>
		( container:Container<any> ) => {
			const transformer = _expressionTransformerFn( container );

			return ( operand:SupportedTypes ) => {
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
	return ( expression:SupportedTypes ) => {
		// Replace argument by the contained
		if( container.targetToken ) {
			expression = container.targetToken;
		}

		const transformer = _getOperandTransformerFn( PrimaryExpressionToken.is )( container );
		const operand = transformer( expression );
		const targetToken = new UnaryOperationToken( operator, operand );

		const newContainer:Container<UnaryOperationToken> =
			cloneElement( container, { targetToken } );

		return Expression.createFrom( newContainer, {} );
	};
}


type BinaryExpressionToken<W extends ExpressionToken, E extends ExpressionToken> = E extends BinaryOperationToken<any, W> ? E : never;

export function getBinaryOperationFn<T extends string, W extends ExpressionToken, B extends BinaryExpressionToken<W, ExpressionToken>>(
	container:Container<ExpressionToken | undefined>,
	TokenClass:new( operator:T, operand:W ) => B,
	isValid:( value:ExpressionToken ) => value is W,
	operator:T,
	limit?:true,
) {
	return ( leftExpression:SupportedTypes, ...restExpression:SupportedTypes[] ) => {
		// Replace first argument by the contained
		if( container.targetToken ) {
			restExpression.unshift( leftExpression );
			leftExpression = container.targetToken;
		}

		const transformer = _getOperandTransformerFn<W>( isValid )( container );
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
}

export function getInclusionFn(
	container:Container<ExpressionToken | undefined>,
	operator:InclusionExpressionToken["operator"],
) {
	return ( expression:SupportedTypes, ...expressions:SupportedTypes[] ) => {
		// Replace first argument by the contained
		if( container.targetToken ) {
			expressions.unshift( expression );
			expression = container.targetToken;
		}

		const transformer = _getOperandTransformerFn( NumericExpressionToken.is )( container );
		const operand = transformer( expression );

		const baseTransformer = _expressionTransformerFn( container );
		const operands = expressions.map( baseTransformer );

		const targetToken = new InclusionExpressionToken( operator, operand, operands );

		const newContainer:Container<InclusionExpressionToken> =
			cloneElement( container, { targetToken } );

		return Expression.createFrom( newContainer, {} );
	};
}
