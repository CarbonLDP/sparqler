import { Container2 } from "../data/Container2";
import { Factory } from "../data/Factory";
import { QueryToken } from "../tokens/QueryToken";
import { SubSelectToken } from "../tokens/SubSelectToken";
export interface OffsetClause<T extends object> {
    offset(offset: number): T;
}
export declare const OffsetClause: {
    createFrom<C extends Container2<SubSelectToken | QueryToken<import("sparqler/tokens/QueryClauseToken").QueryClauseToken>>, T extends object, O extends object>(genericFactory: Factory<C, T>, container: C, object: O): O & OffsetClause<T>;
};
