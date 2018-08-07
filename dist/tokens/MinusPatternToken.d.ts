import { GroupPatternToken } from "./GroupPatternToken";
import { TokenNode } from "./TokenNode";
export declare class MinusPatternToken implements TokenNode {
    readonly token: "minusPattern";
    readonly groupPattern: GroupPatternToken;
    constructor();
    toString(): string;
}
