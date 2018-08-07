import { GroupPatternToken } from "./GroupPatternToken";
import { TokenNode } from "./TokenNode";
export declare class UnionPatternToken implements TokenNode {
    readonly token: "unionPattern";
    readonly groupPatterns: GroupPatternToken[];
    constructor();
    toString(): string;
}
