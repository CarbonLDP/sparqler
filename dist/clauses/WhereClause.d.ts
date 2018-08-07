import { Container2 } from "../data/Container2";
import { Factory } from "../data/Factory";
import { Pattern } from "../patterns/Pattern";
import { PatternBuilder2 } from "../patterns/PatternBuilder2";
import { QueryToken } from "../tokens/QueryToken";
import { FinishClause } from "./FinishClause";
import { GroupClause } from "./GroupClause";
export interface WhereClause<T extends FinishClause> {
    where(patternFunction: (builder: PatternBuilder2) => Pattern | Pattern[]): GroupClause<T> & T;
}
export declare const WhereClause: {
    createFrom<C extends Container2<QueryToken<import("sparqler/tokens/QueryClauseToken").QueryClauseToken>>, T extends FinishClause, O extends object>(genericFactory: Factory<C, T>, container: C, object: O): O & WhereClause<T>;
};
