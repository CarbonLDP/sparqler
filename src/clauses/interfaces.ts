import { GroupClause } from "sparqler/clauses/GroupClause";
import { GraphPattern } from "sparqler/patterns";

export interface SubSelectClause {
	select( ...variables:string[] ):SubWhereClause;
	selectDistinct( ...variables:string[] ):SubWhereClause;
	selectReduced( ...variables:string[] ):SubWhereClause;
	selectAll():SubWhereClause;
	selectAllDistinct():SubWhereClause;
	selectAllReduced():SubWhereClause;
}

export interface SubWhereClause {
	where( patterns:GraphPattern | GraphPattern[] ):GroupClause<SubFinishClause> & SubFinishClause;
}

export interface SubFinishClause extends GraphPattern {}
