import { CommonSelectToken } from "./CommonSelectToken";
import { ValuesToken } from "./ValuesToken";
export declare class SubSelectToken extends CommonSelectToken {
    readonly token: "subSelect";
    readonly values?: ValuesToken;
    constructor(modifier?: "DISTINCT" | "REDUCED", values?: ValuesToken);
    toString(spaces?: number): string;
}
