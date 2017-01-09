import { QueryClause, FromClause, SelectClause, WhereClause, SolutionModifier, GroupClause, HavingClause, OrderClause, LimitOffsetClause, LimitClause, OffsetClause, FinishClause, FinishSelectClause } from "./Clauses";
import { GraphPattern, IRIResolver } from "./Patterns";
import { PatternBuilder } from "./PatternBuilder";
import { Token } from "./Tokens/Token";
export interface PrefixInfo {
    iri: string;
    used: boolean;
}
export declare class SPARQLER implements QueryClause, FromClause<FinishClause>, SelectClause, WhereClause<FinishClause>, GroupClause<FinishClause>, HavingClause<FinishClause>, OrderClause<FinishClause>, LimitOffsetClause<FinishClause>, FinishClause, IRIResolver {
    private _base;
    private _vocab;
    private _prefixes;
    private _selects;
    private _from;
    private _where;
    private _group;
    private _having;
    private _order;
    private _limit;
    private _offset;
    private interfaces;
    constructor();
    base(iri: string): QueryClause;
    vocab(iri: string): QueryClause;
    prefix(name: string, iri: string): QueryClause;
    select(...variables: string[]): WhereClause<FinishSelectClause> & FromClause<FinishSelectClause>;
    selectAll(): WhereClause<FinishSelectClause> & FromClause<FinishSelectClause>;
    from(iri: string): WhereClause<FinishSelectClause>;
    fromNamed(iri: string): WhereClause<FinishSelectClause>;
    where(patternFunction: (builder: PatternBuilder) => GraphPattern): SolutionModifier<FinishClause> & FinishClause;
    where(patternFunction: (builder: PatternBuilder) => GraphPattern[]): SolutionModifier<FinishClause> & FinishClause;
    groupBy(rawCondition: string): HavingClause<FinishClause> & OrderClause<FinishClause> & LimitOffsetClause<FinishClause> & FinishClause;
    having(rawCondition: string): OrderClause<FinishClause> & LimitOffsetClause<FinishClause> & FinishClause;
    orderBy(rawCondition: string): LimitOffsetClause<FinishClause> & FinishClause;
    limit(limit: number): OffsetClause<FinishClause> & FinishClause;
    offset(offset: number): LimitClause<FinishClause> & FinishClause;
    private constructQuery(format);
    toCompactString(): string;
    toString(): string;
    toPrettyString(): string;
    private initInterfaces();
    _resolveIRI(iri: string, vocab?: boolean): Token[];
}
export default SPARQLER;
