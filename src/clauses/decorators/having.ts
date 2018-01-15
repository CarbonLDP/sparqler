import { HAVING } from "../../patterns/tokens";
import {
	StringLiteral,
	Token,
} from "../../tokens";
import { Container } from "../Container";
import {
	FinishClause,
	HavingClause,
	OrderClause,
	SubFinishClause,
} from "../interfaces";
import { genericDecorator } from "./utils";
import { orderDecorator } from "./order";

/**
 * Set a condition to filter the sequence of solutions the query will
 * retrieve.
 *
 * Notice: The current version of SPARQLER does not evaluate the condition
 * for possible errors
 *
 * @param rawCondition Raw condition to be applied for the solutions filtering.
 * @returns Object with the methods to keep constructing the query.
 */
function having<T extends FinishClause | SubFinishClause>( this:Container<T>, rawCondition:string ):OrderClause<T> & T {
	const tokens:Token[] = [ HAVING, new StringLiteral( rawCondition ) ];

	const container:Container<T> = new Container<T>( this, tokens );
	return this._finishDecorator<OrderClause<T>>( container, orderDecorator<T, {}>( container, {} ) );
}

/**
 * Decorator that binds the HavingClause methods to a container and adds them
 * to the provided object.
 *
 * @param container The container where to bind the respective methods.
 * @param object Object to be decorated with the bound methods.
 * @returns The same object provided that has been decorated.
 */
export function havingDecorator<T extends FinishClause | SubFinishClause, W extends object>( container:Container<T>, object:W ):W & HavingClause<T> {
	return genericDecorator( { having }, container, orderDecorator<T, W>( container, object ) );
}
