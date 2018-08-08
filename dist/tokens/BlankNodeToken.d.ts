import { TokenNode } from "./TokenNode";
export declare class BlankNodeToken implements TokenNode {
    readonly token: "blankNode";
    readonly label?: string;
    constructor(label?: string);
    toString(spaces?: number): string;
}
