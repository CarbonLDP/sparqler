import { PatternToken, SolutionModifier } from "./";
import { TokenNode } from "./TokenNode";
import { VariableToken } from "./VariableToken";
export declare class SelectToken implements TokenNode {
    readonly token: "select";
    readonly modifier?: "DISTINCT" | "REDUCED";
    readonly variables: VariableToken[];
    readonly patterns: PatternToken[];
    readonly modifiers: SolutionModifier[];
    constructor(modifier?: "DISTINCT" | "REDUCED");
    addVariable(...variables: VariableToken[]): this;
    addPattern(...patterns: PatternToken[]): this;
    addModifier(...modifier: SolutionModifier[]): this;
    toString(): string;
}
