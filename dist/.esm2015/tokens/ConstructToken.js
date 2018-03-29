import { joinPatterns } from "./utils";
export class ConstructToken {
    constructor() {
        this.token = "construct";
        this.triples = [];
        this.patterns = [];
        this.modifiers = [];
    }
    addTriple(...triple) {
        this.triples.push(...triple);
        return this;
    }
    addPattern(...patterns) {
        this.patterns.push(...patterns);
        return this;
    }
    addModifier(...modifiers) {
        this.modifiers.push(...modifiers);
        return this;
    }
    toString() {
        let query = `CONSTRUCT { ${this.triples.join(". ")} } WHERE { ${joinPatterns(this.patterns)} }`;
        if (this.modifiers.length)
            query += ` ${this.modifiers.join(" ")}`;
        return query;
    }
}

//# sourceMappingURL=ConstructToken.js.map
