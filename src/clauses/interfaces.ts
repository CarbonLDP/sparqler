import { GraphPattern } from "../patterns/interfaces";
import { PatternBuilder } from "../patterns/pattern-builder";

export interface QueryClause<T extends FinishClause> extends SelectClause<T> {
	base( iri:string ):QueryClause<T>;
	vocab( iri:string ):QueryClause<T>;
	prefix( name:string, iri:string ):QueryClause<T>;
}

export interface SelectClause<T extends FinishClause> {
	select( ...variables:string[] ):FromClause<T>;
	selectDistinct( ...variables:string[] ):FromClause<T>;
	selectReduced( ...variables:string[] ):FromClause<T>;
	selectAll():FromClause<T>;
	selectAllDistinct():FromClause<T>;
	selectAllReduced():FromClause<T>;
}

export interface SubSelect {
	select( ...variables:string[] ):WhereClause<GraphPattern>;
	selectDistinct( ...variables:string[] ):WhereClause<GraphPattern>;
	selectReduced( ...variables:string[] ):WhereClause<GraphPattern>;
	selectAll():WhereClause<GraphPattern>;
	selectAllDistinct():WhereClause<GraphPattern>;
	selectAllReduced():WhereClause<GraphPattern>;
}

export interface FromClause<T extends FinishClause> extends WhereClause<T> {
	from( iri:string ):WhereClause<T>;
	fromNamed( iri:string ):WhereClause<T>;
}

export interface WhereClause<T extends FinishClause | GraphPattern> {
	where( patternFunction:( builder:PatternBuilder ) => GraphPattern ):GroupClause<T> & T;
	where( patternFunction:( builder:PatternBuilder ) => GraphPattern[] ):GroupClause<T> & T;
}

export interface GroupClause<T extends FinishClause | GraphPattern> extends HavingClause<T> {
	// TODO: create group condition expressions
	groupBy( rawCondition:string ):HavingClause<T> & T;
}

export interface HavingClause<T extends FinishClause | GraphPattern> extends OrderClause<T> {
	// TODO: create having condition expressions
	having( rawCondition:string ):OrderClause<T> & T;
}

export interface OrderClause<T extends FinishClause | GraphPattern> extends LimitOffsetClause<T> {
	// TODO: create order condition expressions
	orderBy( rawCondition:string ):LimitOffsetClause<T> & T;
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
export interface LimitOffsetClause<T extends FinishClause | GraphPattern> extends LimitClause<OffsetClause<T> & T>, OffsetClause<LimitClause<T> & T> {}

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
