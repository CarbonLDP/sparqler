import { TokenNode } from "./TokenNode";
export declare class HavingToken implements TokenNode {
    readonly token: "having";
    readonly rawCondition: string;
    constructor(rawCondition: string);
    toString(spaces?: number): string;
}
