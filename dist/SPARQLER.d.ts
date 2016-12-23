import { QueryClause, FromClause, SelectClause, WhereClause, SolutionModifier, GroupClause, HavingClause, OrderClause, LimitOffsetClause, LimitClause, OffsetClause, FinishClause } from "./Clauses";
import { GraphPattern, IRIResolver } from "./Patterns";
import { PatternBuilder } from "./PatternBuilder";
import { Token } from "./Tokens/Token";
export declare class SPARQLER implements QueryClause, FromClause, SelectClause, WhereClause, GroupClause, HavingClause, OrderClause, LimitOffsetClause, FinishClause, IRIResolver {
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
    select(...variables: string[]): WhereClause & FromClause;
    selectAll(): WhereClause & FromClause;
    from(iri: string): WhereClause;
    fromNamed(iri: string): WhereClause;
    where(patternFunction: (builder: PatternBuilder) => GraphPattern): SolutionModifier & FinishClause;
    where(patternFunction: (builder: PatternBuilder) => GraphPattern[]): SolutionModifier & FinishClause;
    groupBy(rawCondition: string): HavingClause & OrderClause & LimitOffsetClause & FinishClause;
    having(rawCondition: string): OrderClause & LimitOffsetClause & FinishClause;
    orderBy(rawCondition: string): LimitOffsetClause & FinishClause;
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
