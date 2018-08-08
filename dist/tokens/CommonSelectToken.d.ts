import { CommonQueryClauseToken } from "./CommonQueryClauseToken";
import { VariableToken } from "./VariableToken";
export declare abstract class CommonSelectToken extends CommonQueryClauseToken {
    abstract readonly token: string;
    readonly modifier?: "DISTINCT" | "REDUCED";
    readonly variables: VariableToken[];
    protected constructor(modifier?: "DISTINCT" | "REDUCED");
    addVariable(...variables: VariableToken[]): this;
    toString(spaces?: number): string;
}
