import { IRIToken } from "../tokens/IRIToken";
export declare type PrefixMap = Map<string, boolean>;
export declare class IRIResolver {
    readonly prefixes: PrefixMap;
    readonly vocab?: string;
    constructor(base?: IRIResolver, vocab?: string);
    resolve(relativeIRI: string, vocab?: boolean): IRIToken;
    private resolveIRIRef;
    private resolvePrefixed;
}
