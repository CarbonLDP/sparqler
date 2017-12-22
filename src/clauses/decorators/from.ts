import { IRIResolver } from "../../iri/IRIResolver";
import {
	FROM,
	NAMED,
} from "../../patterns/tokens";
import { Token } from "../../tokens";
import { Container } from "../Container";
import {
	FinishClause,
	FromClause,
} from "../interfaces";
import { genericDecorator } from "../utils";
import { whereDecorator } from "./where";

/**
 * Internal function that actually creates the tokens of the
 * FromClause methods.
 *
 * @param self The container that is bound to the FromClause methods.
 * @param tokens Initial tokens depending which methods is called.
 * @param iri The iri of the resource to be included.
 * @returns Object with the methods to keep constructing to query.
 * @private
 */
function _from<T extends FinishClause>( self:Container<T>, tokens:Token[], iri:string ):FromClause<T> {
	const iriResolver:IRIResolver = new IRIResolver( self._iriResolver );
	tokens.push( ...iriResolver.resolve( iri ) );

	const container:Container<T> = new Container<T>( self, tokens, iriResolver );
	return fromDecorator<T, {}>( container, {} );
}

/**
 * Set a default graph to be included as the RDF Dataset where to
 * look for the query solutions.
 *
 * @param iri IRI of the default graph to be included.
 * @returns Object with the methods to keep constructing to query.
 */
function from<T extends FinishClause>( this:Container<T>, iri:string ):FromClause<T> {
	return _from<T>( this, [ FROM ], iri );
}

/**
 * Set a named graph to be included as the RDF Dataset where to look for
 * the query solutions.
 *
 * @param iri IRI of the named graph to be included.
 * @returns Object with the methods to keep constructing the query.
 */
function fromNamed<T extends FinishClause>( this:Container<T>, iri:string ):FromClause<T> {
	return _from<T>( this, [ FROM, NAMED ], iri );
}

/**
 * Decorator that binds the FromClause methods to a container and
 * adds them to the provided object.
 *
 * @param container The container where to bind the respective methods.
 * @param object Object to be decorated with the bound methods.
 * @returns The same object provided that has been decorated.
 */
export function fromDecorator<T extends FinishClause, W extends object>( container:Container<T>, object:W ):W & FromClause<T> {
	return genericDecorator( { from, fromNamed }, container, whereDecorator<T, W>( container, object ) );
}
