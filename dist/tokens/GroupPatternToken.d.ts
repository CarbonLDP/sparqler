import { PatternToken } from "./PatternToken";
import { TokenNode } from "./TokenNode";
export declare class GroupPatternToken implements TokenNode {
    token: "groupPattern";
    readonly patterns: PatternToken[];
    constructor();
    toString(spaces?: number): string;
}
