import { Container } from "../../data/Container";
import { Factory } from "../../data/Factory";

import { LiteralToken } from "../../tokens/LiteralToken";

import { Expression } from "../expressions/Expression";

import { TripleSubject } from "./TripleSubject";


/**
 * Wrapper for easier usage of SPARQL Literals as objects and for
 * declaring triple patterns as its subject.
 */
export interface Literal extends TripleSubject<LiteralToken>, Expression<LiteralToken> {}


/**
 * Constant with the utils for {@link Literal} objects.
 */
export const Literal:{
	/**
	 * Factory function that allows to crete a {@link Literal}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link Literal} statement.
	 * @param object The base base from where to create the
	 * {@link Literal} statement.
	 *
	 * @return The {@link Literal} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<LiteralToken>, O extends object>( container:C, object:O ):O & Literal;
} = {
	createFrom: Factory.createFrom<Container<LiteralToken>, TripleSubject<LiteralToken>, Expression<LiteralToken>>(
		TripleSubject.createFrom,
		Expression.createFrom,
	)
};

