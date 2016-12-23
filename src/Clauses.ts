import { GraphPattern } from "./Patterns";
import { PatternBuilder } from "./PatternBuilder";

export interface QueryClause extends SelectClause {
	base( iri:string ):QueryClause;
	vocab( iri:string ):QueryClause;
	prefix( name:string, iri:string ):QueryClause;
}

export interface FromClause<T extends FinishClause> {
	from( iri:string ):WhereClause<T>;
	fromNamed( iri:string ):WhereClause<T>;
}

export interface SelectClause {
	select( ...variables:string[] ):WhereClause<FinishSelectClause> & FromClause<FinishSelectClause>;
	selectAll():WhereClause<FinishSelectClause> & FromClause<FinishSelectClause>;
}

export interface WhereClause<T extends FinishClause> {
	where( patternFunction:( builder:PatternBuilder ) => GraphPattern ):SolutionModifier<T> & T;
	where( patternFunction:( builder:PatternBuilder ) => GraphPattern[] ):SolutionModifier<T> & T;
}

export type SolutionModifier<T extends FinishClause> = GroupClause<T> & HavingClause<T> & OrderClause<T> & LimitOffsetClause<T>;

export interface GroupClause<T extends FinishClause> {
	// TODO: create group condition expressions
	groupBy( rawCondition:string ):HavingClause<T> & OrderClause<T> & LimitOffsetClause<T> & T;
}

export interface HavingClause<T extends FinishClause> {
	// TODO: create having condition expressions
	having( rawCondition:string ):OrderClause<T> & LimitOffsetClause<T> & T;
}

export interface OrderClause<T extends FinishClause> {
	// TODO: create order condition expressions
	orderBy( rawCondition:string ):LimitOffsetClause<T> & FinishClause;
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
export interface LimitOffsetClause<T extends FinishClause> extends LimitClause<OffsetClause<T> & T>, OffsetClause<LimitClause<T> & T> {}

export interface OffsetClause<T> {
	offset( offset:number ):T;
}

export interface LimitClause<T> {
	limit( limit:number ):T;
}

export interface FinishClause {
	getCompactSparqlQuery():string;
	getPrettySparqlQuery():string;
}

export interface FinishSelectClause extends FinishClause, FinishSelect {}

export interface FinishSelect {}
