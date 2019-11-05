import { Container } from "../../core/containers/Container";
import { Factory } from "../../core/factories/Factory";

import { VariableToken } from "../../tokens/VariableToken";

import { Expression } from "../expressions/Expression";
import { Projectable } from "../expressions/Projectable";

import { TripleSubject } from "./TripleSubject";


/**
 * Wrapper for easier usage of SPARQL variables as objects and for
 * declaring triple pattern as its subject.
 */
export interface Variable extends TripleSubject<VariableToken>, Expression<VariableToken>, Projectable<VariableToken> {}


/**
 * Constant with the utils for {@link Variable} objects.
 */
export const Variable:{
	/**
	 * Factory function that allows to crete a {@link Variable}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link Variable} statement.
	 * @param object The base base from where to create the
	 * {@link Variable} statement.
	 *
	 * @return The {@link Variable} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<VariableToken>, O extends object>( container:C, object:O ):O & Variable;
} = {
	createFrom: Factory.createFrom<Container<VariableToken>,
		TripleSubject<VariableToken>,
		Expression<VariableToken>,
		Projectable<VariableToken>>
	(
		TripleSubject.createFrom,
		Expression.createFrom,
		Projectable.createFrom,
	),
};
