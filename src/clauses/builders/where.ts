import {
	Container,
	genericDecorator,
	Resolver,
} from "sparqler/clauses/data-container";
import { groupDecorator } from "sparqler/clauses/builders/group";
import {
	FinishClause,
	GroupClause,
	WhereClause,
} from "sparqler/clauses/interfaces";
import { PatternBuilder } from "sparqler/patterns/pattern-builder";
import { GraphPattern } from "sparqler/patterns/interfaces";
import { WHERE } from "sparqler/patterns/tokens";
import { Token } from "sparqler/tokens/Token";
import { getBlockTokens } from "sparqler/utils/Patterns";


function where<T extends FinishClause | GraphPattern>( this:Container<T>, patternFunction:( builder:PatternBuilder ) => GraphPattern | GraphPattern[ ] ):GroupClause<T> & T {
	const iriResolver:Resolver = new Resolver( this._iriResolver );
	const result:GraphPattern | GraphPattern[] = patternFunction( new PatternBuilder( iriResolver ) );
	const tokens:Token[] = [ WHERE, ...getBlockTokens( result ) ];

	const container:Container<T> = new Container<T>( this, tokens, iriResolver );
	return this._finishDecorator<GroupClause<T>>( container, groupDecorator<T, {}>( container, {} ) );
}

export function whereDecorator<T extends FinishClause | GraphPattern, W extends object>( base:Container<T>, object:W ):W & WhereClause<T> {
	return genericDecorator( { where }, base, groupDecorator<T, W>( base, object ) );
}
