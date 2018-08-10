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
