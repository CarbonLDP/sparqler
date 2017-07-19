import { Container } from "sparqler/clauses/Container";
import { genericDecorator } from "sparqler/clauses/utils";
import { GraphPattern } from "sparqler/patterns";
import { Token } from "sparqler/tokens";

/**
 * Returns the tokens of the that represent the current clause pattern.
 *
 * @returns Array of the tokens of the clause pattern.
 */
function getPattern( this:Container<GraphPattern> ):Token[] {
	return [].concat( this._tokens );
}

/**
 * Decorator that bind the {@link GraphPattern} methods to a container
 * and adds them to the provided object.
 *
 * @param container The container where to bind the respective methods.
 * @param object Object to be decorated with the bound methods.
 * @returns The same object provided that has been decorated.
 */
export function graphPatternDecorator<W extends object>( container:Container<GraphPattern>, object:W ):W & GraphPattern {
	return genericDecorator( { getPattern }, container, object );
}
