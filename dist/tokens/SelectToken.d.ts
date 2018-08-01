import { CommonSelectToken } from "./CommonSelectToken";
import { FromToken } from "./FromToken";
export declare class SelectToken extends CommonSelectToken {
    readonly token: "select";
    readonly dataset?: FromToken;
    constructor(modifier?: "DISTINCT" | "REDUCED", dataset?: FromToken);
    toString(): string;
}
