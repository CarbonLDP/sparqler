import { GroupClause } from "../../clauses/GroupClause";
import { Container } from "../../data/container";
import { SubSelectToken } from "../../tokens/SubSelectToken";
import { Pattern } from "../Pattern";
import { FinishPattern } from "./FinishPattern";
export interface WherePattern {
    where(patterns: Pattern | Pattern[]): GroupClause<FinishPattern> & FinishPattern;
}
export declare const WherePattern: {
    createFrom<C extends Container<SubSelectToken>, O extends object>(container: C, object: O): O & WherePattern;
};
