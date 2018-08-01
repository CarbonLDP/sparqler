import { TokenNode } from "./TokenNode";
export declare class GroupToken implements TokenNode {
    readonly token: "group";
    readonly rawCondition: string;
    constructor(rawCondition: string);
    toString(): string;
}
