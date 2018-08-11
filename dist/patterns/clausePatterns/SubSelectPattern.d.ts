import { Container } from "../../data/Container";
import { TokenNode } from "../../tokens/TokenNode";
import { WherePattern } from "./WherePattern";
export interface SubSelectPattern {
    select(...variables: string[]): WherePattern;
    selectDistinct(...variables: string[]): WherePattern;
    selectReduced(...variables: string[]): WherePattern;
    selectAll(): WherePattern;
    selectAllDistinct(): WherePattern;
    selectAllReduced(): WherePattern;
}
export declare const SubSelectPattern: {
    createFrom<C extends Container<TokenNode>, O extends object>(container: C, object: O): O & SubSelectPattern;
};
