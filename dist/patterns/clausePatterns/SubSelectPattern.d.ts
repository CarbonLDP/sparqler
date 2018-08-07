import { Container2 } from "./../../data/Container2";
import { TokenNode } from "./../../tokens";
import { SubWherePattern } from "./SubWherePattern";
export interface SubSelectPattern {
    select(...variables: string[]): SubWherePattern;
    selectDistinct(...variables: string[]): SubWherePattern;
    selectReduced(...variables: string[]): SubWherePattern;
    selectAll(): SubWherePattern;
    selectAllDistinct(): SubWherePattern;
    selectAllReduced(): SubWherePattern;
}
export declare const SubSelectPattern: {
    createFrom<C extends Container2<TokenNode>, O extends object>(container: C, object: O): O & SubSelectPattern;
};
