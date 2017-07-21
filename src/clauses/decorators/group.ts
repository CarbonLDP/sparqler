import {
	FinishClause,
	GroupClause,
	HavingClause,
	SubFinishClause,
} from "sparqler/clauses";
import { Container } from "sparqler/clauses/Container";
import { havingDecorator } from "sparqler/clauses/decorators";
import { genericDecorator } from "sparqler/clauses/utils";
import {
	BY,
	GROUP,
} from "sparqler/patterns/tokens";
import {
	StringLiteral,
	Token,
} from "sparqler/tokens";

/**
 * Set a condition to be divide the solutions returned by the query
 * into one or more groups.
 *
 * @param rawCondition Raw condition to be applied to the solutions grouping.
 * @returns Object with the methods to keep constructing the query.
 */
function groupBy<T extends FinishClause | SubFinishClause>( this:Container<T>, rawCondition:string ):HavingClause<T> & T {
	const tokens:Token[] = [ GROUP, BY, new StringLiteral( rawCondition ) ];

	const container:Container<T> = new Container<T>( this, tokens );
	return this._finishDecorator<HavingClause<T>>( container, havingDecorator<T, {}>( container, {} ) );
}

/**
 * Decorator that binds the GroupClause methods to a container and adds them
 * to the provided object.
 *
 * @param container The container where to bind the respective methods.
 * @param object Object to be decorated with the bound methods.
 * @returns The same object provided that has been decorated.
 */
export function groupDecorator<T extends FinishClause | SubFinishClause, W extends object>( container:Container<T>, object:W ):W & GroupClause<T> {
	return genericDecorator( { groupBy }, container, havingDecorator<T, W>( container, object ) );
}
