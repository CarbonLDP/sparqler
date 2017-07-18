import { GraphPattern, PatternBuilder } from "sparqler/patterns";
export interface QueryClause<T extends FinishClause> extends SelectClause<T> {
    base(iri: string): QueryClause<T>;
    vocab(iri: string): QueryClause<T>;
    prefix(name: string, iri: string): QueryClause<T>;
}
export interface SelectClause<T extends FinishClause> {
    select(...variables: string[]): FromClause<T>;
    selectDistinct(...variables: string[]): FromClause<T>;
    selectReduced(...variables: string[]): FromClause<T>;
    selectAll(): FromClause<T>;
    selectAllDistinct(): FromClause<T>;
    selectAllReduced(): FromClause<T>;
}
export interface SubSelect {
    select(...variables: string[]): WhereClause<GraphPattern>;
    selectDistinct(...variables: string[]): WhereClause<GraphPattern>;
    selectReduced(...variables: string[]): WhereClause<GraphPattern>;
    selectAll(): WhereClause<GraphPattern>;
    selectAllDistinct(): WhereClause<GraphPattern>;
    selectAllReduced(): WhereClause<GraphPattern>;
}
export interface FromClause<T extends FinishClause = FinishClause> extends WhereClause<T> {
    from(iri: string): FromClause<T>;
    fromNamed(iri: string): FromClause<T>;
}
export interface WhereClause<T extends FinishClause | GraphPattern = FinishClause> {
    where(patternFunction: (builder: PatternBuilder) => GraphPattern | GraphPattern[]): GroupClause<T> & T;
}
export interface GroupClause<T extends FinishClause | GraphPattern = FinishClause> extends HavingClause<T> {
    groupBy(rawCondition: string): HavingClause<T> & T;
}
export interface HavingClause<T extends FinishClause | GraphPattern = FinishClause> extends OrderClause<T> {
    having(rawCondition: string): OrderClause<T> & T;
}
export interface OrderClause<T extends FinishClause | GraphPattern = FinishClause> extends LimitOffsetClause<T> {
    orderBy(rawCondition: string): LimitOffsetClause<T> & T;
}
export interface LimitOffsetClause<T extends FinishClause | GraphPattern = FinishClause> extends LimitClause<OffsetClause<T> & T>, OffsetClause<LimitClause<T> & T> {
}
export interface OffsetClause<T> {
    offset(offset: number): T;
}
export interface LimitClause<T> {
    limit(limit: number): T;
}
export interface FinishClause {
    toCompactString(): string;
    toPrettyString(): string;
    toString(): string;
}
