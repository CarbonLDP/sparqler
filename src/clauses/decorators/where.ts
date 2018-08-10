import { SubFinishClause } from "sparqler/clauses";
import { Container } from "sparqler/clauses/Container";
import { groupDecorator } from "sparqler/clauses/decorators";
import { GroupClause } from "sparqler/clauses/interfaces";
import {
	SubWhereClause,
	} from "sparqler/clauses/interfaces";
import {
	GraphPattern,
} from "sparqler/patterns";
import { WHERE } from "sparqler/patterns/tokens";
import { Token } from "sparqler/tokens";
import { getBlockTokens } from "sparqler/utils/Patterns";

/**
 * Sets the graph patterns the sub-query should match to retrieve the
 * sub-solutions data.
 *
 * @param patterns Patterns the sub-query should match.
 * @returns Object with the methods to keep constructing the query.
 */
function subWhere( this:Container<SubFinishClause>, patterns:GraphPattern | GraphPattern[] ):GroupClause<SubFinishClause> & SubFinishClause {
	const tokens:Token[] = [ WHERE, ...getBlockTokens( patterns ) ];

	const container:Container<SubFinishClause> = new Container<SubFinishClause>( this, tokens );
	return this._finishDecorator( container, groupDecorator( container, {} ) );
}

/**
 * Decorator that binds the {@link SubWhereClause} clause pattern
 * methods to a container and adds them to the provided object.
 *
 * @param container The container where to bind the respective methods.
 * @param object Object to be decorated with the bound methods.
 * @returns The same object provided that has been decorated.
 */
export function subWhereDecorator<T extends SubFinishClause, W extends object>( container:Container<T>, object:W ):W & SubWhereClause {
	return Object.assign( object, {
		where: subWhere.bind( container ),
	} );
}
