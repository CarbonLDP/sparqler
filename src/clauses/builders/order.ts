import {
	Container,
	genericDecorator,
} from "sparqler/clauses/data-container";
import { limitOffsetDecorator } from "sparqler/clauses/builders/limit-offset";
import {
	FinishClause,
	LimitOffsetClause,
	OrderClause,
} from "sparqler/clauses/interfaces";
import { GraphPattern } from "sparqler/patterns/interfaces";
import {
	BY,
	ORDER,
} from "sparqler/patterns/tokens";
import { StringLiteral } from "sparqler/tokens/StringLiteral";
import { Token } from "sparqler/tokens/Token";


export function orderBy<T extends FinishClause | GraphPattern>( this:Container<T>, rawCondition:string ):LimitOffsetClause<T> & T {
	const tokens:Token[] = [ ORDER, BY, new StringLiteral( rawCondition ) ];

	const container:Container<T> = new Container<T>( this, tokens );
	return this._finishDecorator<LimitOffsetClause<T>>( container, limitOffsetDecorator<T, {}>( container, {} ) );
}

export function orderDecorator<T extends FinishClause | GraphPattern, W extends object>( base:Container<T>, object:W ):W & OrderClause<T> {
	return genericDecorator( { orderBy }, base, limitOffsetDecorator<T, W>( base, object ) );
}
