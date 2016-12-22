import { GraphPattern } from "./Patterns";
import { PatternBuilder } from "./PatternBuilder";

export interface QueryClause extends SelectClause {
	base( iri:string ):QueryClause;
	vocab( iri:string ):QueryClause;
	prefix( name:string, iri:string ):QueryClause;
}

export interface FromClause {
	from( iri:string ):WhereClause;
	fromNamed( iri:string ):WhereClause;
}

export interface SelectClause {
	select( ...variables:string[] ):WhereClause & FromClause;
	selectAll():WhereClause & FromClause;
}

export interface WhereClause {
	where( patternFunction:( builder:PatternBuilder ) => GraphPattern ):SolutionModifier & FinishClause;
	where( patternFunction:( builder:PatternBuilder ) => GraphPattern[] ):SolutionModifier & FinishClause;
}

export type SolutionModifier = GroupClause & HavingClause & OrderClause & LimitOffsetClause;

export interface GroupClause {
	// TODO: create group condition expressions
	groupBy( rawCondition:string ):HavingClause & OrderClause & LimitOffsetClause & FinishClause;
}

export interface HavingClause {
	// TODO: create having condition expressions
	having( rawCondition:string ):OrderClause & LimitOffsetClause & FinishClause;
}

export interface OrderClause {
	// TODO: create order condition expressions
	orderBy( rawCondition:string ):LimitOffsetClause & FinishClause;
}

/**
 * This LimitOffsetClause created this way to be able to specify `limit` and `offset` in this order or viceversa,
 * but not be able to repeat `limit` or `offset` more that once.
 *
 * Example:
 *  - Correct:
 *      .limit( ... )
 *      .offset( ... )
 *      .execute();
 *
 *      .offset( ... )
 *      .limit( ... )
 *      .execute();
 *
 *      .limit( ... )
 *      .execute();
 *
 *  - Incorrect:
 *      .limit( ... )
 *      .limit( ... ) // Not possible
 *      .offset( ... )
 *
 *      .offset( ... )
 *      .limit( ... )
 *      .offset( ... ) // Not possible
 */
export interface LimitOffsetClause extends LimitClause<OffsetClause<FinishClause> & FinishClause>, OffsetClause<LimitClause<FinishClause> & FinishClause> {}

export interface OffsetClause<T> {
	offset( offset:number ):T;
}

export interface LimitClause<T> {
	limit( limit:number ):T;
}

export interface FinishClause {
	toCompactString():string;
	toPrettyString():string;
}
