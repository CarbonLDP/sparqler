import { Container } from "../../data/Container";

import { ObjectToken } from "../../tokens/ObjectToken";
import { TripleToken } from "../../tokens/TripleToken";


/**
 * Object that contains a specific triple subject token.
 */
export interface TriplePattern<T extends ObjectToken> {
	/**
	 * Return the subject token of the triple.
	 */
	getSubject():T;
}


/**
 * Constant with the utils for {@link TriplePattern} objects.
 */
export const TriplePattern:{
	/**
	 * Factory function that allows to crete a {@link TriplePattern}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link TriplePattern} statement.
	 * @param object The base base from where to create the
	 * {@link TriplePattern} statement.
	 *
	 * @return The {@link TriplePattern} statement created from the
	 * {@param object} provided.
	 */
	createFrom<T extends ObjectToken, C extends Container<TripleToken<T>>, O extends object>( container:C, object:O ):O & TriplePattern<T>;
} = {
	createFrom<T extends ObjectToken, C extends Container<TripleToken<T>>, O extends object>( container:C, object:O ):O & TriplePattern<T> {
		return Object.assign( object, {
			getSubject: () => container.targetToken.subject,
		} );
	}
};
