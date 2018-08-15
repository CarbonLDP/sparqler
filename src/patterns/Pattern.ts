import { Container } from "../data/Container";

import { PatternToken } from "../tokens/PatternToken";


/**
 * Object that contains any type of pattern.
 */
export interface Pattern<T extends PatternToken = PatternToken> {
	getPattern():T;
}


/**
 * Constant with utils for {@link Pattern} objects.
 */
export const Pattern:{
	/**
	 * Factory function that allows to crete a {@link Pattern}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link Pattern} statement.
	 * @param object The base base from where to create the
	 * {@link Pattern} statement.
	 *
	 * @return The {@link Pattern} statement created from the
	 * {@param object} provided.
	 */
	createFrom<T extends PatternToken, C extends Container<T>, O extends object>( container:C, object:O ):O & Pattern<T>;
} = {
	createFrom<T extends PatternToken, C extends Container<T>, O extends object>( container:C, object:O ):O & Pattern<T> {
		return Object.assign( object, {
			getPattern: () => container.targetToken,
		} );
	},
};
