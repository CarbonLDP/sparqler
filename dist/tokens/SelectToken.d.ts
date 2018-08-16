import { SharedSelectToken } from "./SharedSelectToken";
import { FromToken } from "./FromToken";
export declare class SelectToken extends SharedSelectToken {
    readonly token: "select";
    readonly dataset?: FromToken;
    constructor(modifier?: "DISTINCT" | "REDUCED", dataset?: FromToken);
    toString(spaces?: number): string;
}
