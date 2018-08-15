import { Container } from "../data/Container";
import { IRIResolver } from "../data/IRIResolver";
import { SubSelectPattern } from "./clausePatterns/SubSelectPattern";
import { NotTriplePatternsBuilder } from "./notTriplePatterns/NotTriplePatternsBuilder";
import { TriplePatternsBuilder } from "./triplePatterns/TriplePatternsBuilder";
export interface PatternBuilder extends TriplePatternsBuilder, NotTriplePatternsBuilder, SubSelectPattern {
}
export declare const PatternBuilder: {
    create(iriResolver: IRIResolver): PatternBuilder;
    createFrom<C extends Container<undefined>, O extends object>(container: C, object: O): O & PatternBuilder;
};
