import { GroupPatternToken } from "./GroupPatternToken";
import { TokenNode } from "./TokenNode";
export declare class WhereToken implements TokenNode {
    token: "where";
    readonly groupPattern: GroupPatternToken;
    constructor();
    toString(spaces?: number): string;
}
