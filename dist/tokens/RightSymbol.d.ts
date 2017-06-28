import { Token } from "./Token";
export declare class RightSymbol extends Token {
    protected getPrettySeparator(nextToken: Token): string;
    protected getCompactSeparator(nextToken: Token): string;
}
export default RightSymbol;
