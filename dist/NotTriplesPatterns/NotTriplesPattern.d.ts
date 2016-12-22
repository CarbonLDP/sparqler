import { GraphPattern } from "../Patterns";
import { Token } from "../Tokens/Token";
export declare class NotTriplesPattern implements GraphPattern {
    protected patternTokens: Token[];
    constructor(tokens: Token[]);
    getPattern(): Token[];
}
export default NotTriplesPattern;
