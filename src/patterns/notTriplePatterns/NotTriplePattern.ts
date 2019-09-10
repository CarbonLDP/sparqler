import { Container } from "../../core/containers/Container";

import { NotTripleToken } from "../../tokens/NotTripleToken";

import { Pattern } from "../Pattern";


/**
 * Object that contains a pattern made from a non triple statement.
 */
export interface NotTriplePattern<T extends NotTripleToken = NotTripleToken> extends Pattern<T> {
}


/**
 * Constant with utils for {@link NotTriplePattern} objects.
 */
export const NotTriplePattern:{
	/**
	 * Factory function that allows to crete a {@link NotTriplePattern}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link NotTriplePattern} statement.
	 * @param object The base base from where to create the
	 * {@link NotTriplePattern} statement.
	 *
	 * @return The {@link NotTriplePattern} statement created from the
	 * {@param object} provided.
	 */
	createFrom<T extends NotTripleToken, C extends Container<T>, O extends object>( container:C, object:O ):O & NotTriplePattern<T>;
} = {
	createFrom: Pattern.createFrom,
};
