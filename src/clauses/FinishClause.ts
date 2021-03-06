import { Container } from "../core/containers/Container";

import { TokenNode } from "../tokens/TokenNode";


/**
 * Interface with methods to construct the final SPARQL query string.
 */
export interface FinishClause {
	/**
	 * Constructs a compact SPARQL query string.
	 *
	 * Tries to minimize the optional elements and the blank spaces
	 * between the elements of the query.
	 *
	 * @returns The compact string.
	 */
	toCompactString():string;

	/**
	 * Constructs a pretty SPARQL query string.
	 *
	 * Prints the statements with indentation and also print all the
	 * elements even if their are optional ones.
	 *
	 * @returns The pretty string.
	 */
	toPrettyString():string;

	/**
	 * Return the same result as {@link FinishClause#toPrettyString `FinishClause.toPrettyString`}
	 */
	// TODO: Fix link syntax
	toString():string;


	debug( debugFn:( query:this, container:Container<TokenNode> ) => any ):this;
}


/**
 * Constant with the utils for {@link FinishClause} objects.
 */
export const FinishClause:{
	/**
	 * Factory function that allows to crete a {@link FinishClause}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link FinishClause} statement.
	 * @param object The base base from where to create the
	 * {@link FinishClause} statement.
	 *
	 * @return The {@link FinishClause} statement created from the
	 * {@param object} provided.
	 */
	createFrom<O extends object>( container:Container<TokenNode>, object:O ):O & FinishClause;
} = {
	createFrom<O extends object>( container:Container<TokenNode>, object:O ):O & FinishClause {
		const toPrettyString:FinishClause[ "toPrettyString" ] = () =>
			container.targetToken.toString( 0 );

		const debug:FinishClause[ "debug" ] = debugFn => {
			const futureClause:O & FinishClause = object as O & FinishClause;
			debugFn.call( void 0, futureClause, container );

			return futureClause;
		};

		return Object.assign<O, FinishClause>( object, {
			toCompactString: () => container.targetToken.toString(),
			toPrettyString: toPrettyString,
			toString: toPrettyString,
			debug,
		} );
	}
};
