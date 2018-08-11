import { Container } from "../data/Container";
import { IRIResolver } from "../data/IRIResolver";
import { TokenNode } from "../tokens/TokenNode";
import { SubSelectPattern } from "./clausePatterns/SubSelectPattern";
import { NotTriplePatternBuilder } from "./notTriplePatterns/NotTriplePatternBuilder";
import { TriplePatternBuilder } from "./triplePatterns/TriplePatternBuilder";
export interface PatternBuilder2 extends TriplePatternBuilder, NotTriplePatternBuilder, SubSelectPattern {
}
export declare const PatternBuilder2: {
    create(iriResolver: IRIResolver): PatternBuilder2;
    createFrom<C extends Container<TokenNode>, O extends object>(container: C, object: O): O & PatternBuilder2;
};
