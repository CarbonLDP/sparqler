/**
 * Base interfaces that defines a token.
 */
export interface TokenNode {
	readonly token:string;

	toString( spaces?:number ):string;
}
