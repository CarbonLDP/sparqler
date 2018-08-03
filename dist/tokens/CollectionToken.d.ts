import { ObjectToken } from "./ObjectToken";
import { TokenNode } from "./TokenNode";
export declare class CollectionToken implements TokenNode {
    readonly token: "collection";
    readonly objects: ObjectToken[];
    constructor();
    addObject(...object: ObjectToken[]): this;
    toString(): string;
}
