import { Container } from "sparqler/clauses/Container";
import { groupDecorator } from "sparqler/clauses/decorators";
import {
	FinishClause,
	GroupClause,
	WhereClause,
} from "sparqler/clauses/interfaces";
import { genericDecorator } from "sparqler/clauses/utils";
import { IRIResolver } from "sparqler/iri/IRIResolver";
import {
	GraphPattern,
	PatternBuilder,
} from "sparqler/patterns";
import { WHERE } from "sparqler/patterns/tokens";
import { Token } from "sparqler/tokens";
import { getBlockTokens } from "sparqler/utils/Patterns";

/**
 * Specifies the graph patterns the query should match to retrieve
 * the solutions results.
 *
 * This pattern are created by a pattern constructor function that
 * receives a {@link PatternBuilder} which is a class that exposes
 * the possible elements and configurations the patterns chan have.
 *
 * @param patternFunction Function that retrieves a pattern or an
 * array of patterns to match.
 * @returns Object with the methods to keep constructing the query.
 */
function where<T extends FinishClause | GraphPattern>( this:Container<T>, patternFunction:( builder:PatternBuilder ) => GraphPattern | GraphPattern[ ] ):GroupClause<T> & T {
	const iriResolver:IRIResolver = new IRIResolver( this._iriResolver );
	const result:GraphPattern | GraphPattern[] = patternFunction( new PatternBuilder( iriResolver ) );
	const tokens:Token[] = [ WHERE, ...getBlockTokens( result ) ];

	const container:Container<T> = new Container<T>( this, tokens, iriResolver );
	return this._finishDecorator<GroupClause<T>>( container, groupDecorator<T, {}>( container, {} ) );
}

/**
 * Decorator that binds the WhereClause methods to a container and
 * adds them to the provided object.
 *
 * @param container The container where to bind the respective methods.
 * @param object Object to be decorated with the bound methods.
 * @returns The same object provided that has been decorated.
 */
export function whereDecorator<T extends FinishClause | GraphPattern, W extends object>( container:Container<T>, object:W ):W & WhereClause<T> {
	return genericDecorator( { where }, container, object );
}
