import { FinishClause } from "../../clauses/FinishClause";

import { Container } from "../../core/containers/Container";
import { Factory } from "../../core/factories/Factory";

import { SubSelectToken } from "../../tokens/SubSelectToken";

import { Pattern } from "../Pattern";


/**
 * Interface with the methods available to finish a sub-query.
 *
 * Extends {@link FinishClause} to be compatible with the clauses
 * system, and {@link Pattern} with the {@link Pattern#_getPattern `Pattern.getPattern`}
 * method that is the one used to retrieve the sub-query pattern.
 */
export interface FinishPattern extends Pattern<SubSelectToken>, FinishClause {
}


/**
 * Constant with the utils for {@link FinishPattern} objects.
 */
export const FinishPattern:{
	/**
	 * Factory function that allows to crete a {@link FinishPattern}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link FinishPattern} statement.
	 * @param object The base base from where to create the
	 * {@link FinishPattern} statement.
	 *
	 * @return The {@link FinishPattern} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<SubSelectToken>, O extends object>( container:C, object:O ):O & FinishPattern;
} = {
	createFrom<C extends Container<SubSelectToken>, O extends object>( container:C, object:O ):O & FinishPattern {
		return Factory.createFrom<C, Pattern<SubSelectToken>, FinishClause>(
			Pattern.createFrom,
			FinishClause.createFrom,
		)( container, object );
	},
};
