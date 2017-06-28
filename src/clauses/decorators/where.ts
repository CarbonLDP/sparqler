import {
	Container,
	FinishClause,
	genericDecorator,
	GroupClause,
	Resolver,
	WhereClause,
} from "sparqler/clauses";
import { groupDecorator } from "sparqler/clauses/decorators";
import {
	GraphPattern,
	PatternBuilder,
} from "sparqler/patterns";
import { WHERE } from "sparqler/patterns/tokens";
import { Token } from "sparqler/tokens";
import { getBlockTokens } from "sparqler/utils/Patterns";


function where<T extends FinishClause | GraphPattern>( this:Container<T>, patternFunction:( builder:PatternBuilder ) => GraphPattern | GraphPattern[ ] ):GroupClause<T> & T {
	const iriResolver:Resolver = new Resolver( this._iriResolver );
	const result:GraphPattern | GraphPattern[] = patternFunction( new PatternBuilder( iriResolver ) );
	const tokens:Token[] = [ WHERE, ...getBlockTokens( result ) ];

	const container:Container<T> = new Container<T>( this, tokens, iriResolver );
	return this._finishDecorator<GroupClause<T>>( container, groupDecorator<T, {}>( container, {} ) );
}

export function whereDecorator<T extends FinishClause | GraphPattern, W extends object>( container:Container<T>, object:W ):W & WhereClause<T> {
	return genericDecorator( { where }, container, groupDecorator<T, W>( container, object ) );
}
