import { joinPatterns } from "./utils";
export class GraphToken {
    constructor(graph) {
        this.token = "graph";
        this.graph = graph;
        this.patterns = [];
    }
    addPattern(...pattern) {
        this.patterns.push(...pattern);
        return this;
    }
    toString() {
        return `GRAPH ${this.graph} { ${joinPatterns(this.patterns)} }`;
    }
}

//# sourceMappingURL=GraphToken.js.map
