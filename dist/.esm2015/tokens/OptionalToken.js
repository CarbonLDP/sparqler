import { joinPatterns } from "./utils";
export class OptionalToken {
    constructor() {
        this.token = "optional";
        this.patterns = [];
    }
    addPattern(...pattern) {
        this.patterns.push(...pattern);
        return this;
    }
    toString() {
        return `OPTIONAL { ${joinPatterns(this.patterns)} }`;
    }
}

//# sourceMappingURL=OptionalToken.js.map
