import { SharedSelectToken } from "./SharedSelectToken";
import { ValuesToken } from "./ValuesToken";
export declare class SubSelectToken extends SharedSelectToken {
    readonly token: "subSelect";
    readonly values?: ValuesToken;
    constructor(modifier?: "DISTINCT" | "REDUCED", values?: ValuesToken);
    toString(spaces?: number): string;
}
