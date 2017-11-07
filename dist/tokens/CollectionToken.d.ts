import { ObjectToken } from "./";
import { TokenNode } from "./TokenNode";
export declare class CollectionToken implements TokenNode {
    readonly token: "collection";
    readonly objects: ObjectToken[];
    constructor();
    toString(): string;
}
