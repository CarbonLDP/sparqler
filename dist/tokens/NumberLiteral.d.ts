import { Token } from "./Token";
export declare class NumberLiteral extends Token {
    constructor(value: number);
    protected getPrettySeparator(nextToken: Token): string;
    protected getCompactSeparator(nextToken: Token): string;
}
export default NumberLiteral;
