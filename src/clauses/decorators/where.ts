import { Container } from "sparqler/clauses/Container";
import { groupDecorator } from "sparqler/clauses/decorators";
import {
	FinishClause,
	GroupClause,
	WhereClause,
} from "sparqler/clauses/interfaces";
import { genericDecorator } from "sparqler/clauses/utils";
import { IRIResolver } from "sparqler/iri/IRIResolver";
import {
	GraphPattern,
	PatternBuilder,
} from "sparqler/patterns";
import { WHERE } from "sparqler/patterns/tokens";
import { Token } from "sparqler/tokens";
import { getBlockTokens } from "sparqler/utils/Patterns";


function where<T extends FinishClause | GraphPattern>( this:Container<T>, patternFunction:( builder:PatternBuilder ) => GraphPattern | GraphPattern[ ] ):GroupClause<T> & T {
	const iriResolver:IRIResolver = new IRIResolver( this._iriResolver );
	const result:GraphPattern | GraphPattern[] = patternFunction( new PatternBuilder( iriResolver ) );
	const tokens:Token[] = [ WHERE, ...getBlockTokens( result ) ];

	const container:Container<T> = new Container<T>( this, tokens, iriResolver );
	return this._finishDecorator<GroupClause<T>>( container, groupDecorator<T, {}>( container, {} ) );
}

export function whereDecorator<T extends FinishClause | GraphPattern, W extends object>( container:Container<T>, object:W ):W & WhereClause<T> {
	return genericDecorator( { where }, container, object );
}
