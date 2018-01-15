import { IRIResolver } from "../../iri/IRIResolver";
import { GraphPattern } from "../../patterns/interfaces";
import { PatternBuilder } from "../../patterns/PatternBuilder";
import { WHERE } from "../../patterns/tokens";
import { Token } from "../../tokens";
import { getBlockTokens } from "../../utils/Patterns";
import { Container } from "../Container";
import {
	FinishClause,
	GroupClause,
	SubFinishClause,
	SubWhereClause,
	WhereClause,
} from "../interfaces";
import { genericDecorator } from "./utils";
import { groupDecorator } from "./group";

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
function where<T extends FinishClause>( this:Container<T>, patternFunction:( builder:PatternBuilder ) => GraphPattern | GraphPattern[ ] ):GroupClause<T> & T {
	const iriResolver:IRIResolver = new IRIResolver( this._iriResolver );
	const patterns:GraphPattern | GraphPattern[] = patternFunction( new PatternBuilder( iriResolver ) );

	const tokens:Token[] = [ WHERE, ...getBlockTokens( patterns ) ];
	const container:Container<T> = new Container<T>( this, tokens, iriResolver );

	return this._finishDecorator( container, groupDecorator( container, {} ) );
}

/**
 * Decorator that binds the {@link WhereClause} methods to a container
 * and adds them to the provided object.
 *
 * @param container The container where to bind the respective methods.
 * @param object Object to be decorated with the bound methods.
 * @returns The same object provided that has been decorated.
 */
export function whereDecorator<T extends FinishClause, W extends object>( container:Container<T>, object:W ):W & WhereClause<T> {
	return genericDecorator( { where }, container, object );
}

/**
 * Decorator that binds the {@link SubWhereClause} methods to a
 * container and adds them to the provided object.
 *
 * @param container The container where to bind the respective methods.
 * @param object Object to be decorated with the bound methods.
 * @returns The same object provided that has been decorated.
 */
export function subWhereDecorator<T extends SubFinishClause, W extends object>( container:Container<T>, object:W ):W & SubWhereClause {
	return genericDecorator( { where: subWhere }, container, object );
}
