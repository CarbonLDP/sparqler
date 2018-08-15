import { Container } from "../../data/Container";
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
    createFrom<O extends object>(container: Container<undefined>, object: O): O & SubSelectPattern;
};
