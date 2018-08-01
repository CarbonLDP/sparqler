import { GraphPattern } from "../patterns/interfaces";
import { PatternBuilder } from "../patterns/PatternBuilder";
import { QueryToken } from "../tokens/QueryToken";
import { ClauseFactory } from "./ClauseFactory";
import { Container2 } from "./Container2";
import { GroupClause } from "./GroupClause";
import { FinishClause } from "./FinishClause";
export interface WhereClause<T extends FinishClause> {
    where(patternFunction: (builder: PatternBuilder) => GraphPattern | GraphPattern[]): GroupClause<T> & T;
}
export declare const WhereClause: {
    create<C extends Container2<QueryToken>, T extends FinishClause, O extends object>(genericFactory: ClauseFactory<C, T>, container: C, object: O): O & WhereClause<T>;
};
