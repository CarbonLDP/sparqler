import { GroupPatternToken } from "./GroupPatternToken";
import { PatternToken } from "./PatternToken";
import { TokenNode } from "./TokenNode";
export declare class OptionalToken implements TokenNode {
    readonly token: "optional";
    readonly groupPattern: GroupPatternToken;
    constructor();
    addPattern(...pattern: PatternToken[]): this;
    toString(): string;
}
