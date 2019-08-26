import { Container } from "./core/containers/Container";
import { Factory } from "./core/factories/Factory";
import { IRIResolver } from "./core/iri/IRIResolver";

import { ExpressionsBuilder } from "./expressions/ExpressionsBuilder";
import { PathsBuilder } from "./paths/PathsBuilder";
import { TriplePatternsBuilder } from "./patterns/triplePatterns/TriplePatternsBuilder";


/**
 * Helper builder for generate SPARQLER objects used as values.
 */
export interface ValuesBuilder extends TriplePatternsBuilder, PathsBuilder, ExpressionsBuilder {
}


/**
 * Constant with the utils for {@link ValuesBuilder} objects.
 */
export const ValuesBuilder:{
	/**
	 * Function that crete a {@link ValuesBuilder}.
	 *
	 * @param iriResolver The iri resolver that will use the
	 * pattern builder.
	 *
	 * @return The {@link ValuesBuilder} created.
	 */
	create( iriResolver:IRIResolver ):ValuesBuilder;
	/**
	 * Factory function that allows to crete a {@link ValuesBuilder}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link ValuesBuilder} statement.
	 * @param object The base base from where to create the
	 * {@link ValuesBuilder} statement.
	 *
	 * @return The {@link ValuesBuilder} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<undefined>, O extends object>( container:C, object:O ):O & ValuesBuilder;
} = {
	create( iriResolver:IRIResolver ):ValuesBuilder {
		const container:Container<undefined> = new Container( {
			iriResolver,
			targetToken: void 0,
		} );

		return ValuesBuilder
			.createFrom( container, {} );
	},

	createFrom<C extends Container<undefined>, O extends object>( container:C, object:O ):O & ValuesBuilder {
		return Factory.createFrom(
			TriplePatternsBuilder.createFrom,
			PathsBuilder.createFrom,
			ExpressionsBuilder.createFrom,
		)( container, object );
	},
};
