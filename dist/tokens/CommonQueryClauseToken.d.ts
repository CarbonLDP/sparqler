import { PatternToken } from "./PatternToken";
import { SolutionModifierToken } from "./SolutionModifierToken";
import { TokenNode } from "./TokenNode";
import { WhereToken } from "./WhereToken";
export declare abstract class CommonQueryClauseToken implements TokenNode {
    abstract readonly token: string;
    readonly where: WhereToken;
    readonly modifiers: SolutionModifierToken[];
    protected constructor();
    addPattern(...patterns: PatternToken[]): this;
    addModifier(...modifier: SolutionModifierToken[]): this;
    abstract toString(spaces?: number): string;
}
