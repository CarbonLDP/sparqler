import { Container } from "../data/Container";

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
	 * Return the same result as {@link FinishClause.toPrettyString}
	 */
	toString():string;


	debug( debugFn:( query:this, container:Container<TokenNode> ) => any ):this;
}


/**
 * Constant with the utils for {@link FinishClause} objects.
 */
export const FinishClause = {
	createFrom<O extends object>( container:Container<TokenNode>, object:O ):O & FinishClause {
		const toPrettyString:FinishClause[ "toPrettyString" ] = () =>
			container.targetToken.toString( 0 );

		const debug:FinishClause[ "debug" ] = debugFn => {
			debugFn.call( void 0, object, container );
			return object as O & FinishClause;
		};

		return Object.assign<O, FinishClause>( object, {
			toCompactString: () => container.targetToken.toString(),
			toPrettyString: toPrettyString,
			toString: toPrettyString,
			debug,
		} );
	}
};