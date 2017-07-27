import { SubFinishClause } from "sparqler/clauses";
import { Container } from "sparqler/clauses/Container";
import { genericDecorator } from "sparqler/clauses/utils";
import {
	CLOSE_MULTI_BLOCK,
	OPEN_MULTI_BLOCK,
} from "sparqler/patterns/tokens";
import { Token } from "sparqler/tokens";

/**
 * Returns the tokens of the that represent all the subSelect clause
 * pattern.
 *
 * @returns Array of the tokens of the clause pattern.
 */
function getPattern( this:Container<SubFinishClause> ):Token[] {
	return [ OPEN_MULTI_BLOCK, ...this._tokens, CLOSE_MULTI_BLOCK ];
}

/**
 * Decorator that binds the {@link SubFinishClause} methods to a
 * container and adds them to the provided object.
 *
 * @param container The container where to bind the respective methods.
 * @param object Object to be decorated with the bound methods.
 * @returns The same object provided that has been decorated.
 */
export function subFinishDecorator<W extends object>( container:Container<SubFinishClause>, object:W ):W & SubFinishClause {
	return genericDecorator( { getPattern }, container, object );
}
