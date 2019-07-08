import { Container } from "../../data/Container";
import { ExpressionToken } from "../../tokens/ExpressionToken";

export interface Expression {
	getExpression():ExpressionToken;
}

/**
 * Constant with the utils for {@link Expression} objects.
 */
export const Expression:{
	/**
	 * Factory function that allows to crete a {@link Expression}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link Expression} statement.
	 *
	 * @return The {@link Expression} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<ExpressionToken>, O extends object>( container:C, object:O ):O & Expression;
} = {
	createFrom<C extends Container<ExpressionToken>, O extends object>( container:C, object:O ):O & Expression {
		return Object.assign( object, {
			getExpression: () => container.targetToken,
		} );
	}
};