import { Container } from "../data/Container";
import { Factory } from "../data/Factory";
import { IRIResolver } from "../data/IRIResolver";

import { SubSelectPattern } from "./clausePatterns/SubSelectPattern";
import { NotTriplePatternsBuilder } from "./notTriplePatterns/NotTriplePatternsBuilder";
import { PathsBuilder } from "./paths/PathsBuilder";
import { TriplePatternsBuilder } from "./triplePatterns/TriplePatternsBuilder";


/**
 * Helper builder for generate patters.
 */
export interface PatternBuilder extends TriplePatternsBuilder, NotTriplePatternsBuilder, SubSelectPattern, PathsBuilder {
}


/**
 * Constant with the utils for {@link PatternBuilder} objects.
 */
export const PatternBuilder:{
	/**
	 * Function that crete a {@link PatternBuilder}.
	 *
	 * @param iriResolver The iri resolver that will use the
	 * pattern builder.
	 *
	 * @return The {@link PatternBuilder} created.
	 */
	create( iriResolver:IRIResolver ):PatternBuilder;
	/**
	 * Factory function that allows to crete a {@link PatternBuilder}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link PatternBuilder} statement.
	 * @param object The base base from where to create the
	 * {@link PatternBuilder} statement.
	 *
	 * @return The {@link PatternBuilder} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<undefined>, O extends object>( container:C, object:O ):O & PatternBuilder;
} = {
	create( iriResolver:IRIResolver ):PatternBuilder {
		const container:Container<undefined> = new Container( {
			iriResolver,
			targetToken: void 0,
		} );

		return PatternBuilder
			.createFrom( container, {} );
	},

	createFrom<C extends Container<undefined>, O extends object>( container:C, object:O ):O & PatternBuilder {
		return Factory.createFrom(
			TriplePatternsBuilder.createFrom,
			NotTriplePatternsBuilder.createFrom,
			SubSelectPattern.createFrom,
			PathsBuilder.createFrom,
		)( container, object );
	},
};