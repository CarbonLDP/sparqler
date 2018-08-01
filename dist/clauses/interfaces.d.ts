import { GroupClause } from "./GroupClause";
import { GraphPattern } from "./../patterns";
export interface SubSelectClause {
    select(...variables: string[]): SubWhereClause;
    selectDistinct(...variables: string[]): SubWhereClause;
    selectReduced(...variables: string[]): SubWhereClause;
    selectAll(): SubWhereClause;
    selectAllDistinct(): SubWhereClause;
    selectAllReduced(): SubWhereClause;
}
export interface SubWhereClause {
    where(patterns: GraphPattern | GraphPattern[]): GroupClause<SubFinishClause> & SubFinishClause;
}
export interface SubFinishClause extends GraphPattern {
}
