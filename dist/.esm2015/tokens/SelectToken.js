import { joinPatterns } from "./utils";
export class SelectToken {
    constructor(modifier) {
        this.token = "select";
        this.modifier = modifier;
        this.variables = [];
        this.patterns = [];
        this.modifiers = [];
    }
    addVariable(...variables) {
        this.variables.push(...variables);
        return this;
    }
    addPattern(...patterns) {
        this.patterns.push(...patterns);
        return this;
    }
    addModifier(...modifier) {
        this.modifiers.push(...modifier);
        return this;
    }
    toString() {
        let query = `SELECT`;
        if (this.modifier)
            query += ` ${this.modifier}`;
        if (this.variables.length)
            query += ` ${this.variables.join(" ")}`;
        query += ` WHERE { ${joinPatterns(this.patterns)} }`;
        if (this.modifiers.length)
            query += ` ${this.modifiers.join(" ")}`;
        return query;
    }
}

//# sourceMappingURL=SelectToken.js.map
