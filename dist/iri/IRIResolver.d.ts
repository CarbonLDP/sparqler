import { Token } from "../tokens/Token";
export declare type PrefixMap = Map<string, boolean>;
export declare class IRIResolver {
    readonly _prefixes: PrefixMap;
    readonly _vocab: string;
    constructor(base?: IRIResolver, vocab?: string);
    resolve(relativeIRI: string, vocab?: boolean): Token[];
}
