import { Container2 } from "../data/Container2";
import { IRIResolver2 } from "../data/IRIResolver2";
import { TokenNode } from "../tokens/TokenNode";
import { SubSelectPattern } from "./clausePatterns/SubSelectPattern";
import { NotTriplePatternBuilder } from "./notTriplePatterns/NotTriplePatternBuilder";
import { TriplePatternBuilder } from "./triplePatterns/TriplePatternBuilder";
export interface PatternBuilder2 extends TriplePatternBuilder, NotTriplePatternBuilder, SubSelectPattern {
}
export declare const PatternBuilder2: {
    create(iriResolver: IRIResolver2): PatternBuilder2;
    createFrom<C extends Container2<TokenNode>, O extends object>(container: C, object: O): O & PatternBuilder2;
};
