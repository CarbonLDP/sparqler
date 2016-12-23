import { GraphPattern } from "./Patterns";
import { PatternBuilder } from "./PatternBuilder";
export interface QueryClause extends SelectClause {
    base(iri: string): QueryClause;
    vocab(iri: string): QueryClause;
    prefix(name: string, iri: string): QueryClause;
}
export interface FromClause<T extends FinishClause> {
    from(iri: string): WhereClause<T>;
    fromNamed(iri: string): WhereClause<T>;
}
export interface SelectClause {
    select(...variables: string[]): WhereClause<FinishSelectClause> & FromClause<FinishSelectClause>;
    selectAll(): WhereClause<FinishSelectClause> & FromClause<FinishSelectClause>;
}
export interface WhereClause<T extends FinishClause> {
    where(patternFunction: (builder: PatternBuilder) => GraphPattern): SolutionModifier<T> & T;
    where(patternFunction: (builder: PatternBuilder) => GraphPattern[]): SolutionModifier<T> & T;
}
export declare type SolutionModifier<T extends FinishClause> = GroupClause<T> & HavingClause<T> & OrderClause<T> & LimitOffsetClause<T>;
export interface GroupClause<T extends FinishClause> {
    groupBy(rawCondition: string): HavingClause<T> & OrderClause<T> & LimitOffsetClause<T> & T;
}
export interface HavingClause<T extends FinishClause> {
    having(rawCondition: string): OrderClause<T> & LimitOffsetClause<T> & T;
}
export interface OrderClause<T extends FinishClause> {
    orderBy(rawCondition: string): LimitOffsetClause<T> & FinishClause;
}
export interface LimitOffsetClause<T extends FinishClause> extends LimitClause<OffsetClause<T> & T>, OffsetClause<LimitClause<T> & T> {
}
export interface OffsetClause<T> {
    offset(offset: number): T;
}
export interface LimitClause<T> {
    limit(limit: number): T;
}
export interface FinishClause {
    getCompactSparqlQuery(): string;
    getPrettySparqlQuery(): string;
}
export interface FinishSelectClause extends FinishClause, FinishSelect {
}
export interface FinishSelect {
}
