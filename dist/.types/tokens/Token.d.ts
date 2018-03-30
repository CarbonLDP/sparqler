export declare const EMPTY_SEPARATOR: string;
export declare const SPACE_SEPARATOR: string;
export declare const NEW_LINE_SEPARATOR: string;
export declare enum TokenFormat {
    PRETTY = 0,
    COMPACT = 1,
}
export declare abstract class Token {
    protected value: string;
    constructor(value: string);
    getTokenValue(format?: TokenFormat, nextToken?: Token): string;
    protected abstract getPrettySeparator(nextToken: Token): string;
    protected abstract getCompactSeparator(nextToken: Token): string;
}
export default Token;
