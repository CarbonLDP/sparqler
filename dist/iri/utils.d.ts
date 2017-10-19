import { Token } from "../tokens/Token";
export declare function isAbsolute(iri: string): boolean;
export declare function hasProtocol(iri: string): boolean;
export declare function isRelative(iri: string): boolean;
export declare function isIRI(iri: string): boolean;
export declare function isBNodeLabel(label: string): boolean;
export declare function isPrefixed(iri: string): boolean;
export declare function getPrefixedParts(iri: string): [string, string];
export declare function resolve(iri: string, vocab?: string): Token[];
