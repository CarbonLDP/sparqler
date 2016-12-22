import { GraphPattern } from "./Patterns";
import { PatternBuilder } from "./PatternBuilder";
export interface QueryClause extends SelectClause {
    base(iri: string): QueryClause;
    vocab(iri: string): QueryClause;
    prefix(name: string, iri: string): QueryClause;
}
export interface FromClause {
    from(iri: string): WhereClause;
    fromNamed(iri: string): WhereClause;
}
export interface SelectClause {
    select(...variables: string[]): WhereClause & FromClause;
    selectAll(): WhereClause & FromClause;
}
export interface WhereClause {
    where(patternFunction: (builder: PatternBuilder) => GraphPattern): SolutionModifier & FinishClause;
    where(patternFunction: (builder: PatternBuilder) => GraphPattern[]): SolutionModifier & FinishClause;
}
export declare type SolutionModifier = GroupClause & HavingClause & OrderClause & LimitOffsetClause;
export interface GroupClause {
    groupBy(rawCondition: string): HavingClause & OrderClause & LimitOffsetClause & FinishClause;
}
export interface HavingClause {
    having(rawCondition: string): OrderClause & LimitOffsetClause & FinishClause;
}
export interface OrderClause {
    orderBy(rawCondition: string): LimitOffsetClause & FinishClause;
}
export interface LimitOffsetClause extends LimitClause<OffsetClause<FinishClause> & FinishClause>, OffsetClause<LimitClause<FinishClause> & FinishClause> {
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
}
