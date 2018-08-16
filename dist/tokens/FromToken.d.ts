import { IRIToken } from "./IRIToken";
import { TokenNode } from "./TokenNode";
export declare class FromToken implements TokenNode {
    readonly token: "from";
    readonly named: boolean;
    readonly source: IRIToken;
    constructor(source: IRIToken, named?: boolean);
    toString(spaces?: number): string;
}
