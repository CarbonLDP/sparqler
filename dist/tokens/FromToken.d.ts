import { IRIToken } from "./IRIToken";
import { PrefixedNameToken } from "./PrefixedNameToken";
import { TokenNode } from "./TokenNode";
export declare class FromToken implements TokenNode {
    readonly token: "from";
    readonly named: boolean;
    readonly source: IRIToken | PrefixedNameToken;
    constructor(source: IRIToken | PrefixedNameToken, named?: boolean);
    toString(): string;
}
