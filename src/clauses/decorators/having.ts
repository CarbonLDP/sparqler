import {
	Container,
	FinishClause,
	genericDecorator,
	HavingClause,
	OrderClause,
} from "sparqler/clauses";
import { orderDecorator } from "sparqler/clauses/decorators";
import { GraphPattern } from "sparqler/patterns";
import { HAVING } from "sparqler/patterns/tokens";
import {
	StringLiteral,
	Token,
} from "sparqler/tokens";


function having<T extends FinishClause | GraphPattern>( this:Container<T>, rawCondition:string ):OrderClause<T> & T {
	const tokens:Token[] = [ HAVING, new StringLiteral( rawCondition ) ];

	const container:Container<T> = new Container<T>( this, tokens );
	return this._finishDecorator<OrderClause<T>>( container, orderDecorator<T, {}>( container, {} ) );
}

export function havingDecorator<T extends FinishClause | GraphPattern, W extends object>( base:Container<T>, object:W ):W & HavingClause<T> {
	return genericDecorator( { having }, base, orderDecorator<T, W>( base, object ) );
}
