import { Token } from "sparqler/tokens";
export declare type PrefixMap = Map<string, boolean>;
export declare class IRIResolver {
    readonly _prefixes: PrefixMap;
    readonly _vocab: string;
    constructor(base?: IRIResolver, vocab?: string);
    _resolveIRI(relativeIRI: string, vocab?: boolean): Token[];
}
