import {
	BY,
	ORDER,
} from "../../patterns/tokens";
import {
	StringLiteral,
	Token,
} from "../../tokens";
import { Container } from "../Container";
import {
	FinishClause,
	LimitOffsetClause,
	OrderClause,
	SubFinishClause,
} from "../interfaces";
import { genericDecorator } from "../utils";
import { limitOffsetDecorator } from "./limit-offset";

/**
 * Set a condition to be used as the order of the sequence of solutions the
 * query will retrieve.
 *
 * Notice: The current version of SPARQLER does not evaluate the condition
 * for possible errors.
 *
 * @param rawCondition Raw condition to be applied for the solutions order.
 * @returns Object with the methods to keep constructing the query.
 */
function orderBy<T extends FinishClause | SubFinishClause>( this:Container<T>, rawCondition:string ):LimitOffsetClause<T> & T {
	const tokens:Token[] = [ ORDER, BY, new StringLiteral( rawCondition ) ];

	const container:Container<T> = new Container<T>( this, tokens );
	return this._finishDecorator<LimitOffsetClause<T>>( container, limitOffsetDecorator<T, {}>( container, {} ) );
}

/**
 * Decorator that binds the OrderClause methods to a container and adds them
 * to the provided object.
 *
 * @param container The container where to bind the respective methods.
 * @param object Object to be decorated with the bound methods.
 * @returns The same object provided that has been decorated.
 */
export function orderDecorator<T extends FinishClause | SubFinishClause, W extends object>( container:Container<T>, object:W ):W & OrderClause<T> {
	return genericDecorator( { orderBy }, container, limitOffsetDecorator<T, W>( container, object ) );
}
