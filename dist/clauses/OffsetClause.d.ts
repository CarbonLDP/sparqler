import { QueryToken } from "../tokens/QueryToken";
import { SubSelectToken } from "../tokens/SubSelectToken";
import { ClauseFactory } from "./ClauseFactory";
import { Container2 } from "./Container2";
export interface OffsetClause<T extends object> {
    offset(offset: number): T;
}
export declare const OffsetClause: {
    createFrom<C extends Container2<SubSelectToken | QueryToken>, T extends object, O extends object>(genericFactory: ClauseFactory<C, T>, container: C, object: O): O & OffsetClause<T>;
};
