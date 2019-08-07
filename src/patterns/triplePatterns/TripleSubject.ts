import { Container } from "../../data/Container";
import { Factory } from "../../data/Factory";

import { ObjectToken } from "../../tokens/ObjectToken";
import { TripleToken } from "../../tokens/TripleToken";

import { PropertyBuilder } from "./PropertyBuilder";
import { TriplePattern } from "./TriplePattern";


/**
 * Object that contains a specific triple subject and allows to
 * create patterns for it.
 */
export interface TripleSubject<T extends ObjectToken> extends PropertyBuilder<TriplePattern<T>> {
	/**
	 * Return the subject token of the triple.
	 */
	getSubject():T;
}


/**
 * Constant with the utils for {@link TripleSubject} objects.
 */
export const TripleSubject:{
	/**
	 * Factory function that allows to crete a {@link TripleSubject}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link TripleSubject} statement.
	 * @param object The base base from where to create the
	 * {@link TripleSubject} statement.
	 *
	 * @return The {@link TripleSubject} statement created from the
	 * {@param object} provided.
	 */
	createFrom<T extends ObjectToken, C extends Container<T>, C2 extends Container<TripleToken<T>>, O extends object>( container:C, object:O ):O & TripleSubject<T>;
} = {
	createFrom<T extends ObjectToken, C extends Container<T>, C2 extends Container<TripleToken<T>>, O extends object>( container:C, object:O ):O & TripleSubject<T> {
		const triplePatternFactory:Factory<C2, TriplePattern<T>> = TriplePattern.createFrom;
		return PropertyBuilder.createFrom( triplePatternFactory, container, Object.assign( object, {
			getSubject: () => container.targetToken,
		} ) );
	}
};
