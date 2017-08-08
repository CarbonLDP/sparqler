import { GraphPattern } from "../interfaces";
import { Token } from "../../tokens/Token";
export declare class NotTriplesPattern implements GraphPattern {
    protected patternTokens: Token[];
    constructor(tokens: Token[]);
    getPattern(): Token[];
}
export default NotTriplesPattern;
