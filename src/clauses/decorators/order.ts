import { Container } from "sparqler/clauses/Container";
import { limitOffsetDecorator } from "sparqler/clauses/decorators";
import {
	FinishClause,
	LimitOffsetClause,
	OrderClause,
} from "sparqler/clauses/interfaces";
import { genericDecorator } from "sparqler/clauses/utils";
import { GraphPattern } from "sparqler/patterns";
import {
	BY,
	ORDER,
} from "sparqler/patterns/tokens";
import {
	StringLiteral,
	Token,
} from "sparqler/tokens";

/**
 * Set a condition to be used as the order of the sequence of solutions the
 * query will retrieve.
 *
 * Notice: The current version of SPARQLER does not evaluate the condition
 * for possible errors.
 *
 * @param rawCondition RAW condition to be applied for the solutions order.
 * @returns Object with the methods to keep constructing the query.
 */
export function orderBy<T extends FinishClause | GraphPattern>( this:Container<T>, rawCondition:string ):LimitOffsetClause<T> & T {
	const tokens:Token[] = [ ORDER, BY, new StringLiteral( rawCondition ) ];

	const container:Container<T> = new Container<T>( this, tokens );
	return this._finishDecorator<LimitOffsetClause<T>>( container, limitOffsetDecorator<T, {}>( container, {} ) );
}

/**
 * Decorator that bind the OrderClause methods to a container and adds them
 * to the provided object.
 *
 * @param container The container to bind the methods
 * @param object Object to be decorated with the bound methods.
 * @returns The same object provided that has been decorated.
 */
export function orderDecorator<T extends FinishClause | GraphPattern, W extends object>( container:Container<T>, object:W ):W & OrderClause<T> {
	return genericDecorator( { orderBy }, container, limitOffsetDecorator<T, W>( container, object ) );
}
