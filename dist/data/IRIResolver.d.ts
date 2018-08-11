import { IRIToken } from "../tokens/IRIToken";
import { PrefixedNameToken } from "../tokens/PrefixedNameToken";
export declare type PrefixMap = Map<string, boolean>;
export declare class IRIResolver {
    readonly prefixes: PrefixMap;
    readonly vocab?: string;
    constructor(base?: IRIResolver, vocab?: string);
    resolve(relativeIRI: string, vocab?: boolean): IRIToken | PrefixedNameToken;
    private resolveIRI;
    private resolvePrefixed;
}
