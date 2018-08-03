import { QueryToken } from "../tokens/QueryToken";
import { SubSelectToken } from "../tokens/SubSelectToken";
import { ClauseFactory } from "./ClauseFactory";
import { Container2 } from "./Container2";
export interface LimitClause<T extends object> {
    limit(limit: number): T;
}
export declare const LimitClause: {
    createFrom<C extends Container2<SubSelectToken | QueryToken>, T extends object, O extends object>(genericFactory: ClauseFactory<C, T>, container: C, object: O): O & LimitClause<T>;
};
