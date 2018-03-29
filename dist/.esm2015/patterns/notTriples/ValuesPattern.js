import { NotTriplesPattern } from "./";
import { CLOSE_MULTI_BLOCK, CLOSE_SINGLE_BLOCK, CLOSE_SINGLE_LIST, OPEN_MULTI_BLOCK, OPEN_SINGLE_BLOCK, OPEN_SINGLE_LIST, VALUES, } from "./../tokens";
import { serialize } from "./../../utils/ObjectPattern";
export class ValuesPattern extends NotTriplesPattern {
    constructor(resolver, variables) {
        super([VALUES]);
        this.init();
        this.resolver = resolver;
        this.length = variables.length;
        if (this.length === 1) {
            this.patternTokens.push(...variables[0].getSelfTokens(), OPEN_SINGLE_BLOCK);
        }
        else {
            this.patternTokens.push(OPEN_SINGLE_LIST);
            variables.forEach(variable => this.patternTokens.push(...variable.getSelfTokens()));
            this.patternTokens.push(CLOSE_SINGLE_LIST, OPEN_MULTI_BLOCK);
        }
    }
    has(...values) {
        if (this.length !== values.length)
            throw new Error("InvalidArgumentError: The number of variables and values are different.");
        if (this.length === 1) {
            this.patternTokens.push(...serialize(values[0]));
        }
        else {
            this.patternTokens.push(OPEN_SINGLE_LIST);
            values.forEach(value => {
                return this.patternTokens.push(...serialize(value));
            });
            this.patternTokens.push(CLOSE_SINGLE_LIST);
        }
        return this.interfaces.addPattern;
    }
    getPattern() {
        if (this.length === 1) {
            this.patternTokens.push(CLOSE_SINGLE_BLOCK);
        }
        else {
            this.patternTokens.push(CLOSE_MULTI_BLOCK);
        }
        return this.patternTokens;
    }
    init() {
        this.interfaces = {
            addPattern: {
                and: this.has.bind(this),
                getPattern: () => this.getPattern(),
            },
        };
    }
}
export default ValuesPattern;

//# sourceMappingURL=ValuesPattern.js.map
