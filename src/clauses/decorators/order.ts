import {
	Container,
	FinishClause,
	genericDecorator,
	LimitOffsetClause,
	OrderClause,
} from "sparqler/clauses";
import { limitOffsetDecorator } from "sparqler/clauses/decorators";
import { GraphPattern } from "sparqler/patterns";
import {
	BY,
	ORDER,
} from "sparqler/patterns/tokens";
import {
	StringLiteral,
	Token,
} from "sparqler/tokens";


export function orderBy<T extends FinishClause | GraphPattern>( this:Container<T>, rawCondition:string ):LimitOffsetClause<T> & T {
	const tokens:Token[] = [ ORDER, BY, new StringLiteral( rawCondition ) ];

	const container:Container<T> = new Container<T>( this, tokens );
	return this._finishDecorator<LimitOffsetClause<T>>( container, limitOffsetDecorator<T, {}>( container, {} ) );
}

export function orderDecorator<T extends FinishClause | GraphPattern, W extends object>( container:Container<T>, object:W ):W & OrderClause<T> {
	return genericDecorator( { orderBy }, container, limitOffsetDecorator<T, W>( container, object ) );
}
