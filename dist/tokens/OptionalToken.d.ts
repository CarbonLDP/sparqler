import { PatternToken } from "./";
import { TokenNode } from "./TokenNode";
export declare class OptionalToken implements TokenNode {
    readonly token: "optional";
    readonly patterns: PatternToken[];
    constructor();
    addPattern(...pattern: PatternToken[]): this;
    toString(): string;
}
