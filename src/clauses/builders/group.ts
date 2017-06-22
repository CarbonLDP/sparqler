import {
	Container,
	genericDecorator,
} from "sparqler/clauses/data-container";
import { havingDecorator } from "sparqler/clauses/builders/having";
import {
	FinishClause,
	GroupClause,
	HavingClause,
} from "sparqler/clauses/interfaces";
import { GraphPattern } from "sparqler/patterns/interfaces";
import {
	BY,
	GROUP,
} from "sparqler/patterns/tokens";
import { StringLiteral } from "sparqler/tokens/StringLiteral";
import { Token } from "sparqler/tokens/Token";


function groupBy<T extends FinishClause | GraphPattern>( this:Container<T>, rawCondition:string ):HavingClause<T> & T {
	const tokens:Token[] = [ GROUP, BY, new StringLiteral( rawCondition ) ];

	const container:Container<T> = new Container<T>( this, tokens );
	return this._finishDecorator<HavingClause<T>>( container, havingDecorator<T, {}>( container, {} ) );
}

export function groupDecorator<T extends FinishClause | GraphPattern, W extends object>( base:Container<T>, object:W ):W & GroupClause<T> {
	return genericDecorator( { groupBy }, base, havingDecorator<T, W>( base, object ) );
}
