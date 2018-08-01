import { IRIToken, PrefixedNameToken } from "./../tokens";
export declare type PrefixMap = Map<string, boolean>;
export declare class IRIResolver2 {
    readonly _prefixes: PrefixMap;
    readonly _vocab: string;
    constructor(base?: IRIResolver2, vocab?: string);
    resolve(relativeIRI: string, vocab?: boolean): IRIToken | PrefixedNameToken;
    resolveIRI(relativeIRI: string, vocab?: boolean): IRIToken;
    resolvePrefixed(prefixedName: string): PrefixedNameToken;
}
