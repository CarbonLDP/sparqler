import {
	Container,
	genericDecorator,
} from "sparqler/clauses/data-container";
import { orderDecorator } from "sparqler/clauses/builders/order";
import {
	FinishClause,
	HavingClause,
	OrderClause,
} from "sparqler/clauses/interfaces";
import { GraphPattern } from "sparqler/patterns/interfaces";
import { HAVING } from "sparqler/patterns/tokens";
import { StringLiteral } from "sparqler/tokens/StringLiteral";
import { Token } from "sparqler/tokens/Token";


function having<T extends FinishClause | GraphPattern>( this:Container<T>, rawCondition:string ):OrderClause<T> & T {
	const tokens:Token[] = [ HAVING, new StringLiteral( rawCondition ) ];

	const container:Container<T> = new Container<T>( this, tokens );
	return this._finishDecorator<OrderClause<T>>( container, orderDecorator<T, {}>( container, {} ) );
}

export function havingDecorator<T extends FinishClause | GraphPattern, W extends object>( base:Container<T>, object:W ):W & HavingClause<T> {
	return genericDecorator( { having }, base, orderDecorator<T, W>( base, object ) );
}
