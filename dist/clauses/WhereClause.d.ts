import { GraphPattern } from "../patterns/GraphPattern";
import { PatternBuilder2 } from "../patterns/PatternBuilder2";
import { QueryToken } from "../tokens/QueryToken";
import { ClauseFactory } from "./ClauseFactory";
import { Container2 } from "./Container2";
import { FinishClause } from "./FinishClause";
import { GroupClause } from "./GroupClause";
export interface WhereClause<T extends FinishClause> {
    where(patternFunction: (builder: PatternBuilder2) => GraphPattern | GraphPattern[]): GroupClause<T> & T;
}
export declare const WhereClause: {
    createFrom<C extends Container2<QueryToken>, T extends FinishClause, O extends object>(genericFactory: ClauseFactory<C, T>, container: C, object: O): O & WhereClause<T>;
};
