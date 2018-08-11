import { Container } from "../../data/Container";
import { TokenNode } from "../../tokens/TokenNode";
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
    createFrom<C extends Container<TokenNode>, O extends object>(container: C, object: O): O & SubSelectPattern;
};
