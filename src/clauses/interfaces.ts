import {
	GraphPattern,
	PatternBuilder,
	SupportedNativeTypes,
	Undefined,
} from "sparqler/patterns";
import {
	Literal,
	Resource,
} from "sparqler/patterns/triples";

export interface QueryClause<T extends FinishClause = FinishClause> extends SelectClause<T> {
	base( iri:string ):QueryClause<T>;
	vocab( iri:string ):QueryClause<T>;
	prefix( name:string, iri:string ):QueryClause<T>;
}

export interface SelectClause<T extends FinishClause = FinishClause> {
	select( ...variables:string[] ):FromClause<T>;
	selectDistinct( ...variables:string[] ):FromClause<T>;
	selectReduced( ...variables:string[] ):FromClause<T>;
	selectAll():FromClause<T>;
	selectAllDistinct():FromClause<T>;
	selectAllReduced():FromClause<T>;
}

export interface SubSelectClause {
	select( ...variables:string[] ):SubWhereClause;
	selectDistinct( ...variables:string[] ):SubWhereClause;
	selectReduced( ...variables:string[] ):SubWhereClause;
	selectAll():SubWhereClause;
	selectAllDistinct():SubWhereClause;
	selectAllReduced():SubWhereClause;
}

export interface FromClause<T extends FinishClause = FinishClause> extends WhereClause<T> {
	from( iri:string ):FromClause<T>;
	fromNamed( iri:string ):FromClause<T>;
}

export interface WhereClause<T extends FinishClause = FinishClause> {
	where( patternFunction:( builder:PatternBuilder ) => GraphPattern | GraphPattern[] ):GroupClause<T> & T;
}

export interface SubWhereClause {
	where( patterns:GraphPattern | GraphPattern[] ):GroupClause<SubFinishClause> & SubFinishClause;
}

export interface GroupClause<T extends FinishClause | SubFinishClause = FinishClause> extends HavingClause<T> {
	// TODO: create group condition expressions
	groupBy( rawCondition:string ):HavingClause<T> & T;
}

export interface HavingClause<T extends FinishClause | SubFinishClause = FinishClause> extends OrderClause<T> {
	// TODO: create having condition expressions
	having( rawCondition:string ):OrderClause<T> & T;
}

export interface OrderClause<T extends FinishClause | SubFinishClause = FinishClause> extends LimitOffsetClause<T> {
	// TODO: create order condition expressions
	orderBy( rawCondition:string ):LimitOffsetClause<T> & T;
}

/**
 * This interface is created this way to be able to specify the methods `limit` and `offset` only in this order or viceversa,
 * but not be able to repeat `limit` or `offset` more that once.
 *
 * Example:
 *  - Correct:
 *  ```typescript
 *      import { LimitOffsetClause } from "sparqler/clauses";
 *      let query:LimitOffsetClause;
 *
 *      query
 *          .limit( &#47;*...*&#47; )
 *          .offset( &#47;*...*&#47; )
 *      ;
 *
 *      query
 *          .offset( &#47;*...*&#47; )
 *          .limit( &#47;*...*&#47; )
 *      ;
 *
 *      query
 *          .limit( &#47;*...*&#47; )
 *      ;
 * ```
 *
 *  - Incorrect:
 *  ```typescript
 *      import { LimitOffsetClause } from "sparqler/Clauses";
 *      let query:LimitOffsetClause;
 *
 *      query
 *          .limit( &#47;*...*&#47; )
 *          .limit( &#47;*...*&#47; ) // Not possible
 *          .offset( &#47;*...*&#47; )
 *      ;
 *
 *      query
 *          .offset( &#47;*...*&#47; )
 *          .limit( &#47;*...*&#47; )
 *          .offset( &#47;*...*&#47; ) // Not possible
 *      ;
 * ```
 */
export interface LimitOffsetClause<T extends FinishClause | SubFinishClause = FinishClause> extends LimitClause<OffsetClause<T & ValuesClause<T>> & ValuesClause<T> & T>,
                                                                                                    OffsetClause<LimitClause<T & ValuesClause<T>> & ValuesClause<T> & T>,
																									ValuesClause<T> {}

export interface OffsetClause<T> {
	offset( offset:number ):T;
}

export interface LimitClause<T> {
	limit( limit:number ):T;
}

export interface ValuesClause<T extends FinishClause | SubFinishClause = FinishClause> {
	values( variable:string, values: SupportedNativeTypes | SupportedNativeTypes[] ): T;
	values( variable:string, valuesBuilder:( builder:PatternBuilder ) => ( SupportedNativeTypes | Resource | Literal | Undefined ) | ( SupportedNativeTypes | Resource | Literal | Undefined )[]  ): T;
	values( variables:string[], values: SupportedNativeTypes[] | SupportedNativeTypes[][] ): T;
	values( variables:string[], valuesBuilder:( builder:PatternBuilder ) => ( SupportedNativeTypes | Resource | Literal | Undefined )[] | ( SupportedNativeTypes | Resource | Literal | Undefined )[][]  ): T;
}

export interface FinishClause {
	toCompactString():string;
	toPrettyString():string;
	toString():string;
}

export interface SubFinishClause extends GraphPattern {}
