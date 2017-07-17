import {
	FinishClause,
	GroupClause,
	HavingClause,
} from "sparqler/clauses";
import { Container } from "sparqler/clauses/Container";
import { havingDecorator } from "sparqler/clauses/decorators";
import { genericDecorator } from "sparqler/clauses/utils";
import { GraphPattern } from "sparqler/patterns";
import {
	BY,
	GROUP,
} from "sparqler/patterns/tokens";
import {
	StringLiteral,
	Token,
} from "sparqler/tokens";


function groupBy<T extends FinishClause | GraphPattern>( this:Container<T>, rawCondition:string ):HavingClause<T> & T {
	const tokens:Token[] = [ GROUP, BY, new StringLiteral( rawCondition ) ];

	const container:Container<T> = new Container<T>( this, tokens );
	return this._finishDecorator<HavingClause<T>>( container, havingDecorator<T, {}>( container, {} ) );
}

export function groupDecorator<T extends FinishClause | GraphPattern, W extends object>( container:Container<T>, object:W ):W & GroupClause<T> {
	return genericDecorator( { groupBy }, container, havingDecorator<T, W>( container, object ) );
}
