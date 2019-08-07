import { Container } from "../../data/Container";
import { Factory } from "../../data/Factory";

import { IRIToken } from "../../tokens/IRIToken";

import { Expression } from "../expressions/Expression";

import { TripleSubject } from "./TripleSubject";


/**
 * Wrapper for easier usage of IRIs and prefixed names as objects
 * and for declaring triple patterns as its subject.
 */
export interface Resource extends TripleSubject<IRIToken>, Expression<IRIToken> {}


/**
 * Constant with the utils for {@link Resource} objects.
 */
export const Resource:{
	/**
	 * Factory function that allows to crete a {@link Resource}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link Resource} statement.
	 * @param object The base base from where to create the
	 * {@link Resource} statement.
	 *
	 * @return The {@link Resource} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<IRIToken>, O extends object>( container:C, object:O ):O & Resource;
} = {
	createFrom: Factory.createFrom<Container<IRIToken>, TripleSubject<IRIToken>, Expression<IRIToken>>(
		TripleSubject.createFrom,
		Expression.createFrom,
	)
};
