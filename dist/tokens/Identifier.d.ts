import { Token } from "./Token";
export declare class Identifier extends Token {
    protected getPrettySeparator(nextToken: Token): string;
    protected getCompactSeparator(nextToken: Token): string;
}
export default Identifier;
